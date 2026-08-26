from datetime import UTC, datetime, timedelta
from typing import Any

from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy import distinct, func, select

from app.api.crud import Db
from app.core.security import require_api_key
from app.models import AnalyticsEvent
from app.schemas import TrackEventCreate

router = APIRouter(prefix="/analytics", tags=["analytics"])

# Coarse timezone-prefix -> ISO country code (fallback when no geo header).
_TZ_COUNTRY = {
    "Africa/Porto-Novo": "BJ",
    "Africa/Cotonou": "BJ",
    "Africa/Lagos": "NG",
    "Africa/Abidjan": "CI",
    "Africa/Accra": "GH",
    "Africa/Dakar": "SN",
    "Africa/Bamako": "ML",
    "Africa/Ouagadougou": "BF",
    "Africa/Niamey": "NE",
    "Africa/Lome": "TG",
    "Africa/Algiers": "DZ",
    "Africa/Tunis": "TN",
    "Africa/Casablanca": "MA",
    "Africa/Cairo": "EG",
    "Africa/Nairobi": "KE",
    "Europe/Paris": "FR",
    "Europe/London": "GB",
    "Europe/Brussels": "BE",
    "Europe/Berlin": "DE",
    "Europe/Madrid": "ES",
    "Europe/Rome": "IT",
    "America/New_York": "US",
    "America/Chicago": "US",
    "America/Los_Angeles": "US",
    "America/Toronto": "CA",
}


def _detect_country(request: Request, tz: str | None) -> str | None:
    for header in ("x-vercel-ip-country", "cf-ipcountry"):
        value = request.headers.get(header)
        if value:
            return value[:8]
    if tz:
        base = tz.split("/")[-1]
        if f"Africa/{base}" in _TZ_COUNTRY:
            return _TZ_COUNTRY[f"Africa/{base}"]
        return _TZ_COUNTRY.get(tz)
    return None


def _detect_device(user_agent: str) -> str:
    ua = user_agent.lower()
    if "ipad" in ua or "tablet" in ua:
        return "tablet"
    if "mobi" in ua or "android" in ua and "mobile" in ua:
        return "mobile"
    return "desktop"


@router.post("/track", status_code=204)
async def track_event(
    payload: TrackEventCreate,
    request: Request,
    db: Db,
) -> None:
    path = payload.path if payload.path.startswith("/") else f"/{payload.path}"
    if path.startswith("/api"):
        return
    event = AnalyticsEvent(
        session_id=payload.session_id[:64],
        event_type="leave" if payload.event_type == "leave" else "view",
        path=path[:500],
        locale=(payload.locale or None)[:8] if payload.locale else None,
        referrer=(payload.referrer or None)[:500] if payload.referrer else None,
        country=_detect_country(request, payload.timezone),
        device=_detect_device(request.headers.get("user-agent", "")),
    )
    db.add(event)
    await db.commit()


@router.get("/summary", dependencies=[Depends(require_api_key)])
async def analytics_summary(
    db: Db,
    days: int = Query(default=14, ge=1, le=90),
) -> dict[str, Any]:
    since = datetime.now(UTC) - timedelta(days=days)

    async def rows(query: Any) -> list[Any]:
        result = await db.execute(query)
        return list(result.all())

    totals_q = select(
        func.count(AnalyticsEvent.id),
        func.count(distinct(AnalyticsEvent.session_id)),
    ).where(
        AnalyticsEvent.event_type == "view",
        AnalyticsEvent.created_at >= since,
    )
    total_views, total_sessions = (await rows(totals_q))[0]

    single_q = (
        select(func.count())
        .select_from(
            select(
                AnalyticsEvent.session_id,
            )
            .where(
                AnalyticsEvent.event_type == "view",
                AnalyticsEvent.created_at >= since,
            )
            .group_by(AnalyticsEvent.session_id)
            .having(func.count() == 1)
            .subquery()
        )
    )
    bounce_result = await db.execute(single_q)
    bounced = bounce_result.scalar() or 0
    bounce_rate = round(bounced / total_sessions * 100) if total_sessions else 0

    daily_q = (
        select(
            func.date_trunc("day", AnalyticsEvent.created_at).label("day"),
            func.count(),
            func.count(distinct(AnalyticsEvent.session_id)),
        )
        .where(
            AnalyticsEvent.event_type == "view",
            AnalyticsEvent.created_at >= since,
        )
        .group_by("day")
        .order_by("day")
    )

    pages_q = (
        select(AnalyticsEvent.path, func.count())
        .where(
            AnalyticsEvent.event_type == "view",
            AnalyticsEvent.created_at >= since,
        )
        .group_by(AnalyticsEvent.path)
        .order_by(func.count().desc())
        .limit(10)
    )

    exits_q = (
        select(AnalyticsEvent.path, func.count())
        .where(
            AnalyticsEvent.event_type == "leave",
            AnalyticsEvent.created_at >= since,
        )
        .group_by(AnalyticsEvent.path)
        .order_by(func.count().desc())
        .limit(10)
    )

    countries_q = (
        select(
            func.coalesce(AnalyticsEvent.country, "??").label("country"),
            func.count(distinct(AnalyticsEvent.session_id)),
        )
        .where(
            AnalyticsEvent.event_type == "view",
            AnalyticsEvent.created_at >= since,
        )
        .group_by("country")
        .order_by(func.count(distinct(AnalyticsEvent.session_id)).desc())
        .limit(12)
    )

    devices_q = (
        select(AnalyticsEvent.device, func.count(distinct(AnalyticsEvent.session_id)))
        .where(
            AnalyticsEvent.event_type == "view",
            AnalyticsEvent.created_at >= since,
        )
        .group_by(AnalyticsEvent.device)
        .order_by(func.count(distinct(AnalyticsEvent.session_id)).desc())
    )

    referrers_q = (
        select(AnalyticsEvent.referrer, func.count(distinct(AnalyticsEvent.session_id)))
        .where(
            AnalyticsEvent.event_type == "view",
            AnalyticsEvent.created_at >= since,
            AnalyticsEvent.referrer.is_not(None),
        )
        .group_by(AnalyticsEvent.referrer)
        .order_by(func.count(distinct(AnalyticsEvent.session_id)).desc())
        .limit(10)
    )

    daily_rows = await rows(daily_q)

    async def pairs(query: Any, label_idx: int = 0, value_idx: int = 1) -> list[dict[str, Any]]:
        result = await db.execute(query)
        return [
            {"name": row[label_idx], "value": int(row[value_idx])}
            for row in result.all()
        ]

    return {
        "days": days,
        "totals": {
            "views": int(total_views),
            "visitors": int(total_sessions),
            "bounce_rate": bounce_rate,
        },
        "daily": [
            {"date": day.strftime("%Y-%m-%d"), "views": int(views), "visitors": int(visitors)}
            for day, views, visitors in daily_rows
        ],
        "top_pages": await pairs(pages_q),
        "exits": await pairs(exits_q),
        "countries": await pairs(countries_q),
        "devices": await pairs(devices_q),
        "referrers": await pairs(referrers_q),
    }

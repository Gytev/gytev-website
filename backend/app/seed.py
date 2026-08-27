"""Seed PostgreSQL depuis content/en|fr/content.json.

Usage (depuis backend/):
    uv run python -m app.seed            # insère uniquement ce qui manque
    uv run python -m app.seed --reset    # vide puis re-insert tout
"""

import argparse
import asyncio
import json
from datetime import datetime
from pathlib import Path
from typing import Any

from sqlalchemy import delete, select

from app.core.database import Base, SessionLocal, engine
from app.models import (
    BlogPost,
    CompanyContactCopy,
    CompanyMilestone,
    CompanyPartner,
    CompanySection,
    CompanyTeamMember,
    Customer,
    DeveloperResource,
    NavigationItem,
    Product,
    ResearchTopic,
    Solution,
    TermsPage,
)

CONTENT_DIR = Path(__file__).resolve().parents[2] / "content"
LOCALES = ("en", "fr")

NAV_ITEMS = [
    {"key": "research", "label": "Research", "href": "/research", "sort_order": 0},
    {"key": "products", "label": "Products", "href": "/products", "sort_order": 1},
    {"key": "solutions", "label": "Solutions", "href": "/solutions", "sort_order": 2},
    {"key": "developers", "label": "Developers", "href": "/developers", "sort_order": 3},
    {"key": "company", "label": "Company", "href": "/company", "sort_order": 4},
]


def parse_date(value: str) -> datetime | None:
    try:
        return datetime.fromisoformat(value)
    except (ValueError, TypeError):
        return None



CONTACT_FLAT_MAP = {
    "heroEyebrow": ("eyebrow",),
    "heroTitle": ("heroTitle",),
    "heroSub": ("heroSub",),
    "helpHeading": ("helpHeading",),
    "titleTeam": ("cards", "titles", "team"),
    "titleSupport": ("cards", "titles", "support"),
    "titlePress": ("cards", "titles", "press"),
    "titlePrivacy": ("cards", "titles", "privacy"),
    "titleVulnerability": ("cards", "titles", "vulnerability"),
    "supportHelpPrefix": ("cards", "support", "helpPrefix"),
    "supportHelpLink": ("cards", "support", "helpLink"),
    "supportLoginLink": ("cards", "support", "loginLink"),
    "supportLoginSuffix": ("cards", "support", "loginSuffix"),
    "supportDiscordPrefix": ("cards", "support", "discordPrefix"),
    "supportDiscordLabel": ("cards", "support", "discordLabel"),
    "supportDiscordSuffix": ("cards", "support", "discordSuffix"),
    "supportCta": ("cards", "support", "cta"),
    "pressPrefix": ("cards", "press", "prefix"),
    "pressEmail": ("cards", "press", "email"),
    "privacyText": ("cards", "privacy", "text"),
    "privacyCta": ("cards", "privacy", "cta"),
    "vulnText": ("cards", "vulnerability", "text"),
    "vulnSmallPrint": ("cards", "vulnerability", "smallPrint"),
    "vulnCta": ("cards", "vulnerability", "cta"),
    "formThanks": ("forms", "thanks"),
    "formSending": ("forms", "sending"),
    "formLegal": ("forms", "legal"),
    "formUpdates": ("forms", "updates"),
    "formSubmit": ("forms", "submit"),
    "formError": ("forms", "error"),
    "teamFirstnameLabel": ("forms", "team", "firstname", "label"),
    "teamFirstnamePlaceholder": ("forms", "team", "firstname", "placeholder"),
    "teamLastnameLabel": ("forms", "team", "lastname", "label"),
    "teamLastnamePlaceholder": ("forms", "team", "lastname", "placeholder"),
    "teamEmailLabel": ("forms", "team", "email", "label"),
    "teamEmailPlaceholder": ("forms", "team", "email", "placeholder"),
    "teamRoleLabel": ("forms", "team", "role", "label"),
    "teamRolePlaceholder": ("forms", "team", "role", "placeholder"),
    "teamMessageLabel": ("forms", "team", "message", "label"),
    "teamMessagePlaceholder": ("forms", "team", "message", "placeholder"),
    "supportEmailLabel": ("forms", "support", "email", "label"),
    "supportEmailPlaceholder": ("forms", "support", "email", "placeholder"),
    "supportIssueLabel": ("forms", "support", "issue", "label"),
    "supportIssuePlaceholder": ("forms", "support", "issue", "placeholder"),
    "pressFormNameLabel": ("forms", "press", "name", "label"),
    "pressFormNamePlaceholder": ("forms", "press", "name", "placeholder"),
    "pressFormEmailLabel": ("forms", "press", "email", "label"),
    "pressFormEmailPlaceholder": ("forms", "press", "email", "placeholder"),
    "pressOutletLabel": ("forms", "press", "outlet", "label"),
    "pressOutletPlaceholder": ("forms", "press", "outlet", "placeholder"),
    "pressRequestLabel": ("forms", "press", "request", "label"),
    "pressRequestPlaceholder": ("forms", "press", "request", "placeholder"),
    "privacyFormEmailLabel": ("forms", "privacy", "email", "label"),
    "privacyFormEmailPlaceholder": ("forms", "privacy", "email", "placeholder"),
    "privacyTypeLabel": ("forms", "privacy", "typeLabel"),
    "privacyTypePlaceholder": ("forms", "privacy", "typePlaceholder"),
    "privacyDetailsLabel": ("forms", "privacy", "details", "label"),
    "privacyDetailsPlaceholder": ("forms", "privacy", "details", "placeholder"),
    "vulnFormEmailLabel": ("forms", "vulnerability", "email", "label"),
    "vulnFormEmailPlaceholder": ("forms", "vulnerability", "email", "placeholder"),
    "vulnProductLabel": ("forms", "vulnerability", "product", "label"),
    "vulnProductPlaceholder": ("forms", "vulnerability", "product", "placeholder"),
    "vulnReportLabel": ("forms", "vulnerability", "report", "label"),
}


def _dig(obj: Any, path: tuple[str, ...]) -> str:
    cur: Any = obj
    for key in path:
        if not isinstance(cur, dict) or key not in cur:
            return ""
        cur = cur[key]
    return str(cur)


def contact_copy_row(locale: str, data: dict[str, Any]) -> CompanyContactCopy:
    source = data.get("contactPage", {})
    kwargs = {col: _dig(source, path) for col, path in CONTACT_FLAT_MAP.items()}
    return CompanyContactCopy(locale=locale, **kwargs)

def content_rows(locale: str, data: dict[str, Any]) -> list[Any]:
    products = [
        Product(
            locale=locale,
            slug=item["slug"],
            name=item["name"],
            tagline=item["tagline"],
            description=item["description"],
            href=item.get("href", ""),
        )
        for item in data.get("products", [])
    ]
    solutions = [
        Solution(
            locale=locale,
            slug=item["slug"],
            name=item["name"],
            description=item["description"],
            industries=item.get("industries", []),
            href=item.get("href", ""),
        )
        for item in data.get("solutions", [])
    ]
    research = [
        ResearchTopic(
            locale=locale,
            slug=item["slug"],
            title=item["title"],
            summary=item["summary"],
            status=item.get("status", "in-progress"),
            href=item.get("href", ""),
        )
        for item in data.get("research", [])
    ]
    developers = [
        DeveloperResource(
            locale=locale,
            slug=item["slug"],
            title=item["title"],
            description=item["description"],
            kind=item.get("kind", "api"),
            href=item.get("href", ""),
        )
        for item in data.get("developerResources", [])
    ]
    blog = [
        BlogPost(
            locale=locale,
            slug=item["slug"],
            title=item["title"],
            excerpt=item["excerpt"],
            author=item["author"],
            tags=item.get("tags", []),
            image=item.get("image"),
            published_at=parse_date(item.get("date", "")),
        )
        for item in data.get("blog", [])
    ]
    customers = [
        Customer(
            locale=locale,
            slug=item["slug"],
            name=item["name"],
            sector=item["sector"],
            country=item["country"],
            quote=item["quote"],
            badge=item.get("badge"),
            image=item.get("image"),
            overview=item.get("overview"),
            challenge=item.get("challenge"),
            solution=item.get("solution"),
            results=item.get("results"),
            metrics=item.get("metrics"),
            quote_author=item.get("quoteAuthor"),
            quote_role=item.get("quoteRole"),
            video_url=item.get("videoUrl"),
        )
        for item in data.get("customers", [])
    ]
    company = [
        CompanySection(locale=locale, key=key, content=text)
        for key, text in data.get("company", {}).items()
    ]
    milestones = [
        CompanyMilestone(
            locale=locale,
            date_label=item["date"],
            title=item["title"],
            description=item.get("description"),
            event_type=item.get("type", "milestone"),
            sort_order=index,
        )
        for index, item in enumerate(data.get("timeline", []))
    ]
    team = [
        CompanyTeamMember(
            locale=locale,
            name=item["name"],
            role=item["role"],
            photo_url=item.get("photo"),
            sort_order=index,
        )
        for index, item in enumerate(data.get("team", []))
    ]
    partners = [
        CompanyPartner(
            locale=locale,
            name=item["name"],
            logo_url=item.get("logo"),
            sort_order=index,
        )
        for index, item in enumerate(data.get("partners", []))
    ]
    contact_copy = [contact_copy_row(locale, data)]
    terms = [
        TermsPage(
            locale=locale,
            slug=item["slug"],
            title=item["title"],
            published_at=parse_date(item.get("published_at", "")),
            updated_at_doc=parse_date(item.get("updated_at_doc", "")),
            sidebar_label=item.get("sidebar_label", "On this page"),
            intro_heading=item.get("intro_heading"),
            intro_content=item.get("intro_content"),
            sections=item.get("sections", []),
        )
        for item in data.get("terms", [])
    ]
    return (
        products + solutions + research + developers + blog
        + customers + company + milestones + team + partners
        + contact_copy + terms
    )


async def seed(reset: bool) -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as db:
        if reset:
            for model in (
                Product,
                Solution,
                ResearchTopic,
                DeveloperResource,
                BlogPost,
                Customer,
                CompanySection,
                CompanyMilestone,
                CompanyPartner,
                CompanyTeamMember,
                NavigationItem,
                TermsPage,
            ):
                await db.execute(delete(model))
            await db.commit()

        for locale in LOCALES:
            path = CONTENT_DIR / locale / "content.json"
            if not path.exists():
                print(f"[skip] {path} introuvable")
                continue
            data = json.loads(path.read_text(encoding="utf-8"))
            for row in content_rows(locale, data):
                model = type(row)
                if hasattr(row, "slug"):
                    field, value = "slug", row.slug
                elif model is CompanyContactCopy:
                    continue
                elif hasattr(row, "key"):
                    field, value = "key", row.key
                elif hasattr(row, "date_label") and hasattr(row, "title"):
                    exists = await db.execute(
                        select(model).where(  # type: ignore[arg-type]
                            model.locale == locale,  # type: ignore[attr-defined]
                            model.date_label == row.date_label,  # type: ignore[attr-defined]
                            model.title == row.title,  # type: ignore[attr-defined]
                        )
                    )
                    if exists.scalar_one_or_none() is None:
                        db.add(row)
                    continue
                else:
                    db.add(row)
                    continue
                exists = await db.execute(
                    select(model).where(
                        model.locale == locale,  # type: ignore[attr-defined]
                        getattr(model, field) == value,  # type: ignore[attr-defined]
                    )
                )
                if exists.scalar_one_or_none() is None:
                    db.add(row)
            await db.commit()
            print(f"[ok] {locale}: {path.name}")

        # Copie Contact : upsert par locale (une seule ligne par langue)
        for locale in LOCALES:
            path = CONTENT_DIR / locale / "content.json"
            if not path.exists():
                continue
            data = json.loads(path.read_text(encoding="utf-8"))
            row = contact_copy_row(locale, data)
            existing = await db.execute(
                select(CompanyContactCopy).where(CompanyContactCopy.locale == locale)
            )
            current = existing.scalar_one_or_none()
            if current is None:
                db.add(row)
            else:
                for column in CompanyContactCopy.__table__.columns:
                    if column.name in ("id", "locale", "created_at", "updated_at"):
                        continue
                    setattr(current, column.name, getattr(row, column.name))
        await db.commit()
        print("[ok] copie contact seedée")

        for item in NAV_ITEMS:
            exists = await db.execute(
                select(NavigationItem).where(NavigationItem.key == item["key"])
            )
            if exists.scalar_one_or_none() is None:
                db.add(NavigationItem(**item))
        await db.commit()
        print("[ok] navigation seedée")


async def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reset", action="store_true", help="vider les tables avant de re-seed")
    args = parser.parse_args()
    await seed(reset=args.reset)
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())

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
    CompanySection,
    Customer,
    DeveloperResource,
    NavigationItem,
    Product,
    ResearchTopic,
    Solution,
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
        )
        for item in data.get("customers", [])
    ]
    company = [
        CompanySection(locale=locale, key=key, content=text)
        for key, text in data.get("company", {}).items()
    ]
    return products + solutions + research + developers + blog + customers + company


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
                NavigationItem,
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
                else:
                    field, value = "key", row.key
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

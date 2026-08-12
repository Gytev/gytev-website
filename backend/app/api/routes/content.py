from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models import (
    BlogPost,
    CompanySection,
    Customer,
    DeveloperResource,
    Product,
    ResearchTopic,
    Solution,
)
from app.schemas import ContentBundle

router = APIRouter(prefix="/content", tags=["content"])
Db = Annotated[AsyncSession, Depends(get_db)]

SUPPORTED_LOCALES = {"en", "fr"}


@router.get("/{locale}", response_model=ContentBundle)
async def content_bundle(locale: str, db: Db) -> ContentBundle:
    """Assemble le contenu d'une locale dans le format de content/*.json."""
    if locale not in SUPPORTED_LOCALES:
        raise HTTPException(status_code=404, detail="Unsupported locale")

    async def all_by_locale(model) -> list:
        result = await db.execute(select(model).where(model.locale == locale))
        return list(result.scalars().all())

    company = {
        section.key: section.content
        for section in await all_by_locale(CompanySection)
    }

    return ContentBundle(
        products=await all_by_locale(Product),
        solutions=await all_by_locale(Solution),
        research=await all_by_locale(ResearchTopic),
        developerResources=await all_by_locale(DeveloperResource),
        blog=await all_by_locale(BlogPost),
        customers=await all_by_locale(Customer),
        company=company,
    )

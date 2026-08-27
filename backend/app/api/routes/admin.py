from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import require_api_key
from app.models import (
    BlogPost,
    CompanySection,
    Customer,
    DeveloperResource,
    NavigationItem,
    Product,
    ResearchTopic,
    Solution,
    TermsPage,
)
from app.schemas import Overview

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_api_key)])
Db = Annotated[AsyncSession, Depends(get_db)]

MODELS = {
    "products": Product,
    "solutions": Solution,
    "research": ResearchTopic,
    "developers": DeveloperResource,
    "blog": BlogPost,
    "customers": Customer,
    "company": CompanySection,
    "navigation": NavigationItem,
    "terms": TermsPage,
}


@router.get("/overview", response_model=Overview)
async def overview(db: Db) -> Overview:
    counts: dict[str, int] = {}
    for key, model in MODELS.items():
        result = await db.execute(select(func.count()).select_from(model))
        counts[key] = result.scalar_one()
    return Overview(**counts)

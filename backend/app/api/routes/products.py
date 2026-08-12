from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas import ProductRead
from app.services.content import list_products

router = APIRouter(prefix="/products", tags=["products"])
Db = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=list[ProductRead])
async def products(db: Db) -> list[ProductRead]:
    return await list_products(db)

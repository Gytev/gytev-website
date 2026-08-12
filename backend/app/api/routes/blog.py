from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas import BlogPostRead
from app.services.content import list_blog_posts

router = APIRouter(prefix="/blog", tags=["blog"])
Db = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=list[BlogPostRead])
async def blog(db: Db) -> list[BlogPostRead]:
    return await list_blog_posts(db)

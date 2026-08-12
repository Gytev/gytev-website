from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import BlogPost, Product


async def list_products(db: AsyncSession) -> list[Product]:
    result = await db.execute(select(Product).order_by(Product.name))
    return list(result.scalars().all())


async def list_blog_posts(db: AsyncSession) -> list[BlogPost]:
    result = await db.execute(select(BlogPost).order_by(BlogPost.published_at.desc()))
    return list(result.scalars().all())

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import require_api_key
from app.models.models import TimestampMixin

Db = Annotated[AsyncSession, Depends(get_db)]


async def get_or_404[ModelT: TimestampMixin](
    db: AsyncSession, model: type[ModelT], item_id: UUID
) -> ModelT:
    result = await db.execute(select(model).where(model.id == item_id))  # type: ignore[attr-defined]
    obj = result.scalar_one_or_none()
    if obj is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return obj  # type: ignore[return-value]


def content_router[ModelT: TimestampMixin](
    *,
    model: type[ModelT],
    prefix: str,
    tags: list[str],
    read_schema: type[BaseModel],
    create_schema: type[BaseModel],
    update_schema: type[BaseModel],
) -> APIRouter:
    """Fabrique un routeur REST CRUD (GET public, écritures protégées par clé API)."""
    router = APIRouter(prefix=prefix, tags=tags)

    @router.get("", response_model=list[read_schema])
    async def list_items(
        db: Db,
        locale: str | None = Query(default=None, max_length=8),
    ) -> list[read_schema]:  # type: ignore[valid-type]
        query = select(model).order_by(model.created_at)  # type: ignore[attr-defined]
        if locale:
            query = query.where(model.locale == locale)  # type: ignore[attr-defined]
        result = await db.execute(query)
        return list(result.scalars().all())

    @router.get("/{item_id}", response_model=read_schema)
    async def get_item(item_id: UUID, db: Db) -> read_schema:  # type: ignore[valid-type]
        return await get_or_404(db, model, item_id)  # type: ignore[return-value]

    @router.post(
        "",
        response_model=read_schema,
        status_code=status.HTTP_201_CREATED,
        dependencies=[Depends(require_api_key)],
    )
    async def create_item(payload: create_schema, db: Db) -> read_schema:  # type: ignore[valid-type]
        obj = model(**payload.model_dump())
        db.add(obj)
        try:
            await db.commit()
        except Exception as exc:  # integrity / validation errors
            await db.rollback()
            raise HTTPException(status_code=400, detail=f"Could not create: {exc}") from exc
        await db.refresh(obj)
        return obj  # type: ignore[return-value]

    @router.patch(
        "/{item_id}",
        response_model=read_schema,
        dependencies=[Depends(require_api_key)],
    )
    async def update_item(
        item_id: UUID,
        payload: update_schema,
        db: Db,
    ) -> read_schema:  # type: ignore[valid-type]
        obj = await get_or_404(db, model, item_id)
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(obj, field, value)
        try:
            await db.commit()
        except Exception as exc:
            await db.rollback()
            raise HTTPException(status_code=400, detail=f"Could not update: {exc}") from exc
        await db.refresh(obj)
        return obj  # type: ignore[return-value]

    @router.delete(
        "/{item_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(require_api_key)],
    )
    async def delete_item(item_id: UUID, db: Db) -> None:
        obj = await get_or_404(db, model, item_id)
        await db.delete(obj)
        await db.commit()

    return router

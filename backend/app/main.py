from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api import router
from app.core.config import get_settings
from app.core.database import Base, engine

settings = get_settings()


async def _run_light_migrations() -> None:
    """Idempotent ALTERs for columns added after the first deploy."""
    async with engine.begin() as conn:
        await conn.execute(
            text("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image VARCHAR(500)")
        )
        await conn.execute(
            text(
                "ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured "
                "BOOLEAN NOT NULL DEFAULT FALSE"
            )
        )


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await _run_light_migrations()
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    debug=settings.debug,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"name": settings.app_name, "docs": "/docs"}

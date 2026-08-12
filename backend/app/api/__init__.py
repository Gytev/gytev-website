from fastapi import APIRouter

from app.api.routes import api_router

router = APIRouter(prefix="/api")
router.include_router(api_router)

__all__ = ["router"]

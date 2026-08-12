from fastapi import APIRouter

router = APIRouter(prefix="/company", tags=["company"])


@router.get("")
async def company() -> dict[str, list[str]]:
    return {"sections": ["about", "story", "newsroom", "careers", "contact"]}

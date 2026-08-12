from fastapi import APIRouter

router = APIRouter(prefix="/solutions", tags=["solutions"])


@router.get("")
async def solutions() -> dict[str, list[str]]:
    return {"items": ["business", "government", "education", "developers"]}

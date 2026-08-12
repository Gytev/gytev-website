from fastapi import APIRouter

router = APIRouter(prefix="/developers", tags=["developers"])


@router.get("")
async def developers() -> dict[str, list[str]]:
    return {"resources": ["api", "sdks", "status"]}

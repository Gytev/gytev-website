from fastapi import APIRouter

router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("")
async def customers() -> dict[str, list[str]]:
    return {"items": ["tamara-fintech", "dakar-city"]}

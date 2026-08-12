from fastapi import APIRouter

router = APIRouter(prefix="/research", tags=["research"])


@router.get("")
async def research() -> dict[str, list[str]]:
    return {"topics": ["language-models", "speech-audio", "information-retrieval"]}

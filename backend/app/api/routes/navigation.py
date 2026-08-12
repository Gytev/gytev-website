from fastapi import APIRouter

router = APIRouter(prefix="/navigation", tags=["navigation"])


@router.get("")
async def navigation() -> dict[str, list[dict[str, str]]]:
    return {
        "items": [
            {"key": "products", "href": "/products"},
            {"key": "solutions", "href": "/solutions"},
            {"key": "research", "href": "/research"},
            {"key": "developers", "href": "/developers"},
            {"key": "blog", "href": "/blog"},
            {"key": "customers", "href": "/customers"},
            {"key": "company", "href": "/company"},
        ]
    }

from httpx import AsyncClient

from app.core import security
from app.core.config import Settings

PRODUCT = {
    "locale": "en",
    "slug": "rio",
    "name": "Rio",
    "tagline": "Digital twin for agriculture.",
    "description": "An IoT box senses the field.",
    "href": "/products/rio",
}


async def test_writes_require_api_key(client: AsyncClient, monkeypatch) -> None:
    monkeypatch.setattr(security, "get_settings", lambda: Settings(admin_api_key="secret"))

    no_key = await client.post("/api/products", json=PRODUCT)
    assert no_key.status_code == 401

    wrong_key = await client.post(
        "/api/products", json=PRODUCT, headers={"X-API-Key": "nope"}
    )
    assert wrong_key.status_code == 401

    with_key = await client.post(
        "/api/products", json=PRODUCT, headers={"X-API-Key": "secret"}
    )
    assert with_key.status_code == 201
    assert with_key.json()["name"] == "Rio"


async def test_reads_stay_public(client: AsyncClient, monkeypatch) -> None:
    monkeypatch.setattr(security, "get_settings", lambda: Settings(admin_api_key="secret"))
    await client.post("/api/products", json=PRODUCT, headers={"X-API-Key": "secret"})

    listing = await client.get("/api/products")
    assert listing.status_code == 200

from httpx import AsyncClient


async def test_health(client: AsyncClient) -> None:
    response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "gytev-backend"}


async def test_navigation_empty(client: AsyncClient) -> None:
    response = await client.get("/api/navigation")
    assert response.status_code == 200
    assert response.json() == []


async def test_root(client: AsyncClient) -> None:
    response = await client.get("/")
    assert response.status_code == 200
    assert response.json()["name"] == "Gytev API"

from httpx import AsyncClient

PRODUCT = {
    "locale": "en",
    "slug": "rio",
    "name": "Rio",
    "tagline": "Digital twin for agriculture.",
    "description": "An IoT box senses the field.",
    "href": "/products/rio",
}


async def test_crud_product(client: AsyncClient) -> None:
    created = await client.post("/api/products", json=PRODUCT)
    assert created.status_code == 201
    body = created.json()
    item_id = body["id"]
    assert body["name"] == "Rio"

    listing = await client.get("/api/products")
    assert listing.status_code == 200
    assert len(listing.json()) == 1

    one = await client.get(f"/api/products/{item_id}")
    assert one.status_code == 200
    assert one.json()["slug"] == "rio"

    updated = await client.patch(f"/api/products/{item_id}", json={"tagline": "Updated."})
    assert updated.status_code == 200
    assert updated.json()["tagline"] == "Updated."

    deleted = await client.delete(f"/api/products/{item_id}")
    assert deleted.status_code == 204
    assert (await client.get("/api/products")).json() == []


async def test_get_404(client: AsyncClient) -> None:
    response = await client.get("/api/products/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404


async def test_locale_filter(client: AsyncClient) -> None:
    en = {**PRODUCT, "slug": "rio-en"}
    fr = {**PRODUCT, "slug": "rio-fr", "locale": "fr"}
    await client.post("/api/products", json=en)
    await client.post("/api/products", json=fr)

    only_fr = await client.get("/api/products", params={"locale": "fr"})
    assert [p["slug"] for p in only_fr.json()] == ["rio-fr"]


async def test_content_bundle(client: AsyncClient) -> None:
    await client.post("/api/products", json=PRODUCT)
    await client.post(
        "/api/company",
        json={"locale": "en", "key": "about", "content": "Gytev builds intelligent systems."},
    )

    bundle = await client.get("/api/content/en")
    assert bundle.status_code == 200
    body = bundle.json()
    assert body["products"][0]["slug"] == "rio"
    assert body["company"]["about"] == "Gytev builds intelligent systems."


async def test_content_bundle_unsupported_locale(client: AsyncClient) -> None:
    response = await client.get("/api/content/zz")
    assert response.status_code == 404


async def test_overview_requires_auth_disabled_by_default(client: AsyncClient) -> None:
    response = await client.get("/api/admin/overview")
    assert response.status_code == 200
    assert response.json()["products"] == 0

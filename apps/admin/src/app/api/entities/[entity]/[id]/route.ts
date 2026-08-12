import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api";
import { getEntity } from "@/lib/entities";

type Params = { entity: string; id: string };

export async function PATCH(request: Request, context: { params: Promise<Params> }) {
  const { entity: entitySlug, id } = await context.params;
  const entity = getEntity(entitySlug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const data = await apiFetch(`${entity.endpoint}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<Params> }) {
  const { entity: entitySlug, id } = await context.params;
  const entity = getEntity(entitySlug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  try {
    await apiFetch(`${entity.endpoint}/${id}`, { method: "DELETE" });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

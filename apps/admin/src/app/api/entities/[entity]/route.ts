import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api";
import { getEntity } from "@/lib/entities";

export async function POST(request: Request, context: { params: Promise<{ entity: string }> }) {
  const { entity: entitySlug } = await context.params;
  const entity = getEntity(entitySlug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const data = await apiFetch(entity.endpoint, { method: "POST", body: JSON.stringify(body) });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

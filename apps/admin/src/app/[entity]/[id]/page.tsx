import { notFound } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { getEntity } from "@/lib/entities";
import { EntityForm } from "@/components/EntityForm";
import { PageHeader } from "@/components/ui";

type Props = {
  params: Promise<{ entity: string; id: string }>;
};

export default async function EditEntityPage({ params }: Props) {
  const { entity: entitySlug, id } = await params;
  const entity = getEntity(entitySlug);
  if (!entity) notFound();

  let item: Record<string, unknown> | null = null;
  try {
    item = await apiFetch<Record<string, unknown>>(`${entity.endpoint}/${id}`);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow={`Gytev · ${entity.plural}`}
        title={`Modifier ${entity.label.toLowerCase()}`}
        description={String(item[entity.titleField] ?? id)}
      />
      <div className="mt-8">
        <EntityForm entity={entity} initial={item} id={id} />
      </div>
    </div>
  );
}

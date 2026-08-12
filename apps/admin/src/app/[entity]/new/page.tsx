import { notFound } from "next/navigation";

import { getEntity } from "@/lib/entities";
import { EntityForm } from "@/components/EntityForm";
import { PageHeader } from "@/components/ui";

type Props = {
  params: Promise<{ entity: string }>;
};

export default async function NewEntityPage({ params }: Props) {
  const { entity: entitySlug } = await params;
  const entity = getEntity(entitySlug);
  if (!entity) notFound();

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow={`Gytev · Nouveau`}
        title={`Nouveau ${entity.label.toLowerCase()}`}
        description="Renseigne les champs puis enregistre."
      />
      <div className="mt-8">
        <EntityForm entity={entity} initial={null} />
      </div>
    </div>
  );
}

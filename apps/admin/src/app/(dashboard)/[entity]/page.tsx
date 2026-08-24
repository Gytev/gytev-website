import Link from "next/link";
import { notFound } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { getEntity } from "@/lib/entities";
import { EntityTable } from "@/components/EntityTable";
import { PageHeader, buttonPrimary } from "@/components/ui";

type Props = {
  params: Promise<{ entity: string }>;
};

export default async function EntityListPage({ params }: Props) {
  const { entity: entitySlug } = await params;
  const entity = getEntity(entitySlug);
  if (!entity) notFound();

  let rows: Record<string, unknown>[] = [];
  let error: string | null = null;
  try {
    rows = await apiFetch<Record<string, unknown>[]>(entity.endpoint);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Impossible de charger les éléments.";
  }

  return (
    <div>
      <PageHeader
        eyebrow="Gytev · Contenu"
        title={entity.plural}
        description={`${rows.length} élément${rows.length > 1 ? "s" : ""} en base.`}
        action={
          <Link href={`/${entity.slug}/new`} className={buttonPrimary}>
            + Nouveau
          </Link>
        }
      />

      <div className="mt-8">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <EntityTable entity={entity} rows={rows} />
        )}
      </div>
    </div>
  );
}

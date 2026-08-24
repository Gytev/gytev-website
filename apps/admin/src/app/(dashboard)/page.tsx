import Link from "next/link";

import { apiFetch } from "@/lib/api";
import { entities } from "@/lib/entities";
import { Card, EntityIcon, PageHeader, buttonPrimary } from "@/components/ui";

type Overview = {
  products: number;
  solutions: number;
  research: number;
  developers: number;
  blog: number;
  customers: number;
  company: number;
  navigation: number;
};

export default async function AdminDashboard() {
  let overview: Overview | null = null;
  let error: string | null = null;

  try {
    overview = await apiFetch<Overview>("/admin/overview");
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Impossible de joindre l'API.";
  }

  if (error || !overview) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-800">API injoignable</h2>
        <p className="mt-1 text-sm text-red-700">{error}</p>
        <p className="mt-4 text-sm text-red-700">
          Vérifie que le backend tourne (./scripts/dev.sh backend) et que
          GYTEV_API_URL/GYTEV_API_KEY sont configurés dans apps/admin/.env.local.
        </p>
      </div>
    );
  }

  const total = entities.reduce(
    (sum, entity) => sum + (overview[entity.slug as keyof Overview] ?? 0),
    0
  );

  return (
    <div>
      <PageHeader
        eyebrow="Gytev · Console"
        title="Dashboard"
        description="Vue d'ensemble du contenu en base."
        action={
          <Link href="/products/new" className={buttonPrimary}>
            + Nouveau contenu
          </Link>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total contenu", value: total },
          {
            label: "Entités",
            value: entities.length,
          },
          {
            label: "Langues",
            value: 2,
          },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="flex items-center justify-between gap-3 p-5"
          >
            <div>
              <p className="text-3xl font-semibold tracking-tight text-zinc-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {stat.label}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {entities.map((entity) => {
          const count = overview[entity.slug as keyof Overview] ?? 0;
          return (
            <Link
              key={entity.slug}
              href={`/${entity.slug}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <EntityIcon slug={entity.slug} label={entity.plural} />
                <p className="text-sm font-medium text-zinc-600">{entity.plural}</p>
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900">
                {count}
              </p>
              <p className="mt-4 text-sm font-medium text-zinc-400 transition-colors group-hover:text-orange-600">
                Gérer →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

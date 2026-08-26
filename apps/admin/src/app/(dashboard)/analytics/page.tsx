import Link from "next/link";

import { apiFetch } from "@/lib/api";
import { Card, PageHeader } from "@/components/ui";

type Named = { name: string; value: number };
type Daily = { date: string; views: number; visitors: number };

type Summary = {
  days: number;
  totals: { views: number; visitors: number; bounce_rate: number };
  daily: Daily[];
  top_pages: Named[];
  exits: Named[];
  countries: Named[];
  devices: Named[];
  referrers: Named[];
};

const COUNTRY_NAMES: Record<string, string> = {
  BJ: "Bénin",
  NG: "Nigéria",
  CI: "Côte d'Ivoire",
  GH: "Ghana",
  SN: "Sénégal",
  FR: "France",
  BE: "Belgique",
  US: "États-Unis",
  GB: "Royaume-Uni",
  CA: "Canada",
  "??": "Inconnu",
};

function countryLabel(code: string) {
  return COUNTRY_NAMES[code] ?? code;
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="flex flex-col gap-1 p-5">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="text-3xl font-semibold text-zinc-900">{value}</p>
    </Card>
  );
}

function BarList({
  title,
  items,
  format,
}: {
  title: string;
  items: Named[];
  format?: (name: string) => string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <Card className="p-5">
      <p className="mb-3 text-sm font-medium text-zinc-900">{title}</p>
      {items.length === 0 ? (
        <p className="text-sm text-zinc-400">Aucune donnée.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.name}>
              <div className="flex justify-between text-xs text-zinc-600">
                <span className="truncate">{format ? format(item.name) : item.name}</span>
                <span className="shrink-0 font-medium">{item.value}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-[#c45824]"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const params = await searchParams;
  const days = [7, 14, 30].includes(Number(params.days)) ? Number(params.days) : 14;

  let summary: Summary | null = null;
  let error: string | null = null;
  try {
    summary = await apiFetch<Summary>(`/analytics/summary?days=${days}`);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Impossible de joindre l'API.";
  }

  const maxDaily = Math.max(1, ...(summary?.daily.map((d) => d.views) ?? [1]));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-8">
      <PageHeader eyebrow="Analytics" title="Analytics" description={`Trafic des ${days} derniers jours.`} />

      <div className="flex gap-2">
        {[7, 14, 30].map((d) => (
          <Link
            key={d}
            href={`/analytics?days=${d}`}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              d === days
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 bg-white hover:border-zinc-900"
            }`}
          >
            {d} j
          </Link>
        ))}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {summary && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Kpi label="Pages vues" value={summary.totals.views.toLocaleString("fr-FR")} />
            <Kpi label="Visiteurs (sessions)" value={summary.totals.visitors.toLocaleString("fr-FR")} />
            <Kpi label="Taux de rebond" value={`${summary.totals.bounce_rate}%`} />
          </div>

          <Card className="p-5">
            <p className="mb-4 text-sm font-medium text-zinc-900">Pages vues par jour</p>
            <div className="flex h-36 items-end gap-1.5">
              {summary.daily.length === 0 && (
                <p className="text-sm text-zinc-400">Aucune visite sur la période.</p>
              )}
              {summary.daily.map((d) => (
                <div key={d.date} className="group relative flex-1">
                  <div
                    className="w-full rounded-t bg-[#c45824] transition-opacity group-hover:opacity-80"
                    style={{ height: `${Math.max(4, (d.views / maxDaily) * 130)}px` }}
                  />
                  <p className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] text-white group-hover:block">
                    {d.date}: {d.views} vues / {d.visitors} vis.
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <BarList title="Top pages" items={summary.top_pages} />
            <BarList title="Pages de sortie" items={summary.exits} />
            <BarList title="Pays" items={summary.countries} format={countryLabel} />
            <BarList title="Appareils" items={summary.devices} />
            <BarList title="Référents" items={summary.referrers} />
          </div>
        </>
      )}
    </div>
  );
}

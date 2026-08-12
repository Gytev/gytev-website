"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { EntityConfig } from "@/lib/entities";
import { cx } from "@/lib/cn";
import { Badge, Card, type BadgeTone } from "./ui";

type Row = Record<string, unknown>;

type EntityTableProps = {
  entity: EntityConfig;
  rows: Row[];
};

export function EntityTable({ entity, rows }: EntityTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let result = rows;
    if (normalized) {
      result = result.filter((row) =>
        entity.showFields.some((field) =>
          String(row[field] ?? "").toLowerCase().includes(normalized)
        )
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aValue = String(a[sortKey] ?? "").toLowerCase();
        const bValue = String(b[sortKey] ?? "").toLowerCase();
        const cmp = aValue.localeCompare(bValue);
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [entity.showFields, query, rows, sortDir, sortKey]);

  function toggleSort(field: string) {
    if (sortKey === field) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(field);
      setSortDir("asc");
    }
  }

  async function handleDelete(row: Row) {
    if (!window.confirm(`Supprimer « ${String(row[entity.titleField] ?? "")} » ?`)) {
      return;
    }
    setPendingId(String(row.id));
    setError(null);
    try {
      const response = await fetch(`/api/entities/${entity.slug}/${String(row.id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Suppression impossible");
      }
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erreur inconnue");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div>
      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Rechercher dans ${entity.plural.toLowerCase()}…`}
            className="w-72 max-w-full rounded-full border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <p className="text-sm text-zinc-400">
          {filtered.length} / {rows.length} élément{rows.length > 1 ? "s" : ""}
        </p>
      </div>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
            <p className="text-sm text-zinc-500">
              {query ? "Aucun résultat pour cette recherche." : "Aucun élément. Crée le premier."}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                {entity.showFields.map((field) => (
                  <th key={field} className="px-4 py-3 text-left">
                    <button
                      type="button"
                      onClick={() => toggleSort(field)}
                      className={cx(
                        "group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors",
                        sortKey === field
                          ? "text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-700"
                      )}
                    >
                      {field}
                      <span
                        className={cx(
                          "text-[10px] transition-opacity",
                          sortKey === field
                            ? "opacity-100 text-orange-600"
                            : "opacity-0 group-hover:opacity-60"
                        )}
                      >
                        {sortKey === field && sortDir === "desc" ? "↓" : "↑"}
                      </span>
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((row) => (
                <tr key={String(row.id)} className="transition-colors hover:bg-orange-50/40">
                  {entity.showFields.map((field) => (
                    <td key={field} className="px-4 py-3 text-sm text-zinc-700">
                      <CellValue field={field} value={row[field]} />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/${entity.slug}/${String(row.id)}`}
                        className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-900 hover:text-white"
                      >
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(row)}
                        disabled={pendingId === String(row.id)}
                        className="rounded-full px-4 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        {pendingId === String(row.id) ? "…" : "Supprimer"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

function CellValue({ field, value }: { field: string; value: unknown }) {
  if (value === "en" || value === "fr") {
    return <Badge tone="locale">{value === "en" ? "EN" : "FR"}</Badge>;
  }
  if (field === "status") {
    const tones: Record<string, BadgeTone> = {
      published: "published",
      "in-progress": "in-progress",
      internal: "internal",
    };
    return <Badge tone={tones[String(value)] ?? "internal"}>{String(value)}</Badge>;
  }
  if (field === "kind") {
    return <Badge tone="kind">{String(value)}</Badge>;
  }
  if (field === "published_at") {
    return value ? <Badge tone="published">{String(value).slice(0, 10)}</Badge> : "—";
  }
  return <>{formatValue(value)}</>;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

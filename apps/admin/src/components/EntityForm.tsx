"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { EntityConfig, FieldConfig } from "@/lib/entities";
import { buttonGhost, buttonPrimary } from "./ui";

type Row = Record<string, unknown>;

type EntityFormProps = {
  entity: EntityConfig;
  initial?: Row | null;
  id?: string;
};

const inputStyles =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function EntityForm({ entity, initial, id }: EntityFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(() =>
    buildInitialValues(entity.fields, initial ?? {})
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update(field: FieldConfig, rawValue: string) {
    setValues((prev) => ({ ...prev, [field.name]: rawValue }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = buildPayload(entity.fields, values);
    const missing = entity.fields
      .filter((field) => field.required && !payload[field.name])
      .map((field) => field.label);
    if (missing.length > 0) {
      setError(`Champs requis manquants : ${missing.join(", ")}.`);
      setSaving(false);
      return;
    }

    try {
      const url = id
        ? `/api/entities/${entity.slug}/${id}`
        : `/api/entities/${entity.slug}`;
      const response = await fetch(url, {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Enregistrement impossible");
      }
      router.push(`/${entity.slug}`);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erreur inconnue");
      setSaving(false);
    }
  }

  const requiredCount = entity.fields.filter((field) => field.required).length;

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-zinc-900">
              {id ? "Détails de l'élément" : "Nouvel élément"}
            </p>
            <p className="text-xs text-zinc-400">
              {requiredCount} champ{requiredCount > 1 ? "s" : ""} requis ·{" "}
              <span className="text-red-500">*</span>
            </p>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6 lg:px-8">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {entity.fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                {field.label}
                {field.required ? <span className="text-red-500"> *</span> : null}
              </label>
              <FieldInput field={field} value={values[field.name] ?? ""} onChange={update} />
              {field.hint ? (
                <p className="mt-1.5 text-xs text-zinc-400">{field.hint}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-b-2xl border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 lg:px-8">
          <button type="submit" disabled={saving} className={buttonPrimary}>
            {saving ? "Enregistrement…" : id ? "Enregistrer" : "Créer"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${entity.slug}`)}
            className={buttonGhost}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  onChange: (field: FieldConfig, value: string) => void;
}) {
  const kind = field.kind ?? "text";

  if (kind === "textarea") {
    return (
      <textarea
        id={field.name}
        value={value}
        onChange={(event) => onChange(field, event.target.value)}
        rows={4}
        placeholder={field.placeholder}
        className={`${inputStyles} resize-y leading-relaxed`}
      />
    );
  }

  if (kind === "select") {
    return (
      <div className="relative">
        <select
          id={field.name}
          value={value}
          onChange={(event) => onChange(field, event.target.value)}
          className={`${inputStyles} appearance-none pr-10`}
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }

  return (
    <input
      id={field.name}
      type={kind === "number" ? "number" : "text"}
      value={value}
      onChange={(event) => onChange(field, event.target.value)}
      placeholder={field.placeholder}
      className={inputStyles}
    />
  );
}

function buildInitialValues(fields: FieldConfig[], initial: Row): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    const existing = initial[field.name];
    if (existing !== undefined && existing !== null) {
      values[field.name] = Array.isArray(existing) ? existing.join(", ") : String(existing);
    } else if (field.defaultValue !== undefined) {
      values[field.name] = Array.isArray(field.defaultValue)
        ? field.defaultValue.join(", ")
        : String(field.defaultValue);
    } else {
      values[field.name] = "";
    }
  }
  return values;
}

function buildPayload(fields: FieldConfig[], values: Record<string, string>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = (values[field.name] ?? "").trim();
    switch (field.kind) {
      case "list":
        payload[field.name] = raw ? raw.split(",").map((item) => item.trim()).filter(Boolean) : [];
        break;
      case "number":
        payload[field.name] = raw === "" ? 0 : Number(raw);
        break;
      default:
        payload[field.name] = field.name === "published_at" && raw === "" ? null : raw;
    }
  }
  return payload;
}

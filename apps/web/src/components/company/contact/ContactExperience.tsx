"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/company/about/Reveal";
import type { Dictionary } from "@gytev/i18n";

type Locale = "en" | "fr";
type Copy = Dictionary["pages"]["companyDetail"]["contactPage"];
type TopicId = "team" | "support" | "press" | "privacy" | "vulnerability";

type Field =
  | { kind: "text" | "email"; key: string; label: string; placeholder: string; required?: boolean }
  | { kind: "textarea"; key: string; label: string; placeholder: string; required?: boolean }
  | { kind: "select"; key: string; label: string; placeholder: string; options: string[]; required?: boolean }
  | { kind: "checkbox"; key: string; label: string };

function fieldsFor(copy: Copy, topic: TopicId): Field[] {
  const f = copy.forms;
  if (topic === "team") {
    return [
      { kind: "text", key: "firstname", label: f.team.firstname.label, placeholder: f.team.firstname.placeholder, required: true },
      { kind: "text", key: "lastname", label: f.team.lastname.label, placeholder: f.team.lastname.placeholder, required: true },
      { kind: "email", key: "email", label: f.team.email.label, placeholder: f.team.email.placeholder, required: true },
      { kind: "text", key: "role", label: f.team.role.label, placeholder: f.team.role.placeholder, required: true },
      { kind: "textarea", key: "message", label: f.team.message.label, placeholder: f.team.message.placeholder, required: true },
      { kind: "checkbox", key: "updates", label: f.updates },
    ];
  }
  if (topic === "support") {
    return [
      { kind: "email", key: "email", label: f.support.email.label, placeholder: f.support.email.placeholder, required: true },
      { kind: "textarea", key: "issue", label: f.support.issue.label, placeholder: f.support.issue.placeholder, required: true },
    ];
  }
  if (topic === "press") {
    return [
      { kind: "text", key: "name", label: f.press.name.label, placeholder: f.press.name.placeholder, required: true },
      { kind: "email", key: "email", label: f.press.email.label, placeholder: f.press.email.placeholder, required: true },
      { kind: "text", key: "outlet", label: f.press.outlet.label, placeholder: f.press.outlet.placeholder },
      { kind: "textarea", key: "request", label: f.press.request.label, placeholder: f.press.request.placeholder, required: true },
    ];
  }
  if (topic === "privacy") {
    return [
      { kind: "email", key: "email", label: f.privacy.email.label, placeholder: f.privacy.email.placeholder, required: true },
      {
        kind: "select",
        key: "type",
        label: f.privacy.typeLabel,
        placeholder: f.privacy.typePlaceholder,
        options: ["access", "deletion", "rectification", "other"],
        required: true,
      },
      { kind: "textarea", key: "details", label: f.privacy.details.label, placeholder: f.privacy.details.placeholder, required: true },
    ];
  }
  return [
    { kind: "email", key: "email", label: f.vulnerability.email.label, placeholder: f.vulnerability.email.placeholder, required: true },
    { kind: "text", key: "product", label: f.vulnerability.product.label, placeholder: f.vulnerability.product.placeholder, required: true },
    { kind: "textarea", key: "report", label: f.vulnerability.report.label, placeholder: f.vulnerability.report.placeholder, required: true },
  ];
}

const PRIVACY_OPTION_KEYS = ["access", "deletion", "rectification", "other"] as const;

function privacyOptions(locale: Locale): string[] {
  return locale === "fr"
    ? ["Accès à mes données", "Suppression de mes données", "Rectification", "Autre"]
    : ["Data access", "Data deletion", "Rectification", "Other"];
}

function PixelArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className} aria-hidden="true">
      <path d="M13 25H9v-4h4v4Z" fill="currentColor" />
      <path d="M17 21h-4v-4h4v4Z" fill="currentColor" />
      <path d="M21 17h-4v-4h4v4Z" fill="currentColor" />
      <path d="M17 13h-4V9h4v4Z" fill="currentColor" />
      <path d="M13 9H9V5h4v4Z" fill="currentColor" />
    </svg>
  );
}

function RowIcon({ id }: { id: TopicId }) {
  const common = "block h-10 w-10 shrink-0";
  if (id === "team")
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" fill="currentColor" />
        <rect x="22" y="6" width="12" height="12" fill="currentColor" opacity=".35" />
        <rect x="6" y="22" width="12" height="12" fill="currentColor" opacity=".35" />
        <rect x="22" y="22" width="12" height="12" fill="currentColor" />
      </svg>
    );
  if (id === "support")
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden="true">
        <path d="M8 22v-4a12 12 0 0 1 24 0v4" stroke="currentColor" strokeWidth="3" />
        <rect x="4" y="20" width="8" height="12" rx="2" fill="currentColor" />
        <rect x="28" y="20" width="8" height="12" rx="2" fill="currentColor" />
        <path d="M28 32a6 6 0 0 1-6 4h-2v-3h2a3 3 0 0 0 3-2" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
    );
  if (id === "press")
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden="true">
        <rect x="5" y="9" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="3" />
        <path d="m6 11 14 11L34 11" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
    );
  if (id === "privacy")
    return (
      <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden="true">
        <rect x="8" y="17" width="24" height="17" rx="2" stroke="currentColor" strokeWidth="3" />
        <path d="M13 17v-4a7 7 0 0 1 14 0v4" stroke="currentColor" strokeWidth="3" fill="none" />
        <rect x="18" y="23" width="4" height="6" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 40 40" fill="none" className={common} aria-hidden="true">
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

function GhostButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "group relative flex items-center justify-center overflow-hidden h-8 py-1 px-3 rounded-md bg-zinc-900/[.06] hover:bg-zinc-900/[.12] text-sm font-medium text-[var(--ink)] transition-colors";
  const inner = (
    <>
      <span className="transition-transform duration-300 will-change-transform group-hover:translate-x-1">
        {children}
      </span>
      <span className="relative ml-1.5 inline-block w-3.5 transition-transform duration-300 will-change-transform group-hover:translate-x-2">
        <PixelArrow className="w-full" />
      </span>
    </>
  );
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function ContactSection({ locale, copy }: { locale: Locale; copy: Copy }) {
  const [active, setActive] = useState<TopicId>("team");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [updates, setUpdates] = useState(false);

  const currentFields = useMemo(() => fieldsFor(copy, active), [copy, active]);
  const titleOf = (id: TopicId) => copy.cards.titles[id];
  const privacyOpts = useMemo(() => privacyOptions(locale), [locale]);

  const select = (id: TopicId) => {
    setActive(id);
    setSent(false);
    setValues({});
    setUpdates(false);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      document
        .getElementById("contact-form-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const payload = {
        topic: active,
        ...values,
        updates,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const set = (key: string, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const rows: { id: TopicId; body: React.ReactNode }[] = [
    {
      id: "support",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          <li>
            {copy.cards.support.helpPrefix}
            <a href="#" className="underline underline-offset-2 hover:text-[var(--color-signal-600)]">{copy.cards.support.helpLink}</a>.
          </li>
          <li>
            <a href="#" className="underline underline-offset-2 hover:text-[var(--color-signal-600)]">{copy.cards.support.loginLink}</a>
            {copy.cards.support.loginSuffix}
          </li>
          <li>
            {copy.cards.support.discordPrefix}
            <a href="https://discord.gg/gytev" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-[var(--color-signal-600)]">{copy.cards.support.discordLabel}</a>
            {copy.cards.support.discordSuffix}
          </li>
        </ul>
      ),
    },
    {
      id: "press",
      body: (
        <p>
          {copy.cards.press.prefix}
          <a href={`mailto:${copy.cards.press.email}`} className="underline underline-offset-2 hover:text-[var(--color-signal-600)]">
            {copy.cards.press.email}
          </a>.
        </p>
      ),
    },
    { id: "privacy", body: <p>{copy.cards.privacy.text}</p> },
    {
      id: "vulnerability",
      body: (
        <>
          <p>{copy.cards.vulnerability.text}</p>
          <p className="text-sm text-zinc-500">{copy.cards.vulnerability.smallPrint}</p>
        </>
      ),
    },
  ];

  return (
    <section className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse md:grid md:grid-cols-[45%_55%]">
        {/* LEFT : topics */}
        <div className="flex flex-col gap-8 bg-[var(--color-surface)] px-4 py-16 sm:px-8 md:py-24 md:pr-16 lg:border-r lg:border-[var(--line)] lg:px-12">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{copy.helpHeading}</h2>

          {/* team card */}
          <div className={`border border-[var(--line)] ${active === "team" ? "bg-[var(--paper)]" : ""}`}>
            <button
              type="button"
              onClick={() => select("team")}
              aria-pressed={active === "team"}
              className="group flex w-full cursor-pointer items-center gap-3 p-5 text-left transition-colors outline-none hover:bg-[var(--paper)] focus-visible:ring-2 focus-visible:ring-[var(--color-signal-500)] md:p-8"
            >
              <span className={`block h-10 w-10 shrink-0 transition-colors ${active === "team" ? "text-[var(--color-signal-600)]" : "text-[var(--ink)]"}`}>
                <RowIcon id="team" />
              </span>
              <span className="text-xl font-medium tracking-tight transition-colors group-hover:text-[var(--color-signal-700)] sm:text-2xl">{titleOf("team")}</span>
              <span className={`ml-auto inline-block w-4 transition-all ${active === "team" ? "translate-x-0 opacity-100" : "opacity-30 group-hover:translate-x-1 group-hover:opacity-100"}`}>
                <PixelArrow className="w-full" />
              </span>
            </button>
          </div>

          {/* other topics */}
          <div className="divide-y divide-[var(--line)] border border-[var(--line)]">
            {rows.map(({ id, body }) => {
              const isActive = active === id;
              return (
                <div key={id} className={`flex flex-col items-start gap-3 p-5 transition-colors hover:bg-[var(--paper)]/60 md:p-8 ${isActive ? "bg-[var(--paper)]" : ""}`}>
                  <button
                    type="button"
                    onClick={() => select(id)}
                    aria-pressed={isActive}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-500)]"
                  >
                    <span className={`block h-10 w-10 shrink-0 transition-transform group-hover:-translate-y-0.5 ${isActive ? "text-[var(--color-signal-600)]" : "text-[var(--ink)]"}`}>
                      <RowIcon id={id} />
                    </span>
                    <span className="text-xl font-medium tracking-tight underline-offset-4 group-hover:underline sm:text-2xl">{titleOf(id)}</span>
                    <span className={`ml-auto inline-block w-4 transition-all ${isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-30 group-hover:translate-x-0 group-hover:opacity-100"}`}>
                      <PixelArrow className="w-full" />
                    </span>
                  </button>
                  <div className="prose-sm text-zinc-600 [&_a]:text-inherit">{body}</div>
                  {(id === "privacy" || id === "vulnerability") && (
                    <GhostButton onClick={() => select(id)}>{id === "privacy" ? copy.cards.privacy.cta : copy.cards.vulnerability.cta}</GhostButton>
                  )}
                  {id === "support" && (
                    <GhostButton href="#help-center" onClick={() => select("support")}>{copy.cards.support.cta}</GhostButton>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT : form */}
        <div id="contact-form-panel" className="scroll-mt-24 px-4 py-16 sm:px-8 md:py-24 lg:px-16">
          {sent ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-8 text-center">
              <span className="flex size-24 items-center justify-center rounded-full border border-[var(--line)] text-[var(--color-signal-600)]">
                <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10" aria-hidden="true">
                  <path d="m10 21 7 7L31 13" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                </svg>
              </span>
              <p className="text-lg font-medium">{copy.forms.thanks}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <input type="hidden" name="topic" value={active} />
              <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{titleOf(active)}</h2>

              {currentFields.map((field) => {
                if (field.kind === "checkbox") {
                  return (
                    <label key={field.key} className="flex cursor-pointer select-none items-start gap-3">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={updates}
                        onChange={(e) => setUpdates(e.target.checked)}
                      />
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-[var(--line)] bg-[var(--color-surface)] transition-colors peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-signal-500)]">
                        <svg viewBox="0 0 40 40" fill="none" className={`h-4 w-4 text-white transition-opacity ${updates ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                          <path d="m10 21 7 7L31 13" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
                        </svg>
                      </span>
                      <span className="text-sm leading-6 text-zinc-700">{field.label}</span>
                    </label>
                  );
                }

                const id = `${active}-${field.key}`;
                const value = values[field.key] ?? "";
                return (
                  <div key={field.key} className="flex flex-col items-start gap-2">
                    <label htmlFor={id} className="text-base font-medium text-[var(--ink)]">
                      {field.kind === "select" && locale === "fr" ? `${field.label} *` : field.label}
                      {field.required && field.kind !== "select" && <span className="text-[var(--color-signal-600)]">*</span>}
                    </label>
                    {field.kind === "textarea" ? (
                      <>
                        <textarea
                          id={id}
                          name={field.key}
                          rows={4}
                          maxLength={1000}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={value}
                          onChange={(e) => set(field.key, e.target.value)}
                          className="h-32 w-full resize-none rounded-md border border-[var(--line)] bg-[var(--color-surface)] p-4 text-base outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-500"
                        />
                        <div className="flex w-full justify-end">
                          <p className="text-sm tabular-nums text-zinc-400">{value.length} / 1000</p>
                        </div>
                      </>
                    ) : field.kind === "select" ? (
                      <select
                        id={id}
                        name={field.key}
                        required={field.required}
                        value={value}
                        onChange={(e) => set(field.key, e.target.value)}
                        className="w-full rounded-md border border-[var(--line)] bg-[var(--color-surface)] px-4 py-3 text-base outline-none transition-colors focus:border-zinc-500"
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {PRIVACY_OPTION_KEYS.map((k, i) => (
                          <option key={k} value={k}>
                            {privacyOpts[i]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={id}
                        name={field.key}
                        type={field.kind}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={value}
                        onChange={(e) => set(field.key, e.target.value)}
                        className="h-13 w-full rounded-md border border-[var(--line)] bg-[var(--color-surface)] px-4 text-base outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-500"
                      />
                    )}
                  </div>
                );
              })}

              {active === "team" && (
                <p className="text-sm leading-6 text-zinc-500">{copy.forms.legal}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-md bg-[var(--ink)] px-5 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 md:w-fit"
              >
                <span className="transition-transform duration-300 will-change-transform group-hover:translate-x-1">
                  {sending ? copy.forms.sending : copy.forms.submit}
                </span>
                <span className="relative ml-2 inline-block w-5 transition-transform duration-300 will-change-transform group-hover:translate-x-2">
                  <PixelArrow className="w-full" />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContactHero({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 pt-10 md:min-h-[220px] md:grid-cols-[70%_30%] md:gap-0">
        <div className="flex flex-col justify-end gap-3 px-4 pb-6 sm:px-8 md:p-6 lg:border-r lg:border-[var(--line)]">
          <h1 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl sm:leading-tight lg:text-6xl" style={{ textWrap: "balance" }}>
            {copy.heroTitle.split(" ").map((word, index, arr) => (
              <span
                key={`${word}-${index}`}
                className="about-hero__word"
                style={{ animationDelay: `${0.15 + index * 0.07}s` }}
              >
                {word}
                {index < arr.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>
        </div>
        <div className="flex items-end px-4 pb-6 sm:px-8 md:p-6">
          <Reveal delay={520} className="w-full">
            <p className="text-lg leading-relaxed text-zinc-600">{copy.heroSub}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

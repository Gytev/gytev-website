import { Container } from "@gytev/ui";
import { localizedHref } from "@gytev/i18n";
import type { Locale } from "@gytev/types";
import Link from "next/link";
import type { AudienceItem } from "@/lib/audiences";

export function AudiencePage({
  item,
  locale,
  eyebrow,
}: {
  item: AudienceItem;
  locale: Locale;
  eyebrow: string;
}) {
  const copy = item[locale === "fr" ? "fr" : "en"];

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-signal-500)]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-medium tracking-tight text-zinc-900">
            {copy.title}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            {copy.description}
          </p>
          <div className="mt-10">
            <Link
              href={localizedHref(locale, "/company/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              {locale === "fr" ? "Parlez-nous" : "Talk to us"}{" "}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                en: ["Ground-truth data", "Decisions built on what is actually happening, not on assumptions."],
                fr: ["Données terrain", "Des décisions fondées sur ce qui se passe réellement, pas sur des suppositions."],
              },
              {
                en: ["Edge AI", "Perception and prediction directly where your operations happen."],
                fr: ["IA embarquée", "Perception et prédiction directement là où vos opérations se déroulent."],
              },
              {
                en: ["Proven in the field", "Deployed and running in production, from farms to hospitals."],
                fr: ["Éprouvé sur le terrain", "Déployé et opérationnel en production, des fermes aux hôpitaux."],
              },
            ].map((card) => {
              const [title, text] = card[locale === "fr" ? "fr" : "en"];
              return (
                <div key={title} className="border border-zinc-200 bg-white p-8">
                  <h2 className="text-lg font-medium text-zinc-900">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

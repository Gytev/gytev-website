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
      <section className="border-b border-[rgba(255,255,255,0.08)] bg-[#0a0a0b]">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-signal-500)]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-medium tracking-tight text-[#f0ede8]">
            {copy.title}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#999]">
            {copy.description}
          </p>
          <div className="mt-10">
            <Link
              href={localizedHref(locale, "/company/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-[#f0ede8] px-6 py-3 text-sm font-medium text-[#0a0a0b] transition-colors hover:bg-white"
            >
              {locale === "fr" ? "Parlez-nous" : "Talk to us"}{" "}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-[#111113] py-16">
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
                <div key={title} className="border border-[rgba(255,255,255,0.08)] bg-[#141416] p-8">
                  <h2 className="text-lg font-medium text-[#f0ede8]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#999]">{text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

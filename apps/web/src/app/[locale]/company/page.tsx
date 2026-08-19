import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyHubPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);
  const l = locale as Locale;
  const labels = dict.pages.companySections;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO SECTION - Minimal & Assertive */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl" style={{ textWrap: 'balance' }}>
              Connecter l'intelligence numérique à la réalité physique.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
              {content.company.story}
            </p>
          </div>
        </Container>
      </section>

      {/* NAVIGATION ARCHITECTURE - Asymmetric Bento Grid */}
      <section className="border-t border-[var(--line)]">
        <Container className="py-24">
          <div className="grid grid-cols-1 gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3 border border-[var(--line)]">
            
            {/* ABOUT CARD - Span 2 columns on large screens */}
            <a
              href={localizedHref(l, "/company/about")}
              className="group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)] lg:col-span-2"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--ink)]">
                    {labels.about}
                  </h2>
                </div>
                <p className="mt-6 max-w-lg text-2xl font-medium leading-snug tracking-tight text-[var(--ink)] sm:text-3xl">
                  L'histoire, les fondateurs et notre empreinte dans le monde réel.
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[var(--color-signal-500)] group-hover:text-[var(--color-signal-500)]">
                  ↗
                </span>
              </div>
            </a>

            {/* VISION CARD */}
            <a
              href={localizedHref(l, "/company/vision")}
              className="group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {labels.vision}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                  {content.company.vision}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  Découvrir la thèse →
                </span>
              </div>
            </a>

            {/* CAREERS CARD */}
            <a
              href={localizedHref(l, "/company/careers")}
              className="group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {labels.careers}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                  {content.company.careers}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  Rejoindre l'équipe →
                </span>
              </div>
            </a>

            {/* CONTACT CARD */}
            <a
              href={localizedHref(l, "/company/contact")}
              className="group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)] lg:col-span-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {labels.contact}
                </h2>
                <span className="text-zinc-400 group-hover:text-[var(--color-signal-500)]">
                  ✉
                </span>
              </div>
              <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                {content.company.contact}
              </p>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

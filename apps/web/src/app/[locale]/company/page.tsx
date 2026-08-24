import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { Reveal } from "@/components/company/about/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "company");
}

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
      {/* HERO SECTION - Bilingual */}
      <section className="relative overflow-hidden pt-20 pb-14 lg:pt-28 lg:pb-20 border-b border-[var(--line)] bg-[var(--color-surface)]">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h1
                className="text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl"
                style={{ textWrap: "balance" }}
              >
                {locale === "fr"
                  ? "Connecter l'intelligence numérique à la réalité physique."
                  : "Connecting digital intelligence to the physical world."}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
                {content.company.story}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* NAVIGATION ARCHITECTURE - Bento Grid */}
      <section className="border-t border-[var(--line)]">
        <Container className="py-24">
          <div className="grid grid-cols-1 gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3 border border-[var(--line)]">
            {/* ABOUT CARD - Span 2 columns */}
                        <Reveal delay={60} className="lg:col-span-2">
<a
              href={localizedHref(l, "/company/about")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="company-pulse h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--ink)]">
                    {labels.about}
                  </h2>
                </div>
                <p className="mt-6 max-w-lg text-2xl font-medium leading-snug tracking-tight text-[var(--ink)] sm:text-3xl">
                  {locale === "fr"
                    ? "L'histoire, les fondateurs et notre empreinte dans le monde réel."
                    : "Our story, our founders, and our footprint in the real world."}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[var(--color-signal-500)] group-hover:text-[var(--color-signal-500)]">
                  ↗
                </span>
              </div>
            </a>
            </Reveal>

            {/* BLOG CARD */}
                        <Reveal delay={120}>
<a
              href={localizedHref(l, "/company/blog")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {locale === "fr" ? "Blog" : "Blog"}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                  {locale === "fr"
                    ? "Actualités, plongées techniques et récits de l'équipe."
                    : "News, engineering deep-dives and stories from the team."}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  {locale === "fr" ? "Lire →" : "Read →"}
                </span>
              </div>
            </a>
            </Reveal>

            {/* CUSTOMERS CARD */}
                        <Reveal delay={180}>
<a
              href={localizedHref(l, "/company/customers")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {locale === "fr" ? "Clients" : "Customers"}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                  {content.company.newsroom}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  {locale === "fr" ? "Voir →" : "View →"}
                </span>
              </div>
            </a>
            </Reveal>

            {/* CAREERS CARD */}
                        <Reveal delay={240}>
<a
              href={localizedHref(l, "/company/careers")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
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
                  {locale === "fr" ? "Rejoindre l'équipe →" : "Join the team →"}
                </span>
              </div>
            </a>
            </Reveal>

            {/* PRESS CARD */}
                        <Reveal delay={300}>
<a
              href={localizedHref(l, "/company/press")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {locale === "fr" ? "Presse" : "Press"}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                  {content.company.newsroom}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  {locale === "fr" ? "Consulter →" : "Explore →"}
                </span>
              </div>
            </a>
            </Reveal>

            {/* INTERNSHIPS CARD */}
                        <Reveal delay={360}>
<a
              href={localizedHref(l, "/company/internships")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {locale === "fr" ? "Stages" : "Internships"}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700">
                  {locale === "fr"
                    ? "Démarrez votre carrière en deeptech."
                    : "Start your career in deeptech."}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  {locale === "fr" ? "Découvrir →" : "Explore →"}
                </span>
              </div>
            </a>
            </Reveal>

            {/* BENEFITS CARD - Span 2 columns */}
                        <Reveal delay={420} className="lg:col-span-2">
<a
              href={localizedHref(l, "/company/benefits")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-[var(--ink)]">
                  {locale === "fr" ? "Avantages" : "Benefits"}
                </h2>
                <p className="mt-6 text-xl font-medium leading-snug text-zinc-700 max-w-lg">
                  {locale === "fr"
                    ? "Ce que nous offrons à chaque membre de l'équipe."
                    : "What we offer every member of the team."}
                </p>
              </div>
              <div className="mt-12 flex justify-end">
                <span className="text-sm font-medium text-zinc-500 group-hover:text-[var(--color-signal-500)]">
                  {locale === "fr" ? "Voir les avantages →" : "See benefits →"}
                </span>
              </div>
            </a>
            </Reveal>

            {/* CONTACT CARD */}
                        <Reveal delay={480}>
<a
              href={localizedHref(l, "/company/contact")}
              className="h-full group relative flex flex-col justify-between bg-[var(--color-surface)] p-10 transition-colors hover:bg-[var(--color-primary-50)]"
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
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}

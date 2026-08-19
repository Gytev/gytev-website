import { Container } from "@gytev/ui";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { localizedHref } from "@gytev/i18n";
import type { Locale } from "@gytev/types";

import { Timeline } from "@/components/company/Timeline";
import { TeamGrid } from "@/components/company/TeamGrid";
import { LogoWall } from "@/components/company/LogoWall";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const [dict, content] = await Promise.all([getDictionary(locale), getContent(locale)]);
  const detail = dict.pages.companyDetail.about;
  const l = locale as Locale;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO SECTION - Éditorial */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-[var(--line)] bg-[var(--color-surface)]">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                {detail.kicker}
              </p>
            </div>
            
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
              {detail.heroTitle}
            </h1>
            
            <div className="mt-12 text-lg leading-relaxed text-zinc-600 sm:text-xl space-y-6 max-w-3xl">
              <p className="font-medium text-[var(--ink)]">
                {content.company.story}
              </p>
              <p>
                {content.company.about}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* COMPOSANTS DÉDIÉS */}
      <Timeline milestones={detail.timeline} title={dict.pages.companySections.story} />
      <TeamGrid team={detail.team} heading={detail.teamHeading} description={detail.teamDescription} />
      <LogoWall title={detail.partnersTitle} partners={detail.partners} />
      
      {/* CTA SECTION - Footer de navigation croisée */}
      <section className="py-24 bg-[var(--color-ink-950)] text-white text-center">
        <Container>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {detail.cta.heading}
          </h2>
          <p className="mt-6 text-zinc-400 max-w-xl mx-auto text-lg">
            {detail.cta.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={localizedHref(l, "/company/careers")} className="button button--light">
              {detail.cta.primary}
            </a>
            <a href={localizedHref(l, "/company/contact")} className="button button--dark border border-zinc-700 hover:border-zinc-500">
              {detail.cta.secondary}
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

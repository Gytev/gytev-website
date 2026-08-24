import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@gytev/ui";
import { getMilestones, getPartners, getTeam } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { localizedHref } from "@gytev/i18n";
import type { Locale } from "@gytev/types";

import { TeamGrid } from "@/components/company/TeamGrid";
import { LogoWall } from "@/components/company/LogoWall";
import { MissionHero } from "@/components/company/about/MissionHero";
import { ThesisScroll } from "@/components/company/about/ThesisScroll";
import { LoopDiagram } from "@/components/company/about/LoopDiagram";
import { OriginTimeline } from "@/components/company/about/OriginTimeline";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const [dict, apiMilestones, apiTeam, apiPartners] = await Promise.all([
    getDictionary(locale),
    getMilestones(locale),
    getTeam(locale),
    getPartners(locale),
  ]);
  const detail = dict.pages.companyDetail.about;
  const l = locale as Locale;
  const milestones =
    apiMilestones ??
    detail.timeline.map((item) => ({
      date: item.date,
      title: item.title,
      description: item.description,
      event_type: item.type,
    }));

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <MissionHero dict={dict} />
      <ThesisScroll dict={dict} />
      <LoopDiagram dict={dict} />
      <OriginTimeline dict={dict} milestones={milestones} />

      <TeamGrid
        team={
          apiTeam ??
          detail.team.map((member) => ({
            name: member.name,
            role: member.role,
            image: member.image,
          }))
        }
        heading={detail.teamHeading}
        description={detail.teamDescription}
      />
      <LogoWall
        title={detail.partnersTitle}
        partners={apiPartners ?? detail.partners.map((name) => ({ name }))}
      />

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

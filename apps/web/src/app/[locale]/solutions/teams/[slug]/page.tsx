import type { Metadata } from "next";
import type { Locale } from "@gytev/types";
import { AudiencePage } from "@/components/solutions/AudiencePage";
import { TEAMS, findAudience } from "@/lib/audiences";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return TEAMS.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findAudience(TEAMS, slug);
  return { title: item ? `${item.en.title} | Gytev` : "Gytev" };
}

export default async function TeamPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = findAudience(TEAMS, slug);
  if (!item) notFound();

  return (
    <AudiencePage
      item={item}
      locale={locale as Locale}
      eyebrow={locale === "fr" ? "Gytev pour les équipes" : "Gytev for teams"}
    />
  );
}

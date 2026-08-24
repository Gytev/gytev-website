import type { Metadata } from "next";
import type { Locale } from "@gytev/types";
import { AudiencePage } from "@/components/solutions/AudiencePage";
import { INDUSTRIES, findAudience } from "@/lib/audiences";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findAudience(INDUSTRIES, slug);
  return { title: item ? `${item.en.title} | Gytev` : "Gytev" };
}

export default async function IndustryPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = findAudience(INDUSTRIES, slug);
  if (!item) notFound();

  return (
    <AudiencePage
      item={item}
      locale={locale as Locale}
      eyebrow={locale === "fr" ? "Gytev pour les industries" : "Gytev for industries"}
    />
  );
}

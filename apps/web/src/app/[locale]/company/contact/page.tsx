import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@gytev/types";
import { getDictionary } from "@/lib/i18n";
import { deepMerge, getContactCopy } from "@/lib/content";
import type { Dictionary } from "@gytev/i18n";
import { ContactHero, ContactSection } from "@/components/company/contact/ContactExperience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "contact");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const [dict, fetched] = await Promise.all([
    getDictionary(locale),
    getContactCopy(locale),
  ]);
  const l = (locale === "fr" ? "fr" : "en") as Locale;
  type Copy = Dictionary["pages"]["companyDetail"]["contactPage"];
  const fallback = dict.pages.companyDetail.contactPage;
  const copy = fetched ? deepMerge<Copy>(fallback, fetched) : fallback;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <ContactHero locale={l} copy={copy} />
      <ContactSection locale={l} copy={copy} />
    </main>
  );
}

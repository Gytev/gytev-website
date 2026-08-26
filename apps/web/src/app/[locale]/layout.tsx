import type { Metadata } from "next";
import type { Locale } from "@gytev/i18n";
import { siteConfig } from "@gytev/config";
import { generateStaticParams } from "@/lib/i18n";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Tracker } from "@/components/analytics/Tracker";
import { getDictionary } from "@/lib/i18n";

export { generateStaticParams };

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const url = locale === "en" ? "/" : `/${locale}`;
  return {
    title: {
      default: dict.meta.title,
      template: "%s | Gytev",
    },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteConfig.url}${url}`,
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col">
      <Tracker />
      <Navbar locale={l} dictionary={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={l} dictionary={dict} />
    </div>
  );
}

import type { Metadata } from "next";
import type { Dictionary } from "@gytev/i18n";
import { siteConfig } from "@gytev/config";
import { getDictionary } from "@/lib/i18n";

export type PageMetaKey = keyof Dictionary["meta"]["pages"];

export async function buildPageMetadata(
  locale: string,
  page: PageMetaKey,
): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const title = dict.meta.pages[page];
  return {
    title,
    description: dict.meta.description,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteConfig.url}/${page}`,
      siteName: siteConfig.name,
      title,
      description: dict.meta.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
      images: [siteConfig.ogImage],
    },
  };
}

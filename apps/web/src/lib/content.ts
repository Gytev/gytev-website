import type { Locale } from "@gytev/types";
import en from "../../../../content/en/content.json";
import fr from "../../../../content/fr/content.json";

export type Content = typeof en;

const localContents: Record<Locale, Content> = { en, fr };

export const contentApiUrl = process.env.GYTEV_API_URL ?? "";

export function getLocalContent(locale: string): Content {
  return localContents[(locale as Locale) in localContents ? (locale as Locale) : "en"];
}

export function getContentByLocale(locale: Locale): Content {
  return localContents[locale];
}

export async function getContent(locale: string): Promise<Content> {
  const resolved: Locale = (locale as Locale) in localContents ? (locale as Locale) : "en";
  if (contentApiUrl) {
    try {
      const response = await fetch(`${contentApiUrl}/content/${resolved}`, {
        next: { revalidate: 60 },
      });
      if (response.ok) {
        return (await response.json()) as Content;
      }
    } catch {
      // API indisponible → fallback sur le contenu local versionné.
    }
  }
  return localContents[resolved];
}

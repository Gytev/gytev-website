import type { Locale } from "@gytev/types";
import en from "../../../../content/en/content.json";
import fr from "../../../../content/fr/content.json";

export type Content = typeof en;

const contents: Record<Locale, Content> = { en, fr };

export function getContent(locale: string): Content {
  return contents[(locale as Locale) in contents ? (locale as Locale) : "en"];
}

export function getContentByLocale(locale: Locale): Content {
  return contents[locale];
}

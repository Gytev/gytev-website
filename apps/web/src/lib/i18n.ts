import type { Locale } from "@gytev/types";
import {
  dictionaries,
  defaultLocale,
  isLocale,
  locales,
} from "@gytev/i18n";

export { defaultLocale, isLocale, locales };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function getDictionary(locale: string) {
  const resolved: Locale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[resolved];
}

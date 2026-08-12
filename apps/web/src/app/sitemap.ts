import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@gytev/i18n";

const paths = [
  "",
  "/products",
  "/solutions",
  "/research",
  "/developers",
  "/blog",
  "/customers",
  "/company",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      const url = locale === defaultLocale ? path : `/${locale}${path}`;
      entries.push({
        url: `https://gytev.com${url}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}

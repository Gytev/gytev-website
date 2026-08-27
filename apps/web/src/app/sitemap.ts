import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@gytev/i18n";

const staticPaths = [
  "",
  "/products",
  "/products/rio",
  "/solutions",
  "/solutions/redq",
  "/research",
  "/developers",
  "/blog",
  "/customers",
  "/company",
  "/company/about",
  "/company/careers",
  "/company/contact",
  "/company/customers",
];

const customerSlugs = [
  "cooperative-alibori",
  "banque-du-sang-benin",
  "seme-city",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url = locale === defaultLocale ? path : `/${locale}${path}`;
      entries.push({
        url: `https://gytev.com${url}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const slug of customerSlugs) {
      const path = `/customers/${slug}`;
      const url = locale === defaultLocale ? path : `/${locale}${path}`;
      entries.push({
        url: `https://gytev.com${url}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}

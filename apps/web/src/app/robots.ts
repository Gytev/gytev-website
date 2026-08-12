import type { MetadataRoute } from "next";
import { locales } from "@gytev/i18n";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://gytev.com/sitemap.xml`,
  };
}

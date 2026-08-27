import type { Locale } from "@gytev/types";
import en from "../../../../content/en/content.json";
import fr from "../../../../content/fr/content.json";

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

type Content = typeof en;

function buildEntries(content: Content): SearchEntry[] {
  const entries: SearchEntry[] = [
    {
      title: "Home",
      description: content.company.about,
      href: "/",
      keywords: ["gytev", "accueil", "home"],
    },
    {
      title: "Products",
      description: "Intelligent systems for the real world, starting with agriculture.",
      href: "/products",
      keywords: ["rio", "farm", "agriculture", "produits"],
    },
    {
      title: "Solutions",
      description: "Real-world systems that matter: agriculture and public health first.",
      href: "/solutions",
      keywords: ["redq", "blood", "government", "solutions"],
    },
    {
      title: "Research",
      description: "The science behind Gytev. We publish openly and build for everyone.",
      href: "/research",
      keywords: ["ai", "digital twin", "recherche"],
    },
    {
      title: "Developers",
      description: "Build on Gytev with clean APIs, official SDKs and real documentation.",
      href: "/developers",
      keywords: ["api", "sdk", "docs", "developpeurs"],
    },
    {
      title: "Blog",
      description: "News, engineering deep-dives and stories from the Gytev team.",
      href: "/blog",
      keywords: ["news", "articles"],
    },
    {
      title: "Customers",
      description: "Organizations across Africa building on Gytev every day.",
      href: "/customers",
      keywords: ["clients", "case study"],
    },
    {
      title: "Company",
      description: content.company.about,
      href: "/company",
      keywords: ["about", "mission", "entreprise"],
    },
    {
      title: "Contact",
      description: content.company.contact,
      href: "/company/contact",
      keywords: ["sales", "email"],
    },
    {
      title: "Careers",
      description: content.company.careers,
      href: "/company/careers",
      keywords: ["jobs", "join", "carrieres"],
    },
  ];

  for (const product of content.products) {
    entries.push({
      title: product.name,
      description: product.description,
      href: product.href,
      keywords: [product.tagline, "product"],
    });
  }

  for (const solution of content.solutions) {
    entries.push({
      title: solution.name,
      description: solution.description,
      href: solution.href,
      keywords: ["solution"],
    });
  }

  for (const topic of content.research) {
    entries.push({
      title: topic.title,
      description: topic.summary,
      href: "/research",
      keywords: ["research", topic.status],
    });
  }

  for (const resource of content.developerResources) {
    entries.push({
      title: resource.title,
      description: resource.description,
      href: "/developers",
      keywords: ["developers", resource.kind],
    });
  }

  for (const post of content.blog) {
    entries.push({
      title: post.title,
      description: post.excerpt,
      href: "/blog",
      keywords: [...post.tags, post.author],
    });
  }

  for (const customer of content.customers) {
    entries.push({
      title: customer.name,
      description: customer.quote,
      href: `/customers/${customer.slug}`,
      keywords: [customer.sector, customer.country],
    });
  }

  return entries;
}

const entriesByLocale: Record<Locale, SearchEntry[]> = {
  en: buildEntries(en),
  fr: buildEntries(fr),
};

export function searchEntries(locale: Locale, query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  const entries = entriesByLocale[locale] ?? [];
  if (!q) return [];

  return entries.filter((entry) => {
    const haystack = [entry.title, entry.description, ...entry.keywords]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function listEntries(locale: Locale): SearchEntry[] {
  return entriesByLocale[locale] ?? [];
}

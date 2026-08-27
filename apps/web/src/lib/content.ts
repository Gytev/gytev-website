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

export type KeyDateEvent = "launch" | "funding" | "leadership" | "milestone";

export type KeyDate = {
  date: string;
  title: string;
  description?: string;
  event_type?: KeyDateEvent | string;
};

export async function getMilestones(locale: string): Promise<KeyDate[] | null> {  if (!contentApiUrl) return null;
  try {
    const response = await fetch(
      `${contentApiUrl}/milestones?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (response.ok) {
      const items = (await response.json()) as Array<{
        date_label: string;
        title: string;
        description: string | null;
        event_type: string;
        sort_order: number;
      }>;
      if (!Array.isArray(items) || items.length === 0) return null;
      return items
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => ({
          date: item.date_label,
          title: item.title,
          description: item.description ?? undefined,
          event_type: item.event_type,
        }));
    }
  } catch {
    // API indisponible → fallback dict.
  }
  return null;
}

export type TeamMemberData = {
  name: string;
  role: string;
  image?: string | null;
};

export async function getTeam(locale: string): Promise<TeamMemberData[] | null> {
  if (!contentApiUrl) return null;
  try {
    const response = await fetch(
      `${contentApiUrl}/team?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (response.ok) {
      const items = (await response.json()) as Array<{
        name: string;
        role: string;
        photo_url: string | null;
        sort_order: number;
      }>;
      if (!Array.isArray(items) || items.length === 0) return null;
      return items
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => ({ name: item.name, role: item.role, image: item.photo_url }));
    }
  } catch {
    // API indisponible → fallback dict.
  }
  return null;
}

export type PartnerData = {
  name: string;
  logo?: string | null;
};

export async function getPartners(locale: string): Promise<PartnerData[] | null> {
  if (!contentApiUrl) return null;
  try {
    const response = await fetch(
      `${contentApiUrl}/partners?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (response.ok) {
      const items = (await response.json()) as Array<{
        name: string;
        logo_url: string | null;
        sort_order: number;
      }>;
      if (!Array.isArray(items) || items.length === 0) return null;
      return items
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => ({ name: item.name, logo: item.logo_url }));
    }
  } catch {
    // API indisponible → fallback dict.
  }
  return null;
}


export type ContactCopyData = Record<string, string>;

const CONTACT_FLAT_MAP: Record<string, readonly string[]> = {
  heroEyebrow: ["eyebrow"],
  heroTitle: ["heroTitle"],
  heroSub: ["heroSub"],
  helpHeading: ["helpHeading"],
  titleTeam: ["cards", "titles", "team"],
  titleSupport: ["cards", "titles", "support"],
  titlePress: ["cards", "titles", "press"],
  titlePrivacy: ["cards", "titles", "privacy"],
  titleVulnerability: ["cards", "titles", "vulnerability"],
  supportHelpPrefix: ["cards", "support", "helpPrefix"],
  supportHelpLink: ["cards", "support", "helpLink"],
  supportLoginLink: ["cards", "support", "loginLink"],
  supportLoginSuffix: ["cards", "support", "loginSuffix"],
  supportDiscordPrefix: ["cards", "support", "discordPrefix"],
  supportDiscordLabel: ["cards", "support", "discordLabel"],
  supportDiscordSuffix: ["cards", "support", "discordSuffix"],
  supportCta: ["cards", "support", "cta"],
  pressPrefix: ["cards", "press", "prefix"],
  pressEmail: ["cards", "press", "email"],
  privacyText: ["cards", "privacy", "text"],
  privacyCta: ["cards", "privacy", "cta"],
  vulnText: ["cards", "vulnerability", "text"],
  vulnSmallPrint: ["cards", "vulnerability", "smallPrint"],
  vulnCta: ["cards", "vulnerability", "cta"],
  formThanks: ["forms", "thanks"],
  formSending: ["forms", "sending"],
  formLegal: ["forms", "legal"],
  formUpdates: ["forms", "updates"],
  formSubmit: ["forms", "submit"],
  formError: ["forms", "error"],
  teamFirstnameLabel: ["forms", "team", "firstname", "label"],
  teamFirstnamePlaceholder: ["forms", "team", "firstname", "placeholder"],
  teamLastnameLabel: ["forms", "team", "lastname", "label"],
  teamLastnamePlaceholder: ["forms", "team", "lastname", "placeholder"],
  teamEmailLabel: ["forms", "team", "email", "label"],
  teamEmailPlaceholder: ["forms", "team", "email", "placeholder"],
  teamRoleLabel: ["forms", "team", "role", "label"],
  teamRolePlaceholder: ["forms", "team", "role", "placeholder"],
  teamMessageLabel: ["forms", "team", "message", "label"],
  teamMessagePlaceholder: ["forms", "team", "message", "placeholder"],
  supportEmailLabel: ["forms", "support", "email", "label"],
  supportEmailPlaceholder: ["forms", "support", "email", "placeholder"],
  supportIssueLabel: ["forms", "support", "issue", "label"],
  supportIssuePlaceholder: ["forms", "support", "issue", "placeholder"],
  pressFormNameLabel: ["forms", "press", "name", "label"],
  pressFormNamePlaceholder: ["forms", "press", "name", "placeholder"],
  pressFormEmailLabel: ["forms", "press", "email", "label"],
  pressFormEmailPlaceholder: ["forms", "press", "email", "placeholder"],
  pressOutletLabel: ["forms", "press", "outlet", "label"],
  pressOutletPlaceholder: ["forms", "press", "outlet", "placeholder"],
  pressRequestLabel: ["forms", "press", "request", "label"],
  pressRequestPlaceholder: ["forms", "press", "request", "placeholder"],
  privacyFormEmailLabel: ["forms", "privacy", "email", "label"],
  privacyFormEmailPlaceholder: ["forms", "privacy", "email", "placeholder"],
  privacyTypeLabel: ["forms", "privacy", "typeLabel"],
  privacyTypePlaceholder: ["forms", "privacy", "typePlaceholder"],
  privacyDetailsLabel: ["forms", "privacy", "details", "label"],
  privacyDetailsPlaceholder: ["forms", "privacy", "details", "placeholder"],
  vulnFormEmailLabel: ["forms", "vulnerability", "email", "label"],
  vulnFormEmailPlaceholder: ["forms", "vulnerability", "email", "placeholder"],
  vulnProductLabel: ["forms", "vulnerability", "product", "label"],
  vulnProductPlaceholder: ["forms", "vulnerability", "product", "placeholder"],
  vulnReportLabel: ["forms", "vulnerability", "report", "label"],
  vulnReportPlaceholder: ["forms", "vulnerability", "report", "placeholder"],
};

type Nested = Record<string, unknown>;

function isPlainObject(value: unknown): value is Nested {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Fusion profonde : les valeurs définies dans `override` gagnent. */
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (!isPlainObject(override) || !isPlainObject(base)) {
    return override as T;
  }
  const out: Nested = { ...(base as unknown as Nested) };
  for (const [key, value] of Object.entries(override)) {
    out[key] = key in out ? deepMerge(out[key], value) : value;
  }
  return out as T;
}

/** Reconstruit la structure imbriquée attendue par le composant depuis une ligne plate. */
export function expandContactCopy(flat: ContactCopyData): ContactCopyData {
  const out: ContactCopyData = {};
  for (const [col, path] of Object.entries(CONTACT_FLAT_MAP)) {
    const value = flat[col];
    if (typeof value !== "string" || value === "") continue;
    let cur: Record<string, unknown> = out;
    for (const key of path.slice(0, -1)) {
      if (!isPlainObject(cur[key])) cur[key] = {};
      cur = cur[key] as Record<string, unknown>;
    }
    cur[path[path.length - 1]] = value;
  }
  return out;
}

export async function getContactCopy(
  locale: string,
): Promise<ContactCopyData | null> {
  if (!contentApiUrl) return null;
  try {
    const response = await fetch(
      `${contentApiUrl}/contact-content?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (response.ok) {
      const items = (await response.json()) as ContactCopyData[];
      if (!Array.isArray(items) || items.length === 0) return null;
      const row = items[0];
      const expanded = expandContactCopy(row);
      return Object.keys(expanded).length > 0 ? expanded : null;
    }
  } catch {
    // API indisponible → fallback dict.
  }
  return null;
}

export type JobOpening = {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};export type JobDepartment = {
  name: string;
  description: string;
  openings: JobOpening[];
};

export async function getJobs(locale: string): Promise<JobDepartment[] | null> {
  if (!contentApiUrl) return null;
  try {
    const response = await fetch(
      `${contentApiUrl}/jobs/grouped?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (response.ok) {
      const items = (await response.json()) as Array<{
        name: string;
        description: string;
        jobs: Array<{
          title: string;
          location: string;
          type: string;
          description: string;
          requirements: string[];
        }>;
      }>;
      if (!Array.isArray(items) || items.length === 0) return null;
      return items.map((dept) => ({
        name: dept.name,
        description: dept.description,
        openings: dept.jobs.map((job) => ({
          title: job.title,
          location: job.location,
          type: job.type,
          description: job.description,
          requirements: job.requirements,
        })),
      }));
    }
  } catch {
    // API indisponible → fallback dict.
  }
  return null;
}

export type BlogPostCard = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  image: string | null;
  featured: boolean;
};

export async function getBlogPosts(locale: string): Promise<BlogPostCard[]> {
  const local = getLocalContent(locale).blog.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    tags: (post as { tags?: string[] }).tags ?? [],
    image: (post as { image?: string }).image ?? null,
    featured: false,
  }));
  if (!contentApiUrl) return local;
  try {
    const response = await fetch(
      `${contentApiUrl}/blog?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return local;
    const items = (await response.json()) as Array<{
      slug: string;
      title: string;
      excerpt: string;
      author: string;
      tags: string[] | null;
      image: string | null;
      featured: boolean | null;
      published_at: string | null;
    }>;
    if (!Array.isArray(items) || items.length === 0) return local;
    const imageBySlug = new Map(local.map((p) => [p.slug, p.image]));
    return items
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        author: p.author,
        date: p.published_at
          ? new Date(p.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        tags: p.tags ?? [],
        image: p.image ?? imageBySlug.get(p.slug) ?? null,
        featured: Boolean(p.featured),
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return local;
  }
}

export type CustomerData = {
  slug: string;
  name: string;
  sector: string;
  country: string;
  quote: string;
  badge?: string | null;
  image?: string | null;
  product?: string | null;
  overview?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  metrics?: Array<{ label: string; value: string }> | null;
  quoteAuthor?: string | null;
  quoteRole?: string | null;
  videoUrl?: string | null;
};

export async function getCustomers(locale: string): Promise<CustomerData[]> {
  const local = getLocalContent(locale).customers.map((c) => ({
    slug: c.slug,
    name: c.name,
    sector: c.sector,
    country: c.country,
    quote: c.quote,
    badge: (c as { badge?: string }).badge ?? null,
    image: (c as { image?: string }).image ?? null,
    product: (c as { product?: string }).product ?? null,
    overview: (c as { overview?: string }).overview ?? null,
    challenge: (c as { challenge?: string }).challenge ?? null,
    solution: (c as { solution?: string }).solution ?? null,
    results: (c as { results?: string }).results ?? null,
    metrics: (c as { metrics?: Array<{ label: string; value: string }> }).metrics ?? null,
    quoteAuthor: (c as { quoteAuthor?: string }).quoteAuthor ?? null,
    quoteRole: (c as { quoteRole?: string }).quoteRole ?? null,
    videoUrl: (c as { videoUrl?: string }).videoUrl ?? null,
  }));
  if (!contentApiUrl) return local;
  try {
    const response = await fetch(
      `${contentApiUrl}/customers?locale=${encodeURIComponent(locale)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return local;
    const items = (await response.json()) as Array<{
      slug: string;
      name: string;
      sector: string;
      country: string;
      quote: string;
      badge?: string | null;
      image?: string | null;
      product?: string | null;
      overview?: string | null;
      challenge?: string | null;
      solution?: string | null;
      results?: string | null;
      metrics?: Array<{ label: string; value: string }> | null;
      quote_author?: string | null;
      quote_role?: string | null;
      video_url?: string | null;
    }>;
    if (!Array.isArray(items) || items.length === 0) return local;
    return items.map((c) => ({
      slug: c.slug,
      name: c.name,
      sector: c.sector,
      country: c.country,
      quote: c.quote,
      badge: c.badge ?? null,
      image: c.image ?? null,
      product: c.product ?? null,
      overview: c.overview ?? null,
      challenge: c.challenge ?? null,
      solution: c.solution ?? null,
      results: c.results ?? null,
      metrics: c.metrics ?? null,
      quoteAuthor: c.quote_author ?? null,
      quoteRole: c.quote_role ?? null,
      videoUrl: c.video_url ?? null,
    }));
  } catch {
    return local;
  }
}

export interface TermsSection {
  id: string;
  title: string;
  content: string;
}

export interface TermsContent {
  slug: string;
  title: string;
  published_at: string | null;
  updated_at_doc: string | null;
  sidebar_label: string;
  intro_heading: string | null;
  intro_content: string | null;
  sections: TermsSection[];
}

export async function getTermsContent(locale: string): Promise<TermsContent | null> {
  const resolved: Locale = (locale as Locale) in localContents ? (locale as Locale) : "en";
  const localTerms = localContents[resolved].terms as Array<{
    slug: string;
    title: string;
    published_at?: string;
    updated_at_doc?: string;
    sidebar_label?: string;
    intro_heading?: string;
    intro_content?: string;
    sections: Array<{ id: string; title: string; content: string }>;
  }> | undefined;
  const raw = localTerms?.[0] ?? null;
  const local: TermsContent | null = raw
    ? {
        slug: raw.slug,
        title: raw.title,
        published_at: raw.published_at ?? null,
        updated_at_doc: raw.updated_at_doc ?? null,
        sidebar_label: raw.sidebar_label ?? "On this page",
        intro_heading: raw.intro_heading ?? null,
        intro_content: raw.intro_content ?? null,
        sections: raw.sections,
      }
    : null;
  if (!contentApiUrl) return local;
  try {
    const response = await fetch(
      `${contentApiUrl}/terms?locale=${encodeURIComponent(resolved)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return local;
    const items = (await response.json()) as Array<{
      slug: string;
      title: string;
      published_at?: string | null;
      updated_at_doc?: string | null;
      sidebar_label?: string;
      intro_heading?: string | null;
      intro_content?: string | null;
      sections: Array<{ id: string; title: string; content: string }>;
    }>;
    if (!Array.isArray(items) || items.length === 0) return local;
    return {
      slug: items[0].slug,
      title: items[0].title,
      published_at: items[0].published_at ?? null,
      updated_at_doc: items[0].updated_at_doc ?? null,
      sidebar_label: items[0].sidebar_label ?? "On this page",
      intro_heading: items[0].intro_heading ?? null,
      intro_content: items[0].intro_content ?? null,
      sections: items[0].sections,
    };
  } catch {
    return local;
  }
}

export async function getPrivacyContent(locale: string): Promise<TermsContent | null> {
  const resolved: Locale = (locale as Locale) in localContents ? (locale as Locale) : "en";
  const localTerms = localContents[resolved].privacy as Array<{
    slug: string;
    title: string;
    published_at?: string;
    updated_at_doc?: string;
    sidebar_label?: string;
    intro_heading?: string;
    intro_content?: string;
    sections: Array<{ id: string; title: string; content: string }>;
  }> | undefined;
  const raw = localTerms?.[0] ?? null;
  const local: TermsContent | null = raw
    ? {
        slug: raw.slug,
        title: raw.title,
        published_at: raw.published_at ?? null,
        updated_at_doc: raw.updated_at_doc ?? null,
        sidebar_label: raw.sidebar_label ?? "On this page",
        intro_heading: raw.intro_heading ?? null,
        intro_content: raw.intro_content ?? null,
        sections: raw.sections,
      }
    : null;
  if (!contentApiUrl) return local;
  try {
    const response = await fetch(
      `${contentApiUrl}/privacy?locale=${encodeURIComponent(resolved)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return local;
    const items = (await response.json()) as Array<{
      slug: string;
      title: string;
      published_at?: string | null;
      updated_at_doc?: string | null;
      sidebar_label?: string;
      intro_heading?: string | null;
      intro_content?: string | null;
      sections: Array<{ id: string; title: string; content: string }>;
    }>;
    if (!Array.isArray(items) || items.length === 0) return local;
    return {
      slug: items[0].slug,
      title: items[0].title,
      published_at: items[0].published_at ?? null,
      updated_at_doc: items[0].updated_at_doc ?? null,
      sidebar_label: items[0].sidebar_label ?? "On this page",
      intro_heading: items[0].intro_heading ?? null,
      intro_content: items[0].intro_content ?? null,
      sections: items[0].sections,
    };
  } catch {
    return local;
  }
}

export interface PolicyItem {
  title: string;
  description: string;
  href: string;
}

export function getPoliciesContent(locale: string): { legal: PolicyItem[]; policies: PolicyItem[] } {
  const fr = locale === "fr";
  return {
    legal: [
      { title: fr ? "Conditions d'utilisation" : "Terms of use", description: fr ? "Conditions régissant l'utilisation de Rio, RedQ, Quiisa et des autres services Gytev." : "Terms that govern use of Rio, RedQ, Quiisa, and Gytev's other services.", href: fr ? "/fr/policies/terms-of-use" : "/policies/terms-of-use" },
      { title: fr ? "Politique de confidentialité" : "Privacy policy", description: fr ? "Pratiques relatives aux informations personnelles que nous collectons." : "Practices with respect to personal information we collect from or about you.", href: fr ? "/fr/policies/privacy-policy" : "/policies/privacy-policy" },
    ],
    policies: [
      { title: fr ? "Politique d'utilisation" : "Usage policies", description: fr ? "Veiller à ce que notre technologie soit utilisée à bon escient." : "Ensuring our technology is used for good.", href: "#" },
      { title: fr ? "Politique de confidentialité entreprise" : "Enterprise privacy", description: fr ? "Utilisation et conservation des données soumises pour les utilisateurs entreprise." : "Usage and retention of data submitted for enterprise users.", href: "#" },
    ],
  };
}


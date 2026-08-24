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

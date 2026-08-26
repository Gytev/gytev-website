export type FieldKind = "text" | "textarea" | "list" | "number" | "select" | "boolean";

export type FieldConfig = {
  name: string;
  label: string;
  kind?: FieldKind;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  defaultValue?: string | number | string[];
};

export type EntityConfig = {
  slug: string;
  label: string;
  plural: string;
  endpoint: string;
  titleField: string;
  showFields: string[];
  fields: FieldConfig[];
};

const localeField: FieldConfig = {
  name: "locale",
  label: "Locale",
  kind: "select",
  options: ["en", "fr"],
  defaultValue: "en",
};

export const entities: EntityConfig[] = [
  {
    "slug": "contact-content",
    "label": "Contact page",
    "plural": "Contact copy",
    "endpoint": "/contact-content",
    "titleField": "locale",
    "showFields": [
      "locale",
      "heroTitle",
      "helpHeading"
    ],
    "fields": [
      {
        "name": "locale",
        "label": "Locale",
        "kind": "select",
        "options": [
          "en",
          "fr"
        ],
        "defaultValue": "en"
      },
      {
        "name": "heroEyebrow",
        "label": "Hero — Eyebrow"
      },
      {
        "name": "heroTitle",
        "label": "Hero — Title",
        "kind": "textarea"
      },
      {
        "name": "heroSub",
        "label": "Hero — Subline",
        "kind": "textarea"
      },
      {
        "name": "helpHeading",
        "label": "Section — Heading"
      },
      {
        "name": "titleTeam",
        "label": "Card titles — Team"
      },
      {
        "name": "titleSupport",
        "label": "Card titles — Support"
      },
      {
        "name": "titlePress",
        "label": "Card titles — Press"
      },
      {
        "name": "titlePrivacy",
        "label": "Card titles — Privacy"
      },
      {
        "name": "titleVulnerability",
        "label": "Card titles — Vulnerability"
      },
      {
        "name": "supportHelpPrefix",
        "label": "Support card — Help prefix"
      },
      {
        "name": "supportHelpLink",
        "label": "Support card — Help link label"
      },
      {
        "name": "supportLoginLink",
        "label": "Support card — Login label"
      },
      {
        "name": "supportLoginSuffix",
        "label": "Support card — Login suffix"
      },
      {
        "name": "supportDiscordPrefix",
        "label": "Support card — Discord prefix"
      },
      {
        "name": "supportDiscordLabel",
        "label": "Support card — Discord label"
      },
      {
        "name": "supportDiscordSuffix",
        "label": "Support card — Discord suffix"
      },
      {
        "name": "supportCta",
        "label": "Support card — CTA"
      },
      {
        "name": "pressPrefix",
        "label": "Press card — Prefix"
      },
      {
        "name": "pressEmail",
        "label": "Press card — Email"
      },
      {
        "name": "privacyText",
        "label": "Privacy card — Text",
        "kind": "textarea"
      },
      {
        "name": "privacyCta",
        "label": "Privacy card — CTA"
      },
      {
        "name": "vulnText",
        "label": "Vulnerability card — Text",
        "kind": "textarea"
      },
      {
        "name": "vulnSmallPrint",
        "label": "Vulnerability card — Small print",
        "kind": "textarea"
      },
      {
        "name": "vulnCta",
        "label": "Vulnerability card — CTA"
      },
      {
        "name": "formThanks",
        "label": "Form (common) — Thanks message"
      },
      {
        "name": "formSending",
        "label": "Form (common) — Sending label"
      },
      {
        "name": "formLegal",
        "label": "Form (common) — Legal text",
        "kind": "textarea"
      },
      {
        "name": "formUpdates",
        "label": "Form (common) — Updates checkbox",
        "kind": "textarea"
      },
      {
        "name": "formSubmit",
        "label": "Form (common) — Submit label"
      },
      {
        "name": "teamFirstnameLabel",
        "label": "Team form — Firstname label"
      },
      {
        "name": "teamFirstnamePlaceholder",
        "label": "Team form — Firstname placeholder"
      },
      {
        "name": "teamLastnameLabel",
        "label": "Team form — Lastname label"
      },
      {
        "name": "teamLastnamePlaceholder",
        "label": "Team form — Lastname placeholder"
      },
      {
        "name": "teamEmailLabel",
        "label": "Team form — Email label"
      },
      {
        "name": "teamEmailPlaceholder",
        "label": "Team form — Email placeholder"
      },
      {
        "name": "teamRoleLabel",
        "label": "Team form — Role label"
      },
      {
        "name": "teamRolePlaceholder",
        "label": "Team form — Role placeholder"
      },
      {
        "name": "teamMessageLabel",
        "label": "Team form — Message label",
        "kind": "textarea"
      },
      {
        "name": "teamMessagePlaceholder",
        "label": "Team form — Message placeholder",
        "kind": "textarea"
      },
      {
        "name": "supportEmailLabel",
        "label": "Support form — Email label"
      },
      {
        "name": "supportEmailPlaceholder",
        "label": "Support form — Email placeholder"
      },
      {
        "name": "supportIssueLabel",
        "label": "Support form — Issue label"
      },
      {
        "name": "supportIssuePlaceholder",
        "label": "Support form — Issue placeholder"
      },
      {
        "name": "pressFormNameLabel",
        "label": "Press form — Name label"
      },
      {
        "name": "pressFormNamePlaceholder",
        "label": "Press form — Name placeholder"
      },
      {
        "name": "pressFormEmailLabel",
        "label": "Press form — Email label"
      },
      {
        "name": "pressFormEmailPlaceholder",
        "label": "Press form — Email placeholder"
      },
      {
        "name": "pressOutletLabel",
        "label": "Press form — Outlet label"
      },
      {
        "name": "pressOutletPlaceholder",
        "label": "Press form — Outlet placeholder"
      },
      {
        "name": "pressRequestLabel",
        "label": "Press form — Request label",
        "kind": "textarea"
      },
      {
        "name": "pressRequestPlaceholder",
        "label": "Press form — Request placeholder",
        "kind": "textarea"
      },
      {
        "name": "privacyFormEmailLabel",
        "label": "Privacy form — Email label"
      },
      {
        "name": "privacyFormEmailPlaceholder",
        "label": "Privacy form — Email placeholder"
      },
      {
        "name": "privacyTypeLabel",
        "label": "Privacy form — Type label"
      },
      {
        "name": "privacyTypePlaceholder",
        "label": "Privacy form — Type placeholder"
      },
      {
        "name": "privacyDetailsLabel",
        "label": "Privacy form — Details label"
      },
      {
        "name": "privacyDetailsPlaceholder",
        "label": "Privacy form — Details placeholder",
        "kind": "textarea"
      },
      {
        "name": "vulnFormEmailLabel",
        "label": "Vulnerability form — Email label"
      },
      {
        "name": "vulnFormEmailPlaceholder",
        "label": "Vulnerability form — Email placeholder"
      },
      {
        "name": "vulnProductLabel",
        "label": "Vulnerability form — Product label"
      },
      {
        "name": "vulnProductPlaceholder",
        "label": "Vulnerability form — Product placeholder"
      },
      {
        "name": "vulnReportLabel",
        "label": "Vulnerability form — Report label",
        "kind": "textarea"
      },
      {
        "name": "vulnReportPlaceholder",
        "label": "Vulnerability form — Report placeholder",
        "kind": "textarea"
      }
    ]
  },
  {
    slug: "products",
    label: "Product",
    plural: "Products",
    endpoint: "/products",
    titleField: "name",
    showFields: ["name", "slug", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "name", label: "Name", required: true },
      { name: "tagline", label: "Tagline", required: true },
      { name: "description", label: "Description", kind: "textarea" },
      { name: "href", label: "Href" },
    ],
  },
  {
    slug: "solutions",
    label: "Solution",
    plural: "Solutions",
    endpoint: "/solutions",
    titleField: "name",
    showFields: ["name", "slug", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "name", label: "Name", required: true },
      { name: "description", label: "Description", kind: "textarea" },
      { name: "industries", label: "Industries", kind: "list", hint: "Séparer par des virgules" },
      { name: "href", label: "Href" },
    ],
  },
  {
    slug: "research",
    label: "Research topic",
    plural: "Research",
    endpoint: "/research",
    titleField: "title",
    showFields: ["title", "status", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "title", label: "Title", required: true },
      { name: "summary", label: "Summary", kind: "textarea" },
      {
        name: "status",
        label: "Status",
        kind: "select",
        options: ["published", "in-progress", "internal"],
        defaultValue: "in-progress",
      },
      { name: "href", label: "Href" },
    ],
  },
  {
    slug: "developers",
    label: "Developer resource",
    plural: "Developers",
    endpoint: "/developers",
    titleField: "title",
    showFields: ["title", "kind", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "title", label: "Title", required: true },
      { name: "description", label: "Description", kind: "textarea" },
      {
        name: "kind",
        label: "Kind",
        kind: "select",
        options: ["api", "sdk", "docs", "graphql"],
        defaultValue: "api",
      },
      { name: "href", label: "Href" },
    ],
  },
  {
    slug: "blog",
    label: "Blog post",
    plural: "Blog",
    endpoint: "/blog",
    titleField: "title",
    showFields: ["title", "author", "published_at", "featured", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "title", label: "Title", required: true },
      { name: "excerpt", label: "Excerpt", kind: "textarea" },
      { name: "author", label: "Author", required: true },
      { name: "tags", label: "Tags", kind: "list", hint: "Séparer par des virgules" },
      { name: "image", label: "Image URL", placeholder: "/images/blog/cover.jpg ou https://…" },
      { name: "featured", label: "Featured", kind: "boolean", hint: "Mettre en avant (grande carte)" },
      { name: "published_at", label: "Published at", placeholder: "2026-06-01", hint: "Format : YYYY-MM-DD" },
    ],
  },
  {
    slug: "customers",
    label: "Customer",
    plural: "Customers",
    endpoint: "/customers",
    titleField: "name",
    showFields: ["name", "sector", "country", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "name", label: "Name", required: true },
      { name: "sector", label: "Sector", required: true },
      { name: "country", label: "Country", required: true },
      { name: "quote", label: "Quote", kind: "textarea" },
    ],
  },
  {
    slug: "milestones",
    label: "Key date",
    plural: "Key dates",
    endpoint: "/milestones",
    titleField: "title",
    showFields: ["date_label", "title", "event_type", "locale"],
    fields: [
      localeField,
      {
        name: "date_label",
        label: "Date",
        required: true,
        placeholder: "Jan 12, 2026 / 12 janv. 2026",
        hint: "Format libre affiché sur la carte (ex. « Mar 3, 2026 »)",
      },
      { name: "title", label: "Title", required: true, hint: "Événement court (ex. « Seed round », « Rio launch »)" },
      { name: "description", label: "Description", kind: "textarea" },
      {
        name: "event_type",
        label: "Event type",
        kind: "select",
        options: ["launch", "funding", "leadership", "milestone"],
        defaultValue: "milestone",
        hint: "Détermine la couleur du bandeau : lancement produit, levée de fonds, arrivée d'un leader, jalon entreprise",
      },
      { name: "sort_order", label: "Order", kind: "number", defaultValue: 0 },
    ],
  },
  {
    slug: "team",
    label: "Team member",
    plural: "Team",
    endpoint: "/team",
    titleField: "name",
    showFields: ["name", "role", "photo_url", "locale"],
    fields: [
      localeField,
      { name: "name", label: "Name", required: true },
      { name: "role", label: "Role", required: true, placeholder: "Co-founder & CEO" },
      {
        name: "photo_url",
        label: "Photo URL",
        placeholder: "/images/team/amadou.jpg ou https://…",
        hint: "Laisser vide pour afficher le placeholder ; ratio conseillé 3:4",
      },
      { name: "sort_order", label: "Order", kind: "number", defaultValue: 0 },
    ],
  },
  {
    slug: "partners",
    label: "Partner",
    plural: "Partners",
    endpoint: "/partners",
    titleField: "name",
    showFields: ["name", "logo_url", "locale"],
    fields: [
      localeField,
      { name: "name", label: "Name", required: true },
      {
        name: "logo_url",
        label: "Logo URL",
        placeholder: "/images/partners/world-bank.png ou https://…",
        hint: "Laisser vide pour afficher le nom en texte ; PNG/SVG fond transparent conseillé",
      },
      { name: "sort_order", label: "Order", kind: "number", defaultValue: 0 },
    ],
  },
  {
    slug: "company",
    label: "Company section",
    plural: "Company",
    endpoint: "/company",
    titleField: "key",
    showFields: ["key", "title", "locale"],
    fields: [
      localeField,
      { name: "key", label: "Key", required: true },
      { name: "title", label: "Title" },
      { name: "content", label: "Content", kind: "textarea" },
    ],
  },
  {
    slug: "navigation",
    label: "Navigation item",
    plural: "Navigation",
    endpoint: "/navigation",
    titleField: "key",
    showFields: ["key", "label", "href", "sort_order"],
    fields: [
      { name: "key", label: "Key", required: true },
      { name: "label", label: "Label", required: true },
      { name: "href", label: "Href", required: true },
      { name: "sort_order", label: "Order", kind: "number", defaultValue: 0 },
    ],
  },
];

export function getEntity(slug: string): EntityConfig | undefined {
  return entities.find((entity) => entity.slug === slug);
}

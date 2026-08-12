export type FieldKind = "text" | "textarea" | "list" | "number" | "select";

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
    showFields: ["title", "author", "published_at", "locale"],
    fields: [
      localeField,
      { name: "slug", label: "Slug", required: true },
      { name: "title", label: "Title", required: true },
      { name: "excerpt", label: "Excerpt", kind: "textarea" },
      { name: "author", label: "Author", required: true },
      { name: "tags", label: "Tags", kind: "list", hint: "Séparer par des virgules" },
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

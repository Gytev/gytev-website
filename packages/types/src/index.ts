export type Locale = "en" | "fr";

export type NavLink = {
  label: string;
  href: string;
  arrow?: boolean;
};

export type NavColumn = {
  title: string;
  links: NavLink[];
};

export type NavVisual = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

export type NavItem = {
  key: string;
  label: string;
  href: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
};

export type Solution = {
  slug: string;
  name: string;
  description: string;
  industries: string[];
  href: string;
};

export type ResearchTopic = {
  slug: string;
  title: string;
  summary: string;
  status: "published" | "in-progress" | "internal";
  href: string;
};

export type DeveloperResource = {
  slug: string;
  title: string;
  description: string;
  kind: "api" | "sdk" | "docs" | "graphql";
  href: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
};

export type Customer = {
  slug: string;
  name: string;
  sector: string;
  country: string;
  quote: string;
};

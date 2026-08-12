import type { NavItem } from "@gytev/types";

export const siteConfig = {
  name: "Gytev",
  url: "https://gytev.com",
  description:
    "Gytev builds intelligent systems that observe, understand, predict and act on the real world.",
  ogImage: "/og.png",
  links: {
    twitter: "https://x.com/gytev",
    github: "https://github.com/gytev",
  },
};

export const navItems: NavItem[] = [
  { key: "research", label: "Research", href: "/research" },
  { key: "products", label: "Products", href: "/products" },
  { key: "solutions", label: "Solutions", href: "/solutions" },
  { key: "developers", label: "Developers", href: "/developers" },
  { key: "company", label: "Company", href: "/company" },
];

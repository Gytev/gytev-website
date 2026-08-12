import type { FooterSection, NavItem } from "@gytev/types";

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

export const footerSections: FooterSection[] = [
  {
    title: "Products",
    links: [
      { label: "Rio", href: "/products/rio" },
      { label: "Rio Box", href: "/products/rio/box" },
      { label: "Rio AI", href: "/products/rio/ai" },
      { label: "Platform", href: "/products/rio/platform" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "RedQ", href: "/solutions/redq" },
      { label: "For Agriculture", href: "/solutions/agriculture" },
      { label: "For Public Health", href: "/solutions/public-health" },
      { label: "For Government", href: "/solutions/government" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Vision", href: "/company/vision" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Research", href: "/research" },
      { label: "Developers", href: "/developers" },
      { label: "Blog", href: "/blog" },
      { label: "Status", href: "/developers/status" },
    ],
  },
];

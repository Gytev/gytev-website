"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { entities } from "@/lib/entities";

const fallback: Record<string, string> = {
  "": "Dashboard",
  products: "Products",
  solutions: "Solutions",
  research: "Research",
  developers: "Developers",
  blog: "Blog",
  customers: "Customers",
  company: "Company",
  navigation: "Navigation",
};

export function Topbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const section = segments[0] ?? "";
  const label = entities.find((entity) => entity.slug === section)?.plural ?? fallback[section];
  const detail = segments[segments.length - 1];

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md lg:px-10">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <Link
          href="/"
          className="hidden font-medium text-zinc-400 transition-colors hover:text-zinc-700 sm:inline"
        >
          Admin
        </Link>
        {label ? (
          <>
            <span className="hidden text-zinc-300 sm:inline">/</span>
            <span className="truncate font-medium text-zinc-800">{label}</span>
          </>
        ) : null}
        {detail && detail !== "new" ? (
          <>
            <span className="hidden text-zinc-300 sm:inline">/</span>
            <span className="truncate font-medium text-zinc-400">{detail}</span>
          </>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-white hover:text-zinc-900 md:inline-flex"
        >
          Docs API
        </a>
        <div className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white py-1 pl-1 pr-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
            A
          </span>
          <span className="hidden text-sm font-medium text-zinc-700 lg:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { entities } from "@/lib/entities";
import { Wordmark } from "./ui";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  ...entities.map((entity) => ({
    href: `/${entity.slug}`,
    label: entity.plural,
  })),
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <Link href="/" className="flex h-16 items-center border-b border-zinc-200 px-6">
        <Wordmark className="text-2xl" />
      </Link>

      <nav className="flex-1 space-y-0.5 p-3">
        <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Contenu
        </p>
        {links.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-50 text-orange-700"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  active ? "bg-orange-600" : "bg-zinc-300 group-hover:bg-zinc-400"
                }`}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-4 text-xs leading-5 text-zinc-400">
        Contenu géré via l&apos;API Gytev.
        <br />
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex font-medium text-zinc-500 transition-colors hover:text-orange-600"
        >
          Docs API →
        </a>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";
import { navItems } from "@gytev/config";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

type NavbarProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Navbar({ locale, dictionary }: NavbarProps) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dict = dictionary as Dictionary;

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const activeNav = navItems.find((item) => item.key === active);

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setActive(null)}
      className="sticky top-0 z-40 border-b border-zinc-200 bg-white"
    >
      <nav className="flex h-14 w-full items-center justify-between px-6 lg:px-8">
        <a href={localizedHref(locale, "/")} className="shrink-0">
          <span className="text-xl font-black tracking-tight text-zinc-900">
            {"G⅄TƎV".split("").map((letter, index) => (
              <span
                key={index}
                className="logo-letter"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex lg:pl-8">
          {navItems.map((item) => {
            const nav = dict.nav[item.key];
            const label = nav?.label ?? item.label;

            return (
              <button
                key={item.key}
                type="button"
                onMouseEnter={() => setActive(item.key)}
                onClick={() => setActive(item.key)}
                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
              >
                {label}
              </button>
            );
          })}
          <a
            href={localizedHref(locale, "/blog")}
            className="p-2 text-zinc-500 transition-colors hover:text-zinc-900"
            aria-label={dict.header.search}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={localizedHref(locale, "/company/contact")}
            className="hidden text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 lg:inline-flex"
          >
            {dict.header.login}
          </a>
          <a
            href={localizedHref(locale, "/products/rio")}
            className="hidden rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 lg:inline-flex"
          >
            {dict.header.cta} <span aria-hidden className="ml-1">→</span>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
            aria-label={dict.header.menu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {activeNav ? (
        <MegaMenu
          locale={locale}
          label={dict.nav[activeNav.key]?.label ?? activeNav.label}
          columns={dict.nav[activeNav.key]?.columns ?? []}
          visual={dict.nav[activeNav.key]?.visual ?? { eyebrow: "", title: "", description: "", href: "/" }}
        />
      ) : null}

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        closeLabel={dict.header.close}
        items={navItems.map((item) => ({
          label: (dict.nav[item.key]?.label ?? item.label) as string,
          href: localizedHref(locale, item.href),
        }))}
      />
    </header>
  );
}

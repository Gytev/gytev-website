"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";
import { navItems } from "@gytev/config";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavbarProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Navbar({ locale, dictionary }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const dict = dictionary as Dictionary;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href={localizedHref(locale, "/")} className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 font-bold text-white">
            G
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-900">Gytev</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const nav = dict.nav[item.key];
            const label = nav?.label ?? item.label;
            const items = nav?.items;
            const href = localizedHref(locale, item.href);

            return (
              <div key={item.key} className="group relative">
                <a
                  href={href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900"
                >
                  {label}
                  {items ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : null}
                </a>
                {items ? <MegaMenu label={label} href={href} items={items} /> : null}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />
          <a
            href={localizedHref(locale, "/company/contact")}
            className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 lg:inline-flex"
          >
            Contact
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={navItems.map((item) => ({
          label: (dict.nav[item.key]?.label ?? item.label) as string,
          href: localizedHref(locale, item.href),
        }))}
      />
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";
import { navItems } from "@gytev/config";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

type NavbarProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const menuImages: Record<string, string> = {
  research: "/images/mega/research.jpg",
  products: "/images/mega/products.jpg",
  solutions: "/images/mega/solutions.jpg",
  developers: "/images/mega/developers.jpg",
  company: "/images/mega/company.jpg",
};

export function Navbar({ locale, dictionary }: NavbarProps) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const dict = dictionary as Dictionary;

  useEffect(() => {
    function restartLogo() {
      const img = logoRef.current;
      if (!img || window.scrollY !== 0) return;
      const clone = img.cloneNode(true) as HTMLImageElement;
      img.replaceWith(clone);
      logoRef.current = clone;
    }
    function onScroll() {
      if (window.scrollY === 0) restartLogo();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="sticky top-0 z-40 bg-[#131313] text-white"
    >
      <nav className="relative z-10 mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-10">
        <div className="flex items-center gap-6 lg:gap-8">
          <a href={localizedHref(locale, "/")} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF, cannot use next/image */}
            <img
              ref={logoRef}
              src="/Logo%20G%E2%85%84T%C6%8EV.gif"
              alt="Gytev"
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover"
            />
          </a>

          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navItems.map((item) => {
              const nav = dict.nav[item.key];
              const label = nav?.label ?? item.label;

              return (
                <button
                  key={item.key}
                  type="button"
                  onMouseEnter={() => setActive(item.key)}
                  onClick={() => setActive(item.key)}
                  aria-expanded={active === item.key}
                  className={`px-0 py-2 text-[14px] font-medium transition-colors ${active === item.key ? "text-white" : "text-[#c8c6c5] hover:text-white"}`}
                >
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              className="p-2 text-[#c8c6c5] transition-colors hover:text-white"
              aria-label={searchOpen ? dict.search.close : dict.header.search}
            >
              {searchOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="nav-actions flex items-center gap-2">
          <a
            href={localizedHref(locale, "/products")}
            className="button button--light"
          >
            {dict.cta.ctaPrimary} <span aria-hidden>→</span>
          </a>
          <a
            href={localizedHref(locale, "/company/contact")}
            className="button button--dark"
          >
            {dict.cta.ctaSecondary} <span aria-hidden>→</span>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
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
          image={menuImages[activeNav.key]}
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

      <SearchOverlay
        dict={dict}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
}

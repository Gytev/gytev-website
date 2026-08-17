"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@gytev/types";
import { locales, localeNames } from "@gytev/i18n";

const flags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-2">
      <span className="text-sm text-[#a3a3a3]">{locale === "fr" ? "Langue :" : "Language :"}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[#333] px-3 py-1.5 text-sm text-white transition-colors hover:border-[#555]"
      >
        {localeNames[locale]}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute bottom-full right-0 z-20 mb-2 w-52 overflow-hidden rounded-xl border border-[#333] bg-[#131313] py-1 shadow-lg"
        >
          {locales.map((code) => {
            const isActive = code === locale;
            return (
              <li key={code}>
                <a
                  href={isActive ? undefined : `/${code}`}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setOpen(false)}
                  className={
                    isActive
                      ? "flex items-center justify-between gap-2 bg-[#222] px-4 py-2 text-sm font-medium text-white"
                      : "flex items-center justify-between gap-2 px-4 py-2 text-sm text-[#a3a3a3] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                  }
                >
                  <span className="flex items-center gap-2">
                    {localeNames[code]}
                  </span>
                  {isActive ? (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

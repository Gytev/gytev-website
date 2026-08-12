"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { searchEntries } from "@/lib/search";

type SearchOverlayProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ locale, open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchEntries(locale, query), [locale, query]);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4">
          <svg className="h-5 w-5 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the site…"
            className="h-14 w-full bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:text-zinc-900"
            aria-label="Close search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="max-h-96 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <li className="px-3 py-8 text-center text-sm text-zinc-500">
              Type to search the site.
            </li>
          ) : results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-zinc-500">
              No results for “{query}”.
            </li>
          ) : (
            results.slice(0, 8).map((result) => (
              <li key={`${result.href}-${result.title}`}>
                <a
                  href={localizedHref(locale, result.href)}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-50"
                >
                  <p className="text-sm font-semibold text-zinc-900">{result.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-6 text-zinc-500">
                    {result.description}
                  </p>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

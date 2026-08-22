"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@gytev/i18n";

type SearchOverlayProps = {
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
};

type DomainKey = keyof Dictionary["search"]["domains"];

const DOMAINS: DomainKey[] = [
  "products",
  "solutions",
  "research",
  "developers",
  "blog",
  "customers",
  "company",
];

export function SearchOverlay({ dict, open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [domainIndex, setDomainIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setDomainIndex(0);
      setFocused(false);
      setQuery("");
    }
  }

  const idle = !focused && !query;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !idle) return;
    const id = setInterval(() => {
      setDomainIndex((index) => (index + 1) % DOMAINS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [open, idle]);

  if (!open) return null;

  return (
    <div className="search-overlay fixed inset-x-0 bottom-0 top-16 z-0 overflow-y-auto bg-[#0c0c0c]" role="dialog">
      <div className="mx-auto w-full max-w-3xl px-6 pt-[10vh] pb-20">
        <div className="search-line">
          <div className="flex items-center gap-4 border-b border-white/15 pb-5 transition-colors focus-within:border-white/50">
            <svg
              className="h-7 w-7 shrink-0 text-white/45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>

            {idle ? (
              <span
                key={DOMAINS[domainIndex]}
                className="search-domain shrink-0 select-none text-lg font-medium text-white md:text-xl"
              >
                {dict.search.searchIn} {dict.search.domains[DOMAINS[domainIndex]]}
              </span>
            ) : null}

            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label={dict.search.placeholder}
              className="h-11 min-w-0 flex-1 bg-transparent text-2xl font-light text-white outline-none placeholder:text-white/30 md:text-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

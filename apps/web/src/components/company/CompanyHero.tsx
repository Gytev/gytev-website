"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@gytev/ui";

type CompanyHeroProps = {
  kicker: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function CompanyHero({ kicker, title, description, children }: CompanyHeroProps) {
  const descRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    function onScroll() {
      if (!descRef.current) return;
      const rect = descRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const fadeStart = viewH * 0.5;
      const fadeEnd = viewH * 0.1;
      if (rect.top < fadeStart) {
        const ratio = Math.max(0, (rect.top - fadeEnd) / (fadeStart - fadeEnd));
        setOpacity(ratio);
      } else {
        setOpacity(1);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 border-b border-[var(--line)] bg-[var(--color-surface)] overflow-hidden">
      {/* Ambient animated light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />
      </div>
      <Container>
        {/* Title */}
        <div className="max-w-4xl">
          {kicker && (
            <div className="flex items-center gap-3 mb-8">
              <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                {kicker}
              </p>
            </div>
          )}

          <h1
            className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-7xl"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom row: children (CTA) left, description right */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {children && <div>{children}</div>}

          {description && (
            <div
              ref={descRef}
              className="max-w-xs sm:max-w-sm"
              style={{ opacity, transition: "opacity 0.1s ease-out" }}
            >
              <p className="text-sm leading-relaxed text-zinc-500 font-medium">
                {description}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

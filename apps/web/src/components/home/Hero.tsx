"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@gytev/i18n";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";

type HeroProps = {
  dict: Dictionary;
  locale: Locale;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (p: number) => p * p * (3 - 2 * p);

/**
 * Mistral-style hero: the title sits top-left below the navbar, the next
 * section's question ("How AI can break the global economy?") sits in the
 * bottom-right corner, and scrolling drives both the exit animation (title
 * lifts away) and its reversal when scrolling back up.
 * The scroll value is written as `--hero-progress` (0 -> 1, eased) straight
 * to the section, keeping the animation off React's render path.
 */
export function Hero({ dict, locale }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const hero = dict.hero;
  const cq = dict.centralQuestion;

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let progress = -1;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const frame = () => {
      const next = section.nextElementSibling;
      const vh = window.innerHeight;
      const rect = next ? next.getBoundingClientRect() : null;
      const p = rect ? clamp01(1 - rect.top / vh) : 0;
      if (p !== progress) {
        progress = p;
        section.style.setProperty("--hero-progress", smoothstep(p).toFixed(4));
      }
      if (visual && canHover.matches && !reducedMotion.matches) {
        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;
        visual.style.setProperty("--pointer-x", currentX.toFixed(4));
        visual.style.setProperty("--pointer-y", currentY.toFixed(4));
      }
      raf = requestAnimationFrame(frame);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = visual!.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    };
    const reset = () => {
      targetX = 0;
      targetY = 0;
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!raf) raf = requestAnimationFrame(frame);
          } else if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        });
      },
      { threshold: 0.02 },
    );
    io.observe(section);
    if (visual && canHover.matches && !reducedMotion.matches) {
      visual.addEventListener("pointermove", onPointerMove);
      visual.addEventListener("pointerleave", reset);
    }

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (visual) {
        visual.removeEventListener("pointermove", onPointerMove);
        visual.removeEventListener("pointerleave", reset);
      }
    };
  }, [cq.nodes]);

  return (
    <section className="hero" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="hero__visual" ref={visualRef} aria-hidden="true">
        <div className="hero__rings">
          <div className="hero__halo hero__halo--one" />
          <div className="hero__halo hero__halo--two" />
          <div className="hero__field" />
          <div className="hero__ribbon hero__ribbon--one" />
          <div className="hero__ribbon hero__ribbon--two" />
        </div>
        <div className="hero__signal" />
        <div className="hero__grain" />
      </div>
      <div className="hero__content">
        <div className="hero__inner">
          <h1 id="hero-title">
            {hero.title}
            <br />
            <span>{hero.highlight}</span>
          </h1>
          <Link href={localizedHref(locale, "/products/rio")} className="hero__primary">
            {hero.ctaPrimary} <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
      <p className="hero__mini" aria-hidden="true">{cq.title}</p>
    </section>
  );
}

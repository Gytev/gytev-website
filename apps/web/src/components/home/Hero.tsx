"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * The cursor effect writes CSS custom properties directly to the visual layer.
 * It intentionally avoids state updates, keeping pointer movement off React's render path.
 */
export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!visual || !canHover.matches || reducedMotion.matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      visual.style.setProperty("--pointer-x", currentX.toFixed(4));
      visual.style.setProperty("--pointer-y", currentY.toFixed(4));
      frame = requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = visual.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    };
    const reset = () => { targetX = 0; targetY = 0; };

    frame = requestAnimationFrame(render);
    visual.addEventListener("pointermove", onPointerMove);
    visual.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      visual.removeEventListener("pointermove", onPointerMove);
      visual.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__visual" ref={visualRef} aria-hidden="true">
        <div className="hero__halo hero__halo--one" />
        <div className="hero__halo hero__halo--two" />
        <div className="hero__field" />
        <div className="hero__ribbon hero__ribbon--one" />
        <div className="hero__ribbon hero__ribbon--two" />
        <div className="hero__signal" />
        <div className="hero__grain" />
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">GYTEV · INTELLIGENCE SYSTEMS</p>
        <h1 id="hero-title">Intelligence that<br /><span>moves the world forward.</span></h1>
        <p className="hero__lede">Gytev turns complex knowledge into autonomous systems that see clearly, reason precisely, and create momentum.</p>
        <div className="hero__actions">
          <Link href="/en/products/rio" className="hero__primary">Explore Rio <span aria-hidden>↗</span></Link>
          <Link href="/en/company/vision" className="hero__secondary">Discover our vision <span aria-hidden>→</span></Link>
        </div>
      </div>
      <p className="hero__caption" aria-hidden="true"><i /> Adaptive reasoning, in motion</p>
    </section>
  );
}

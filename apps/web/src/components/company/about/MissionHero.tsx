"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@gytev/i18n";

export function MissionHero({ dict }: { dict: Dictionary }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!pin || !stage) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = pin.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const runway = Math.max(rect.height - viewport, 1);
      const progress = Math.min(Math.max(-rect.top / runway, 0), 1);
      stage.style.setProperty("--mp", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const { missionLine } = dict.aboutExperience;
  const words = missionLine.split(" ");

  return (
    <section className="about-hero">
      <div className="about-hero__pin" ref={pinRef}>
        <div className="about-hero__viewport">
          <div className="about-hero__wrap">
            <div className="about-hero__stage" ref={stageRef}>
              <div className="about-hero__copy">
                <h1 className="about-hero__line">
                  {words.map((word, index) => (
                    <span
                      key={`${word}-${index}`}
                      className="about-hero__word"
                      style={{ animationDelay: `${0.35 + index * 0.075}s` }}
                    >
                      {word}
                      {index < words.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </h1>
              </div>
              <div className="about-hero__media">
                {/* eslint-disable-next-line @next/next/no-img-element -- scroll-driven art direction, plain img keeps it lightweight */}
                <img
                  src="/images/about/team-hero.jpg"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

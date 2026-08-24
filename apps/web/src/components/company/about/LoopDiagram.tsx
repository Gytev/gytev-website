"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@gytev/i18n";
import { Container } from "@gytev/ui";

const START_DEG = -90;
const STEP_DEG = 72;
const RING_RADIUS = 210;
const CENTER = 300;
const CYCLE_MS = 1000;

/** Point sur l'anneau, en unités du viewBox SVG (600x600). */
function ringPoint(index: number): { x: number; y: number } {
  const rad = ((START_DEG + index * STEP_DEG) * Math.PI) / 180;
  return { x: CENTER + RING_RADIUS * Math.cos(rad), y: CENTER + RING_RADIUS * Math.sin(rad) };
}

/** Point sur le cercle des nœuds, en pourcentage de la scène. */
function stagePoint(index: number): { x: number; y: number } {
  const rad = ((START_DEG + index * STEP_DEG) * Math.PI) / 180;
  return { x: 50 + 35 * Math.cos(rad), y: 50 + 35 * Math.sin(rad) };
}

export function LoopDiagram({ dict }: { dict: Dictionary }) {
  const { loopHeading, loopSteps } = dict.aboutExperience;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof IntersectionObserver === "undefined",
  );
  const [active, setActive] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let paused = false;
    const stage = stageRef.current;
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    stage?.addEventListener("mouseenter", onEnter);
    stage?.addEventListener("mouseleave", onLeave);
    const id = window.setInterval(() => {
      if (!paused && !document.hidden) {
        setActive((current) => (current + 1) % loopSteps.length);
      }
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
      stage?.removeEventListener("mouseenter", onEnter);
      stage?.removeEventListener("mouseleave", onLeave);
    };
  }, [visible, loopSteps.length]);

  const activeStep = loopSteps[active % loopSteps.length];

  return (
    <section ref={sectionRef} className="about-loop">
      <Container>
        <div className="about-loop__header">
          <h2 className="about-heading">{loopHeading}</h2>
        </div>

        <div ref={stageRef} className={`about-loop__stage ${visible ? "is-visible" : ""}`}>
          <svg className="about-loop__ring" viewBox="0 0 600 600" aria-hidden="true">
            <circle className="about-loop__ring-core" cx={CENTER} cy={CENTER} r={142} />
            <circle className="about-loop__ring-track" cx={CENTER} cy={CENTER} r={RING_RADIUS} />
            {loopSteps.map((_, index) => {
              const p = ringPoint(index);
              const rotation = START_DEG + index * STEP_DEG + STEP_DEG / 2 + 90;
              return (
                <path
                  key={index}
                  className="about-loop__ring-arrow"
                  d="M -9 -7 L 10 0 L -9 7 Z"
                  transform={`translate(${p.x} ${p.y}) rotate(${rotation})`}
                />
              );
            })}
          </svg>

          <div className="about-loop__hub">
            <p className="about-loop__hub-desc">{activeStep.description}</p>
          </div>

          {loopSteps.map((step, index) => {
            const point = stagePoint(index);
            return (
              <div
                key={step.label}
                className={`about-loop__node ${index === active ? "is-active" : ""}`}
                style={{ left: `${point.x}%`, top: `${point.y}%`, "--i": index } as CSSProperties}
              >
                <span className="about-loop__dot">{String(index + 1).padStart(2, "0")}</span>
                <span className="about-loop__label">{step.label}</span>
              </div>
            );
          })}
        </div>

        <ol className="sr-only">
          {loopSteps.map((step) => (
            <li key={step.label}>
              <strong>{step.label}</strong>: {step.description}
            </li>
          ))}
        </ol>

        <ol className={`about-loop__stack ${visible ? "is-visible" : ""}`}>
          {loopSteps.map((step, index) => (
            <li
              key={step.label}
              className={`about-loop__card ${activeCard === index ? "is-active" : ""}`}
              style={{ "--i": index } as CSSProperties}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <span className="about-loop__badge" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="about-loop__body">
                <h3 className="about-loop__title">{step.label}</h3>
                <p className="about-loop__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

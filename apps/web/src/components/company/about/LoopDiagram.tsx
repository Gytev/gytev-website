"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@gytev/i18n";
import { Container } from "@gytev/ui";

export function LoopDiagram({ dict }: { dict: Dictionary }) {
  const { loopEyebrow, loopHeading, loopSteps } = dict.aboutExperience;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof IntersectionObserver === "undefined",
  );

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

  return (
    <section ref={sectionRef} className="about-loop">
      <Container>
        <div className="about-loop__header">
          <p className="about-eyebrow">{loopEyebrow}</p>
          <h2 className="about-heading">{loopHeading}</h2>
        </div>

        <ol className={`about-loop__stairs ${visible ? "is-visible" : ""}`}>
          {loopSteps.map((step, index) => (
            <li
              key={step.label}
              className="about-loop__card"
              style={{ "--i": index } as CSSProperties}
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

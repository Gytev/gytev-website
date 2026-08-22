"use client";

import { useState } from "react";
import type { Dictionary } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { Reveal } from "./Reveal";

export function ThesisScroll({ dict }: { dict: Dictionary }) {
  const { thesisHeading, questions, explanations } = dict.aboutExperience;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="about-thesis">
      <Container>
        <div className="about-thesis__grid">
          <div className="about-thesis__sticky">
            <h2 className="about-heading">{thesisHeading}</h2>
          </div>
          <div className="about-thesis__questions">
            {questions.map((question, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal key={question} delay={index * 70}>
                  <article
                    className={`about-question ${isOpen ? "is-open" : ""}`}
                  >
                    <h3 className="about-question__heading">
                      <button
                        type="button"
                        className="about-question__trigger"
                        aria-expanded={isOpen}
                        aria-controls={`thesis-panel-${index}`}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span className="about-question__index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="about-question__text">{question}</span>
                        <span
                          className="about-question__icon"
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={`thesis-panel-${index}`}
                      className="about-question__panel"
                    >
                      <p>{explanations[index]}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

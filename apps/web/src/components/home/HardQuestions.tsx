"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@gytev/i18n";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { KtveController } from "./ktveNet";

type HardQuestionsProps = {
  dict: Dictionary;
  locale: Locale;
};

export function HardQuestions({ dict, locale }: HardQuestionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cq = dict.centralQuestion;

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const svg = svgRef.current;
    if (!section || !bg || !content || !title || !svg) return;

    const controller = new KtveController(svg, bg, section, content, title);
    controller.setHubLines(() => cq.nodes);
    controller.init(cq.nodes);
    return () => controller.dispose();
  }, [cq]);

  return (
    <section ref={sectionRef} className="hard-questions" aria-labelledby="hard-questions-title">
      <div className="big-cta_scroll-bg is-kt3" ref={bgRef}>
        <div className="big-cta_container is-kt3">
          <div className="big-cta-content_wrap is-kt3" ref={contentRef}>
            <h2 id="hard-questions-title" className="big-cta_title is-kt3" ref={titleRef}>
              {cq.title}
            </h2>
            {cq.subtitle ? (
              <div className="big-cta_subtitle-wrap is-kt3">
                <p className="big-cta_subtitle is-kt3">{cq.subtitle}</p>
              </div>
            ) : null}
            <Link href={localizedHref(locale, "/company/about")} className="big-cta_btn">
              {cq.cta} <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="big-cta-asset_wrap is-kt3" aria-hidden="true">
            <svg
              ref={svgRef}
              className="ktve-net"
              viewBox="0 0 1440 704"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

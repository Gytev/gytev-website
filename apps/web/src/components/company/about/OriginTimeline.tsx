"use client";

import { useRef } from "react";
import type { Dictionary } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { Reveal } from "./Reveal";

type Milestone = {
  date: string;
  title: string;
  description?: string;
  event_type?: string;
};

const ART_BY_TYPE: Record<string, string> = {
  launch: "keydate-card__art--launch",
  funding: "keydate-card__art--funding",
  leadership: "keydate-card__art--leadership",
  milestone: "keydate-card__art--milestone",
};

const ICON_STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LaunchIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g {...ICON_STROKE}>
        <path d="M24 5.5c4.2 3.1 6.2 8 6.2 13.2L24 25l-6.2-6.3c0-5.2 2-10.1 6.2-13.2Z" />
        <circle cx="24" cy="16.5" r="2.7" />
        <path d="M17.8 20.5 12 24v5.2l5.8-2.4" />
        <path d="M30.2 20.5 36 24v5.2l-5.8-2.4" />
        <path d="M24 28.5v6.5" />
        <path d="m19.5 32-2.5 2.5M28.5 32l2.5 2.5" />
      </g>
    </svg>
  );
}

function FundingIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g {...ICON_STROKE}>
        <ellipse cx="24" cy="14.5" rx="10.5" ry="4.2" />
        <path d="M13.5 14.5v9c0 2.3 4.7 4.2 10.5 4.2s10.5-1.9 10.5-4.2v-9" />
        <path d="M13.5 23.5v9c0 2.3 4.7 4.2 10.5 4.2s10.5-1.9 10.5-4.2v-9" />
      </g>
    </svg>
  );
}

function LeadershipIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g {...ICON_STROKE}>
        <circle cx="21" cy="17" r="6.2" />
        <path d="M9.5 39c0-7.2 5.1-11.5 11.5-11.5S32.5 31.8 32.5 39" />
        <path
          d="m36 8.5 1.5 3.2 3.5.4-2.6 2.4.7 3.5-3.1-1.8-3.1 1.8.7-3.5-2.6-2.4 3.5-.4Z"
          fill="currentColor"
          stroke="none"
        />
      </g>
    </svg>
  );
}

function MilestoneIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g {...ICON_STROKE}>
        <path d="M15.5 41V8" />
        <path d="M15.5 9.5h19l-5.5 6.5 5.5 6.5h-19" />
        <path d="M9.5 41h16" />
      </g>
    </svg>
  );
}

const ICON_BY_TYPE: Record<string, () => React.JSX.Element> = {
  launch: LaunchIcon,
  funding: FundingIcon,
  leadership: LeadershipIcon,
  milestone: MilestoneIcon,
};

export function OriginTimeline({
  dict,
  milestones,
}: {
  dict: Dictionary;
  milestones: Milestone[];
}) {
  const { keyDatesHeading, eventTypes } = dict.aboutExperience;
  const trackRef = useRef<HTMLOListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".keydate-card");
    const step = card ? card.offsetWidth + 16 : 400;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <>
      <section className="about-keydates" aria-label={keyDatesHeading}>
        <Container>
          <div className="keydates-header">
            <Reveal>
              <h2 className="about-heading about-heading--ink">{keyDatesHeading}</h2>
            </Reveal>
            <div className="keydates-nav">
              <button type="button" onClick={() => scrollByCard(-1)} aria-label={dict.home.cases.prev}>
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => scrollByCard(1)} aria-label={dict.home.cases.next}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <ol className="keydates-track" ref={trackRef}>
            {milestones.map((milestone, index) => (
              <li
                key={milestone.date}
                className="keydate-card"
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className="keydate-card__top">
                  <div className="keydate-card__head">
                    <span className="keydate-card__chip">{milestone.date}</span>
                  </div>
                  <div className="keydate-card__mid">
                    <h3 className="keydate-card__title">{milestone.title}.</h3>
                  </div>
                </div>
                <div
                  className={`keydate-card__art ${ART_BY_TYPE[milestone.event_type ?? "milestone"] ?? ART_BY_TYPE.milestone}`}
                  aria-hidden="true"
                >
                  {(() => {
                    const Icon =
                      ICON_BY_TYPE[milestone.event_type ?? "milestone"] ?? MilestoneIcon;
                    return (
                      <span className="keydate-card__icon">
                        <Icon />
                      </span>
                    );
                  })()}
                  <span className="keydate-card__art-label">
                    {(eventTypes[(milestone.event_type as keyof typeof eventTypes) ?? "milestone"] ??
                      eventTypes.milestone
                    ).replace(/\.+$/, "")}
                    .
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}

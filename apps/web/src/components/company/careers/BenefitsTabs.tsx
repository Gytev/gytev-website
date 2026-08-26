"use client";

import { useEffect, useRef, useState } from "react";

type BenefitTab = {
  id: string;
  label: string;
  items: { title: string; description: string }[];
};

type BenefitsTabsProps = {
  heading: string;
  description: string;
  tabs: BenefitTab[];
};

const ICONS = [
  // plus
  "M13 6h-2v5H6v2h5v5h2v-5h5v-2h-5V6z",
  // squares
  "M7 7h7v7H7V7zm9 9h7v7h-7v-7z",
  // ring
  "M15 8a7 7 0 100 14 7 7 0 000-14zm0 3a4 4 0 110 8 4 4 0 010-8z",
  // diamond
  "M15 5l10 10-10 10L5 15 15 5z",
  // bars
  "M7 19h4v-6H7v6zm7 0h4V9h-4v10zM7 11h4V7H7v4z",
  // cross-dot
  "M8 8h5v5H8V8zm9 9h5v5h-5v-17h-2z",
];

function withDot(text: string) {
  return text.endsWith(".") ? text : `${text}.`;
}

export function BenefitsTabs({ heading, description, tabs }: BenefitsTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    tabs.find((t) => t.id === activeId)?.label ?? tabs[0]?.label ?? "";

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const targets = tabs
      .map((t) => root.querySelector<HTMLElement>(`#benefit-${CSS.escape(t.id)}`))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace("benefit-", ""));
          }
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [tabs]);

  function goTo(id: string) {
    setActiveId(id);
    setMobileOpen(false);
    document
      .getElementById(`benefit-${CSS.escape(id)}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="benefits" className="scroll-mt-24 text-neutral-900 pt-10 pb-10 lg:pb-20 bg-white">
      {/* Editorial headline */}
      <div className="w-full relative px-4 lg:px-10">
        <p className="pt-10 lg:pt-20 text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl text-left">
          {heading}
        </p>
        <p className="mt-6 lg:mt-10 text-lg text-neutral-600 text-left leading-relaxed">
          {description}
        </p>
      </div>

      {/* Anchor nav + stacked categories */}
      <div ref={sectionRef} className="mt-10 border-neutral-200 border-y">
        <div className="relative h-auto w-full flex flex-col md:flex-row md:gap-10 px-4 md:px-10">
          {/* Left: sticky scroll-spy nav */}
          <div className="shrink-0 md:max-w-56 sticky top-12 md:top-11 z-10 w-full md:w-1/4 bg-white md:border-0 border-b border-neutral-200 py-4 md:py-10">
            {/* Mobile trigger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="w-full gap-4 flex md:hidden items-center justify-between duration-300 transition-all p-4 border border-t-0 border-neutral-200"
            >
              <p className="text-base text-current text-left">{activeLabel}</p>
              <svg
                className={`w-5 h-5 shrink-0 transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={mobileOpen ? "" : "hidden md:block"}>
              <div className="shadow-lg bg-white rounded-b-xl md:rounded-xl border border-t-0 md:border-t border-neutral-200">
                <ul className="flex flex-col w-full">
                  {tabs.map((tab, idx) => (
                    <li
                      key={tab.id}
                      className={idx < tabs.length - 1 ? "border-b border-neutral-200" : ""}
                    >
                      <button
                        onClick={() => goTo(tab.id)}
                        className={`w-full flex justify-between items-center transition-all duration-300 p-4 pt-3 text-left ${
                          activeId === tab.id
                            ? "text-neutral-900"
                            : "text-neutral-400 hover:text-neutral-900"
                        }`}
                      >
                        <div className="flex gap-3 items-center h-full">
                          <p className="text-base font-medium">{tab.label}</p>
                        </div>
                        {activeId === tab.id && (
                          <svg
                            className="w-4 h-4 shrink-0 text-neutral-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: all categories stacked */}
          <div className="w-full md:w-3/4">
            {tabs.map((tab) => (
              <div key={tab.id} id={`benefit-${tab.id}`} className="scroll-mt-28 border-l border-neutral-200">
                {/* Category heading band */}
                <div className="-mb-px md:grid lg:grid-cols-1">
                  <div className="flex items-end p-4 md:p-10 gap-10 md:gap-40 border-b border-neutral-200 border-r">
                    <p className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                      {tab.label}
                    </p>
                  </div>
                </div>
                {/* Cards grid */}
                <div
                  className={`-mb-px md:grid ${
                    tab.items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  {tab.items.map((item, i) => (
                    <div
                      key={item.title}
                      className="flex flex-col gap-4 p-4 md:gap-10 md:p-10 justify-between items-start border-b border-neutral-200 border-r"
                    >
                      <div className="flex flex-col gap-4 items-start">
                        <span
                          className="relative inline-block size-5"
                          style={{ color: "var(--color-signal-500, #c45824)" }}
                        >
                          <svg viewBox="0 0 30 30" fill="none">
                            <path d={ICONS[i % ICONS.length]} fill="currentColor" />
                          </svg>
                        </span>
                        <div className="flex flex-col gap-2 items-start">
                          <p className="text-xl font-medium text-neutral-900 min-h-16">
                            {withDot(item.title)}
                          </p>
                          <div className="text-neutral-600 leading-relaxed">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Decorative end strip */}
            <div className="hidden md:block border-x border-neutral-200 h-10 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

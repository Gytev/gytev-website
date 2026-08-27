"use client";

import { useState } from "react";

type InterviewTab = {
  id: string;
  label: string;
  image: string;
  steps: { title: string; description: string }[];
};

type InterviewProcessProps = {
  heading: string;
  description: string;
  tabs: InterviewTab[];
};

export function InterviewProcess({ heading, description, tabs }: InterviewProcessProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <section className="pt-0 pb-0">
      <div className="border-[rgba(255,255,255,0.08)] border-b">
        <div className="w-full relative h-auto flex flex-wrap lg:flex-nowrap border-[rgba(255,255,255,0.08)]">
          {/* Left: heading + description + tabs */}
          <div className="flex flex-col justify-end gap-6 w-full xl:w-[50%] bg-[#0a0a0b] border-r border-[rgba(255,255,255,0.08)]">
            <div className="flex flex-col gap-6 lg:gap-10 px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30">
              <p className="text-4xl font-medium tracking-tight text-[#f0ede8] sm:text-5xl lg:text-6xl">{heading}</p>
              <p className="text-lg text-[#999] leading-relaxed">{description}</p>
            </div>

            {/* Tab buttons */}
            <ul className="flex gap-4 px-4 md:px-10 lg:px-20 pb-4">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full transition-all duration-300 border ${
                      activeTab === tab.id
                        ? "bg-[#f0ede8] text-[#0a0a0b] border-transparent px-4 py-2 text-sm font-medium"
                        : "bg-[#141416] text-[#888] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] px-4 py-2 text-sm font-medium"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Step cards */}
            <div className="p-4 md:p-10 lg:px-20 lg:pt-0 flex flex-col gap-4">
              {activeTabData?.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-4 p-6 border border-[rgba(255,255,255,0.08)] rounded-xl">
                  <div className="flex items-center gap-3 text-sm text-[#888]">
                    <span className="font-medium text-[#f0ede8]">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-base text-[#f0ede8] font-medium">{step.title}</span>
                  </div>
                  <p className="text-base text-[#999]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="w-full flex items-center justify-center relative xl:w-[50%] bg-[#141416]">
            <div className="w-full h-full object-contain relative z-2 p-4 md:p-10 xl:p-20">
              <div className="relative overflow-hidden group size-full object-contain" style={{ aspectRatio: "2176 / 2176" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeTabData?.image ?? ""}
                  alt={activeTabData?.label ?? ""}
                  loading="lazy"
                  className="absolute inset-0 w-full z-2 h-full object-cover transition-opacity duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

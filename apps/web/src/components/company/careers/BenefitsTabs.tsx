"use client";

import { useState } from "react";

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

export function BenefitsTabs({ heading, description, tabs }: BenefitsTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <section className="text-neutral-900 pt-10 pb-10 lg:pb-20 bg-white">
      {/* Heading */}
      <div className="w-full relative px-4 lg:px-10">
        <section className="flex flex-col pt-10 lg:pt-20 pb-0">
          <div className="flex flex-col gap-6 lg:gap-10">
            <p className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl text-left">{heading}</p>
            <div className="flex gap-6 lg:gap-10 flex-col lg:flex-row items-start lg:items-center lg:justify-between justify-start">
              <p className="text-lg text-neutral-600 text-left grow">{description}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Tabs + Content */}
      <div className="border-neutral-200 border-b border-t mt-10">
        <div className="relative h-auto w-full flex flex-col md:flex-row md:gap-10 justify-between items-start px-4 md:px-10">
          {/* Sidebar tabs */}
          <div className="shrink-0 md:max-w-56 sticky top-12 md:top-11 z-10 w-full md:w-1/4 bg-white md:border-0 border-b border-neutral-200 py-4 md:py-10">
            <div className="shadow-lg bg-white rounded-b-xl md:rounded-xl border border-t-0 md:border-t border-neutral-200">
              <ul className="flex flex-col w-full">
                {tabs.map((tab, idx) => (
                  <li key={tab.id} className={idx < tabs.length - 1 ? "border-b border-neutral-200" : ""}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex justify-between items-center transition-all duration-300 p-4 pt-3 text-left ${
                        activeTab === tab.id
                          ? "text-neutral-900"
                          : "text-neutral-400 hover:text-neutral-900"
                      }`}
                    >
                      <div className="flex gap-3 items-center h-full">
                        <p className="text-base font-medium">{tab.label}</p>
                      </div>
                      {activeTab === tab.id && (
                        <svg className="w-4 h-4 shrink-0 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content area */}
          <div className="w-full md:w-3/4">
            {activeTabData && (
              <div className="border-l border-neutral-200">
                {/* Section heading */}
                <div className="-mb-px md:grid lg:grid-cols-1">
                  <div className="flex items-end p-4 md:p-10 gap-10 md:gap-40 border-b border-neutral-200 border-r">
                    <div className="flex flex-col grow">
                      <div className="flex flex-col gap-4 md:gap-10">
                        <p className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">{activeTabData.label}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Cards grid */}
                <div className="-mb-px md:grid lg:grid-cols-3">
                  {activeTabData.items.map((item) => (
                    <div key={item.title} className="flex flex-col gap-4 p-4 md:gap-10 md:p-10 justify-between items-start border-b border-neutral-200 border-r">
                      <div className="flex flex-col gap-4 items-start">
                        <div className="flex flex-col gap-2 items-start">
                          <p className="text-xl font-medium text-neutral-900 min-h-16 mb-4">{item.title}</p>
                          <div className="text-neutral-600">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

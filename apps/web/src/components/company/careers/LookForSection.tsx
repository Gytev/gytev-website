"use client";

import { useState } from "react";

type LookForItem = {
  title: string;
  description: string;
  image: string;
};

type LookForSectionProps = {
  heading: string;
  items: LookForItem[];
};

export function LookForSection({ heading, items }: LookForSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="pt-0 pb-0">
      <div className="border-neutral-200 border-b">
        <div className="w-full relative border-neutral-200 bg-white">
          <div className="px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30 border-b border-neutral-200 flex flex-col gap-10">
            <h2 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">{heading}</h2>
            <div className="flex flex-col gap-4">
              {items.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const hasHovered = hoveredIdx !== null;
                const shouldHighlight = isHovered;
                const shouldDim = hasHovered && !isHovered;

                return (
                  <div
                    key={item.title}
                    className={`border border-neutral-200 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                      shouldHighlight ? "bg-white shadow-sm" : ""
                    } ${shouldDim ? "opacity-50" : ""}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div className="flex flex-col gap-1 md:w-3/4">
                      <h3 className="text-xl font-medium text-neutral-900">{item.title}</h3>
                      <p className="text-lg text-neutral-600">{item.description}</p>
                    </div>
                    <div className="w-full md:w-1/4 relative h-32 md:h-40 rounded-lg overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

type ValueItem = {
  title: string;
  description: string;
};

type ValuesSectionProps = {
  heading: string;
  values: ValueItem[];
};

const valueColors = [
  { bg: "bg-amber-50", num: "text-amber-700", border: "border-amber-200" },
  { bg: "bg-emerald-50", num: "text-emerald-700", border: "border-emerald-200" },
  { bg: "bg-sky-50", num: "text-sky-700", border: "border-sky-200" },
  { bg: "bg-violet-50", num: "text-violet-700", border: "border-violet-200" },
  { bg: "bg-rose-50", num: "text-rose-700", border: "border-rose-200" },
];

export function ValuesSection({ heading, values }: ValuesSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="pt-0 pb-0">
      <div className="border-neutral-200 border-b">
        <div className="w-full relative border-neutral-200 bg-white">
          {/* Title */}
          <div className="px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30 border-b border-neutral-200">
            <h2 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">{heading}</h2>
          </div>
          {/* Value cards */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {values.map((value, idx) => {
              const color = valueColors[idx % valueColors.length];
              const isHovered = hoveredIdx === idx;
              const hasHovered = hoveredIdx !== null;

              return (
                <div
                  key={idx}
                  className={`border-b md:border-r ${color.border} ${color.bg} transition-all duration-300 last:border-r-0 ${
                    hasHovered && !isHovered ? "opacity-40" : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="p-6 lg:p-10 flex flex-col justify-between h-full min-h-[280px]">
                    <div>
                      <span className={`text-xs font-semibold tracking-widest ${color.num} mb-6 block`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-neutral-900 mb-3">{value.title}</h3>
                      <p className="text-base text-neutral-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

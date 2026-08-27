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
  { bg: "bg-[rgba(255,193,7,0.08)]", num: "text-amber-400", border: "border-[rgba(255,193,7,0.2)]" },
  { bg: "bg-[rgba(16,185,129,0.08)]", num: "text-emerald-400", border: "border-[rgba(16,185,129,0.2)]" },
  { bg: "bg-[rgba(14,165,233,0.08)]", num: "text-sky-400", border: "border-[rgba(14,165,233,0.2)]" },
  { bg: "bg-[rgba(139,92,246,0.08)]", num: "text-violet-400", border: "border-[rgba(139,92,246,0.2)]" },
  { bg: "bg-[rgba(244,63,94,0.08)]", num: "text-rose-400", border: "border-[rgba(244,63,94,0.2)]" },
];

export function ValuesSection({ heading, values }: ValuesSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="pt-0 pb-0">
      <div className="border-[rgba(255,255,255,0.08)] border-b">
        <div className="w-full relative border-[rgba(255,255,255,0.08)] bg-[#0a0a0b]">
          {/* Title */}
          <div className="px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30 border-b border-[rgba(255,255,255,0.08)]">
            <h2 className="text-4xl font-medium tracking-tight text-[#f0ede8] sm:text-5xl lg:text-6xl">{heading}</h2>
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
                      <h3 className="text-xl font-medium text-[#f0ede8] mb-3">{value.title}</h3>
                      <p className="text-base text-[#999] leading-relaxed">{value.description}</p>
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

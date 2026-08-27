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

function withDot(text: string) {
  return text.endsWith(".") ? text : `${text}.`;
}

export function LookForSection({ heading, items }: LookForSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="pt-0 pb-0">
      <div className="border-[rgba(255,255,255,0.08)] border-b">
        <div className="w-full relative border-[rgba(255,255,255,0.08)] bg-[#0a0a0b]">
          {/* Heading */}
          <div className="px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30 border-b border-[rgba(255,255,255,0.08)] flex flex-col gap-10">
            <h2 className="text-4xl font-medium tracking-tight text-[#f0ede8] sm:text-5xl lg:text-6xl">
              {heading}
            </h2>
          </div>

          {/* Split: text 40% / image 60% */}
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Right zone on mobile first: main image */}
            <div className="relative w-full lg:w-[60%] lg:order-2 aspect-[4/3] lg:aspect-auto lg:min-h-[560px] overflow-hidden border-b border-[rgba(255,255,255,0.08)] lg:border-b-0 lg:border-l">
              {items.map((item, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item.title}
                  src={item.image}
                  alt={item.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                    activeIdx === idx
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.02] pointer-events-none"
                  }`}
                />
              ))}
            </div>

            {/* Left zone: clickable points */}
            <div className="w-full lg:w-[40%] lg:order-1 flex flex-col bg-[#111113]">
              {items.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.title}
                    onClick={() => setActiveIdx(idx)}
                    className={`group text-left cursor-pointer transition-colors duration-300 px-4 md:px-10 py-8 md:py-12 border-b border-[rgba(255,255,255,0.08)] last:border-b-0 ${
                      isActive ? "bg-[#141416]" : "hover:bg-[#1a1a1c]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-2 size-2 rounded-full shrink-0 transition-colors duration-300 ${
                          isActive ? "bg-[#c45824]" : "bg-[#555] group-hover:bg-[#888]"
                        }`}
                      />
                      <div className="flex flex-col">
                        <p
                          className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 ${
                            isActive ? "text-[#f0ede8]" : "text-[#888] group-hover:text-[#ccc]"
                          }`}
                        >
                          {withDot(item.title)}
                        </p>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isActive ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-base md:text-lg text-[#999] leading-relaxed pr-4 md:pr-10">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

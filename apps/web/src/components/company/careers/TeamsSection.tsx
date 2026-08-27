"use client";

import { useState } from "react";

type TeamsSectionProps = {
  heading: string;
  description: string;
  teams: { name: string; description: string }[];
  stats: { value: string; label: string }[];
};

export function TeamsSection({ heading, description, teams, stats }: TeamsSectionProps) {
  const [activeTeam, setActiveTeam] = useState<number | null>(0);

  function toggleTeam(idx: number) {
    setActiveTeam((prev) => (prev === idx ? null : idx));
  }

  return (
    <section className="pt-0 pb-0">
      <div className="border-[rgba(255,255,255,0.08)] border-b">
        <div className="w-full relative h-auto flex flex-wrap lg:flex-nowrap border-[rgba(255,255,255,0.08)]">
          {/* Left: text + team buttons */}
          <div className="flex flex-col justify-end gap-6 w-full border-[rgba(255,255,255,0.08)] bg-[#111113] xl:w-[50%] px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30 border-r">
            <h2 className="text-4xl font-medium tracking-tight text-[#f0ede8] sm:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-lg text-[#999] leading-relaxed">
              {description}
            </p>
            <ul className="flex flex-col gap-2">
              {teams.map((team, idx) => {
                const isActive = activeTeam === idx;
                return (
                  <li key={team.name} className="w-full">
                    <button
                      onClick={() => toggleTeam(idx)}
                      className={`group block w-full rounded-full transition-all duration-300 ${
                        isActive
                          ? "rounded-xl p-6 bg-[#141416]"
                          : "p-2 pr-3 bg-[#141416] hover:bg-[#1a1a1c]"
                      }`}
                    >
                      <div className={`flex items-start relative gap-2 ${isActive ? "gap-3" : ""}`}>
                        <div className={`transition-all duration-300 size-6 flex justify-center items-center rounded-full shrink-0 ${
                          isActive
                            ? "bg-[#c45824] text-white rotate-45"
                            : "bg-[rgba(255,255,255,0.1)] text-[#888]"
                        }`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <div className={`transition-all duration-300 ${isActive ? "-mt-1" : ""}`}>
                          <span className={`block transition-all duration-300 truncate ${
                            isActive ? "text-lg font-medium" : "text-sm font-medium"
                          }`}>
                            {team.name}
                          </span>
                        </div>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}>
                        <p className="text-base text-[#999] pt-2 pl-9 pr-4">
                          {team.description}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: stats grid */}
          <div className="w-full flex items-center justify-center relative xl:w-[50%] p-4 md:p-10 xl:p-20 bg-[#141416]">
            <div className="w-full h-full object-contain relative z-2">
              <div className="grid grid-cols-2 aspect-square border-l border-t border-[rgba(255,255,255,0.08)]">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="stat-cell aspect-square p-6 md:p-10 flex flex-col items-center justify-center gap-2 md:gap-4 border-b border-r border-[rgba(255,255,255,0.08)]"
                  >
                    <p className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#f0ede8] leading-none">
                      {stat.value}
                    </p>
                    <p className="text-base sm:text-lg text-[#999]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

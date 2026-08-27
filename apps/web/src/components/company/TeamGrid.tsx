"use client";

import { useState } from "react";
import { Container } from "@gytev/ui";

type TeamMember = {
  name: string;
  role: string;
  image?: string | null;
};

type TeamGridProps = {
  team: TeamMember[];
  heading: string;
  description: string;
};

function FounderCard({ member }: { member: TeamMember }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-10 border-neutral-200 border-b border-r dark:border-neutral-800">
      <div
        className="relative overflow-hidden group bg-neutral-100 dark:bg-neutral-900"
        style={{ aspectRatio: "1494 / 1344" }}
      >
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 font-mono text-xs uppercase tracking-widest border border-dashed border-neutral-300 dark:border-neutral-700">
            <span className="mb-2 opacity-50">Photo</span>
            <span className="text-neutral-600 dark:text-neutral-300 font-sans font-medium capitalize text-sm">
              {member.name}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
          {member.name}
        </h3>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mt-1">
          {member.role.replace(/\.+$/, "")}.
        </p>
      </div>
    </div>
  );
}

export function TeamGrid({ team, heading, description }: TeamGridProps) {
  return (
    <section className="py-24 bg-[#0a0a0b]">
      <Container>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-[#f0ede8] sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[#999]">
            {description}
          </p>
        </div>

        <div className="border-[rgba(255,255,255,0.08)] border-l border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <FounderCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

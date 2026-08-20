import { Container } from "@gytev/ui";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string | null;
};

type TeamGridProps = {
  team: TeamMember[];
  heading: string;
  description: string;
};

export function TeamGrid({ team, heading, description }: TeamGridProps) {
  return (
    <section className="py-24 bg-[var(--paper)]">
      <Container>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-lg text-zinc-600">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {team.map((member) => (
            <div key={member.name} className="group cursor-pointer">
              {/* Conteneur Photo - Ratio 3:4 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e9e7e1] mb-6 transition-transform duration-500 group-hover:-translate-y-1">
                {member.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.image} alt={member.name} className="object-cover w-full h-full grayscale mix-blend-multiply" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 font-mono text-xs uppercase tracking-widest border border-dashed border-zinc-300">
                    <span className="mb-2 opacity-50">Photo Placeholder</span>
                    <span className="text-[var(--ink)] font-sans font-medium capitalize">{member.name}</span>
                  </div>
                )}
                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Infos */}
              <h3 className="text-lg font-semibold text-[var(--ink)]">{member.name}</h3>
              <p className="text-sm font-medium text-[var(--color-signal-500)] mt-1">{member.role}</p>
              <p className="text-sm text-zinc-600 mt-3 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

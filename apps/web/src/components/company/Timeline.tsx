import { Container } from "@gytev/ui";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: string;
};

type TimelineProps = {
  milestones: Milestone[];
  title?: string;
};

export function Timeline({ milestones, title = "Notre trajectoire" }: TimelineProps) {
  return (
    <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--line)] overflow-hidden">
      <Container>
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl">
            {title}
          </h2>
        </div>
        
        {/* Horizontal scroll container on mobile, flex row on desktop */}
        <div className="relative">
          {/* Ligne continue centrale (Desktop uniquement) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-[var(--line)] -translate-y-1/2 hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-0 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {milestones.map((item, idx) => (
              <div key={item.year} className="relative flex-1 min-w-[280px] sm:min-w-[320px] shrink-0 snap-start flex flex-col md:items-center">
                
                {/* Espace Haut */}
                <div className="md:h-[180px] flex flex-col justify-end pb-8">
                  {idx % 2 === 0 ? (
                    <div className="text-left md:text-center px-4">
                      <span className="text-[var(--color-signal-500)] font-mono text-sm tracking-widest font-semibold">{item.year}</span>
                      <h3 className="mt-2 text-xl font-medium text-[var(--ink)]">{item.title}</h3>
                      <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                    </div>
                  ) : <div className="hidden md:block h-full"></div>}
                </div>

                {/* Node central */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border border-[var(--line)] bg-[var(--color-surface)] shadow-sm text-lg my-4 md:my-0 transition-transform hover:scale-110 hover:border-[var(--color-signal-500)]">
                  {item.icon}
                </div>

                {/* Ligne verticale de connexion mobile (cachée sur desktop) */}
                {idx !== milestones.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-[var(--line)] md:hidden"></div>
                )}

                {/* Espace Bas */}
                <div className="md:h-[180px] flex flex-col justify-start pt-8 pl-12 md:pl-0">
                  {idx % 2 !== 0 ? (
                    <div className="text-left md:text-center px-4">
                      <span className="text-[var(--color-signal-500)] font-mono text-sm tracking-widest font-semibold">{item.year}</span>
                      <h3 className="mt-2 text-xl font-medium text-[var(--ink)]">{item.title}</h3>
                      <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                    </div>
                  ) : <div className="hidden md:block h-full"></div>}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

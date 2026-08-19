import { Container } from "@gytev/ui";

type CompanyHeroProps = {
  kicker: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function CompanyHero({ kicker, title, description, children }: CompanyHeroProps) {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-[var(--line)] bg-[var(--color-surface)]">
      <Container>
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
              {kicker}
            </p>
          </div>

          <h1
            className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-7xl"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>

          {description && (
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-600">
              {description}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

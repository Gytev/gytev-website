import { Container } from "@gytev/ui";

type SectionIntroProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function SectionIntro({ title, description, children }: SectionIntroProps) {
  return (
    <section className="py-24 bg-[var(--paper)]">
      <Container>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-zinc-600">{description}</p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}

import { Container } from "@gytev/ui";

type SectionPageProps = {
  kicker?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function SectionPage({ kicker, title, description, children }: SectionPageProps) {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50">
        <Container className="py-24 text-center sm:py-28">
          {kicker ? (
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              {kicker}
            </p>
          ) : null}
          <h1 className="text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            {description}
          </p>
        </Container>
      </section>
      {children ? <Container className="py-16">{children}</Container> : null}
    </>
  );
}

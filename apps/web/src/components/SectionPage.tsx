import { Container } from "@gytev/ui";

type SectionPageProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function SectionPage({ title, description, children }: SectionPageProps) {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50">
        <Container className="py-20 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            {description}
          </p>
        </Container>
      </section>
      {children ? <Container className="py-16">{children}</Container> : null}
    </>
  );
}

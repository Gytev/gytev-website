import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "redq");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RedQPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;
  const solution = dict.solution;

  const pillars = dict.pages.redq.pillars;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-red-600">
            {solution.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-zinc-900">
            {solution.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{solution.description}</p>
          <div className="mt-10">
            <a
              href={localizedHref(l, "/company/contact")}
              className="rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-500"
            >
              {dict.pages.redq.contactUs}
            </a>          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-zinc-200 p-8">
                <h2 className="text-lg font-semibold text-zinc-900">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

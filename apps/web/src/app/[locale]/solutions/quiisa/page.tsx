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
  return buildPageMetadata(locale, "quiisa");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function QuiisaPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;
  const solution = dict.solution;
  const quiisa = dict.pages.quiisa;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-600">
            {solution.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-zinc-900">
            Quiisa
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{solution.quiisa.description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={localizedHref(l, "/company/contact")}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500"
            >
              {quiisa.startFree}
            </a>
            <a
              href={localizedHref(l, "/company/contact")}
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              {quiisa.watchDemo}
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {quiisa.featuresHeading}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
              {quiisa.featuresDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quiisa.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-zinc-200 p-8">
                <h3 className="text-lg font-semibold text-zinc-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
                {quiisa.builtForAfrica}
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-zinc-600">
                {quiisa.africaDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {quiisa.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10">
              <div className="flex h-full min-h-[240px] items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <span className="text-sm font-medium uppercase tracking-widest">
                  Quiisa — Project Management
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

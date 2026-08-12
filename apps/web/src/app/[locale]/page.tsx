import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <h1 className="max-w-4xl text-4xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            {dict.hero.title}{" "}
            <span className="text-zinc-400">{dict.hero.highlight}</span>
          </h1>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex min-h-[420px] flex-col justify-between rounded-2xl border border-zinc-200 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 text-white">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest">{dict.hero.eyebrow}</p>
                <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
                  {dict.hero.description}
                </h2>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={localizedHref(l, "/products/rio")}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
                >
                  {dict.hero.ctaPrimary}
                </a>
                <a
                  href={localizedHref(l, "/company/vision")}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  {dict.hero.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="flex min-h-[420px] flex-col rounded-2xl border border-zinc-200 bg-white p-8">
              <h2 className="text-lg font-semibold text-zinc-900">The intelligence loop</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Every Gytev system follows the same loop: sense, understand, predict,
                optimize, decide, act, learn.
              </p>
              <div className="mt-8 flex flex-1 flex-col justify-center gap-3">
                {[
                  "Observe — sensors perceive the field",
                  "Understand — AI explains what is happening",
                  "Predict — risks are forecast days ahead",
                  "Act — clear recommendations",
                  "Learn — every outcome improves the model",
                ].map((step) => (
                  <div key={step} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    <p className="text-sm text-zinc-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-900 py-24">
        <Container>
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {dict.centralQuestion.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-zinc-400">
            {dict.centralQuestion.description}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {dict.centralQuestion.nodes.map((node) => (
              <div key={node.title} className="rounded-2xl border border-zinc-700 p-6 text-center">
                <p className="text-sm font-medium text-zinc-200">{node.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={localizedHref(l, "/company/vision")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
            >
              {dict.centralQuestion.cta} <span aria-hidden>→</span>
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-orange-600">
              {dict.product.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">
              {dict.product.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">{dict.product.description}</p>
          </div>

          <div className="mt-16 space-y-24">
            {dict.product.features.map((feature) => (
              <div key={feature.title} className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-widest text-orange-600">
                    {feature.tagline}
                  </p>
                  <p className="mt-4 max-w-md text-base leading-7 text-zinc-600">
                    {feature.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
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
                  <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 text-zinc-300">
                    <span className="text-sm uppercase tracking-widest">Rio preview</span>
                    <div className="grid h-16 w-16 grid-cols-2 gap-1 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-orange-600 py-20">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-orange-100">
              {dict.cta.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {dict.cta.title}
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={localizedHref(l, "/products/rio")}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              {dict.cta.ctaPrimary} <span aria-hidden className="ml-1">→</span>
            </a>
            <a
              href={localizedHref(l, "/company/contact")}
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              {dict.cta.ctaSecondary} <span aria-hidden className="ml-1">→</span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

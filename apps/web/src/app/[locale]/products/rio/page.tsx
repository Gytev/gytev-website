import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RioPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;
  const product = dict.product;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-600">
            {product.eyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-zinc-900">
            {product.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{product.description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={localizedHref(l, "/company/contact")}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
            >
              {dict.pages.rio.contactSales}
            </a>
            <a
              href={localizedHref(l, "/developers")}
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              {dict.pages.rio.devDocs}
            </a>          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="space-y-24 py-20">
          {product.features.map((feature, index) => (
            <div key={feature.title} className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
                  {feature.title}
                </h2>
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
                <div className="flex h-full min-h-[240px] items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white">
                  <span className="text-sm font-medium uppercase tracking-widest">
                    Rio — {feature.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}

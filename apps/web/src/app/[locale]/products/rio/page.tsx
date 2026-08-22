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
  return buildPageMetadata(locale, "rio");
}

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
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {locale === "fr" ? "Un écosystème complet" : "A complete ecosystem"}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
              {locale === "fr"
                ? "Du financement à la mise en marché, Rio couvre chaque étape du cycle agricole."
                : "From financing to market access, Rio covers every step of the agricultural cycle."}
            </p>
          </div>

          <div className="space-y-24">
            {product.features.map((feature, index) => (
              <div key={feature.title} className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
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
                  <div className="flex h-full min-h-[240px] items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white">
                    <span className="text-sm font-medium uppercase tracking-widest">
                      Rio — {feature.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {locale === "fr" ? "Le cycle complet" : "The complete cycle"}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
              {locale === "fr"
                ? "Rio accompagne l'agriculteur de la pré-production à la post-production, avec l'intelligence artificielle comme fil conducteur."
                : "Rio supports the farmer from pre-production to post-production, with artificial intelligence as the common thread."}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: locale === "fr" ? "Accès" : "Access", desc: locale === "fr" ? "Financement et intrants" : "Financing and inputs" },
              { step: "2", title: "Box", desc: locale === "fr" ? "Production intelligente" : "Intelligent production" },
              { step: "3", title: "AI", desc: locale === "fr" ? "Analyse et prédiction" : "Analysis and prediction" },
              { step: "4", title: locale === "fr" ? "Connexion" : "Connect", desc: locale === "fr" ? "Marché et distribution" : "Market and distribution" },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

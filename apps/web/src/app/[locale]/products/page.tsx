import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);
  const l = locale as Locale;

  return (
    <SectionPage
      title={dict.pages.products.title}
      description={dict.pages.products.description}
    >
      <div className="grid grid-cols-1 gap-6">
        {content.products.map((product) => (
          <a
            key={product.slug}
            href={localizedHref(l, product.href)}
            className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 p-8 transition hover:border-orange-300 hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 group-hover:text-orange-600">
                {product.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-orange-600">{product.tagline}</p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                {product.description}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition group-hover:bg-orange-600">
              {dict.pages.products.cta} <span aria-hidden>→</span>
            </span>
          </a>
        ))}
      </div>
    </SectionPage>
  );
}

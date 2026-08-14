import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CustomersPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);

  return (
    <SectionPage
      title={dict.pages.customers.title}
      description={dict.pages.customers.description}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.customers.map((customer) => (
          <figure
            key={customer.slug}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 p-6"
          >
            <blockquote className="text-base leading-7 text-zinc-700">
              “{customer.quote}”
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-semibold text-zinc-900">{customer.name}</p>
              <p className="text-sm text-zinc-500">
                {customer.sector} · {customer.country}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionPage>
  );
}

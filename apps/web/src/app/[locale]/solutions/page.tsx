import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  const content = await getContent(locale);
  const l = locale as Locale;

  return (
    <SectionPage
      title="Solutions"
      description="Real-world systems that matter: agriculture and public health first."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.solutions.map((solution) => (
          <a
            key={solution.slug}
            href={localizedHref(l, solution.href)}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200 p-8 transition hover:border-orange-300 hover:shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-orange-600">
                {solution.name}
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">{solution.description}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orange-600">
              Learn more <span aria-hidden>→</span>
            </span>
          </a>
        ))}
      </div>
    </SectionPage>
  );
}

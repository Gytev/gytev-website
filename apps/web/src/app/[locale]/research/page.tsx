import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ResearchPage({ params }: Props) {
  const { locale } = await params;
  const content = await getContent(locale);
  const l = locale as Locale;

  return (
    <SectionPage
      title="Research"
      description="The science behind Gytev. We publish openly and build for everyone."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.research.map((topic) => (
          <a
            key={topic.slug}
            href={localizedHref(l, topic.href)}
            className="group flex flex-col rounded-2xl border border-zinc-200 p-6 transition hover:border-orange-300 hover:shadow-md"
          >
            <span className="inline-flex self-start rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600">
              {topic.status}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-orange-600">
              {topic.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{topic.summary}</p>
          </a>
        ))}
      </div>
    </SectionPage>
  );
}

import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DevelopersPage({ params }: Props) {
  const { locale } = await params;
  const content = await getContent(locale);
  const l = locale as Locale;

  return (
    <SectionPage
      title="Developers"
      description="Build on Gytev with clean APIs, official SDKs and real documentation."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {content.developerResources.map((resource) => (
          <a
            key={resource.slug}
            href={localizedHref(l, resource.href)}
            className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-orange-300 hover:shadow-md"
          >
            <span className="inline-flex rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs font-medium text-zinc-600">
              {resource.kind}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-orange-600">
              {resource.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{resource.description}</p>
          </a>
        ))}
      </div>
    </SectionPage>
  );
}

import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);
  const l = locale as Locale;
  const labels = dict.pages.companySections;

  const sections = [
    { slug: "about", title: labels.about, body: content.company.about },
    { slug: "vision", title: labels.vision, body: content.company.vision },
    { slug: "careers", title: labels.careers, body: content.company.careers },
    { slug: "contact", title: labels.contact, body: content.company.contact },
  ];

  return (
    <SectionPage
      title={dict.pages.company.title}
      description={dict.pages.company.description}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {sections.map((section) => (
          <a
            key={section.slug}
            href={localizedHref(l, `/company/${section.slug}`)}
            className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-orange-300 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-orange-600">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{section.body}</p>
          </a>
        ))}
      </div>
    </SectionPage>
  );
}

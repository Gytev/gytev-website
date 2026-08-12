import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  const content = await getContent(locale);
  const l = locale as Locale;

  const sections = [
    { slug: "about", title: "About", body: content.company.about },
    { slug: "vision", title: "Vision", body: content.company.vision },
    { slug: "story", title: "Our Story", body: content.company.story },
    { slug: "newsroom", title: "Newsroom", body: content.company.newsroom },
    { slug: "careers", title: "Careers", body: content.company.careers },
    { slug: "contact", title: "Contact", body: content.company.contact },
  ];

  return (
    <SectionPage
      title="Company"
      description="Who we are, where we're going, and why."
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

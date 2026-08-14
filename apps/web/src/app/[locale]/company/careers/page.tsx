import { Container } from "@gytev/ui";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  const [dict, content] = await Promise.all([getDictionary(locale), getContent(locale)]);
  const detail = dict.pages.companyDetail.careers;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-600">{detail.kicker}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {detail.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{content.company.careers}</p>
        </Container>
      </section>
    </>
  );
}

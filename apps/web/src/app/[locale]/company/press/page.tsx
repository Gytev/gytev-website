import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";
import { PressCard } from "@/components/company/PressCard";
import { Container } from "@gytev/ui";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const press = dict.pages.companyDetail.press;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={press.kicker}
        title={press.heroTitle}
        description={press.body}
      />

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {press.articles.map((article, idx) => (
              <PressCard
                key={idx}
                title={article.title}
                source={article.source}
                date={article.date}
                excerpt={article.excerpt}
                tag={article.tag}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

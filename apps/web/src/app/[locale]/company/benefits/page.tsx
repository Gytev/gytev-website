import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";
import { BenefitCard } from "@/components/company/BenefitCard";
import { Container } from "@gytev/ui";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BenefitsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const benefits = dict.pages.companyDetail.benefits;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={benefits.kicker}
        title={benefits.heroTitle}
        description={benefits.body}
      />

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.benefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";
import { TestimonialCard } from "@/components/company/TestimonialCard";
import { Container } from "@gytev/ui";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CustomersPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={locale === "fr" ? "Clients" : "Customers"}
        title={dict.pages.customers.title}
        description={dict.pages.customers.description}
      />

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {content.customers.map((customer) => (
              <TestimonialCard
                key={customer.slug}
                quote={customer.quote}
                name={customer.name}
                sector={customer.sector}
                country={customer.country}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

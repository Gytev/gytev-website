import { buildPageMetadata } from "@/lib/metadata";
import { getCustomers } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@gytev/types";
import { CompanyHero } from "@/components/company/CompanyHero";
import { TestimonialCard } from "@/components/company/TestimonialCard";
import { Container } from "@gytev/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "customers");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CustomersPage({ params }: Props) {
  const { locale } = await params;
  const [customers, dict] = await Promise.all([getCustomers(locale), getDictionary(locale)]);
  const l = locale as Locale;

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
            {customers.map((customer) => (
              <TestimonialCard
                key={customer.slug}
                slug={customer.slug}
                quote={customer.quote}
                name={customer.name}
                sector={customer.sector}
                country={customer.country}
                badge={customer.badge ?? undefined}
                metrics={customer.metrics ?? undefined}
                image={customer.image ?? undefined}
                locale={l}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

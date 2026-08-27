import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@gytev/ui";
import { getCustomers } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { localizedHref } from "@gytev/i18n";
import type { Locale } from "@gytev/types";
import { CompanyHero } from "@/components/company/CompanyHero";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const customers = await getCustomers(locale);
  const customer = customers.find((c) => c.slug === slug);
  if (!customer) return {};
  return {
    title: `${customer.name} — Gytev`,
    description: customer.overview ?? customer.quote,
  };
}

export default async function CustomerDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const [customers, dict] = await Promise.all([getCustomers(locale), getDictionary(locale)]);
  const customer = customers.find((c) => c.slug === slug);

  if (!customer) notFound();

  const l = locale as Locale;
  const otherCustomers = customers.filter((c) => c.slug !== slug);

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={customer.sector}
        title={customer.name}
        description={customer.country}
      />

      {/* Hero image */}
      {customer.image && (
        <div className="border-b border-[var(--line)]">
          <div className="max-h-[480px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customer.image}
              alt={customer.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Metrics bar */}
      {customer.metrics && customer.metrics.length > 0 && (
        <section className="border-b border-[var(--line)] bg-[var(--color-surface)]">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--line)]">
              {customer.metrics.map((m) => (
                <div key={m.label} className="py-10 px-6 text-center">
                  <p className="text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--color-signal-500)]">
                    {m.value}
                  </p>
                  <p className="mt-2 text-sm text-[#aaa] font-medium">{m.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Overview */}
      {customer.overview && (
        <section className="py-16 lg:py-24">
          <Container>
            <div className="max-w-3xl">
              <p className="text-lg leading-relaxed text-[#ccc]">{customer.overview}</p>
            </div>
          </Container>
        </section>
      )}

      {/* Challenge / Solution / Results */}
      {(customer.challenge || customer.solution || customer.results) && (
        <section className="py-16 lg:py-24 bg-[var(--color-surface)] border-y border-[var(--line)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {customer.challenge && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-[#888] mb-4">
                    {dict.pages.customers.title === "Clients" ? "Le défi" : "The Challenge"}
                  </h3>
                  <p className="text-base leading-relaxed text-[#ccc]">{customer.challenge}</p>
                </div>
              )}
              {customer.solution && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-[#888] mb-4">
                    {dict.pages.customers.title === "Clients" ? "La solution" : "The Solution"}
                  </h3>
                  <p className="text-base leading-relaxed text-[#ccc]">{customer.solution}</p>
                </div>
              )}
              {customer.results && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-[#888] mb-4">
                    {dict.pages.customers.title === "Clients" ? "Les résultats" : "The Results"}
                  </h3>
                  <p className="text-base leading-relaxed text-[#ccc]">{customer.results}</p>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      <section className="py-16 lg:py-24">
        <Container>
          <blockquote className="max-w-3xl">
            <p className="text-xl lg:text-2xl leading-relaxed text-white font-medium">
              &ldquo;{customer.quote}&rdquo;
            </p>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#222] flex items-center justify-center text-[#aaa] font-semibold text-lg">
                {customer.quoteAuthor ? customer.quoteAuthor.charAt(0) : customer.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {customer.quoteAuthor ?? customer.name}
                </p>
                {customer.quoteRole && (
                  <p className="text-sm text-[#888]">{customer.quoteRole}</p>
                )}
              </div>
            </figcaption>
          </blockquote>
        </Container>
      </section>

      {/* Other customers */}
      {otherCustomers.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-[var(--line)] bg-[var(--color-surface)]">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight mb-10">
              {dict.pages.customers.title === "Clients" ? "Autres clients" : "More customers"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCustomers.map((c) => (
                <a
                  key={c.slug}
                  href={localizedHref(l, `/customers/${c.slug}`)}
                  className="group block border border-[var(--line)] rounded-xl p-6 bg-[#141416] hover:border-[var(--color-signal-500)] hover:shadow-lg transition-all"
                >
                  <p className="text-sm font-medium text-[#999] mb-1">{c.sector}</p>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[var(--color-signal-500)] transition-colors">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-sm text-[#bbb] line-clamp-2">{c.quote}</p>
                  <p className="mt-4 text-sm font-medium text-[var(--color-signal-500)]">
                    {dict.pages.customers.title === "Clients" ? "Lire l'histoire" : "Read the story"} →
                  </p>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[var(--color-ink-950)] text-white text-center">
        <Container>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {dict.pages.customers.title === "Clients"
              ? "Prêt à transformer votre organisation ?"
              : "Ready to transform your organization?"}
          </h2>
          <p className="mt-6 text-[#888] max-w-xl mx-auto text-lg">
            {dict.pages.customers.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={localizedHref(l, "/company/contact")} className="button button--light">
              {dict.pages.customers.title === "Clients" ? "Parlons-en" : "Let's talk"}
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}

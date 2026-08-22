import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";
import { RoleCard } from "@/components/company/RoleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "careers");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const detail = dict.pages.companyDetail.careers;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={detail.kicker}
        title={detail.heroTitle}
        description={detail.body}
      />

      {/* VALUES SECTION */}
      <section className="py-24 bg-[var(--color-surface)] border-b border-[var(--line)]">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {detail.valuesHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
            {detail.values.map((value, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-surface)] p-10 lg:p-12 hover:bg-[var(--color-primary-50)] transition-colors"
              >
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-signal-500)] mb-6 block">
                  0{idx + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* OPEN ROLES SECTION */}
      <section className="py-24 bg-[var(--paper)]">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {detail.rolesHeading}
            </h2>
          </div>

          <div className="max-w-4xl space-y-16">
            {detail.departments.length === 0 ? (
              <p className="text-lg text-zinc-500">{detail.rolesEmpty}</p>
            ) : (
              detail.departments.map((dept, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold mb-8 text-[var(--ink)] pb-4 border-b border-[var(--line)]">
                    {dept.name}
                  </h3>
                  <div className="space-y-4">
                    {dept.openings.map((role, rIdx) => (
                      <RoleCard
                        key={rIdx}
                        title={role.title}
                        location={role.location}
                        type={role.type}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}

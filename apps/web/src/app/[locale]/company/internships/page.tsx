import { buildPageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";
import { RoleCard } from "@/components/company/RoleCard";
import { Container } from "@gytev/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "internships");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function InternshipsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const internships = dict.pages.companyDetail.internships;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={internships.kicker}
        title={internships.heroTitle}
        description={internships.body}
      />

      <section className="py-24">
        <Container>
          <div className="max-w-4xl space-y-16">
            {internships.departments.map((dept, idx) => (
              <div key={idx}>
                <h2 className="text-xl font-semibold mb-8 text-[var(--ink)] pb-4 border-b border-[var(--line)]">
                  {dept.name}
                </h2>
                <div className="space-y-4">
                  {dept.openings.map((role, rIdx) => (
                    <div key={rIdx} className="group">
                      <RoleCard
                        title={role.title}
                        location={role.location}
                        type={role.type}
                      />
                      {role.description && (
                        <p className="mt-3 ml-6 text-sm text-zinc-500 leading-relaxed">
                          {role.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

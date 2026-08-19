import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const detail = dict.pages.companyDetail.careers;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-[var(--line)] bg-[var(--color-surface)]">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                {detail.kicker}
              </p>
            </div>
            
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-7xl" style={{ textWrap: 'balance' }}>
              {detail.heroTitle}
            </h1>
            
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-600">
              {detail.body}
            </p>
          </div>
        </Container>
      </section>

      {/* VALUES SECTION - Bento Grid Style */}
      <section className="py-24 bg-[var(--color-surface)] border-b border-[var(--line)]">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{detail.valuesHeading}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
            {detail.values.map((value, idx) => (
              <div key={idx} className="bg-[var(--color-surface)] p-10 lg:p-12 hover:bg-[var(--color-primary-50)] transition-colors">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-signal-500)] mb-6 block">0{idx + 1}</span>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-zinc-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* OPEN ROLES SECTION */}
      <section className="py-24 bg-[var(--paper)]">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{detail.rolesHeading}</h2>
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
                      <a
                        key={rIdx}
                        href="mailto:jobs@gytev.com"
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[var(--color-surface)] border border-[var(--line)] hover:border-[var(--color-signal-500)] transition-colors"
                      >
                        <div>
                          <h4 className="text-lg font-medium group-hover:text-[var(--color-signal-600)] transition-colors">
                            {role.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                            <span>{role.location}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                            <span>{role.type}</span>
                          </div>
                        </div>
                        <span className="mt-4 sm:mt-0 text-sm font-medium text-[var(--ink)] group-hover:text-[var(--color-signal-600)] transition-colors flex items-center gap-2">
                          Apply <span aria-hidden>→</span>
                        </span>
                      </a>
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

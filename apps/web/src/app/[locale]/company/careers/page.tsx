import { buildPageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";
import { TeamsSection } from "@/components/company/careers/TeamsSection";
import { CultureSection } from "@/components/company/careers/CultureSection";
import { ValuesSection } from "@/components/company/careers/ValuesSection";
import { BenefitsTabs } from "@/components/company/careers/BenefitsTabs";
import { InterviewProcess } from "@/components/company/careers/InterviewProcess";
import { LookForSection } from "@/components/company/careers/LookForSection";
import { OpenRoles } from "@/components/company/careers/OpenRoles";
import { getJobs } from "@/lib/content";

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
  const d = dict.pages.companyDetail.careers;
  const apiDepartments = await getJobs(locale);
  const departments = apiDepartments ?? d.departments ?? [];

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-[#f0ede8]">
      {/* 1. Hero */}
      <CompanyHero
        kicker=""
        title={d.heroTitle}
        description={d.body}
      >
        <a
          href="#roles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0ede8] text-[#0a0a0b] text-sm font-normal rounded-full hover:bg-white transition-colors mt-8"
        >
          {d.ctaLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </CompanyHero>

      {/* 2. Discover Our Teams */}
      <TeamsSection
        heading={d.teamsHeading}
        description={d.teamsDescription}
        teams={d.teams}
        stats={d.stats}
      />

      {/* 3. Our Culture */}
      <CultureSection
        heading={d.cultureHeading}
        description={d.cultureDescription}
        image={d.cultureImage}
      />

      {/* 4. Our Values */}
      <ValuesSection
        heading={d.valuesHeading}
        values={d.values}
      />

      {/* 5. Benefits */}
      <BenefitsTabs
        heading={d.benefitsHeading}
        description={d.benefitsDescription}
        tabs={d.benefitTabs}
      />

      {/* 6. Interview Process */}
      <InterviewProcess
        heading={d.interviewHeading}
        description={d.interviewDescription}
        tabs={d.interviewTabs}
      />

      {/* 7. What We Look For */}
      <LookForSection
        heading={d.lookForHeading}
        items={d.lookFor}
      />

      {/* 8. Open Roles */}
      <OpenRoles
        heading={d.rolesHeading}
        description={d.rolesDescription}
        emptyText={d.rolesEmpty}
        departments={departments}
        applyForm={d.applyForm}
      />
    </main>
  );
}

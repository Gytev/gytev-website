import type { Locale } from "@gytev/types";
import { HomeExperience } from "@/components/home/HomeExperience";
import { getPartners, getCustomers } from "@/lib/content";
import { generateStaticParams, getDictionary } from "@/lib/i18n";

export { generateStaticParams };

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const [dict, customers, apiPartners] = await Promise.all([
    getDictionary(locale),
    getCustomers(locale),
    getPartners(locale),
  ]);

  return (
    <HomeExperience
      dict={dict}
      locale={locale as Locale}
      customers={customers}
      partners={apiPartners ?? []}
    />
  );
}

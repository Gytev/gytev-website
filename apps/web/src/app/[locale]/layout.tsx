import type { Metadata } from "next";
import type { Locale } from "@gytev/i18n";
import { generateStaticParams } from "@/lib/i18n";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { getDictionary } from "@/lib/i18n";

export { generateStaticParams };

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar locale={l} dictionary={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={l} dictionary={dict} />
    </div>
  );
}

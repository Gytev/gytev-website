import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const detail = dict.pages.companyDetail.contact;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-600">{detail.kicker}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {detail.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{detail.note}</p>
          <div className="mt-10">
            <a
              href={`mailto:hello@gytev.com`}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              {detail.cta} <span aria-hidden>→</span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

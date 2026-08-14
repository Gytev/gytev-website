import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function VisionPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const l = locale as Locale;

  const vision = dict.pages.vision;
  const loop = vision.loop;

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container className="py-20">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {vision.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{dict.hero.description}</p>
          <div className="mt-10">
            <a
              href={localizedHref(l, "/products/rio")}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
            >
              {vision.discover} <span aria-hidden>→</span>
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-600">
            {vision.eyebrow}
          </p>
          <div className="mt-12 space-y-4">
            {loop.map((item, index) => (
              <div key={item.step} className="flex items-start gap-6 rounded-2xl border border-zinc-200 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">{item.step}</h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

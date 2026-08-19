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
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO SECTION - Deeptech focus */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-[var(--line)] bg-[var(--color-surface)] overflow-hidden">
        {/* Subtle grid background for the "tech/engineering" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
              <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-signal-600)]">
                {vision.eyebrow}
              </p>
            </div>
            
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-7xl" style={{ textWrap: 'balance' }}>
              {vision.heading}
            </h1>
            
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-600">
              {vision.subtitle}
            </p>
            
            <div className="mt-12 flex items-center gap-4">
              <a
                href={localizedHref(l, "/research")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--ink)] px-8 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
              >
                {vision.discover}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* THESIS SECTION - Editorial Essay Style */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 sticky top-32">
                {vision.thesis.title}
              </h2>
            </div>
            <div className="lg:col-span-8 prose prose-lg prose-zinc max-w-none text-zinc-700">
              {vision.thesis.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "text-2xl md:text-3xl leading-snug font-medium text-[var(--ink)] mb-10" : "mb-8"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ARCHITECTURE STACK - Engineering Layout */}
      <section className="py-24 border-y border-[var(--line)] bg-[var(--color-surface)]">
        <Container>
          <h2 className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl mb-16">
            {vision.architectureHeading}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vision.architecture.map((layer, idx) => (
              <div key={idx} className="group flex flex-col border border-[var(--line)] bg-[var(--paper)] p-8 transition-colors hover:bg-white">
                <h3 className="text-xl font-semibold text-[var(--ink)] mb-4">{layer.title}</h3>
                <p className="text-zinc-600 mb-8 flex-1">
                  {layer.description}
                </p>
                <ul className="space-y-3">
                  {layer.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-medium text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-signal-500)]"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* THE LOOP - Systematic Flow */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl">
              {vision.loopHeading}
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              {vision.loopDescription}
            </p>
          </div>

          <div className="relative">
            {/* Ligne verticale de connexion */}
            <div className="absolute left-6 md:left-[3.5rem] top-0 bottom-0 w-px bg-[var(--line)]"></div>
            
            <div className="space-y-12">
              {loop.map((item, index) => (
                <div key={item.step} className="relative flex items-start gap-6 md:gap-12 group">
                  {/* Pastille Node */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--line)] text-sm font-semibold text-[var(--ink)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--color-signal-500)] md:h-28 md:w-28 md:text-xl">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="pt-2 md:pt-8 flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--ink)] group-hover:text-[var(--color-signal-600)] transition-colors">
                      {item.step}
                    </h3>
                    <p className="mt-2 text-base md:text-lg leading-relaxed text-zinc-600 max-w-2xl">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

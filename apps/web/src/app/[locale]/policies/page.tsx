import { Container } from "@gytev/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getPoliciesContent } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, "policies");
}

export default async function PoliciesPage({ params }: Props) {
  const { locale } = await params;
  const content = getPoliciesContent(locale);
  const fr = locale === "fr";

  return (
    <main className="min-h-screen bg-black text-[#a0a0a0]">
      <div className="px-6 md:px-8 pt-24 md:pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white text-balance scroll-mt-24">
              {fr ? "Conditions et politiques" : "Terms & policies"}
            </h1>

            <div className="mt-16 space-y-16">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                  {fr ? "Juridique" : "Legal"}
                </h2>
                <ul className="space-y-4">
                  {content.legal.map((item) => (
                    <li key={item.title}>
                      <a href={item.href} className="group block underline decoration-[#666] underline-offset-2 hover:decoration-[#999] transition-colors">
                        <h3 className="text-[15px] font-normal text-white group-hover:text-[#ccc] transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[14px] text-[#a0a0a0]">
                          {item.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                  {fr ? "Politiques" : "Policies"}
                </h2>
                <ul className="space-y-4">
                  {content.policies.map((item) => (
                    <li key={item.title}>
                      <a href={item.href} className="group block underline decoration-[#666] underline-offset-2 hover:decoration-[#999] transition-colors">
                        <h3 className="text-[15px] font-normal text-white group-hover:text-[#ccc] transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[14px] text-[#a0a0a0]">
                          {item.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}

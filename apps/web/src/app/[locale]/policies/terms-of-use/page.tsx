import { Container } from "@gytev/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getTermsContent } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, "terms");
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const terms = await getTermsContent(locale);

  if (!terms) return null;

  const dateLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <main className="min-h-screen bg-black text-[#a0a0a0]">
      <div className="px-6 md:px-8 pt-24 md:pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white text-balance scroll-mt-24">
              {terms.title}
            </h1>
            {terms.published_at && (
              <p className="mt-4 text-[13px] text-[#a0a0a0] font-semibold">
                Published {new Date(terms.published_at).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            <div className="mt-16 space-y-16">
              {terms.intro_heading && (
                <p className="text-[15px] leading-[1.7] mb-6 font-semibold">
                  {terms.intro_heading}
                </p>
              )}
              {terms.intro_content && (
                <p className="text-[15px] leading-[1.7] mb-6 font-semibold last:mb-0">
                  {terms.intro_content}
                </p>
              )}

              {terms.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 scroll-mt-24">
                    {section.title}
                  </h2>
                  <div
                    className="legal-content
                      [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:mb-6 [&_p]:font-semibold [&_p]:last:mb-0
                      [&_ul]:mb-8 [&_ul]:marker:text-inherit [&_ul]:last:mb-0
                      [&_ul]:in-[:where(ul,ol)]:mt-2 [&_ul]:list-disc [&_ul]:in-[:where(ul,ol)]:list-[circle]
                      [&_ul]:mx-3 [&_ul]:ps-4
                      [&_li]:text-[15px] [&_li]:leading-[1.7] [&_li]:mb-2
                      [&_.legal-bold]:text-[13px] [&_.legal-bold]:font-semibold [&_.legal-bold]:uppercase [&_.legal-bold]:tracking-wide [&_.legal-bold]:text-[#888] [&_.legal-bold]:leading-[1.7] [&_.legal-bold]:mb-6
                      [&_.legal-address]:text-[15px] [&_.legal-address]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}

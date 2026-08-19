import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { CompanyHero } from "@/components/company/CompanyHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);
  const l = locale as Locale;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CompanyHero
        kicker={locale === "fr" ? "Blog" : "Blog"}
        title={dict.pages.blog.title}
        description={dict.pages.blog.description}
      />

      <section className="py-24">
        <div className="mx-auto max-w-[1152px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {content.blog.map((post) => (
              <a
                key={post.slug}
                href={localizedHref(l, `/blog/${post.slug}`)}
                className="group flex flex-col border border-[var(--line)] bg-[var(--color-surface)] p-8 transition-all hover:border-[var(--color-signal-500)] hover:shadow-lg hover:shadow-black/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-xs font-medium text-[var(--color-signal-600)]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-sm text-zinc-400">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--color-signal-600)] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-500">{post.author}</p>
                  <span className="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--color-signal-600)] transition-colors flex items-center gap-2">
                    {locale === "fr" ? "Lire" : "Read"} <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

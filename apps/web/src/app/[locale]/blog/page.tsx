import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { SectionPage } from "@/components/SectionPage";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const [content, dict] = await Promise.all([getContent(locale), getDictionary(locale)]);
  const l = locale as Locale;

  return (
    <SectionPage
      title={dict.pages.blog.title}
      description={dict.pages.blog.description}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.blog.map((post) => (
          <a
            key={post.slug}
            href={localizedHref(l, `/blog/${post.slug}`)}
            className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-orange-300 hover:shadow-md"
          >
            <p className="text-sm text-zinc-500">{post.date}</p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-900 group-hover:text-orange-600">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{post.excerpt}</p>
            <p className="mt-4 text-sm font-medium text-zinc-500">{post.author}</p>
          </a>
        ))}
      </div>
    </SectionPage>
  );
}

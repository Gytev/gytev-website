import { buildPageMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { NewsIndex } from "@/components/company/blog/NewsIndex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "blog");
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const [posts, dict] = await Promise.all([
    getBlogPosts(locale),
    getDictionary(locale),
  ]);
  const fr = locale === "fr";

  return (
    <NewsIndex
      posts={posts}
      locale={locale}
      labels={{
        eyebrow: fr ? "Blog" : "Blog",
        title: fr ? "Les dernières actualités de Gytev." : "Latest updates from Gytev.",
        filterBy: fr ? "Filtrer par catégorie" : "Filter by category",
        articlesCount: fr ? "articles" : "articles",
        searchPlaceholder: fr ? "Rechercher un article…" : "Find an article about…",
        empty: fr
          ? "Aucun article ne correspond à votre recherche."
          : "No articles match your search.",
        readMore: fr ? "Lire" : "Read",
      }}
    />
  );
}

import { buildPageMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/content";
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
  const posts = await getBlogPosts(locale);
  const fr = locale === "fr";

  return (
    <NewsIndex
      posts={posts}
      locale={locale}
      labels={{
        eyebrow: "",
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

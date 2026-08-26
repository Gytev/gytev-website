"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import type { BlogPostCard } from "@/lib/content";

const CATEGORY_COLORS: Record<string, string> = {
  company: "#f59e0b",
  solutions: "#0082e6",
  engineering: "#ff5229",
  research: "#44ba82",
  product: "#ff92dc",
};

const PER_PAGE = 9;

type Props = {
  posts: BlogPostCard[];
  locale: string;
  labels: {
    eyebrow: string;
    title: string;
    filterBy: string;
    articlesCount: string;
    searchPlaceholder: string;
    empty: string;
    readMore: string;
  };
};

function categoryColor(tag: string) {
  return CATEGORY_COLORS[tag.trim().toLowerCase()] ?? "#c45824";
}

function ArrowSquare() {
  return (
    <div className="w-13 shrink-0 aspect-square relative flex justify-center items-center overflow-hidden">
      <span className="absolute transition-transform duration-300 -translate-x-10 group-hover/news:translate-x-10">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </span>
      <span className="absolute transition-transform duration-300 -translate-x-10 group-hover/news:translate-x-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </span>
    </div>
  );
}

function PostImage({ post, big }: { post: BlogPostCard; big?: boolean }) {
  if (post.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className={`w-full object-cover ${big ? "h-50 lg:h-70" : "h-50 lg:h-60"}`}
      />
    );
  }
  const hue = [...post.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className={`w-full flex items-end p-5 ${big ? "h-50 lg:h-70" : "h-50 lg:h-60"}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 45% 88%), hsl(${(hue + 40) % 360} 55% 72%))`,
      }}
    >
      <span className="text-6xl font-medium text-white/80 select-none">
        {post.title.charAt(0)}
      </span>
    </div>
  );
}

export function NewsIndex({ posts, locale, labels }: Props) {
  const hrefFor = (slug: string) => localizedHref(locale as Locale, `/blog/${slug}`);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Map<string, number>();
    for (const p of posts) {
      for (const t of p.tags) {
        const key = t.trim();
        set.set(key.toLowerCase(), (set.get(key.toLowerCase()) ?? 0) + 1);
        if (key !== key.toLowerCase()) set.set(key, set.get(key) ?? 0);
      }
    }
    return [...new Set(posts.flatMap((p) => p.tags).map((t) => t.trim()))].slice(0, 8);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = posts.filter((p) => {
      const catOk =
        selected.length === 0 ||
        p.tags.some((t) => selected.includes(t.trim().toLowerCase()));
      const qOk =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      return catOk && qOk;
    });
    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
  }, [posts, selected, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );
  const featuredInPage = pageItems.find((p) => p.featured);
  const rest = featuredInPage
    ? pageItems.filter((p) => p !== featuredInPage)
    : pageItems;

  function toggleCategory(raw: string) {
    const key = raw.toLowerCase();
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero band */}
      <section className="border-b border-neutral-200">
        <div className="border-x border-neutral-200 px-4 py-14 md:px-10 md:py-20 flex flex-col gap-4 lg:gap-6">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            {labels.eyebrow}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {labels.title}
          </h1>
        </div>
      </section>

      {/* Filter bar */}
      <div className="border-b border-neutral-200">
        <div className="gap-4 flex flex-col lg:flex-row justify-between items-start lg:items-center p-5 md:p-10 border-x border-neutral-200">
          <div className="flex flex-wrap gap-3 items-center">
            <p className="text-sm text-neutral-500">{labels.filterBy}</p>
            <ul className="flex flex-wrap gap-1.5 items-center">
              {categories.map((cat) => {
                const active = selected.includes(cat.toLowerCase());
                const color = categoryColor(cat);
                return (
                  <li key={cat}>
                    <label
                      className="flex items-center cursor-pointer px-2.5 py-1 rounded-sm border transition-colors"
                      style={
                        active
                          ? { backgroundColor: color, borderColor: color, color: "#111" }
                          : { backgroundColor: "#fafafa", borderColor: "#e5e5e5" }
                      }
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleCategory(cat)}
                        className="sr-only"
                      />
                      <span className="text-[11px] font-mono uppercase select-none">
                        {cat}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className="text-sm text-neutral-400 shrink-0 md:min-w-18">
              {filtered.length} {labels.articlesCount}
            </p>
          </div>

          <div className="flex items-stretch gap-2 w-full lg:w-auto">
            <div className="group/search border border-neutral-300 focus-within:border-neutral-900 p-1.5 w-full md:w-fit flex items-center gap-2 rounded-lg transition-colors">
              <svg className="w-4 h-4 ml-1.5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={labels.searchPlaceholder}
                className="focus:outline-none w-full md:w-64 bg-transparent text-sm placeholder-neutral-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 -mb-px border-l border-neutral-200">
        {pageItems.length === 0 && (
          <div className="lg:col-span-3 py-24 text-center text-neutral-500 border-b border-r border-neutral-200">
            {labels.empty}
          </div>
        )}

        {featuredInPage && (
          <article className="p-5 lg:p-10 bg-white border-b lg:border-r border-b-2 border-neutral-200 lg:col-span-2">
            <a
              href={hrefFor(featuredInPage.slug)}
              className="group/news border border-neutral-200 h-full flex flex-col lg:flex-row-reverse bg-white hover:bg-neutral-50 transition-colors"
            >
              <div className="lg:w-1/2 relative shrink-0 overflow-hidden bg-neutral-200">
                <PostImage post={featuredInPage} big />
              </div>
              <div className="w-full flex flex-col h-full lg:w-1/2">
                <div className="flex flex-col lg:h-full gap-4 p-6 border-t lg:border-t-0 lg:border-r border-neutral-200">
                  <div className="flex gap-1">
                    {featuredInPage.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        style={{ ["--cat" as string]: categoryColor(tag) }}
                        className="inline-block uppercase px-2 py-1 rounded bg-neutral-100 group-hover/news:bg-[var(--cat)] transition-colors"
                      >
                        <p className="text-[11px] font-mono uppercase">{tag}</p>
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                    {featuredInPage.title}
                  </h2>
                  <p className="text-neutral-600 line-clamp-3">{featuredInPage.excerpt}</p>
                </div>
                <footer className="shrink-0 divide-x divide-neutral-200 border-t border-neutral-200 flex mt-auto">
                  <div className="w-full px-3 py-4">
                    <p className="text-sm text-neutral-400">{featuredInPage.date}</p>
                  </div>
                  <div className="w-full px-3 py-4">
                    <p className="text-sm text-neutral-400 truncate">{featuredInPage.author}</p>
                  </div>
                  <ArrowSquare />
                </footer>
              </div>
            </a>
          </article>
        )}

        {rest.map((post) => (
          <article
            key={post.slug}
            className="p-5 lg:p-10 bg-white border-b lg:border-r border-neutral-200"
          >
            <a
              href={hrefFor(post.slug)}
              className="group/news border border-neutral-200 h-full flex flex-col bg-white hover:bg-neutral-50 transition-colors"
            >
              <div className="relative shrink-0 overflow-hidden bg-neutral-200">
                <PostImage post={post} />
              </div>
              <div className="w-full flex flex-col h-full">
                <div className="flex flex-col lg:h-full gap-4 p-6 border-t border-neutral-200">
                  <div className="flex gap-1">
                    {post.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        style={{ ["--cat" as string]: categoryColor(tag) }}
                        className="inline-block uppercase px-2 py-1 rounded bg-neutral-100 group-hover/news:bg-[var(--cat)] transition-colors"
                      >
                        <p className="text-[11px] font-mono uppercase">{tag}</p>
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight leading-snug">
                    {post.title}
                  </h2>
                </div>
                <footer className="shrink-0 divide-x divide-neutral-200 border-t border-neutral-200 flex mt-auto">
                  <div className="w-full px-3 py-4">
                    <p className="text-sm text-neutral-400">{post.date}</p>
                  </div>
                  <div className="w-full px-3 py-4">
                    <p className="text-sm text-neutral-400 truncate">{post.author}</p>
                  </div>
                  <ArrowSquare />
                </footer>
              </div>
            </a>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-10 border-t border-neutral-200">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-3 py-2 text-sm border border-neutral-300 rounded-md disabled:opacity-40 hover:border-neutral-900 transition-colors"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`size-9 text-sm border rounded-md transition-colors ${
                n === safePage
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-300 hover:border-neutral-900"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-3 py-2 text-sm border border-neutral-300 rounded-md disabled:opacity-40 hover:border-neutral-900 transition-colors"
          >
            →
          </button>
        </div>
      )}
      <span className="hidden">{locale}</span>
    </main>
  );
}

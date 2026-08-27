import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import type { CustomerMetric } from "@gytev/types";

type TestimonialCardProps = {
  slug: string;
  quote: string;
  name: string;
  sector: string;
  country: string;
  badge?: string;
  metrics?: CustomerMetric[];
  image?: string;
  locale: Locale;
};

function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-44 overflow-hidden rounded-t-2xl bg-[#1a1a1c]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export function TestimonialCard({
  slug,
  quote,
  name,
  sector,
  country,
  badge,
  metrics,
  image,
  locale,
}: TestimonialCardProps) {
  const href = localizedHref(locale, `/customers/${slug}`);

  return (
    <a
      href={href}
      className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--color-surface)] overflow-hidden transition-all hover:border-[var(--color-signal-500)] hover:shadow-lg hover:shadow-black/5"
    >
      {image && <CardImage src={image} alt={name} />}

      <div className="flex flex-col flex-1 p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badge && (
            <span className="inline-block text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[rgba(255,255,255,0.06)] text-[#aaa]">
              {badge}
            </span>
          )}
          <span className="inline-block text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[rgba(255,255,255,0.06)] text-[#aaa]">
            {country}
          </span>
        </div>

        {/* Quote */}
        <blockquote className="text-base leading-7 text-white flex-1">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Metrics preview */}
        {metrics && metrics.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[var(--line)] grid grid-cols-2 gap-4">
            {metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <p className="text-lg font-semibold text-[var(--color-signal-500)]">{m.value}</p>
                <p className="text-xs text-[#aaa] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-[#999] mt-0.5">{sector}</p>
          </div>
          <span className="text-sm font-medium text-[var(--color-signal-500)] opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </div>
      </div>
    </a>
  );
}

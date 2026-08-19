type TestimonialCardProps = {
  quote: string;
  name: string;
  sector: string;
  country: string;
};

export function TestimonialCard({ quote, name, sector, country }: TestimonialCardProps) {
  return (
    <figure className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--color-surface)] p-8 transition-all hover:border-[var(--color-signal-500)] hover:shadow-lg hover:shadow-black/5">
      <blockquote className="text-base leading-7 text-zinc-700">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 pt-6 border-t border-[var(--line)]">
        <p className="font-semibold text-[var(--ink)]">{name}</p>
        <p className="text-sm text-zinc-500 mt-1">
          {sector} &middot; {country}
        </p>
      </figcaption>
    </figure>
  );
}

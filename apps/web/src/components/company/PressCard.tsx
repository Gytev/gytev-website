type PressCardProps = {
  title: string;
  source: string;
  date: string;
  excerpt: string;
  tag: string;
};

export function PressCard({ title, source, date, excerpt, tag }: PressCardProps) {
  return (
    <article className="group flex flex-col border border-[var(--line)] bg-[var(--color-surface)] p-8 transition-all hover:border-[var(--color-signal-500)] hover:shadow-lg hover:shadow-black/5">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-xs font-medium text-[var(--color-signal-600)]">
          {tag}
        </span>
        <span className="text-sm text-zinc-400">{source}</span>
      </div>
      <h3 className="text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--color-signal-600)] transition-colors leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600 flex-1">{excerpt}</p>
      <p className="mt-6 text-sm text-zinc-400">{date}</p>
    </article>
  );
}

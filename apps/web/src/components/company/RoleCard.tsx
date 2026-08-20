type RoleCardProps = {
  title: string;
  location: string;
  type: string;
};

export function RoleCard({ title, location, type }: RoleCardProps) {
  return (
    <a
      href="mailto:jobs@gytev.com"
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[var(--color-surface)] border border-[var(--line)] hover:border-[var(--color-signal-500)] transition-colors"
    >
      <div>
        <h4 className="text-lg font-medium group-hover:text-[var(--color-signal-600)] transition-colors">
          {title}
        </h4>
        <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
          <span>{location}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
          <span>{type}</span>
        </div>
      </div>
      <span className="mt-4 sm:mt-0 text-sm font-medium text-[var(--ink)] group-hover:text-[var(--color-signal-600)] transition-colors flex items-center gap-2">
        Apply <span aria-hidden>&rarr;</span>
      </span>
    </a>
  );
}

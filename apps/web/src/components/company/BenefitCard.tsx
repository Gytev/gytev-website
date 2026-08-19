type BenefitCardProps = {
  title: string;
  description: string;
};

export function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <div className="group flex flex-col border border-[var(--line)] bg-[var(--color-surface)] p-8 transition-colors hover:bg-white hover:border-[var(--color-signal-500)]">
      <h3 className="text-xl font-semibold text-[var(--ink)] mb-3 group-hover:text-[var(--color-signal-600)] transition-colors">
        {title}
      </h3>
      <p className="text-zinc-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

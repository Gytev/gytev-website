type BenefitCardProps = {
  title: string;
  description: string;
};

export function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <div className="group flex flex-col border border-[var(--line)] bg-[#141416] p-8 transition-colors hover:bg-[#1a1a1c] hover:border-[var(--color-signal-500)]">
      <h3 className="text-xl font-semibold text-[var(--ink)] mb-3 group-hover:text-[var(--color-signal-600)] transition-colors">
        {title}
      </h3>
      <p className="text-[#999] leading-relaxed text-sm">{description}</p>
    </div>
  );
}

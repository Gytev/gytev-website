import { cx } from "@/lib/cn";

export const buttonPrimary =
  "inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-sm";

export const buttonGhost =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900";

export const buttonDanger =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700";

export function Wordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight text-zinc-900 ${className}`}>
      {"G⅄TƎV".split("").map((letter, index) => (
        <span
          key={index}
          className="logo-letter"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-orange-600">
          {eyebrow}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-zinc-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export type BadgeTone =
  | "published"
  | "in-progress"
  | "internal"
  | "locale"
  | "kind"
  | "neutral";

const badgeStyles: Record<BadgeTone, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "in-progress": "bg-amber-50 text-amber-700 border-amber-200",
  internal: "bg-zinc-100 text-zinc-600 border-zinc-200",
  locale: "bg-zinc-900 text-white border-zinc-900",
  kind: "bg-orange-50 text-orange-700 border-orange-200",
  neutral: "bg-zinc-50 text-zinc-600 border-zinc-200",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        badgeStyles[tone]
      )}
    >
      {children}
    </span>
  );
}

const entityTones: Record<string, string> = {
  products: "bg-orange-100 text-orange-700",
  solutions: "bg-emerald-100 text-emerald-700",
  research: "bg-blue-100 text-blue-700",
  developers: "bg-violet-100 text-violet-700",
  blog: "bg-amber-100 text-amber-700",
  customers: "bg-teal-100 text-teal-700",
  company: "bg-sky-100 text-sky-700",
  navigation: "bg-rose-100 text-rose-700",
};

export function EntityIcon({
  slug,
  label,
  className,
}: {
  slug: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
        entityTones[slug] ?? "bg-zinc-100 text-zinc-600",
        className
      )}
    >
      {label.slice(0, 1).toUpperCase()}
    </span>
  );
}

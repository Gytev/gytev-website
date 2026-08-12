import type { Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";

type MegaMenuProps = {
  locale: Locale;
  label: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  visual: { eyebrow: string; title: string; description: string; href: string };
};

export function MegaMenu({ locale, label, columns, visual }: MegaMenuProps) {
  return (
    <div className="absolute inset-x-0 top-full border-b border-zinc-200 bg-white shadow-lg shadow-zinc-900/5">
      <div className="grid w-full grid-cols-12 gap-8 px-6 py-10 lg:px-8">
        <div className="col-span-7 grid grid-cols-3 gap-x-8 gap-y-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-zinc-900">{column.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={localizedHref(locale, link.href)}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-5">
          <a
            href={localizedHref(locale, visual.href)}
            className="flex h-full min-h-40 flex-col rounded-xl bg-zinc-50 p-6 transition-colors hover:bg-zinc-100"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              {visual.eyebrow}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">{visual.title}</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-600">{visual.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-zinc-900">
              {label} <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

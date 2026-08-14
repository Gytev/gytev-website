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
    <div className="absolute inset-x-0 top-full border-t border-[#333] bg-black text-white">
      <div className="mx-auto grid min-h-[417px] max-w-[1280px] grid-cols-12 gap-10 px-10 py-12">
        <div className="col-span-8 grid grid-cols-3 gap-x-16 gap-y-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-medium text-[#b3b3b3]">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={localizedHref(locale, link.href)}
                      className="text-base text-white transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-4 flex items-center">
          <a
            href={localizedHref(locale, visual.href)}
            className="flex w-full min-h-56 flex-col rounded-xl bg-gradient-to-br from-[#3d164f] via-[#85258d] to-[#1d0e26] p-7 transition-opacity hover:opacity-90"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-white/65">
              {visual.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">{visual.title}</h3>
            <p className="mt-1 text-sm leading-6 text-white/80">{visual.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-white">
              {label} <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

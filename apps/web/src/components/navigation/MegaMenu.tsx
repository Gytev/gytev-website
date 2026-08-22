import type { Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";

type MegaMenuProps = {
  locale: Locale;
  label: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  visual: { eyebrow: string; title: string; description: string; href: string };
  image?: string;
};

export function MegaMenu({ locale, label, columns, visual, image }: MegaMenuProps) {
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

        <div className="col-span-4 flex items-stretch">
          <a
            key={image ?? "fallback"}
            href={localizedHref(locale, visual.href)}
            className="mega-visual group relative flex min-h-[300px] w-full flex-col justify-end overflow-hidden rounded-xl bg-[#1c1424]"
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element -- decorative panel asset
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            ) : null}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5"
              aria-hidden="true"
            />
            <div className="relative p-7">
              <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                {visual.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{visual.title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/80">{visual.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 pt-1 text-sm font-medium text-white">
                {label} <span aria-hidden>→</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

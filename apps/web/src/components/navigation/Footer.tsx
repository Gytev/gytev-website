import type { Dictionary, Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();
  const dict = dictionary as Dictionary;

  return (
    <footer className="bg-[#131313] text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {dict.footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-medium text-[#a3a3a3]">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={localizedHref(locale, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-sm text-white transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                    {link.external ? (
                      <svg
                        className="h-3 w-3 shrink-0 text-[#a3a3a3]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5h5v5M19 5l-9 9M19 14v5H5V5h6"
                        />
                      </svg>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="px-2 pt-12" aria-hidden="true">
        <p className="mx-auto max-w-[1440px] select-none overflow-hidden whitespace-nowrap text-center font-black leading-[0.82] tracking-[-0.055em] text-white">
          <span className="text-[clamp(80px,18vw,320px)]">{dict.footer.big}</span>
          <span className="text-[clamp(80px,18vw,320px)] text-[#ff4b18]">{dict.footer.bigAccent}</span>
        </p>
      </div>

      <div className="border-t border-[#333]">
        <div className="mx-auto flex max-w-[1280px] w-full flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row lg:px-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#a3a3a3]">
              © {year} Gytev ·{" "}
              <button type="button" className="text-[#a3a3a3] underline-offset-2 hover:underline">
                {dict.footer.manageCookies}
              </button>
            </p>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}

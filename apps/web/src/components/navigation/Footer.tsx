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
    <footer className="bg-white">
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {dict.footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-zinc-900">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={localizedHref(locale, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                  >
                    {link.label}
                    {link.external ? (
                      <svg
                        className="h-3 w-3 shrink-0 text-zinc-400"
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

      <div className="border-t border-zinc-200">
        <div className="flex w-full flex-col items-center justify-between gap-6 px-6 py-6 lg:flex-row lg:px-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-500">
              © {year} Gytev ·{" "}
              <button type="button" className="text-zinc-500 underline-offset-2 hover:underline">
                {dict.footer.manageCookies}
              </button>
            </p>
            <LanguageSwitcher locale={locale} />
          </div>

          <div className="w-full overflow-hidden">
            <p className="select-none whitespace-nowrap text-center text-[18vw] font-black leading-[0.9] tracking-tight text-zinc-900">
              {dict.footer.big}
              <span className="text-orange-500">{dict.footer.bigAccent}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

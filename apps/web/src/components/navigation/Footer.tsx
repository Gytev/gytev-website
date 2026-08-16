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
    <footer className="mt-30 bg-[#131313] text-white">
      <div className="mx-auto mb-16 max-w-[1280px] px-6 pt-12 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {dict.footer.groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="mt-11 flex w-full flex-col gap-11 first:mt-0 md:mt-0 md:gap-10"
            >
              {group.columns.map((column) => (
                <div key={column.title} className="flex flex-col justify-between">
                  <span className="text-sm font-medium text-[#a3a3a3]">{column.title}</span>
                  <ul className="mt-4 flex flex-col gap-5 md:mt-3 md:gap-4" role="list">
                    {column.links.map((link) => (
                      <li key={link.label} role="listitem">
                        <a
                          href={localizedHref(locale, link.href)}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener" : undefined}
                          className="inline-flex items-center gap-x-[0.3em] text-sm text-white transition-colors hover:text-[#a3a3a3]"
                        >
                          {link.label}
                          {link.external ? (
                            <>
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
                              <span className="sr-only">(opens in a new window)</span>
                            </>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#333]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="flex flex-wrap justify-center gap-2 text-sm text-[#a3a3a3]">
            <span>Gytev © {year}</span>
            <span>·</span>
            <button
              type="button"
              className="text-[#a3a3a3] underline underline-offset-2 hover:text-white"
            >
              {dict.footer.manageCookies}
            </button>
          </p>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </footer>
  );
}

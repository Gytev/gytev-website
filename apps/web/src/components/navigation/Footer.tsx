import type { Dictionary, Locale } from "@gytev/i18n";
import { localizedHref } from "@gytev/i18n";
import { footerSections } from "@gytev/config";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 font-bold text-white">
              G
            </span>
            <span className="text-lg font-bold tracking-tight text-zinc-900">Gytev</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-600">{dictionary.footer.tagline}</p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-zinc-900">{section.title}</h3>
            <ul className="mt-4 space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={localizedHref(locale, link.href)}
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="text-sm text-zinc-500">
            © {year} Gytev. {dictionary.footer.rights}
          </p>
          <div className="flex gap-6">
            <a
              href={localizedHref(locale, "/legal/privacy")}
              className="text-sm text-zinc-500 hover:text-zinc-900"
            >
              Privacy
            </a>
            <a
              href={localizedHref(locale, "/legal/terms")}
              className="text-sm text-zinc-500 hover:text-zinc-900"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

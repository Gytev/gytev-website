import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { locales, localeNames } from "@gytev/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <nav aria-label="Language switcher" className="flex items-center gap-1">
      {locales.map((code) => {
        const isActive = code === locale;
        const path = code === locale ? undefined : `/${code}`;
        return (
          <a
            key={code}
            href={path}
            className={
              isActive
                ? "rounded-md px-2 py-1 text-sm font-semibold text-zinc-900"
                : "rounded-md px-2 py-1 text-sm font-medium text-zinc-500 hover:text-zinc-900"
            }
          >
            {localeNames[code]}
          </a>
        );
      })}
    </nav>
  );
}

export { localizedHref };

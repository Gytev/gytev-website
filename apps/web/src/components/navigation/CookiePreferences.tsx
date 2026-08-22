"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@gytev/i18n";

type Consent = {
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
};

const STORAGE_KEY = "gytev.cookie-consent.v1";

const DEFAULT_CONSENT: Consent = {
  analytics: false,
  marketing: false,
  thirdParty: false,
};

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-[#c45824]" : "bg-white/20"
      } ${disabled ? "cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function CookiePreferences({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openModal = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setConsent({ ...DEFAULT_CONSENT, ...JSON.parse(raw) });
      }
    } catch {}
    setOpen(true);
  };

  const save = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {}
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-[#a3a3a3] underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
      >
        {dict.footer.manageCookies}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={dict.cookies.title}
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141414] p-8 text-left text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-semibold tracking-tight">
              {dict.cookies.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {dict.cookies.intro}
            </p>

            <div className="mt-6 border-t border-white/10">
              <div className="flex items-start justify-between gap-6 py-5">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {dict.cookies.requiredTitle}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-white/60">
                    {dict.cookies.requiredDescription}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Toggle checked disabled onChange={() => undefined} />
                  <span className="text-xs text-white/50">
                    {dict.cookies.alwaysOn}
                  </span>
                </div>
              </div>

              {(
                [
                  ["analytics", dict.cookies.analyticsTitle, dict.cookies.analyticsDescription],
                  ["marketing", dict.cookies.marketingTitle, dict.cookies.marketingDescription],
                  ["thirdParty", dict.cookies.thirdPartyTitle, dict.cookies.thirdPartyDescription],
                ] as const
              ).map(([key, title, description]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-6 border-t border-white/10 py-5"
                >
                  <div>
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-white/60">
                      {description}
                    </p>
                  </div>
                  <Toggle
                    checked={consent[key]}
                    onChange={(value) =>
                      setConsent((previous) => ({ ...previous, [key]: value }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button type="button" onClick={save} className="button button--light">
                {dict.cookies.done}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

type MobileMenuLink = { label: string; href: string };
type MobileMenuColumn = { title: string; links: MobileMenuLink[] };
type MobileMenuVisual = { eyebrow: string; title: string; description: string; href: string };

export type MobileMenuItem = {
  label: string;
  href: string;
  columns?: MobileMenuColumn[];
  featured?: MobileMenuVisual;
  image?: string;
};

type MobileMenuProps = {
  items: MobileMenuItem[];
  open: boolean;
  onClose: () => void;
  closeLabel?: string;
  title?: string;
  primaryCta?: MobileMenuLink;
  secondaryCta?: MobileMenuLink;
};

export function MobileMenu({
  items,
  open,
  onClose,
  closeLabel = "Close menu",
  title = "Menu",
  primaryCta,
  secondaryCta,
}: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleClose = () => {
    setExpanded(null);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleClose ferme et réinitialise l'accordéon
  }, [open, onClose]);

  return (
    <div
      className={
        open
          ? "fixed inset-0 z-50 lg:hidden"
          : "pointer-events-none fixed inset-0 z-50 hidden lg:hidden"
      }
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div
        className={`mobile-menu__backdrop ${open ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
        aria-hidden
      />
      <div className="mobile-menu__panel">
        <div className="mobile-menu__head">
          <span className="mobile-menu__title">{title}</span>
          <button onClick={handleClose} className="mobile-menu__close" aria-label={closeLabel}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mobile-menu__nav">
          {items.map((item) =>
            item.columns && item.columns.length > 0 ? (
              <div key={item.href}>
                <button
                  type="button"
                  className="mobile-menu__toggle"
                  aria-expanded={expanded === item.href}
                  onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                >
                  {item.label}
                  <svg
                    className={`mobile-menu__chevron ${expanded === item.href ? "mobile-menu__chevron--open" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expanded === item.href && (
                  <div className="mobile-menu__expand">
                    {item.columns.map((column) => (
                      <div key={column.title} className="mobile-menu__group">
                        <p className="mobile-menu__group-title">{column.title}</p>
                        {column.links.map((link) => (
                          <a
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            onClick={handleClose}
                            className="mobile-menu__sublink"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                    {item.featured && (
                      <a href={item.featured.href} onClick={handleClose} className="mobile-menu__visual">
                        {item.image && (
                          // eslint-disable-next-line @next/next/no-img-element -- decorative panel asset
                          <img src={item.image} alt="" className="mobile-menu__visual-img" />
                        )}
                        <div className="mobile-menu__visual-overlay" aria-hidden />
                        <div className="mobile-menu__visual-body">
                          <p className="mobile-menu__visual-eyebrow">{item.featured.eyebrow}</p>
                          <p className="mobile-menu__visual-title">{item.featured.title}</p>
                          <p className="mobile-menu__visual-desc">{item.featured.description}</p>
                          <span className="mobile-menu__visual-cta">
                            {item.label} <span aria-hidden>→</span>
                          </span>
                        </div>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <a key={item.href} href={item.href} onClick={handleClose} className="mobile-menu__link">
                {item.label}
              </a>
            ),
          )}
        </nav>
        {(primaryCta || secondaryCta) && (
          <div className="mobile-menu__actions">
            {primaryCta && (
              <a href={primaryCta.href} onClick={handleClose} className="button button--light">
                {primaryCta.label} <span aria-hidden>→</span>
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} onClick={handleClose} className="button button--on-dark">
                {secondaryCta.label} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

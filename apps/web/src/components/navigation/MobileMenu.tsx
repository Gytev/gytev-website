"use client";

type MobileMenuProps = {
  items: { label: string; href: string }[];
  open: boolean;
  onClose: () => void;
  closeLabel?: string;
};

export function MobileMenu({ items, open, onClose, closeLabel = "Close menu" }: MobileMenuProps) {
  return (
    <div
      className={
        open
          ? "fixed inset-0 z-50 lg:hidden"
          : "pointer-events-none fixed inset-0 z-50 hidden lg:hidden"
      }
    >
      <div className="absolute inset-0 bg-black/20" onClick={onClose} aria-hidden />
      <div className="absolute inset-y-0 right-0 w-80 max-w-full overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-900">Gytev</span>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100"
            aria-label={closeLabel}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

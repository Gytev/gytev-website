type MegaMenuProps = {
  label: string;
  href: string;
  items: { title: string; description: string }[];
};

export function MegaMenu({ label, href, items }: MegaMenuProps) {
  return (
    <div className="absolute inset-x-0 top-full hidden pt-4 lg:group-hover:block">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-2 border border-zinc-100 bg-white p-6 shadow-xl lg:grid-cols-3 lg:px-8">
        {items.map((item) => (
          <a
            key={item.title}
            href={href}
            className="rounded-lg p-3 transition-colors hover:bg-zinc-50"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-900">{item.title}</span>
            </div>
            <p className="mt-1 text-sm leading-6 text-zinc-500">{item.description}</p>
          </a>
        ))}
        <div className="flex items-end lg:col-span-1">
          <a
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-500"
          >
            {label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}


type StatsRowProps = {
  stats: { value: string; label: string }[];
};

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <section className="pt-0 pb-0">
      <div className="border-neutral-200 border-b bg-neutral-900">
        <div className="w-full relative flex flex-wrap lg:flex-nowrap border-neutral-200">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-10 justify-center w-full md:w-1/2 lg:w-1/3 p-4 md:px-10 md:py-20 lg:py-30 ${
                idx < stats.length - 1 ? "border-b md:border-b-0 md:border-r border-neutral-200" : ""
              }`}
            >
              <div className="flex gap-4 items-center">
                <p className="text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl">{stat.value}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-white">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

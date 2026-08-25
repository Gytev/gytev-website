
type CultureSectionProps = {
  heading: string;
  description: string;
  image: string;
};

export function CultureSection({ heading, description, image }: CultureSectionProps) {
  return (
    <section className="pt-0 pb-0">
      <div className="border-neutral-200 border-b">
        <div className="w-full relative h-auto flex flex-wrap lg:flex-nowrap border-neutral-200 lg:flex-row-reverse">
          {/* Text side (right on desktop) */}
          <div className="flex flex-col justify-end gap-6 w-full border-neutral-200 bg-neutral-50 xl:w-[50%] px-4 md:px-10 lg:px-20 py-10 md:py-20 lg:py-30 border-l">
            <h2 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {description}
            </p>
          </div>
          {/* Image side */}
          <div className="w-full flex items-center justify-center relative xl:w-[50%] p-4 md:p-10 xl:p-20 bg-white">
            <div className="w-full h-full object-contain relative z-2">
              <div className="relative overflow-hidden group size-full lg:object-contain" style={{ aspectRatio: "2176 / 2176" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Culture"
                  loading="lazy"
                  className="absolute inset-0 w-full z-2 h-full object-cover transition-opacity duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

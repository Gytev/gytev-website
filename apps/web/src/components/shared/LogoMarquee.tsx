type MarqueePartner = {
  name: string;
  logo?: string | null;
};

export function LogoMarquee({ partners }: { partners: MarqueePartner[] }) {
  const unique = partners.filter(
    (p, i, arr) => arr.findIndex((q) => q.name === p.name) === i,
  );
  return (
    <div className="trusted__track">
      {[0, 1, 2].map((slide) => (
        <div key={slide} className="trusted__slide" aria-hidden={slide > 0}>
          {unique.map((partner) => (
            <div key={`${slide}-${partner.name}`} className="trusted__case">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo marquee, plain img keeps it server-rendered */}
              <img
                src={partner.logo ?? "/logoTrust/google.jpg"}
                alt={partner.name}
                className="trusted__logo"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

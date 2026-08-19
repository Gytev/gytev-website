import { Container } from "@gytev/ui";

type LogoWallProps = {
  title: string;
  partners: string[];
};

export function LogoWall({ title, partners }: LogoWallProps) {
  return (
    <section className="py-24 border-t border-[var(--line)] bg-[var(--color-surface)] overflow-hidden">
      <Container>
        <p className="text-center text-sm font-medium tracking-widest uppercase text-zinc-400 mb-12">
          {title}
        </p>
        
        {/* Grille élégante en niveaux de gris */}
        <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-60 grayscale dark:mix-blend-normal mix-blend-luminosity transition-opacity duration-700 hover:opacity-100">
          {partners.map((partner) => (
            <div key={partner} className="flex items-center justify-center h-12 px-4 cursor-default">
              <span className="text-xl font-bold tracking-tighter text-zinc-300 transition-colors duration-300 hover:text-zinc-600">
                {partner.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

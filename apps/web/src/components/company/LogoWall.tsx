import { Container } from "@gytev/ui";
import { LogoMarquee } from "@/components/shared/LogoMarquee";

type Partner = {
  name: string;
  logo?: string | null;
};

type LogoWallProps = {
  title: string;
  partners: Partner[];
};

export function LogoWall({ title, partners }: LogoWallProps) {
  return (
    <section className="py-24 border-t border-[var(--line)] bg-[var(--color-surface)] overflow-hidden">
      <Container>
        <h2 className="about-heading about-heading--ink">{title}</h2>
        <div className="h-12" />
      </Container>

      <LogoMarquee partners={partners} />
    </section>
  );
}

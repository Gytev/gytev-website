import type { Dictionary } from "@gytev/i18n";
import { Container } from "@gytev/ui";
import { Reveal } from "./Reveal";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon?: string | null;
};

export function OriginTimeline({
  dict,
  milestones,
}: {
  dict: Dictionary;
  milestones: Milestone[];
}) {
  const { originEyebrow, originHeading, originBody, stats } =
    dict.aboutExperience;

  return (
    <section className="about-origin">
      <Container>
        <Reveal>
          <p className="about-eyebrow about-eyebrow--light">{originEyebrow}</p>
          <h2 className="about-heading about-heading--light">
            {originHeading}
          </h2>
          <p className="about-origin__body">{originBody}</p>
        </Reveal>

        <div className="about-origin__stats">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 90}>
              <div className="about-stat">
                <span className="about-stat__value">{stat.value}</span>
                <span className="about-stat__label">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <ol className="about-origin__timeline">
          {milestones.map((milestone, index) => (
            <li key={milestone.year} className="about-milestone" data-side={index % 2 === 0 ? "left" : "right"}>
              <Reveal delay={index * 60}>
                <div className="about-milestone__card">
                  <span className="about-milestone__year">{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="about-origin__gallery">
          <Reveal className="about-origin__shot about-origin__shot--tall">
            {/* eslint-disable-next-line @next/next/no-img-element -- art-directed collage, plain img keeps it server-rendered */}
            <img src="/images/about/field-aerial.jpg" alt="" aria-hidden="true" loading="lazy" />
          </Reveal>
          <Reveal delay={120} className="about-origin__shot about-origin__shot--tall">
            {/* eslint-disable-next-line @next/next/no-img-element -- art-directed collage, plain img keeps it server-rendered */}
            <img src="/images/about/lab-circuit.jpg" alt="" aria-hidden="true" loading="lazy" />
          </Reveal>
        </div>
        <Reveal delay={80} className="about-origin__shot about-origin__shot--wide">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-width band, plain img keeps it server-rendered */}
          <img src="/images/about/team-work.jpg" alt="" aria-hidden="true" loading="lazy" />
        </Reveal>
      </Container>
    </section>
  );
}

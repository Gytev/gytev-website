"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@gytev/i18n";
import type { Locale } from "@gytev/types";
import { localizedHref } from "@gytev/i18n";
import { Hero } from "./Hero";
import { HardQuestions } from "./HardQuestions";
import type { Content } from "@/lib/content";

type HomeExperienceProps = {
  dict: Dictionary;
  locale: Locale;
  customers: Content["customers"];
};

const caseStudies = [
  { company: "HSBC", badge: "CUSTOMER STORY", title: "HSBC boosts productivity with Mistral", image: "/images/figma/raw-3.jpeg" },
  { company: "ASML", badge: "CUSTOMER STORY", title: "ASML accelerates a semiconductor lithography process with Mistral.", image: "/images/figma/raw-4.jpeg" },
  { company: "SYNTHOC", badge: "CUSTOMER STORY", title: "Intelligence that moves critical teams forward.", image: "/images/figma/raw-6.jpeg" },
];

const capabilities = [
  { title: "Autonomous work.", description: "AI agent for long-horizon tasks. Fluent in your knowledge and tools.", action: "Discover Viz", type: "orange", tags: ["INTERACTIVE", "REAL-TIME", "SECURE", "TASKS", "MULTI-AGENT", "MULTIMODAL"] },
  { title: "Autonomous coding.", description: "Ship faster with a stack that meets devs where they work.", action: "Discover Viz for code", type: "code", tags: ["AGENT", "CODE GENERATION", "AUTOMATION", "LOCAL", "OPEN", "RELIABLE"] },
  { title: "AI application development.", description: "Build and deploy AI apps with complete control: build custom agents, and run production AI anywhere—from edge to cloud—with enterprise-grade tooling.", action: "Discover Studio", type: "blue", tags: ["AGENT ORCHESTRATION", "FINE-TUNING", "EVALUATION", "SECURE", "FLEXIBLE"] },
  { title: "Custom model development.", description: "Turn proprietary knowledge into model intelligence by training and aligning your own models.", action: "Discover Forge", type: "red", tags: ["ENTERPRISE", "MODEL ADAPTATION", "TRAINING", "EVALUATION", "SECURE"] },
];

function Arrow() { return <span aria-hidden>→</span>; }

export function HomeExperience({ dict, locale }: HomeExperienceProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [capability, setCapability] = useState(0);
  const [tab, setTab] = useState(0);
  const [feature, setFeature] = useState(0);

  const products = dict.home.products;
  const cta = dict.cta;
  const study = caseStudies[caseIndex];
  const selectedCapability = capabilities[capability];
  const selectedTab = products.tabs[tab];

  return (
    <div className="home-page">
      <div className="hero-takeover">
        <Hero dict={dict} locale={locale} />
        <HardQuestions dict={dict} locale={locale} />
      </div>

      <section className="trusted" aria-label="Companies trusted">
        <p>Trusted by scale-ups and<br />Fortune 500 companies</p>
        {["REDWOOD", "Commonwealth", "CSX", "HADRIAN", "Symbotic"].map((logo) => <strong key={logo}>{logo}</strong>)}
      </section>

      <section className="case-section" aria-label="Featured case studies">
        <div className="case-track">
          <article className="case-card" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.76), rgba(0,0,0,.06) 70%), url(${study.image})` }}>
            <div><strong className="case-logo">{study.company}</strong><span className="case-badge">{study.badge}</span></div>
            <h2>{study.title}</h2>
            <Link className="button button--light" href={localizedHref(locale, "/customers")}>En savoir plus <Arrow /></Link>
          </article>
          <article className="case-card case-card--next" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.76), rgba(0,0,0,.06) 70%), url(${caseStudies[(caseIndex + 1) % caseStudies.length].image})` }} aria-hidden="true">
            <strong className="case-logo">{caseStudies[(caseIndex + 1) % caseStudies.length].company}</strong>
          </article>
        </div>
        <div className="carousel-controls">
          <div role="tablist" aria-label="Case studies">{caseStudies.map((item, index) => <button key={item.company} role="tab" type="button" aria-label={`Afficher ${item.company}`} aria-selected={caseIndex === index} onClick={() => setCaseIndex(index)} className={caseIndex === index ? "dot dot--active" : "dot"} />)}</div>
          <div><button type="button" onClick={() => setCaseIndex((caseIndex + caseStudies.length - 1) % caseStudies.length)} aria-label="Étude précédente">←</button><button type="button" onClick={() => setCaseIndex((caseIndex + 1) % caseStudies.length)} aria-label="Étude suivante">→</button></div>
        </div>
      </section>

      <section className="why-section" aria-labelledby="why-title">
        <aside aria-label="Sections Gytev">{capabilities.map((item, index) => <button type="button" key={item.title} onClick={() => setCapability(index)} aria-label={item.title} className={capability === index ? "rail-button rail-button--active" : "rail-button"}>{index + 1}</button>)}</aside>
        <div className="why-content">
          <p className="eyebrow">WHY GYTEV</p>
          <div className="capability-heading"><div><h2 id="why-title">{selectedCapability.title}</h2><p>{selectedCapability.description}</p></div><Link href={localizedHref(locale, "/products/rio")} className="button button--outline">{selectedCapability.action}<Arrow /></Link></div>
          <div className={`capability-visual capability-visual--${selectedCapability.type}`}>
            <div className="visual-grid" aria-hidden />
            {selectedCapability.type === "orange" && <div className="agent-card">✦ <span>What would you like to do today?</span><small>Summarize my unread emails<br />Build me a sales model with usage-based pricing<br />Scan for fraud in the past 30 days</small></div>}
            {selectedCapability.type === "code" && <pre>✦ Reviewing code...{`\n`}<em>import</em> data from <em>{'"@gytev/core"'}</em>{`\n`}const agent = await work.execute()</pre>}
            {selectedCapability.type === "blue" && <div className="app-cards"><b>✦<br />Build</b><b>♥<br />Explore</b><b>✦<br />Govern</b></div>}
            {selectedCapability.type === "red" && <div className="model-card">◆<br /><small>custom intelligence</small></div>}
          </div>
          <div className="tag-row">{selectedCapability.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="capability-switcher">{capabilities.map((item, index) => <button type="button" key={item.title} onClick={() => setCapability(index)} className={capability === index ? "active" : ""}>{item.title}</button>)}</div>
        </div>
      </section>

      <section className="products-section" aria-labelledby="products-title">
        <div className="product-tabs" role="group" aria-label={products.eyebrow}>
          {products.tabs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={tab === index}
              onClick={() => { setTab(index); setFeature(0); }}
              className={tab === index ? "active" : ""}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="products-header">
          <p className="eyebrow">{products.eyebrow}</p>
          <h2 id="products-title">{selectedTab.heading}</h2>
          <p>{selectedTab.description}</p>
        </div>
        <div className="products-grid">
          <div className="feature-list">
            {selectedTab.features.map((item, index) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setFeature(index)}
                aria-pressed={feature === index}
                className={feature === index ? "active" : ""}
              >
                <strong>{item.title}</strong>
                {feature === index && <span>{item.description}</span>}
              </button>
            ))}
          </div>
          <div className="product-preview" aria-label={products.tabs[tab].label}>
            <span className="product-preview__label">{selectedTab.preview.label}</span>
            <h3 className="product-preview__heading">{selectedTab.preview.heading}</h3>
            <span className="product-preview__alert">{selectedTab.preview.alert}</span>
            <div className="product-preview__lines">
              {selectedTab.preview.lines.map((line) => <div key={line}>{line}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="journey-section" aria-labelledby="journey-title">
        <p>{cta.eyebrow}</p>
        <h2 id="journey-title">{cta.title}</h2>
        <div className="journey-section__actions">
          <Link href={localizedHref(locale, "/products")} className="button button--light">
            {cta.ctaPrimary} <Arrow />
          </Link>
          <Link href={localizedHref(locale, "/company/contact")} className="button button--dark">
            {cta.ctaSecondary} <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}

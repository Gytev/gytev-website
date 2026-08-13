"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "./Hero";

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

const productTabs = ["ChatGPT Work", "Use cases", "GPT-4o"];
const productFeatures = [
  ["Create share-ready work", "ChatGPT can turn context from your tools and files into polished documents, presentations, and analyses that better follow your templates and preferred formats."],
  ["Make your work interactive—and keep it current", "Build living views that bring trusted information together and make each decision easy to explain."],
  ["Connect your tools and workflows", "Access the systems your teams already use while keeping control over your organization’s data."],
  ["Keep projects moving on your schedule", "Delegate routine coordination and return to a clear, reviewable output."],
];

function Arrow() { return <span aria-hidden className="ml-2 text-lg">→</span>; }

export function HomeExperience() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [capability, setCapability] = useState(0);
  const [tab, setTab] = useState(0);
  const [feature, setFeature] = useState(0);
  const study = caseStudies[caseIndex];
  const selectedCapability = capabilities[capability];

  return (
    <div className="home-page">
      <Hero />

      <section className="case-section" aria-label="Featured case studies">
        <div className="case-track">
          <article className="case-card" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.76), rgba(0,0,0,.06) 70%), url(${study.image})` }}>
            <div><strong className="case-logo">{study.company}</strong><span className="case-badge">{study.badge}</span></div>
            <h2>{study.title}</h2>
            <Link className="button button--light" href="/en/customers">En savoir plus <Arrow /></Link>
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

      <section className="trusted" aria-label="Companies trusted">
        <p>Trusted by scale-ups and<br />Fortune 500 companies</p>
        {["REDWOOD", "Commonwealth", "CSX", "HADRIAN", "Symbotic"].map((logo) => <strong key={logo}>{logo}</strong>)}
      </section>

      <section className="why-section" aria-labelledby="why-title">
        <aside aria-label="Sections Gytev">{capabilities.map((item, index) => <button type="button" key={item.title} onClick={() => setCapability(index)} aria-label={item.title} className={capability === index ? "rail-button rail-button--active" : "rail-button"}>{index + 1}</button>)}</aside>
        <div className="why-content">
          <p className="eyebrow">WHY GYTEV</p>
          <div className="capability-heading"><div><h2 id="why-title">{selectedCapability.title}</h2><p>{selectedCapability.description}</p></div><Link href="/en/products/rio" className="button button--outline">{selectedCapability.action}<Arrow /></Link></div>
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
        <div className="product-tabs" role="tablist">{productTabs.map((label, index) => <button key={label} role="tab" type="button" aria-selected={tab === index} onClick={() => { setTab(index); setFeature(0); }} className={tab === index ? "active" : ""}>{label}</button>)}</div>
        <div className="products-header"><h2 id="products-title">{tab === 0 ? "Turn ideas into action" : tab === 1 ? "Work that moves with you" : "Intelligence for every team"}</h2><p>ChatGPT Work gathers context, plans the approach, and takes action across your tools, files, and desktop apps to create polished spreadsheets, docs, and slides.</p></div>
        <div className="products-grid"><div className="feature-list">{productFeatures.map(([title, description], index) => <button type="button" key={title} onClick={() => setFeature(index)} className={feature === index ? "active" : ""}><strong>{title}</strong>{feature === index && <span>{description}</span>}</button>)}</div>
          <div className="product-preview" aria-label="Aperçu interactif du produit">
            <div className="stars" aria-hidden>✦　　·　　✧　　·　　✦</div><div className="chat-card">I have 20 minutes before my Solara Health review. Update my existing deck with one executive-ready slide using the data room and <b>Slack</b> context.<div><button aria-label="Ajouter">＋</button><button aria-label="Envoyer">↑</button></div></div><div className="deck"><header>Solara Health <small>pptx</small><span>1 / 8　100%</span></header><div className="slide"><small>SOLARA SYSTEMS</small><h3>Solara Health<br />Strategic Account Plan</h3><em>Prepared by Rebecca Ryall et al.<br />Q3 2024</em></div><div className="floating-deck"><b>Account Planning View</b><h4>{feature === 0 ? "$1.2M Incremental ARR opportunity" : "Focused work, ready to share"}</h4><div className="bars"><i /><i /></div></div></div>
          </div></div>
      </section>

      <section className="journey-section"><p>WE ARE JUST GETTING STARTED</p><h2>Build, customize, and deploy<br />tailored AI solutions with complete<br />control.</h2><div><Link className="button button--light" href="/en/products">Start building <Arrow /></Link><Link className="button button--dark" href="/en/company/contact">Contact sales <Arrow /></Link></div></section>
    </div>
  );
}

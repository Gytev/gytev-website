"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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

function Arrow() { return <span aria-hidden>→</span>; }

export function HomeExperience({ dict, locale }: HomeExperienceProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const whyItems = dict.home.why.items;
  const [capability, setCapability] = useState(0);
  const capabilityRef = useRef(0);
  const whyRef = useRef<HTMLDivElement>(null);
  const whyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    capabilityRef.current = capability;
  }, [capability]);

  useEffect(() => {
    const container = whyContainerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          container.dataset.active = entry.isIntersecting ? "true" : "false";
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = whyRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (whyContainerRef.current?.dataset.active !== "true") return;
      const cap = capabilityRef.current;
      const atFirst = cap === 0;
      const atLast = cap === whyItems.length - 1;
      if (e.deltaY > 30) {
        if (atLast) return;
        e.preventDefault();
        setCapability(cap + 1);
      } else if (e.deltaY < -30) {
        if (atFirst) return;
        e.preventDefault();
        setCapability(cap - 1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [whyItems.length]);
  const caseStudies = dict.home.cases.items;
  const [tab, setTab] = useState(0);
  const [feature, setFeature] = useState(0);
  const tabRef = useRef(0);
  const productsRef = useRef<HTMLElement>(null);
  const productsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tabRef.current = tab;
  }, [tab]);

  useEffect(() => {
    const el = productsRef.current;
    const container = productsContainerRef.current;
    if (!el || !container) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const covered = rect.top <= 0 && rect.bottom >= window.innerHeight - 48;
      container.dataset.active = covered ? "true" : "false";
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      container.dataset.active = "false";
    };
  }, []);

  useEffect(() => {
    const el = productsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (productsContainerRef.current?.dataset.active !== "true") return;
      const t = tabRef.current;
      const count = dict.home.products.tabs.length;
      if (e.deltaY > 30) {
        if (t === count - 1) return;
        e.preventDefault();
        setTab(t + 1);
        setFeature(0);
      } else if (e.deltaY < -30) {
        if (t === 0) return;
        e.preventDefault();
        setTab(t - 1);
        setFeature(0);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [dict.home.products.tabs.length]);

  const products = dict.home.products;
  const cta = dict.cta;

  const selectedCase = caseStudies[caseIndex % caseStudies.length];
  const nextCase = caseStudies[(caseIndex + 1) % caseStudies.length];
  const selectedCapability = whyItems[capability % whyItems.length];
  const selectedTab = products.tabs[tab];

  return (
    <div className="home-page">
      <div className="hero-takeover">
        <Hero dict={dict} locale={locale} />
        <HardQuestions dict={dict} locale={locale} />
      </div>

      <section className="trusted" aria-label="Companies trusted">
        <div className="trusted__track">
          <div className="trusted__slide">
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="Google" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="Google" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="Google" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="Google" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="Google" className="trusted__logo" /></div>
          </div>
          <div className="trusted__slide" aria-hidden="true">
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
          </div>
          <div className="trusted__slide" aria-hidden="true">
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
            <div className="trusted__case"><img src="/logoTrust/google.jpg" alt="" className="trusted__logo" /></div>
          </div>
        </div>
      </section>

      <section className="case-section" aria-label={dict.home.cases.heading} onWheel={(e) => { if (e.deltaY > 30) setCaseIndex((caseIndex + 1) % caseStudies.length); else if (e.deltaY < -30) setCaseIndex((caseIndex - 1 + caseStudies.length) % caseStudies.length); }}>
        <div className="case-grid">
          <Link key={`${selectedCase.badge}-${caseIndex}`} href={localizedHref(locale, "/customers")} className="case-card">
            <img src={selectedCase.image} alt="" className="case-card__bg" />
            <div className="case-card__overlay">
              <div className="case-card__content">
                <div className="case-card__logo">
                  <span className="case-card__logo-text">{selectedCase.company}</span>
                </div>
                <span className="case-card__tag">{selectedCase.badge}</span>
                <h2 className="case-card__title">{selectedCase.title}</h2>
              </div>
              <div className="case-card__btn">
                <span>{dict.home.cases.learnMore}</span>
                <span className="case-card__btn-arrow" aria-hidden>→</span>
              </div>
            </div>
          </Link>
          <Link key={`${nextCase.badge}-${caseIndex + 1}`} href={localizedHref(locale, "/customers")} className="case-card case-card--next">
            <img src={nextCase.image} alt="" className="case-card__bg" />
            <div className="case-card__overlay">
              <div className="case-card__content">
                <div className="case-card__logo">
                  <span className="case-card__logo-text">{nextCase.company}</span>
                </div>
                <span className="case-card__tag">{nextCase.badge}</span>
                <h2 className="case-card__title">{nextCase.title}</h2>
              </div>
              <div className="case-card__btn">
                <span>{dict.home.cases.learnMore}</span>
                <span className="case-card__btn-arrow" aria-hidden>→</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="case-nav">
          <div className="case-nav__progress">
            <span className="case-nav__bar" />
            {caseStudies.map((_, i) => (
              <button key={i} type="button" className={`case-nav__dot ${i === caseIndex ? "case-nav__dot--active" : ""}`} onClick={() => setCaseIndex(i)} aria-label={`Story ${i + 1}`} />
            ))}
          </div>
          <div className="case-nav__arrows">
            <button type="button" onClick={() => setCaseIndex((caseIndex - 1 + caseStudies.length) % caseStudies.length)} aria-label={dict.home.cases.prev}>←</button>
            <button type="button" onClick={() => setCaseIndex((caseIndex + 1) % caseStudies.length)} aria-label={dict.home.cases.next}>→</button>
          </div>
        </div>
      </section>

      <div className="why-wrapper" ref={whyContainerRef}>
        <section className="why-section" aria-labelledby="why-title" ref={whyRef}>
          <div className="why-container">
          <nav className="why-sidebar" aria-label={dict.home.why.railLabel}>
            <ul>
              {whyItems.map((item, index) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setCapability(index)}
                    className={`why-sidebar__item ${capability === index ? "why-sidebar__item--active" : ""}`}
                    aria-label={item.title}
                  >
                    <span className="why-sidebar__icon" aria-hidden>
                      {item.panelType === "observe" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>}
                      {item.panelType === "understand" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
                      {item.panelType === "predict" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                      {item.panelType === "optimize" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
                      {item.panelType === "decide" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                      {item.panelType === "act" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="why-content">
            <div className="capability-heading">
              <div>
                <h2 id="why-title">{selectedCapability.title}</h2>
                <p>{selectedCapability.description}</p>
              </div>
              <Link href={localizedHref(locale, "/products/rio")} className="button button--outline">
                {selectedCapability.action}<Arrow />
              </Link>
            </div>
            <div className={`capability-visual capability-visual--${selectedCapability.panelType}`}>
              <div className="visual-grid" aria-hidden />
              {selectedCapability.panelType === "observe" && <div className="chat-window"><div className="chat-window__header"><span className="chat-window__dot" /><span className="chat-window__dot" /><span className="chat-window__dot" /></div><div className="chat-window__body"><div className="chat-window__prompt"><span>✦</span> <span>{selectedCapability.panel.label}</span></div><div className="chat-window__suggestions">{selectedCapability.panel.lines.map((l, i) => <div key={i} className="chat-window__suggestion"><span className="chat-window__suggestion-icon">✦</span> {l}</div>)}</div></div></div>}
              {selectedCapability.panelType === "understand" && <pre className="code-window"><span className="code-window__comment">// {selectedCapability.panel.label}</span>{`\n`}{selectedCapability.panel.lines.map((l, i) => <span key={i}>{i === 0 ? <><em>import</em> {`{ `}{l.split("'")[0]}{`' }`}</> : i === 1 ? <>{l}</> : <><em>const</em> result = {l}</>}{i < selectedCapability.panel.lines.length - 1 ? `\n` : ""}</span>)}</pre>}
              {selectedCapability.panelType === "predict" && <div className="forecast-cards">{selectedCapability.panel.lines.map((l, i) => <div key={i} className="forecast-card"><span className="forecast-card__icon">✦</span><span className="forecast-card__text">{l}</span></div>)}</div>}
              {selectedCapability.panelType === "optimize" && <div className="optim-panel"><div className="optim-panel__header"><span className="optim-panel__icon">◆</span> {selectedCapability.panel.label}</div><div className="optim-panel__bars">{selectedCapability.panel.lines.map((l, i) => <div key={i} className="optim-bar"><span className="optim-bar__label">{l.split("·")[0]}</span><div className="optim-bar__track"><div className="optim-bar__fill" style={{ width: `${90 - i * 15}%` }} /></div><span className="optim-bar__value">{l.split("·")[1]}</span></div>)}</div></div>}
              {selectedCapability.panelType === "decide" && <div className="decision-cards">{selectedCapability.panel.lines.map((l, i) => <div key={i} className="decision-card"><span className="decision-card__icon">✦</span><span className="decision-card__text">{l}</span></div>)}</div>}
              {selectedCapability.panelType === "act" && <div className="workflow-panel"><div className="workflow-panel__header"><span className="workflow-panel__icon">✦</span> {selectedCapability.panel.label}</div><div className="workflow-panel__steps">{selectedCapability.panel.lines.map((l, i) => <div key={i} className="workflow-step"><span className="workflow-step__dot" /><span className="workflow-step__text">{l}</span></div>)}</div></div>}
            </div>
            <div className="tag-row">{selectedCapability.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </section>
      </div>

      <div className="products-wrapper" ref={productsContainerRef}>
        <section className="products-section" aria-labelledby="products-title" ref={productsRef}>
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
          <div className="product-preview" aria-label={selectedTab.label}>
            <span className="product-preview__label">{selectedTab.preview.label}</span>
            <h3 className="product-preview__heading">{selectedTab.preview.heading}</h3>
            <span className="product-preview__alert">{selectedTab.preview.alert}</span>
            <div className="product-preview__lines">
              {selectedTab.preview.lines.map((line) => <div key={line}>{line}</div>)}
            </div>
          </div>
        </div>
        </section>
      </div>

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

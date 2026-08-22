# Gytev — Master Prompt de refonte du site vitrine

Source : audit complet du monorepo + wireframe + git history (HEAD `main`).
Ce document est la spécification exploitable par un agent de développement
autonome chargé de **terminer et productioniser** la refonte premium du site
vitrine Gytev. Il contient trois parties : PROJECT INTELLIGENCE,
RISKS & MISSING DECISIONS, puis le MASTER PROMPT copiable tel quel.

---

## 1. PROJECT INTELLIGENCE

### Identité produit
- **Gytev** — « Le prochain Google africain, pour le monde entier. »
  Positionnement : *« Gytev builds intelligent systems that understand the
  real world. »* / *« Complexity inside, simplicity at the interface. »*
- **Vision** : boucle d'intelligence (Observe → Understand → Predict →
  Optimize → Decide → Act → Learn), thèse technologique 20 ans (horizon 2046).
- **Produits** : **Rio** (jumeau numérique agricole, IoT Box + IA) ;
  **RedQ** (plateforme nationale de gestion des dons et poches de sang).
- **Étapes projet** : 1) Vitrine (en cours) → 2) CMS headless →
  3) Recherche réelle → 4) IA/RAG.
- **Cibles** : beta users, coopératives agricoles, banques de sang/hôpitaux,
  gouvernements, investisseurs, développeurs, presse, talents.

### Stack technique (imposée par le repo)
- **Frontend** : Next.js **16.3.0** (App Router), React **19.2.8**,
  TypeScript strict, Tailwind **v4** (`@tailwindcss/postcss`), polices locales
  **GT Walsheim** (woff2, 7 graisses).
- **Backend** : Python **3.12+**, **uv**, FastAPI 0.115+, Pydantic v2,
  SQLAlchemy 2 async, **PostgreSQL 16 + pgvector**, psycopg v3.
- **Outillage** : monorepo **pnpm 10**, ESLint 9 + Prettier, Ruff,
  pytest + httpx (ASGI), GitHub Actions (CI), scripts shell (`bootstrap.sh`,
  `setup.sh`, `dev.sh`).
- **Déploiement visé (docs)** : Vercel (web/admin) + conteneur simple
  (backend), pas de K8s.

### Architecture en place
- **Monorepo** : `apps/web` (3000, i18n par route `/[locale]`, SEO, sitemap),
  `apps/admin` (3001, CRUD, UI française), `backend/` (API REST),
  `packages/` (`ui`, `design-system`+`tokens.css`, `types`, `i18n`
  +dictionnaires en/fr, `config`), `content/en|fr/content.json`,
  `infrastructure/compose.yaml`, `scripts/`, `docs/`, `skills/`.
- **i18n** : `en` sans préfixe (locale par défaut), `fr` préfixé ; middleware
  réécrit `/` → `/en` ; `localizedHref`, `generateStaticParams`,
  `getDictionary`.
- **Contenu à 2 sources** : JSON versionné + API `GET /api/content/{locale}`
  (revalidate 60s) avec fallback JSON ; `lib/search.ts` alimente la recherche
  (max 8 résultats).
- **Backend** : fabrique CRUD générique (8 entités : products, solutions,
  research, developers, blog, customers, company, navigation), écritures
  protégées par `X-API-Key`/`GYTEV_ADMIN_API_KEY`, `create_all` au lifespan
  (pas de migrations), seed idempotent depuis les JSON.
- **Admin** : config déclarative des entités (`entities.ts`), BFF Next
  (la clé API reste côté serveur), dashboard, table/formulaire dynamiques.

### État actuel vérifié (HEAD = `main`, arbre propre)
- **Le web compile, typecheck et lint passent** (1 seul warning : `<img>`
  dans `Navbar.tsx`). Build SSG en/fr OK.
- **La homepage a été refondue** (`HomeExperience.tsx`, `Hero.tsx`,
  `globals.css` — design premium : hero animé avec halos/champ/parallaxe
  pointer, sections case/trusted/why/products/journey).
- **MAIS** ce redesign est un brouillon contenant **du contenu tiers copié**
  (cas clients HSBC/ASML/SYNTHOC de Mistral, capacités « Viz/Studio/Forge »,
  onglets « ChatGPT Work » d'OpenAI, logos REDWOOD/Commonwealth/CSX/HADRIAN/
  Symbotic, images `/images/figma/raw-*.jpeg`), **hardcodé en anglais** (avec
  résidus français : « En savoir plus »), **hors du pipeline i18n**.
- **Navbar sombre** (#131313) + mega menu + drawer mobile + search overlay +
  logo GIF animé « G⅄TƎV ».
- **Footer** : 10 colonnes, grand texte marque masqué par une classe `hidden`
  (incohérent avec l'intention design « 18vw »).
- **Liens orphelins** : la nav/footer pointent vers des routes inexistantes
  (`/company/contact`, `/company/about`, `/company/careers`,
  `/products/rio/box|ai|platform`,
  `/solutions/agriculture|public-health|government`, `/developers/status`,
  `/legal/*`, `/research/*`, `/developers/api|sdks`…).
- **`og.png` référencé** dans `siteConfig` mais **absent** de `public/`.
- **CSS mort** : `globals.css` contient encore les anciennes sections
  (`showcase-section`, `frontier-card`, `questions-card`, `pixel-grid`…).
- **`skills/`** (généré au commit `b2a9a4c`) décrit l'ancienne homepage
  (dict-driven) — obsolète vs `main`.
- **Git** : branches `main` (courante), `feature/first-release`,
  `feature/ui-refont`, `feature/init`. Historique : init monorepo →
  styles/nav/middleware → admin → refonte homepage → merge PR → logo navbar.

### Design system (extrait de `tokens.css` + `globals.css`)
- **Couleurs** : papier `#f7f7f3`/`#f8f8f5`, encre `#131313`, dark
  `#131313/#151515/#171717`, orange accent `#ff4b18` (hero) et
  `#f97316/#ea580c` (tokens), zinc neutres, red (RedQ), dégradés bleu/rouge/
  vert dans les panneaux interactifs.
- **Typo** : GT Walsheim (7 graisses, woff2 locaux), titres XXL
  `clamp(52px→104px)`/`7.2vw`, `letter-spacing:-0.075em`,
  `line-height:0.91` ; corps `clamp(20px→24px)`, `-0.02em`.
- **Rayons** : pills (`9999px`), 5px (cartes), 24px (préviews).
- **Motion** : easing `cubic-bezier(.16,1,.3,1)`, entrées hero 900ms–1.1s,
  parallaxe pointer via custom properties CSS + `requestAnimationFrame` (hors
  render React), animations lentes continues (19–29s alternate),
  `prefers-reduced-motion: reduce` désactive tout.
- **Layout** : max-width 1280px (hero), 1120/1366px selon sections,
  breakpoint unique `800px` (mobile), grid 12 colonnes (mega menu), paddings
  `clamp`.

### Contraintes implicites (à expliciter)
Site premium + animations → performance (transform/opacity, GPU,
`will-change` raisonnable), fluide sur mobile ; design inspiré d'entreprises
tech → cohérence visuelle mais **pas de copie** ; i18n en/fr symétrique ;
contenu Gytev réel (jamais de contenu tiers) ; responsive mobile-first ;
accessibilité (focus, clavier, reduced-motion déjà amorcée).

---

## 2. RISKS & MISSING DECISIONS

### Contradictions détectées
1. **Homepage = contenu tiers copié** (Mistral AI/OpenAI) alors que la marque
   a un contenu réel riche (Rio, RedQ, vision, clients réels). → À remplacer
   en conservant la qualité du design. **Priorité : la plus récente** (le
   redesign premium) = la direction visuelle ; le contenu tiers = rejeté.
2. **Redesign hors i18n** (hardcodé EN + résidus FR) vs règle d'or « i18n par
   route, dictionnaires symétriques ». → Le redesign doit être ré-intégré au
   pipeline i18n.
3. **`skills/` décrit l'ancienne homepage** (hero/centralQuestion/product/cta
   dict-driven) — obsolète mais utile : le dictionnaire conserve des contenus
   (hero, centralQuestion, product.features, cta) exploitables pour la
   nouvelle homepage.
4. **Footer grand texte masqué** (`hidden`) vs design voulu (grande marque).
   → Visible à terminer.
5. **Deux oranges** (`#ff4b18` redesign vs `#f97316` tokens) → consolider les
   tokens.
6. **CSS mort** (anciennes sections) cohabite avec le nouveau système →
   nettoyer.
7. **Liens orphelins** dans nav/footer/dictionnaire (routes inexistantes →
   404) → créer les pages minimales OU élaguer les liens.

### Décisions bloquantes / manquantes
- **[DÉCISION REQUISE] Wireframe** : `wirefrma ui.png` (racine) et
  `apps/web/public/wireframe-ui.png` sont la référence visuelle cible — le
  modèle qui a produit ce document n'a **pas pu le lire** (pas de support
  image). Le prochain agent DOIT l'ouvrir. S'il ne peut pas lire d'image, il
  doit le signaler avant d'implémenter.
- **[DÉCISION REQUISE] Routes orphelines** : créer des pages légères vs
  élaguer. Recommandation : créer `/company/contact` (ciblée par les CTAs
  navbar), `/company/careers`, `/company/about` ; élaguer le reste des liens
  vers des routes existantes.
- **[DÉCISION REQUISE] Bande « trusted/partners »** : les logos fictifs
  doivent disparaître (aucun partenaire réel connu) — remplacer par une bande
  neutre « Built in Africa » ou supprimer.
- **[DÉCISION REQUISE] Images de cas** : remplacer les `raw-*.jpeg` par des
  visuels Gytev (dégradés/CSS ou assets générés) — pas d'images de vraies
  entreprises.

### Risques techniques
- `create_all` sans migrations backend (aucun changement de modèle attendu —
  backend à **ne pas** modifier sauf nécessité, puis `seed --reset`).
- Warning `<img>` logo (LCP) → utiliser `next/image` ou `width/height`
  explicites (un GIF ne se prête pas à l'optimisation).
- `og.png` absent → générer un OG image.
- Redesign à maintenir sans régresser admin/backend/packages (CI 4 jobs).

---

## 3. MASTER PROMPT

Le bloc ci-dessous est **autonome et copiable tel quel** dans un nouvel agent
de développement (il ne fait référence à aucune conversation antérieure).

````markdown
# ROLE
You are a Senior Staff Frontend Engineer and Product Engineer. You will work
autonomously on a production monorepo to FINISH and PRODUCTION-IZE a premium
showcase website. You must be proactive, disciplined, and never pretend to
have tested or finished something you have not.

# CONTEXT
This is the **Gytev** monorepo — a showcase website for Gytev, the
"next African Google, for the world". Gytev builds intelligent systems that
understand the real world: **Rio** (digital twin for agriculture — IoT box +
AI: observe, understand, predict, act) and **RedQ** (national blood-donation
and blood-bag management platform). There is also a 20-year technology vision
(the "intelligence loop": Observe → Understand → Predict → Optimize → Decide
→ Act → Learn).

The website must look and feel PREMIUM (the current homepage redesign sets a
high visual bar) while containing ONLY genuine Gytev content, in two
languages (en = default, no prefix; fr = prefixed `/fr`).

Working directory: `/home/chanwinharold/Documents/codespace/projects/gytev-website`
Git state: branch `main`, clean tree. DO NOT modify the backend, admin app,
or shared packages unless strictly required — and if you do, keep them green.

# YOUR MANDATORY FIRST STEPS
1. **Open the wireframe** `wirefrma ui.png` (repo root) and/or
   `apps/web/public/wireframe-ui.png` — it is the primary visual reference.
   If your model cannot read images, STOP and report this blocking limitation.
2. Read, in this order: `README.md`, `skills/README.md`, `skills/*.md`,
   `docs/architecture.md`, `docs/vision/README.md`, `docs/products/rio.md`,
   `docs/solutions/redq.md`.
3. Read the live implementation: `apps/web/src/app/globals.css`,
   `apps/web/src/components/home/Hero.tsx`,
   `apps/web/src/components/home/HomeExperience.tsx`,
   `apps/web/src/components/navigation/*`, `apps/web/src/app/[locale]/layout.tsx`,
   `packages/i18n/src/index.ts`, `packages/config/src/index.ts`,
   `packages/design-system/src/tokens.css`, `packages/types/src/index.ts`,
   `apps/web/src/lib/*`.
4. Audit before touching code (Phase 2 in WORKFLOW below).

# OBJECTIVE
Deliver a finished, bilingual, premium, production-ready showcase website:
- The homepage, redesigned at the visual quality already established in
  `Hero.tsx`/`globals.css`, rebuilt with **100% genuine Gytev content** and
  **full en/fr i18n**.
- All section pages consistent with the new design language.
- Navigation, mega menu, mobile drawer, search overlay, language switcher,
  and footer working and consistent.
- Every link in nav/footer resolves to a real route (fix or prune).
- No leftover placeholder or third-party content anywhere.
- All quality gates green (see DEFINITION OF DONE).

# PRODUCT
- Name: **Gytev**. Tagline: "Intelligent systems that understand the real
  world." ("Des systèmes intelligents qui comprennent le monde réel.")
- One-liner positioning: "Gytev builds intelligent systems that understand
  the real world" / "Complexity inside, simplicity at the interface."
- Flagship product: **Rio** — digital twin of farms. An IoT Box senses soil
  moisture, temperature, air humidity, light, rainfall (optional: soil pH,
  conductivity, water level). AI fuses box data + field history + weather +
  satellite (Sentinel, Landsat) + agronomic knowledge. It answers four
  questions: What is happening? Why? What could happen next? What should we
  do? Example: maize in flowering stage + humidity drop + week without rain →
  high water-stress risk, ~18% yield loss, irrigate within 24h.
- Flagship solution: **RedQ** — national platform managing blood donations and
  blood bags: donors, per-bag traceability (type, group, status, expiry),
  national stock, demand/distribution, dashboards + alerts, shortage
  forecasting.
- Customers (real content, use them): Coopérative du Sahel (agriculture,
  Burkina Faso), Banque de Sang de Dakar (public health, Senegal).
- Research topics: Agricultural Intelligence, Predictive Systems, Language & AI (statuses:
  published / in-progress / internal).
- Vision: the 7-step intelligence loop, Africa as starting point, 20-year
  ambition ("intelligence layer for the real world").

# USERS
Prospective customers (agri cooperatives, blood banks/hospitals,
governments), beta users, investors, developers, journalists, and job
candidates. The site must reassure, explain, and drive actions toward
product/solution pages, the vision, and contact.

# REQUIREMENTS (must-haves)
1. **Kill third-party placeholder content.** Remove every trace of Mistral /
   OpenAI / any other company: case studies (HSBC, ASML, SYNTHOC), capabilities
   ("Viz", "Studio", "Forge"), "ChatGPT Work" tabs, fake logos (REDWOOD,
   Commonwealth, CSX, HADRIAN, Symbotic), raw Figma images
   (`/images/figma/raw-*.jpeg`). No other company's name, product, or image may
   appear on the site.
2. **Full i18n on the homepage.** All homepage copy must come from the
   `@gytev/i18n` dictionaries (extend the `Dictionary` type + both en/fr
   dictionaries symmetrically). No hardcoded English or French strings in
   components. Keep `en` un-prefixed, `fr` prefixed.
3. **No 404 in primary navigation.** The navbar CTA ("Get started") and "Log
   in" currently link to `/company/contact` which does not exist. Create a
   real, polished `/company/contact` page (bilingual). For every other
   nav/footer link pointing to a non-existent route (e.g. `/company/about`,
   `/company/careers`, `/products/rio/box|ai|platform`,
   `/solutions/agriculture|public-health|government`, `/developers/status`,
   `/legal/*`, `/research/<topic>`, `/developers/api|sdks`): either create a
   lightweight real page or prune the link so it targets an existing route.
   Prefer pruning over creating thin empty shells, except `/company/about`
   and `/company/careers` which should be simple but real pages built from
   `content/en|fr/content.json` (`company.about`, `company.story`,
   `company.careers`, `company.vision`).
4. **Footer brand statement visible.** Restore the large "Gytev" wordmark in
   the footer (18vw-scale, full-bleed, like the design intent), bilingual
   accent text. Remove the current `hidden` hack.
5. **Fix the image/LCP warning** in `Navbar.tsx` (currently `<img>` for the
   animated logo GIF). Use `next/image` with a proper loader/sizes, or keep
   `<img>` with explicit `width`/`height` if `next/image` cannot handle the
   GIF — but eliminate the ESLint `@next/next/no-img-element` warning.
6. **Add an OG image.** `siteConfig.ogImage` references `/og.png` which does
   not exist. Generate a real OG image (1200×630) using the brand colors/type
   and reference it.
7. **Keep the existing interactive/productivity features working**: search
   overlay (`lib/search.ts`), mega menu, mobile drawer, language switcher,
   blog/research/customers/dev sections driven by `getContent(locale)`.
8. Do not regress: `apps/admin`, `backend/`, `packages/*` must keep passing
   their checks; `pnpm-lock.yaml` must not be hand-edited.

# FEATURES — HOMEPAGE (reference composition)
Compose the homepage with these sections (keep the established design quality
and the wireframe as the layout reference):
1. **Hero** — keep the current animated visual (organic field blob, halos,
   ribbons, signal dot, grain, pointer-parallax via CSS custom properties +
   requestAnimationFrame, no React state on pointermove). Replace copy with
   dictionary content: eyebrow, display headline
   ("Intelligent systems that understand the real world."), lede, two CTAs
   (→ `/products/rio`, `/company/vision`). Bilingual.
   **Hero coin-spin (REQUIRED):** the circular background object (the organic
   `hero__field` blob) must perform a **3D rotation on itself like a coin
   making several full rotations, seen from the front** — a slow, continuous
   tumble around its vertical axis, not a fast spin, and not a flat 2D
   rotation. Implementation requirements:
   - Separate the concerns so the spin composes with the existing pointer
     parallax: keep the parallax translate + base `rotate(-12deg)` on
     `.hero__field` (outer element), and apply the 3D spin to an inner
     wrapper (e.g. `.hero__coin`) so the parallax transform and the spinning
     keyframe never override each other in the same `transform`.
   - Set `perspective` on the hero visual container (`.hero__visual` or the
     `.hero` section) and `transform-style: preserve-3d` on the spinning
     element's parent so the rotation reads as true 3D depth.
   - Keyframe animation must complete **several full turns**
     (`rotateY(0deg)` → `rotateY(N × 360deg)` with **N ≥ 3**, e.g. 4 turns
     over ~18–24s, `linear` or gentle `ease-in-out`, `infinite`) — the object
     must visibly spin multiple times on itself.
   - Keep the existing organic border-radius morph and the layered
     gradients/rings on the spinning element so the blob keeps its identity
     while tumbling like a coin.
   - Do NOT use `backface-visibility: hidden` unless you add an explicit
     distinct back face; with a single-faced flat element it would vanish
     past 90°. The element must stay visible through all 360°.
   - The spin is decorative: it must be fully disabled under
     `prefers-reduced-motion` and on touch/non-hover devices (no pointer
     interactivity, no animation).
2. **Customers / Stories** — replace the Mistral carousel with Gytev customer
   stories (Coopérative du Sahel, Banque de Sang de Dakar) rendered as
   premium cards (gradient/abstract backgrounds — do NOT use real company
   photos). Keep the carousel/dots pattern only if it remains accessible and
   keyboard-operable.
3. **Why Gytev / Capabilities** — repurpose the interactive rail (numbered
   selector) to present the Rio intelligence loop from the dictionary
   (`product.features`: Observe / Understand / Predict / Act), each with its
   tags and a distinctive visual panel (keep the gradient panel concept:
   orange/code/blue/red adapted to Gytev). Rename "WHY GYTEV" heading.
4. **Products / platform preview** — dark section; replace "ChatGPT Work"
   content with Gytev product storytelling. Tabs: Rio / RedQ / (Platform).
   The mock preview (deck/chat) must be a Gytev scenario — e.g. the maize
   water-stress example producing an "irrigate within 24h" recommendation.
   Copy from dictionaries.
5. **Hard questions** — optional but recommended: reuse the "centralQuestion"
   content (dark card, 4 nodes: What is happening? Why? What next? What
   should we do?) as a brand-defining section.
6. **Journey / CTA** — orange gradient band ("Build, customize, and deploy
   intelligent systems with complete control."), CTAs → `/products` and
   `/company/contact`. Bilingual.
7. **Trusted band** — NO fake logos. Either remove it or replace with a
   neutral brand statement (e.g. "Built for Africa. Built for the world.")

# UI / UX
- **Navbar** (sticky, dark `#131313`): logo left, 5 nav items with mega menu
  (3 link columns + visual panel) on hover/click, search icon, "Log in"
  (→ `/company/contact` or pruned), primary CTA (→ `/products/rio`), hamburger
  on mobile opening the drawer. Escape + outside-click close. `aria-expanded`
  on open items.
- **Mobile menu**: full drawer, closable, links localized.
- **Search overlay**: fullscreen, autofocus input, Escape/overlay close, body
  scroll lock, max 8 results, localized.
- **Language switcher**: en/fr, respects `localizedHref`.
- **Hover/active/focus states** on all interactive elements: visible focus
  ring, no layout shift on hover, button press feedback (translateY).
- **Loading/empty/error states** for any async content (content fetch fallback
  already handles API down → JSON).
- **Micro-interactions**: keep the hero entrance animations (900ms–1.1s,
  `cubic-bezier(.16,1,.3,1)`) and the coin-spin described in the Hero spec;
  respect `prefers-reduced-motion: reduce` (disable all animation/transition —
  the current global rule must stay).
- **Responsive** (mobile-first where relevant): mobile / tablet / laptop /
  desktop. Adapt hero (stacked, reduced visual), grids (1-col mobile), tabs
  (scrollable pill bar), spacing, typography (`clamp`). Breakpoints must cover
  beyond the single 800px rule if needed.

# DESIGN SYSTEM (consolidate, don't invent)
- **Colors**: paper background `#f7f7f3`/`#f8f8f5`; ink `#131313`; dark
  surfaces `#131313/#151515/#171717`; primary/signal orange `#ff4b18`
  (reconcile with tokens `#f97316/#ea580c` — document one "brand orange");
  zinc neutrals; red accent for RedQ; per-panel gradient accents. Update
  `packages/design-system/src/tokens.css` so the redesign uses tokens instead
  of raw hex littered in CSS/JSX (add `--color-signal-*`, paper, etc.).
- **Typography**: GT Walsheim (local woff2, 7 weights). Display: huge,
  `letter-spacing:-0.075em`, `line-height:~0.91`; body: readable, `-0.02em`.
- **Radius**: pills, 5px cards, 24px previews.
- **Motion**: the established easing/durations; animate transform/opacity only
  (GPU-composited), never layout properties. The hero coin-spin is a pure
  `rotateY` transform animation: several full 360° turns (N ≥ 3) on the
  circular background object, built with an inner 3D element
  (`transform-style: preserve-3d`), `perspective` on the hero visual
  container, composed with (never overriding) the pointer-parallax translate,
  and fully disabled under `prefers-reduced-motion` and on touch devices.
- **Layout**: max-width 1280px hero / 1120–1366px sections; consistent
  spacing scale.
- Remove dead CSS from `globals.css` (old `showcase-section`,
  `frontier-card`, `questions-card`, `pixel-grid`, etc.) — only after the new
  homepage sections are fully implemented.

# TECH STACK (do NOT change)
- Required: Next.js 16 (App Router, server components by default, `"use
  client"` only for interactivity, `params` are Promises → `await params`),
  React 19, TypeScript strict, Tailwind CSS v4, GT Walsheim local fonts,
  pnpm 10 workspace, `@gytev/*` packages (never relative imports to
  `packages/`), Prettier.
- Avoid: adding new dependencies unless strictly necessary; CSS-in-JS
  libraries; animation libraries (Framer Motion etc.) — native CSS/keyframes
  are already sufficient and established.
- Backend/admin/packages: Python 3.12 + uv (FastAPI), Next admin — leave
  untouched unless a fix is mandatory.

# ARCHITECTURE
- Homepage: `apps/web/src/app/[locale]/page.tsx` → presentational section
  components under `apps/web/src/components/home/`. Keep business-free UI.
- Copy lives in `packages/i18n/src/index.ts` (dictionaries) — extend the
  `Dictionary` type and keep en/fr perfectly symmetric.
- List content (customers, research, blog, dev resources, products,
  solutions) continues to come from `getContent(locale)` (JSON/API fallback).
- Keep `SectionPage` for section pages or align section pages to the new
  visual language (dark navbar + premium sections); section pages must not
  look like leftovers.
- No new state library; local state + URL only.

# SECURITY
- No secrets in the frontend. Do not touch `.env` files; only `.env.example`
  is versioned. Never log or print credentials. The admin API key stays
  server-side only. No changes to auth logic.

# PERFORMANCE
- Bundle: no new deps; keep fonts local + `font-display` handled by Next.
- Images: `next/image` where possible; replace heavy/irrelevant assets.
- Animation: transform/opacity only; the pointer-parallax must stay off
  React's render path (custom properties + rAF, as today); the hero coin-spin
  is a GPU-composited `rotateY` transform (no layout/paint cost) — keep it on
  a dedicated 3D layer (`transform-style: preserve-3d` / `perspective`);
  respect reduced-motion and non-hover devices (no spin, no parallax).
- Keep static generation: all `[locale]` pages SSG.

# ACCESSIBILITY
- Semantic HTML (`header/nav/main/section/footer`, real `<button>`/`<a>`).
- Keyboard navigation: mega menu open/close, drawer, overlay, carousel/dots,
  tabs — all operable by keyboard; visible focus states; Escape closes
  overlays/menus.
- `aria-expanded`, `aria-label` on icon-only controls, `aria-selected` only
  where a real `tablist/tab/tabpanel` relationship exists (fix the current
  misuse: dots and tabs without panels must not claim `role="tab"`).
- Contrast: text on orange/red/dark panels must be readable.
- `alt` on all images; decorative visuals `aria-hidden`.
- `prefers-reduced-motion`: fully disable animations/transitions — this
  includes the hero coin-spin and pointer-parallax.

# SEO
- Keep `sitemap.ts` (en un-prefixed, fr prefixed, base `https://gytev.com`)
  and `robots.ts`. Update if routes change.
- Per-locale metadata via `generateMetadata` in `[locale]/layout.tsx` and page
  titles/descriptions; homepage metadata from dictionary.
- Open Graph + Twitter image pointing to the new real `/og.png`.

# TESTING
- No JS test runner exists; real tests are backend (pytest). Do not add a
  test framework unless trivial. Verify instead by: `lint`, `typecheck`,
  `build`, manual browser checks (responsiveness at 375/768/1024/1440px,
  interactions, reduced-motion, keyboard), and checking `/en`, `/fr`, and `/`
  redirect.
- Verify the hero coin-spin visually at desktop (multiple full rotations on
  itself, face-on, no element vanishing, parallax still responsive) and
  confirm it is inert with `prefers-reduced-motion` and on touch.
- Verify every nav/footer link resolves to a real route (scripted crawl or
  manual list).
- Run backend tests if you touched anything backend-adjacent.

# DEPLOYMENT
- Ensure `pnpm build` (all apps), CI-compatible. The web/admin target Vercel
  with envs: web `GYTEV_API_URL`; admin `GYTEV_API_URL` + `GYTEV_API_KEY`.
  Backend targets a container + PostgreSQL/pgvector. Note: `GYTEV_CORS_ORIGINS`
  must include the production origins in production. No infra changes needed
  unless a route/env requires it.

# WORKFLOW
1. **Comprehension** — read repo, wireframe, skills, docs (MANDATORY FIRST
   STEPS above). Understand conventions before editing.
2. **Audit** — list what exists / is missing / is wrong (placeholder content,
   orphan links, i18n gaps, dead CSS, missing OG, LCP warning).
3. **Plan** — produce a concrete implementation plan; do not edit code yet.
4. **Implement** — in small verified steps: dictionaries → homepage sections
   → nav/footer fixes → orphan pages/pruning → OG image → cleanup.
5. **Validate** — run ALL gates below; fix until green; browser-verify.
6. **Polish** — visual details, spacing, motion, responsive, a11y,
   performance, code cleanliness (no dead code, no TODOs, no console.log).
7. **Finalize** — report: changed files, finished features, verification
   performed, remaining issues (if any), run instructions.

# CONSTRAINTS
- Do NOT commit unless explicitly asked.
- Do not rewrite working code for the sake of it; prefer targeted edits.
- Keep backend, admin, and packages untouched unless a required fix; if you
  must touch them, keep their checks green and document why.
- Keep the pnpm workspace/Next 16 rules (see `apps/web/AGENTS.md` — read the
  Next 16 docs under `node_modules/next/dist/docs/` before using unfamiliar
  APIs).
- Never invent customers/partners/testimonials. Use only real Gytev content
  from `content/`, dictionaries, and docs.
- Never fake verification results.

# ACCEPTANCE CRITERIA
- **Homepage content**
  Given a visitor opens `/`, When they read the homepage, Then no
  third-party company name, product, image, or logo appears (no HSBC, ASML,
  Mistral, OpenAI, ChatGPT, Viz/Studio/Forge, REDWOOD, etc.) — all content is
  genuine Gytev.
- **i18n**
  Given the site is viewed in `en` and `fr`, When switching languages, Then
  the homepage and all pages display complete, symmetric translations with no
  hardcoded strings.
- **Navigation integrity**
  Given a visitor navigates, When following any nav/footer link, Then every
  link resolves to a real page (no 404).
- **Hero quality**
  Given the homepage hero on a fine-pointer device, When the pointer moves,
  Then the visual responds via CSS custom properties without layout shift;
  on `prefers-reduced-motion` or touch devices, no parallax runs.
- **Hero coin-spin**
  Given the homepage hero on a fine-pointer device without reduced motion,
  When the page loads, Then the circular background object performs a
  continuous 3D rotation on itself (several full 360° turns, face-on, like a
  coin spinning) with true 3D depth, never vanishing mid-turn, while the
  pointer-parallax keeps working; under `prefers-reduced-motion` or on touch
  devices, no coin-spin animation runs.
- **Navbar**
  Given the sticky navbar, When the mega menu / mobile drawer / search overlay
  open, Then they close via Escape/outside-click, respect keyboard focus, and
  the logo does not trigger the `no-img-element` ESLint warning.
- **Footer**
  Given the footer, When rendered, Then the large "Gytev" wordmark is visible
  and the layout is intentional (no `hidden` hack).
- **SEO/assets**
  Given the built site, When inspected, Then `/og.png` exists and is
  referenced, sitemap/robots are valid, metadata is set per locale.
- **Quality gates**
  Given the final state, When running all checks, Then:
  `pnpm --filter @gytev/web lint && pnpm --filter @gytev/web typecheck && pnpm --filter @gytev/web build`,
  `pnpm --filter @gytev/admin build`,
  `pnpm --filter './packages/*' typecheck`,
  and (backend) `uv run ruff check app tests && uv run pytest -q` all pass.

# DEFINITION OF DONE
- All acceptance criteria above met.
- No third-party/placeholder content; no hardcoded UI strings; en/fr
  dictionaries symmetric.
- The hero coin-spin (3D, several full face-on rotations, inert under
  reduced-motion/touch) is implemented and verified.
- No dead CSS, no orphan links, no unresolved TODO, no debug output.
- Build, lint, typecheck pass for web, admin, packages; backend checks pass
  if touched.
- Responsive + keyboard + reduced-motion verified manually.
- Final report delivered (files changed, features done, verification done,
  remaining issues, run/deploy instructions).
````

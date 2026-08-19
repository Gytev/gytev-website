---
name: web-app
description: Use when working on the Next.js website (apps/web). Covers routing, i18n, components, navigation, styling, and the premium homepage redesign with hero, coin-spin animation, and parallax effects.
---

# Gytev — Site vitrine (apps/web)

Next.js **16.3.0**, React **19.2.8**, Tailwind **v4**, TypeScript strict.
Port de dev : **3000**.

## Dépendances

- Packages workspace : `@gytev/config`, `@gytev/design-system`, `@gytev/i18n`,
  `@gytev/types`, `@gytev/ui` (transpilés via `transpilePackages` dans
  `next.config.ts`)
- Dev : eslint 9 + `eslint-config-next` (core-web-vitals + typescript),
  tailwindcss 4, typescript 5

## Routing

```
src/
├── middleware.ts                 # réécriture / → /en
├── app/
│   ├── layout.tsx                # racine : fonts GT Walsheim + globals.css + tokens
│   ├── robots.ts                 # allow all + sitemap
│   ├── sitemap.ts                # sitemap en/fr
│   └── [locale]/
│       ├── layout.tsx            # Navbar + main + Footer, generateMetadata
│       ├── page.tsx              # accueil
│       ├── blog/page.tsx
│       ├── company/page.tsx
│       ├── company/vision/page.tsx
│       ├── customers/page.tsx
│       ├── developers/page.tsx
│       ├── products/page.tsx
│       ├── products/rio/page.tsx
│       ├── research/page.tsx
│       ├── solutions/page.tsx
│       └── solutions/redq/page.tsx
└── components/
    ├── SectionPage.tsx           # en-tête de section réutilisable
    └── navigation/
        ├── Navbar.tsx            # client, sticky, mega menu + mobile + search
        ├── MegaMenu.tsx          # menu déroulant 12 colonnes grid
        ├── MobileMenu.tsx        # drawer mobile
        ├── SearchOverlay.tsx     # recherche plein écran
        ├── Footer.tsx            # colonnes + grande marque + switcher
        └── LanguageSwitcher.tsx  # client, en/fr
```

## i18n

- **`en` est la locale par défaut** (URL sans préfixe) ; `fr` est préfixé
  (`/fr/...`). Helpers dans `@gytev/i18n` :
  - `localizedHref(locale, path)` — préfixe `/fr` si nécessaire
  - `getLocale(pathname)`, `stripLocale(pathname)`, `isLocale(value)`
  - `dictionaries` (en/fr) et `Dictionary` (type)
- `src/lib/i18n.ts` re-exporte les helpers et fournit
  `generateStaticParams()` et `getDictionary(locale)`.
- Layout `[locale]` appelle `generateMetadata` avec `dict.meta`.

## Contenu — deux sources

`src/lib/content.ts` :
- Importe directement les JSON : `content/en/content.json`,
  `content/fr/content.json` (type `Content = typeof en`).
- `getContent(locale)` : si `GYTEV_API_URL` est défini, fetch
  `${GYTEV_API_URL}/content/${locale}` avec `next: { revalidate: 60 }` ;
  en cas d'échec → fallback JSON local.
- `getLocalContent` / `getContentByLocale` : accès direct JSON.

`src/lib/search.ts` : index de recherche client (entries statiques +
entrées dérivées du contenu : products, solutions, research,
developerResources, blog, customers). `searchEntries(locale, query)`
= filtre par sous-chaîne (insensible casse). Utilisé par SearchOverlay
(max 8 résultats).

## Composants de navigation

- **Navbar** (client) : state `active` (mega menu au hover/click), `open`
  (mobile), `searchOpen`. Logo « G⅄TƎV » animé (keyframes `gytev-float`,
  classe `.logo-letter`). Ferme le menu au clic extérieur / Escape.
  Items depuis `navItems` de `@gytev/config` ; libellés/colonnes depuis
  `dict.nav[key]` (mega menu) avec fallback.
- **MegaMenu** : grid 12 colonnes (7 = 3 colonnes de liens, 5 = visuel),
  liens via `localizedHref`.
- **Footer** : `dict.footer.groups` (5 groupes de colonnes, façon OpenAI),
  barre du bas avec copyright + `LanguageSwitcher`.
- **SearchOverlay** : overlay centré, input auto-focus, Escape/overlay pour
  fermer, body scroll lock.

## Pages

- **Accueil** (`[locale]/page.tsx`) : hero, section « intelligence loop »,
  question centrale (4 nodes), section produit Rio (features), CTA orange.
  Utilise `dict.hero`, `dict.centralQuestion`, `dict.product`, `dict.cta`.
- **Pages sections** (`products`, `solutions`, `research`, `developers`,
  `blog`, `customers`, `company`) : rendu via `SectionPage` + grille de
  cartes issues de `getContent(locale)`.
- **Rio** (`products/rio`) : détail produit depuis `dict.product`.
- **RedQ** (`solutions/redq`) : détail solution depuis `dict.solution` +
  `pillars` codés en dur (bilingue via contenu, mais titres en dur).
- **Vision** (`company/vision`) : boucle d'intelligence en 7 étapes codée en
  dur + `dict.hero.description`.

## Style

- `globals.css` : `@import "tailwindcss"`, `@font-face` « Gytev Sans » (Regular
  + Oblique), couleur de fond/texte, animation du logo.
- `@gytev/design-system/tokens.css` importé dans le layout racine (tokens :
  primaire orange `#f97316/#ea580c`, accent vert, encres zinc, radius, fonts).
- Palette dominante : **zinc** (neutres) + **orange** (accent) + **red**
  (RedQ). Boutons pill (`rounded-full`).

## Scripts

```bash
pnpm --filter @gytev/web dev       # dev (3000)
pnpm --filter @gytev/web build     # build
pnpm --filter @gytev/web start     # prod
pnpm --filter @gytev/web lint      # eslint
pnpm --filter @gytev/web typecheck # tsc --noEmit
```

## Points d'attention

- Les `params` sont des **Promises** dans Next 16 : `const { locale } = await params`.
- Les composants interactifs (navbar, menus, recherche, switcher) sont en
  `"use client"`.
- `next-env.d.ts` est gitignoré et référencé par tsconfig.

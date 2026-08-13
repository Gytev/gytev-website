# Gytev — Packages partagés

Packages workspace pnpm (`packages/*`), version `0.1.0`, tous privés,
`"type": "module"`, export direct du source TypeScript (`exports` pointe
vers `./src/index.ts`), transpilés par Next via `transpilePackages`.

Graphe de dépendances :

```
@gytev/types  (aucune dépendance)
   ▲
   ├── @gytev/config   (types)
   ├── @gytev/i18n     (types)
   └── @gytev/ui       (types + peer react/react-dom)
           ▲
           └── @gytev/design-system  (ré-export ui)
```

Les apps web et admin dépendent de tous les packages.

---

## @gytev/types (`packages/types`)

Types TS purs, aucune dépendance. Contenu :

- `Locale = "en" | "fr"`
- Navigation : `NavLink`, `NavColumn`, `NavVisual`, `NavItem`
- Entités de contenu : `Product`, `Solution`, `ResearchTopic` (status
  `published | in-progress | internal`), `DeveloperResource` (kind
  `api | sdk | docs | graphql`), `BlogPostMeta`, `Customer`

> Note : ces types correspondent au **JSON versionné** (sans `locale`/`id`),
> pas exactement aux `Read` schemas Pydantic (qui incluent `locale`, `id`,
> timestamps). Ne pas confondre avec les types de l'admin.

## @gytev/config (`packages/config`)

- `siteConfig` : name `Gytev`, url `https://gytev.com`, description,
  ogImage `/og.png`, liens twitter/github (`https://x.com/gytev`,
  `https://github.com/gytev`)
- `navItems` : 5 items principaux (research, products, solutions, developers,
  company) — source de vérité de la barre de navigation

## @gytev/i18n (`packages/i18n`)

Référence de l'internationalisation (voir aussi `skills/web-app.md`) :

- `locales = ["en", "fr"]`, `defaultLocale = "en"`, `localeNames`
- `isLocale(value)`, `getLocale(pathname)`, `stripLocale(pathname)`,
  `localizedHref(locale, path)` (préfixe `/fr` pour la locale non-default)
- `Dictionary` : type complet (meta, nav, header, hero, centralQuestion,
  product, solution, cta, footer) — **doit être synchronisé avec les deux
  dictionnaires**
- `dictionaries` : objets `en` et `fr` **volumineux** (~800 lignes) :
  - `nav` : mega-menus à 3 colonnes + visuel par section
  - `hero`, `centralQuestion`, `product` (4 features avec tags), `solution`,
    `cta`
  - `footer` : 10 colonnes de liens (en), 10 (fr), `big`/`bigAccent`
    (grand texte « Gytev »/« Home »)

> Le `Dictionary` est la source du contenu de la home, des pages Rio/RedQ et
> de la navigation. Toute modif de structure nécessite de mettre à jour le
> type + les 2 dictionnaires.

## @gytev/ui (`packages/ui`)

Composants React de base (JSX, peer deps react/react-dom ^19) :

- `Button` — variantes `primary`/`secondary`, rend `<a>` si `href`
- `Container` — `mx-auto w-full max-w-6xl px-6 lg:px-8`
- `SectionHeading` — eyebrow + title + description centrés

## @gytev/design-system (`packages/design-system`)

- `index.ts` : re-export `* from "@gytev/ui"`
- `tokens.css` : variables CSS de design tokens (exposé sous
  `@gytev/design-system/tokens.css`) :
  - primaire orange : `--color-primary-50/100/500/600/700`
  - accent vert : `--color-accent-400/500`
  - encres zinc : `--color-ink-900/700/500/400/100`
  - surfaces, `--font-sans` (GT Walsheim Pro), `--font-mono`,
    rayons, `--container-max: 72rem`

> Les apps importent `@gytev/design-system/tokens.css` dans leur layout racine.
> Les classes Tailwind utilisent directement la palette zinc/orange/red, pas
> forcément les tokens CSS.

## Scripts communs

```bash
pnpm --filter './packages/*' typecheck   # tsc --noEmit par package
pnpm --filter './packages/*' lint        # idem (alias)
```

La CI (`.github/workflows/ci.yml`) vérifie `typecheck` sur tous les packages.

## Conventions

- Chaque package a son `tsconfig.json` strict (`moduleResolution: bundler`,
  `noEmit`, `skipLibCheck`), `jsx: react-jsx` pour ceux qui contiennent du JSX.
- Exports pointant directement vers `.ts`/`.tsx` (source) — pas de build.
- Ajouter un nouveau package workspace = dossier dans `packages/` + référence
  dans `next.config.ts` `transpilePackages` côté apps + entrée pnpm-workspace
  déjà couverte par `packages/*`.

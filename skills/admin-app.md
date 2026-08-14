# Gytev — Console d'administration (apps/admin)

Next.js **16.3.0**, React **19.2.8**, Tailwind **v4**. Port de dev : **3001**.
UI en français (libellés, messages d'erreur, sidebar).

## Rôle

CRUD complet du contenu Gytev via l'API FastAPI. Dépend du backend (pas de
fallback local). Endpoint par défaut : `http://localhost:8000/api`.

## Dépendances

- Workspace : `@gytev/config`, `@gytev/design-system`, `@gytev/types`
- Même stack dev que le web (eslint-config-next, tailwind 4, typescript 5)

## Structure

```
apps/admin/src/
├── app/
│   ├── layout.tsx              # Sidebar + Topbar + main (max-w-6xl)
│   ├── page.tsx                # Dashboard (compteurs par entité)
│   ├── api/                    # BFF (route handlers Next)
│   │   ├── health/route.ts
│   │   └── entities/
│   │       ├── [entity]/route.ts            # POST → API backend
│   │       └── [entity]/[id]/route.ts       # PATCH / DELETE → API backend
│   ├── [entity]/page.tsx       # liste (EntityTable)
│   ├── [entity]/new/page.tsx   # création (EntityForm)
│   └── [entity]/[id]/page.tsx  # édition (EntityForm)
├── components/
│   ├── EntityForm.tsx          # formulaire dynamique (client)
│   ├── EntityTable.tsx         # table : recherche + tri + suppression (client)
│   ├── Sidebar.tsx             # nav entités (client)
│   ├── Topbar.tsx              # breadcrumb + Docs API (client)
│   └── ui.tsx                  # primitives (Button, Card, Badge, PageHeader, Wordmark)
└── lib/
    ├── api.ts                  # apiFetch + apiError
    ├── cn.ts                   # cn/cx (clsx-like)
    └── entities.ts             # config déclarative des entités
```

## Config des entités (`src/lib/entities.ts`)

Modèle déclaratif `EntityConfig` :
`{ slug, label, plural, endpoint, titleField, showFields, fields }`.

`FieldConfig` : `{ name, label, kind?, required?, placeholder?, hint?, options?, defaultValue? }`
avec `kind ∈ "text" | "textarea" | "list" | "number" | "select"`.

8 entités configurées : `products`, `solutions`, `research`, `developers`,
`blog`, `customers`, `company`, `navigation` (endpoints = routes API).

- `list` → champ texte, split sur virgules dans `buildPayload`
- `number` → `Number(raw)` (0 si vide)
- `select` → options fournies (locale, status, kind)
- `published_at` vide → `null` (sinon string)

## Client API (`src/lib/api.ts`)

- `apiUrl = process.env.GYTEV_API_URL ?? "http://localhost:8000/api"`
- `apiKey = process.env.GYTEV_API_KEY ?? ""` → header `X-API-Key` si défini
- `apiFetch<T>(path, init)` : JSON, `cache: "no-store"`, gère 204 → undefined,
  throw `Error("API <status>: <body>")` si KO.
- `apiError(error)` : message ou message générique FR.

## Route handlers BFF

- `POST /api/entities/[entity]` : valide l'entité, relaye `POST` au backend,
  renvoie 201.
- `PATCH|DELETE /api/entities/[entity]/[id]` : relaye vers
  `${endpoint}/${id}`.
- `GET /api/health` : existe mais l'UI du dashboard fait directement
  `apiFetch("/admin/overview")`.
- Erreurs : `{ error: message }` avec status 400/404.

## Pages

- **Dashboard** (`page.tsx`) : `GET /admin/overview` → compteurs par entité.
  Stat cards (total, entités, langues) + grille de liens vers chaque entité.
  Si API injoignable → carte d'erreur explicative.
- **Liste** (`[entity]/page.tsx`) : `GET ${endpoint}` → `EntityTable`.
  Bannière « + Nouveau », compteur d'éléments.
- **Nouveau** (`[entity]/new/page.tsx`) : `EntityForm` sans initial.
- **Édition** (`[entity]/[id]/page.tsx`) : `GET ${endpoint}/${id}` → `EntityForm`
  avec `initial` et `id`. 404 si introuvable.

## Composants

- **EntityTable** (client) : filtre textuel sur `showFields`, tri par colonne
  (asc/desc, indicateur ↑/↓), suppression avec `window.confirm`, badges pour
  locale/status/kind/published_at. États : vide, erreur, pending delete.
- **EntityForm** (client) : valeurs stockées en `Record<string,string>`,
  validation des champs requis côté client, POST/PATCH selon présence de `id`,
  redirection + refresh après succès.
- **ui.tsx** : `buttonPrimary/buttonGhost/buttonDanger` (classes Tailwind),
  `Wordmark` (logo G⅄TƎV), `PageHeader`, `Card`, `Badge` (tones : published,
  in-progress, internal, locale, kind, neutral), `EntityIcon` (couleur par
  entité, initiale du label).
- **Sidebar** : Dashboard + 8 entités, état actif par pathname, lien Docs API.
- **Topbar** : breadcrumb Admin / Entité / id, bouton Docs API, avatar.

## Environnement

`apps/admin/.env.example` :

```
GYTEV_API_URL=http://localhost:8000/api
GYTEV_API_KEY=dev-secret-change-me
```

## Scripts

```bash
pnpm --filter @gytev/admin dev       # dev (3001)
pnpm --filter @gytev/admin build     # build
pnpm --filter @gytev/admin start     # prod (3001)
pnpm --filter @gytev/admin lint      # eslint
pnpm --filter @gytev/admin typecheck # tsc --noEmit
```

## Notes

- Les pages serveur font les appels API directement ; les handlers
  `/api/entities` font la couche de traduction/config (pour éviter d'exposer
  la clé API côté client).
- UI entièrement en français (contrairement au site public bilingue).
- La clé API est lue côté serveur uniquement (Next) et ajoutée aux requêtes
  backend.

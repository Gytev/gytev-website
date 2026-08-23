# Gytev

**Des systèmes intelligents qui comprennent le monde réel.**

Le monde physique — machines, fermes, hôpitaux, villes, réseaux d'énergie,
chaînes d'approvisionnement — génère des quantités massives de données, mais
reste largement illisible pour le logiciel. Gytev construit les systèmes qui
le **perçoivent, le comprennent, le prédisent et aident à agir** : capteurs
IoT en bord de champ, jumeaux numériques, IA prescriptive déployée dans des
environnements réels, depuis le Bénin vers le monde.

> Thèse complète : [docs/vision/README.md](docs/vision/README.md)

## Produits & solutions

| | Nom | Description | Doc |
|---|---|---|---|
| 🌾 | **Rio** | Jumeau numérique agricole : boîtier IoT embarqué sur la ferme, capteurs continus (sol, climat), recommandations d'irrigation en temps réel. | [docs/products/rio.md](docs/products/rio.md) |
| 🩸 | **RedQ** | Plateforme nationale de gestion du don du sang : traçabilité de chaque poche en temps réel entre centres, banques de sang et hôpitaux. | [docs/solutions/redq.md](docs/solutions/redq.md) |

## État du projet

**Fait :**

- ✅ Monorepo pnpm complet : site vitrine, console admin, API, packages partagés
- ✅ Site vitrine Next.js (App Router) bilingue **EN/FR**, SEO, sitemap hreflang
- ✅ Console d'administration avec CRUD complet sur tout le contenu (produits, solutions, research, developers, blog, clients, company, navigation)
- ✅ API REST FastAPI async (SQLAlchemy + PostgreSQL/pgvector), écritures protégées par clé API
- ✅ Contenu éditorial versionné (`content/en`, `content/fr`) + seed vers PostgreSQL
- ✅ CI GitHub Actions (lint, typecheck, tests, build)
- ✅ Pages Company refondues (vision, careers, contact, press…)

**En cours / prêt :**

- 🔧 Déploiement production : Supabase (PostgreSQL) · Render (API) · Vercel (web + admin) — blueprint [`render.yaml`](render.yaml) et guide [`docs/deployment.md`](docs/deployment.md) prêts, domaine `gytev.com` (Hostinger)

## Structure du monorepo

```
GYTEV/
├── apps/
│   ├── web/       # Site vitrine Next.js (App Router, i18n [locale], SEO)
│   └── admin/     # Console d'administration Next.js
├── backend/       # API FastAPI (REST, Pydantic, SQLAlchemy async)
├── packages/
│   ├── ui/            # Composants UI de base
│   ├── design-system/ # Tokens + ré-export UI
│   ├── types/         # Types TypeScript partagés
│   ├── i18n/          # Dictionnaires + routing i18n
│   └── config/        # Config du site (nav, footer, URLs)
├── content/       # Contenu éditorial (en/ + fr/)
├── infrastructure/ # Docker Compose (PostgreSQL + pgvector, backend)
├── scripts/       # bootstrap, setup, dev
├── docs/          # Documentation (voir liens plus bas)
└── render.yaml    # Blueprint Render (backend API)
```

## Documentation

| Document | Contenu |
|---|---|
| [docs/vision/README.md](docs/vision/README.md) | Vision & thèse technologique (fondation stratégique) |
| [docs/architecture.md](docs/architecture.md) | Architecture technique, couches et décisions clés |
| [docs/deployment.md](docs/deployment.md) | Déploiement Supabase · Render · Vercel · DNS Hostinger (`gytev.com`) |
| [docs/products/rio.md](docs/products/rio.md) | Rio — jumeau numérique pour l'agriculture |
| [docs/solutions/redq.md](docs/solutions/redq.md) | RedQ — plateforme nationale de gestion du don du sang |

## Prérequis

- Node.js ≥ 20
- pnpm ≥ 10 (`corepack enable`)
- Python ≥ 3.12 (recommandé : `uv`)

## Démarrage rapide

```bash
./scripts/bootstrap.sh   # installe toutes les dépendances
./scripts/dev.sh db      # PostgreSQL + pgvector via Docker
./scripts/dev.sh seed    # charge content/en|fr/content.json vers PostgreSQL
./scripts/dev.sh web     # site vitrine → http://localhost:3000
./scripts/dev.sh backend # API → http://localhost:8000/docs
./scripts/dev.sh admin   # admin → http://localhost:3001
```

## Vérification complète

```bash
./scripts/setup.sh       # install + lint + typecheck + tests + build
```

## Routes principales (web)

- `/` → redirige vers `/en`
- `/[locale]/` — accueil
- `/[locale]/products`, `/solutions`, `/research`, `/developers`, `/blog`, `/customers`, `/company`

## API backend

- `GET /api/health` — santé du service
- `GET /api/content/{locale}` — contenu assemblé (`en`/`fr`), utilisé par le site
- `GET /api/navigation` — structure de navigation
- `GET /api/products`, `/api/solutions`, `/api/research`, `/api/developers`,
  `/api/blog`, `/api/customers`, `/api/company` — lecture publique
- `POST/PATCH/DELETE` sur les mêmes routes — **écritures protégées par clé API**
  (`X-API-Key: <GYTEV_ADMIN_API_KEY>`), pour l'admin et les agents
- `GET /api/admin/overview` — compteurs du dashboard (protégé)

Docs interactives : `http://localhost:8000/docs`

## Console d'administration (`apps/admin`)

Gère tout le contenu (produits, solutions, research, developers, blog, clients,
company, navigation) avec un CRUD complet en base.

```bash
cp backend/.env.example backend/.env       # fixe GYTEV_ADMIN_API_KEY
cp apps/admin/.env.example apps/admin/.env.local
./scripts/dev.sh db && ./scripts/dev.sh seed
./scripts/dev.sh backend && ./scripts/dev.sh admin
# → http://localhost:3001
```

En production, définissez une `GYTEV_ADMIN_API_KEY` forte côté backend et la même
clé côté admin. Sans clé configurée, les écritures restent ouvertes (mode dev).

## Déploiement

Voir [docs/deployment.md](docs/deployment.md) : Supabase (base), Render (API,
blueprint [`render.yaml`](render.yaml)), Vercel (web + admin) et connexion du
domaine `gytev.com` chez Hostinger.

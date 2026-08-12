# Gytev

**Le prochain Google africain, pour le monde entier.**

Gytev construit la plateforme de recherche, d'IA et de données qui met l'Afrique
sur la carte de l'économie numérique mondiale.

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
└── docs/          # Documentation
```

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

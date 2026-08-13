# Gytev — Vue d'ensemble du projet

## Mission

> **Le prochain Google africain, pour le monde entier.**

Gytev construit la plateforme de recherche, d'IA et de données qui met
l'Afrique sur la carte de l'économie numérique mondiale.

Positionnement produit (1 phrase) :
**« Gytev builds intelligent systems that understand the real world. »**

## Produits et solutions

| Nom    | Type       | Domaine            | Description courte                                             |
| ------ | ---------- | ------------------ | -------------------------------------------------------------- |
| **Rio**   | Produit    | Agriculture (IoT)  | Jumeau numérique des exploitations. Box IoT + IA + plateforme. |
| **RedQ**  | Solution   | Santé publique     | Plateforme nationale de gestion des dons et poches de sang.    |

Détails complets : `docs/products/rio.md`, `docs/solutions/redq.md`,
`docs/vision/README.md` (thèse technologique 20 ans).

## Stack technique

### Frontend
- **Next.js 16.3.0** (App Router), **React 19.2.8**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- TypeScript strict
- Polices locales **GT Walsheim** (woff2, 7 graisses)

### Backend
- **Python 3.12+** (recommandé `uv`)
- **FastAPI 0.115+**, Pydantic v2, SQLAlchemy 2 async
- PostgreSQL 16 + **pgvector** (via Docker)
- `psycopg` v3

### Outillage
- Monorepo **pnpm 10** (workspaces `apps/*` + `packages/*`)
- `uv` pour le backend
- ESLint 9 + Prettier côté JS, Ruff côté Python
- pytest + httpx (ASGI) pour les tests backend
- GitHub Actions (CI)

## Structure du monorepo

```
gytev-website/
├── apps/
│   ├── web/       # Site vitrine Next.js (port 3000, i18n [locale], SEO)
│   └── admin/     # Console d'administration Next.js (port 3001)
├── backend/       # API FastAPI (REST, Pydantic, SQLAlchemy async)
├── packages/
│   ├── ui/            # Composants UI de base (Button, Container, SectionHeading)
│   ├── design-system/ # Tokens CSS + ré-export de @gytev/ui
│   ├── types/         # Types TypeScript partagés
│   ├── i18n/          # Dictionnaires en/fr + helpers de routing i18n
│   └── config/        # Config du site (navItems, siteConfig)
├── content/       # Contenu éditorial versionné (en/ + fr/content.json)
├── infrastructure/# Docker Compose (PostgreSQL + pgvector, backend)
├── scripts/       # bootstrap, setup, dev (orchestration locale)
├── docs/          # Vision, architecture, fiches produits
└── skills/        # Analyse du projet (ce dossier)
```

## Branches Git

- `main` — branche principale
- `feature/init` — initialisation du monorepo
- `feature/ui-refont` — branche courante (refonte UI) ; le dépôt est
  synchronisé avec `origin/feature/ui-refont`

Historique (3 commits) :
1. `091b0b3` — initialisation du monorepo (pnpm, nextjs, fastapi, tailwindcss)
2. `9b9af1d` — styles + composants web, navigation, globals, middleware
3. `b2a9a4c` — pages admin de gestion d'entités + routes API

## Étapes du projet (docs/architecture.md)

1. **Vitrine** (étape actuelle) — publier, rassurer, capter les beta users
2. **CMS headless** — éditorial sans déploiement
3. **Recherche réelle** — crawl, indexation, ranking, embeddings
4. **IA** — assistants, traduction, RAG sur données africaines

## Points d'entrée réseau

| Service   | URL                     |
| --------- | ----------------------- |
| Web       | http://localhost:3000   |
| Admin     | http://localhost:3001   |
| Backend   | http://localhost:8000   |
| Docs API  | http://localhost:8000/docs |
| PostgreSQL| localhost:5432 (gytev/gytev) |

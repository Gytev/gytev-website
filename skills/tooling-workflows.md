# Gytev — Outillage, workflows et conventions

## Prérequis

- Node.js ≥ 20, pnpm ≥ 10 (`corepack enable`)
- Python ≥ 3.12 (recommandé : `uv`)

## Scripts racine (`package.json`)

| Commande                | Action                                              |
| ----------------------- | --------------------------------------------------- |
| `pnpm dev`              | dev web (3000)                                      |
| `pnpm build`            | build de tous les apps (`pnpm -r build`)            |
| `pnpm lint`             | lint de tous les apps/packages (`pnpm -r lint`)     |
| `pnpm typecheck`        | typecheck partout (`pnpm -r typecheck`)             |
| `pnpm test`             | tests (`pnpm -r test`) — **aucun test JS défini**   |
| `pnpm backend:dev`      | `pnpm --filter @gytev/backend dev`                  |
| `pnpm format`           | `prettier --write .`                                |

## Scripts shell (`scripts/`)

### `bootstrap.sh` — installation propre

```bash
./scripts/bootstrap.sh
# pnpm install (frozen si possible) + (cd backend && uv sync)
```

### `setup.sh` — vérification complète

```bash
./scripts/setup.sh
# pnpm install → uv sync + pytest → pnpm -r lint && typecheck → pnpm build
```

### `dev.sh` — orchestration locale

```bash
./scripts/dev.sh db        # docker compose up -d db (PostgreSQL + pgvector)
./scripts/dev.sh backend   # uv run uvicorn app.main:app --reload --port 8000
./scripts/dev.sh seed      # uv run python -m app.seed
./scripts/dev.sh web       # pnpm --filter @gytev/web dev (3000)
./scripts/dev.sh admin     # pnpm --filter @gytev/admin dev (3001)
```

## Démarrage de bout en bout (admin)

```bash
cp backend/.env.example backend/.env
cp apps/admin/.env.example apps/admin/.env.local
./scripts/dev.sh db
./scripts/dev.sh seed
./scripts/dev.sh backend
./scripts/dev.sh admin
# → http://localhost:3001
```

## Infrastructure (Docker)

`infrastructure/compose.yaml` :
- `db` : `pgvector/pgvector:pg16`, gytev/gytev, volume `gytev_pgdata`,
  healthcheck `pg_isready`
- `backend` : build depuis `../backend`, env depuis `.env.example` +
  `GYTEV_DATABASE_URL` pointant vers `db`, port 8000, `--reload`

## CI (`.github/workflows/ci.yml`)

Déclenchement : push sur `main` + PR. Concurrence par ref.

4 jobs (tous sur `ubuntu-latest`, Node 20 / pnpm / cache) :
1. **web** : install → `@gytev/web` lint + typecheck + build
2. **admin** : install → `@gytev/admin` build
3. **packages** : install → `./packages/*` typecheck
4. **backend** (`working-directory: backend`, `astral-sh/setup-uv@v5`) :
   `uv sync --frozen` → `uv run ruff check app tests` → `uv run pytest -q`

## Commandes de vérification récapitulatives

| Domaine   | Commande                                      |
| --------- | --------------------------------------------- |
| JS lint   | `pnpm --filter @gytev/web lint`, `... admin`  |
| TS        | `pnpm --filter @gytev/web typecheck`, `... admin`, `pnpm --filter './packages/*' typecheck` |
| Python    | `cd backend && uv run ruff check app tests && uv run pytest -q` |
| Build     | `pnpm build`                                  |
| Global    | `./scripts/setup.sh`                          |

## Conventions de code

### JavaScript / TypeScript
- App Router, composants serveur par défaut ; `"use client"` uniquement pour
  l'interactivité.
- `params` sont des Promises dans Next 16 (`await params`).
- Path alias `@/*` → `src/*` (web et admin).
- Imports workspace par nom de package (`@gytev/*`), jamais par chemin relatif
  vers `packages/`.
- ESLint : `eslint-config-next` core-web-vitals + typescript, ignore `.next`.
- Prettier en devDependency racine (format global).

### Python
- Ruff (sélect : E, F, I, UP, B ; line-length 100 ; target py312).
- Type hints partout (PEP 695 génériques utilisés : `content_router[ModelT]`).
- Async-first (SQLAlchemy async, FastAPI lifespan).

### Git
- 3 commits historiques, messages courts et explicites (style type: description).
- `.env*` gitignorés (sauf `.env.example`), `next-env.d.ts` gitignoré,
  `package-lock.json` **non suivi** (utiliser pnpm, pas npm).
- Branches courantes : `main`, `feature/init`, `feature/ui-refont`.

## Pièges connus / points de vigilance

1. `package-lock.json` traîne à la racine (non suivi) — ne pas l'utiliser ni
   le committer ; tout passe par `pnpm-lock.yaml`.
2. `pnpm test` n'exécute rien côté JS (pas de runner configuré) — les tests
   réels sont côté backend (pytest).
3. Pas de migrations Alembic : `create_all` au lifespan. Toute évolution de
   schéma nécessite `seed --reset` ou un reset du volume docker
   (`docker compose down -v`).
4. Le contenu affiché dépend de deux sources (API + JSON). Si l'API renvoie
   des données, le JSON est ignoré (sauf fallback).
5. Les deux dictionnaires i18n (`en`/`fr`) doivent rester symétriques avec le
   type `Dictionary`.
6. La clé admin API est partagée backend ↔ admin via `.env` ; la définir en
   prod pour sécuriser les écritures.

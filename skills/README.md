# Skills — Contexte projet Gytev

Ce dossier contient l'analyse complète du monorepo **Gytev**. Il sert de
mémoire de contexte pour les tâches à venir (développement, bugfix, refonte,
nouveaux produits, etc.).

## Index des fichiers

| Fichier                       | Contenu                                              |
| ----------------------------- | ---------------------------------------------------- |
| `project-overview.md`         | Vision, mission, produits, stack, structure générale |
| `architecture.md`             | Architecture technique, flux de données, décisions   |
| `backend.md`                  | API FastAPI : modèles, schémas, routes, auth, seed   |
| `web-app.md`                  | Site vitrine Next.js : routing, i18n, composants     |
| `admin-app.md`                | Console d'administration Next.js                     |
| `packages.md`                 | Packages partagés : types, ui, design-system, i18n   |
| `content.md`                  | Contenu éditorial, docs produits, vision             |
| `tooling-workflows.md`        | Scripts, CI, commandes, conventions de code          |

## Règles d'or du projet

1. **Monorepo pnpm** — ne jamais modifier `pnpm-lock.yaml` à la main, toujours
   passer par `pnpm install`.
2. **Backend en Python 3.12+ / uv** — jamais de `pip install` seul ; toujours
   `uv sync` puis `uv run`.
3. **i18n par route `/[locale]`** — toute nouvelle page doit vivre sous
   `apps/web/src/app/[locale]/...` et utiliser les helpers du package
   `@gytev/i18n` (`localizedHref`, `generateStaticParams`, `getDictionary`).
4. **Deux sources de contenu** : JSON versionné (`content/en|fr/content.json`)
   et API FastAPI (`GET /api/content/{locale}`). Le web fait un fallback
   JSON si l'API est indisponible.
5. **Écritures admin protégées** par clé API (`X-API-Key` / `GYTEV_ADMIN_API_KEY`).
6. **Ne jamais committer** de secrets (`.env*` est gitignoré, seuls les
   `.env.example` sont versionnés).
7. **Vérification** avant de conclure une tâche : `./scripts/setup.sh`
   (pytest + lint + typecheck + build) ou au minimum `pnpm -r lint &&
   pnpm -r typecheck` côté JS et `uv run pytest -q` + `uv run ruff check` côté backend.

## Remarque

Ces fichiers sont générés à partir de l'état actuel du dépôt
(commit `b2a9a4c` — branche `feature/ui-refont`). Ils doivent être mis à jour
à mesure que le projet évolue.

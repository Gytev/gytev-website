# Gytev — Architecture technique

Source de référence : `docs/architecture.md` et `README.md`.

## Couches

| Couche    | Techno                                       | Rôle                                  |
| --------- | -------------------------------------------- | ------------------------------------- |
| Web       | Next.js App Router + Tailwind v4             | Site vitrine, SEO, i18n, sitemap      |
| Admin     | Next.js (port 3001)                          | Console interne de gestion de contenu |
| Backend   | FastAPI + Pydantic + SQLAlchemy async        | API REST du contenu                   |
| Données   | PostgreSQL 16 + pgvector                     | Données relationnelles + embeddings   |
| Contenu   | `content/en`, `content/fr` (JSON)            | Contenu éditorial versionné           |

## Flux de données

```
content/en|fr/content.json
        │  (versionné dans le repo)
        ▼
   backend/app/seed.py ──► PostgreSQL (via pgvector)
        │
        ▼
   API FastAPI /api/content/{locale}  (GET public)
        │
        ▼
   apps/web (fetch avec revalidate: 60)
        │   si API KO → fallback JSON local (apps/web/src/lib/content.ts)
        ▼
   Pages [locale] + composants
```

Le web peut fonctionner **sans le backend** grâce au fallback JSON.
L'admin, en revanche, **dépend du backend** (CRUD complet via l'API).

## Décisions clés (architectural decision records informels)

1. **i18n par route `/[locale]`** — SEO multilingue propre (hreflang via
   sitemap). `en` est la locale par défaut (pas de préfixe), `fr` est préfixée.
2. **Monorepo pnpm** — un seul lockfile, packages partagés typés.
3. **Contenu versionné** tant que le CMS headless n'est pas requis ;
   migration vers Sanity prévue **sans changement de route**.
4. **pgvector dès le départ** — colonnes embeddings prêtes pour le RAG sans
   coût de migration ultérieur.
5. **Pas de K8s pour l'instant** — Vercel (web/admin) + conteneur simple
   (backend). Terraform/Kubernetes quand la charge l'exige.

## Middleware i18n (apps/web/src/middleware.ts)

- Si le premier segment n'est pas une locale (`en`/`fr`), réécrit l'URL vers
  `/${defaultLocale}${path}` (`/` → `/en`).
- Matcher : `/((?!_next|api|.*\\..*).*)` — n'intercepte pas `_next`, les
  routes API ni les fichiers avec extension.

## SEO

- `apps/web/src/app/sitemap.ts` : génère le sitemap pour `en` (sans préfixe)
  et `fr` (préfixé), 8 chemins, base `https://gytev.com`.
- `apps/web/src/app/robots.ts` : allow all + référence sitemap.xml.
- Métadonnées par locale dans le layout `[locale]/layout.tsx`.

## Génération statique

- `apps/web/src/lib/i18n.ts` exporte `generateStaticParams()` :
  `locales.map(locale => ({ locale }))` → les pages `[locale]` sont
  générées en statique pour `en` et `fr`.

## Visions futur (feuille de route)

1. Vitrine (courant)
2. CMS headless (Sanity) — éditorial sans déploiement
3. Recherche réelle — crawl, indexation, ranking, embeddings (pgvector)
4. IA — assistants, traduction, RAG sur données africaines

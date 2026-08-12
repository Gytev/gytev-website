# Gytev — Architecture

## Vision

Gytev vise à devenir le moteur de recherche et la plateforme d'IA de référence
pour l'Afrique, puis le monde. La vitrine (`apps/web`) est le point d'entrée
public ; le backend sert le contenu et (plus tard) la recherche, les embeddings
et l'IA.

## Couches

| Couche      | Techno                              | Rôle                                   |
| ----------- | ----------------------------------- | -------------------------------------- |
| Web         | Next.js App Router + Tailwind v4    | Site vitrine, SEO, i18n, sitemap       |
| Admin       | Next.js                             | Console interne (CMS Sanity à venir)   |
| Backend     | FastAPI + Pydantic + SQLAlchemy async | API REST du contenu                    |
| Données     | PostgreSQL + pgvector               | Données relationnelles + embeddings    |
| Contenu     | `content/en`, `content/fr` (JSON)   | Contenu éditorial versionné            |

## Décisions clés

- **i18n par route** `/[locale]` : SEO multilingue propre (hreflang via sitemap).
- **Monorepo pnpm** : un seul lockfile, packages partagés typés.
- **Contenu versionné** dans le repo tant que le CMS headless n'est pas requis ;
  migration vers Sanity prévue sans changement de route.
- **pgvector dès le départ** : colonnes embeddings prêtes pour le RAG sans
  coût de migration ultérieur.
- **Pas de K8s pour l'instant** : Vercel (web/admin) + conteneur simple
  (backend). Terraform/Kubernetes quand la charge l'exige.

## Feuille de route indicative

1. **Vitrine** (courant) — publier, rassurer, capter les beta users.
2. **CMS headless** — éditorial sans déploiement.
3. **Recherche réelle** — crawl, indexation, ranking, embeddings.
4. **IA** — assistants, traduction, RAG sur données africaines.

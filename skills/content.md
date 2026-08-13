# Gytev — Contenu éditorial & documentation produit

## Contenu versionné (`content/`)

Deux fichiers JSON structurés de façon identique :
`content/en/content.json` et `content/fr/content.json`.

Structure :

```jsonc
{
  "products": [ { "slug", "name", "tagline", "description", "href" } ],
  "solutions": [ { "slug", "name", "description", "href" } ],
  "research": [ { "slug", "title", "summary", "status", "href" } ],
  "developerResources": [ { "slug", "title", "description", "kind", "href" } ],
  "blog": [ { "slug", "title", "excerpt", "date", "author", "tags" } ],
  "customers": [ { "slug", "name", "sector", "country", "quote" } ],
  "company": { "about", "story", "vision", "newsroom", "careers", "contact" }
}
```

### Contenu actuel (en)

- **1 produit** : Rio (digital twin agriculture, href `/products/rio`)
- **1 solution** : RedQ (sang, href `/solutions/redq`)
- **3 topics de recherche** : digital-twins (in-progress),
  predictive-systems (in-progress), language-ai (published)
- **3 ressources dev** : api, sdks, status
- **2 posts de blog** : « Intelligence for the real world » (2026-06-01),
  « What a digital twin tells a farmer » (2026-07-12)
- **2 clients** : Coopérative du Sahel (Burkina Faso, agriculture),
  Banque de Sang de Dakar (Sénégal, santé publique)
- **company** : about, story, vision, newsroom, careers, contact

Le fichier `fr` est la traduction complète de `en`.

> **Attention** : le web lit ce JSON **directement** (import) pour le fallback
> et via l'API (`/api/content/{locale}`) pour la source principale. Le seed
> (`app/seed.py`) le charge en base. Les `date` des blog posts sont parsées
> en `published_at` (format ISO).

## Documentation produit (`docs/`)

### `docs/vision/README.md` — Thèse technologique (version 2.0, 20 ans)

Document stratégique (43 sections) définissant Gytev :
- **Idée centrale** : systèmes intelligents qui comprennent le monde réel.
- **La boucle d'intelligence** : Observe → Collect → Understand → Analyze →
  Predict → Decide → Act → Learn (boucle continue).
- **Cinq questions produit** : observe / comprend / prédit / optimise /
  décide (produit = intelligence + issue tangible).
- **Vision** : 5 ans (product→platform), 10 ans (global tech co), 20 ans
  (intelligence layer for the real world, horizon 2046).
- **Positionnement** : « Gytev builds intelligent systems that understand
  the real world » ; « Complexity inside, simplicity at the interface ».
- **Afrique** : point de départ, pas la limite de l'ambition.

### `docs/products/rio.md` — Fiche produit Rio (bilingue en/fr)

- Problème : décisions agricoles sans info précise sur la parcelle.
- Solution : IoT Box (humidité sol, température, humidité air, luminosité,
  pluviométrie, pH option, conductivité option, niveau d'eau option).
- IA : combine données box + historique + météo + satellite (Sentinel,
  Landsat) + bases agronomiques + connaissance cultures.
- Exemple : maïs en floraison + chute d'humidité + semaine sans pluie →
  risque stress hydrique élevé, perte ~18 %, irrigation sous 24 h.
- Objectif réel : assistant intelligent de décision (4 questions).
- Innovation : combinaison IoT + IA + jumeau numérique (simulations).

### `docs/solutions/redq.md` — Fiche solution RedQ (bilingue en/fr)

- Problème : suivi fragmenté des dons, pas de visibilité nationale, risque
  péremption/rupture, coordination lente, adéquation offre/demande urgente.
- Solution : plateforme nationale de gestion des dons et poches de sang —
  donneurs, traçabilité de chaque poche (type, groupe, statut, péremption),
  stock national, demande/distribution, tableaux de bord + alertes.
- Intelligence : prévoir pénuries par groupe sanguin, demande croissante,
  redistribution, décisions.

### `docs/architecture.md` — Architecture (voir `skills/architecture.md`)

## Relations entre les sources de contenu

| Couche                    | Fichiers / endpoints                          |
| ------------------------- | --------------------------------------------- |
| JSON versionné            | `content/en/content.json`, `content/fr/content.json` |
| Types TS (JSON)           | `packages/types/src/index.ts`                 |
| Dictionnaires UI (web)    | `packages/i18n/src/index.ts` (`dictionaries`) |
| Schémas API (Pydantic)    | `backend/app/schemas/schemas.py`              |
| Modèles DB                | `backend/app/models/models.py`                |
| Config admin (formulaires)| `apps/admin/src/lib/entities.ts`              |
| Recherche site            | `apps/web/src/lib/search.ts`                  |

Ajouter une nouvelle entité de contenu implique d'aligner : le JSON en/fr,
le seed, les modèles + schémas backend, la route CRUD, la config admin, et
éventuellement les types TS partagés et l'index de recherche.

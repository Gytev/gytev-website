# Gytev — Backend FastAPI

Dossier : `backend/` — projet Python **3.12+**, géré avec **uv**
(`pyproject.toml` + `uv.lock`).

## Dépendances principales

- `fastapi>=0.115`, `uvicorn[standard]>=0.32`
- `pydantic>=2.9`, `pydantic-settings>=2.6`
- `sqlalchemy>=2.0`, `psycopg[binary]>=3.2`
- `pgvector>=0.3`

Dev : `pytest>=8.3`, `pytest-asyncio>=0.24`, `httpx>=0.27`, `aiosqlite>=0.20`,
`ruff>=0.7`.

## Configuration (`app/core/config.py`)

`Settings` via `pydantic-settings`, préfixe d'env **`GYTEV_`**, fichier `.env`
dans `backend/`.

| Variable               | Défaut                                             | Rôle                            |
| ---------------------- | -------------------------------------------------- | ------------------------------- |
| `GYTEV_APP_NAME`       | `Gytev API`                                        | Titre FastAPI                   |
| `GYTEV_ENVIRONMENT`    | `development`                                      | Environnement                   |
| `GYTEV_DEBUG`          | `true`                                             | Debug (active l'echo SQL)       |
| `GYTEV_DATABASE_URL`   | `postgresql+psycopg://gytev:gytev@localhost:5432/gytev` | Connexion PostgreSQL     |
| `GYTEV_CORS_ORIGINS`   | `["http://localhost:3000", "http://localhost:3001"]` | Origines CORS autorisées |
| `GYTEV_ADMIN_API_KEY`  | `""` (vide)                                        | Clé API des écritures admin     |

**Sécurité** (`app/core/security.py`) : `require_api_key` compare le header
`X-API-Key` (comparaison constante). Si la clé configurée est vide, l'auth est
**désactivée** (mode dev).

**Base** (`app/core/database.py`) : moteur async, `SessionLocal`, `Base`
(DeclarativeBase), `get_db` (dépendance FastAPI). `create_all` à la
déclaration du lifespan (pas de migrations Alembic pour l'instant).

## Modèles (`app/models/models.py`)

Tous héritent de `TimestampMixin` (`created_at`, `updated_at` avec
`server_default=func.now()`). Chaque entité de contenu a une contrainte
`UniqueConstraint(locale, slug)`.

| Modèle                | Table               | Champs clés                                                |
| --------------------- | ------------------- | ---------------------------------------------------------- |
| `Product`             | `products`          | locale, slug, name, tagline, description, href             |
| `Solution`            | `solutions`         | locale, slug, name, description, industries (JSON), href   |
| `ResearchTopic`       | `research_topics`   | locale, slug, title, summary, status, href                 |
| `DeveloperResource`   | `developer_resources`| locale, slug, title, description, kind, href               |
| `BlogPost`            | `blog_posts`        | locale, slug, title, excerpt, author, tags (JSON), published_at |
| `Customer`            | `customers`         | locale, slug, name, sector, country, quote                 |
| `CompanySection`      | `company_sections`  | locale, key (UniqueConstraint locale+key), title, content  |
| `NavigationItem`      | `navigation_items`  | key (Unique), label, href, sort_order                      |

Tous les IDs sont des `UUID` (défaut `uuid4`).

## Schémas Pydantic (`app/schemas/schemas.py`)

Triplet par entité : `*Create` (validation complète), `*Update` (tous champs
optionnels), `*Read` (hérite de `ReadBase`: id, created_at, updated_at ;
`from_attributes=True`).

Contraintes notables (regex Pydantic) :
- `ResearchTopic.status` ∈ `^(published|in-progress|internal)$`
- `DeveloperResource.kind` ∈ `^(api|sdk|docs|graphql)$`
- `ContentBundle` : assemblage d'une locale (products, solutions, research,
  developerResources, blog, customers, company `dict[str, Any]`)
- `Overview` : compteurs pour le dashboard admin

## API — fabrique CRUD (`app/api/crud.py`)

`content_router()` génère un routeur REST complet pour tout modèle `TimestampMixin` :
- `GET /` — liste, filtre optionnel `?locale=`
- `GET /{item_id}` — détail (404 si absent, via `get_or_404`)
- `POST /` — création (201), protégée `Depends(require_api_key)`
- `PATCH /{item_id}` — mise à jour partielle, protégée
- `DELETE /{item_id}` — suppression (204), protégée

Les erreurs d'intégrité (doublon locale+slug, etc.) → HTTP 400 avec le
message de l'exception.

## Routes (`app/api/routes/`)

Chaque route d'entité est une simple instanciation de `content_router` :

| Fichier       | Route           | Modèle            |
| ------------- | --------------- | ----------------- |
| `health.py`   | `GET /api/health` | — (statut ok)    |
| `content.py`  | `GET /api/content/{locale}` | — (bundle assemblé) |
| `admin.py`    | `GET /api/admin/overview` | — (compteurs, protégé) |
| `navigation.py` | `/api/navigation` | NavigationItem   |
| `products.py` | `/api/products` | Product           |
| `solutions.py`| `/api/solutions`| Solution          |
| `research.py` | `/api/research` | ResearchTopic     |
| `developers.py`| `/api/developers` | DeveloperResource |
| `blog.py`     | `/api/blog`     | BlogPost          |
| `customers.py`| `/api/customers`| Customer          |
| `company.py`  | `/api/company`  | CompanySection    |

Toutes sont montées sous le préfixe `/api` (`app/api/__init__.py`).

`content.py` : valide la locale ∈ {en, fr} (sinon 404), assemble les listes
par locale + company en dict `{key: content}`.

`admin.py` : `MODELS = { "products": Product, ..., "navigation": NavigationItem }`,
le routeur entier dépend de `require_api_key`.

## Seed (`app/seed.py`)

Lit `content/en|fr/content.json` et insère les lignes manquantes
(idempotent). Usage :

```bash
uv run python -m app.seed            # insère uniquement ce qui manque
uv run python -m app.seed --reset    # vide puis re-insert tout
```

- `--reset` supprime les lignes des 8 tables puis re-seed.
- Navigation seedée depuis `NAV_ITEMS` codé en dur (research, products,
  solutions, developers, company).
- `published_at` parsé via `datetime.fromisoformat` (échec silencieux → None).
- Company : chaque entrée `{key: text}` du JSON devient un `CompanySection`.

## Tests (`backend/tests/`)

Conftest : fixture `client` (httpx ASGITransport) sur **SQLite en mémoire**
(aiosqlite, StaticPool) + `Base.metadata.create_all`. L'auth est désactivée
par défaut via `monkeypatch` sur `security.get_settings`.

- `test_health.py` : /api/health, /api/navigation vide, /
- `test_auth.py` : écritures 401 sans clé / mauvaise clé, 201 avec la bonne ;
  lectures publiques
- `test_crud.py` : CRUD complet produit, 404, filtre locale, bundle content,
  locale non supportée (404), overview

Lancer : `uv run pytest -q` ; lint : `uv run ruff check app tests`.

## Environnement

`backend/.env.example` :

```
DATABASE_URL=postgresql+psycopg://gytev:gytev@localhost:5432/gytev
GYTEV_ENVIRONMENT=development
GYTEV_DEBUG=true
GYTEV_CORS_ORIGINS=["http://localhost:3000","http://localhost:3001"]
GYTEV_ADMIN_API_KEY=dev-secret-change-me
```

## Docker

`backend/Dockerfile` : image `python:3.12-slim`, installe FastAPI/uvicorn/
SQLAlchemy/psycopg/pydantic-settings via pip, `CMD uvicorn app.main:app`.
Le compose (infrastructure/) monte le backend avec le DB.

## Points d'attention

- **Pas de migrations** : le schéma est créé par `create_all` au démarrage.
  Modifier un modèle nécessite de dropper/re-créer ou d'ajouter Alembic.
- `echo=settings.debug` active le log SQL en dev (bruit en console).
- En production, `GYTEV_ADMIN_API_KEY` doit être définie et forte, sinon les
  écritures sont ouvertes.

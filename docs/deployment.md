# Déploiement Gytev — Supabase · Render · Vercel · Hostinger

Architecture cible :

| Composant | Plateforme | URL finale |
|---|---|---|
| Site web (`apps/web`) | Vercel | `https://gytev.com` + `https://www.gytev.com` |
| Admin (`apps/admin`) | Vercel | `https://admin.gytev.com` |
| API FastAPI (`backend`) | Render | `https://api.gytev.com` |
| PostgreSQL (+pgvector) | Supabase | — (interne) |
| DNS | Hostinger | `gytev.com` |

---

## 1. Supabase (base de données)

1. Créer un projet sur [supabase.com](https://supabase.com) → nom : `gytev-prod`, région : `eu-west`/`eu-central` (la plus proche), mot de passe DB **fort** (le noter).
2. Récupérer la chaîne de connexion : *Project Settings → Database → Connection string → URI*, onglet **Session pooler** (port **5432**).
3. La convertir au format SQLAlchemy async (driver `psycopg`) :

   ```
   postgresql+psycopg://postgres.<project-ref>:<MOT_DE_PASSE>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require
   ```

4. Les tables sont créées automatiquement au démarrage de l'API (`Base.metadata.create_all`, cf. `backend/app/main.py:17`).
5. (Optionnel) Peupler le contenu : depuis `backend/`, avec `GYTEV_DATABASE_URL` pointant vers Supabase :
   ```bash
   uv run python -m app.seed --reset
   ```
6. ⚠️ Si le code utilise l'extension `pgvector` plus tard : SQL Editor → `CREATE EXTENSION IF NOT EXISTS vector;`

## 2. Render (backend API)

Le blueprint [`render.yaml`](../render.yaml) est prêt à la racine du repo.

1. Pousser le repo sur GitHub (`Gytev/gytev-website`).
2. [dashboard.render.com](https://dashboard.render.com) → **New → Blueprint** → sélectionner le repo → Render détecte `render.yaml`.
3. À la création, renseigner :
   - `GYTEV_DATABASE_URL` = chaîne Supabase de l'étape 1.
   - `GYTEV_ADMIN_API_KEY` = clé forte (sinon Render en génère une).
4. Déployer. Health check : `/api/health`. Docs : `https://<service>.onrender.com/docs`.
5. **Domaine custom** : Service → *Settings → Custom Domains* → ajouter `api.gytev.com`.
6. ⚠️ Plan gratuit : le service s'endort après 15 min d'inactivité (cold start ~30 s). Passer au plan Starter pour la prod.

## 3. Vercel (web + admin)

Deux projets, même repo, monorepo pnpm :

### Projet « gytev-web »
1. [vercel.com/new](https://vercel.com/new) → importer `Gytev/gytev-website`.
2. Settings :
   - **Root Directory** : `apps/web`
   - Framework : Next.js (auto) — Build : `pnpm build` (par défaut OK)
   - Node.js 20.x
3. Variables d'environnement :
   - `GYTEV_API_URL` = `https://api.gytev.com/api`
   - `GYTEV_API_KEY` = la clé admin (si consommée côté serveur)
4. Deploy.

### Projet « gytev-admin »
Idem avec **Root Directory** : `apps/admin`.

> Le site retombe automatiquement sur `content/*.json` versionné si l'API est indisponible (`apps/web/src/lib/content.ts`).

## 4. Hostinger (DNS gytev.com)

Dans hPanel → *Domaines → gytev.com → DNS / Nameservers*. Ajouter puis supprimer les enregistrements par défaut de Hostinger sur `@` et `www` si présents.

| Type | Nom | Valeur | Usage |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Apex → Vercel web |
| CNAME | `www` | `cname.vercel-dns.com.` | WWW → Vercel web |
| CNAME | `admin` | `cname.vercel-dns.com.` | Admin → Vercel admin |
| CNAME | `api` | `gytev-api.onrender.com.` | API → Render |

> ⚠️ Utiliser les valeurs **exactes affichées dans les dashboards** Vercel/Render après ajout des domaines custom (elles prévalent en cas de mise à jour des IPs). TTL : 3600.

Ensuite, dans chaque dashboard :
- **Vercel** : Project → *Settings → Domains* → ajouter `gytev.com`, `www.gytev.com` / `admin.gytev.com` → attendre la validation (certificat SSL auto).
- **Render** : *Custom Domain* `api.gytev.com` → certificat TLS auto.

## 5. Checklist post-déploiement

- [ ] `https://api.gytev.com/api/health` → `{"status": "ok"}`
- [ ] `https://gytev.com` sert le contenu depuis Postgres (logs Vercel ou modifier un produit via l'admin et vérifier)
- [ ] CORS : `GYTEV_CORS_ORIGINS` inclut bien les 3 domaines finaux
- [ ] `GYTEV_DEBUG=false`, `GYTEV_ENVIRONMENT=production` sur Render
- [ ] Secrets hors du repo (`ADMIN_API_KEY`, mot de passe Supabase)
- [ ] HTTPS actif sur les 4 hostnames (SSL auto)

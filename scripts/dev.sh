#!/usr/bin/env bash
# Dev: web (3000), admin (3001), backend (8000) + postgres.
set -euo pipefail
cd "$(dirname "$0")/.."

case "${1:-}" in
  db)
    docker compose -f infrastructure/compose.yaml up -d db
    ;;
  backend)
    cd backend && uv run uvicorn app.main:app --reload --port 8000
    ;;
  seed)
    cd backend && uv run python -m app.seed
    ;;
  web)
    pnpm --filter @gytev/web dev
    ;;
  admin)
    pnpm --filter @gytev/admin dev
    ;;
  *)
    echo "Usage: ./scripts/dev.sh [db|backend|seed|web|admin]"
    exit 1
    ;;
esac

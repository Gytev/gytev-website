#!/usr/bin/env bash
# Bootstrap the whole monorepo: install deps + verify everything.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▶ pnpm install"
pnpm install

echo "▶ Backend (uv)"
(cd backend && uv sync --quiet && uv run pytest -q)

echo "▶ Root lint + typecheck"
pnpm -r lint && pnpm -r typecheck

echo "▶ Build"
pnpm build

echo "✔ Everything checks out."

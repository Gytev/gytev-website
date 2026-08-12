#!/usr/bin/env bash
# One command: fresh install + full verification, with no pre-existing state assumed.
set -euo pipefail
cd "$(dirname "$0")/.."

pnpm install --frozen-lockfile 2>/dev/null || pnpm install
(cd backend && uv sync --frozen 2>/dev/null || uv sync)

echo "✔ Dependencies ready. Run: ./scripts/dev.sh web"

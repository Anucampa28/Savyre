#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

python3 -m venv .venv || true
source .venv/bin/activate
pip install -U pip wheel
pip install -r requirements.txt

export PYTHONPATH="$SCRIPT_DIR"

# Load .env if present
export $(grep -v '^#' .env 2>/dev/null | xargs -I {} echo {}) >/dev/null 2>&1 || true

# Default to Postgres via docker-compose if DATABASE_URL not set
if [ -z "${DATABASE_URL:-}" ]; then
  export DATABASE_URL="postgresql+psycopg2://laksham:laksham@localhost:5432/laksham"
fi

# Run migrations
alembic upgrade head || true

uvicorn app.main:app --reload --host 0.0.0.0 --port 8001



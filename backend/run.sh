#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

python3 -m venv .venv || true
source .venv/bin/activate
pip install -U pip wheel
pip install -r requirements.txt

export PYTHONPATH="$SCRIPT_DIR"

export $(grep -v '^#' .env 2>/dev/null | xargs -I {} echo {}) >/dev/null 2>&1 || true

uvicorn app.main:app --reload --host 0.0.0.0 --port 8001



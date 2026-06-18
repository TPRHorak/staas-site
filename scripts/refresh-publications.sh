#!/bin/bash
#
# refresh-publications.sh
# -----------------------------------------------------------------------------
# Runs the publications fetch, then commits + pushes the refreshed snapshot if
# it changed. Designed to be run unattended by a macOS launchd agent (see
# ~/Library/LaunchAgents/io.allshapes.staas-refresh-publications.plist).
#
# It runs LOCALLY rather than in CI on purpose: Substack/Cloudflare hard-blocks
# datacenter IPs (GitHub Actions, Vercel, public proxies all get HTTP 403), so
# the only reliable place to fetch the feed is this machine's residential IP.
#
# Manual run:  bash scripts/refresh-publications.sh
# -----------------------------------------------------------------------------
set -uo pipefail

# Absolute paths — launchd runs with a minimal PATH.
NODE="/opt/homebrew/bin/node"
GIT="/usr/bin/git"

REPO="/Users/tprhorak/Desktop/Startup as a Service StaaS/staas-site"
SNAPSHOT="src/data/publications.json"
LOG_PREFIX="[refresh $(date '+%Y-%m-%d %H:%M:%S')]"

cd "$REPO" || { echo "$LOG_PREFIX cannot cd to repo"; exit 1; }

echo "$LOG_PREFIX starting"

# Stay current with the remote so the push doesn't diverge.
"$GIT" pull --rebase --autostash origin main >/dev/null 2>&1 || \
  echo "$LOG_PREFIX warning: git pull failed (continuing)"

# Fetch the feed + cover images into the snapshot. On failure the script keeps
# the previous JSON, so we just log and exit without committing.
if ! "$NODE" scripts/fetch-publications.mjs; then
  echo "$LOG_PREFIX fetch failed — keeping previous snapshot, nothing to commit"
  exit 1
fi

if "$GIT" diff --quiet -- "$SNAPSHOT"; then
  echo "$LOG_PREFIX no change in $SNAPSHOT — done"
  exit 0
fi

"$GIT" add "$SNAPSHOT"
"$GIT" commit -q -m "chore: refresh publications snapshot" \
  -m "Automated daily refresh (local launchd agent)."
if "$GIT" push origin main >/dev/null 2>&1; then
  echo "$LOG_PREFIX pushed refreshed snapshot ✓"
else
  echo "$LOG_PREFIX commit made but push failed — will retry next run"
  exit 1
fi

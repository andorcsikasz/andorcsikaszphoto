#!/bin/bash
# Auto-commit: runs forever, commits changes every 60s
# Usage: ./auto-commit.sh           # commit only
#        AUTO_PUSH=1 ./auto-commit.sh   # commit + push
#        AUTO_COMMIT_INTERVAL=30 ./auto-commit.sh   # every 30s
# Run in background: nohup ./auto-commit.sh > auto-commit.log 2>&1 &

cd "$(dirname "$0")"
INTERVAL=${AUTO_COMMIT_INTERVAL:-60}
AUTO_PUSH=${AUTO_PUSH:-0}

echo "Auto-commit started (interval: ${INTERVAL}s, push: ${AUTO_PUSH})"
echo "Press Ctrl+C to stop"
echo ""

while true; do
  if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
    git add -A
    
    if ! git diff --cached --quiet 2>/dev/null; then
      COMMIT_MSG="auto: $(date '+%Y-%m-%d %H:%M')"
      git commit -m "$COMMIT_MSG"
      echo "[$(date '+%H:%M:%S')] Committed: $COMMIT_MSG"
      
      if [ "$AUTO_PUSH" = "1" ]; then
        git push origin main 2>/dev/null && echo "  -> Pushed to origin" || echo "  -> Push skipped (auth?)"
      fi
    fi
  fi
  
  sleep "$INTERVAL"
done

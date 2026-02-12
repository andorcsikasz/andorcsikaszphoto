#!/bin/bash
# Deploy P1 vibecheck to Railway
# Project: https://railway.com/project/6defe194-1787-4889-a0c6-b2998339a87d/service/37434b64-1c69-406d-9888-abb4a6ca48d2
#
# First time: run `npx @railway/cli login` (opens browser)

set -e
cd "$(dirname "$0")"

echo "→ Linking to Railway project..."
npx @railway/cli link \
  --project 6defe194-1787-4889-a0c6-b2998339a87d \
  --service 37434b64-1c69-406d-9888-abb4a6ca48d2 \
  --environment 115caffd-0ceb-4285-8fde-0c8942c79ee7

echo ""
echo "→ Deploying P1 vibecheck..."
npx @railway/cli up --detach

echo ""
echo "✓ Deploy triggered. Check status:"
echo "  https://railway.com/project/6defe194-1787-4889-a0c6-b2998339a87d/service/37434b64-1c69-406d-9888-abb4a6ca48d2"

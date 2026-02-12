#!/bin/bash

# Script to publish project to GitHub
# Usage: ./publish-to-github.sh YOUR_GITHUB_USERNAME REPO_NAME

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./publish-to-github.sh YOUR_GITHUB_USERNAME REPO_NAME"
    echo "Example: ./publish-to-github.sh johndoe premium-cleaning-booking"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2

echo "🚀 Publishing to GitHub..."
echo "Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists. Removing it..."
    git remote remove origin
fi

# Add remote
echo "📡 Adding remote..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Verify remote
echo "✅ Verifying remote..."
git remote -v

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Done! Your code is now on GitHub!"
echo "🌐 View it at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"


#!/bin/bash

# Script to fix GitHub repository and Railway deployment
# Your GitHub username: andorcsikasz

echo "🔧 Fixing GitHub repository connection..."

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists. Removing it..."
    git remote remove origin
fi

# Add the correct remote
echo "📡 Adding GitHub remote..."
git remote add origin https://github.com/andorcsikasz/P3.git

# Verify remote
echo "✅ Verifying remote..."
git remote -v

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Staging uncommitted changes..."
    git add .
    git commit -m "Update project files for Railway deployment"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ GitHub repository updated!"
echo "🌐 View it at: https://github.com/andorcsikasz/P3"
echo ""
echo "🚂 Next steps for Railway:"
echo "1. Go to https://railway.app"
echo "2. Create new project or update existing"
echo "3. Connect to GitHub repository: andorcsikasz/P3"
echo "4. Railway will auto-detect Next.js and deploy"


#!/bin/bash

# Commands to push to your private GitHub repository "P3"
# Your GitHub username: andorcsikasz

echo "🚀 Setting up GitHub repository..."

# Add remote
git remote add origin https://github.com/andorcsikasz/P3.git

# Verify remote was added
echo "✅ Remote added. Verifying..."
git remote -v

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Done! Your code is now on GitHub!"
echo "🌐 View it at: https://github.com/andorcsikasz/P3"


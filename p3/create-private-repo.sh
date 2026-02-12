#!/bin/bash

# Script to create a private GitHub repository named "P3" and push code
# Make sure you have GitHub CLI (gh) installed, or follow manual steps below

echo "🚀 Creating private GitHub repository 'P3'..."

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    
    # Check if user is logged in
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI authenticated"
        
        # Create private repository
        echo "📦 Creating private repository..."
        gh repo create P3 --private --source=. --remote=origin --push
        
        if [ $? -eq 0 ]; then
            echo "✅ Success! Repository created and code pushed!"
            echo "🌐 View it at: https://github.com/$(gh api user --jq .login)/P3"
        else
            echo "❌ Error creating repository. Check if 'P3' already exists."
        fi
    else
        echo "❌ Not logged in to GitHub CLI"
        echo "Run: gh auth login"
        exit 1
    fi
else
    echo "⚠️  GitHub CLI not found"
    echo ""
    echo "Please follow these manual steps:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: P3"
    echo "3. Description: Premium Cleaning Service Booking Platform"
    echo "4. Select: Private"
    echo "5. DO NOT initialize with README, .gitignore, or license"
    echo "6. Click 'Create repository'"
    echo ""
    echo "Then run these commands:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/P3.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi


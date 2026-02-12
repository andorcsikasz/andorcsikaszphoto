# Publishing to GitHub - Step by Step Guide

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `premium-cleaning-booking` (or your preferred name)
   - **Description**: "Premium upholstery cleaning service booking platform built with Next.js 15"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory
cd "/Users/andorcsikasz/Documents/X Prog/P3"

# Add the remote (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Using GitHub CLI (if installed)

If you have GitHub CLI (`gh`) installed:

```bash
gh repo create premium-cleaning-booking --public --source=. --remote=origin --push
```

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files there
3. The README.md will be displayed on the repository homepage

## Troubleshooting

### If you get authentication errors:
- Use a Personal Access Token instead of password
- Or set up SSH keys for GitHub

### If you need to update later:
```bash
git add .
git commit -m "Your commit message"
git push
```


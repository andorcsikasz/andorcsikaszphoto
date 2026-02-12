# Deployment Guide - GitHub Pages (Private Repository)

This guide will help you deploy Anna Papfalusi's photography portfolio to GitHub Pages as a private repository.

## Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## Step-by-Step Deployment

### 1. Create a Private GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `anna-papfalusi-photography`)
5. **Important**: Select "Private" (not Public)
6. **Do NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

### 2. Initialize Git and Push to GitHub

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Photography portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (top menu)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions" (not "Deploy from a branch")
5. The workflow file (`.github/workflows/deploy.yml`) is already configured

### 4. Enable GitHub Pages for Private Repositories

**Important**: By default, GitHub Pages is only available for public repositories. For private repositories, you have two options:

#### Option A: Use GitHub Pro/Team/Enterprise (Recommended)
- If you have GitHub Pro, Team, or Enterprise, private repositories can use GitHub Pages
- No additional steps needed - just follow the steps above

#### Option B: Make Repository Public (If you don't have Pro)
- Go to Settings → General
- Scroll to "Danger Zone"
- Click "Change visibility" → "Make public"
- Note: Your code will be public, but the site will be accessible

### 5. Verify Deployment

1. After pushing, go to the "Actions" tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, go to Settings → Pages
5. Your site URL will be displayed: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 6. Update Site URL (If Needed)

If your repository name is different from the default, you may need to update the base path in `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/YOUR_REPO_NAME', // Add this if your repo name is not the default
}
```

## Updating Your Site

Whenever you make changes:

```bash
# Make your changes to files
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy your site.

## Adding Your Own Photos

1. Create a `public/images` folder
2. Add your photos there
3. Update `app/page.tsx` to reference your images:

```tsx
const galleryImages = [
  { id: 1, src: '/images/your-photo-1.jpg', alt: 'Description' },
  { id: 2, src: '/images/your-photo-2.jpg', alt: 'Description' },
  // ... add more
]
```

## Troubleshooting

### Site shows 404
- Check that GitHub Actions workflow completed successfully
- Verify the repository name matches in Settings → Pages
- Wait a few minutes for DNS propagation

### Images not loading
- Ensure images are in the `public` folder
- Check that image paths start with `/`
- Verify image file names match exactly (case-sensitive)

### Build fails
- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Need Help?

If you encounter issues:
1. Check GitHub Actions logs in the "Actions" tab
2. Verify all files were committed and pushed
3. Ensure GitHub Pages is enabled in repository settings


# Anna Papfalusi Photography Portfolio

A clean, modern photography portfolio website built with Next.js.

## Features

- Clean, minimalist design
- Responsive layout
- Smooth scrolling navigation
- Image gallery
- About and Contact sections
- Optimized for performance

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

This will create an `out` directory with static files ready for deployment.

## Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to GitHub and create a new **private** repository
2. Name it `anna-papfalusi-photography` (or your preferred name)

### Step 2: Configure GitHub Pages

1. In your repository settings, go to "Pages"
2. Under "Source", select "GitHub Actions"

### Step 3: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Set up GitHub Actions

The `.github/workflows/deploy.yml` file is already configured. After pushing, GitHub Actions will automatically build and deploy your site.

### Step 5: Access Your Site

Once deployed, your site will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Customization

### Replace Placeholder Images

Replace the placeholder images in `app/page.tsx` with your actual photography:

```tsx
const galleryImages = [
  { id: 1, src: '/images/photo1.jpg', alt: 'Description' },
  // Add your images here
]
```

### Update Contact Information

Edit the contact section in `app/page.tsx` to include your actual contact details.

### Modify Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary-color: #1a1a1a;
  --accent-color: #d4af37;
  /* etc. */
}
```

## License

Private project - All rights reserved.


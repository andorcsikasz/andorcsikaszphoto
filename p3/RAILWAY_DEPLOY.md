# Railway Deployment Guide

## Common Issues & Solutions

### ✅ Fixed Issues:

1. **Node.js Version**: Added `.nvmrc` file specifying Node.js 20
2. **Engine Specification**: Added `engines` field to `package.json`
3. **Standalone Output**: Configured Next.js for standalone output (better for Railway)
4. **Railway Config**: Added `railway.json` for deployment settings

## Deployment Steps:

### 1. Push to GitHub (if not already done)
```bash
git add .
git commit -m "Add Railway deployment configuration"
git push
```

### 2. Deploy on Railway:

1. Go to [Railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will automatically detect it's a Next.js project

### 3. Configure Environment Variables (if needed):
- Railway will automatically set `PORT` (Next.js uses this)
- No additional env vars needed for basic deployment

### 4. Wait for Build:
- Railway will run `npm install` and `npm run build`
- Check the build logs if there are errors

## Troubleshooting:

### Build Fails:
- Check Railway build logs
- Ensure all dependencies are in `package.json` (not just devDependencies)
- Verify Node.js version compatibility

### App Crashes:
- Check Railway logs
- Verify `PORT` environment variable is set (Railway sets this automatically)
- Ensure `npm start` works locally

### Common Errors:

**Error: "Cannot find module"**
- Make sure all dependencies are listed in `package.json`
- Run `npm install` locally to verify

**Error: "Port already in use"**
- Railway sets PORT automatically, don't override it

**Error: "Build timeout"**
- Increase build timeout in Railway settings
- Or optimize your build (remove unused dependencies)

## Verify Deployment:

After deployment, Railway will provide a URL like:
`https://your-app-name.up.railway.app`

Visit it to see your app!

## Next Steps:

1. **Custom Domain**: Add your domain in Railway settings
2. **Environment Variables**: Add any API keys or secrets
3. **Monitoring**: Check Railway logs for any runtime errors


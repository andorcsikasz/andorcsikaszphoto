# Create Private GitHub Repository "P3"

## Option 1: Using GitHub CLI (Easiest)

If you have GitHub CLI installed:

```bash
# Make sure you're logged in
gh auth login

# Run the script
./create-private-repo.sh
```

Or manually:
```bash
gh repo create P3 --private --source=. --remote=origin --push
```

## Option 2: Manual Steps (Recommended)

### Step 1: Create Repository on GitHub

1. Go to **[https://github.com/new](https://github.com/new)**
2. Fill in the form:
   - **Repository name**: `P3`
   - **Description**: `Premium Cleaning Service Booking Platform`
   - **Visibility**: Select **🔒 Private**
   - **⚠️ IMPORTANT**: Do NOT check:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - (We already have these files)
3. Click **"Create repository"**

### Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/andorcsikasz/Documents/X Prog/P3"

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/P3.git

# Verify it was added
git remote -v

# Push your code
git branch -M main
git push -u origin main
```

### Step 3: Verify

1. Go to `https://github.com/YOUR_USERNAME/P3`
2. You should see all your files
3. The repository should be marked as **Private** 🔒

## Quick Command Reference

```bash
# Check current remotes
git remote -v

# Add remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/P3.git

# Remove remote (if you need to change it)
git remote remove origin

# Push to GitHub
git push -u origin main

# Future updates
git add .
git commit -m "Your message"
git push
```

## Troubleshooting

### "Repository already exists"
- The name "P3" might already be taken
- Try a different name like `P3-project` or `premium-cleaning-p3`

### Authentication Error
- Use a Personal Access Token instead of password
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Remote origin already exists"
- Remove it first: `git remote remove origin`
- Then add the new one


# Railway + GitHub Deployment Guide — P1 Vibecheck

## Current Setup ✅

| Item | Status |
|------|--------|
| **GitHub repo** | `https://github.com/andorcsikasz/x_prog.git` |
| **Branch** | `main` |
| **Project** | P1 (vibecheck) — Next.js 15 |
| **Location** | `p1/` subdirectory (monorepo) |
| **railway.json** | ✓ Present with build/start commands |
| **next.config.js** | ✓ `output: 'standalone'` (Railway-friendly) |
| **Build** | ✓ `npm run build` succeeds locally |

---

## Railway Dashboard Setup

Because **x_prog** is a monorepo, you need to configure Railway to deploy only the `p1` folder.

### 1. Connect GitHub

1. Go to [railway.app](https://railway.app) → **New Project**
2. Choose **Deploy from GitHub repo**
3. Select `andorcsikasz/x_prog`
4. Pick branch: `main`

### 2. Configure Root Directory (required)

1. Open your project → select the **vibecheck** service
2. Go to **Settings** tab
3. Find **Root Directory** (or **Source**)
4. Set to: **`p1`**

Railway will treat `p1/` as the project root, so it will use:
- `p1/package.json`
- `p1/railway.json`
- `p1/next.config.js`

### 3. Config File Path (if Railway can’t find it)

If the service ignores `p1/railway.json`:

1. In **Settings** → **Build**
2. Set **Railway Config File** (or similar) to: **`/p1/railway.json`**

Use an absolute path from the repo root.

### 4. Watch Paths (optional, recommended)

To avoid deploying when other folders change:

1. **Settings** → **Watch Paths**
2. Add: **`p1/**`**

Only changes under `p1/` will trigger new deployments.

### 5. Environment Variables

In **Variables** tab, add what the app expects:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | No* | Prisma is currently mocked; add if you use a real DB |
| `GOOGLE_MAPS_API_KEY` | No | For map features |
| `OPENAI_API_KEY` | No | For AI features |
| `GOOGLE_CALENDAR_CLIENT_ID` | No | Calendar integration |
| `GOOGLE_CALENDAR_CLIENT_SECRET` | No | Calendar integration |

\* App works without `DATABASE_URL` using the mock Prisma client.

### 6. Generate Domain

1. **Settings** → **Networking** → **Generate Domain**
2. Your app will be available at e.g. `vibecheck-production-xxxx.up.railway.app`

---

## Auto-Deploy

After GitHub is connected and root is set to `p1`:

- Pushes to `main` under `p1/` trigger new deployments
- Each deployment runs: `npm run build` → `npm start`

---

## Deploy via CLI

```bash
cd /Users/andorcsikasz/x_prog
railway login
railway link   # Select project + vibecheck service
cd p1
railway up
```

If you use `railway up` from the monorepo root, ensure **Root Directory** in the dashboard is `p1` so Railway builds from the right place.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "No start command found" | Confirm **Root Directory** = `p1` and `railway.json` is used |
| Build fails on `npm run build` | Check Node version (`.nvmrc` says 20); set `NODE_VERSION=20` in variables if needed |
| Wrong project deployed | Ensure **Watch Paths** = `p1/**` and Root Directory = `p1` |
| 404 / routing issues | Next.js standalone is enabled; add `PORT` if Railway uses something other than 3000 |

---

## Checklist

- [ ] GitHub repo connected to Railway
- [ ] Root Directory set to `p1`
- [ ] Watch Paths set to `p1/**` (optional)
- [ ] Domain generated
- [ ] Push to `main` and verify deployment

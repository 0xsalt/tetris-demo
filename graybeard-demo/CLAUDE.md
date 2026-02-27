# Graybeard Demo Guidelines

Demo project for TypeScript test software development.

## Git Workflow

**CRITICAL: Always create feature branches BEFORE starting work.**

### Branch Naming Convention

| Range | Purpose | Example |
|-------|---------|---------|
| `0xx-name` | Features | `010-weather-widget` |
| `3xx-name` | Fixes and polish | `300-ui-polish` |
| `5xx-name` | Research & POCs (never merge) | `500-experiment` |

**Note:** Spike branches (5xx) preserve experimental code for reference but are never merged to main. Document findings in `specs/` or `docs/`.

### Rules
- Never delete branches (preserve history)
- Never commit directly to main
- Always rebase before merge (ensures linear history)
- Fast-forward merges only (no merge commits)

### Complete Workflow

```bash
# 1. Create feature branch FIRST
git checkout main && git pull
git checkout -b NNN-feature-name

# 2. Make changes, commit
git add <files>
git commit -m "feat: description"

# 3. When ready to merge - rebase first
git fetch origin
git rebase origin/main
# (resolve conflicts if any)

# 4. Merge to main (fast-forward only)
git checkout main && git pull
git merge NNN-feature-name --ff-only

# 5. Push
git push origin main

# 6. Return to feature branch for continued work
git checkout NNN-feature-name
```

**Key:** `--ff-only` fails if merge would create a merge commit. If it fails, rebase your feature branch first.

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Bun
- **Testing:** Bun test runner
- **Purpose:** Demo test software

## Deployment (GitHub Pages)

- **Live URL:** https://0xsalt.github.io/tetris-demo/
- **Workflow:** `.github/workflows/pages.yml` — auto-deploys `src/public/` on push to `main`
- **Trigger:** Every `git push origin main` triggers the GitHub Actions deploy

### Deploy Steps (after merging to main)

```bash
# 1. Verify tests pass
bun test

# 2. Push to origin (triggers GitHub Pages deploy)
git push origin main

# 3. Verify deployment (wait ~60s for Actions to complete)
# Check: https://github.com/0xsalt/tetris-demo/actions
# Then verify live: https://0xsalt.github.io/tetris-demo/
```

### Workflow Details

The GitHub Actions workflow (`pages.yml`) does:
1. Checkout repo
2. Upload `src/public/` as Pages artifact
3. Deploy to GitHub Pages environment

No build step needed — `src/public/index.html` is a standalone file.

## Key Decisions

- **Runtime:** Bun (not Node.js) - faster, built-in TypeScript, built-in test runner

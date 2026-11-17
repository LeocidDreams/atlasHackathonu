# CLAUDE.md

## Session start (MANDATORY)

At the start of every session, before answering the first request or touching any code, you MUST:

1. **Read the project skills** in `.claude/skills/`: open each `.claude/skills/**/SKILL.md` and learn when each one applies. When a task matches a skill, follow that skill's instructions instead of your default approach.
2. **Read the project READMEs**:
   - `README.md` at the repo root (if it exists)
   - `packages/**/README.md` (shared-code packages and how to create/use them)
   - `apps/**/README.md` (per-app notes)

Do not skip these steps, even for small or "quick" requests. If a file is missing, continue with the rest.

## Project overview

pnpm monorepo (`pnpm-workspace.yaml`):

- `apps/api` — `@atlas/api`, Express 5 + TypeScript backend
- `apps/web` — Vite frontend
- `packages/**` — shared code used by the apps, each as a separate `@atlas/*` workspace package (see `packages/**/README.md`)

TypeScript settings are shared via `tsconfig.base.json`; the root `tsconfig.json` uses project references (`pnpm typecheck` runs `tsc -b`).

## Contribution guidelines

- **Never commit directly to `main`.** Direct commits to `main` are forbidden.
- Start every change from `dev`: create a new branch off `dev` (or fork the repo) and do your work there.
- When the work is done, open a pull request **into `dev`** (not `main`).
- If the PR has merge conflicts, resolve them **locally**: pull the latest `dev` into your branch, fix the conflicts, then push the updated branch.

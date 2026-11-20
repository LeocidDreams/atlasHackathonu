## Project Scopes

| Scope                   | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| apps/api                | Root API gateway for the project                            |
| apps/web                | React web application for the frontend of the project       |
| apps/campusops-training | Embedding generation and storage for campus ops data        |
| packages/domain         | Shared domain models used across the project                |
| packages/shared         | Common utilities and helpers shared between the apps        |
| packages/validators     | Shared validation schemas for the backend and the frontend  |
| packages/rag            | Retrieval-augmented generation (RAG) logic for the project  |

## Commit message convention

| Type       | Description                                                                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feat`     | Commits that add, adjust or remove a feature to/of/from the API or UI                                                                                    |
| `fix`      | Commits that fix an API or UI bug of a preceded `feat` commit                                                                                            |
| `refactor` | Commits that rewrite or restructure code without altering API or UI behavior                                                                             |
| `perf`     | Commits are special type of `refactor` commits that specifically improve performance                                                                     |
| `style`    | Commits that address code style (e.g., white-space, formatting, missing semi-colons) and do not affect application behavior                              |
| `test`     | Commits that add missing tests or correct existing ones                                                                                                  |
| `docs`     | Commits that exclusively affect documentation                                                                                                            |
| `build`    | Commits that affect build-related components such as build tools, dependencies, project version, ...                                                     |
| `ops`      | Commits that affect operational aspects like infrastructure (IaC), deployment scripts, CI/CD pipelines, backups, monitoring, or recovery procedures, ... |
| `chore`    | Commits that represent tasks like initial commit, modifying `.gitignore`, ...                                                                            |

## Commit Format

The commit message should follow the format:

```
<type>(<scope>): <short description>

<optional long description>
```

- `<type>`: One of the commit types listed above (e.g., `feat`, `fix`, `refactor`, etc.)
- `<scope>`: The scope of the commit, typically the part of the project affected (e.g., `api`, `web`)
- `<short description>`: A brief summary of the changes made
- `<optional long description>`: A more detailed explanation of the changes, if necessary

## Contribution guidelines

- **Never commit directly to `main`.** Direct commits to `main` are forbidden.
- Start every change from `dev`: create a new branch off `dev` (or fork the repo) and do your work there.
- When the work is done, open a pull request **into `dev`** (not `main`).
- If the PR has merge conflicts, resolve them **locally**: pull the latest `dev` into your branch, fix the conflicts, then push the updated branch.

# packages/

This folder holds the **shared code** used by the apps in this monorepo (`apps/api`, `apps/web`).
Each subfolder is an independent pnpm workspace package (module) and is added to apps as a dependency.

## What goes here?

- Shared TypeScript types and interfaces (e.g. API request/response types)
- Validation schemas (e.g. schemas used by both backend and frontend)
- Utility functions (`utils`), constants, configuration
- Any code that would otherwise be duplicated across multiple apps

Code that belongs to a single app does **not** go here; it stays in that app's own `src/` folder.

## Example structure

```
packages/
├── shared/            # @atlas/shared — shared types, utils, constants
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts
└── ...                # add new packages as needed
```

## Creating a new package

1. Create the `packages/<package-name>/` folder.
2. Add a `package.json` (the name must start with the `@atlas/` scope):

   ```json
   {
     "name": "@atlas/shared",
     "version": "1.0.0",
     "private": true,
     "type": "module",
     "main": "./src/index.ts",
     "types": "./src/index.ts",
     "exports": {
       ".": "./src/index.ts"
     }
   }
   ```

3. Add a `tsconfig.json` (extends the root settings):

   ```json
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "rootDir": "src",
       "outDir": "dist"
     },
     "include": ["src"]
   }
   ```

4. Add the package to the `references` list in the root `tsconfig.json`:

   ```json
   { "path": "./packages/shared" }
   ```

## Using a package in an app

Add the package to an app as a dependency:

```bash
pnpm --filter @atlas/api add @atlas/shared@workspace:*
```

Then import it directly:

```ts
import { something } from "@atlas/shared";
```

For TypeScript project references, also add it to the app's `tsconfig.json`:

```json
"references": [{ "path": "../../packages/shared" }]
```

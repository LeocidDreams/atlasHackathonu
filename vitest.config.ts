import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Each app/package is its own project; one with a vitest.config.ts uses it, the rest get the defaults.
    projects: [
      "apps/*",
      "packages/*",
      "!packages/README.md",
      // Python project, not tested by vitest
      "!apps/campusops-training",
    ],
  },
});

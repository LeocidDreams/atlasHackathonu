import { defineConfig } from "vitest/config";

export default defineConfig({
  tsconfig: "./tsconfig.app.json",
  resolve: {
    // Resolve @core/*, @infrastructure/*, @modules/* from tsconfig.json paths
    tsconfigPaths: true,
  },
  // Node can't run decorators yet and oxc only lowers the legacy (experimentalDecorators) form.
  // tsyringe's class decorators (@registry, @injectable) behave the same under both forms.
  oxc: {
    decorator: { legacy: true },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "test/**/*.test.ts"],
  },
});

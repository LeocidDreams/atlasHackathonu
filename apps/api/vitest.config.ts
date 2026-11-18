import { defineConfig } from "vitest/config";

export default defineConfig({
  tsconfig: "./tsconfig.app.json",
  resolve: {
    // Resolve @core/*, @infrastructure/*, @modules/* from tsconfig.json paths
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "test/**/*.test.ts"],
  },
});

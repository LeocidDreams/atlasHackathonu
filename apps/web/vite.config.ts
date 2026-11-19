import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@features": path.resolve(import.meta.dirname, "./src/features"),
      "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
      "@lib": path.resolve(import.meta.dirname, "./src/lib"),
      "@layouts": path.resolve(import.meta.dirname, "./src/layouts"),
      "@provider": path.resolve(import.meta.dirname, "./src/provider"),
    },
  },
});

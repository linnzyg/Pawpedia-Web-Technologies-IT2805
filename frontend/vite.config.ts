import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/project2",
  server: {
    open: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "istanbul", // Use Istanbul for coverage
      reporter: ["text", "html", "json", "json-summary"], // Report formats
      include: ["src"], // Include the src folder in coverage
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

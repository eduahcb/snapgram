import adapter from "@sveltejs/adapter-node";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { playwright } from "@vitest/browser-playwright";

import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) => filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      adapter: adapter(),
      typescript: {
        config: (config) => {
          config.include.push("../drizzle.config.ts");
        },
      },
    }),
  ],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,svelte}"],
      exclude: [
        "**/*.d.ts",
        "**/node_modules/**",
        "**/.svelte-kit/**",
        "**/build/**",
        "**/coverage/**",
        "**/src/lib/db/schema/**",
        "**/src/lib/server/**",
        "**/src/hooks.server.ts",
      ],
      thresholds: {
        functions: 90,
        branches: 90,
        lines: 90,
      },
    },
    projects: [
      {
        // Client-side tests (Svelte components)
        extends: true,
        test: {
          name: "client",
          testTimeout: 2000,
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
          include: ["src/**/*.svelte.test.ts"],
          exclude: [
            "src/lib/server/**",
            "src/**/*.ssr.test.ts",
          ],
          setupFiles: ["vitest-browser-svelte"],
        },
      },
      {
        // SSR tests (Server-side rendering)
        extends: true,
        test: {
          name: "ssr",
          environment: "node",
          include: ["src/**/*.ssr.test.ts"],
        },
      },
      {
        // Server-side tests (Node.js utilities)
        extends: true,
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.test.ts"],
          exclude: [
            "src/**/*.svelte.test.ts",
            "src/**/*.ssr.test.ts",
          ],
        },
      },
    ],
  },
});

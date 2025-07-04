import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "VormiaGuardJS",
      formats: ["es", "cjs"],
      fileName: (format) => `vormiaguardjs.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "vue",
        "svelte",
        "svelte/store",
        "solid-js",
        "axios",
        "zustand",
        "vormiaqueryjs",
        "@tanstack/react-query",
        "@builder.io/qwik",
      ],
    },
  },
});

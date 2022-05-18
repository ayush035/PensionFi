/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const outDir = resolve(__dirname, "dist");
// const root = resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // main: resolve(root, "index.html"),
        // create: resolve(root, "create", "index.html"),
        // main: resolve(__dirname, "src/index.html"),
        // create: resolve(__dirname, "create/index.html")
      }
    }
  }
});


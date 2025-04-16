import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

dotenv.config();

export default defineConfig({
  build: {
    outDir: "dist",
    minify: false,
    cssMinify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
      },
    },
  },
  server: { port: 8765 },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), tailwindcss()],
});

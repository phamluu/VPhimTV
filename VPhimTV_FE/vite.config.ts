import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { resolve } from "path";
import { defineConfig } from "vite";

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

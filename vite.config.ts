import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/demo-use-thunk/",
  plugins: [react()],
  build: {
    outDir: "docs",
    minify: false,
  },
});

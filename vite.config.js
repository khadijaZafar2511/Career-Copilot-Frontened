import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://career-copilot-backened.onrender.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""), // Safely strips /api from the URL
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
      "@scss/": `${path.resolve(__dirname, "src/assets/scss")}/`,
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  }
});

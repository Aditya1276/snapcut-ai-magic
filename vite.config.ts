import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/n8n": {
        target: "https://adityajadhav107.app.n8n.cloud",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, "/webhook"),
      },
      "/api/n8n-test": {
        target: "https://adityajadhav107.app.n8n.cloud",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n-test/, "/webhook-test"),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

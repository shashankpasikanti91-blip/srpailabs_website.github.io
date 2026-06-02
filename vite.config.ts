import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react") || id.includes("scheduler")) return "vendor-react";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@tanstack/react-query") || id.includes("@supabase/supabase-js")) return "vendor-data";
          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("embla-carousel") || id.includes("recharts")) {
            return "vendor-ui";
          }
          if (id.includes("zod") || id.includes("date-fns")) return "vendor-utils";

          return "vendor-misc";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

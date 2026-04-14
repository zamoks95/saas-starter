import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Resolve @repo/ui internal "src/*" imports when consuming source directly
      "src/lib/utils": path.resolve(__dirname, "../../packages/ui/src/lib/utils"),
    },
  },
});

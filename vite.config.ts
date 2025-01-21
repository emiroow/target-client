import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6005,
    host: true,
    proxy: {
      "/api": {
        target: "http://5.75.194.114:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Add more aliases as needed
    },
  },
  plugins: [react()],
});

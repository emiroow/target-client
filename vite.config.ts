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
        target: "https://5.75.194.114:3001", // Change this to HTTPS
        changeOrigin: true,
        secure: false, // Set to false if the backend doesn't have a valid certificate
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

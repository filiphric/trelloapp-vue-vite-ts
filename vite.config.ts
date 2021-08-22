import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";
import { createServer } from "./backend/index";
import path from "path";
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: [ '.js', '.ts', '.vue' ],
      requireEnv: true,
    }),
    createServer()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // map '@' to './src'
    }
  },
  server: {
    proxy: {
      "^/api/.*": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});

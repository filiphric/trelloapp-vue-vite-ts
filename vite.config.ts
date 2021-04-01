// vite.config.js
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { babel } from "@rollup/plugin-babel";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    babel({
      babelHelpers: "runtime",
      include: ["src/*", "src/**/*"],
      exclude: ["node_modules/", "cypress/"],
      extensions: [".ts", ".vue"]
    })
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

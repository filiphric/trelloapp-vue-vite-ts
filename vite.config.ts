import { createServer } from './backend/index';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import path from 'path';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import pluginEnv from 'vite-plugin-vue-env';

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
    svgLoader(),
    pluginEnv(),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: [ '.js', '.ts', '.vue' ],
      include: 'src/*'
    }),
    createServer()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // map '@' to './src'
    }
  },
  server: {
    proxy: {
      '^/api/.*': {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        target: 'http://localhost:3001'
      },
      '^/socket.io/.*': {
        changeOrigin: true,
        target: 'http://localhost:3001',
      }
    }
  }
});
import { createServer } from './backend/index';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'
import constants from './constants'

const { APP, SERVER } = constants

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    react(),
    svgr({ exportAsDefault: true }),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.tsx'],
      include: 'src/*',
    }),
    createServer(),
    tsconfigPaths({ extensions: ['.ts', '.tsx', '.d.ts'] })
  ],
  server: {
    port: APP,
    proxy: {
      '^/api/.*': {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        target: `http://localhost:${SERVER}`
      },
    }
  }
});

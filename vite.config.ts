import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  const isAdmin = process.env.APP_TYPE === 'admin';
  
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      port: 8888,
      watch: {
        ignored: [
          '**/.git/**',
          '**/node_modules/**',
          '**/dist/**'
        ],
        usePolling: true,
        interval: 100
      },
      hmr: {
        overlay: true,
        clientPort: 8888
      }
    },
    preview: {
      port: parseInt(process.env.VITE_PORT),
    },
  });
};

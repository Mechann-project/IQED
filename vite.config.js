import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';
import vercel from 'vite-plugin-vercel';
export default defineConfig({
  // base: "/IQED/",
  // build: {
  //   outDir: 'dist',
  // },
  plugins: [
    react(),
    removeConsole({
      removeConsole: true, 
      removeDebug: true,   
      removeWarn: true,   
      removeError: true,   
    }),
    vercel()
  ],
  server: {
    port: 5173,
  },
});
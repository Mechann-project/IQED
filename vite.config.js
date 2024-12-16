import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  // base: "/IQED/",
  plugins: [
    react(),
    removeConsole(), 
  ],
  server: {
    port: 5173,
  },
});
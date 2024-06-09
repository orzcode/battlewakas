/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  // Basic Vite configuration
  base: "/",
  root: 'src',
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    outDir: '../public',
    emptyOutDir: false,
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
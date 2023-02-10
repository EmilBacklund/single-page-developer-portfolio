const { resolve } = require('path');
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve('public'),
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
  },
  preview: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        homePage: resolve(__dirname, 'src/index.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },

  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
});

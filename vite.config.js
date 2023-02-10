const { resolve } = require('path');
import { defineConfig } from 'vite';
const environment = require('vite-plugin-environment');

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve('public'),
  plugins: [
    environment({
      variables: {
        token: process.env.token,
      },
    }),
  ],
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

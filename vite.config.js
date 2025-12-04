import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.js',
      name: 'SparkUI',
      fileName: 'spark-ui',
    },
  },
});


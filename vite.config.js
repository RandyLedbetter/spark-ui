import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'SparkUI',
      fileName: 'spark-ui'
    },
    rollupOptions: {
      output: {
        assetFileNames: 'spark-ui.[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
});


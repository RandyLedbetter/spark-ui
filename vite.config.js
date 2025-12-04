import { defineConfig } from 'vite';

export default defineConfig({
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Build configuration for library mode
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'SparkUI',
      fileName: (format) => `spark-ui.${format}.js`
    },
    rollupOptions: {
      output: {
        // Ensure CSS is extracted
        assetFileNames: 'spark-ui.[ext]'
      }
    }
  },
  
  // Resolve configuration
  resolve: {
    extensions: ['.js', '.css']
  }
});


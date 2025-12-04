/**
 * Demo page initialization
 * Loads Spark UI components and sets up event listeners
 */

import { SparkElement } from './index.js';
import './components/example/spark-example.js';

// Verify SparkElement is available
console.log('✓ SparkElement loaded:', SparkElement);
console.log('✓ Spark UI foundation ready!');

// Listen for custom events from example component
document.addEventListener('spark-click', (e) => {
  console.log('spark-click event:', e.detail);
});


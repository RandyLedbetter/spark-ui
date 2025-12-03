/**
 * Spark UI - Web Component Library
 * 
 * A lightweight, accessible component library built on Web Components.
 * Works with any framework or vanilla JavaScript.
 * 
 * @example
 * // Import all components
 * import 'spark-ui';
 * 
 * // Or import individual components
 * import 'spark-ui/button';
 * import 'spark-ui/card';
 * 
 * // Don't forget the design tokens CSS
 * import 'spark-ui/tokens';
 */

// Design tokens (consumers should import CSS separately)
// import './tokens/tokens.css';

// Components - will be added as they are implemented
// export * from './components/button/button.js';
// export * from './components/card/card.js';
// export * from './components/input/input.js';
// export * from './components/modal/modal.js';
// export * from './components/toast/toast.js';
// export * from './components/avatar/avatar.js';

// Version
export const VERSION = '0.1.0';

// Component registry check utility
export function isComponentRegistered(tagName) {
  return customElements.get(tagName) !== undefined;
}

// Wait for a component to be defined
export function whenDefined(tagName) {
  return customElements.whenDefined(tagName);
}

console.log(`Spark UI v${VERSION} initialized`);


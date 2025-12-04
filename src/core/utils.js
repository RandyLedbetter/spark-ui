/**
 * Spark UI Utility Functions
 * 
 * Shared utilities for accessibility, DOM operations, and common patterns.
 */

/**
 * Generates a unique ID for accessibility purposes.
 * Useful for aria-labelledby, aria-describedby, etc.
 * 
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID string
 * 
 * @example
 * const id = generateId('modal'); // "modal-x7k2p9m3n"
 */
export function generateId(prefix = 'spark') {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Traps focus within an element.
 * Essential for modal dialogs and dropdown menus.
 * 
 * @param {HTMLElement} element - Container to trap focus within
 * @returns {Function} Cleanup function to remove the trap
 * 
 * @example
 * const cleanup = trapFocus(modalElement);
 * // Later, when modal closes:
 * cleanup();
 */
export function trapFocus(element) {
  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  function getFocusableElements() {
    return Array.from(element.querySelectorAll(focusableSelector)).filter(
      (el) => el.offsetParent !== null // Visible elements only
    );
  }

  function handleKeydown(event) {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab: going backwards
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        event.preventDefault();
      }
    } else {
      // Tab: going forwards
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleKeydown);

  // Focus the first focusable element
  const focusableElements = getFocusableElements();
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeydown);
  };
}

/**
 * Announces a message to screen readers using an aria-live region.
 * 
 * @param {string} message - Message to announce
 * @param {('polite'|'assertive')} priority - Urgency level
 * 
 * @example
 * announce('Item added to cart');
 * announce('Error: Invalid email address', 'assertive');
 */
export function announce(message, priority = 'polite') {
  // Create a live region if it doesn't exist
  let announcer = document.getElementById('spark-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'spark-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('role', 'status');
    announcer.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(announcer);
  }

  // Update priority if needed
  announcer.setAttribute('aria-live', priority);

  // Clear and set message (the delay helps screen readers notice the change)
  announcer.textContent = '';
  
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
}

/**
 * Debounces a function call.
 * Useful for resize handlers, scroll handlers, etc.
 * 
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 * 
 * @example
 * const debouncedSearch = debounce(search, 300);
 * input.addEventListener('input', debouncedSearch);
 */
export function debounce(fn, delay = 150) {
  let timeoutId;
  
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Checks if the user prefers reduced motion.
 * Use to disable animations for accessibility.
 * 
 * @returns {boolean} True if user prefers reduced motion
 * 
 * @example
 * if (!prefersReducedMotion()) {
 *   element.animate(...);
 * }
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Waits for the next animation frame.
 * Useful for DOM updates that need to be painted first.
 * 
 * @returns {Promise<void>}
 * 
 * @example
 * element.classList.add('entering');
 * await nextFrame();
 * element.classList.add('entered');
 */
export function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

/**
 * Clamps a number between min and max values.
 * 
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 * 
 * @example
 * clamp(150, 0, 100); // 100
 * clamp(-10, 0, 100); // 0
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


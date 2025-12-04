/**
 * SparkElement - Base class for all Spark UI components
 * 
 * Provides Shadow DOM setup, design token injection, and common utilities.
 * All Spark UI components should extend this class.
 * 
 * @example
 * class SparkButton extends SparkElement {
 *   connectedCallback() {
 *     this.injectStyles(styles);
 *     this.render(`<button><slot></slot></button>`);
 *   }
 * }
 */
export class SparkElement extends HTMLElement {
  /**
   * Create a new SparkElement instance
   * Automatically attaches Shadow DOM in open mode
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._tokenStyleSheet = null;
  }

  /**
   * Inject design tokens into Shadow DOM
   * Creates a <style> element with @import for tokens.css
   * Call this in connectedCallback before other styles
   */
  injectTokens() {
    if (this._tokenStyleSheet) return; // Already injected

    // Use inline tokens for Shadow DOM compatibility
    // Components inherit from :root tokens on the document
    this._tokenStyleSheet = document.createElement('style');
    this._tokenStyleSheet.textContent = `
      :host {
        /* Inherit tokens from document :root */
        font-family: var(--spark-font-family, system-ui, sans-serif);
        line-height: var(--spark-line-height-normal, 1.5);
        color: var(--spark-text, #1e293b);
      }
      
      :host([hidden]) {
        display: none !important;
      }
      
      *, *::before, *::after {
        box-sizing: border-box;
      }
    `;
    this.shadowRoot.prepend(this._tokenStyleSheet);
  }

  /**
   * Inject component-specific styles into Shadow DOM
   * @param {string} css - CSS styles to inject
   */
  injectStyles(css) {
    const style = document.createElement('style');
    style.textContent = css;
    this.shadowRoot.appendChild(style);
  }

  /**
   * Render HTML template to Shadow DOM
   * Clears existing content (except styles) and renders new HTML
   * @param {string} html - HTML template string to render
   */
  render(html) {
    // Remove existing content but keep styles
    const styles = Array.from(this.shadowRoot.querySelectorAll('style'));
    this.shadowRoot.innerHTML = '';
    styles.forEach(style => this.shadowRoot.appendChild(style));
    
    // Render new content
    const template = document.createElement('template');
    template.innerHTML = html;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Dispatch a custom event that bubbles and crosses Shadow DOM boundaries
   * @param {string} eventName - Name of the custom event
   * @param {Object} detail - Event detail data
   * @returns {boolean} - True if event was not cancelled
   */
  emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true, // Cross Shadow DOM boundaries
      cancelable: true
    });
    return this.dispatchEvent(event);
  }

  /**
   * Get attribute value with optional default
   * @param {string} name - Attribute name
   * @param {*} defaultValue - Default value if attribute not present
   * @returns {string|*} - Attribute value or default
   */
  getAttr(name, defaultValue = '') {
    return this.getAttribute(name) ?? defaultValue;
  }

  /**
   * Check if element has a boolean attribute
   * @param {string} name - Attribute name
   * @returns {boolean} - True if attribute exists
   */
  hasAttr(name) {
    return this.hasAttribute(name);
  }

  /**
   * Set or remove a boolean attribute
   * @param {string} name - Attribute name
   * @param {boolean} value - True to set, false to remove
   */
  setBoolAttr(name, value) {
    if (value) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }

  /**
   * Query element within Shadow DOM
   * @param {string} selector - CSS selector
   * @returns {Element|null} - Matching element or null
   */
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  /**
   * Query all elements within Shadow DOM
   * @param {string} selector - CSS selector
   * @returns {NodeList} - Matching elements
   */
  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }
}

// Export as default as well for convenience
export default SparkElement;


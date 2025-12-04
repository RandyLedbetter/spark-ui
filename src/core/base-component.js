/**
 * SparkElement - Base class for all Spark UI components
 * 
 * Provides common patterns for Shadow DOM, attribute handling, and event emission.
 * All Spark UI components should extend this class.
 * 
 * @example
 * class SparkButton extends SparkElement {
 *   static get observedAttributes() {
 *     return ['variant', 'size', 'disabled'];
 *   }
 * 
 *   get template() {
 *     return `<button><slot></slot></button>`;
 *   }
 * 
 *   get styles() {
 *     return `button { ... }`;
 *   }
 * }
 * customElements.define('spark-button', SparkButton);
 */
export class SparkElement extends HTMLElement {
  /**
   * List of attributes to observe for changes.
   * Override in subclass to watch specific attributes.
   */
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rendered = false;
  }

  /**
   * Called when element is added to the DOM.
   * Triggers initial render.
   */
  connectedCallback() {
    this.render();
    this._rendered = true;
  }

  /**
   * Called when element is removed from the DOM.
   * Override for cleanup logic.
   */
  disconnectedCallback() {
    // Override in subclass for cleanup
  }

  /**
   * Called when an observed attribute changes.
   * Triggers re-render if the value actually changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._rendered) {
      this.render();
    }
  }

  /**
   * Returns the HTML template for the component.
   * Override in subclass.
   * @returns {string} HTML template string
   */
  get template() {
    return '';
  }

  /**
   * Returns the CSS styles for the component.
   * Override in subclass.
   * @returns {string} CSS styles string
   */
  get styles() {
    return '';
  }

  /**
   * Returns the combined CSS tokens to inject.
   * Can be overridden to add additional shared styles.
   * @returns {string} CSS tokens string
   */
  get tokenStyles() {
    return `
      :host {
        /* Import design tokens via CSS custom properties */
        font-family: var(--spark-font-family, system-ui, sans-serif);
        font-size: var(--spark-font-size-md, 1rem);
        line-height: var(--spark-line-height-normal, 1.5);
        box-sizing: border-box;
      }

      :host *,
      :host *::before,
      :host *::after {
        box-sizing: inherit;
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
  }

  /**
   * Renders the component's Shadow DOM.
   * Combines token styles, component styles, and template.
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.tokenStyles}
        ${this.styles}
      </style>
      ${this.template}
    `;
  }

  /**
   * Emits a custom event from the component.
   * Events bubble and cross shadow DOM boundaries.
   * 
   * @param {string} eventName - Name of the event
   * @param {Object} detail - Event detail payload
   * @returns {boolean} False if event was cancelled, true otherwise
   */
  emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
    return this.dispatchEvent(event);
  }

  /**
   * Gets a boolean attribute value.
   * Returns true if attribute exists, false otherwise.
   * 
   * @param {string} name - Attribute name
   * @returns {boolean} Whether the attribute is present
   */
  getBooleanAttribute(name) {
    return this.hasAttribute(name);
  }

  /**
   * Sets a boolean attribute.
   * If true, adds the attribute. If false, removes it.
   * 
   * @param {string} name - Attribute name
   * @param {boolean} value - Whether to set or remove
   */
  setBooleanAttribute(name, value) {
    if (value) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }

  /**
   * Gets an attribute value with a default fallback.
   * 
   * @param {string} name - Attribute name
   * @param {string} defaultValue - Default if attribute not set
   * @returns {string} Attribute value or default
   */
  getAttributeWithDefault(name, defaultValue = '') {
    return this.getAttribute(name) ?? defaultValue;
  }

  /**
   * Queries an element within the shadow DOM.
   * 
   * @param {string} selector - CSS selector
   * @returns {Element|null} Matched element or null
   */
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  /**
   * Queries all elements matching selector within shadow DOM.
   * 
   * @param {string} selector - CSS selector
   * @returns {NodeList} List of matched elements
   */
  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }
}


/**
 * Spark Modal Component
 * 
 * An accessible dialog Web Component with backdrop, focus management,
 * and keyboard interactions.
 * 
 * Usage:
 *   <spark-modal id="my-modal">
 *     <spark-modal-header>Title</spark-modal-header>
 *     <spark-modal-body>Content here</spark-modal-body>
 *     <spark-modal-footer>
 *       <spark-button data-modal-close>Close</spark-button>
 *     </spark-modal-footer>
 *   </spark-modal>
 */

// =============================================================================
// SparkModal - Main modal component
// =============================================================================

const modalStyles = `
  :host {
    display: none;
  }

  :host([open]) {
    display: block;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: var(--spark-modal-backdrop, rgba(0, 0, 0, 0.5));
    z-index: var(--spark-z-modal-backdrop, 400);
  }

  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--spark-modal-bg, var(--spark-white, #ffffff));
    border-radius: var(--spark-modal-radius, var(--spark-radius-lg, 1rem));
    box-shadow: var(--spark-modal-shadow, var(--spark-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1)));
    z-index: var(--spark-z-modal, 500);
    max-height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Size variants */
  :host([size="small"]) .dialog {
    width: 400px;
    max-width: calc(100vw - 2rem);
  }

  :host(:not([size])) .dialog,
  :host([size="medium"]) .dialog {
    width: 600px;
    max-width: calc(100vw - 2rem);
  }

  :host([size="large"]) .dialog {
    width: 800px;
    max-width: calc(100vw - 2rem);
  }

  :host([size="full"]) .dialog {
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
  }

  .close-button {
    position: absolute;
    top: var(--spark-spacing-sm, 0.5rem);
    right: var(--spark-spacing-sm, 0.5rem);
    width: 2rem;
    height: 2rem;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--spark-radius-sm, 0.25rem);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--spark-gray-500, #64748b);
    font-size: 1.25rem;
    line-height: 1;
    transition: background var(--spark-transition-fast, 150ms ease),
                color var(--spark-transition-fast, 150ms ease);
  }

  .close-button:hover {
    background: var(--spark-gray-100, #f1f5f9);
    color: var(--spark-gray-700, #334155);
  }

  .close-button:focus {
    outline: none;
    box-shadow: var(--spark-focus-ring);
  }

  :host([closable="false"]) .close-button {
    display: none;
  }
`;

class SparkModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'size', 'backdrop', 'escape', 'closable'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._returnFocus = null;
    this._boundHandleKeydown = this._handleKeydown.bind(this);
    this._boundHandleBackdropClick = this._handleBackdropClick.bind(this);
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      if (newValue !== null) {
        this._onOpen();
      } else {
        this._onClose();
      }
    }
  }

  // Public methods
  open() {
    if (this.hasAttribute('open')) return;
    
    this._returnFocus = document.activeElement;
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  }

  close(reason = 'api') {
    if (!this.hasAttribute('open')) return;
    
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('close', { 
      bubbles: true,
      detail: { reason }
    }));
  }

  // Private methods
  _render() {
    this.shadowRoot.innerHTML = `
      <style>${modalStyles}</style>
      <div class="backdrop" part="backdrop"></div>
      <div class="dialog" role="dialog" aria-modal="true" part="dialog">
        <button class="close-button" aria-label="Close modal" part="close-button">×</button>
        <slot></slot>
      </div>
    `;

    // Set up aria-labelledby if header exists
    this._updateAriaLabel();
  }

  _setupEventListeners() {
    const backdrop = this.shadowRoot.querySelector('.backdrop');
    const closeButton = this.shadowRoot.querySelector('.close-button');
    
    backdrop?.addEventListener('click', this._boundHandleBackdropClick);
    closeButton?.addEventListener('click', () => this.close('button'));
    
    // Listen for data-modal-close clicks in light DOM
    this.addEventListener('click', (e) => {
      if (e.target.hasAttribute?.('data-modal-close')) {
        this.close('button');
      }
    });
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._boundHandleKeydown);
  }

  _onOpen() {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Add keyboard listener
    document.addEventListener('keydown', this._boundHandleKeydown);
    
    // Focus first focusable element
    requestAnimationFrame(() => {
      this._focusFirstElement();
    });
  }

  _onClose() {
    // Unlock body scroll
    document.body.style.overflow = '';
    
    // Remove keyboard listener
    document.removeEventListener('keydown', this._boundHandleKeydown);
    
    // Return focus
    if (this._returnFocus && typeof this._returnFocus.focus === 'function') {
      this._returnFocus.focus();
    }
    this._returnFocus = null;
  }

  _handleKeydown(e) {
    if (e.key === 'Escape') {
      const escapeEnabled = this.getAttribute('escape') !== 'false';
      if (escapeEnabled) {
        e.preventDefault();
        this.close('escape');
      }
    }
    
    // Tab trap
    if (e.key === 'Tab') {
      this._handleTabTrap(e);
    }
  }

  _handleBackdropClick(e) {
    const backdropBehavior = this.getAttribute('backdrop');
    if (backdropBehavior !== 'static') {
      this.close('backdrop');
    }
  }

  _focusFirstElement() {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    // Check light DOM first
    const focusable = this.querySelector(focusableSelectors);
    if (focusable) {
      focusable.focus();
      return;
    }

    // Fall back to close button in shadow DOM
    const closeButton = this.shadowRoot.querySelector('.close-button');
    if (closeButton && getComputedStyle(closeButton).display !== 'none') {
      closeButton.focus();
      return;
    }

    // Fall back to dialog itself
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog?.setAttribute('tabindex', '-1');
    dialog?.focus();
  }

  _handleTabTrap(e) {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    // Get all focusable elements in light DOM
    const lightFocusables = [...this.querySelectorAll(focusableSelectors)];
    
    // Get focusable elements in shadow DOM (close button)
    const closeButton = this.shadowRoot.querySelector('.close-button');
    const shadowFocusables = closeButton && getComputedStyle(closeButton).display !== 'none' 
      ? [closeButton] 
      : [];
    
    const focusables = [...shadowFocusables, ...lightFocusables];
    
    if (focusables.length === 0) return;

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }

  _updateAriaLabel() {
    const header = this.querySelector('spark-modal-header');
    if (header) {
      const headerId = header.id || `spark-modal-header-${Math.random().toString(36).substr(2, 9)}`;
      header.id = headerId;
      const dialog = this.shadowRoot.querySelector('.dialog');
      dialog?.setAttribute('aria-labelledby', headerId);
    }
  }
}

// =============================================================================
// SparkModalHeader - Header section component
// =============================================================================

const modalHeaderStyles = `
  :host {
    display: block;
    padding: var(--spark-modal-padding, var(--spark-spacing-lg, 1.5rem));
    padding-right: 3rem; /* Space for close button */
    border-bottom: 1px solid var(--spark-gray-200, #e2e8f0);
  }

  header {
    margin: 0;
    font-size: var(--spark-font-size-lg, 1.125rem);
    font-weight: var(--spark-font-weight-semibold, 600);
    color: var(--spark-gray-900, #0f172a);
    line-height: var(--spark-line-height-tight, 1.25);
  }
`;

class SparkModalHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>${modalHeaderStyles}</style>
      <header part="header">
        <slot></slot>
      </header>
    `;
  }
}

// =============================================================================
// SparkModalBody - Body section component
// =============================================================================

const modalBodyStyles = `
  :host {
    display: block;
    padding: var(--spark-modal-padding, var(--spark-spacing-lg, 1.5rem));
    overflow-y: auto;
    flex: 1;
  }

  .body {
    color: var(--spark-gray-700, #334155);
    font-size: var(--spark-font-size-md, 1rem);
    line-height: var(--spark-line-height-normal, 1.5);
  }
`;

class SparkModalBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>${modalBodyStyles}</style>
      <div class="body" part="body">
        <slot></slot>
      </div>
    `;
  }
}

// =============================================================================
// SparkModalFooter - Footer section component
// =============================================================================

const modalFooterStyles = `
  :host {
    display: block;
    padding: var(--spark-modal-padding, var(--spark-spacing-lg, 1.5rem));
    border-top: 1px solid var(--spark-gray-200, #e2e8f0);
    background: var(--spark-gray-50, #f8fafc);
  }

  footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spark-spacing-sm, 0.5rem);
  }
`;

class SparkModalFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>${modalFooterStyles}</style>
      <footer part="footer">
        <slot></slot>
      </footer>
    `;
  }
}

// =============================================================================
// Register Custom Elements
// =============================================================================

if (!customElements.get('spark-modal')) {
  customElements.define('spark-modal', SparkModal);
}

if (!customElements.get('spark-modal-header')) {
  customElements.define('spark-modal-header', SparkModalHeader);
}

if (!customElements.get('spark-modal-body')) {
  customElements.define('spark-modal-body', SparkModalBody);
}

if (!customElements.get('spark-modal-footer')) {
  customElements.define('spark-modal-footer', SparkModalFooter);
}

export { SparkModal, SparkModalHeader, SparkModalBody, SparkModalFooter };

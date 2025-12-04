/**
 * Sample Component - Demonstrates SparkElement usage
 * 
 * This component shows how to:
 * - Extend SparkElement
 * - Use observed attributes
 * - Apply design tokens
 * - Emit custom events
 */

import { SparkElement } from '../core/base-component.js';

export class SparkSample extends SparkElement {
  static get observedAttributes() {
    return ['label', 'count', 'variant'];
  }

  get template() {
    const label = this.getAttribute('label') || 'Sample Component';
    const count = parseInt(this.getAttribute('count') || '0', 10);
    const variant = this.getAttribute('variant') || 'primary';

    return `
      <div class="sample-card variant-${variant}">
        <h3 class="sample-title">${label}</h3>
        <p class="sample-count">Count: <span id="count">${count}</span></p>
        <div class="sample-actions">
          <button class="btn btn-increment" type="button">Increment</button>
          <button class="btn btn-reset" type="button">Reset</button>
        </div>
      </div>
    `;
  }

  get styles() {
    return `
      :host {
        display: block;
      }

      .sample-card {
        padding: var(--spark-spacing-lg);
        border-radius: var(--spark-radius-lg);
        background: var(--spark-white);
        border: var(--spark-border);
        box-shadow: var(--spark-shadow-md);
        transition: var(--spark-transition-all);
      }

      .sample-card:hover {
        box-shadow: var(--spark-shadow-lg);
      }

      .variant-primary {
        border-left: 4px solid var(--spark-primary);
      }

      .variant-success {
        border-left: 4px solid var(--spark-success);
      }

      .variant-warning {
        border-left: 4px solid var(--spark-warning);
      }

      .variant-error {
        border-left: 4px solid var(--spark-error);
      }

      .sample-title {
        margin: 0 0 var(--spark-spacing-sm) 0;
        font-size: var(--spark-font-size-lg);
        font-weight: var(--spark-font-weight-semibold);
        color: var(--spark-gray-900);
      }

      .sample-count {
        margin: 0 0 var(--spark-spacing-md) 0;
        font-size: var(--spark-font-size-2xl);
        font-weight: var(--spark-font-weight-bold);
        color: var(--spark-gray-700);
      }

      .sample-count #count {
        color: var(--spark-primary);
      }

      .sample-actions {
        display: flex;
        gap: var(--spark-spacing-sm);
      }

      .btn {
        padding: var(--spark-spacing-sm) var(--spark-spacing-md);
        border-radius: var(--spark-radius-md);
        font-size: var(--spark-font-size-sm);
        font-weight: var(--spark-font-weight-medium);
        font-family: inherit;
        cursor: pointer;
        transition: var(--spark-transition-colors);
        border: none;
      }

      .btn:focus-visible {
        outline: none;
        box-shadow: var(--spark-focus-ring);
      }

      .btn-increment {
        background: var(--spark-primary);
        color: var(--spark-white);
      }

      .btn-increment:hover {
        background: var(--spark-primary-hover);
      }

      .btn-increment:active {
        background: var(--spark-primary-active);
      }

      .btn-reset {
        background: var(--spark-gray-100);
        color: var(--spark-gray-700);
      }

      .btn-reset:hover {
        background: var(--spark-gray-200);
      }
    `;
  }

  constructor() {
    super();
    // Bind event handler once - survives re-renders via event delegation
    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // Use event delegation on shadowRoot - this survives innerHTML replacement
    this.shadowRoot.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.removeEventListener('click', this._handleClick);
  }

  /**
   * Event delegation handler - survives re-renders because it's on shadowRoot
   */
  _handleClick(event) {
    const target = event.target;
    
    if (target.matches('.btn-increment')) {
      this._increment();
    } else if (target.matches('.btn-reset')) {
      this._reset();
    }
  }

  _increment() {
    const current = parseInt(this.getAttribute('count') || '0', 10);
    const newCount = current + 1;
    this.setAttribute('count', String(newCount));
    
    // Emit custom event
    this.emit('spark-count-change', { 
      count: newCount, 
      action: 'increment' 
    });
  }

  _reset() {
    this.setAttribute('count', '0');
    
    // Emit custom event
    this.emit('spark-count-change', { 
      count: 0, 
      action: 'reset' 
    });
  }
}

// Register the custom element
customElements.define('spark-sample', SparkSample);


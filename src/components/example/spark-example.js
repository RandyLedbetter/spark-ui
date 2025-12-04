/**
 * SparkExample - Example component to verify foundation works
 * 
 * This component demonstrates:
 * - Extending SparkElement
 * - Using design tokens
 * - Shadow DOM encapsulation
 * - Custom events
 * 
 * @example
 * <spark-example name="World"></spark-example>
 */

import { SparkElement } from '../../core/spark-element.js';

const styles = `
  :host {
    display: inline-block;
  }
  
  .example {
    display: inline-flex;
    align-items: center;
    gap: var(--spark-spacing-sm);
    padding: var(--spark-spacing-sm) var(--spark-spacing-md);
    background: var(--spark-primary);
    color: var(--spark-text-inverse);
    border-radius: var(--spark-radius-md);
    font-family: var(--spark-font-family);
    font-size: var(--spark-font-size-md);
    font-weight: var(--spark-font-weight-medium);
    box-shadow: var(--spark-shadow-md);
    transition: all var(--spark-transition-fast);
    cursor: pointer;
    border: none;
    user-select: none;
  }
  
  .example:hover {
    background: var(--spark-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--spark-shadow-lg);
  }
  
  .example:active {
    background: var(--spark-primary-active);
    transform: translateY(0);
    box-shadow: var(--spark-shadow-sm);
  }
  
  .icon {
    font-size: var(--spark-font-size-lg);
  }
  
  .count {
    background: rgba(255, 255, 255, 0.2);
    padding: var(--spark-spacing-xs) var(--spark-spacing-sm);
    border-radius: var(--spark-radius-full);
    font-size: var(--spark-font-size-sm);
  }
`;

export class SparkExample extends SparkElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this._count = 0;
  }

  connectedCallback() {
    this.injectTokens();
    this.injectStyles(styles);
    this._render();
    this._setupListeners();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal && this.shadowRoot.querySelector('.example')) {
      this._render();
    }
  }

  get name() {
    return this.getAttr('name', 'Spark');
  }

  get count() {
    return this._count;
  }

  _render() {
    this.render(`
      <button class="example" part="button">
        <span class="icon">⚡</span>
        <span class="text">Hello, ${this.name}!</span>
        <span class="count">${this._count}</span>
      </button>
    `);
    
    // Re-attach listener after render
    this._setupListeners();
  }

  _setupListeners() {
    const button = this.$('.example');
    if (button) {
      button.addEventListener('click', () => this._handleClick());
    }
  }

  _handleClick() {
    this._count++;
    this._render();
    
    // Emit custom event
    this.emit('spark-click', { 
      count: this._count,
      name: this.name 
    });
  }
}

// Register the custom element
customElements.define('spark-example', SparkExample);

export default SparkExample;


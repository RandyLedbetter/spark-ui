import { SparkElement } from '../../core/base-component.js';

const BUTTON_ATTRIBUTES = ['variant', 'size', 'disabled', 'loading', 'type'];
const BUTTON_TYPES = new Set(['button', 'submit', 'reset']);

export class SparkButton extends SparkElement {
  static get observedAttributes() {
    return BUTTON_ATTRIBUTES;
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('click', this.handleClick);
  }

  get variant() {
    return this.getAttributeWithDefault('variant', 'primary');
  }

  get size() {
    return this.getAttributeWithDefault('size', 'medium');
  }

  get disabled() {
    return this.getBooleanAttribute('disabled');
  }

  get loading() {
    return this.getBooleanAttribute('loading');
  }

  get type() {
    const requestedType = this.getAttribute('type');
    if (!requestedType) {
      return 'button';
    }
    const normalized = requestedType.toLowerCase();
    return BUTTON_TYPES.has(normalized) ? normalized : 'button';
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
    super.disconnectedCallback();
  }

  get template() {
    const isDisabled = this.disabled || this.loading;
    const spinnerTemplate = this.loading
      ? '<span part="spinner" class="spark-button__spinner" aria-hidden="true"></span>'
      : '';

    return `
      <button
        part="button"
        type="${this.type}"
        data-variant="${this.variant}"
        data-size="${this.size}"
        ${isDisabled ? 'disabled' : ''}
        aria-disabled="${isDisabled ? 'true' : 'false'}"
        aria-busy="${this.loading ? 'true' : 'false'}"
      >
        <span part="icon-start" class="spark-button__icon spark-button__icon--start">
          <slot name="icon-start"></slot>
        </span>
        <span part="label" class="spark-button__label">
          <slot></slot>
        </span>
        <span part="icon-end" class="spark-button__icon spark-button__icon--end">
          <slot name="icon-end"></slot>
        </span>
        ${spinnerTemplate}
      </button>
    `;
  }

  get styles() {
    return `
      :host {
        display: inline-flex;
      }

      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: var(--spark-button-padding-y, 0.5rem) var(--spark-button-padding-x, 1rem);
        font-size: var(--spark-button-font-size, 1rem);
        border-radius: var(--spark-button-border-radius, var(--spark-radius-md, 0.5rem));
        cursor: pointer;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      .spark-button__icon {
        display: inline-flex;
        align-items: center;
      }

      .spark-button__icon:empty {
        display: none;
      }

      .spark-button__spinner {
        display: inline-flex;
      }
    `;
  }

  handleClick(event) {
    const button = this.shadowRoot.querySelector('button');
    if (!button) {
      return;
    }

    const inButtonPath = event.composedPath().includes(button);
    if (!inButtonPath) {
      return;
    }

    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.emit('spark-click', { originalEvent: event });
  }
}

if (!customElements.get('spark-button')) {
  customElements.define('spark-button', SparkButton);
}

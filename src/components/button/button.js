import buttonStyles from './button.css?raw';

const DEFAULT_VARIANT = 'primary';
const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'button';

const VALID_VARIANTS = new Set(['primary', 'secondary', 'outline', 'ghost', 'danger']);
const VALID_SIZES = new Set(['small', 'medium', 'large']);
const VALID_TYPES = new Set(['button', 'submit', 'reset']);

const template = document.createElement('template');
template.innerHTML = `
  <style>${buttonStyles}</style>
  <button
    class="spark-button"
    part="button"
    type="${DEFAULT_TYPE}"
    data-variant="${DEFAULT_VARIANT}"
    data-size="${DEFAULT_SIZE}"
    data-loading="false"
  >
    <span class="spark-button__spinner" part="spinner" aria-hidden="true"></span>
    <span class="spark-button__content" part="content">
      <slot></slot>
    </span>
  </button>
`;

/**
 * SparkButton Web Component
 */
export class SparkButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading', 'type'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._button = this.shadowRoot.querySelector('button');
    this._spinner = this.shadowRoot.querySelector('.spark-button__spinner');
    this._content = this.shadowRoot.querySelector('.spark-button__content');
  }

  connectedCallback() {
    this._upgradeProperty('variant');
    this._upgradeProperty('size');
    this._upgradeProperty('disabled');
    this._upgradeProperty('loading');
    this._upgradeProperty('type');

    this._syncAttributes();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this._syncAttributes();
  }

  get variant() {
    return this.getAttribute('variant') ?? DEFAULT_VARIANT;
  }

  set variant(value) {
    if (value === null || value === undefined || value === '') {
      this.removeAttribute('variant');
      return;
    }

    this.setAttribute('variant', value);
  }

  get size() {
    return this.getAttribute('size') ?? DEFAULT_SIZE;
  }

  set size(value) {
    if (value === null || value === undefined || value === '') {
      this.removeAttribute('size');
      return;
    }

    this.setAttribute('size', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this._toggleBooleanAttribute('disabled', value);
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    this._toggleBooleanAttribute('loading', value);
  }

  get type() {
    return this.getAttribute('type') ?? DEFAULT_TYPE;
  }

  set type(value) {
    if (value === null || value === undefined || value === '') {
      this.removeAttribute('type');
      return;
    }

    this.setAttribute('type', value);
  }

  _toggleBooleanAttribute(name, value) {
    if (value === false || value === null || value === undefined) {
      this.removeAttribute(name);
    } else {
      this.setAttribute(name, '');
    }
  }

  _upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _syncAttributes() {
    if (!this._button) {
      return;
    }

    const variant = this._normalizeVariant(this.getAttribute('variant'));
    const size = this._normalizeSize(this.getAttribute('size'));
    const type = this._normalizeType(this.getAttribute('type'));
    const isDisabled = this.hasAttribute('disabled');
    const isLoading = this.hasAttribute('loading');
    const showSpinner = isLoading && !isDisabled;

    this._button.dataset.variant = variant;
    this._button.dataset.size = size;
    this._button.dataset.loading = showSpinner ? 'true' : 'false';
    this._button.type = type;
    this._button.disabled = isDisabled || isLoading;
    this._button.setAttribute('aria-busy', showSpinner ? 'true' : 'false');
    this._button.setAttribute('aria-live', showSpinner ? 'polite' : 'off');

    this._spinner.hidden = !showSpinner;
    this._content.setAttribute('aria-hidden', showSpinner ? 'true' : 'false');
  }

  _normalizeVariant(value) {
    const normalized = (value ?? DEFAULT_VARIANT).toLowerCase();
    return VALID_VARIANTS.has(normalized) ? normalized : DEFAULT_VARIANT;
  }

  _normalizeSize(value) {
    const normalized = (value ?? DEFAULT_SIZE).toLowerCase();
    return VALID_SIZES.has(normalized) ? normalized : DEFAULT_SIZE;
  }

  _normalizeType(value) {
    const normalized = (value ?? DEFAULT_TYPE).toLowerCase();
    return VALID_TYPES.has(normalized) ? normalized : DEFAULT_TYPE;
  }
}

export function defineSparkButton() {
  if (!customElements.get('spark-button')) {
    customElements.define('spark-button', SparkButton);
  }
}

defineSparkButton();

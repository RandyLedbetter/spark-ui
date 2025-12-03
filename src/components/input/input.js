/**
 * SparkInput - Accessible form input Web Component
 * 
 * Provides labeled text fields with built-in validation states,
 * helper text, and error messaging.
 * 
 * @element spark-input
 * 
 * @attr {string} label - Label text displayed above the input
 * @attr {string} type - Input type (text, email, password, number, search)
 * @attr {string} placeholder - Placeholder text
 * @attr {string} value - Input value
 * @attr {string} helper - Helper text displayed below input
 * @attr {string} error - Error message (takes precedence over helper)
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} required - Required field indicator
 * @attr {string} name - Form field name
 * 
 * @fires input - Fires on each keystroke with { value } detail
 * @fires change - Fires on blur after change with { value } detail
 * 
 * @example
 * <spark-input 
 *   label="Email" 
 *   type="email" 
 *   placeholder="you@example.com"
 *   required>
 * </spark-input>
 */

const styles = `
  :host {
    display: block;
    font-family: var(--spark-font-family, system-ui, sans-serif);
  }

  :host([hidden]) {
    display: none;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spark-spacing-xs, 0.25rem);
  }

  /* Label Styles */
  .label {
    display: flex;
    align-items: center;
    gap: var(--spark-spacing-xs, 0.25rem);
    font-size: var(--spark-font-size-sm, 0.875rem);
    font-weight: var(--spark-font-weight-medium, 500);
    color: var(--spark-input-label-color, var(--spark-gray-700, #334155));
    line-height: var(--spark-line-height-normal, 1.5);
  }

  .label:empty {
    display: none;
  }

  .required-indicator {
    color: var(--spark-error, #ef4444);
  }

  /* Input Container */
  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  /* Native Input Styles */
  .native-input {
    width: 100%;
    padding: var(--spark-input-padding, var(--spark-spacing-sm, 0.5rem) var(--spark-spacing-md, 1rem));
    font-family: inherit;
    font-size: var(--spark-input-font-size, var(--spark-font-size-md, 1rem));
    line-height: var(--spark-line-height-normal, 1.5);
    color: var(--spark-gray-900, #0f172a);
    background-color: var(--spark-white, #ffffff);
    border: var(--spark-input-border, 1px solid var(--spark-gray-300, #cbd5e1));
    border-radius: var(--spark-input-radius, var(--spark-radius-md, 0.5rem));
    outline: none;
    transition: border-color var(--spark-transition-fast, 150ms ease),
                box-shadow var(--spark-transition-fast, 150ms ease);
  }

  .native-input::placeholder {
    color: var(--spark-gray-400, #94a3b8);
  }

  /* Focus State */
  .native-input:focus {
    border-color: var(--spark-input-border-focus, var(--spark-primary, #6366f1));
    box-shadow: var(--spark-focus-ring, 0 0 0 3px rgba(99, 102, 241, 0.2));
  }

  /* Error State */
  :host([error]) .native-input {
    border-color: var(--spark-input-border-error, var(--spark-error, #ef4444));
  }

  :host([error]) .native-input:focus {
    border-color: var(--spark-input-border-error, var(--spark-error, #ef4444));
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }

  /* Disabled State */
  .native-input:disabled {
    background-color: var(--spark-gray-100, #f1f5f9);
    color: var(--spark-gray-500, #64748b);
    cursor: not-allowed;
  }

  :host([disabled]) .label {
    color: var(--spark-gray-400, #94a3b8);
  }

  /* Message Area (Helper/Error) */
  .message {
    font-size: var(--spark-font-size-sm, 0.875rem);
    line-height: var(--spark-line-height-normal, 1.5);
    min-height: 1.25rem;
  }

  .message:empty {
    display: none;
  }

  .message--helper {
    color: var(--spark-gray-500, #64748b);
  }

  .message--error {
    color: var(--spark-input-error-color, var(--spark-error, #ef4444));
  }
`;

// Generate unique IDs for accessibility associations
let instanceCounter = 0;

class SparkInput extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'type',
      'placeholder',
      'value',
      'helper',
      'error',
      'disabled',
      'required',
      'name'
    ];
  }

  constructor() {
    super();
    
    // Create unique IDs for this instance
    this._instanceId = ++instanceCounter;
    this._inputId = `spark-input-${this._instanceId}`;
    this._messageId = `spark-input-message-${this._instanceId}`;
    
    // Attach Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Render initial structure
    this._render();
    
    // Cache element references
    this._labelEl = this.shadowRoot.querySelector('.label-text');
    this._inputEl = this.shadowRoot.querySelector('.native-input');
    this._messageEl = this.shadowRoot.querySelector('.message');
    this._requiredIndicator = this.shadowRoot.querySelector('.required-indicator');
    
    // Bind event handlers
    this._handleInput = this._handleInput.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="input-wrapper">
        <label class="label" for="${this._inputId}">
          <span class="label-text"></span>
          <span class="required-indicator" aria-hidden="true" hidden>*</span>
        </label>
        <div class="input-container">
          <input 
            class="native-input"
            id="${this._inputId}"
            type="text"
            aria-describedby="${this._messageId}"
          />
        </div>
        <div class="message" id="${this._messageId}" aria-live="polite"></div>
      </div>
    `;
  }

  connectedCallback() {
    // Attach event listeners
    this._inputEl.addEventListener('input', this._handleInput);
    this._inputEl.addEventListener('change', this._handleChange);
    
    // Sync initial attributes
    this._syncAttributes();
  }

  disconnectedCallback() {
    // Clean up event listeners
    this._inputEl.removeEventListener('input', this._handleInput);
    this._inputEl.removeEventListener('change', this._handleChange);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'label':
        this._updateLabel(newValue);
        break;
      case 'type':
        this._inputEl.type = newValue || 'text';
        break;
      case 'placeholder':
        this._inputEl.placeholder = newValue || '';
        break;
      case 'value':
        if (this._inputEl.value !== newValue) {
          this._inputEl.value = newValue || '';
        }
        break;
      case 'helper':
      case 'error':
        this._updateMessage();
        break;
      case 'disabled':
        this._inputEl.disabled = newValue !== null;
        break;
      case 'required':
        this._updateRequired(newValue !== null);
        break;
      case 'name':
        this._inputEl.name = newValue || '';
        break;
    }
  }

  _syncAttributes() {
    // Sync all observed attributes on connect
    SparkInput.observedAttributes.forEach(attr => {
      const value = this.getAttribute(attr);
      if (value !== null || this.hasAttribute(attr)) {
        this.attributeChangedCallback(attr, null, value);
      }
    });
  }

  _updateLabel(text) {
    this._labelEl.textContent = text || '';
  }

  _updateRequired(isRequired) {
    this._inputEl.required = isRequired;
    this._inputEl.setAttribute('aria-required', isRequired.toString());
    this._requiredIndicator.hidden = !isRequired;
  }

  _updateMessage() {
    const error = this.getAttribute('error');
    const helper = this.getAttribute('helper');
    
    // Error takes precedence over helper
    if (error) {
      this._messageEl.textContent = error;
      this._messageEl.className = 'message message--error';
      this._inputEl.setAttribute('aria-invalid', 'true');
    } else if (helper) {
      this._messageEl.textContent = helper;
      this._messageEl.className = 'message message--helper';
      this._inputEl.removeAttribute('aria-invalid');
    } else {
      this._messageEl.textContent = '';
      this._messageEl.className = 'message';
      this._inputEl.removeAttribute('aria-invalid');
    }
  }

  _handleInput(event) {
    // Sync value attribute
    this.setAttribute('value', event.target.value);
    
    // Dispatch custom input event
    this.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: event.target.value }
    }));
  }

  _handleChange(event) {
    // Dispatch custom change event
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: event.target.value }
    }));
  }

  // Public API - Getters and Setters
  get value() {
    return this._inputEl?.value || '';
  }

  set value(val) {
    if (this._inputEl) {
      this._inputEl.value = val;
    }
    this.setAttribute('value', val);
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(val) {
    this.setAttribute('label', val);
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(val) {
    this.setAttribute('placeholder', val);
  }

  get helper() {
    return this.getAttribute('helper') || '';
  }

  set helper(val) {
    this.setAttribute('helper', val);
  }

  get error() {
    return this.getAttribute('error') || '';
  }

  set error(val) {
    if (val) {
      this.setAttribute('error', val);
    } else {
      this.removeAttribute('error');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(val) {
    if (val) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val) {
    this.setAttribute('name', val);
  }

  // Public method to focus the input
  focus() {
    this._inputEl?.focus();
  }

  // Public method to blur the input
  blur() {
    this._inputEl?.blur();
  }
}

// Register the custom element
customElements.define('spark-input', SparkInput);

export { SparkInput };
export default SparkInput;

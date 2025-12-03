import './toast.css';

const CONTAINER_TAG = 'spark-toast-container';
const DEFAULT_GLOBAL_OPTIONS = {
  position: 'top-right',
  maxStack: 5,
  defaultDuration: 3000
};

const TOAST_TYPES = ['info', 'success', 'warning', 'error'];
const TYPE_ICONS = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌'
};

const TOAST_STYLES = `
  :host {
    position: fixed;
    z-index: var(--spark-toast-z-index, var(--spark-z-toast, 800));
    display: block;
    pointer-events: none;
  }

  :host([position="top-right"]) {
    top: var(--spark-spacing-lg, 1.5rem);
    right: var(--spark-spacing-lg, 1.5rem);
  }

  :host([position="top-left"]) {
    top: var(--spark-spacing-lg, 1.5rem);
    left: var(--spark-spacing-lg, 1.5rem);
  }

  :host([position="bottom-right"]) {
    bottom: var(--spark-spacing-lg, 1.5rem);
    right: var(--spark-spacing-lg, 1.5rem);
  }

  :host([position="bottom-left"]) {
    bottom: var(--spark-spacing-lg, 1.5rem);
    left: var(--spark-spacing-lg, 1.5rem);
  }

  .toast-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spark-toast-gap, 0.5rem);
    pointer-events: none;
    max-width: 360px;
  }

  :host([position$="left"]) .toast-stack {
    align-items: flex-start;
  }

  :host([position$="right"]) .toast-stack {
    align-items: flex-end;
  }

  .toast {
    min-width: 240px;
    max-width: 360px;
    background: var(--spark-toast-bg, var(--spark-white, #ffffff));
    color: var(--spark-toast-text, var(--spark-secondary, #475569));
    border-radius: var(--spark-toast-radius, var(--spark-radius-md, 0.5rem));
    box-shadow: var(--spark-toast-shadow, var(--spark-shadow-md, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)));
    padding: var(--spark-toast-padding, 0.5rem 1rem);
    display: flex;
    gap: var(--spark-toast-gap, 0.5rem);
    align-items: flex-start;
    pointer-events: auto;
    animation: spark-toast-in 200ms ease forwards;
  }

  .toast--leaving {
    animation: spark-toast-out 200ms ease forwards;
  }

  .toast__icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .toast__content {
    flex: 1;
  }

  .toast__message {
    font-size: var(--spark-font-size-sm, 0.875rem);
    line-height: var(--spark-line-height-normal, 1.5);
  }

  .toast__close {
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
  }

  .toast__close:focus-visible {
    outline: var(--spark-focus-ring, 0 0 0 3px rgba(99, 102, 241, 0.5));
  }

  .toast--info {
    border-left: 4px solid var(--spark-toast-info, var(--spark-info, #3b82f6));
  }

  .toast--success {
    border-left: 4px solid var(--spark-toast-success, var(--spark-success, #22c55e));
  }

  .toast--warning {
    border-left: 4px solid var(--spark-toast-warning, var(--spark-warning, #f59e0b));
  }

  .toast--error {
    border-left: 4px solid var(--spark-toast-error, var(--spark-error, #ef4444));
  }

  @keyframes spark-toast-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spark-toast-out {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(8px);
    }
  }
`;

const template = document.createElement('template');
template.innerHTML = `
  <style>${TOAST_STYLES}</style>
  <div class="toast-stack" role="region" aria-live="polite" aria-atomic="false"></div>
`;

class DeferredToastInstance {
  constructor() {
    this._attached = null;
    this._dismissRequested = false;
  }

  attach(instance) {
    this._attached = instance;
    if (this._dismissRequested) {
      instance.dismiss();
    } else {
      this.dismiss = instance.dismiss.bind(instance);
    }
  }

  dismiss() {
    this._dismissRequested = true;
    if (this._attached) {
      this._attached.dismiss();
    }
  }
}

class SparkToastContainer extends HTMLElement {
  static get observedAttributes() {
    return ['position'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.stackEl = this.shadowRoot.querySelector('.toast-stack');
    this.toastRecords = new Map();
    this.options = { ...DEFAULT_GLOBAL_OPTIONS };
  }

  connectedCallback() {
    if (!this.hasAttribute('position')) {
      this.setAttribute('position', this.options.position || DEFAULT_GLOBAL_OPTIONS.position);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'position' && newValue === null) {
      this.setAttribute('position', DEFAULT_GLOBAL_OPTIONS.position);
    }
  }

  setOptions(options = {}) {
    this.options = {
      ...this.options,
      ...options
    };
  }

  addToast(options) {
    const normalized = this.normalizeOptions(options);
    this.syncPosition(normalized.position);
    this.enforceMaxStack();

    const toastElement = this.createToastElement(normalized);
    this.stackEl.appendChild(toastElement);

    const timer = normalized.duration > 0
      ? window.setTimeout(() => this.dismissToast(toastElement), normalized.duration)
      : null;

    this.toastRecords.set(toastElement, {
      timer,
      onDismiss: normalized.onDismiss
    });

    return {
      dismiss: () => this.dismissToast(toastElement)
    };
  }

  dismissToast(element, { immediate = false } = {}) {
    if (!element || !this.toastRecords.has(element)) {
      return;
    }

    const record = this.toastRecords.get(element);
    if (record.timer) {
      window.clearTimeout(record.timer);
    }

    const finalize = () => {
      if (element.isConnected) {
        element.remove();
      }
      this.toastRecords.delete(element);
      if (typeof record.onDismiss === 'function') {
        record.onDismiss();
      }
    };

    if (immediate) {
      finalize();
      return;
    }

    element.classList.add('toast--leaving');
    const handleAnimationEnd = () => {
      element.removeEventListener('animationend', handleAnimationEnd);
      finalize();
    };
    element.addEventListener('animationend', handleAnimationEnd);
  }

  dismissAll() {
    Array.from(this.toastRecords.keys()).forEach(element => {
      this.dismissToast(element, { immediate: true });
    });
  }

  enforceMaxStack() {
    const maxStack = this.options.maxStack || DEFAULT_GLOBAL_OPTIONS.maxStack;
    while (this.stackEl.children.length >= maxStack) {
      const oldest = this.stackEl.firstElementChild;
      if (!oldest) {
        break;
      }
      this.dismissToast(oldest, { immediate: true });
    }
  }

  normalizeOptions(options) {
    return {
      id: options.id,
      message: options.message,
      type: TOAST_TYPES.includes(options.type) ? options.type : 'info',
      duration: typeof options.duration === 'number'
        ? Math.max(0, options.duration)
        : this.options.defaultDuration,
      position: options.position || this.options.position || DEFAULT_GLOBAL_OPTIONS.position,
      onDismiss: options.onDismiss
    };
  }

  syncPosition(position) {
    if (position && this.getAttribute('position') !== position) {
      this.setAttribute('position', position);
    }
  }

  createToastElement(options) {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast--${options.type}`);
    toast.setAttribute('role', options.type === 'error' ? 'alert' : 'status');
    toast.setAttribute('aria-live', options.type === 'error' ? 'assertive' : 'polite');
    toast.setAttribute('aria-atomic', 'true');

    const icon = document.createElement('span');
    icon.className = 'toast__icon';
    icon.textContent = TYPE_ICONS[options.type] || TYPE_ICONS.info;

    const content = document.createElement('div');
    content.className = 'toast__content';

    const message = document.createElement('span');
    message.className = 'toast__message';
    message.textContent = options.message;

    content.appendChild(message);

    const closeButton = document.createElement('button');
    closeButton.className = 'toast__close';
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('aria-label', 'Dismiss notification');
    closeButton.textContent = '✕';
    closeButton.addEventListener('click', () => this.dismissToast(toast));

    toast.append(icon, content, closeButton);
    return toast;
  }
}

function defineToastContainer() {
  if (!customElements.get(CONTAINER_TAG)) {
    customElements.define(CONTAINER_TAG, SparkToastContainer);
  }
}

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

class SparkToastAPI {
  constructor() {
    this.globalOptions = { ...DEFAULT_GLOBAL_OPTIONS };
    this.container = null;
    this.pending = [];
    this.domReady = !canUseDOM() || document.readyState !== 'loading';

    if (canUseDOM()) {
      if (!this.domReady) {
        document.addEventListener('DOMContentLoaded', () => {
          this.domReady = true;
          this.flushPending();
        }, { once: true });
      }
      defineToastContainer();
    }
  }

  configure(options = {}) {
    this.globalOptions = {
      ...this.globalOptions,
      ...options
    };
    const container = this.getContainer();
    if (container) {
      container.setOptions(this.globalOptions);
      if (options.position) {
        container.setAttribute('position', options.position);
      }
    }
  }

  show(messageOrOptions) {
    const options = this.normalizeInput(messageOrOptions);
    if (!options.message) {
      throw new Error('SparkToast.show() requires a message');
    }

    if (!canUseDOM()) {
      return { dismiss: () => {} };
    }

    if (!this.domReady || !document.body) {
      return this.queueToast(options);
    }

    return this.performShow(options);
  }

  success(message, options = {}) {
    return this.show({ ...options, message, type: 'success' });
  }

  error(message, options = {}) {
    return this.show({ ...options, message, type: 'error' });
  }

  warning(message, options = {}) {
    return this.show({ ...options, message, type: 'warning' });
  }

  info(message, options = {}) {
    return this.show({ ...options, message, type: 'info' });
  }

  dismissAll() {
    const container = this.getContainer(false);
    if (container) {
      container.dismissAll();
    }
  }

  getContainer(ensure = true) {
    if (!canUseDOM()) {
      return null;
    }

    defineToastContainer();

    if (this.container && document.body.contains(this.container)) {
      return this.container;
    }

    let container = document.querySelector(CONTAINER_TAG);
    if (!container && ensure) {
      if (!document.body) {
        return null;
      }
      container = document.createElement(CONTAINER_TAG);
      document.body.appendChild(container);
    }

    if (container) {
      container.setOptions(this.globalOptions);
      if (this.globalOptions.position) {
        container.setAttribute('position', this.globalOptions.position);
      }
      this.container = container;
    }

    return container;
  }

  performShow(options) {
    const container = this.getContainer();
    if (!container) {
      throw new Error('spark-toast-container could not be created');
    }

    const merged = {
      ...options,
      duration: typeof options.duration === 'number'
        ? options.duration
        : this.globalOptions.defaultDuration,
      position: options.position || this.globalOptions.position,
      id: options.id || `spark-toast-${Date.now()}-${Math.round(Math.random() * 1000)}`
    };

    return container.addToast(merged);
  }

  queueToast(options) {
    const deferred = new DeferredToastInstance();
    this.pending.push({ options, deferred });
    return deferred;
  }

  flushPending() {
    if (!this.pending.length) {
      return;
    }
    const queue = [...this.pending];
    this.pending = [];
    queue.forEach(item => {
      const instance = this.performShow(item.options);
      item.deferred.attach(instance);
    });
  }

  normalizeInput(input) {
    if (typeof input === 'string') {
      return { message: input };
    }
    return { ...input };
  }
}

const SparkToast = new SparkToastAPI();

if (canUseDOM() && !window.SparkToast) {
  window.SparkToast = SparkToast;
}

export { SparkToast, SparkToastContainer };
export default SparkToast;

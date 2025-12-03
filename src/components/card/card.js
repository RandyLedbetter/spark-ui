/**
 * Spark Card Components
 * 
 * A flexible container Web Component for grouping related content
 * with optional header, body, and footer sections.
 * 
 * @example
 * <spark-card>
 *   <spark-card-header>Title</spark-card-header>
 *   <spark-card-body>Content</spark-card-body>
 *   <spark-card-footer>Actions</spark-card-footer>
 * </spark-card>
 */

/**
 * SparkCard - Main card container component
 * 
 * @element spark-card
 * @slot - Default slot for card content (header, body, footer, or any content)
 * 
 * @attr {string} elevation - Shadow depth (0-3), default: 1
 * @attr {boolean} clickable - Makes the card interactive
 * 
 * @cssprop --spark-card-bg - Card background color
 * @cssprop --spark-card-border - Card border
 * @cssprop --spark-card-radius - Card border radius
 * @cssprop --spark-card-padding - Card padding (used when no sections)
 */
export class SparkCard extends HTMLElement {
  static get observedAttributes() {
    return ['elevation', 'clickable'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  connectedCallback() {
    this._updateClickable();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'elevation') {
      this._updateElevation();
    } else if (name === 'clickable') {
      this._updateClickable();
    }
  }

  get elevation() {
    const value = parseInt(this.getAttribute('elevation'), 10);
    // Clamp to valid range 0-3
    if (isNaN(value)) return 1;
    return Math.max(0, Math.min(3, value));
  }

  set elevation(value) {
    this.setAttribute('elevation', String(value));
  }

  get clickable() {
    return this.hasAttribute('clickable');
  }

  set clickable(value) {
    if (value) {
      this.setAttribute('clickable', '');
    } else {
      this.removeAttribute('clickable');
    }
  }

  _updateElevation() {
    const card = this.shadowRoot.querySelector('.card');
    if (card) {
      card.dataset.elevation = String(this.elevation);
    }
  }

  _updateClickable() {
    const card = this.shadowRoot.querySelector('.card');
    if (!card) return;

    if (this.clickable) {
      this.setAttribute('tabindex', '0');
      this.setAttribute('role', 'button');
      card.classList.add('clickable');
      
      // Add keyboard handler
      this._keydownHandler = this._handleKeydown.bind(this);
      this.addEventListener('keydown', this._keydownHandler);
    } else {
      this.removeAttribute('tabindex');
      this.removeAttribute('role');
      card.classList.remove('clickable');
      
      if (this._keydownHandler) {
        this.removeEventListener('keydown', this._keydownHandler);
      }
    }
  }

  _handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  }

  _render() {
    const elevation = this.elevation;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          --_card-bg: var(--spark-card-bg, var(--spark-white, #ffffff));
          --_card-border: var(--spark-card-border, 1px solid var(--spark-gray-200, #e2e8f0));
          --_card-radius: var(--spark-card-radius, var(--spark-radius-lg, 1rem));
          
          background: var(--_card-bg);
          border: var(--_card-border);
          border-radius: var(--_card-radius);
          overflow: hidden;
          transition: box-shadow var(--spark-transition-normal, 200ms ease),
                      transform var(--spark-transition-normal, 200ms ease);
        }

        /* Elevation levels */
        .card[data-elevation="0"] {
          box-shadow: var(--spark-shadow-none, none);
        }

        .card[data-elevation="1"] {
          box-shadow: var(--spark-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
        }

        .card[data-elevation="2"] {
          box-shadow: var(--spark-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1));
        }

        .card[data-elevation="3"] {
          box-shadow: var(--spark-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1));
        }

        /* Clickable state */
        .card.clickable {
          cursor: pointer;
        }

        .card.clickable:hover {
          box-shadow: var(--spark-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1));
        }

        .card.clickable:active {
          transform: scale(0.99);
        }

        /* Focus state for accessibility */
        :host(:focus-visible) .card {
          outline: none;
          box-shadow: var(--spark-focus-ring, 0 0 0 2px #ffffff, 0 0 0 5px rgba(99, 102, 241, 0.5));
        }
      </style>
      <div class="card" data-elevation="${elevation}">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SparkCardHeader - Card header section component
 * 
 * @element spark-card-header
 * @slot - Default slot for header content
 * 
 * @cssprop --spark-card-header-bg - Header background color
 * @cssprop --spark-card-header-padding - Header padding
 */
export class SparkCardHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .header {
          --_header-bg: var(--spark-card-header-bg, transparent);
          --_header-padding: var(--spark-card-header-padding, var(--spark-spacing-md, 1rem));
          --_border-color: var(--spark-gray-200, #e2e8f0);

          background: var(--_header-bg);
          padding: var(--_header-padding);
          border-bottom: 1px solid var(--_border-color);
          font-weight: var(--spark-font-weight-semibold, 600);
        }
      </style>
      <div class="header">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SparkCardBody - Card body section component
 * 
 * @element spark-card-body
 * @slot - Default slot for body content
 * 
 * @cssprop --spark-card-body-padding - Body padding
 */
export class SparkCardBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .body {
          --_body-padding: var(--spark-card-body-padding, var(--spark-spacing-md, 1rem));

          padding: var(--_body-padding);
        }
      </style>
      <div class="body">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SparkCardFooter - Card footer section component
 * 
 * @element spark-card-footer
 * @slot - Default slot for footer content
 * 
 * @cssprop --spark-card-footer-bg - Footer background color
 * @cssprop --spark-card-footer-padding - Footer padding
 */
export class SparkCardFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .footer {
          --_footer-bg: var(--spark-card-footer-bg, var(--spark-gray-50, #f8fafc));
          --_footer-padding: var(--spark-card-footer-padding, var(--spark-spacing-md, 1rem));
          --_border-color: var(--spark-gray-200, #e2e8f0);

          background: var(--_footer-bg);
          padding: var(--_footer-padding);
          border-top: 1px solid var(--_border-color);
        }
      </style>
      <div class="footer">
        <slot></slot>
      </div>
    `;
  }
}

// Register custom elements
if (!customElements.get('spark-card')) {
  customElements.define('spark-card', SparkCard);
}

if (!customElements.get('spark-card-header')) {
  customElements.define('spark-card-header', SparkCardHeader);
}

if (!customElements.get('spark-card-body')) {
  customElements.define('spark-card-body', SparkCardBody);
}

if (!customElements.get('spark-card-footer')) {
  customElements.define('spark-card-footer', SparkCardFooter);
}

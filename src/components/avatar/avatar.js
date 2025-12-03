/**
 * SparkAvatar Web Component
 * 
 * Displays user profile images with fallback to initials or default icon.
 * 
 * @example
 * <spark-avatar src="/user.jpg" alt="John Doe" size="large"></spark-avatar>
 * <spark-avatar initials="JD" size="medium"></spark-avatar>
 * <spark-avatar></spark-avatar>
 */

const AVATAR_SIZES = {
  small: 24,
  medium: 40,
  large: 64,
  xlarge: 96
};

// Color palette for initials-based background colors
const INITIALS_COLORS = [
  '#6366f1', '#8b5cf6', '#d946ef', '#ec4899',
  '#f43f5e', '#f97316', '#eab308', '#22c55e',
  '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6'
];

/**
 * Generate consistent background color from initials
 * @param {string} initials - The initials to generate color for
 * @returns {string} Hex color code
 */
function getColorFromInitials(initials) {
  if (!initials) return INITIALS_COLORS[0];
  const charCode = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return INITIALS_COLORS[charCode % INITIALS_COLORS.length];
}

/**
 * Default user icon SVG
 * @returns {string} SVG markup
 */
function getDefaultIconSvg() {
  return `
    <svg class="default-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  `;
}

class SparkAvatar extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'alt', 'initials', 'size', 'status'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._imageLoaded = false;
    this._imageError = false;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Reset image state when src changes
      if (name === 'src') {
        this._imageLoaded = false;
        this._imageError = false;
      }
      this.render();
    }
  }

  // Attribute getters
  get src() {
    return this.getAttribute('src') || '';
  }

  get alt() {
    return this.getAttribute('alt') || '';
  }

  get initials() {
    const value = this.getAttribute('initials') || '';
    // Truncate to first 2 characters
    return value.substring(0, 2).toUpperCase();
  }

  get size() {
    const value = this.getAttribute('size');
    return AVATAR_SIZES[value] ? value : 'medium';
  }

  get status() {
    const value = this.getAttribute('status');
    return ['online', 'away', 'busy', 'offline'].includes(value) ? value : null;
  }

  get sizeInPixels() {
    return AVATAR_SIZES[this.size];
  }

  /**
   * Handle image load success
   */
  handleImageLoad() {
    this._imageLoaded = true;
    this._imageError = false;
    this.updateVisibility();
  }

  /**
   * Handle image load error - fallback to initials or default icon
   */
  handleImageError() {
    this._imageLoaded = false;
    this._imageError = true;
    this.updateVisibility();
  }

  /**
   * Update visibility of image/initials/icon based on state
   */
  updateVisibility() {
    const img = this.shadowRoot.querySelector('.avatar-image');
    const initialsEl = this.shadowRoot.querySelector('.initials');
    const iconEl = this.shadowRoot.querySelector('.default-icon');

    if (!img || !initialsEl || !iconEl) return;

    const showImage = this.src && this._imageLoaded && !this._imageError;
    const showInitials = !showImage && this.initials;
    const showIcon = !showImage && !showInitials;

    img.style.display = showImage ? 'block' : 'none';
    initialsEl.style.display = showInitials ? 'flex' : 'none';
    iconEl.style.display = showIcon ? 'flex' : 'none';
  }

  render() {
    const size = this.sizeInPixels;
    const initialsColor = getColorFromInitials(this.initials);
    const hasImage = this.src && !this._imageError;
    const hasInitials = !!this.initials;

    // Calculate font size based on avatar size
    const fontSize = Math.round(size * 0.4);
    const iconSize = Math.round(size * 0.6);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          vertical-align: middle;
        }

        .avatar {
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border-radius: var(--spark-avatar-radius, 50%);
          overflow: hidden;
          background: var(--spark-avatar-bg, var(--spark-secondary, #64748b));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: ${hasImage && !this._imageError ? 'block' : 'none'};
        }

        .initials {
          display: ${!hasImage && hasInitials ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: ${initialsColor};
          color: var(--spark-avatar-text, white);
          font-family: var(--spark-font-family, system-ui, sans-serif);
          font-size: ${fontSize}px;
          font-weight: var(--spark-font-weight-medium, 500);
          line-height: 1;
          user-select: none;
        }

        .default-icon {
          display: ${!hasImage && !hasInitials ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          width: ${iconSize}px;
          height: ${iconSize}px;
          color: var(--spark-avatar-text, white);
        }

        /* Status indicator styling (for future status feature) */
        .status-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: ${Math.max(8, Math.round(size * 0.25))}px;
          height: ${Math.max(8, Math.round(size * 0.25))}px;
          border-radius: 50%;
          border: 2px solid var(--spark-white, #ffffff);
          box-sizing: border-box;
        }

        .status-indicator[data-status="online"] {
          background: var(--spark-avatar-online, var(--spark-success, #22c55e));
        }

        .status-indicator[data-status="away"] {
          background: var(--spark-avatar-away, var(--spark-warning, #f59e0b));
        }

        .status-indicator[data-status="busy"] {
          background: var(--spark-avatar-busy, var(--spark-error, #ef4444));
        }

        .status-indicator[data-status="offline"] {
          background: var(--spark-avatar-offline, var(--spark-secondary, #64748b));
        }
      </style>
      <div class="avatar" role="img" aria-label="${this.alt || 'Avatar'}">
        ${this.src ? `<img class="avatar-image" src="${this.src}" alt="${this.alt}" />` : ''}
        <span class="initials">${this.initials}</span>
        ${getDefaultIconSvg()}
        ${this.status ? `<span class="status-indicator" data-status="${this.status}" aria-label="Status: ${this.status}"></span>` : ''}
      </div>
    `;

    // Set up image event handlers if there's an image
    if (this.src) {
      const img = this.shadowRoot.querySelector('.avatar-image');
      if (img) {
        img.addEventListener('load', () => this.handleImageLoad());
        img.addEventListener('error', () => this.handleImageError());
        
        // Handle already loaded/failed images (cached)
        if (img.complete) {
          if (img.naturalWidth > 0) {
            this.handleImageLoad();
          } else {
            this.handleImageError();
          }
        }
      }
    }
  }
}

// Register the custom element
if (!customElements.get('spark-avatar')) {
  customElements.define('spark-avatar', SparkAvatar);
}

export { SparkAvatar };

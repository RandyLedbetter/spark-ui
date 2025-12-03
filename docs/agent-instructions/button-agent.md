# Agent Instructions: Button Component

> **Repository:** https://github.com/RandyLedbetter/spark-ui
> **Branch:** `feature/button-component`
> **Issue:** #1
> **Spec:** `docs/specs/button-component.md`

## Your Mission

Implement the `<spark-button>` Web Component for Spark UI. This is a foundational component that establishes the design language for the entire library.

## Setup

```bash
git checkout feature/button-component
```

## Tasks (Complete in Order)

### Task 1: btn-001 - Create Project Foundation (~1h)

Create the shared foundation files:

**Files to create:**
- `src/tokens/tokens.css` - Design tokens (colors, spacing, typography)
- `src/index.js` - Main entry point that exports all components
- `package.json` - Package configuration with ES modules
- `index.html` - Demo page for testing

**Design Tokens (from spec):**
```css
:root {
  /* Colors */
  --spark-primary: #6366f1;
  --spark-secondary: #64748b;
  --spark-success: #22c55e;
  --spark-warning: #f59e0b;
  --spark-error: #ef4444;
  
  /* Typography */
  --spark-font-family: 'Inter', system-ui, sans-serif;
  --spark-font-size-sm: 0.875rem;
  --spark-font-size-md: 1rem;
  --spark-font-size-lg: 1.125rem;
  
  /* Spacing */
  --spark-spacing-xs: 0.25rem;
  --spark-spacing-sm: 0.5rem;
  --spark-spacing-md: 1rem;
  --spark-spacing-lg: 1.5rem;
  
  /* Border Radius */
  --spark-radius-sm: 0.25rem;
  --spark-radius-md: 0.5rem;
  --spark-radius-lg: 1rem;
  
  /* Shadows */
  --spark-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --spark-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --spark-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Task 2: btn-002 - Implement SparkButton Class (~2h)

Create `src/components/button/button.js`:

```javascript
class SparkButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading', 'type', 'full-width'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() { /* Initialize */ }
  disconnectedCallback() { /* Cleanup */ }
  attributeChangedCallback(name, oldVal, newVal) { /* React */ }
}

customElements.define('spark-button', SparkButton);
```

**Shadow DOM Structure:**
```html
<button class="spark-button" part="button">
  <span class="loading-spinner" part="spinner"></span>
  <slot name="prefix"></slot>
  <slot></slot>
  <slot name="suffix"></slot>
</button>
```

### Task 3: btn-003 - Style Variants and Sizes (~1h)

Implement CSS for:
- **Variants:** primary (#6366f1), secondary (#64748b), outline, ghost, danger (#ef4444)
- **Sizes:** small (32px/12px/14px), medium (40px/16px/16px), large (48px/24px/18px)

### Task 4: btn-004 - States and Interactions (~2h)

Implement:
- Hover (darken 5%), active (darken 10%), focus ring
- Disabled (50% opacity, not-allowed cursor)
- Loading (spinner, aria-busy="true")
- `spark-click` event (only when not disabled/loading)
- Keyboard: Enter and Space activate

## Acceptance Criteria

- [ ] `<spark-button>Click</spark-button>` renders primary button
- [ ] All 5 variants work: primary, secondary, outline, ghost, danger
- [ ] All 3 sizes work: small, medium, large
- [ ] `disabled` attribute blocks clicks, shows 50% opacity
- [ ] `loading` attribute shows spinner, blocks clicks
- [ ] `spark-click` event fires on click (not when disabled/loading)
- [ ] Enter/Space keys activate button
- [ ] Focus ring visible on keyboard navigation

## When Complete

1. Commit all changes with message: `feat(button): implement spark-button component`
2. Push to `feature/button-component`
3. Create PR targeting `master` with title: `feat: Add spark-button component`
4. Reference Issue #1 in PR description

## Resources

- Full spec: `docs/specs/button-component.md`
- Design tokens: See Task 1 above


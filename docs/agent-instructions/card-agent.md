# Agent Instructions: Card Component

> **Repository:** https://github.com/RandyLedbetter/spark-ui
> **Branch:** `feature/card-component`
> **Issue:** #2
> **Spec:** `docs/specs/card-component.md`

## Your Mission

Implement the `<spark-card>` Web Component with header, body, and footer sub-components for Spark UI.

## Setup

```bash
git checkout feature/card-component
```

## Shared Foundation

First, ensure you have the design tokens. Create `src/tokens/tokens.css` if it doesn't exist:

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

## Tasks (Complete in Order)

### Task 1: card-001 - Create SparkCard Container (~2h)

Create `src/components/card/card.js`:

**Observed Attributes:**
- `elevation`: none, sm, md (default), lg
- `variant`: default, outlined, filled
- `clickable`: boolean
- `padding`: none, sm, md (default), lg

**Shadow DOM:**
```html
<div class="spark-card" part="card">
  <slot></slot>
</div>
```

**Elevation shadows:**
- none: no shadow
- sm: `0 1px 2px rgba(0,0,0,0.05)`
- md: `0 4px 6px rgba(0,0,0,0.1)` (default)
- lg: `0 10px 15px rgba(0,0,0,0.1)`

**Variants:**
- default: white bg + shadow
- outlined: white bg + 1px border (#e2e8f0), no shadow
- filled: gray bg (#f8fafc), no shadow

**Padding:**
- none: 0
- sm: 0.75rem (12px)
- md: 1.5rem (24px) - default
- lg: 2rem (32px)

### Task 2: card-002 - Create Sub-components (~2h)

Create three sub-components:

**`src/components/card/card-header.js`**
- Attribute: `divider` (shows bottom border)
- Styling: flex container for title/actions

**`src/components/card/card-body.js`**
- Attribute: `scroll` (enables vertical scroll with max-height)
- Styling: flex-grow, handles overflow

**`src/components/card/card-footer.js`**
- Attributes: `divider` (shows top border), `align` (start, center, end, between)
- Styling: flex container with justify-content from align

### Task 3: card-003 - Clickable Behavior (~1h)

For `clickable` attribute:
- Add `cursor: pointer`
- Hover effect: slight lift (translateY(-2px)) + shadow increase
- Fire `spark-card-click` event on click
- Keyboard: Enter activates when focused
- Add `tabindex="0"` and `role="button"` when clickable

## Acceptance Criteria

- [ ] `<spark-card>` renders with default elevation and padding
- [ ] All elevation levels work (none, sm, md, lg)
- [ ] All variants work (default, outlined, filled)
- [ ] `<spark-card-header>` renders at top
- [ ] `<spark-card-body>` fills content area
- [ ] `<spark-card-footer>` renders at bottom with alignment options
- [ ] Header/footer dividers work
- [ ] Clickable cards have hover effect and fire events
- [ ] Keyboard accessible when clickable

## When Complete

1. Commit all changes with message: `feat(card): implement spark-card component`
2. Push to `feature/card-component`
3. Create PR targeting `master` with title: `feat: Add spark-card component`
4. Reference Issue #2 in PR description

## Resources

- Full spec: `docs/specs/card-component.md`


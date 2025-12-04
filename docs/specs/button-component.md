# Feature Specification: Button Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04

## Overview

The Button component (`<spark-button>`) is a fundamental interactive element for user actions. It supports multiple variants, sizes, and states while maintaining full accessibility compliance.

## Problem Statement

### The Problem
Users need a consistent, accessible button component that works across any framework without external dependencies.

### Current State
Developers either build buttons from scratch (inconsistent) or import heavy UI libraries just for basic components.

### Impact
Buttons are the most common interactive element. A well-designed button component establishes the foundation for all other interactive components.

## Proposed Solution

### User Experience

```html
<!-- Basic usage -->
<spark-button>Click Me</spark-button>

<!-- With variant and size -->
<spark-button variant="primary" size="large">Submit</spark-button>

<!-- Disabled state -->
<spark-button disabled>Can't Click</spark-button>

<!-- Loading state -->
<spark-button loading>Processing...</spark-button>

<!-- With icon (via slot) -->
<spark-button variant="outline">
  <svg slot="icon-start">...</svg>
  Download
</spark-button>
```

### API Design

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | `"primary"` | Visual style: primary, secondary, outline, ghost, danger |
| `size` | string | `"medium"` | Button size: small, medium, large |
| `disabled` | boolean | `false` | Disables the button |
| `loading` | boolean | `false` | Shows loading spinner, disables interaction |
| `type` | string | `"button"` | HTML button type: button, submit, reset |

#### Slots

| Slot | Description |
|------|-------------|
| (default) | Button text content |
| `icon-start` | Icon before text |
| `icon-end` | Icon after text |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-click` | `{ originalEvent }` | Fired on button click (not when disabled/loading) |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-button-padding-x` | (from size) | Horizontal padding |
| `--spark-button-padding-y` | (from size) | Vertical padding |
| `--spark-button-font-size` | (from size) | Font size |
| `--spark-button-border-radius` | `--spark-radius-md` | Border radius |

### Visual States

```
┌─────────────────────────────────────────────────────────┐
│  Variant      Default     Hover       Active    Disabled│
├─────────────────────────────────────────────────────────┤
│  primary      #6366f1     #4f46e5     #4338ca   50% op  │
│  secondary    #64748b     #475569     #334155   50% op  │
│  outline      border      bg-light    bg-med    50% op  │
│  ghost        transparent bg-light    bg-med    50% op  │
│  danger       #ef4444     #dc2626     #b91c1c   50% op  │
└─────────────────────────────────────────────────────────┘
```

### Size Specifications

| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| small | 6px 12px | 14px | 32px |
| medium | 8px 16px | 16px | 40px |
| large | 12px 24px | 18px | 48px |

## User Stories

### Story 1: Basic Button Click
**As a** user
**I want to** click a button to trigger an action
**So that** I can interact with the application

**Acceptance Criteria:**
- [ ] Button renders with default styling when no attributes provided
- [ ] Click event fires spark-click with original event in detail
- [ ] Button shows hover state on mouse enter
- [ ] Button shows active/pressed state on mouse down
- [ ] Focus ring appears on keyboard focus

### Story 2: Disabled Button
**As a** developer
**I want to** disable a button
**So that** users cannot trigger actions when inappropriate

**Acceptance Criteria:**
- [ ] Adding disabled attribute visually dims the button
- [ ] Disabled button does not fire click events
- [ ] Disabled button has aria-disabled attribute
- [ ] Disabled button is not focusable via keyboard
- [ ] Cursor shows not-allowed on hover

### Story 3: Loading State
**As a** user
**I want to** see a loading indicator
**So that** I know my action is being processed

**Acceptance Criteria:**
- [ ] Loading attribute shows spinner icon
- [ ] Button text remains visible during loading
- [ ] Button is not clickable while loading
- [ ] Loading button has aria-busy attribute
- [ ] Spinner animates smoothly

### Story 4: Button Variants
**As a** developer
**I want to** use different button styles
**So that** I can indicate action importance and type

**Acceptance Criteria:**
- [ ] Primary variant has solid primary color background
- [ ] Secondary variant has solid secondary color background
- [ ] Outline variant has transparent background with border
- [ ] Ghost variant has transparent background, no border
- [ ] Danger variant has solid error color background

### Story 5: Keyboard Accessibility
**As a** keyboard user
**I want to** activate buttons with Enter or Space
**So that** I can use the application without a mouse

**Acceptance Criteria:**
- [ ] Button is focusable via Tab key
- [ ] Enter key triggers click
- [ ] Space key triggers click
- [ ] Focus ring is clearly visible
- [ ] Focus ring uses --spark-focus-ring token

## Technical Approach

### Architecture

```
spark-button/
├── button.js       # SparkButton class extending SparkElement
├── button.css      # Styles (embedded in component)
└── button.test.js  # Unit tests
```

### Component Structure

```javascript
class SparkButton extends SparkElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading', 'type'];
  }
  
  get template() {
    return `
      <button part="button" type="${this.type}">
        <slot name="icon-start"></slot>
        <span part="label"><slot></slot></span>
        <slot name="icon-end"></slot>
        ${this.loading ? '<span part="spinner">...</span>' : ''}
      </button>
    `;
  }
}
```

### Key Implementation Details

1. **Native button inside Shadow DOM** - Preserves form submission behavior
2. **CSS Parts** - Allows external styling via `::part(button)`
3. **Slots** - Flexible content projection for icons
4. **Boolean attributes** - `disabled` and `loading` use presence-based API

### Dependencies

- Extends `SparkElement` from `src/core/base-component.js`
- Uses design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No text content | Button renders but may be empty (developer responsibility) |
| Very long text | Text wraps or truncates based on container |
| Both disabled and loading | Disabled takes precedence visually |
| Click during loading | Event is not fired |
| Rapid clicks | Each click fires event (no debounce by default) |

## Out of Scope

- [ ] Button group component (future spec)
- [ ] Icon-only button variant (use icon slot with aria-label)
- [ ] Toggle/pressed state (future spec)
- [ ] Dropdown button (future spec)
- [ ] Link-styled button (use `<a>` element instead)

## Open Questions

- [x] ~~Should loading replace button text?~~ **Decision:** No, show spinner alongside text
- [x] ~~Include built-in icons?~~ **Decision:** No, use slots for flexibility

## Implementation Tasks

| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| btn-001 | Button component structure | 1h | None |
| btn-002 | Button variants styling | 1h | btn-001 |
| btn-003 | Button sizes and states | 1h | btn-001 |
| btn-004 | Button slots and accessibility | 1h | btn-002, btn-003 |

**Total Estimate:** 4 hours

See `docs/sprint.yaml` for full task details and status.

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


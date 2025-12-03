# Feature Specification: Button Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-button>` Web Component provides a versatile, accessible button element with multiple variants, sizes, and states. It serves as the foundational interactive element for Spark UI.

## Problem Statement

### The Problem
Developers need consistent, accessible buttons across different frameworks but existing solutions are either framework-specific or require heavy dependencies.

### Current State
Developers either:
- Use framework-specific component libraries (locked to React/Vue/etc.)
- Build custom buttons from scratch for each project
- Use CSS frameworks that require manual accessibility work

### Impact
A solid button component establishes the design language and interaction patterns for the entire component library. It's the most frequently used UI element.

## Proposed Solution

### User Experience
Developers import the component and use it with simple HTML attributes:

```html
<spark-button variant="primary">Click Me</spark-button>
<spark-button variant="secondary" disabled>Disabled</spark-button>
<spark-button variant="outline" size="small">Small</spark-button>
<spark-button variant="danger" loading>Saving...</spark-button>
```

### API Reference

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | `"primary"` | Visual style: `primary`, `secondary`, `outline`, `ghost`, `danger` |
| `size` | string | `"medium"` | Button size: `small`, `medium`, `large` |
| `disabled` | boolean | `false` | Disables the button |
| `loading` | boolean | `false` | Shows loading spinner, disables interaction |
| `type` | string | `"button"` | Button type: `button`, `submit`, `reset` |
| `full-width` | boolean | `false` | Makes button full width of container |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-click` | `{ originalEvent: MouseEvent }` | Fired when button is clicked (not when disabled/loading) |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-button-font-family` | `var(--spark-font-family)` | Button font |
| `--spark-button-border-radius` | `var(--spark-radius-md)` | Corner radius |
| `--spark-button-transition` | `all 0.2s ease` | Transition timing |

#### Slots

| Slot | Description |
|------|-------------|
| (default) | Button label text/content |
| `prefix` | Content before label (e.g., icon) |
| `suffix` | Content after label (e.g., icon) |

### Visual Specifications

```
┌─────────────────────────────────────────────────────────────┐
│ VARIANTS                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Primary  │  │Secondary │  │ Outline  │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│  bg: #6366f1   bg: #64748b   bg: transparent                │
│  text: white   text: white   border: #6366f1                │
│                                                              │
│  ┌──────────┐  ┌──────────┐                                 │
│  │  Ghost   │  │  Danger  │                                 │
│  └──────────┘  └──────────┘                                 │
│  bg: transparent bg: #ef4444                                │
│  text: #6366f1   text: white                                │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ SIZES                                                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────┐   ┌──────────┐   ┌────────────┐                 │
│  │ Small  │   │  Medium  │   │   Large    │                 │
│  └────────┘   └──────────┘   └────────────┘                 │
│  h: 32px       h: 40px        h: 48px                       │
│  px: 12px      px: 16px       px: 24px                      │
│  text: 14px    text: 16px     text: 18px                    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ STATES                                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Default → Hover → Active → Focus                           │
│            +5% dark  +10% dark  ring: 2px offset            │
│                                                              │
│  Disabled: opacity 0.5, cursor: not-allowed                 │
│  Loading: spinner + opacity 0.8, pointer-events: none       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Basic Button Usage
**As a** developer
**I want to** add a button to my page with a single HTML tag
**So that** I can quickly build interactive UIs without framework dependencies

**Acceptance Criteria:**
- [ ] Given a page with Spark UI loaded, when I add `<spark-button>Click</spark-button>`, then a styled primary button appears
- [ ] Given a button exists, when I click it, then the `spark-click` event fires
- [ ] Given a button exists, when I press Enter or Space while focused, then it activates like a click

### Story 2: Button Variants
**As a** developer
**I want to** choose different visual styles for buttons
**So that** I can indicate different actions (primary, destructive, etc.)

**Acceptance Criteria:**
- [ ] Given `variant="primary"`, the button has indigo background (#6366f1) and white text
- [ ] Given `variant="secondary"`, the button has slate background (#64748b) and white text
- [ ] Given `variant="outline"`, the button has transparent background with indigo border
- [ ] Given `variant="ghost"`, the button has transparent background with indigo text
- [ ] Given `variant="danger"`, the button has red background (#ef4444) and white text

### Story 3: Button Sizes
**As a** developer
**I want to** choose different button sizes
**So that** I can fit buttons appropriately in different UI contexts

**Acceptance Criteria:**
- [ ] Given `size="small"`, the button is 32px tall with 12px horizontal padding
- [ ] Given `size="medium"` (default), the button is 40px tall with 16px horizontal padding
- [ ] Given `size="large"`, the button is 48px tall with 24px horizontal padding

### Story 4: Disabled State
**As a** developer
**I want to** disable buttons
**So that** I can prevent interaction when actions aren't available

**Acceptance Criteria:**
- [ ] Given `disabled` attribute is present, the button has 50% opacity
- [ ] Given button is disabled, clicking does not fire `spark-click` event
- [ ] Given button is disabled, it has `aria-disabled="true"`
- [ ] Given button is disabled, cursor shows `not-allowed`

### Story 5: Loading State
**As a** developer
**I want to** show a loading state on buttons
**So that** users know an action is in progress

**Acceptance Criteria:**
- [ ] Given `loading` attribute is present, a spinner appears in the button
- [ ] Given button is loading, the label text remains visible (beside spinner)
- [ ] Given button is loading, clicking does not fire events
- [ ] Given button is loading, it has `aria-busy="true"`

### Story 6: Keyboard Accessibility
**As a** keyboard user
**I want to** interact with buttons using keyboard
**So that** I can use the interface without a mouse

**Acceptance Criteria:**
- [ ] Given button is focused, pressing Enter activates the button
- [ ] Given button is focused, pressing Space activates the button
- [ ] Given button is focused, a visible focus ring appears
- [ ] Given button is disabled, it is not focusable (tabindex="-1")

## Technical Approach

### Architecture
The button is implemented as a Custom Element (Web Component) using vanilla JavaScript with Shadow DOM for style encapsulation.

### File Structure
```
src/components/button/
├── button.js       # Component class definition
├── button.css      # Component styles (embedded in JS)
└── button.test.js  # Unit tests
```

### Component Class

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
  attributeChangedCallback(name, oldVal, newVal) { /* React to changes */ }
}

customElements.define('spark-button', SparkButton);
```

### Shadow DOM Structure

```html
<button class="spark-button" part="button">
  <span class="loading-spinner" part="spinner"></span>
  <slot name="prefix"></slot>
  <slot></slot>
  <slot name="suffix"></slot>
</button>
```

### Styling Strategy
- All styles encapsulated in Shadow DOM
- CSS custom properties for theming (pierce shadow boundary)
- `part` attributes exposed for deep customization
- Host element styles for layout integration

### Dependencies
- None (vanilla Web Components)
- Uses shared design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No text content | Button renders with min-width, empty state acceptable |
| Very long text | Text truncates with ellipsis, title attribute shows full text |
| Rapid clicks | Debounce not required; let consumer handle |
| Form submission | `type="submit"` works within `<form>` elements |
| Inside flex/grid | Button respects container layout |
| RTL languages | Icons/slots flip appropriately |

## Out of Scope

- [ ] Button groups/toolbars (separate component)
- [ ] Icon-only buttons (use prefix/suffix slots with aria-label)
- [ ] Toggle/pressed state (separate toggle-button component)
- [ ] Dropdown buttons (separate component)
- [ ] Ripple/material effects (keep minimal)

## Open Questions

*None - spec is ready for implementation.*

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial draft |


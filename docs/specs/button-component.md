# Feature Specification: Button Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04
> **Depends On:** foundation-setup

## Overview

Create `<spark-button>`, a fully accessible button Web Component with multiple variants, sizes, and states. This is a foundational UI component used throughout applications.

## Problem Statement

### The Problem
Developers need consistent, accessible buttons across projects regardless of framework. Native `<button>` requires repetitive styling and accessibility implementation.

### Current State
Developers either:
- Re-style native buttons in every project
- Use framework-specific component libraries
- Skip accessibility features due to complexity

### Impact
A well-built button component is used in virtually every UI. Getting this right sets the pattern for all other components.

## Proposed Solution

### User Experience

```html
<!-- Basic usage -->
<spark-button>Click Me</spark-button>

<!-- Variants -->
<spark-button variant="primary">Primary</spark-button>
<spark-button variant="secondary">Secondary</spark-button>
<spark-button variant="outline">Outline</spark-button>
<spark-button variant="ghost">Ghost</spark-button>
<spark-button variant="danger">Danger</spark-button>

<!-- Sizes -->
<spark-button size="small">Small</spark-button>
<spark-button size="medium">Medium</spark-button>
<spark-button size="large">Large</spark-button>

<!-- States -->
<spark-button disabled>Disabled</spark-button>
<spark-button loading>Loading...</spark-button>

<!-- Full width -->
<spark-button full-width>Full Width Button</spark-button>
```

### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│ VARIANTS                                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Primary  │  │Secondary │  │ Outline  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  (filled      (filled        (bordered                 │
│   purple)      gray)          no fill)                 │
│                                                         │
│  ┌──────────┐  ┌──────────┐                            │
│  │  Ghost   │  │  Danger  │                            │
│  └──────────┘  └──────────┘                            │
│  (text only)   (filled red)                            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SIZES                                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────┐  ┌──────────┐  ┌────────────┐              │
│  │ Small  │  │  Medium  │  │   Large    │              │
│  └────────┘  └──────────┘  └────────────┘              │
│  (28px h)    (36px h)       (44px h)                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ STATES                                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐          │
│  │ Disabled │  │ Loading  │  │ Focus Ring   │          │
│  └──────────┘  └──────────┘  └──────────────┘          │
│  (50% opacity  (spinner +    (2px offset               │
│   no pointer)   text)         purple ring)             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Basic Button Usage
**As a** developer
**I want to** use spark-button like a native button
**So that** I get enhanced styling without learning new APIs

**Acceptance Criteria:**
- [ ] `<spark-button>Click</spark-button>` renders a styled button
- [ ] Click events fire normally
- [ ] Button is focusable and keyboard-activatable (Enter/Space)
- [ ] Default variant is "primary"

### Story 2: Button Variants
**As a** developer
**I want to** choose from multiple button styles
**So that** I can indicate different actions (primary, cancel, danger)

**Acceptance Criteria:**
- [ ] `variant="primary"` renders filled purple button
- [ ] `variant="secondary"` renders filled gray button
- [ ] `variant="outline"` renders bordered button with no fill
- [ ] `variant="ghost"` renders text-only button
- [ ] `variant="danger"` renders filled red button

### Story 3: Button Sizes
**As a** developer
**I want to** choose button sizes
**So that** buttons fit different UI contexts

**Acceptance Criteria:**
- [ ] `size="small"` renders 28px height button
- [ ] `size="medium"` (default) renders 36px height button
- [ ] `size="large"` renders 44px height button
- [ ] Font size scales appropriately with button size

### Story 4: Disabled State
**As a** developer
**I want to** disable buttons
**So that** users can't click when action is unavailable

**Acceptance Criteria:**
- [ ] `disabled` attribute prevents click events
- [ ] Disabled button has reduced opacity
- [ ] Cursor changes to not-allowed
- [ ] Button is not focusable when disabled

### Story 5: Loading State
**As a** developer
**I want to** show loading state
**So that** users know an action is in progress

**Acceptance Criteria:**
- [ ] `loading` attribute shows spinner
- [ ] Button text is preserved (visible next to spinner)
- [ ] Button is disabled while loading
- [ ] Spinner uses current text color

### Story 6: Accessibility
**As a** user with disabilities
**I want to** use the button with assistive technology
**So that** I can interact with the application

**Acceptance Criteria:**
- [ ] Proper `role="button"` when wrapping non-button element
- [ ] `aria-disabled` reflects disabled state
- [ ] `aria-busy` reflects loading state
- [ ] Visible focus indicator (ring)
- [ ] Minimum 44x44px touch target (large size)

## Technical Approach

### Architecture

```javascript
// src/components/button/spark-button.js
import { SparkElement } from '../../core/spark-element.js';

class SparkButton extends SparkElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading', 'full-width'];
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.updateStyles();
  }
}

customElements.define('spark-button', SparkButton);
```

### Component Files

```
src/components/button/
├── spark-button.js    # Component class
├── button.css         # Component styles
└── button.test.js     # Tests (if implementing)
```

### CSS Structure

```css
/* Button base */
:host {
  display: inline-flex;
}

button {
  font-family: var(--spark-font-family);
  font-weight: var(--spark-font-weight-medium);
  border-radius: var(--spark-radius-md);
  transition: all var(--spark-transition-fast);
  cursor: pointer;
  /* ... */
}

/* Variants */
:host([variant="primary"]) button {
  background: var(--spark-primary);
  color: white;
}

/* Sizes */
:host([size="small"]) button {
  height: 28px;
  padding: 0 var(--spark-spacing-sm);
  font-size: var(--spark-font-size-sm);
}

/* States */
:host([disabled]) button {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Dependencies
- **Requires:** `foundation-setup` (SparkElement, tokens.css)
- **External:** None

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No text content | Button renders but may be visually empty (dev responsibility) |
| Both disabled and loading | `disabled` takes precedence, no spinner |
| Invalid variant value | Falls back to "primary" |
| Invalid size value | Falls back to "medium" |
| Click while loading | Click event is prevented |
| Nested interactive elements | Handled normally (Shadow DOM isolation) |

## Out of Scope

- [ ] Icon support (slot for icon, separate spec)
- [ ] Button groups
- [ ] Toggle/pressed state
- [ ] Dropdown button
- [ ] Link styled as button (`<spark-button href="...">`)

## Open Questions

- [x] Include icon slot in MVP? → No, defer to future enhancement
- [x] Support `type="submit"` for forms? → Yes, mirror native button behavior

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


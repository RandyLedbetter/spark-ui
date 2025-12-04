# Feature Specification: Card Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04
> **Depends On:** foundation-setup

## Overview

Create `<spark-card>` with supporting sub-components (`<spark-card-header>`, `<spark-card-body>`, `<spark-card-footer>`), a versatile container component for grouping related content with consistent styling.

## Problem Statement

### The Problem
Developers need a consistent way to display grouped content (user profiles, product cards, settings sections) with proper visual hierarchy and spacing.

### Current State
Developers manually create card-like containers with CSS, leading to inconsistent padding, shadows, and border treatments across applications.

### Impact
Cards are one of the most common UI patterns. A well-designed card component improves visual consistency and development speed.

## Proposed Solution

### User Experience

```html
<!-- Basic card -->
<spark-card>
  <spark-card-body>
    Simple content card
  </spark-card-body>
</spark-card>

<!-- Full card with all sections -->
<spark-card>
  <spark-card-header>
    <h3>Card Title</h3>
    <p>Subtitle or description</p>
  </spark-card-header>
  <spark-card-body>
    Main content goes here. Can contain any HTML.
  </spark-card-body>
  <spark-card-footer>
    <spark-button variant="secondary">Cancel</spark-button>
    <spark-button variant="primary">Save</spark-button>
  </spark-card-footer>
</spark-card>

<!-- Elevation variants -->
<spark-card elevation="none">Flat card</spark-card>
<spark-card elevation="low">Subtle shadow</spark-card>
<spark-card elevation="medium">Default shadow</spark-card>
<spark-card elevation="high">Prominent shadow</spark-card>

<!-- Clickable card -->
<spark-card clickable>
  <spark-card-body>Click me!</spark-card-body>
</spark-card>

<!-- Bordered variant (no shadow) -->
<spark-card variant="bordered">
  <spark-card-body>Bordered card</spark-card-body>
</spark-card>
```

### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│ CARD ANATOMY                                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ HEADER (optional)                                │   │
│  │ ─────────────────────────────────────────────── │   │
│  │ Title                                            │   │
│  │ Subtitle text                                    │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ BODY                                             │   │
│  │                                                  │   │
│  │ Main content area. Flexible height.             │   │
│  │ Can contain text, images, forms, etc.           │   │
│  │                                                  │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ FOOTER (optional)                               │   │
│  │ ─────────────────────────────────────────────── │   │
│  │                    [Cancel] [Save]              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ ELEVATION LEVELS                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ none │  │ low  │  │medium│  │ high │               │
│  └──────┘  └──────┘  └──────┘  └──────┘               │
│  (flat)    (subtle)  (default) (lifted)               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ INTERACTIVE STATE (clickable)                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Default → Hover (lift + darken) → Active (press)      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Basic Card
**As a** developer
**I want to** wrap content in a card container
**So that** it has consistent styling and visual separation

**Acceptance Criteria:**
- [ ] `<spark-card>` renders with default styling (white bg, rounded corners, shadow)
- [ ] Content is padded appropriately
- [ ] Works with any HTML content inside

### Story 2: Card Sections
**As a** developer
**I want to** use header, body, and footer sections
**So that** content has clear visual hierarchy

**Acceptance Criteria:**
- [ ] `<spark-card-header>` renders at top with bottom border
- [ ] `<spark-card-body>` renders as main content area
- [ ] `<spark-card-footer>` renders at bottom with top border
- [ ] Sections are optional and can be used in any combination
- [ ] Proper spacing between sections

### Story 3: Elevation Variants
**As a** developer
**I want to** control card shadow depth
**So that** I can create visual hierarchy with multiple cards

**Acceptance Criteria:**
- [ ] `elevation="none"` removes shadow completely
- [ ] `elevation="low"` applies subtle shadow
- [ ] `elevation="medium"` (default) applies standard shadow
- [ ] `elevation="high"` applies prominent shadow

### Story 4: Clickable Card
**As a** developer
**I want to** make the entire card clickable
**So that** users can click anywhere to trigger an action

**Acceptance Criteria:**
- [ ] `clickable` attribute makes card interactive
- [ ] Hover state shows visual feedback (slight lift, background change)
- [ ] Active state shows press feedback
- [ ] Cursor changes to pointer
- [ ] Click event fires on card element
- [ ] Keyboard accessible (focusable, Enter/Space to activate)

### Story 5: Bordered Variant
**As a** developer
**I want to** use bordered cards without shadows
**So that** I can create flatter UI designs

**Acceptance Criteria:**
- [ ] `variant="bordered"` shows border instead of shadow
- [ ] Border uses design system border color
- [ ] Can combine with other attributes

### Story 6: Accessibility
**As a** user with disabilities
**I want to** understand card content structure
**So that** I can navigate content efficiently

**Acceptance Criteria:**
- [ ] Clickable cards have `role="button"` and `tabindex="0"`
- [ ] Focus state is clearly visible
- [ ] Card sections use semantic HTML slots
- [ ] Color contrast meets WCAG AA

## Technical Approach

### Architecture

Four custom elements:

```javascript
// spark-card.js - Main container
class SparkCard extends SparkElement {
  static get observedAttributes() {
    return ['elevation', 'variant', 'clickable'];
  }
}
customElements.define('spark-card', SparkCard);

// spark-card-header.js
class SparkCardHeader extends SparkElement {}
customElements.define('spark-card-header', SparkCardHeader);

// spark-card-body.js  
class SparkCardBody extends SparkElement {}
customElements.define('spark-card-body', SparkCardBody);

// spark-card-footer.js
class SparkCardFooter extends SparkElement {}
customElements.define('spark-card-footer', SparkCardFooter);
```

### Component Files

```
src/components/card/
├── spark-card.js         # Main card container
├── spark-card-header.js  # Header sub-component
├── spark-card-body.js    # Body sub-component
├── spark-card-footer.js  # Footer sub-component
├── card.css              # Shared styles
└── card.test.js          # Tests
```

### CSS Structure

```css
/* Card container */
:host {
  display: block;
  background: var(--spark-background);
  border-radius: var(--spark-radius-lg);
  overflow: hidden;
}

/* Elevation */
:host([elevation="none"]) { box-shadow: none; }
:host([elevation="low"]) { box-shadow: var(--spark-shadow-sm); }
:host([elevation="medium"]) { box-shadow: var(--spark-shadow-md); }
:host([elevation="high"]) { box-shadow: var(--spark-shadow-lg); }

/* Clickable */
:host([clickable]) {
  cursor: pointer;
  transition: transform var(--spark-transition-fast), 
              box-shadow var(--spark-transition-fast);
}
:host([clickable]:hover) {
  transform: translateY(-2px);
  box-shadow: var(--spark-shadow-lg);
}

/* Header */
spark-card-header {
  padding: var(--spark-spacing-md) var(--spark-spacing-lg);
  border-bottom: 1px solid var(--spark-border);
}

/* Body */
spark-card-body {
  padding: var(--spark-spacing-lg);
}

/* Footer */
spark-card-footer {
  padding: var(--spark-spacing-md) var(--spark-spacing-lg);
  border-top: 1px solid var(--spark-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--spark-spacing-sm);
}
```

### Dependencies
- **Requires:** `foundation-setup` (SparkElement, tokens.css)
- **External:** None

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No sub-components | Card renders with just slot content |
| Only header and footer | Renders without body (valid use case) |
| Multiple bodies | All render in order (dev responsibility) |
| Clickable with nested buttons | Nested buttons work independently (event bubbling) |
| Very long content | Body scrolls or expands (no max-height by default) |
| Empty card | Renders as empty container with min-height |

## Out of Scope

- [ ] Image card variant (header image slot)
- [ ] Expandable/collapsible card
- [ ] Card grid/masonry layout
- [ ] Loading skeleton state
- [ ] Dismissible card

## Open Questions

- [x] Should footer actions auto-align right? → Yes, flex-end with gap
- [x] Max-width by default? → No, card fills container width

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


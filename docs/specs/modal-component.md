# Feature Specification: Modal Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-modal>` component is an accessible dialog Web Component that displays content in a layer above the page. It handles backdrop, focus management, keyboard interactions, and proper ARIA semantics for modal dialogs.

## Problem Statement

### The Problem
Building accessible modals is notoriously difficult:
- Focus must be trapped within the modal
- Focus must return to trigger element on close
- Escape key should close the modal
- Backdrop click behavior needs handling
- Screen readers need proper announcements
- Scroll locking on the body

Most developers get several of these wrong.

### Current State
Developers use framework-specific modal libraries, build broken custom implementations, or skip modals entirely in favor of new pages.

### Impact
Modals are essential for confirmations, forms, and focused interactions. A properly built modal component:
- Ensures accessibility compliance
- Improves user experience
- Reduces developer burden

## Proposed Solution

### User Experience

```html
<spark-modal id="confirm-modal">
  <spark-modal-header>Confirm Action</spark-modal-header>
  <spark-modal-body>
    Are you sure you want to delete this item?
    This action cannot be undone.
  </spark-modal-body>
  <spark-modal-footer>
    <spark-button variant="secondary" data-modal-close>Cancel</spark-button>
    <spark-button variant="danger">Delete</spark-button>
  </spark-modal-footer>
</spark-modal>

<spark-button onclick="document.querySelector('#confirm-modal').open()">
  Delete Item
</spark-button>

<script>
  const modal = document.querySelector('#confirm-modal');
  modal.addEventListener('close', (e) => {
    console.log('Modal closed');
  });
</script>
```

### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░┌─────────────────────────────────────┐░░░░░░░░░│
│░░░░░░░│  Modal Header                    ✕  │░░░░░░░░░│
│░░░░░░░├─────────────────────────────────────┤░░░░░░░░░│
│░░░░░░░│                                     │░░░░░░░░░│
│░░░░░░░│  Modal body content goes here.      │░░░░░░░░░│
│░░░░░░░│                                     │░░░░░░░░░│
│░░░░░░░├─────────────────────────────────────┤░░░░░░░░░│
│░░░░░░░│              [Cancel] [Confirm]     │░░░░░░░░░│
│░░░░░░░└─────────────────────────────────────┘░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────────────┘
  ░ = Backdrop (semi-transparent)

Size Variants:
┌───────────┐  ┌─────────────────┐  ┌───────────────────────┐
│   Small   │  │     Medium      │  │         Large         │
│  400px    │  │     600px       │  │        800px          │
└───────────┘  └─────────────────┘  └───────────────────────┘
```

## User Stories

### Story 1: Open and Close Modal
**As a** developer
**I want to** programmatically open and close modals
**So that** I can control when dialogs appear

**Acceptance Criteria:**
- [ ] Given a modal element, when `.open()` is called, then modal becomes visible
- [ ] Given an open modal, when `.close()` is called, then modal becomes hidden
- [ ] Given an open modal, when closed, then `close` event fires

### Story 2: Backdrop Behavior
**As a** user
**I want to** close the modal by clicking the backdrop
**So that** I can dismiss dialogs quickly

**Acceptance Criteria:**
- [ ] Given an open modal, when backdrop is clicked, then modal closes
- [ ] Given `backdrop="static"`, when backdrop is clicked, then modal does NOT close
- [ ] Given backdrop click close, then `close` event includes `reason: 'backdrop'`

### Story 3: Escape Key Close
**As a** keyboard user
**I want to** close modals with Escape key
**So that** I can dismiss dialogs without reaching for mouse

**Acceptance Criteria:**
- [ ] Given an open modal, when Escape is pressed, then modal closes
- [ ] Given `escape="false"`, when Escape is pressed, then modal does NOT close
- [ ] Given Escape close, then `close` event includes `reason: 'escape'`

### Story 4: Focus Trap
**As a** keyboard user
**I want to** have focus trapped within the modal
**So that** I can navigate the modal content without accidentally leaving

**Acceptance Criteria:**
- [ ] Given an open modal, when opened, then focus moves to first focusable element
- [ ] Given modal is focused, when Tab reaches last element and Tab is pressed, then focus moves to first element
- [ ] Given modal is focused, when Shift+Tab on first element, then focus moves to last element
- [ ] Given modal closes, then focus returns to element that triggered open

### Story 5: Close Button
**As a** user
**I want to** see a visible close button
**So that** I can dismiss the dialog obviously

**Acceptance Criteria:**
- [ ] Given a modal with header, when rendered, then close button appears in header
- [ ] Given close button, when clicked, then modal closes
- [ ] Given `closable="false"`, when rendered, then no close button appears

### Story 6: Modal Sections
**As a** developer
**I want to** organize modal content into header, body, footer
**So that** I can create consistent dialog layouts

**Acceptance Criteria:**
- [ ] Given `<spark-modal-header>`, when rendered, then it appears at top with title styling
- [ ] Given `<spark-modal-body>`, when rendered, then it appears scrollable in middle
- [ ] Given `<spark-modal-footer>`, when rendered, then it appears fixed at bottom

### Story 7: Size Variants
**As a** developer
**I want to** control modal width
**So that** I can size modals appropriately for their content

**Acceptance Criteria:**
- [ ] Given `size="small"`, when rendered, then modal is ~400px wide
- [ ] Given `size="medium"` (default), when rendered, then modal is ~600px wide
- [ ] Given `size="large"`, when rendered, then modal is ~800px wide
- [ ] Given `size="full"`, when rendered, then modal fills viewport (with margin)

### Story 8: Screen Reader Accessibility
**As a** screen reader user
**I want to** have the modal properly announced
**So that** I understand a dialog has opened

**Acceptance Criteria:**
- [ ] Given an open modal, then `role="dialog"` is present
- [ ] Given an open modal, then `aria-modal="true"` is set
- [ ] Given modal header, then modal is labeled by header via `aria-labelledby`

## Technical Approach

### Architecture

```
spark-modal (Custom Element)
├── Shadow Root
│   ├── <style>
│   ├── <div class="backdrop">
│   └── <div class="modal" role="dialog" aria-modal="true">
│       ├── <button class="close-button">✕</button>
│       └── <slot> (content projection)

spark-modal-header (Custom Element)
├── Shadow Root
│   └── <header><slot></slot></header>

spark-modal-body (Custom Element)
├── Shadow Root
│   └── <div class="body"><slot></slot></div>

spark-modal-footer (Custom Element)
├── Shadow Root
│   └── <footer><slot></slot></footer>
```

### Key Components

- **SparkModal:** Main component handling open/close, focus trap, keyboard events
- **SparkModalHeader:** Title section, provides label for dialog
- **SparkModalBody:** Scrollable content area
- **SparkModalFooter:** Action buttons area

### Attributes/Properties

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | boolean | `false` | Controls visibility |
| `size` | string | `"medium"` | Width variant |
| `backdrop` | string | `"true"` | Backdrop close behavior (`true`, `static`) |
| `escape` | boolean | `true` | Allow Escape to close |
| `closable` | boolean | `true` | Show close button |

### Methods

| Method | Description |
|--------|-------------|
| `open()` | Opens the modal |
| `close(reason?)` | Closes the modal with optional reason |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | `{}` | Fires when modal opens |
| `close` | `{ reason: 'button' \| 'backdrop' \| 'escape' \| 'api' }` | Fires when modal closes |

### CSS Custom Properties

```css
--spark-modal-bg: white;
--spark-modal-radius: var(--spark-radius-lg);
--spark-modal-shadow: var(--spark-shadow-lg);
--spark-modal-backdrop: rgba(0, 0, 0, 0.5);
--spark-modal-z-index: 1000;
--spark-modal-padding: var(--spark-spacing-lg);
```

### File Structure

```
src/components/modal/
├── modal.js        # Main modal + subcomponents
├── modal.css       # Component styles
└── modal.test.js   # Unit tests
```

### Dependencies

- None (zero runtime dependencies)
- Uses global design tokens from `src/tokens/tokens.css`

### Focus Management Implementation

```javascript
// On open:
// 1. Store document.activeElement as returnFocus
// 2. Query all focusable elements inside modal
// 3. Focus first focusable element
// 4. Add keydown listener for Tab trap

// On close:
// 1. Remove keydown listener
// 2. Return focus to returnFocus element
```

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No focusable elements in modal | Focus the modal container itself |
| Modal opened from element that disappears | Focus returns to body |
| Multiple modals open | Stack modals, Escape closes topmost |
| Very tall content | Body section scrolls, header/footer fixed |
| Modal open on page load | Works, but no returnFocus element |
| `data-modal-close` on any element | That element closes the modal when clicked |

## Out of Scope

- [ ] Drawer/slide-in variants (separate component)
- [ ] Confirmation dialog helper (wrapper, not core)
- [ ] Alert dialogs (`role="alertdialog"` variant)
- [ ] Nested modal stacking management
- [ ] Animation/transition customization

## Open Questions

- [x] Should body scroll be locked when modal is open? → **Yes, prevent background scroll**
- [x] Should clicking inside modal but outside content close it? → **No, only explicit backdrop click**

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial specification |


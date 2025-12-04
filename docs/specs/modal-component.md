# Feature Specification: Modal Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04
> **Depends On:** foundation-setup

## Overview

Create `<spark-modal>` with sub-components (`<spark-modal-header>`, `<spark-modal-body>`, `<spark-modal-footer>`), a fully accessible dialog component for overlaying content that requires user attention or interaction.

## Problem Statement

### The Problem
Building accessible modals is complex. Developers must handle:
- Focus trapping within the modal
- Keyboard navigation (Escape to close)
- Backdrop click handling
- Scroll locking on the body
- ARIA attributes and roles
- Animation timing

### Current State
Developers either use framework-specific modal libraries, build incomplete implementations, or skip accessibility features entirely.

### Impact
Modals are critical for confirmations, forms, alerts, and focused workflows. Poor modal implementation creates accessibility barriers and poor UX.

## Proposed Solution

### User Experience

```html
<!-- Basic modal (hidden by default) -->
<spark-modal id="my-modal">
  <spark-modal-header>Modal Title</spark-modal-header>
  <spark-modal-body>
    Modal content goes here.
  </spark-modal-body>
  <spark-modal-footer>
    <spark-button variant="secondary" data-close>Cancel</spark-button>
    <spark-button variant="primary">Confirm</spark-button>
  </spark-modal-footer>
</spark-modal>

<!-- Open programmatically -->
<script>
  const modal = document.querySelector('#my-modal');
  modal.open();   // Show modal
  modal.close();  // Hide modal
</script>

<!-- Size variants -->
<spark-modal size="small">...</spark-modal>   <!-- 400px max -->
<spark-modal size="medium">...</spark-modal>  <!-- 500px max (default) -->
<spark-modal size="large">...</spark-modal>   <!-- 700px max -->
<spark-modal size="full">...</spark-modal>    <!-- 90vw/90vh -->

<!-- Options -->
<spark-modal closable="false">...</spark-modal>           <!-- No X button -->
<spark-modal backdrop-close="false">...</spark-modal>     <!-- No backdrop click -->
<spark-modal escape-close="false">...</spark-modal>       <!-- No Escape key -->
```

### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│ MODAL ANATOMY                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░┌────────────────────────────────────┐░░░░░░░  │
│  ░░░░░░│ HEADER                          [X]│░░░░░░░  │
│  ░░░░░░│ Modal Title                        │░░░░░░░  │
│  ░░░░░░├────────────────────────────────────┤░░░░░░░  │
│  ░░░░░░│ BODY                               │░░░░░░░  │
│  ░░░░░░│                                    │░░░░░░░  │
│  ░░░░░░│ Content area. Scrollable if        │░░░░░░░  │
│  ░░░░░░│ content exceeds max height.        │░░░░░░░  │
│  ░░░░░░│                                    │░░░░░░░  │
│  ░░░░░░├────────────────────────────────────┤░░░░░░░  │
│  ░░░░░░│ FOOTER                             │░░░░░░░  │
│  ░░░░░░│                   [Cancel] [Save]  │░░░░░░░  │
│  ░░░░░░└────────────────────────────────────┘░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░BACKDROP (semi-transparent)░░░░░░░░░░░░  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SIZE VARIANTS                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  small: 400px  │  medium: 500px  │  large: 700px       │
│                                                         │
│  full: 90vw × 90vh (for complex content)               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ ANIMATION                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Open:  Backdrop fade in + Modal scale up from 95%     │
│  Close: Modal scale down to 95% + Backdrop fade out    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Open/Close Modal
**As a** developer
**I want to** programmatically open and close modals
**So that** I can control when dialogs appear

**Acceptance Criteria:**
- [ ] `modal.open()` displays the modal with animation
- [ ] `modal.close()` hides the modal with animation
- [ ] Modal is hidden by default (not in DOM flow)
- [ ] `open` event fires when modal opens
- [ ] `close` event fires when modal closes

### Story 2: Backdrop
**As a** user
**I want to** click the backdrop to close the modal
**So that** I can quickly dismiss dialogs

**Acceptance Criteria:**
- [ ] Semi-transparent backdrop covers viewport
- [ ] Clicking backdrop closes modal (default behavior)
- [ ] `backdrop-close="false"` disables backdrop click
- [ ] Backdrop fade animation on open/close

### Story 3: Close Button
**As a** user
**I want to** click an X button to close the modal
**So that** I have a clear way to dismiss it

**Acceptance Criteria:**
- [ ] X button appears in header by default
- [ ] `closable="false"` removes X button
- [ ] X button is keyboard accessible
- [ ] `[data-close]` attribute on any element triggers close

### Story 4: Keyboard Accessibility
**As a** keyboard user
**I want to** use Escape to close and Tab to navigate
**So that** I can interact without a mouse

**Acceptance Criteria:**
- [ ] Escape key closes modal (default)
- [ ] `escape-close="false"` disables Escape key
- [ ] Focus is trapped within modal while open
- [ ] Tab cycles through focusable elements
- [ ] Shift+Tab cycles backwards
- [ ] Focus returns to trigger element on close

### Story 5: Size Variants
**As a** developer
**I want to** choose modal sizes
**So that** content fits appropriately

**Acceptance Criteria:**
- [ ] `size="small"` renders 400px max-width
- [ ] `size="medium"` (default) renders 500px max-width
- [ ] `size="large"` renders 700px max-width
- [ ] `size="full"` renders 90vw × 90vh
- [ ] Body scrolls if content exceeds viewport

### Story 6: Screen Reader Accessibility
**As a** screen reader user
**I want to** understand modal context and content
**So that** I can interact effectively

**Acceptance Criteria:**
- [ ] Modal has `role="dialog"` or `role="alertdialog"`
- [ ] `aria-modal="true"` when open
- [ ] `aria-labelledby` references header
- [ ] `aria-describedby` references body (optional)
- [ ] Background content is inert (`aria-hidden`)
- [ ] Focus moves to modal on open

### Story 7: Scroll Lock
**As a** user
**I want** the page to not scroll while modal is open
**So that** I stay focused on modal content

**Acceptance Criteria:**
- [ ] Body scroll is locked when modal opens
- [ ] Scroll position is preserved
- [ ] Scroll is restored when modal closes
- [ ] Modal body can scroll independently

## Technical Approach

### Architecture

```javascript
// spark-modal.js
class SparkModal extends SparkElement {
  static get observedAttributes() {
    return ['size', 'closable', 'backdrop-close', 'escape-close'];
  }

  // Public API
  open() { /* Show modal, trap focus, lock scroll */ }
  close() { /* Hide modal, restore focus, unlock scroll */ }
  
  // Internal
  #trapFocus() { /* Focus trap implementation */ }
  #handleKeydown(e) { /* Escape key handling */ }
  #lockScroll() { /* Prevent body scroll */ }
}

customElements.define('spark-modal', SparkModal);
```

### Component Files

```
src/components/modal/
├── spark-modal.js         # Main modal container
├── spark-modal-header.js  # Header sub-component
├── spark-modal-body.js    # Body sub-component
├── spark-modal-footer.js  # Footer sub-component
├── modal.css              # Styles including animations
└── modal.test.js          # Tests
```

### Focus Trap Implementation

```javascript
#trapFocus() {
  const focusable = this.shadowRoot.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  this.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  });
}
```

### CSS Animation

```css
/* Backdrop */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity var(--spark-transition-normal);
}

:host([open]) .backdrop {
  opacity: 1;
}

/* Modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  opacity: 0;
  transition: transform var(--spark-transition-normal),
              opacity var(--spark-transition-normal);
}

:host([open]) .modal {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}
```

### Dependencies
- **Requires:** `foundation-setup` (SparkElement, tokens.css)
- **External:** None

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Multiple modals open | Stack with increasing z-index, close in LIFO order |
| Modal opened while animating closed | Cancel close, reopen |
| No focusable elements | Focus modal container itself |
| Very long content | Body scrolls, header/footer stay fixed |
| Nested focusable iframes | Focus trap includes iframe |
| Modal in modal | Inner modal gets focus, outer is inert |

## Out of Scope

- [ ] Drawer/sheet variant (slide from edge)
- [ ] Lightbox/image modal
- [ ] Confirmation dialog helper (pre-built confirm/cancel)
- [ ] Form validation integration
- [ ] Modal routing/URL state

## Open Questions

- [x] Support `alertdialog` role? → Yes, via `role` attribute
- [x] Auto-focus first element? → Yes, or element with `autofocus`

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


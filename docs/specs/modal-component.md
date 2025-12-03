# Feature Specification: Modal Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-modal>` Web Component provides an accessible dialog/modal overlay with focus trapping, keyboard navigation, and backdrop support. It's essential for confirmations, forms, and focused user interactions.

## Problem Statement

### The Problem
Building accessible modals is complex—developers must handle focus trapping, keyboard navigation, scroll locking, and ARIA attributes correctly. Most implementations miss critical accessibility requirements.

### Current State
Developers either:
- Use framework-specific modal libraries (React Modal, Vue Dialog, etc.)
- Build custom modals that often lack proper accessibility
- Use native `<dialog>` which has inconsistent browser support and limited styling

### Impact
Modals are critical for user confirmations, form inputs, and focused workflows. An accessible, well-designed modal component prevents accessibility issues and improves user experience.

## Proposed Solution

### User Experience
Developers create modals with semantic HTML and control them via JavaScript:

```html
<spark-modal id="confirm-modal">
  <spark-modal-header>
    <h2>Confirm Action</h2>
  </spark-modal-header>
  <spark-modal-body>
    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  </spark-modal-body>
  <spark-modal-footer>
    <spark-button variant="secondary" data-close>Cancel</spark-button>
    <spark-button variant="danger">Delete</spark-button>
  </spark-modal-footer>
</spark-modal>

<spark-button onclick="document.getElementById('confirm-modal').open()">
  Delete Item
</spark-button>
```

### API Reference

#### `<spark-modal>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | boolean | `false` | Whether the modal is visible (reflects open state) |
| `size` | string | `"md"` | Modal width: `sm` (400px), `md` (500px), `lg` (700px), `xl` (900px), `full` |
| `close-on-backdrop` | boolean | `true` | Whether clicking backdrop closes modal |
| `close-on-escape` | boolean | `true` | Whether pressing Escape closes modal |
| `no-close-button` | boolean | `false` | Hides the X close button |

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `open()` | none | Opens the modal |
| `close()` | none | Closes the modal |
| `toggle()` | none | Toggles open state |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-modal-open` | `{}` | Fired when modal opens |
| `spark-modal-close` | `{ trigger: 'button' \| 'backdrop' \| 'escape' \| 'api' }` | Fired when modal closes |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-modal-backdrop-color` | `rgba(0,0,0,0.5)` | Backdrop overlay color |
| `--spark-modal-background` | `#ffffff` | Modal content background |
| `--spark-modal-border-radius` | `var(--spark-radius-lg)` | Corner radius |
| `--spark-modal-z-index` | `1000` | Stacking order |

#### Sub-components

- `<spark-modal-header>` - Optional header section (contains title, close button)
- `<spark-modal-body>` - Main content area (scrollable if content overflows)
- `<spark-modal-footer>` - Optional footer section (typically action buttons)

#### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-close` | Any element with this attribute closes the modal when clicked |

### Visual Specifications

```
┌─────────────────────────────────────────────────────────────┐
│ MODAL STRUCTURE                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ← Backdrop      │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   (semi-        │
│  ░░░░░┌─────────────────────────────┐░░░░░░   transparent)  │
│  ░░░░░│ Header                   [X]│░░░░░░                 │
│  ░░░░░├─────────────────────────────┤░░░░░░                 │
│  ░░░░░│                             │░░░░░░                 │
│  ░░░░░│ Body (scrollable)           │░░░░░░                 │
│  ░░░░░│                             │░░░░░░                 │
│  ░░░░░├─────────────────────────────┤░░░░░░                 │
│  ░░░░░│ Footer        [Cancel][Save]│░░░░░░                 │
│  ░░░░░└─────────────────────────────┘░░░░░░                 │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                 │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ SIZE VARIANTS                                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  sm:   max-width: 400px                                     │
│  md:   max-width: 500px    ← default                        │
│  lg:   max-width: 700px                                     │
│  xl:   max-width: 900px                                     │
│  full: max-width: calc(100vw - 2rem), max-height: 90vh      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ ANIMATIONS                                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Open:  Backdrop fades in (0→1 opacity, 200ms)              │
│         Modal scales up (0.95→1, 200ms ease-out)            │
│                                                              │
│  Close: Reverse of open animation                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Basic Modal Usage
**As a** developer
**I want to** create a modal with header, body, and footer
**So that** I can display focused content that requires user attention

**Acceptance Criteria:**
- [ ] Given I add `<spark-modal>` with content, it renders hidden by default
- [ ] Given I call `modal.open()`, the modal becomes visible with backdrop
- [ ] Given I call `modal.close()`, the modal hides
- [ ] Given the modal is open, `spark-modal-open` event has fired

### Story 2: Close Modal Methods
**As a** developer
**I want to** close modals via multiple methods
**So that** users have flexible ways to dismiss dialogs

**Acceptance Criteria:**
- [ ] Given modal is open, clicking the X button closes it (`trigger: 'button'`)
- [ ] Given modal is open, clicking backdrop closes it (`trigger: 'backdrop'`)
- [ ] Given modal is open, pressing Escape closes it (`trigger: 'escape'`)
- [ ] Given `close-on-backdrop="false"`, clicking backdrop does NOT close modal
- [ ] Given `close-on-escape="false"`, pressing Escape does NOT close modal

### Story 3: Focus Trapping
**As a** keyboard user
**I want to** have my focus trapped within the modal
**So that** I can navigate the modal content without accidentally leaving it

**Acceptance Criteria:**
- [ ] Given modal opens, focus moves to the first focusable element inside
- [ ] Given focus is on last focusable element, pressing Tab moves to first
- [ ] Given focus is on first focusable element, pressing Shift+Tab moves to last
- [ ] Given modal closes, focus returns to the element that opened it

### Story 4: Scroll Locking
**As a** user
**I want to** not accidentally scroll the page behind the modal
**So that** I can focus on the modal content

**Acceptance Criteria:**
- [ ] Given modal is open, body scroll is disabled (`overflow: hidden` on body)
- [ ] Given modal is closed, body scroll is restored
- [ ] Given modal body content overflows, it scrolls independently

### Story 5: Size Variants
**As a** developer
**I want to** choose different modal sizes
**So that** I can fit different types of content appropriately

**Acceptance Criteria:**
- [ ] Given `size="sm"`, modal max-width is 400px
- [ ] Given `size="md"` (default), modal max-width is 500px
- [ ] Given `size="lg"`, modal max-width is 700px
- [ ] Given `size="xl"`, modal max-width is 900px
- [ ] Given `size="full"`, modal takes most of the viewport

### Story 6: Accessibility
**As a** screen reader user
**I want to** have the modal properly announced
**So that** I understand the context and can interact with it

**Acceptance Criteria:**
- [ ] Given modal is open, it has `role="dialog"`
- [ ] Given modal has a header, it has `aria-labelledby` pointing to header
- [ ] Given modal is open, it has `aria-modal="true"`
- [ ] Given modal has close button, it has `aria-label="Close"`

### Story 7: Data-Close Buttons
**As a** developer
**I want to** easily make buttons close the modal
**So that** I don't have to write JavaScript for cancel buttons

**Acceptance Criteria:**
- [ ] Given any element inside modal has `data-close`, clicking it closes the modal
- [ ] Given cancel button has `data-close`, clicking it closes with `trigger: 'button'`

## Technical Approach

### Architecture
The modal is implemented as Custom Elements with a singleton backdrop manager to handle stacking of multiple modals.

### File Structure
```
src/components/modal/
├── modal.js          # Main modal component
├── modal-header.js   # Header sub-component
├── modal-body.js     # Body sub-component  
├── modal-footer.js   # Footer sub-component
├── modal.css         # Styles (embedded)
└── modal.test.js     # Unit tests
```

### Component Class

```javascript
class SparkModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'size', 'close-on-backdrop', 'close-on-escape', 'no-close-button'];
  }
  
  // Public API
  open() { /* Show modal, trap focus, lock scroll */ }
  close() { /* Hide modal, restore focus, unlock scroll */ }
  toggle() { /* Toggle open state */ }
  
  // Focus management
  #trapFocus() { /* Implement focus trap */ }
  #restoreFocus() { /* Return focus to trigger */ }
  
  // Event handlers
  #handleKeydown(e) { /* Escape key, Tab trapping */ }
  #handleBackdropClick(e) { /* Close on backdrop */ }
}

customElements.define('spark-modal', SparkModal);
```

### Shadow DOM Structure

```html
<div class="modal-backdrop" part="backdrop">
  <div class="modal-container" part="container" role="dialog" aria-modal="true">
    <button class="modal-close" part="close-button" aria-label="Close">
      <svg><!-- X icon --></svg>
    </button>
    <slot></slot>
  </div>
</div>
```

### Focus Management Strategy
1. On open: Store `document.activeElement` as return target
2. Query all focusable elements inside modal
3. On Tab: If at end, go to start; if at start+Shift, go to end
4. On close: Return focus to stored element

### Scroll Lock Strategy
1. On open: Add `overflow: hidden` to `document.body`
2. Store original overflow value
3. On close: Restore original overflow value
4. Handle multiple modals (reference counting)

### Dependencies
- None (vanilla Web Components)
- Uses shared design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No focusable elements | Focus the modal container itself |
| Modal opens another modal | Stack modals, maintain focus trap per modal |
| Long body content | Body section scrolls, header/footer fixed |
| Browser back button | Does not close modal (no history manipulation) |
| Open while already open | No-op, stays open |
| Close while already closed | No-op, stays closed |
| Removed from DOM while open | Cleanup scroll lock and focus |

## Out of Scope

- [ ] Drawer/slide-in variant (separate component)
- [ ] Confirmation modal shorthand/factory function
- [ ] Alert dialogs (use native alert or dedicated component)
- [ ] Modal stacking management beyond focus (z-index is fixed)
- [ ] Animation customization (fixed enter/exit)

## Open Questions

*None - spec is ready for implementation.*

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial draft |


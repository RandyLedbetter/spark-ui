# Feature Specification: Modal Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04

## Overview

The Modal component (`<spark-modal>`) is a dialog overlay for focused user interactions. It handles backdrop, focus management, and accessibility requirements for modal dialogs.

## Problem Statement

### The Problem
Modal dialogs require complex accessibility handling: focus trapping, escape key closing, screen reader announcements, and scroll locking.

### Current State
Developers often implement modals incorrectly, leading to accessibility issues and inconsistent behavior.

### Impact
Modals are critical for confirmations, forms, and focused workflows. A well-implemented modal prevents accessibility violations and improves UX.

## Proposed Solution

### User Experience

```html
<!-- Basic modal -->
<spark-modal id="my-modal">
  <spark-modal-header>Confirm Action</spark-modal-header>
  <spark-modal-body>
    <p>Are you sure you want to proceed?</p>
  </spark-modal-body>
  <spark-modal-footer>
    <spark-button variant="ghost" data-close>Cancel</spark-button>
    <spark-button variant="primary">Confirm</spark-button>
  </spark-modal-footer>
</spark-modal>

<!-- Opening the modal -->
<script>
  document.querySelector('#my-modal').open();
</script>

<!-- Or with attribute -->
<spark-modal id="my-modal" open>...</spark-modal>
```

### API Design

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | boolean | `false` | Whether modal is visible |
| `size` | string | `"medium"` | Modal width: small, medium, large, full |
| `closable` | boolean | `true` | Show close button in header |
| `close-on-backdrop` | boolean | `true` | Close when clicking backdrop |
| `close-on-escape` | boolean | `true` | Close when pressing Escape |

#### Sub-components

| Component | Description |
|-----------|-------------|
| `<spark-modal-header>` | Title area with optional close button |
| `<spark-modal-body>` | Scrollable content area |
| `<spark-modal-footer>` | Action buttons area |

#### Methods

| Method | Description |
|--------|-------------|
| `open()` | Opens the modal |
| `close()` | Closes the modal |
| `toggle()` | Toggles open state |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-modal-open` | `{}` | Fired when modal opens |
| `spark-modal-close` | `{ reason }` | Fired when modal closes (reason: button, backdrop, escape) |
| `spark-modal-cancel` | `{}` | Fired when close is attempted (cancelable) |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-modal-background` | `--spark-white` | Modal content background |
| `--spark-modal-backdrop` | `rgba(0,0,0,0.5)` | Backdrop color |
| `--spark-modal-border-radius` | `--spark-radius-xl` | Corner radius |
| `--spark-modal-z-index` | `--spark-z-modal` | Stack order |

### Size Specifications

| Size | Width | Use Case |
|------|-------|----------|
| small | 400px | Simple confirmations |
| medium | 560px | Forms, standard dialogs |
| large | 720px | Complex content |
| full | 100vw - 2rem | Full-screen modal |

### Visual Structure

```
┌────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░ BACKDROP ░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░┌──────────────────────────────────────┐░░░░░░░░ │
│ ░░░░░│  HEADER                         [X] │░░░░░░░░ │
│ ░░░░░├──────────────────────────────────────┤░░░░░░░░ │
│ ░░░░░│                                      │░░░░░░░░ │
│ ░░░░░│  BODY (scrollable if needed)         │░░░░░░░░ │
│ ░░░░░│                                      │░░░░░░░░ │
│ ░░░░░├──────────────────────────────────────┤░░░░░░░░ │
│ ░░░░░│  FOOTER              [Cancel] [OK]  │░░░░░░░░ │
│ ░░░░░└──────────────────────────────────────┘░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Opening and Closing Modal
**As a** user
**I want to** open and close a modal dialog
**So that** I can complete focused tasks

**Acceptance Criteria:**
- [ ] Calling open() method displays the modal
- [ ] Calling close() method hides the modal
- [ ] Setting open attribute shows/hides modal
- [ ] spark-modal-open event fires when opened
- [ ] spark-modal-close event fires when closed with reason

### Story 2: Escape Key Closing
**As a** user
**I want to** close the modal by pressing Escape
**So that** I can quickly dismiss dialogs

**Acceptance Criteria:**
- [ ] Pressing Escape closes the modal by default
- [ ] close-on-escape false attribute disables this
- [ ] spark-modal-close fires with reason escape
- [ ] Works regardless of focus position within modal

### Story 3: Backdrop Click Closing
**As a** user
**I want to** close the modal by clicking outside
**So that** I can dismiss without finding close button

**Acceptance Criteria:**
- [ ] Clicking backdrop closes modal by default
- [ ] close-on-backdrop false attribute disables this
- [ ] spark-modal-close fires with reason backdrop
- [ ] Clicking inside modal content does not close

### Story 4: Focus Management
**As a** keyboard user
**I want to** have focus trapped within the modal
**So that** I can navigate without leaving accidentally

**Acceptance Criteria:**
- [ ] Focus moves to first focusable element on open
- [ ] Tab cycles through focusable elements within modal
- [ ] Shift+Tab cycles backwards
- [ ] Focus cannot leave modal while open
- [ ] Focus returns to trigger element on close

### Story 5: Accessibility
**As a** screen reader user
**I want to** understand the modal context
**So that** I know a dialog has appeared

**Acceptance Criteria:**
- [ ] Modal has role dialog
- [ ] Modal has aria-modal true
- [ ] Modal has aria-labelledby pointing to header
- [ ] Background content has aria-hidden when modal open
- [ ] Close button has aria-label Close

### Story 6: Close Button Integration
**As a** developer
**I want to** easily wire up close buttons
**So that** I do not need custom JavaScript

**Acceptance Criteria:**
- [ ] Elements with data-close attribute close the modal when clicked
- [ ] Works for buttons in header, body, or footer
- [ ] spark-modal-close fires with reason button

## Technical Approach

### Architecture

```
spark-modal/
├── modal.js         # SparkModal class
├── modal-header.js  # SparkModalHeader class
├── modal-body.js    # SparkModalBody class
├── modal-footer.js  # SparkModalFooter class
└── modal.test.js    # Unit tests
```

### Component Structure

```javascript
class SparkModal extends SparkElement {
  static get observedAttributes() {
    return ['open', 'size', 'closable', 'close-on-backdrop', 'close-on-escape'];
  }
  
  get template() {
    return `
      <div part="backdrop" class="${this.isOpen ? 'visible' : ''}"></div>
      <div part="dialog" role="dialog" aria-modal="true">
        <slot></slot>
      </div>
    `;
  }
  
  open() { this.setAttribute('open', ''); }
  close() { this.removeAttribute('open'); }
}
```

### Key Implementation Details

1. **Focus trap utility** - Uses `trapFocus()` from `src/core/utils.js`
2. **Scroll lock** - Prevents body scroll when open
3. **Portal pattern** - Modal renders in place (no teleport needed)
4. **Event delegation** - `data-close` buttons handled via event bubbling
5. **Return focus** - Stores and restores trigger element focus

### Dependencies

- Extends `SparkElement` from `src/core/base-component.js`
- Uses `trapFocus()` from `src/core/utils.js`
- Uses design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No focusable elements | Focus stays on modal container |
| Modal opened by removed element | Focus goes to modal, no return target |
| Multiple modals open | Last opened is on top, focus in topmost |
| Very long content | Body scrolls, header/footer fixed |
| Modal in modal | Supported but discouraged |

## Out of Scope

- [ ] Drawer/slide-in variant (future spec)
- [ ] Alert dialog variant (use modal with role alertdialog)
- [ ] Confirmation helper (wrapper component)
- [ ] Animation customization (uses CSS transitions)
- [ ] Stacking context management for deeply nested modals

## Open Questions

- [x] ~~Support for custom backdrop component?~~ **Decision:** No, use CSS custom properties
- [x] ~~Include built-in confirm/alert methods?~~ **Decision:** No, keep component focused

## Implementation Tasks

| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| modal-001 | Modal component structure | 1h | None |
| modal-002 | Modal sub-components | 1h | modal-001 |
| modal-003 | Modal open and close behavior | 1h | modal-001 |
| modal-004 | Modal focus management | 1h | modal-003 |
| modal-005 | Modal accessibility | 1h | modal-004 |

**Total Estimate:** 5 hours

See `docs/sprint.yaml` for full task details and status.

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


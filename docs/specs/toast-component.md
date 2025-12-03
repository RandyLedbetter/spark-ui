# Feature Specification: Toast Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-toast>` Web Component and `SparkToast` API provide a notification system for displaying brief, non-blocking messages to users. Toasts auto-dismiss by default and stack when multiple are shown.

## Problem Statement

### The Problem
Developers need a way to show transient feedback (success messages, errors, warnings) without blocking user interaction. Building a toast system with proper stacking, animations, and accessibility is complex.

### Current State
Developers either:
- Use framework-specific toast libraries (react-toastify, vue-toastification)
- Build custom toast systems that lack proper stacking and accessibility
- Abuse browser alerts which block interaction

### Impact
Toasts are essential for user feedback on actions (form submissions, saves, errors). A well-designed toast system improves UX by providing non-intrusive feedback.

## Proposed Solution

### User Experience
Developers show toasts programmatically via a simple API:

```javascript
// Simple usage
SparkToast.success('File saved successfully');
SparkToast.error('Failed to save file');
SparkToast.warning('Your session will expire soon');
SparkToast.info('New updates available');

// With options
SparkToast.show({
  message: 'Item deleted',
  type: 'success',
  duration: 5000,
  action: {
    label: 'Undo',
    onClick: () => restoreItem()
  }
});
```

Or declaratively via HTML:

```html
<spark-toast type="success" duration="3000">
  File saved successfully
</spark-toast>

<script>
  document.querySelector('spark-toast').show();
</script>
```

### API Reference

#### `SparkToast` Static Methods (Programmatic API)

| Method | Parameters | Description |
|--------|------------|-------------|
| `show(options)` | `ToastOptions` | Show toast with full options |
| `success(message)` | `string` | Show success toast |
| `error(message)` | `string` | Show error toast |
| `warning(message)` | `string` | Show warning toast |
| `info(message)` | `string` | Show info toast |
| `dismiss(id)` | `string` | Dismiss specific toast |
| `dismissAll()` | none | Dismiss all toasts |

#### ToastOptions Object

```typescript
interface ToastOptions {
  message: string;           // Required: Toast message
  type?: 'info' | 'success' | 'warning' | 'error';  // Default: 'info'
  duration?: number;         // Default: 4000 (ms), 0 = no auto-dismiss
  position?: 'top-right' | 'top-left' | 'top-center' | 
             'bottom-right' | 'bottom-left' | 'bottom-center';  // Default: 'bottom-right'
  dismissible?: boolean;     // Default: true (show close button)
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

#### `<spark-toast>` Element Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | `"info"` | Toast type: `info`, `success`, `warning`, `error` |
| `duration` | number | `4000` | Auto-dismiss time in ms (0 = no auto-dismiss) |
| `position` | string | `"bottom-right"` | Screen position |
| `dismissible` | boolean | `true` | Show close button |

#### Element Methods

| Method | Description |
|--------|-------------|
| `show()` | Display the toast |
| `dismiss()` | Hide the toast |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-toast-show` | `{ id: string }` | Fired when toast appears |
| `spark-toast-dismiss` | `{ id: string, trigger: 'auto' \| 'button' \| 'action' \| 'api' }` | Fired when toast is dismissed |
| `spark-toast-action` | `{ id: string }` | Fired when action button is clicked |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-toast-background` | `#1e293b` | Toast background color |
| `--spark-toast-text-color` | `#ffffff` | Toast text color |
| `--spark-toast-border-radius` | `var(--spark-radius-md)` | Corner radius |
| `--spark-toast-shadow` | `var(--spark-shadow-lg)` | Box shadow |
| `--spark-toast-z-index` | `9999` | Stacking order |

### Visual Specifications

```
┌─────────────────────────────────────────────────────────────┐
│ TOAST TYPES                                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────┐                │
│  │ ✓  File saved successfully          [×] │  SUCCESS      │
│  └─────────────────────────────────────────┘  #22c55e      │
│                                                              │
│  ┌─────────────────────────────────────────┐                │
│  │ ✗  Failed to save file              [×] │  ERROR        │
│  └─────────────────────────────────────────┘  #ef4444      │
│                                                              │
│  ┌─────────────────────────────────────────┐                │
│  │ ⚠  Session expiring soon            [×] │  WARNING      │
│  └─────────────────────────────────────────┘  #f59e0b      │
│                                                              │
│  ┌─────────────────────────────────────────┐                │
│  │ ℹ  New updates available            [×] │  INFO         │
│  └─────────────────────────────────────────┘  #6366f1      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ TOAST WITH ACTION                                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────┐                │
│  │ ✓  Item deleted              [Undo] [×] │                │
│  └─────────────────────────────────────────┘                │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ POSITIONS                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [top-left]     [top-center]           [top-right]    │   │
│  │                                                      │   │
│  │                                                      │   │
│  │                                                      │   │
│  │ [bottom-left]  [bottom-center]     [bottom-right] ← │   │
│  └──────────────────────────────────────────────────────┘   │
│                                           default           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ STACKING (bottom-right example)                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                              ┌─────────────────────┐        │
│                              │ Toast 3 (newest)    │        │
│                              └─────────────────────┘        │
│                              ┌─────────────────────┐        │
│                              │ Toast 2             │        │
│                              └─────────────────────┘        │
│                              ┌─────────────────────┐        │
│                              │ Toast 1 (oldest)    │        │
│                              └─────────────────────┘        │
│                                                              │
│  Gap between toasts: 8px                                    │
│  Max visible: 5 (older toasts dismissed)                    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ ANIMATIONS                                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Enter: Slide in from edge + fade (300ms ease-out)          │
│  Exit:  Slide out to edge + fade (200ms ease-in)            │
│  Stack shift: Smooth position transition (200ms)            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Show Success Toast
**As a** developer
**I want to** show a success message after an action completes
**So that** users know their action was successful

**Acceptance Criteria:**
- [ ] Given I call `SparkToast.success('Saved')`, a green toast appears
- [ ] Given the toast appears, it has a checkmark icon
- [ ] Given 4 seconds pass, the toast auto-dismisses
- [ ] Given the toast dismisses, it slides out with animation

### Story 2: Show Error Toast
**As a** developer
**I want to** show an error message when something fails
**So that** users understand what went wrong

**Acceptance Criteria:**
- [ ] Given I call `SparkToast.error('Failed')`, a red toast appears
- [ ] Given the toast appears, it has an X icon
- [ ] Given `duration: 0`, the toast does NOT auto-dismiss
- [ ] Given the toast has close button, clicking it dismisses the toast

### Story 3: Toast with Action
**As a** developer
**I want to** add an action button to toasts
**So that** users can take immediate follow-up action (e.g., Undo)

**Acceptance Criteria:**
- [ ] Given action option provided, an action button appears in the toast
- [ ] Given user clicks action button, the `onClick` callback fires
- [ ] Given action is clicked, the toast dismisses
- [ ] Given action is clicked, `spark-toast-action` event fires

### Story 4: Toast Stacking
**As a** user
**I want to** see multiple toasts stacked
**So that** I don't miss any notifications

**Acceptance Criteria:**
- [ ] Given multiple toasts shown, they stack vertically with 8px gap
- [ ] Given more than 5 toasts, the oldest auto-dismiss to make room
- [ ] Given a toast in stack dismisses, others animate to fill the gap
- [ ] Given toasts are in bottom position, newest appears on top

### Story 5: Toast Positioning
**As a** developer
**I want to** choose where toasts appear
**So that** I can avoid covering important UI elements

**Acceptance Criteria:**
- [ ] Given `position: 'top-right'`, toasts appear in top-right corner
- [ ] Given `position: 'bottom-center'`, toasts appear at bottom center
- [ ] Given different positions used, toasts group by position independently

### Story 6: Dismissible Control
**As a** developer
**I want to** control whether toasts have close buttons
**So that** I can create non-dismissible notifications when needed

**Acceptance Criteria:**
- [ ] Given `dismissible: false`, no close button appears
- [ ] Given `dismissible: false` and `duration: 0`, toast stays until API dismisses it
- [ ] Given `dismissible: true` (default), close button appears

### Story 7: Accessibility
**As a** screen reader user
**I want to** have toasts announced appropriately
**So that** I'm aware of notifications

**Acceptance Criteria:**
- [ ] Given toast appears, it has `role="alert"` for important messages
- [ ] Given toast appears, it has `aria-live="polite"` for info messages
- [ ] Given error toast appears, it has `aria-live="assertive"`
- [ ] Given toast has close button, it has `aria-label="Dismiss notification"`

## Technical Approach

### Architecture
The toast system has two parts:
1. `SparkToast` - Static class managing toast state and rendering
2. `<spark-toast>` - Web Component for declarative usage

A single toast container element is injected into the DOM to hold all toasts.

### File Structure
```
src/components/toast/
├── toast.js           # SparkToast class + spark-toast element
├── toast-container.js # Internal container management
├── toast.css          # Styles (embedded)
└── toast.test.js      # Unit tests
```

### Toast Manager (Singleton)

```javascript
class SparkToast {
  static #toasts = new Map();
  static #containers = new Map(); // One per position
  
  static show(options) {
    const id = crypto.randomUUID();
    const toast = this.#createToast(id, options);
    this.#getContainer(options.position).appendChild(toast);
    // Auto-dismiss timer
    if (options.duration > 0) {
      setTimeout(() => this.dismiss(id), options.duration);
    }
    return id;
  }
  
  static success(message) { return this.show({ message, type: 'success' }); }
  static error(message) { return this.show({ message, type: 'error', duration: 0 }); }
  static warning(message) { return this.show({ message, type: 'warning' }); }
  static info(message) { return this.show({ message, type: 'info' }); }
  
  static dismiss(id) { /* Remove toast, trigger animation */ }
  static dismissAll() { /* Clear all toasts */ }
}

// Make available globally
window.SparkToast = SparkToast;
```

### Toast Container Structure

```html
<!-- Injected into document.body -->
<div class="spark-toast-container" data-position="bottom-right">
  <div class="spark-toast" role="alert" aria-live="polite">
    <span class="toast-icon"><!-- SVG --></span>
    <span class="toast-message">Message text</span>
    <button class="toast-action">Undo</button>
    <button class="toast-close" aria-label="Dismiss">×</button>
  </div>
  <!-- More toasts stack here -->
</div>
```

### Animation Strategy
- Use CSS transitions for enter/exit
- Position transitions for stack reflow
- `@starting-style` for enter animations (or JS fallback)
- Transform + opacity for smooth performance

### Dependencies
- None (vanilla Web Components)
- Uses shared design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Very long message | Text wraps, toast expands vertically |
| Rapid successive toasts | All appear in queue, respecting max visible |
| Dismiss during animation | Cancel animation, remove immediately |
| Click action + dismiss simultaneously | Action takes precedence, dismiss prevented |
| Page navigation | Toasts persist (unless SPA clears them) |
| Zero duration | Toast stays until manually dismissed |
| Container doesn't exist | Create container on first toast |

## Out of Scope

- [ ] Toast persistence across page reloads
- [ ] Promise-based toasts (loading → success)
- [ ] Custom icons beyond type defaults
- [ ] Toast grouping/deduplication
- [ ] Sound notifications
- [ ] Progress bar for duration

## Open Questions

*None - spec is ready for implementation.*

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial draft |


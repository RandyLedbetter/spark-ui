# Feature Specification: Toast Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04
> **Depends On:** foundation-setup

## Overview

Create `<spark-toast>` and `SparkToast` API, a notification system for displaying brief, non-blocking messages to users. Toasts appear temporarily and stack when multiple are shown.

## Problem Statement

### The Problem
Applications need to communicate feedback (success, error, info) without interrupting user flow. Building a toast system requires:
- Positioning and stacking logic
- Auto-dismiss timing
- Animation in/out
- Accessibility announcements
- Multiple toast management

### Current State
Developers use framework-specific toast libraries or build incomplete implementations that lack proper stacking, accessibility, or animations.

### Impact
Toasts are essential for user feedback. A well-built toast system improves UX by providing clear, non-intrusive feedback.

## Proposed Solution

### User Experience

```javascript
// Programmatic API (recommended)
SparkToast.show({
  message: 'File saved successfully',
  type: 'success',
  duration: 3000
});

SparkToast.show({
  message: 'Network error. Please try again.',
  type: 'error',
  duration: 5000,
  closable: true
});

// Shorthand methods
SparkToast.success('Changes saved!');
SparkToast.error('Something went wrong');
SparkToast.warning('Session expires in 5 minutes');
SparkToast.info('New version available');

// With options
SparkToast.success('Copied to clipboard', { duration: 2000 });

// Manual close
const toast = SparkToast.show({ message: 'Processing...', duration: 0 });
// Later...
toast.close();
```

```html
<!-- Declarative (for static toasts, less common) -->
<spark-toast type="info" visible>
  This is an info message
</spark-toast>

<!-- Toast container (auto-created, can be customized) -->
<spark-toast-container position="top-right"></spark-toast-container>
```

### Visual Design

```
┌─────────────────────────────────────────────────────────┐
│ TOAST TYPES                                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ✓  File saved successfully                    [X]│  │
│  └──────────────────────────────────────────────────┘  │
│  SUCCESS: Green left border/icon                        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ✕  Network error. Please try again.           [X]│  │
│  └──────────────────────────────────────────────────┘  │
│  ERROR: Red left border/icon                            │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ⚠  Session expires in 5 minutes               [X]│  │
│  └──────────────────────────────────────────────────┘  │
│  WARNING: Amber left border/icon                        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ℹ  New version available                      [X]│  │
│  └──────────────────────────────────────────────────┘  │
│  INFO: Blue left border/icon                            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ POSITION OPTIONS                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  top-left      top-center      top-right (default)     │
│  ┌─────┐       ┌─────┐              ┌─────┐            │
│  │░░░░░│       │░░░░░│              │░░░░░│            │
│  └─────┘       └─────┘              └─────┘            │
│                                                         │
│  bottom-left   bottom-center   bottom-right            │
│  ┌─────┐       ┌─────┐              ┌─────┐            │
│  │░░░░░│       │░░░░░│              │░░░░░│            │
│  └─────┘       └─────┘              └─────┘            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ STACKING (newest on top for top positions)             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────┐  ← Newest (just appeared)    │
│  │ Toast 3              │                               │
│  └──────────────────────┘                               │
│  ┌──────────────────────┐                               │
│  │ Toast 2              │                               │
│  └──────────────────────┘                               │
│  ┌──────────────────────┐  ← Oldest (about to dismiss) │
│  │ Toast 1              │                               │
│  └──────────────────────┘                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Show Toast Message
**As a** developer
**I want to** display a toast notification
**So that** users receive feedback about their actions

**Acceptance Criteria:**
- [ ] `SparkToast.show({ message })` displays a toast
- [ ] Toast appears with slide-in animation
- [ ] Toast auto-dismisses after duration (default 4000ms)
- [ ] Toast disappears with slide-out animation

### Story 2: Toast Types
**As a** developer
**I want to** show different toast types
**So that** users understand the nature of the message

**Acceptance Criteria:**
- [ ] `type: 'success'` shows green styling with checkmark icon
- [ ] `type: 'error'` shows red styling with X icon
- [ ] `type: 'warning'` shows amber styling with warning icon
- [ ] `type: 'info'` (default) shows blue styling with info icon
- [ ] Shorthand methods: `SparkToast.success()`, `.error()`, `.warning()`, `.info()`

### Story 3: Manual Dismiss
**As a** user
**I want to** manually close toasts
**So that** I can dismiss messages before auto-close

**Acceptance Criteria:**
- [ ] `closable: true` shows X button
- [ ] Clicking X immediately closes toast
- [ ] `duration: 0` creates persistent toast (no auto-dismiss)
- [ ] `toast.close()` programmatically closes toast

### Story 4: Toast Positioning
**As a** developer
**I want to** control where toasts appear
**So that** they don't obstruct important UI

**Acceptance Criteria:**
- [ ] `position: 'top-right'` (default) shows in top-right
- [ ] Supports: top-left, top-center, top-right
- [ ] Supports: bottom-left, bottom-center, bottom-right
- [ ] Position is configurable globally via container

### Story 5: Toast Stacking
**As a** user viewing multiple toasts
**I want** them to stack properly
**So that** I can see all messages

**Acceptance Criteria:**
- [ ] Multiple toasts stack vertically with gap
- [ ] Newest toast appears at the edge (top for top positions)
- [ ] Dismissing a toast shifts others smoothly
- [ ] Maximum visible toasts configurable (default 5)
- [ ] Excess toasts queue until space available

### Story 6: Accessibility
**As a** screen reader user
**I want** toasts announced appropriately
**So that** I'm aware of feedback messages

**Acceptance Criteria:**
- [ ] Toast container has `role="region"` and `aria-label`
- [ ] New toasts are announced via `aria-live="polite"`
- [ ] Error toasts use `aria-live="assertive"`
- [ ] Close button is keyboard accessible
- [ ] Dismiss on hover-out pauses auto-dismiss timer

### Story 7: Progress Indicator
**As a** user
**I want** to see how long until auto-dismiss
**So that** I know when the toast will disappear

**Acceptance Criteria:**
- [ ] Optional progress bar shows remaining time
- [ ] Progress bar animates from full to empty
- [ ] Hovering pauses the timer and progress bar

## Technical Approach

### Architecture

```javascript
// Global toast manager (singleton)
class ToastManager {
  #container = null;
  #toasts = [];
  #maxVisible = 5;

  show(options) {
    const toast = new SparkToast(options);
    this.#toasts.push(toast);
    this.#container.appendChild(toast);
    return toast;
  }

  // Shorthand methods
  success(message, options) { return this.show({ message, type: 'success', ...options }); }
  error(message, options) { return this.show({ message, type: 'error', ...options }); }
  warning(message, options) { return this.show({ message, type: 'warning', ...options }); }
  info(message, options) { return this.show({ message, type: 'info', ...options }); }
}

// Export singleton as SparkToast
export const SparkToast = new ToastManager();
```

```javascript
// spark-toast.js - Individual toast element
class SparkToast extends SparkElement {
  static get observedAttributes() {
    return ['type', 'duration', 'closable', 'visible'];
  }

  #timer = null;

  connectedCallback() {
    this.render();
    this.startTimer();
  }

  close() {
    this.emit('close');
    this.remove();
  }

  startTimer() {
    const duration = this.getAttr('duration', 4000);
    if (duration > 0) {
      this.#timer = setTimeout(() => this.close(), duration);
    }
  }

  pauseTimer() { clearTimeout(this.#timer); }
  resumeTimer() { this.startTimer(); }
}
```

### Component Files

```
src/components/toast/
├── spark-toast.js          # Individual toast element
├── spark-toast-container.js # Container for positioning
├── toast-manager.js        # Singleton manager (SparkToast API)
├── toast.css               # Styles
├── icons.js                # SVG icons for types
└── toast.test.js           # Tests
```

### CSS Structure

```css
/* Container positioning */
spark-toast-container {
  position: fixed;
  z-index: var(--spark-z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--spark-spacing-sm);
  padding: var(--spark-spacing-md);
  pointer-events: none;
}

spark-toast-container[position="top-right"] {
  top: 0;
  right: 0;
  align-items: flex-end;
}

/* Individual toast */
spark-toast {
  display: flex;
  align-items: center;
  gap: var(--spark-spacing-sm);
  padding: var(--spark-spacing-md);
  background: var(--spark-background);
  border-radius: var(--spark-radius-md);
  box-shadow: var(--spark-shadow-lg);
  border-left: 4px solid;
  pointer-events: auto;
  animation: slideIn var(--spark-transition-normal) ease-out;
}

spark-toast[type="success"] { border-color: var(--spark-success); }
spark-toast[type="error"] { border-color: var(--spark-error); }
spark-toast[type="warning"] { border-color: var(--spark-warning); }
spark-toast[type="info"] { border-color: var(--spark-primary); }

/* Animation */
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
```

### Dependencies
- **Requires:** `foundation-setup` (SparkElement, tokens.css)
- **External:** None

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Show toast before DOM ready | Queue toast, show when container ready |
| Rapid-fire toasts | Queue excess beyond max visible |
| Very long message | Text wraps, toast expands height |
| HTML in message | Escaped by default, `html: true` option allows |
| Page resize | Toast container adjusts position |
| Toast during animation | Complete animation, then process |
| Close during slide-in | Immediately start slide-out |

## Out of Scope

- [ ] Custom icons (uses built-in type icons only)
- [ ] Action buttons in toast (e.g., "Undo")
- [ ] Rich content (images, avatars)
- [ ] Custom animation options
- [ ] Sound effects
- [ ] Desktop notifications integration

## Open Questions

- [x] Show progress bar by default? → No, opt-in via `progress: true`
- [x] Pause timer on hover? → Yes, pause on mouseenter, resume on mouseleave

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


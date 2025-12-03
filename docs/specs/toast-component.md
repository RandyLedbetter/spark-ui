# Feature Specification: Toast Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The Toast system provides a global notification mechanism for displaying brief, non-blocking messages to users. It consists of a `SparkToast` JavaScript API for showing toasts and a `<spark-toast-container>` element for rendering them.

## Problem Statement

### The Problem
Applications need to communicate feedback to users:
- Action confirmations ("File saved")
- Error notifications ("Upload failed")
- Warnings ("Session expiring")
- Informational updates ("New message received")

Building a toast system requires:
- Global state management
- Positioning and stacking logic
- Auto-dismiss timers
- Accessible announcements
- Animation coordination

### Current State
Developers use heavy toast libraries or build fragile custom implementations that often lack accessibility and proper stacking.

### Impact
Toast notifications are essential for user feedback. A well-designed toast system:
- Reduces user uncertainty about action results
- Provides accessible announcements
- Maintains visual consistency

## Proposed Solution

### User Experience

```javascript
// JavaScript API - Simple usage
SparkToast.show('File saved successfully');

// With options
SparkToast.show({
  message: 'Upload failed. Please try again.',
  type: 'error',
  duration: 5000
});

// Shorthand methods
SparkToast.success('Profile updated');
SparkToast.error('Connection lost');
SparkToast.warning('Unsaved changes');
SparkToast.info('New version available');

// Manual dismiss
const toast = SparkToast.show({ message: 'Processing...', duration: 0 });
// Later...
toast.dismiss();
```

```html
<!-- Optional: Container for custom positioning -->
<spark-toast-container position="bottom-right"></spark-toast-container>
```

### Visual Design

```
Position Options:
┌─────────────────────────────────────────┐
│ [top-left]              [top-right]     │
│                                         │
│                                         │
│                                         │
│                                         │
│ [bottom-left]        [bottom-right]     │
└─────────────────────────────────────────┘

Toast Stack (bottom-right example):
                        ┌─────────────────────┐
                        │ ✓ File saved     ✕  │
                        └─────────────────────┘
                        ┌─────────────────────┐
                        │ ⚠ Low storage    ✕  │
                        └─────────────────────┘
                        ┌─────────────────────┐
                        │ ✕ Upload failed  ✕  │
                        └─────────────────────┘

Toast Types:
┌──────────────────────────────────────┐
│ ℹ️  Info message              ✕      │  (blue)
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ ✅  Success message           ✕      │  (green)
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ ⚠️  Warning message           ✕      │  (yellow)
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ ❌  Error message             ✕      │  (red)
└──────────────────────────────────────┘
```

## User Stories

### Story 1: Show Basic Toast
**As a** developer
**I want to** display a toast message
**So that** I can notify users of events

**Acceptance Criteria:**
- [ ] Given `SparkToast.show('message')`, when called, then toast appears on screen
- [ ] Given a toast, when duration elapses, then toast automatically dismisses
- [ ] Given default duration (3000ms), when toast shows, then it dismisses after 3 seconds

### Story 2: Toast Types
**As a** developer
**I want to** show different types of toasts
**So that** users understand the nature of the notification

**Acceptance Criteria:**
- [ ] Given `type: 'info'`, when rendered, then toast has blue styling and info icon
- [ ] Given `type: 'success'`, when rendered, then toast has green styling and check icon
- [ ] Given `type: 'warning'`, when rendered, then toast has yellow styling and warning icon
- [ ] Given `type: 'error'`, when rendered, then toast has red styling and error icon

### Story 3: Manual Dismiss
**As a** user
**I want to** dismiss toasts manually
**So that** I can clear notifications I've read

**Acceptance Criteria:**
- [ ] Given a toast, when close button is clicked, then toast dismisses immediately
- [ ] Given a toast reference, when `.dismiss()` is called, then toast dismisses
- [ ] Given `duration: 0`, when toast shows, then it stays until manually dismissed

### Story 4: Toast Stacking
**As a** developer
**I want to** show multiple toasts
**So that** users see all relevant notifications

**Acceptance Criteria:**
- [ ] Given multiple `show()` calls, when rendered, then toasts stack vertically
- [ ] Given stacked toasts, when one dismisses, then others reposition smoothly
- [ ] Given max stack limit (default 5), when exceeded, then oldest toast dismisses

### Story 5: Position Options
**As a** developer
**I want to** control where toasts appear
**So that** I can position them appropriately for my layout

**Acceptance Criteria:**
- [ ] Given `position: 'top-right'` (default), then toasts appear in top-right corner
- [ ] Given `position: 'top-left'`, then toasts appear in top-left corner
- [ ] Given `position: 'bottom-right'`, then toasts appear in bottom-right corner
- [ ] Given `position: 'bottom-left'`, then toasts appear in bottom-left corner

### Story 6: Screen Reader Accessibility
**As a** screen reader user
**I want to** hear toast announcements
**So that** I'm informed of notifications

**Acceptance Criteria:**
- [ ] Given a toast appears, then message is announced via aria-live region
- [ ] Given `type: 'error'`, then announcement is assertive (aria-live="assertive")
- [ ] Given non-error type, then announcement is polite (aria-live="polite")

### Story 7: Shorthand Methods
**As a** developer
**I want to** use convenient shorthand methods
**So that** I can show typed toasts quickly

**Acceptance Criteria:**
- [ ] Given `SparkToast.success('msg')`, then success toast shows
- [ ] Given `SparkToast.error('msg')`, then error toast shows
- [ ] Given `SparkToast.warning('msg')`, then warning toast shows
- [ ] Given `SparkToast.info('msg')`, then info toast shows

## Technical Approach

### Architecture

```
SparkToast (Global API - Singleton)
├── Configuration (position, maxStack, defaultDuration)
├── Toast Queue (active toasts)
└── Container Element (creates if not exists)

spark-toast-container (Custom Element)
├── Shadow Root
│   ├── <style>
│   └── <div class="toast-stack" role="region" aria-live="polite">
│       └── [toast elements inserted here]

Individual Toast (Internal element)
├── <div class="toast toast--{type}">
│   ├── <span class="icon">{icon}</span>
│   ├── <span class="message">{message}</span>
│   └── <button class="close">✕</button>
```

### Key Components

- **SparkToast:** Global singleton API for showing/managing toasts
- **spark-toast-container:** Optional custom element for positioning
- **Toast instance:** Individual toast with dismiss method

### API

```javascript
// Main API
SparkToast.show(message: string | ToastOptions): ToastInstance
SparkToast.success(message: string, options?: ToastOptions): ToastInstance
SparkToast.error(message: string, options?: ToastOptions): ToastInstance
SparkToast.warning(message: string, options?: ToastOptions): ToastInstance
SparkToast.info(message: string, options?: ToastOptions): ToastInstance
SparkToast.configure(options: GlobalOptions): void
SparkToast.dismissAll(): void

// ToastOptions
interface ToastOptions {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // ms, 0 for persistent
}

// GlobalOptions
interface GlobalOptions {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxStack?: number;
  defaultDuration?: number;
}

// ToastInstance
interface ToastInstance {
  dismiss(): void;
}
```

### CSS Custom Properties

```css
--spark-toast-bg: white;
--spark-toast-text: var(--spark-secondary);
--spark-toast-radius: var(--spark-radius-md);
--spark-toast-shadow: var(--spark-shadow-md);
--spark-toast-padding: var(--spark-spacing-sm) var(--spark-spacing-md);
--spark-toast-gap: var(--spark-spacing-sm);
--spark-toast-z-index: 1100;
--spark-toast-info: var(--spark-primary);
--spark-toast-success: var(--spark-success);
--spark-toast-warning: var(--spark-warning);
--spark-toast-error: var(--spark-error);
```

### File Structure

```
src/components/toast/
├── toast.js        # SparkToast API + container element
├── toast.css       # Component styles
└── toast.test.js   # Unit tests
```

### Dependencies

- None (zero runtime dependencies)
- Uses global design tokens from `src/tokens/tokens.css`

### Animation

```css
/* Entry animation */
@keyframes spark-toast-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Exit animation */
@keyframes spark-toast-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No container in DOM | Auto-create container in document.body |
| Multiple containers | Use first one found |
| Toast shown before DOM ready | Queue and show when ready |
| Very long message | Text wraps, toast expands height |
| Rapid successive toasts | Queue and show in order, respect maxStack |
| Page navigation (SPA) | Container persists, toasts remain |
| Duration of 0 | Toast persists until manual dismiss |

## Out of Scope

- [ ] Action buttons on toasts (e.g., "Undo")
- [ ] Progress indicator for timed toasts
- [ ] Custom icons beyond type icons
- [ ] Toast grouping/collapsing similar messages
- [ ] Promise-based toasts (loading → success/error)
- [ ] Rich HTML content in messages

## Open Questions

- [x] Should toasts pause timer on hover? → **No, keep simple for MVP**
- [x] Click on toast body to dismiss? → **No, only close button**

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial specification |


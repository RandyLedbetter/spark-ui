# Feature Specification: Toast Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04

## Overview

The Toast component provides non-blocking notifications that appear temporarily to inform users of events or actions. It includes a container (`<spark-toast-container>`) and a programmatic API (`SparkToast.show()`).

## Problem Statement

### The Problem
Applications need to show transient feedback messages (success, error, info) without interrupting user workflow.

### Current State
Developers implement toast systems inconsistently, often with poor accessibility (no screen reader announcements) or UX issues (blocking content, no dismiss option).

### Impact
Toasts are essential for user feedback. A well-designed toast system improves perceived responsiveness and keeps users informed.

## Proposed Solution

### User Experience

```javascript
// Programmatic API (primary usage)
import { SparkToast } from 'spark-ui';

// Simple message
SparkToast.show('File saved successfully');

// With options
SparkToast.show({
  message: 'Unable to save file',
  type: 'error',
  duration: 5000
});

// Success shorthand
SparkToast.success('Upload complete!');

// Error shorthand
SparkToast.error('Network connection lost');

// Manual dismiss
const toast = SparkToast.show({ message: 'Processing...', duration: 0 });
// Later...
toast.dismiss();
```

```html
<!-- Toast container (add once to page) -->
<spark-toast-container position="top-right"></spark-toast-container>
```

### API Design

#### SparkToast Static Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `show(options)` | options object or string | Shows a toast, returns toast instance |
| `success(message)` | string | Shows success toast |
| `error(message)` | string | Shows error toast |
| `warning(message)` | string | Shows warning toast |
| `info(message)` | string | Shows info toast |
| `dismissAll()` | none | Dismisses all visible toasts |

#### Options Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `message` | string | required | Toast message text |
| `type` | string | `"info"` | Toast type: info, success, warning, error |
| `duration` | number | `4000` | Auto-dismiss time in ms (0 = manual) |
| `dismissible` | boolean | `true` | Show close button |
| `position` | string | (from container) | Override container position |

#### Toast Instance Methods

| Method | Description |
|--------|-------------|
| `dismiss()` | Manually dismiss this toast |
| `update(options)` | Update toast content |

#### spark-toast-container Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | `"top-right"` | Position: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right |
| `max-visible` | number | `5` | Maximum toasts shown at once |
| `gap` | string | `"sm"` | Space between toasts: sm, md, lg |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-toast-show` | `{ id, type, message }` | Fired when toast appears |
| `spark-toast-dismiss` | `{ id, reason }` | Fired when toast dismissed (reason: auto, manual, limit) |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-toast-background` | (from type) | Toast background |
| `--spark-toast-color` | `--spark-white` | Toast text color |
| `--spark-toast-border-radius` | `--spark-radius-md` | Corner radius |
| `--spark-toast-shadow` | `--spark-shadow-lg` | Toast shadow |
| `--spark-toast-min-width` | `280px` | Minimum width |
| `--spark-toast-max-width` | `420px` | Maximum width |

### Type Styling

| Type | Background | Icon |
|------|------------|------|
| info | `--spark-info` | ℹ️ info circle |
| success | `--spark-success` | ✓ checkmark |
| warning | `--spark-warning` | ⚠️ warning triangle |
| error | `--spark-error` | ✕ error circle |

### Position Layout

```
┌─────────────────────────────────────────────┐
│ top-left      top-center        top-right  │
│                                             │
│                                             │
│                                             │
│                                             │
│ bottom-left  bottom-center   bottom-right  │
└─────────────────────────────────────────────┘
```

### Stacking Behavior

```
New toasts appear at edge:

top-right:          bottom-right:
┌───────┐           │
│ New   │           │
├───────┤           ├───────┤
│ Old   │           │ Old   │
├───────┤           ├───────┤
│ Older │           │ New   │
└───────┘           └───────┘
```

## User Stories

### Story 1: Show Success Feedback
**As a** user
**I want to** see confirmation when an action succeeds
**So that** I know my action was completed

**Acceptance Criteria:**
- [ ] SparkToast.success(message) shows green toast
- [ ] Toast appears with slide-in animation
- [ ] Toast auto-dismisses after duration
- [ ] Toast shows checkmark icon
- [ ] Screen reader announces the message

### Story 2: Show Error Feedback
**As a** user
**I want to** see clear error messages
**So that** I know something went wrong

**Acceptance Criteria:**
- [ ] SparkToast.error(message) shows red toast
- [ ] Error toasts have longer default duration (5s)
- [ ] Toast shows error icon
- [ ] Screen reader announces with assertive priority

### Story 3: Manual Dismiss
**As a** user
**I want to** dismiss a toast manually
**So that** I can clear my screen

**Acceptance Criteria:**
- [ ] Toast shows close button when dismissible is true
- [ ] Clicking close button dismisses toast
- [ ] spark-toast-dismiss fires with reason manual
- [ ] Toast slides out with animation

### Story 4: Toast Stacking
**As a** user
**I want to** see multiple toasts stacked neatly
**So that** I do not miss any messages

**Acceptance Criteria:**
- [ ] Multiple toasts stack vertically
- [ ] New toasts appear at container edge
- [ ] max-visible limit hides overflow (FIFO)
- [ ] Dismissed toast removal animates smoothly

### Story 5: Accessibility
**As a** screen reader user
**I want to** hear toast messages
**So that** I know about notifications

**Acceptance Criteria:**
- [ ] Toast container has aria-live region
- [ ] Info/success toasts use aria-live polite
- [ ] Error/warning toasts use aria-live assertive
- [ ] Toasts are announced without visual focus change
- [ ] Pause on hover stops auto-dismiss timer

### Story 6: Programmatic Control
**As a** developer
**I want to** control toasts via JavaScript
**So that** I can show feedback from anywhere

**Acceptance Criteria:**
- [ ] SparkToast.show returns toast instance
- [ ] toast.dismiss() removes specific toast
- [ ] toast.update() can change message/type
- [ ] SparkToast.dismissAll() clears all toasts
- [ ] Works without manually creating toast elements

## Technical Approach

### Architecture

```
spark-toast/
├── toast.js              # SparkToast class with static API
├── toast-container.js    # SparkToastContainer class
├── toast-item.js         # Individual toast element (internal)
└── toast.test.js         # Unit tests
```

### Component Structure

```javascript
// Static API for ease of use
class SparkToast {
  static container = null;
  
  static show(options) {
    if (!this.container) {
      this.container = document.querySelector('spark-toast-container')
        || this._createContainer();
    }
    return this.container.addToast(options);
  }
  
  static success(message) {
    return this.show({ message, type: 'success' });
  }
  
  // ... other methods
}

// Container manages toast lifecycle
class SparkToastContainer extends SparkElement {
  addToast(options) { /* ... */ }
  removeToast(id) { /* ... */ }
}
```

### Key Implementation Details

1. **Auto-creation** - Container created automatically if not in DOM
2. **Timer pause** - Hovering pauses auto-dismiss countdown
3. **FIFO overflow** - Oldest toasts dismissed when limit reached
4. **Animation** - CSS transitions for enter/exit
5. **Announce utility** - Uses `announce()` from utils for screen readers

### Dependencies

- Extends `SparkElement` from `src/core/base-component.js`
- Uses `announce()` from `src/core/utils.js`
- Uses `generateId()` from `src/core/utils.js`
- Uses design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No container in DOM | Auto-create container at body end |
| Container removed while toasts visible | Toasts removed with container |
| Duration 0 | Toast never auto-dismisses |
| Rapid successive toasts | Queue and show up to max-visible |
| Very long message | Text wraps, toast expands |
| HTML in message | Escaped (text only for security) |

## Out of Scope

- [ ] Action buttons in toasts (use modal for actions)
- [ ] Progress indicator in toast (future spec)
- [ ] Persistent/pinned toasts (use different component)
- [ ] Toast themes beyond type colors (use CSS)
- [ ] Undo action integration (app responsibility)

## Open Questions

- [x] ~~Support HTML content in messages?~~ **Decision:** No, text only for security
- [x] ~~Queue toasts beyond max-visible?~~ **Decision:** Yes, FIFO dismissal

## Implementation Tasks

| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| toast-001 | Toast container component | 1h | None |
| toast-002 | Toast item component | 1h | toast-001 |
| toast-003 | Toast static API | 1h | toast-002 |
| toast-004 | Toast auto-dismiss and stacking | 1h | toast-003 |
| toast-005 | Toast accessibility | 45m | toast-004 |

**Total Estimate:** 4.75 hours

See `docs/sprint.yaml` for full task details and status.

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


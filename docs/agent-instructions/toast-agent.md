# Agent Instructions: Toast Component

> **Repository:** https://github.com/RandyLedbetter/spark-ui
> **Branch:** `feature/toast-component`
> **Issue:** #4
> **Spec:** `docs/specs/toast-component.md`

## Your Mission

Implement the `<spark-toast>` Web Component and `SparkToast` programmatic API for notifications.

## Setup

```bash
git checkout feature/toast-component
```

## Shared Foundation

First, ensure you have the design tokens. Create `src/tokens/tokens.css` if it doesn't exist (see button-agent.md for full tokens).

## Tasks (Complete in Order)

### Task 1: toast-001 - Toast Container Management (~1h)

Create `src/components/toast/toast-container.js`:

Create a container system that:
- Lazily creates containers on first toast
- One container per position (6 total)
- Containers are fixed-positioned at corners/centers
- Uses flexbox for stacking toasts

**Positions:**
- top-left, top-center, top-right
- bottom-left, bottom-center, bottom-right (default)

**Container CSS:**
```css
.spark-toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1rem;
  pointer-events: none;
}

.spark-toast-container[data-position="top-left"] { top: 0; left: 0; }
.spark-toast-container[data-position="top-center"] { top: 0; left: 50%; transform: translateX(-50%); }
.spark-toast-container[data-position="top-right"] { top: 0; right: 0; }
.spark-toast-container[data-position="bottom-left"] { bottom: 0; left: 0; }
.spark-toast-container[data-position="bottom-center"] { bottom: 0; left: 50%; transform: translateX(-50%); }
.spark-toast-container[data-position="bottom-right"] { bottom: 0; right: 0; }
```

### Task 2: toast-002 - SparkToast Static API (~2h)

Create `src/components/toast/toast.js`:

```javascript
class SparkToast {
  static #toasts = new Map();
  static #containers = new Map();
  
  static show(options) {
    const id = crypto.randomUUID();
    const opts = {
      message: options.message,
      type: options.type || 'info',
      duration: options.duration ?? 4000,
      position: options.position || 'bottom-right',
      dismissible: options.dismissible ?? true,
      action: options.action || null
    };
    
    // Create toast element, add to container
    // Set up auto-dismiss timer if duration > 0
    return id;
  }
  
  static success(message) { 
    return this.show({ message, type: 'success' }); 
  }
  
  static error(message) { 
    return this.show({ message, type: 'error', duration: 0 }); 
  }
  
  static warning(message) { 
    return this.show({ message, type: 'warning' }); 
  }
  
  static info(message) { 
    return this.show({ message, type: 'info' }); 
  }
  
  static dismiss(id) { /* Remove specific toast */ }
  static dismissAll() { /* Clear all toasts */ }
}

window.SparkToast = SparkToast;
```

### Task 3: toast-003 - Style Types and Icons (~1h)

**Toast Structure:**
```html
<div class="spark-toast" role="alert" aria-live="polite">
  <span class="toast-icon"><!-- SVG --></span>
  <span class="toast-message">Message text</span>
  <button class="toast-action">Action</button>
  <button class="toast-close" aria-label="Dismiss">×</button>
</div>
```

**Type Colors:**
- Success: #22c55e (checkmark icon ✓)
- Error: #ef4444 (X icon ✗)
- Warning: #f59e0b (warning icon ⚠)
- Info: #6366f1 (info icon ℹ)

**Base Style:**
- Background: #1e293b (dark)
- Text: white
- Border-radius: var(--spark-radius-md)
- Shadow: var(--spark-shadow-lg)
- Colored left border or icon background for type

### Task 4: toast-004 - Stacking and Auto-dismiss (~2h)

**Stacking:**
- Multiple toasts stack vertically with 8px gap
- For bottom positions: newest on top (flex-direction: column-reverse)
- For top positions: newest on bottom (flex-direction: column)
- Max 5 visible toasts (dismiss oldest when exceeded)

**Auto-dismiss:**
- Default duration: 4000ms
- Error toasts: no auto-dismiss (duration: 0)
- Clear timer on manual dismiss
- Use setTimeout for timer

**Stack Reflow:**
- When toast dismissed, others animate to fill gap
- Use CSS transitions on transform/opacity

### Task 5: toast-005 - Action Button and Accessibility (~1h)

**Action Button:**
- Rendered when `action` option provided
- Clicking fires `action.onClick` callback
- Toast dismisses after action clicked
- Fire `spark-toast-action` event

**Events:**
- `spark-toast-show` - detail: `{ id }`
- `spark-toast-dismiss` - detail: `{ id, trigger: 'auto'|'button'|'action'|'api' }`
- `spark-toast-action` - detail: `{ id }`

**Accessibility:**
- `role="alert"` on toast
- `aria-live="polite"` for info/success/warning
- `aria-live="assertive"` for errors
- `aria-label="Dismiss notification"` on close button
- `pointer-events: auto` on toast (container is none)

### Task 6: toast-006 - Animations (~1h)

**Enter Animation:**
- Slide in from edge (based on position)
- Fade in (opacity 0→1)
- Duration: 300ms ease-out

**Exit Animation:**
- Slide out to edge
- Fade out (opacity 1→0)
- Duration: 200ms ease-in

**Stack Transition:**
- Smooth position changes when toasts removed
- Use CSS transition on transform

**Implementation:**
```css
.spark-toast {
  transition: transform 200ms ease, opacity 200ms ease;
}

.spark-toast.entering {
  opacity: 0;
  transform: translateX(100%); /* for right positions */
}

.spark-toast.exiting {
  opacity: 0;
  transform: translateX(100%);
}
```

## Acceptance Criteria

- [ ] `SparkToast.success('message')` shows green toast
- [ ] `SparkToast.error('message')` shows red toast (no auto-dismiss)
- [ ] `SparkToast.warning('message')` shows yellow toast
- [ ] `SparkToast.info('message')` shows blue toast
- [ ] Each type has correct icon
- [ ] Toasts auto-dismiss after duration
- [ ] Multiple toasts stack with 8px gap
- [ ] Max 5 visible toasts
- [ ] Action button works and dismisses toast
- [ ] Close button dismisses toast
- [ ] All 6 positions work
- [ ] Smooth enter/exit animations
- [ ] Proper ARIA attributes

## When Complete

1. Commit all changes with message: `feat(toast): implement spark-toast component`
2. Push to `feature/toast-component`
3. Create PR targeting `master` with title: `feat: Add spark-toast component`
4. Reference Issue #4 in PR description

## Resources

- Full spec: `docs/specs/toast-component.md`


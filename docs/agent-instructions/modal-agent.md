# Agent Instructions: Modal Component

> **Repository:** https://github.com/RandyLedbetter/spark-ui
> **Branch:** `feature/modal-component`
> **Issue:** #3
> **Spec:** `docs/specs/modal-component.md`

## Your Mission

Implement the `<spark-modal>` Web Component with focus trapping, keyboard navigation, and full accessibility support.

## Setup

```bash
git checkout feature/modal-component
```

## Shared Foundation

First, ensure you have the design tokens. Create `src/tokens/tokens.css` if it doesn't exist (see button-agent.md for full tokens).

## Tasks (Complete in Order)

### Task 1: modal-001 - Create SparkModal Structure (~2h)

Create `src/components/modal/modal.js`:

**Observed Attributes:**
- `open`: boolean (reflects open state)
- `size`: sm (400px), md (500px, default), lg (700px), xl (900px), full
- `close-on-backdrop`: boolean (default true)
- `close-on-escape`: boolean (default true)
- `no-close-button`: boolean (hides X button)

**Public Methods:**
- `open()` - Opens the modal
- `close()` - Closes the modal
- `toggle()` - Toggles open state

**Shadow DOM:**
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

Modal hidden by default (display: none or opacity: 0).

### Task 2: modal-002 - Create Sub-components (~1h)

**`src/components/modal/modal-header.js`**
- Simple slot wrapper with styling
- Used for `aria-labelledby` reference

**`src/components/modal/modal-body.js`**
- Scrollable content area (overflow-y: auto when content overflows)
- flex-grow: 1 to fill available space

**`src/components/modal/modal-footer.js`**
- Flex container for action buttons
- Typically right-aligned (justify-content: flex-end)

### Task 3: modal-003 - Close Triggers and Events (~2h)

Implement all close methods:

1. **X Button:** Click closes modal (`trigger: 'button'`)
2. **Backdrop:** Click backdrop closes (if `close-on-backdrop` true) (`trigger: 'backdrop'`)
3. **Escape Key:** Press Escape closes (if `close-on-escape` true) (`trigger: 'escape'`)
4. **data-close:** Any element with `data-close` attribute closes on click
5. **API:** `close()` method (`trigger: 'api'`)

**Events:**
- `spark-modal-open` - Fired when modal opens
- `spark-modal-close` - Fired when modal closes, detail: `{ trigger: string }`

### Task 4: modal-004 - Focus Trapping and Scroll Lock (~2h)

**Focus Trapping:**
1. On open: Store `document.activeElement` as return target
2. Move focus to first focusable element inside modal
3. Query focusable elements: `button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`
4. On Tab at last element → focus first element
5. On Shift+Tab at first element → focus last element
6. On close: Return focus to stored element

**Scroll Lock:**
1. On open: Store `document.body.style.overflow`, set to 'hidden'
2. On close: Restore original overflow value
3. Handle padding-right to prevent layout shift from scrollbar

**ARIA:**
- `role="dialog"` on container
- `aria-modal="true"` on container
- `aria-labelledby` pointing to header ID (generate if needed)

### Task 5: modal-005 - Sizes and Animations (~1h)

**Size CSS:**
```css
.modal-container[data-size="sm"] { max-width: 400px; }
.modal-container[data-size="md"] { max-width: 500px; }
.modal-container[data-size="lg"] { max-width: 700px; }
.modal-container[data-size="xl"] { max-width: 900px; }
.modal-container[data-size="full"] { 
  max-width: calc(100vw - 2rem);
  max-height: 90vh;
}
```

**Animations:**
- Open: Backdrop fades in (0→1 opacity, 200ms), container scales up (0.95→1) + fades in
- Close: Reverse animation

## Acceptance Criteria

- [ ] Modal hidden by default
- [ ] `modal.open()` shows modal with backdrop
- [ ] `modal.close()` hides modal
- [ ] X button closes modal
- [ ] Clicking backdrop closes modal (when enabled)
- [ ] Escape key closes modal (when enabled)
- [ ] `data-close` elements close modal
- [ ] Events fire correctly with trigger detail
- [ ] Focus trapped within modal
- [ ] Focus returns to trigger on close
- [ ] Body scroll locked when open
- [ ] All 5 sizes work correctly
- [ ] Open/close animations smooth
- [ ] ARIA attributes correct

## When Complete

1. Commit all changes with message: `feat(modal): implement spark-modal component`
2. Push to `feature/modal-component`
3. Create PR targeting `master` with title: `feat: Add spark-modal component`
4. Reference Issue #3 in PR description

## Resources

- Full spec: `docs/specs/modal-component.md`


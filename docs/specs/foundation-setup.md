# Feature Specification: Foundation Setup

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04

## Overview

Establish the shared foundation that all Spark UI components depend on: project structure, design tokens, base component class, and testing infrastructure. This must be completed before any components can be developed.

## Problem Statement

### The Problem
The 4 MVP components (Button, Card, Modal, Toast) all share common dependencies:
- CSS design tokens for consistent theming
- Base class for Web Component patterns
- Project build configuration
- Testing utilities

Without a shared foundation, parallel development would result in:
- Duplicated code across components
- Inconsistent implementations
- Merge conflicts when integrating

### Current State
No project structure exists yet. We need to create everything from scratch.

### Impact
**Blocking:** All component development is blocked until this foundation exists. This is the critical path item.

## Proposed Solution

### Project Structure

```
spark-ui/
├── src/
│   ├── components/           # Component implementations (empty for now)
│   │   ├── button/
│   │   ├── card/
│   │   ├── modal/
│   │   └── toast/
│   ├── core/
│   │   ├── base-component.js # Base class for all components
│   │   └── utils.js          # Shared utilities
│   ├── tokens/
│   │   └── tokens.css        # Design tokens (CSS custom properties)
│   └── index.js              # Main entry point
├── tests/
│   └── setup.js              # Test configuration
├── package.json
├── vite.config.js
└── README.md
```

### Design Tokens (`src/tokens/tokens.css`)

```css
:root {
  /* Colors */
  --spark-primary: #6366f1;
  --spark-primary-hover: #4f46e5;
  --spark-primary-active: #4338ca;
  --spark-secondary: #64748b;
  --spark-secondary-hover: #475569;
  --spark-success: #22c55e;
  --spark-warning: #f59e0b;
  --spark-error: #ef4444;
  --spark-info: #3b82f6;
  
  /* Neutral Colors */
  --spark-white: #ffffff;
  --spark-gray-50: #f8fafc;
  --spark-gray-100: #f1f5f9;
  --spark-gray-200: #e2e8f0;
  --spark-gray-300: #cbd5e1;
  --spark-gray-400: #94a3b8;
  --spark-gray-500: #64748b;
  --spark-gray-600: #475569;
  --spark-gray-700: #334155;
  --spark-gray-800: #1e293b;
  --spark-gray-900: #0f172a;
  --spark-black: #000000;
  
  /* Typography */
  --spark-font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --spark-font-size-xs: 0.75rem;
  --spark-font-size-sm: 0.875rem;
  --spark-font-size-md: 1rem;
  --spark-font-size-lg: 1.125rem;
  --spark-font-size-xl: 1.25rem;
  --spark-font-weight-normal: 400;
  --spark-font-weight-medium: 500;
  --spark-font-weight-semibold: 600;
  --spark-font-weight-bold: 700;
  --spark-line-height-tight: 1.25;
  --spark-line-height-normal: 1.5;
  
  /* Spacing */
  --spark-spacing-xs: 0.25rem;
  --spark-spacing-sm: 0.5rem;
  --spark-spacing-md: 1rem;
  --spark-spacing-lg: 1.5rem;
  --spark-spacing-xl: 2rem;
  --spark-spacing-2xl: 3rem;
  
  /* Border Radius */
  --spark-radius-none: 0;
  --spark-radius-sm: 0.25rem;
  --spark-radius-md: 0.375rem;
  --spark-radius-lg: 0.5rem;
  --spark-radius-xl: 0.75rem;
  --spark-radius-full: 9999px;
  
  /* Shadows */
  --spark-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --spark-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --spark-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --spark-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --spark-transition-fast: 150ms ease;
  --spark-transition-normal: 200ms ease;
  --spark-transition-slow: 300ms ease;
  
  /* Z-Index Scale */
  --spark-z-dropdown: 1000;
  --spark-z-modal: 1100;
  --spark-z-toast: 1200;
}
```

### Base Component Class (`src/core/base-component.js`)

```javascript
/**
 * Base class for all Spark UI components.
 * Provides common patterns for Shadow DOM, attributes, and events.
 */
export class SparkElement extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  /**
   * Override in subclass to return component HTML
   */
  get template() {
    return '';
  }

  /**
   * Override in subclass to return component styles
   */
  get styles() {
    return '';
  }

  /**
   * Renders the component's Shadow DOM
   */
  render() {
    const tokensLink = `<link rel="stylesheet" href="/src/tokens/tokens.css">`;
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      ${this.template}
    `;
  }

  /**
   * Emits a custom event from the component
   */
  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail
    }));
  }

  /**
   * Gets a boolean attribute value
   */
  getBooleanAttribute(name) {
    return this.hasAttribute(name);
  }

  /**
   * Sets a boolean attribute
   */
  setBooleanAttribute(name, value) {
    if (value) {
      this.setAttribute(name, '');
    } else {
      this.removeAttribute(name);
    }
  }
}
```

### Utilities (`src/core/utils.js`)

```javascript
/**
 * Generates a unique ID for accessibility purposes
 */
export function generateId(prefix = 'spark') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Traps focus within an element (for modals)
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleKeydown);
  return () => element.removeEventListener('keydown', handleKeydown);
}

/**
 * Announces a message to screen readers
 */
export function announce(message, priority = 'polite') {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);';
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);

  setTimeout(() => {
    announcer.remove();
  }, 1000);
}
```

## User Stories

### Story 1: Project Initialization
**As a** developer cloning the repo
**I want to** run `npm install && npm run dev`
**So that** I can start developing immediately

**Acceptance Criteria:**
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts Vite dev server
- [ ] Browser opens to a test page showing design tokens

### Story 2: Creating a New Component
**As a** developer creating a new component
**I want to** extend `SparkElement` base class
**So that** I get Shadow DOM, attribute handling, and events for free

**Acceptance Criteria:**
- [ ] `SparkElement` can be imported from `src/core/base-component.js`
- [ ] Extending class gets Shadow DOM automatically
- [ ] `attributeChangedCallback` triggers re-render
- [ ] `emit()` method dispatches composed custom events

### Story 3: Consistent Theming
**As a** developer styling a component
**I want to** use CSS custom properties from tokens
**So that** all components have consistent styling

**Acceptance Criteria:**
- [ ] All color tokens are defined in `tokens.css`
- [ ] All spacing tokens are defined
- [ ] All typography tokens are defined
- [ ] Tokens can be overridden by consumers

## Technical Approach

### Architecture

```
┌─────────────────────────────────────────┐
│              Consumer App               │
├─────────────────────────────────────────┤
│  <spark-button>  <spark-card>  etc.     │
├─────────────────────────────────────────┤
│           SparkElement (base)           │
│    Shadow DOM │ Attributes │ Events     │
├─────────────────────────────────────────┤
│              Design Tokens              │
│    CSS Custom Properties (themeable)    │
└─────────────────────────────────────────┘
```

### Key Components

- **SparkElement:** Base class all components extend
- **tokens.css:** CSS custom properties for theming
- **utils.js:** Shared accessibility and DOM utilities

### Dependencies

**Runtime:** None (zero dependencies)

**Development:**
- `vite` - Dev server and build tool
- `vitest` - Testing framework

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Consumer overrides CSS token | Component uses consumer's value |
| Component used before tokens loaded | Graceful fallback to browser defaults |
| Shadow DOM not supported | Modern browsers only; no polyfill |

## Out of Scope

- [ ] IE11 support
- [ ] CSS-in-JS alternatives
- [ ] Build output formats (ESM only for MVP)
- [ ] CDN distribution
- [ ] TypeScript (vanilla JS for simplicity)

## Open Questions

- [x] ~~Should we use TypeScript?~~ **Decision:** No, vanilla JS for simplicity
- [x] ~~Include reset/normalize CSS?~~ **Decision:** No, components use Shadow DOM isolation

## Implementation Tasks

| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| task-001 | Project scaffolding | 1h | None |
| task-002 | Design tokens CSS | 1h | task-001 |
| task-003 | Base component class | 1h | task-001 |
| task-004 | Utility functions | 1h | task-001 |
| task-005 | Demo page and verification | 2h | task-002, task-003, task-004 |

**Total Estimate:** 6 hours

**Parallelization:** Tasks 002, 003, 004 can run in parallel after task-001.

See `docs/sprint.yaml` for full task details and status.

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


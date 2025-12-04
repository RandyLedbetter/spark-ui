# Feature Specification: Foundation Setup

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04
> **Blocks:** button-component, card-component, modal-component, toast-component

## Overview

Establish the foundational project structure, design tokens, and base component utilities that all Spark UI components depend on. This must be completed before any component work can begin.

## Problem Statement

### The Problem
Components cannot be built without shared infrastructure: design tokens for consistent styling, a base class for common functionality, and proper project structure.

### Current State
No project structure exists. Starting component development without foundation would result in:
- Inconsistent styling (each component defining its own colors, spacing)
- Duplicated code (each component implementing Shadow DOM setup)
- No shared build/dev tooling

### Impact
This is a **blocker** for all component work. Completing this first enables 4 parallel component streams.

## Proposed Solution

### Project Structure

```
spark-ui/
├── src/
│   ├── components/           # Individual component folders go here
│   │   └── .gitkeep
│   ├── core/
│   │   └── spark-element.js  # Base class for all components
│   ├── tokens/
│   │   └── tokens.css        # Design tokens (CSS custom properties)
│   └── index.js              # Main entry - exports all components
├── package.json
├── vite.config.js            # Dev server configuration
└── README.md
```

### Design Tokens (tokens.css)

All CSS custom properties from the design system:

```css
:root {
  /* Colors */
  --spark-primary: #6366f1;
  --spark-primary-hover: #4f46e5;
  --spark-secondary: #64748b;
  --spark-secondary-hover: #475569;
  --spark-success: #22c55e;
  --spark-warning: #f59e0b;
  --spark-error: #ef4444;
  --spark-background: #ffffff;
  --spark-surface: #f8fafc;
  --spark-text: #1e293b;
  --spark-text-muted: #64748b;
  --spark-border: #e2e8f0;
  
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
  --spark-line-height: 1.5;
  
  /* Spacing */
  --spark-spacing-xs: 0.25rem;
  --spark-spacing-sm: 0.5rem;
  --spark-spacing-md: 1rem;
  --spark-spacing-lg: 1.5rem;
  --spark-spacing-xl: 2rem;
  --spark-spacing-2xl: 3rem;
  
  /* Border Radius */
  --spark-radius-sm: 0.25rem;
  --spark-radius-md: 0.5rem;
  --spark-radius-lg: 1rem;
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

### Base Component Class (spark-element.js)

```javascript
/**
 * SparkElement - Base class for all Spark UI components
 * Provides Shadow DOM setup, token injection, and common utilities
 */
export class SparkElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Inject design tokens into Shadow DOM
   */
  injectTokens() {
    const tokenLink = document.createElement('link');
    tokenLink.rel = 'stylesheet';
    tokenLink.href = new URL('../tokens/tokens.css', import.meta.url).href;
    this.shadowRoot.prepend(tokenLink);
  }

  /**
   * Inject component-specific styles
   */
  injectStyles(css) {
    const style = document.createElement('style');
    style.textContent = css;
    this.shadowRoot.appendChild(style);
  }

  /**
   * Render HTML template to Shadow DOM
   */
  render(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Dispatch custom event with detail
   */
  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Get attribute with default value
   */
  getAttr(name, defaultValue = '') {
    return this.getAttribute(name) ?? defaultValue;
  }

  /**
   * Check if attribute exists (boolean attributes)
   */
  hasAttr(name) {
    return this.hasAttribute(name);
  }
}
```

## User Stories

### Story 1: Project Initialization
**As a** developer
**I want to** clone/init the project and have it ready to develop
**So that** I can start building components immediately

**Acceptance Criteria:**
- [ ] `npm install` installs all dependencies
- [ ] `npm run dev` starts dev server with hot reload
- [ ] Project structure matches specification

### Story 2: Design Token Access
**As a** component developer  
**I want to** use design tokens in my component styles
**So that** styling is consistent across all components

**Acceptance Criteria:**
- [ ] Tokens CSS file contains all specified custom properties
- [ ] Tokens can be imported/used in Shadow DOM
- [ ] Changing a token value updates all components

### Story 3: Base Class Usage
**As a** component developer
**I want to** extend SparkElement for my component
**So that** I get Shadow DOM, tokens, and utilities for free

**Acceptance Criteria:**
- [ ] `SparkElement` class is importable
- [ ] Shadow DOM is automatically attached
- [ ] Helper methods work (injectStyles, render, emit)

## Technical Approach

### Architecture
- Pure ES modules (no build step required for consumers)
- Vite for development server and optional bundling
- CSS custom properties for theming (runtime customizable)

### Key Files

| File | Purpose |
|------|---------|
| `src/tokens/tokens.css` | Design tokens as CSS custom properties |
| `src/core/spark-element.js` | Base class for components |
| `src/index.js` | Main entry point, exports components |
| `package.json` | Dependencies, scripts, metadata |
| `vite.config.js` | Dev server, build config |

### Dependencies

```json
{
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

No runtime dependencies - zero-dependency library.

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Consumer doesn't import tokens.css | Components still work, use browser defaults |
| Browser doesn't support CSS custom properties | Fallback values in components |
| ES modules not supported | Document browser requirements (modern browsers) |

## Out of Scope

- [ ] Testing infrastructure (add per-component or separate spec)
- [ ] CI/CD setup
- [ ] Documentation site / Storybook
- [ ] TypeScript definitions (can add later)
- [ ] NPM publishing configuration

## Open Questions

- [x] Use Vite or no build step? → Vite for dev, but library works without bundler
- [x] TypeScript? → No, vanilla JS for simplicity. Can add .d.ts later

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


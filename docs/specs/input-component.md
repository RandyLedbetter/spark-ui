# Feature Specification: Input Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-input>` component is an accessible form input Web Component that provides labeled text fields with built-in validation states, helper text, and error messaging. It wraps the native input element with enhanced styling and accessibility features.

## Problem Statement

### The Problem
Form inputs require significant boilerplate:
- Label association (for/id attributes)
- Error message display and announcement
- Consistent styling across states
- Helper text placement
- Icon integration

Developers repeatedly solve these problems inconsistently.

### Current State
Developers either use unstyled native inputs, write custom form components per project, or adopt heavy framework-specific form libraries.

### Impact
Forms are critical to most applications. A well-designed input component improves:
- Accessibility (proper labeling, error announcements)
- User experience (clear states, helpful messaging)
- Developer productivity (consistent API)

## Proposed Solution

### User Experience

```html
<spark-input 
  label="Email" 
  type="email" 
  placeholder="you@example.com"
  required>
</spark-input>

<spark-input 
  label="Password" 
  type="password" 
  helper="At least 8 characters"
  error="Password is too short">
</spark-input>

<spark-input 
  label="Search"
  type="search"
  icon="search">
</spark-input>

<spark-input 
  label="Disabled Field"
  value="Cannot edit"
  disabled>
</spark-input>
```

### Visual Design

```
┌─────────────────────────────────────────┐
│  Label *                                │
│  ┌───────────────────────────────────┐  │
│  │ Placeholder text                  │  │
│  └───────────────────────────────────┘  │
│  Helper text appears here               │
└─────────────────────────────────────────┘

States:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Default    │  │   Focus     │  │   Error     │
│  ─────────  │  │  ═════════  │  │  ~~~~~~~~~  │
│             │  │  (blue)     │  │  (red)      │
└─────────────┘  └─────────────┘  └─────────────┘

With Icon:
┌───────────────────────────────────────┐
│ 🔍 │ Search...                        │
└───────────────────────────────────────┘
```

## User Stories

### Story 1: Labeled Input Field
**As a** developer
**I want to** create an input with an associated label
**So that** the field is accessible and clearly identified

**Acceptance Criteria:**
- [ ] Given `label="Email"`, when rendered, then label text appears above input
- [ ] Given a label, when rendered, then clicking label focuses the input
- [ ] Given a label, when rendered, then label is programmatically associated (aria)

### Story 2: Input Types
**As a** developer
**I want to** use different input types
**So that** I get appropriate browser behavior and mobile keyboards

**Acceptance Criteria:**
- [ ] Given `type="text"` (default), when rendered, then standard text input
- [ ] Given `type="email"`, when rendered, then email validation and keyboard
- [ ] Given `type="password"`, when rendered, then input is masked
- [ ] Given `type="number"`, when rendered, then numeric input with stepper
- [ ] Given `type="search"`, when rendered, then search input with clear button

### Story 3: Error State
**As a** developer
**I want to** display validation errors
**So that** users know how to fix invalid input

**Acceptance Criteria:**
- [ ] Given `error="message"`, when rendered, then error message appears below input
- [ ] Given error attribute, when rendered, then input has error styling (red border)
- [ ] Given error attribute, when rendered, then error is announced to screen readers
- [ ] Given error removed, when re-rendered, then error styling and message disappear

### Story 4: Helper Text
**As a** developer
**I want to** provide hint text
**So that** users understand input requirements

**Acceptance Criteria:**
- [ ] Given `helper="text"`, when rendered, then helper appears below input
- [ ] Given both helper and error, when rendered, then error takes precedence
- [ ] Given helper text, when rendered, then it's associated via aria-describedby

### Story 5: Disabled State
**As a** developer
**I want to** disable inputs
**So that** users cannot modify certain fields

**Acceptance Criteria:**
- [ ] Given `disabled`, when rendered, then input appears muted
- [ ] Given `disabled`, when user tries to type, then input does not change
- [ ] Given `disabled`, when form submits, then value is not included

### Story 6: Required Field
**As a** developer
**I want to** mark fields as required
**So that** users know which fields must be filled

**Acceptance Criteria:**
- [ ] Given `required`, when rendered, then visual indicator appears (asterisk)
- [ ] Given `required`, when form submits without value, then browser validation triggers
- [ ] Given `required`, when rendered, then aria-required is set

### Story 7: Keyboard Accessibility
**As a** keyboard user
**I want to** navigate and fill inputs with keyboard
**So that** I can complete forms without a mouse

**Acceptance Criteria:**
- [ ] Given an input, when I press Tab, then input receives focus with visible indicator
- [ ] Given a focused input, when I type, then characters appear
- [ ] Given error state, when input receives focus, then error is announced

## Technical Approach

### Architecture

```
spark-input (Custom Element)
├── Shadow Root
│   ├── <style>
│   └── <div class="input-wrapper">
│       ├── <label>
│       │   └── <slot name="label"> / attribute text
│       ├── <div class="input-container">
│       │   ├── <span class="icon"> (conditional)
│       │   └── <input>
│       └── <div class="message">
│           └── helper text or error message
```

### Key Components

- **SparkInput class:** Manages attributes, validation state, value binding
- **Internal input:** Native `<input>` element for form compatibility
- **Label:** Properly associated via generated ID
- **Message area:** Shows helper or error text

### Attributes/Properties

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | string | `""` | Label text |
| `type` | string | `"text"` | Input type |
| `placeholder` | string | `""` | Placeholder text |
| `value` | string | `""` | Input value |
| `helper` | string | `""` | Helper text |
| `error` | string | `""` | Error message |
| `disabled` | boolean | `false` | Disabled state |
| `required` | boolean | `false` | Required field |
| `icon` | string | `""` | Icon name (left position) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value }` | Fires on each keystroke |
| `change` | `{ value }` | Fires on blur after change |

### CSS Custom Properties

```css
--spark-input-border: 1px solid var(--spark-secondary);
--spark-input-border-focus: var(--spark-primary);
--spark-input-border-error: var(--spark-error);
--spark-input-radius: var(--spark-radius-md);
--spark-input-padding: var(--spark-spacing-sm) var(--spark-spacing-md);
--spark-input-font-size: var(--spark-font-size-md);
--spark-input-label-color: var(--spark-secondary);
--spark-input-error-color: var(--spark-error);
```

### File Structure

```
src/components/input/
├── input.js        # Web Component definition
├── input.css       # Component styles
└── input.test.js   # Unit tests
```

### Dependencies

- None (zero runtime dependencies)
- Uses global design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No label provided | Input renders without label (not recommended) |
| Very long error message | Text wraps to multiple lines |
| Value set programmatically | Input updates, no change event fires |
| Type changed dynamically | Input type updates, value preserved if compatible |
| Both helper and error set | Error displays, helper hidden |
| Empty string error | No error state (error only triggers on non-empty) |

## Out of Scope

- [ ] Textarea (separate component)
- [ ] Select/dropdown (separate component)
- [ ] Input masking (phone, credit card)
- [ ] Autocomplete/suggestions
- [ ] File input
- [ ] Form-level validation orchestration

## Open Questions

- [x] Should we expose native input for form submission? → **Yes, via formAssociated API**
- [x] Support for left and right icons? → **Left icon only for MVP, simplicity**

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial specification |


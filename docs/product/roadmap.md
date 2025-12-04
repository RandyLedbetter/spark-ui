# Product Roadmap - Spark UI

> Last Updated: 2025-12-04

## Overview

Spark UI delivers a lightweight, accessible component library in phases. Development follows a **foundation-first** approach: shared infrastructure must be built before components can be developed in parallel.

---

## Phase 1: Foundation (Sequential - REQUIRED FIRST)

> ⚠️ **Must complete before parallelization.** All components depend on this foundation.

| Feature | Status | Spec | Blocks |
|---------|--------|------|--------|
| Foundation Setup | 📋 Planned | `foundation-setup` | All components |

### Foundation Includes:
- Project structure (`package.json`, Vite config)
- Design tokens (`tokens.css` - colors, spacing, typography, shadows)
- Base component class (Shadow DOM setup, attribute handling)
- Testing infrastructure (test utilities, accessibility helpers)

---

## Phase 2: MVP Components (Parallel via `/orchestrate`)

> ✅ **Parallelizable** - Once foundation is complete, all 4 components can be built simultaneously.

| Feature | Status | Parallelizable | Depends On |
|---------|--------|----------------|------------|
| Button Component | 📋 Planned | ✅ Yes | Foundation |
| Card Component | 📋 Planned | ✅ Yes | Foundation |
| Modal Component | 📋 Planned | ✅ Yes | Foundation |
| Toast Component | 📋 Planned | ✅ Yes | Foundation |

### Component Details

#### 1. Button (`button-component`)
- **Variants:** primary, secondary, outline, ghost, danger
- **Sizes:** small, medium, large
- **States:** default, hover, active, disabled, loading
- **Accessibility:** Full keyboard support, ARIA labels

#### 2. Card (`card-component`)
- **Structure:** header, body, footer slots
- **Features:** elevation levels, clickable variant
- **Accessibility:** Semantic structure, focus states for interactive cards

#### 3. Modal (`modal-component`)
- **Features:** backdrop, close button, escape to close, focus trap
- **Sizes:** small, medium, large, full
- **Accessibility:** Focus trap, ARIA roles, return focus on close

#### 4. Toast (`toast-component`)
- **Types:** info, success, warning, error
- **Features:** auto-dismiss, manual close, position options, stacking
- **Accessibility:** ARIA live regions, pause on hover

---

## Development Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: Foundation (Sequential)                           │
│  /write-spec foundation-setup → /implement                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: Components (Parallel via /orchestrate)            │
│                                                             │
│    Button ─┐                                                │
│    Card ───┼─→ All developed simultaneously                 │
│    Modal ──┤                                                │
│    Toast ──┘                                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: Documentation & Polish                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: Post-MVP - Form Components

| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| Input | High | Medium | Text input with label, validation, error states |
| Dropdown | High | High | Select menu with search, keyboard navigation |
| Checkbox | Medium | Low | With indeterminate state |
| Radio | Medium | Low | Radio group with fieldset |

---

## Later (Backlog) - Enhancement Components

| Feature | Notes |
|---------|-------|
| Avatar | User avatar with image, initials, status indicator |
| Tabs | Tab navigation with keyboard support |
| Tooltip | Hover tooltips with positioning |
| Badge | Status badges and counters |
| Progress | Progress bars and spinners |
| Accordion | Collapsible content sections |

---

## Icebox

| Feature | Reason |
|---------|--------|
| Data Table | Too complex for initial scope; consider post-v1 |
| Date Picker | Requires significant accessibility work |
| Rich Text Editor | Out of scope for a component library |
| Framework Wrappers | Web Components work natively; wrappers not needed |

---

## Prioritization Criteria

We prioritize based on:

1. **Dependencies** - Foundation must come first
2. **Independence** - Can it be built in parallel? (MVP priority)
3. **User Impact** - How commonly needed is this component?
4. **Accessibility Complexity** - How much ARIA work is required?

---

## Remote Repository

- **GitHub:** https://github.com/RandyLedbetter/spark-ui.git
- **Strategy:** Feature branches per component, PR-based review

---

*Roadmap updated via `/plan-product` workflow.*

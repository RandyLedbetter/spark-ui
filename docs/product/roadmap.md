# Product Roadmap - Spark UI

> Last Updated: 2025-12-04

## Overview

Spark UI is designed for **parallel development**. All MVP components are independent and can be built simultaneously using Cloud Agents via `/orchestrate`.

---

## Now (Sprint 1 - MVP)

These 4 core components can be developed in parallel:

| Component | Status | Parallelizable | Spec |
|-----------|--------|----------------|------|
| `spark-button` | 📋 Planned | ✅ Yes | `button-component` |
| `spark-card` | 📋 Planned | ✅ Yes | `card-component` |
| `spark-modal` | 📋 Planned | ✅ Yes | `modal-component` |
| `spark-toast` | 📋 Planned | ✅ Yes | `toast-component` |

### Component Details

#### Button Component
- **Variants:** primary, secondary, outline, ghost, danger
- **Sizes:** small, medium, large
- **States:** default, hover, active, disabled, loading

#### Card Component  
- **Slots:** header, body, footer
- **Features:** elevation levels, clickable variant

#### Modal Component
- **Features:** backdrop, close button, escape to close, focus trap, size variants

#### Toast Component
- **Types:** info, success, warning, error
- **Features:** auto-dismiss, manual close, position options, stacking

---

## Next (Sprint 2 - Form Components)

| Feature | Priority | Complexity | Dependencies |
|---------|----------|------------|--------------|
| `spark-input` | High | Medium | Button (for clear button) |
| `spark-dropdown` | High | High | None |
| `spark-checkbox` | Medium | Low | None |
| `spark-radio` | Medium | Low | None |

---

## Later (Backlog)

| Feature | Notes |
|---------|-------|
| `spark-avatar` | User avatar with image, initials, status indicator |
| `spark-tabs` | Tab navigation component |
| `spark-tooltip` | Hover tooltips with positioning |
| `spark-badge` | Status badges and labels |
| `spark-progress` | Progress bars and spinners |
| `spark-accordion` | Collapsible content sections |

---

## Icebox

| Feature | Reason |
|---------|--------|
| Data Table | Too complex for MVP, requires compound component patterns |
| Date Picker | Calendar logic is complex, defer to later |
| Rich Text Editor | Out of scope for component library |
| Framework Wrappers | Focus on Web Components first |

---

## Technical Foundation

Before components can be built, establish:

| Item | Status | Notes |
|------|--------|-------|
| Project structure | 📋 Planned | `src/components/`, `src/tokens/` |
| Design tokens CSS | 📋 Planned | `tokens.css` with CSS custom properties |
| Base component class | 📋 Planned | Shared utilities for all components |
| Dev server setup | 📋 Planned | Vite for development, optional |
| Test infrastructure | 📋 Planned | Web Test Runner or Vitest |

---

## Prioritization Criteria

We prioritize based on:
1. **Independence** - Can it be built in parallel with other components?
2. **User Value** - How commonly is this component needed?
3. **Complexity** - Can it be built within component size limits (<5KB)?
4. **Accessibility Impact** - How critical is proper a11y implementation?

---

## How to Build This Roadmap

### Parallel Development (Recommended)
```
/shape-spec → /write-spec × 4 → /create-tasks × 4 → /orchestrate
```
4 Cloud Agents build all components simultaneously, creating 4 PRs.

### Sequential Development
```
/shape-spec → /write-spec → /create-tasks → /implement
```
Build one component at a time.

---

*Roadmap established via `/plan-product` workflow*

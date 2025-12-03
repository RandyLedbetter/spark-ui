# Product Roadmap - Spark UI

> Last Updated: 2025-12-03

## Overview

This roadmap outlines the planned features and their priorities. Spark UI uses Web Components for framework-agnostic UI development.

## Now (Current Sprint)

**MVP: Core Components**

| Component | Status | Spec | Notes |
|-----------|--------|------|-------|
| Button | 🟡 Not Started | `button-component` | Variants, sizes, loading states |
| Card | 🟡 Not Started | `card-component` | Header/body/footer slots |
| Modal | 🟡 Not Started | `modal-component` | Focus trap, backdrop, keyboard nav |
| Toast | 🟡 Not Started | `toast-component` | Stacking, auto-dismiss, positions |

## Next (Post-MVP)

| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| Input | High | Medium | Text, email, password, validation |
| Avatar | Medium | Low | Image, initials, status indicator |
| Design Tokens CSS | Medium | Low | Shared CSS variables file |
| Documentation Site | Medium | Medium | Storybook or custom docs |

## Later (Backlog)

| Feature | Notes |
|---------|-------|
| Dropdown | Select menu with search |
| Tabs | Tab navigation component |
| Tooltip | Hover tooltips |
| Badge | Status badges |
| Progress | Progress bars and spinners |

## Icebox

*Nothing iced yet—staying focused on MVP.*

---

## Prioritization Criteria

We prioritize based on:
1. **User Impact** - How many users benefit? How much?
2. **Business Value** - Does it move key metrics?
3. **Effort** - How complex is implementation?
4. **Dependencies** - What must come first?

## How to Propose Features

1. Use `/shape-spec` to shape the feature idea
2. Discuss and refine with stakeholders
3. Use `/write-spec` to create detailed specification
4. Add to appropriate roadmap section

---

*Use `/plan-product` in Cursor to update this roadmap.*

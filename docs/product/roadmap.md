# Product Roadmap - Spark UI

> Last Updated: 2025-12-03

## Overview

Spark UI development is organized around independent, parallelizable components. Each component can be developed simultaneously by separate agents or developers, making this project ideal for the `/orchestrate` workflow.

---

## Phase 1: Core Components (MVP) 🎯

**Goal:** Ship 6 essential components that cover 80% of common UI needs.

| Component | Priority | Complexity | Parallelizable | Status |
|-----------|----------|------------|----------------|--------|
| **Button** | 🔴 Critical | Low | ✅ Yes | 📋 Planned |
| **Card** | 🔴 Critical | Low | ✅ Yes | 📋 Planned |
| **Input** | 🔴 Critical | Medium | ✅ Yes | 📋 Planned |
| **Modal** | 🟠 High | Medium | ✅ Yes | 📋 Planned |
| **Toast** | 🟠 High | Medium | ✅ Yes | 📋 Planned |
| **Avatar** | 🟡 Medium | Low | ✅ Yes | 📋 Planned |

### Component Details

#### Button (`spark-button`)
- Variants: primary, secondary, outline, ghost, danger
- Sizes: small, medium, large
- States: default, hover, active, disabled, loading
- Accessibility: Full keyboard support, focus indicators

#### Card (`spark-card`)
- Slots: header, body, footer
- Features: elevation levels, clickable variant
- Subcomponents: `spark-card-header`, `spark-card-body`, `spark-card-footer`

#### Input (`spark-input`)
- Types: text, email, password, number, search
- States: default, focus, error, disabled
- Features: label, placeholder, helper text, error message, icons

#### Modal (`spark-modal`)
- Features: backdrop, close button, escape to close
- Accessibility: focus trap, return focus on close
- Size variants: small, medium, large, full
- Subcomponents: `spark-modal-header`, `spark-modal-body`, `spark-modal-footer`

#### Toast (`SparkToast`)
- Types: info, success, warning, error
- Features: auto-dismiss, manual close, stacking
- Positions: top-right, top-left, bottom-right, bottom-left

#### Avatar (`spark-avatar`)
- Sizes: small (24px), medium (40px), large (64px), xlarge (96px)
- Features: image, initials fallback, status indicator
- Group: `spark-avatar-group` for stacking

---

## Phase 2: Extended Components 🚀

**Goal:** Add commonly requested components that maintain independence.

| Component | Priority | Complexity | Notes |
|-----------|----------|------------|-------|
| **Dropdown** | 🟠 High | High | Select menu with search/filter |
| **Tabs** | 🟠 High | Medium | Tab navigation with panels |
| **Tooltip** | 🟡 Medium | Low | Hover/focus tooltips |
| **Badge** | 🟡 Medium | Low | Status badges, counters |
| **Progress** | 🟡 Medium | Medium | Progress bars, spinners |

---

## Phase 3: Documentation & Tooling 📚

| Deliverable | Priority | Notes |
|-------------|----------|-------|
| **Interactive Docs** | 🔴 Critical | Live component playground |
| **Storybook** | 🟠 High | Component stories and examples |
| **Figma Kit** | 🟡 Medium | Design tokens and components |
| **VS Code Snippets** | 🟢 Low | Code snippets for components |

---

## Icebox (Not Now) ❄️

| Feature | Reason |
|---------|--------|
| React wrapper package | Focus on native Web Components first |
| Vue wrapper package | Focus on native Web Components first |
| Server-side rendering | Adds complexity, limited demand |
| IE11 support | Modern browsers only, reduces complexity |
| Complex form components | Date pickers, rich text out of scope |

---

## Dependency Graph

```
Phase 1 Components (All Independent - Can Build in Parallel)
├── Button ──────────────────────────────────────┐
├── Card ────────────────────────────────────────┤
├── Input ───────────────────────────────────────┼──→ MVP Complete
├── Modal ───────────────────────────────────────┤
├── Toast ───────────────────────────────────────┤
└── Avatar ──────────────────────────────────────┘

Phase 2 (After MVP)
├── Dropdown
├── Tabs
├── Tooltip
├── Badge
└── Progress

Phase 3 (Documentation)
└── Docs Site (depends on MVP components for examples)
```

---

## Parallel Development Strategy

Because all 6 MVP components are independent:

1. **Create specs** for each component (`/write-spec`)
2. **Generate tasks** for each spec (`/create-tasks`)
3. **Run `/orchestrate`** to launch 6 parallel Cloud Agents
4. **Review 6 PRs** and merge

**Expected time savings:** ~6x faster than sequential development.

---

## Prioritization Criteria

We prioritize based on:

1. **Independence** - Can it be built without waiting for other components?
2. **Frequency of Use** - How often do developers need this component?
3. **Accessibility Impact** - Does it solve a common accessibility challenge?
4. **Complexity** - Balance quick wins with substantial features

---

*Roadmap created using `/plan-product` workflow.*

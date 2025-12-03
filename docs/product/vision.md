# Product Vision - Spark UI

> Last Updated: 2025-12-03

## The Problem

Frontend developers face persistent frustrations when choosing a component library:

- **Framework Lock-in:** Most component libraries are framework-specific (React, Vue, Angular), forcing teams to rebuild components when switching frameworks or maintaining multiple codebases
- **Bloat:** Popular libraries bundle hundreds of features, inflating bundle sizes even when you only need a handful of components
- **Theming Complexity:** Customizing styles often requires fighting CSS specificity, ejecting themes, or learning proprietary theming APIs
- **Accessibility as Afterthought:** Many libraries add ARIA attributes superficially without true keyboard navigation, focus management, or screen reader support

## Target Users

- **Primary User:** Frontend developers building new projects who want lightweight, accessible components without framework constraints
- **Secondary User:** Development teams using multiple frameworks (React + Vue, or migrating between frameworks) who need consistent UI across codebases
- **Tertiary User:** Solo developers and small teams who want production-ready accessible components without learning complex theming systems

## The Solution

**Spark UI** is a minimal, framework-agnostic component library built on Web Components:

| Approach | Benefit |
|----------|---------|
| **Web Components** | Works with React, Vue, Svelte, or vanilla JS |
| **CSS Custom Properties** | Theme with simple CSS variables |
| **Shadow DOM** | Encapsulated styles, no CSS conflicts |
| **Zero Dependencies** | No runtime bloat, ~5KB per component |
| **WCAG 2.1 AA** | Accessibility by default, not as an addon |

### Core Value Proposition

> Beautiful, accessible UI components that work everywhere—no framework required, no configuration needed, no bloat included.

## Success Metrics

- [ ] **Adoption:** 100+ GitHub stars within 3 months of launch
- [ ] **Size:** Each component under 5KB gzipped
- [ ] **Accessibility:** Pass all WCAG 2.1 AA automated checks
- [ ] **Compatibility:** Works out-of-the-box with React, Vue, Svelte, and vanilla JS
- [ ] **Developer Experience:** npm install to first component rendered in < 2 minutes

## What We're NOT Building

- ❌ **Framework-specific wrappers** - Use native Web Components directly
- ❌ **Complex layout systems** - Use CSS Grid/Flexbox
- ❌ **Form validation library** - Handle validation in your app
- ❌ **State management** - Components are presentational only
- ❌ **Animation library** - Use CSS transitions or your preferred library
- ❌ **IE11 support** - Modern browsers only (Chrome, Firefox, Safari, Edge)

## Core Principles

1. **Simplicity Over Features:** Every component does one thing well. No swiss-army-knife components with dozens of props.

2. **Accessibility First:** ARIA patterns, keyboard navigation, and focus management are built-in from day one, not bolted on later.

3. **Composition Over Configuration:** Small, composable pieces that combine flexibly, rather than monolithic components with complex APIs.

4. **Zero Lock-in:** No build step required. No framework required. Copy the JS file and it works.

5. **Beautiful Defaults:** Components look great out of the box with sensible defaults, while remaining fully customizable.

## Technical Constraints

| Constraint | Specification |
|------------|---------------|
| Technology | Web Components (Custom Elements v1) |
| Styling | CSS Custom Properties + Shadow DOM |
| Build | Vanilla JS, optional Vite for development |
| Bundle Size | < 5KB gzipped per component |
| Browser Support | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ |
| Accessibility | WCAG 2.1 AA compliant |

---

*Vision defined using `/plan-product` workflow.*

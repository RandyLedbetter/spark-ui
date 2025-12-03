# Feature Specification: Card Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-card>` Web Component provides a flexible container for grouping related content with optional header, body, and footer sections. It's a foundational layout component for displaying structured information.

## Problem Statement

### The Problem
Developers need consistent content containers with proper visual hierarchy, but existing solutions require framework-specific implementations or complex CSS setups.

### Current State
Developers either:
- Build custom card layouts from scratch each time
- Use framework-specific card components that don't transfer between projects
- Struggle with consistent spacing, shadows, and visual hierarchy

### Impact
Cards are essential for displaying grouped content like user profiles, product listings, settings panels, and article previews. A well-designed card component enables rapid UI development.

## Proposed Solution

### User Experience
Developers compose cards using intuitive slot-based HTML:

```html
<spark-card>
  <spark-card-header>
    <h3>Card Title</h3>
    <p>Subtitle text</p>
  </spark-card-header>
  <spark-card-body>
    <p>Main content goes here. This is the body of the card.</p>
  </spark-card-body>
  <spark-card-footer>
    <spark-button variant="ghost">Cancel</spark-button>
    <spark-button variant="primary">Save</spark-button>
  </spark-card-footer>
</spark-card>
```

### API Reference

#### `<spark-card>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `elevation` | string | `"md"` | Shadow depth: `none`, `sm`, `md`, `lg` |
| `variant` | string | `"default"` | Style variant: `default`, `outlined`, `filled` |
| `clickable` | boolean | `false` | Adds hover effect and cursor pointer |
| `padding` | string | `"md"` | Internal padding: `none`, `sm`, `md`, `lg` |

#### `<spark-card-header>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `divider` | boolean | `false` | Shows bottom border separator |

#### `<spark-card-body>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `scroll` | boolean | `false` | Enables vertical scrolling with max-height |

#### `<spark-card-footer>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `divider` | boolean | `false` | Shows top border separator |
| `align` | string | `"end"` | Content alignment: `start`, `center`, `end`, `between` |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-card-click` | `{ originalEvent: MouseEvent }` | Fired when clickable card is clicked |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-card-background` | `#ffffff` | Card background color |
| `--spark-card-border-radius` | `var(--spark-radius-lg)` | Corner radius |
| `--spark-card-border-color` | `#e2e8f0` | Border color (for outlined variant) |

### Visual Specifications

```
┌─────────────────────────────────────────────────────────────┐
│ CARD STRUCTURE                                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────┐                     │
│  │ HEADER (optional)                  │ ← spark-card-header │
│  │ Title, subtitle, avatar, actions   │                     │
│  ├────────────────────────────────────┤ ← optional divider  │
│  │                                    │                     │
│  │ BODY                               │ ← spark-card-body   │
│  │ Main content area                  │                     │
│  │ Can contain any content            │                     │
│  │                                    │                     │
│  ├────────────────────────────────────┤ ← optional divider  │
│  │ FOOTER (optional)         [Cancel] │ ← spark-card-footer │
│  │                            [Save]  │   align="end"       │
│  └────────────────────────────────────┘                     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ ELEVATION LEVELS                                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  none: No shadow, optional border                           │
│  sm:   0 1px 2px rgba(0,0,0,0.05)                          │
│  md:   0 4px 6px rgba(0,0,0,0.1)      ← default            │
│  lg:   0 10px 15px rgba(0,0,0,0.1)                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ VARIANTS                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  default:  White background + shadow                        │
│  outlined: White background + 1px border, no shadow         │
│  filled:   Light gray background (#f8fafc), no shadow       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ PADDING SIZES                                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  none: 0                                                    │
│  sm:   0.75rem (12px)                                       │
│  md:   1.5rem (24px)          ← default                     │
│  lg:   2rem (32px)                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## User Stories

### Story 1: Basic Card Usage
**As a** developer
**I want to** create a card with header, body, and footer sections
**So that** I can display structured content in a visually consistent container

**Acceptance Criteria:**
- [ ] Given I add `<spark-card>` with child elements, they render inside a styled container
- [ ] Given I add `<spark-card-header>`, it appears at the top with appropriate styling
- [ ] Given I add `<spark-card-body>`, it fills the main content area
- [ ] Given I add `<spark-card-footer>`, it appears at the bottom

### Story 2: Simple Card (Body Only)
**As a** developer
**I want to** create a simple card with just content
**So that** I can use cards without requiring header/footer

**Acceptance Criteria:**
- [ ] Given `<spark-card><p>Content</p></spark-card>`, the content renders properly
- [ ] Given no header/body/footer components used, the card renders with default padding

### Story 3: Card Elevation
**As a** developer
**I want to** control the shadow depth of cards
**So that** I can create visual hierarchy in my layouts

**Acceptance Criteria:**
- [ ] Given `elevation="none"`, no shadow is applied
- [ ] Given `elevation="sm"`, a subtle shadow appears
- [ ] Given `elevation="md"` (default), a medium shadow appears
- [ ] Given `elevation="lg"`, a prominent shadow appears

### Story 4: Clickable Card
**As a** developer
**I want to** make entire cards clickable
**So that** I can use them as navigation elements or selectable items

**Acceptance Criteria:**
- [ ] Given `clickable` attribute, the card has `cursor: pointer`
- [ ] Given `clickable` card is hovered, it shows a hover effect (slight lift/shadow increase)
- [ ] Given `clickable` card is clicked, `spark-card-click` event fires
- [ ] Given `clickable` card, pressing Enter while focused activates it

### Story 5: Footer Alignment
**As a** developer
**I want to** control button alignment in card footers
**So that** I can follow different UI patterns (left-aligned, right-aligned, spread)

**Acceptance Criteria:**
- [ ] Given `<spark-card-footer align="end">`, content aligns to the right
- [ ] Given `<spark-card-footer align="start">`, content aligns to the left
- [ ] Given `<spark-card-footer align="between">`, content spreads with space-between

### Story 6: Dividers
**As a** developer
**I want to** add visual separators between card sections
**So that** I can clearly delineate header, body, and footer areas

**Acceptance Criteria:**
- [ ] Given `<spark-card-header divider>`, a border appears below the header
- [ ] Given `<spark-card-footer divider>`, a border appears above the footer

## Technical Approach

### Architecture
The card is implemented as a set of Custom Elements that work together: `spark-card` (container), `spark-card-header`, `spark-card-body`, and `spark-card-footer`.

### File Structure
```
src/components/card/
├── card.js           # Main card container component
├── card-header.js    # Header sub-component
├── card-body.js      # Body sub-component
├── card-footer.js    # Footer sub-component
├── card.css          # Shared styles (embedded)
└── card.test.js      # Unit tests
```

### Component Classes

```javascript
// Main container
class SparkCard extends HTMLElement {
  static get observedAttributes() {
    return ['elevation', 'variant', 'clickable', 'padding'];
  }
}
customElements.define('spark-card', SparkCard);

// Sub-components
class SparkCardHeader extends HTMLElement {
  static get observedAttributes() { return ['divider']; }
}
customElements.define('spark-card-header', SparkCardHeader);

class SparkCardBody extends HTMLElement {
  static get observedAttributes() { return ['scroll']; }
}
customElements.define('spark-card-body', SparkCardBody);

class SparkCardFooter extends HTMLElement {
  static get observedAttributes() { return ['divider', 'align']; }
}
customElements.define('spark-card-footer', SparkCardFooter);
```

### Shadow DOM Structure (spark-card)

```html
<div class="spark-card" part="card">
  <slot></slot>
</div>
```

### Styling Strategy
- Container uses CSS Grid or Flexbox for layout
- Sub-components style themselves but inherit card padding context
- CSS custom properties enable theming
- `part` attributes for deep styling customization

### Dependencies
- None (vanilla Web Components)
- Uses shared design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Empty card | Renders with min-height, no content |
| Only header | Card displays header only, properly styled |
| Only body | Card displays body only with padding |
| Nested cards | Inner cards render correctly |
| Long content in body | Body expands; use `scroll` attribute to constrain |
| No sub-components used | Default slot handles any content |

## Out of Scope

- [ ] Media/image card variant (use slots for images)
- [ ] Collapsible/expandable cards (separate component)
- [ ] Card carousels/sliders
- [ ] Horizontal card layout (use CSS Grid)
- [ ] Card skeleton/loading state (separate pattern)

## Open Questions

*None - spec is ready for implementation.*

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial draft |


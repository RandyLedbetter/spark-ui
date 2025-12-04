# Feature Specification: Card Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-04
> **Last Updated:** 2025-12-04

## Overview

The Card component (`<spark-card>`) is a container for grouping related content and actions. It supports header, body, and footer sections with customizable elevation and optional interactivity.

## Problem Statement

### The Problem
Users need a consistent way to group and present related information in a visually distinct container.

### Current State
Developers create ad-hoc card styles leading to inconsistent spacing, shadows, and structure across applications.

### Impact
Cards are used everywhere: dashboards, product listings, settings panels, and profile pages. A standardized card component ensures visual consistency.

## Proposed Solution

### User Experience

```html
<!-- Basic card -->
<spark-card>
  <p>Simple card content</p>
</spark-card>

<!-- Full structure -->
<spark-card elevation="2">
  <spark-card-header>
    <h3>Card Title</h3>
    <p>Subtitle text</p>
  </spark-card-header>
  <spark-card-body>
    <p>Main content goes here. Can include any HTML.</p>
  </spark-card-body>
  <spark-card-footer>
    <spark-button variant="ghost">Cancel</spark-button>
    <spark-button variant="primary">Save</spark-button>
  </spark-card-footer>
</spark-card>

<!-- Clickable card -->
<spark-card clickable>
  <spark-card-body>Click anywhere on this card</spark-card-body>
</spark-card>
```

### API Design

#### spark-card Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `elevation` | string | `"1"` | Shadow depth: 0, 1, 2, 3 |
| `clickable` | boolean | `false` | Makes entire card interactive |
| `padding` | string | `"medium"` | Internal padding: none, small, medium, large |

#### Sub-components

| Component | Description |
|-----------|-------------|
| `<spark-card-header>` | Optional header section with bottom border |
| `<spark-card-body>` | Main content area |
| `<spark-card-footer>` | Optional footer with top border, typically for actions |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spark-card-click` | `{ originalEvent }` | Fired when clickable card is clicked |

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spark-card-background` | `--spark-white` | Card background |
| `--spark-card-border-radius` | `--spark-radius-lg` | Corner radius |
| `--spark-card-border-color` | `--spark-gray-200` | Border color |
| `--spark-card-padding` | (from padding attr) | Internal spacing |

### Elevation Levels

| Level | Shadow Token | Use Case |
|-------|--------------|----------|
| 0 | none | Flat card, border only |
| 1 | `--spark-shadow-sm` | Default, subtle depth |
| 2 | `--spark-shadow-md` | Emphasized card |
| 3 | `--spark-shadow-lg` | Floating/modal-like |

### Visual Structure

```
┌──────────────────────────────────────┐
│  HEADER (optional)                   │
│  - Title, subtitle, meta info        │
│  - Bottom border separator           │
├──────────────────────────────────────┤
│                                      │
│  BODY                                │
│  - Primary content area              │
│  - Flexible height                   │
│                                      │
├──────────────────────────────────────┤
│  FOOTER (optional)                   │
│  - Action buttons                    │
│  - Top border separator              │
│  - Right-aligned by default          │
└──────────────────────────────────────┘
```

## User Stories

### Story 1: Basic Content Card
**As a** developer
**I want to** wrap content in a card
**So that** it appears as a distinct visual group

**Acceptance Criteria:**
- [ ] Card renders with background, border, and shadow
- [ ] Content is padded from edges
- [ ] Card has rounded corners using design tokens
- [ ] Default elevation is subtle (level 1)

### Story 2: Structured Card Layout
**As a** developer
**I want to** use header, body, and footer sections
**So that** content is organized consistently

**Acceptance Criteria:**
- [ ] Header renders at top with bottom border
- [ ] Body fills available space between header and footer
- [ ] Footer renders at bottom with top border
- [ ] Sections can be used independently or together
- [ ] Missing sections do not break layout

### Story 3: Clickable Card
**As a** user
**I want to** click anywhere on a card to navigate or select
**So that** I have a large click target

**Acceptance Criteria:**
- [ ] Adding clickable attribute makes card interactive
- [ ] Hover state shows visual feedback (elevation increase)
- [ ] Click fires spark-card-click event
- [ ] Card has role button and tabindex 0
- [ ] Enter and Space keys trigger click
- [ ] Focus ring appears on keyboard focus

### Story 4: Elevation Control
**As a** developer
**I want to** control card shadow depth
**So that** I can create visual hierarchy

**Acceptance Criteria:**
- [ ] elevation 0 shows no shadow, border only
- [ ] elevation 1 shows subtle shadow (default)
- [ ] elevation 2 shows medium shadow
- [ ] elevation 3 shows prominent shadow
- [ ] Hover on clickable cards temporarily increases elevation

### Story 5: Customizable Padding
**As a** developer
**I want to** adjust card internal spacing
**So that** I can fit different content densities

**Acceptance Criteria:**
- [ ] padding none removes all internal padding
- [ ] padding small uses --spark-spacing-sm
- [ ] padding medium uses --spark-spacing-md (default)
- [ ] padding large uses --spark-spacing-lg

## Technical Approach

### Architecture

```
spark-card/
├── card.js         # SparkCard class
├── card-header.js  # SparkCardHeader class
├── card-body.js    # SparkCardBody class
├── card-footer.js  # SparkCardFooter class
└── card.test.js    # Unit tests
```

### Component Structure

```javascript
// Main card container
class SparkCard extends SparkElement {
  static get observedAttributes() {
    return ['elevation', 'clickable', 'padding'];
  }
  
  get template() {
    return `<div part="card" role="${this.clickable ? 'button' : ''}">
      <slot></slot>
    </div>`;
  }
}

// Sub-components are simple wrappers
class SparkCardHeader extends SparkElement {
  get template() {
    return `<header part="header"><slot></slot></header>`;
  }
}
```

### Key Implementation Details

1. **Slot-based composition** - Flexible content arrangement
2. **CSS Parts** - Each section has a part for external styling
3. **Semantic HTML** - Uses `<header>`, `<footer>` in sub-components
4. **Keyboard support** - Clickable cards work like buttons

### Dependencies

- Extends `SparkElement` from `src/core/base-component.js`
- Uses design tokens from `src/tokens/tokens.css`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No sub-components | Card still renders with slot content |
| Multiple headers/footers | All render (developer responsibility) |
| Empty card | Card renders as empty container |
| Nested clickable cards | Inner click stops propagation |
| Very long content | Card expands vertically |

## Out of Scope

- [ ] Card carousel/slider (future spec)
- [ ] Collapsible/expandable card (future spec)
- [ ] Card image cover variant (use CSS or header slot)
- [ ] Card selection/checkbox integration (future spec)
- [ ] Horizontal card layout (use CSS flexbox)

## Open Questions

- [x] ~~Should footer buttons auto-align right?~~ **Decision:** Yes, via flexbox justify-end
- [x] ~~Include card-media sub-component?~~ **Decision:** No, use slots for flexibility

## Implementation Tasks

| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| card-001 | Card component structure | 1h | None |
| card-002 | Card sub-components | 1h | card-001 |
| card-003 | Card elevation and padding | 45m | card-001 |
| card-004 | Clickable card behavior | 1h | card-003 |

**Total Estimate:** 3.75 hours

See `docs/sprint.yaml` for full task details and status.

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-04 | AI Assistant | Initial draft |


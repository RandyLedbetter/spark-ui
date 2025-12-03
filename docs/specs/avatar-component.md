# Feature Specification: Avatar Component

> **Status:** Ready
> **Author:** AI Assistant
> **Created:** 2025-12-03
> **Last Updated:** 2025-12-03

## Overview

The `<spark-avatar>` component displays user profile images with fallback to initials, status indicators, and grouping support. The companion `<spark-avatar-group>` component handles overlapping avatar displays for teams or participant lists.

## Problem Statement

### The Problem
Displaying user avatars involves several concerns:
- Image loading and error handling
- Fallback to initials when no image
- Consistent sizing across the app
- Status indicators (online, away, busy)
- Grouping avatars with overlap effect
- Accessibility for decorative vs. meaningful images

### Current State
Developers write custom avatar CSS, handle image errors manually, and build ad-hoc grouping layouts.

### Impact
Avatars appear throughout applications in navigation, comments, member lists, and profiles. A well-designed avatar component:
- Ensures visual consistency
- Handles edge cases gracefully
- Provides accessible alternatives

## Proposed Solution

### User Experience

```html
<!-- Basic image avatar -->
<spark-avatar 
  src="/user.jpg" 
  alt="John Doe"
  size="large">
</spark-avatar>

<!-- Initials fallback -->
<spark-avatar initials="JD" size="medium"></spark-avatar>

<!-- With status indicator -->
<spark-avatar 
  src="/user.jpg" 
  alt="Jane Smith"
  status="online">
</spark-avatar>

<!-- Avatar group -->
<spark-avatar-group max="3">
  <spark-avatar src="/user1.jpg" alt="Alice"></spark-avatar>
  <spark-avatar src="/user2.jpg" alt="Bob"></spark-avatar>
  <spark-avatar src="/user3.jpg" alt="Charlie"></spark-avatar>
  <spark-avatar src="/user4.jpg" alt="Diana"></spark-avatar>
  <spark-avatar src="/user5.jpg" alt="Eve"></spark-avatar>
</spark-avatar-group>
<!-- Renders: [Alice][Bob][Charlie][+2] -->
```

### Visual Design

```
Sizes:
┌──┐   ┌────┐   ┌──────┐   ┌────────┐
│sm│   │ md │   │  lg  │   │   xl   │
│24│   │ 40 │   │  64  │   │   96   │
└──┘   └────┘   └──────┘   └────────┘

States:
┌──────┐   ┌──────┐   ┌──────┐
│ IMG  │   │  JD  │   │  ?   │
│      │   │      │   │      │
└──────┘   └──────┘   └──────┘
  Image     Initials   Default

Status Indicators:
┌──────┐●  ┌──────┐◐  ┌──────┐○  ┌──────┐◯
│      │   │      │   │      │   │      │
└──────┘   └──────┘   └──────┘   └──────┘
  online     away       busy      offline

Avatar Group:
┌──────┬────┬────┬────┐
│  A   │ B  │ C  │+2  │
│      │    │    │    │
└──────┴────┴────┴────┘
  (overlapping circles)
```

## User Stories

### Story 1: Image Avatar
**As a** developer
**I want to** display a user's profile image
**So that** users are visually identifiable

**Acceptance Criteria:**
- [ ] Given `src="/image.jpg"`, when rendered, then image displays in circular frame
- [ ] Given `alt="Name"`, when rendered, then image has alt text for screen readers
- [ ] Given image fails to load, then fallback to initials or default icon

### Story 2: Initials Avatar
**As a** developer
**I want to** show initials when no image is available
**So that** avatars still identify users

**Acceptance Criteria:**
- [ ] Given `initials="JD"`, when rendered, then "JD" displays centered
- [ ] Given initials, when rendered, then background color is generated from initials
- [ ] Given no src and no initials, then default placeholder icon shows

### Story 3: Avatar Sizes
**As a** developer
**I want to** control avatar size
**So that** avatars fit different contexts

**Acceptance Criteria:**
- [ ] Given `size="small"`, when rendered, then avatar is 24px diameter
- [ ] Given `size="medium"` (default), when rendered, then avatar is 40px diameter
- [ ] Given `size="large"`, when rendered, then avatar is 64px diameter
- [ ] Given `size="xlarge"`, when rendered, then avatar is 96px diameter

### Story 4: Status Indicator
**As a** developer
**I want to** show user status
**So that** users see who is available

**Acceptance Criteria:**
- [ ] Given `status="online"`, when rendered, then green dot appears on avatar
- [ ] Given `status="away"`, when rendered, then yellow dot appears
- [ ] Given `status="busy"`, when rendered, then red dot appears
- [ ] Given `status="offline"`, when rendered, then gray dot appears
- [ ] Given no status attribute, when rendered, then no indicator shows

### Story 5: Avatar Group
**As a** developer
**I want to** display multiple avatars overlapping
**So that** I can show team members compactly

**Acceptance Criteria:**
- [ ] Given `<spark-avatar-group>` with avatars, when rendered, then avatars overlap
- [ ] Given `max="3"` with 5 avatars, when rendered, then 3 avatars + "+2" badge shows
- [ ] Given avatars in group, when rendered, then they stack right-to-left

### Story 6: Image Error Handling
**As a** developer
**I want to** gracefully handle broken images
**So that** avatars don't show broken image icons

**Acceptance Criteria:**
- [ ] Given src that 404s, when error occurs, then initials fallback displays
- [ ] Given src that 404s and no initials, then default icon displays
- [ ] Given slow loading image, then placeholder shows until loaded

### Story 7: Accessibility
**As a** screen reader user
**I want to** understand avatar content
**So that** I know who is represented

**Acceptance Criteria:**
- [ ] Given meaningful avatar, when rendered, then `alt` text is announced
- [ ] Given decorative avatar (in list context), then `alt=""` prevents announcement
- [ ] Given status indicator, when rendered, then status is conveyed accessibly

## Technical Approach

### Architecture

```
spark-avatar (Custom Element)
├── Shadow Root
│   ├── <style>
│   └── <div class="avatar">
│       ├── <img> (if src provided, hidden on error)
│       ├── <span class="initials"> (fallback)
│       ├── <svg class="default-icon"> (final fallback)
│       └── <span class="status-indicator"> (if status)

spark-avatar-group (Custom Element)
├── Shadow Root
│   ├── <style>
│   └── <div class="avatar-group">
│       ├── <slot></slot> (avatars)
│       └── <span class="overflow-badge">+N</span>
```

### Key Components

- **SparkAvatar:** Individual avatar with image, initials, status
- **SparkAvatarGroup:** Container managing overlap layout and overflow

### Attributes/Properties

**spark-avatar:**
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | `null` | Image URL |
| `alt` | string | `""` | Alt text for image |
| `initials` | string | `""` | Fallback initials (1-2 chars) |
| `size` | string | `"medium"` | Size variant |
| `status` | string | `null` | Status indicator |

**spark-avatar-group:**
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `max` | number | `null` | Max visible avatars |

### CSS Custom Properties

```css
/* Avatar */
--spark-avatar-bg: var(--spark-secondary);
--spark-avatar-text: white;
--spark-avatar-border: 2px solid white;
--spark-avatar-radius: 50%;

/* Status colors */
--spark-avatar-online: var(--spark-success);
--spark-avatar-away: var(--spark-warning);
--spark-avatar-busy: var(--spark-error);
--spark-avatar-offline: var(--spark-secondary);

/* Group */
--spark-avatar-group-spacing: -8px;
--spark-avatar-overflow-bg: var(--spark-secondary);
```

### File Structure

```
src/components/avatar/
├── avatar.js       # Both avatar and avatar-group
├── avatar.css      # Component styles
└── avatar.test.js  # Unit tests
```

### Dependencies

- None (zero runtime dependencies)
- Uses global design tokens from `src/tokens/tokens.css`

### Color Generation for Initials

```javascript
// Generate consistent background color from initials
function getColorFromInitials(initials) {
  const colors = [
    '#6366f1', '#8b5cf6', '#d946ef', '#ec4899',
    '#f43f5e', '#f97316', '#eab308', '#22c55e',
    '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6'
  ];
  const charCode = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  return colors[charCode % colors.length];
}
```

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Initials longer than 2 chars | Truncate to first 2 |
| Single character initials | Display single char, still circular |
| Empty src string | Treat as no src, use fallback |
| Image loads then errors | Show image first, then fallback |
| Avatar group with 0 children | Render empty container |
| Avatar group with max=0 | Show only overflow badge |
| Very large group (100+) | Performance should remain acceptable |

## Out of Scope

- [ ] Edit/upload functionality on avatar
- [ ] Tooltip showing full name on hover
- [ ] Click to view profile behavior
- [ ] Badge/notification indicator (separate from status)
- [ ] Animated status transitions
- [ ] Square avatar variant

## Open Questions

- [x] Should avatar support custom background colors? → **No, use initials-based generation for consistency**
- [x] Should group show tooltip with hidden names? → **No, keep simple for MVP**

## Implementation Tasks

_Generated by `/create-tasks` after spec approval_

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-12-03 | AI Assistant | Initial specification |


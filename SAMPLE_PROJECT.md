# Sample Project: Spark UI Component Library

A modern, framework-agnostic UI component library designed for **parallel development** - perfect for testing the `/orchestrate` workflow.

---

## Why This Project is Ideal for /orchestrate

Unlike TaskFlow CLI (where features depend on each other), Spark UI has **completely independent components**:

| Component | Dependencies | Can Build in Parallel? |
|-----------|--------------|------------------------|
| Button | None | ✅ Yes |
| Card | None | ✅ Yes |
| Input | None | ✅ Yes |
| Modal | None | ✅ Yes |
| Toast | None | ✅ Yes |
| Avatar | None | ✅ Yes |

**Each component can be assigned to a separate Cloud Agent**, developed simultaneously, and merged via PRs.

---

## Project Vision

**Spark UI** is a lightweight, accessible component library that works with any framework (React, Vue, Svelte) or vanilla JavaScript.

### The Problem

- Most component libraries are framework-specific
- Existing libraries are bloated with features you don't need
- Styling is hard to customize
- Accessibility is often an afterthought

### The Solution

A minimal component library that:
- Uses Web Components for framework independence
- Follows WAI-ARIA accessibility guidelines
- Uses CSS custom properties for easy theming
- Has zero runtime dependencies

---

## Target Users

- Frontend developers who want lightweight components
- Teams using multiple frameworks who want consistency
- Projects that need accessible components out of the box
- Developers who prefer composition over configuration

---

## Core Components (MVP)

### 1. Button Component

```html
<spark-button variant="primary">Click Me</spark-button>
<spark-button variant="secondary" disabled>Disabled</spark-button>
<spark-button variant="outline" size="small">Small</spark-button>
```

**Variants:** primary, secondary, outline, ghost, danger
**Sizes:** small, medium, large
**States:** default, hover, active, disabled, loading

---

### 2. Card Component

```html
<spark-card>
  <spark-card-header>
    <h3>Card Title</h3>
  </spark-card-header>
  <spark-card-body>
    Card content goes here
  </spark-card-body>
  <spark-card-footer>
    <spark-button>Action</spark-button>
  </spark-card-footer>
</spark-card>
```

**Features:** header, body, footer slots, elevation levels, clickable variant

---

### 3. Input Component

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
  error="Password too short">
</spark-input>
```

**Types:** text, email, password, number, search
**States:** default, focus, error, disabled
**Features:** label, placeholder, helper text, error message, icons

---

### 4. Modal Component

```html
<spark-modal id="confirm-modal">
  <spark-modal-header>Confirm Action</spark-modal-header>
  <spark-modal-body>
    Are you sure you want to proceed?
  </spark-modal-body>
  <spark-modal-footer>
    <spark-button variant="secondary">Cancel</spark-button>
    <spark-button variant="primary">Confirm</spark-button>
  </spark-modal-footer>
</spark-modal>

<script>
  document.querySelector('#confirm-modal').open();
</script>
```

**Features:** backdrop, close button, escape to close, focus trap, size variants

---

### 5. Toast Component

```html
<script>
  SparkToast.show({
    message: 'File saved successfully',
    type: 'success',
    duration: 3000
  });
</script>
```

**Types:** info, success, warning, error
**Features:** auto-dismiss, manual close, position options, stacking

---

### 6. Avatar Component

```html
<spark-avatar 
  src="/user.jpg" 
  alt="John Doe"
  size="large">
</spark-avatar>

<spark-avatar initials="JD" size="medium"></spark-avatar>

<spark-avatar-group>
  <spark-avatar src="/user1.jpg"></spark-avatar>
  <spark-avatar src="/user2.jpg"></spark-avatar>
  <spark-avatar initials="+3"></spark-avatar>
</spark-avatar-group>
```

**Sizes:** small (24px), medium (40px), large (64px), xlarge (96px)
**Features:** image, initials fallback, status indicator, group stacking

---

## Technical Constraints

- **Technology:** Web Components (Custom Elements v1)
- **Styling:** CSS custom properties + Shadow DOM
- **Build:** Vanilla JS, no bundler required (optional Vite for dev)
- **Size:** Each component < 5KB gzipped
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Accessibility:** WCAG 2.1 AA compliant

---

## Design Tokens

```css
:root {
  /* Colors */
  --spark-primary: #6366f1;
  --spark-secondary: #64748b;
  --spark-success: #22c55e;
  --spark-warning: #f59e0b;
  --spark-error: #ef4444;
  
  /* Typography */
  --spark-font-family: 'Inter', system-ui, sans-serif;
  --spark-font-size-sm: 0.875rem;
  --spark-font-size-md: 1rem;
  --spark-font-size-lg: 1.125rem;
  
  /* Spacing */
  --spark-spacing-xs: 0.25rem;
  --spark-spacing-sm: 0.5rem;
  --spark-spacing-md: 1rem;
  --spark-spacing-lg: 1.5rem;
  
  /* Border Radius */
  --spark-radius-sm: 0.25rem;
  --spark-radius-md: 0.5rem;
  --spark-radius-lg: 1rem;
  
  /* Shadows */
  --spark-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --spark-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --spark-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

---

## Project Structure

```
spark-ui/
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.js
│   │   │   ├── button.css
│   │   │   └── button.test.js
│   │   ├── card/
│   │   ├── input/
│   │   ├── modal/
│   │   ├── toast/
│   │   └── avatar/
│   ├── tokens/
│   │   └── tokens.css
│   └── index.js
├── docs/
│   └── storybook/
├── package.json
└── README.md
```

---

## Version Control & Remote Repository

> ⚠️ **IMPORTANT:** Cloud Agents create PRs, so a GitHub repository is REQUIRED.

### Remote Repository
- **URL:** https://github.com/RandyLedbetter/spark-ui.git

### Setup Instructions
```bash
# Clone the repository first:
git clone https://github.com/RandyLedbetter/spark-ui.git
cd spark-ui

# Or if you have a local folder:
git remote add origin https://github.com/RandyLedbetter/spark-ui.git
```

### How Cloud Agents Use This

When you run `/orchestrate`:
1. Each Cloud Agent gets assigned a component
2. Each agent creates a branch: `feature/button-component`, `feature/card-component`, etc.
3. Each agent pushes changes and creates a PR
4. You review and merge PRs

---

## Specs to Create (One Per Component)

Each component gets its own spec that can be developed independently:

| Spec Name | Component | Parallelizable |
|-----------|-----------|----------------|
| `button-component` | Button | ✅ |
| `card-component` | Card | ✅ |
| `input-component` | Input | ✅ |
| `modal-component` | Modal | ✅ |
| `toast-component` | Toast | ✅ |
| `avatar-component` | Avatar | ✅ |

---

## How to Test cursor-agent-os With This Project

### Step 1: Initialize with Cloud Agents
```bash
cd /c/dev/cursor-agent-os-testing-2
cursor-agent-os init
```

**When prompted:**
- Enable Cloud Agents: **Yes**
- Paste your Cursor API key

### Step 2: Plan the Product
In Cursor chat:
```
Read SAMPLE_PROJECT.md and then let's do /plan-product for Spark UI
```

### Step 3: Create All Component Specs
```bash
cursor-agent-os new-spec button-component
cursor-agent-os new-spec card-component
cursor-agent-os new-spec input-component
cursor-agent-os new-spec modal-component
cursor-agent-os new-spec toast-component
cursor-agent-os new-spec avatar-component
```

### Step 4: Write Detailed Specs
In Cursor chat, write specs for each:
```
Let's do /write-spec for button-component based on SAMPLE_PROJECT.md
```

Repeat for all 6 components.

### Step 5: Create Tasks
```
/create-tasks for all component specs
```

### Step 6: ORCHESTRATE! 🚀
```
/orchestrate
```

**What happens:**
1. AI identifies 6 independent components
2. Launches 6 Cloud Agents (one per component)
3. Each agent works in parallel
4. Each agent creates a PR
5. You review and merge!

### Step 7: Monitor Progress
```bash
cursor-agent-os agents list
cursor-agent-os agents status <agent-id>
```

---

## Expected Outcome

After running `/orchestrate`:

- **6 PRs created** (one for each component)
- **6 agents working in parallel**
- **~6x faster** than sequential `/implement`
- **Clean PR-based review** for each component

---

## Comparison: Sequential vs Parallel

### Sequential (`/implement`)
```
Button → Card → Input → Modal → Toast → Avatar
  10m     10m    10m     10m     10m      10m   = 60 minutes total
```

### Parallel (`/orchestrate`)
```
Button ─┐
Card ───┤
Input ──┼─→ All complete in ~10 minutes!
Modal ──┤
Toast ──┤
Avatar ─┘
```

---

## Stretch Goals

After the 6 core components, consider:
- **Dropdown** - Select menu with search
- **Tabs** - Tab navigation component
- **Tooltip** - Hover tooltips
- **Badge** - Status badges
- **Progress** - Progress bars and spinners

Each of these is also independent and parallelizable!

---

Happy building with Cloud Agents! ☁️🚀


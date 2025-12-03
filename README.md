# Spark UI ✨

A lightweight, accessible Web Component library that works with any framework.

[![npm version](https://img.shields.io/npm/v/spark-ui.svg)](https://www.npmjs.com/package/spark-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Framework Agnostic** - Works with React, Vue, Svelte, or vanilla JS
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🪶 **Lightweight** - Each component < 5KB gzipped
- 🎯 **Zero Dependencies** - No runtime dependencies
- 🎨 **Themeable** - CSS custom properties for easy customization

## Installation

```bash
npm install spark-ui
```

## Quick Start

### Import Components

```html
<!-- In your HTML -->
<script type="module">
  import 'spark-ui';
  import 'spark-ui/tokens'; // Design tokens CSS
</script>

<!-- Or import the CSS file directly -->
<link rel="stylesheet" href="node_modules/spark-ui/src/tokens/tokens.css">
```

### Use Components

```html
<!-- Button -->
<spark-button variant="primary">Click Me</spark-button>
<spark-button variant="secondary" disabled>Disabled</spark-button>

<!-- Card -->
<spark-card>
  <spark-card-header>
    <h3>Card Title</h3>
  </spark-card-header>
  <spark-card-body>
    Card content goes here.
  </spark-card-body>
  <spark-card-footer>
    <spark-button>Action</spark-button>
  </spark-card-footer>
</spark-card>

<!-- Input -->
<spark-input 
  label="Email" 
  type="email" 
  placeholder="you@example.com"
  required>
</spark-input>

<!-- Modal -->
<spark-modal id="my-modal">
  <spark-modal-header>Modal Title</spark-modal-header>
  <spark-modal-body>Modal content here.</spark-modal-body>
  <spark-modal-footer>
    <spark-button data-modal-close>Close</spark-button>
  </spark-modal-footer>
</spark-modal>

<script>
  document.querySelector('#my-modal').open();
</script>

<!-- Toast -->
<script>
  SparkToast.success('File saved successfully!');
  SparkToast.error('Something went wrong');
</script>

<!-- Avatar -->
<spark-avatar src="/user.jpg" alt="John Doe" size="large"></spark-avatar>
<spark-avatar initials="JD" status="online"></spark-avatar>

<spark-avatar-group max="3">
  <spark-avatar src="/user1.jpg" alt="Alice"></spark-avatar>
  <spark-avatar src="/user2.jpg" alt="Bob"></spark-avatar>
  <spark-avatar src="/user3.jpg" alt="Charlie"></spark-avatar>
</spark-avatar-group>
```

## Components

| Component | Description | Status |
|-----------|-------------|--------|
| `spark-button` | Versatile button with variants and states | 🚧 Pending |
| `spark-card` | Flexible content container | 🚧 Pending |
| `spark-input` | Accessible form input | 🚧 Pending |
| `spark-modal` | Dialog with focus trap | 🚧 Pending |
| `SparkToast` | Toast notifications | 🚧 Pending |
| `spark-avatar` | User avatar with fallbacks | 🚧 Pending |

## Theming

Customize with CSS custom properties:

```css
:root {
  /* Override primary color */
  --spark-primary: #your-brand-color;
  
  /* Override spacing */
  --spark-spacing-md: 1.25rem;
  
  /* Override border radius */
  --spark-radius-md: 0.75rem;
}
```

See `src/tokens/tokens.css` for all available tokens.

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT © Spark UI Contributors

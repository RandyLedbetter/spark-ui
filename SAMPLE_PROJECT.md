# Spark Utils Library

A minimal JavaScript utilities library with separate modules. This project is designed to test the cursor-agent-os orchestration system with truly parallel, conflict-free tasks.

## Project Overview

**Name:** spark-utils  
**Type:** JavaScript Library (ES Modules)  
**Purpose:** Test the full orchestrate loop (develop → review → iterate → merge)

## Requirements

### Foundation (Sequential - Must Complete First)

Create the basic project structure with a main entry point that will export all utility modules.

**Files to create:**
- `package.json` - Project metadata
- `src/index.js` - Main entry point (exports all modules)

**Main entry point:**
```javascript
// src/index.js
// Re-exports all utility modules
// Note: Parallel tasks will add their exports here
export * from './string-utils.js';
export * from './math-utils.js';
```

**package.json:**
```json
{
  "name": "spark-utils",
  "version": "0.1.0",
  "type": "module",
  "main": "src/index.js",
  "exports": {
    ".": "./src/index.js",
    "./string": "./src/string-utils.js",
    "./math": "./src/math-utils.js"
  }
}
```

### Parallel Tasks (After Foundation)

Once the foundation is complete, these two tasks can be implemented **truly in parallel** because they create **separate files** with no conflicts.

#### Task A: String Utilities Module

Create a new file `src/string-utils.js` with string manipulation functions.

**File to create:** `src/string-utils.js`

```javascript
// src/string-utils.js

/**
 * Capitalize the first letter of a string.
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string, or empty string if invalid
 */
export function capitalize(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverse a string.
 * @param {string} str - The string to reverse
 * @returns {string} The reversed string, or empty string if invalid
 */
export function reverse(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.split('').reverse().join('');
}

/**
 * Truncate a string to a maximum length with ellipsis.
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length (default 10)
 * @returns {string} The truncated string
 */
export function truncate(str, maxLength = 10) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}
```

#### Task B: Math Utilities Module

Create a new file `src/math-utils.js` with math helper functions.

**File to create:** `src/math-utils.js`

```javascript
// src/math-utils.js

/**
 * Clamp a number between min and max values.
 * @param {number} num - The number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} The clamped number, or 0 if invalid
 */
export function clamp(num, min, max) {
  if (typeof num !== 'number' || isNaN(num)) {
    return 0;
  }
  return Math.min(Math.max(num, min), max);
}

/**
 * Calculate the average of an array of numbers.
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The average, or 0 if invalid/empty
 */
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }
  const validNumbers = numbers.filter(n => typeof n === 'number' && !isNaN(n));
  if (validNumbers.length === 0) {
    return 0;
  }
  return validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length;
}

/**
 * Sum an array of numbers.
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The sum, or 0 if invalid/empty
 */
export function sum(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }
  return numbers
    .filter(n => typeof n === 'number' && !isNaN(n))
    .reduce((a, b) => a + b, 0);
}
```

## Success Criteria

### For Foundation Task
- [ ] `package.json` exists with name "spark-utils" and version "0.1.0"
- [ ] `src/index.js` exists and re-exports from string-utils and math-utils
- [ ] Package uses ES modules (`"type": "module"`)

### For Task A (String Utilities)
- [ ] `src/string-utils.js` exists as a separate file
- [ ] `capitalize('hello')` returns `'Hello'`
- [ ] `capitalize()` returns `''`
- [ ] `reverse('hello')` returns `'olleh'`
- [ ] `truncate('hello world', 8)` returns `'hello...'`

### For Task B (Math Utilities)
- [ ] `src/math-utils.js` exists as a separate file
- [ ] `clamp(15, 0, 10)` returns `10`
- [ ] `clamp(-5, 0, 10)` returns `0`
- [ ] `average([1, 2, 3, 4, 5])` returns `3`
- [ ] `sum([1, 2, 3])` returns `6`

## Technical Constraints

- Pure JavaScript (ES modules)
- No external dependencies
- **Separate source files per module** (enables true parallel development)
- Simple input validation (handle null/undefined/invalid types)

## Why This Project?

This project is intentionally trivial to:
1. **Fast iteration** - Tasks complete quickly, allowing rapid testing of the orchestration loop
2. **Clear verification** - Success criteria are easily checkable
3. **Predictable behavior** - No complex logic means predictable reviewer feedback
4. **True parallel execution** - Tasks create **different files**, so no merge conflicts

## Key Design Decision: Separate Files

Unlike a single-file approach, this project uses separate files for each parallel task:

```
src/
├── index.js          (Foundation - main entry)
├── string-utils.js   (Task A - created in parallel)
└── math-utils.js     (Task B - created in parallel)
```

This ensures that when Cloud Agents work on Task A and Task B simultaneously:
- Each agent creates a different file
- No merge conflicts when PRs are merged
- True parallel development without coordination

The goal is to verify the orchestration system works correctly, not to build a complex application.

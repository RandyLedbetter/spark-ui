# Greeter Library

A minimal JavaScript library for greeting users. This project is designed to test the cursor-agent-os orchestration system with a simple, predictable codebase.

## Project Overview

**Name:** spark-ui (greeter-lib)  
**Type:** JavaScript Library  
**Purpose:** Test the full orchestrate loop (develop → review → iterate → merge)

## Requirements

### Foundation (Sequential - Must Complete First)

Create the basic project structure and a core greeting function.

**Files to create:**
- `src/greet.js` - Main greeting module
- `package.json` - Project metadata

**Core function:**
```javascript
// src/greet.js
export function greet(name) {
  if (!name || typeof name !== 'string') {
    return 'Hello, stranger!';
  }
  return `Hello, ${name}!`;
}
```

### Parallel Tasks (After Foundation)

Once the foundation is complete, these two tasks can be implemented in parallel:

#### Task A: Formal Greeting
Add a formal greeting variant.

**Function to add:**
```javascript
export function greetFormal(name) {
  if (!name || typeof name !== 'string') {
    return 'Good day, esteemed guest.';
  }
  return `Good day, ${name}.`;
}
```

#### Task B: Casual Greeting  
Add a casual greeting variant.

**Function to add:**
```javascript
export function greetCasual(name) {
  if (!name || typeof name !== 'string') {
    return 'Hey there!';
  }
  return `Hey ${name}!`;
}
```

## Success Criteria

### For Foundation Task
- [ ] `package.json` exists with name "spark-ui" and version "0.1.0"
- [ ] `src/greet.js` exports a `greet` function
- [ ] `greet('Alice')` returns `'Hello, Alice!'`
- [ ] `greet()` returns `'Hello, stranger!'`

### For Task A (Formal)
- [ ] `greetFormal` function is exported from `src/greet.js`
- [ ] `greetFormal('Bob')` returns `'Good day, Bob.'`
- [ ] `greetFormal()` returns `'Good day, esteemed guest.'`

### For Task B (Casual)
- [ ] `greetCasual` function is exported from `src/greet.js`
- [ ] `greetCasual('Charlie')` returns `'Hey Charlie!'`
- [ ] `greetCasual()` returns `'Hey there!'`

## Technical Constraints

- Pure JavaScript (ES modules)
- No external dependencies
- Single source file (`src/greet.js`)
- Simple input validation (handle null/undefined/non-string)

## Why This Project?

This project is intentionally trivial to:
1. **Fast iteration** - Tasks complete quickly, allowing rapid testing of the orchestration loop
2. **Clear verification** - Success criteria are easily checkable
3. **Predictable behavior** - No complex logic means predictable reviewer feedback
4. **Parallel testing** - Two independent tasks can run simultaneously

The goal is to verify the orchestration system works correctly, not to build a complex application.

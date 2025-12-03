# /plan-product - Product Planning Workflow

> Use this prompt to establish or refine your product vision and roadmap.

## Instructions

I need help planning the product vision and roadmap for **spark-ui**.

Please help me:

1. **Define the Product Vision**
   - What problem does this product solve?
   - Who are the target users?
   - What makes this solution unique?
   - What does success look like?

2. **Identify Core Features**
   - What are the must-have features (MVP)?
   - What features can wait for later versions?
   - What should we explicitly NOT build?

3. **Create a Roadmap**
   - What should we build first?
   - How do features depend on each other?
   - What's a realistic timeline?

## Current Context

Check these files for existing context:
- `docs/product/vision.md` - Current vision (if exists)
- `docs/product/roadmap.md` - Current roadmap (if exists)
- `docs/sprint.yaml` - Current sprint status

## Output

After our discussion, update:
1. `docs/product/vision.md` with the finalized vision
2. `docs/product/roadmap.md` with the prioritized feature list
3. `docs/sprint.yaml` to reflect planning completion

## Questions to Consider

- What's the single most important thing this product must do?
- Who is the ideal first user?
- What would make them love this product?
- What's the simplest version that delivers value?

---

## After Completion

When planning is complete, present a summary and flexible next steps:

```
---
## Summary
---
✓ Defined product vision in docs/product/vision.md
✓ Created roadmap in docs/product/roadmap.md
✓ Updated sprint.yaml to reflect planning phase complete

---
## Next Steps
---

Based on what we've accomplished, here are your options:

1. **Start feature shaping** - Use `/shape-spec` to shape the first high-priority feature
2. **Review the roadmap** - Walk through the features I've proposed
3. **Refine the vision** - Continue discussing product direction

**Quick Actions:**
- Reply "go" or "1" to start shaping the first feature
- Reply with a number to choose that option
- Or tell me what you'd like to adjust or explore

I'll adapt to whatever direction you want to take.
```


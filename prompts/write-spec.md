# /write-spec - Specification Writing Workflow

> Use this prompt to write a detailed feature specification.

## Instructions

I need help writing a detailed specification for a feature in **spark-ui**.

Use the template at `docs/specs/_template.md` as a starting point.

## Specification Sections

### 1. Overview
- Feature name and brief description
- Link to shaping document (if exists)
- Author and date

### 2. Problem Statement
- What user problem are we solving?
- How do users currently work around this?
- Why is this important now?

### 3. Proposed Solution
- How will this work from the user's perspective?
- Include user flows and examples
- Show UI mockups if applicable

### 4. User Stories
Format: "As a [user type], I want to [action] so that [benefit]"

Include acceptance criteria for each story:
- Given [context]
- When [action]
- Then [expected result]

### 5. Technical Approach
- High-level architecture decisions
- Key components and their responsibilities
- Data models and API endpoints
- Dependencies and integrations

### 6. Out of Scope
- Explicitly list what this spec does NOT cover
- Note items for future consideration

### 7. Open Questions
- Unresolved decisions
- Items needing stakeholder input
- Technical unknowns to investigate

## Output

Create the specification file at:
`docs/specs/[feature-name].md`

Update `docs/sprint.yaml`:
- Add the spec to the specs section
- Set status to "in-progress" or "ready"

## Spec Naming and Structure

- Use kebab-case for spec names: `user-authentication`, `button-component`
- For foundational/setup work, create a spec named `foundation`
- Each spec must be added under `specs:` in sprint.yaml (never as a top-level section)

Example sprint.yaml entry:
```yaml
specs:
  my-feature:           # kebab-case name matching the .md file
    status: ready
    file: docs/specs/my-feature.md
```

## Quality Checklist

- [ ] Every requirement is specific and testable
- [ ] Edge cases are documented
- [ ] Technical approach is feasible
- [ ] Scope is appropriate for appetite
- [ ] Dependencies are identified

---

## After Completion

When the spec is complete, present a summary and flexible next steps:

```
---
## Summary
---
✓ Created specification: docs/specs/[feature-name].md
✓ Defined [N] user stories with acceptance criteria
✓ Documented technical approach
✓ Listed out-of-scope items
✓ Updated sprint.yaml with new spec

---
## Next Steps
---

Based on what we've specified, here are your options:

1. **Create implementation tasks** - Use `/create-tasks` to break this into tasks
2. **Review the spec** - Walk through the spec together for feedback
3. **Write another spec** - Shape and spec the next feature
4. **Address open questions** - Resolve unknowns before proceeding

**Quick Actions:**
- Reply "go" or "1" to create implementation tasks
- Reply with a number to choose that option
- Or tell me what you'd like to adjust in the spec

I'll adapt to whatever direction you want to take.
```


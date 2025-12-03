# /create-tasks - Task Creation Workflow

> Use this prompt to break a specification into implementation tasks.

## Instructions

I need help creating implementation tasks for a feature in **spark-ui**.

## Process

1. **Read the Specification**
   - Review the spec in `docs/specs/`
   - Understand all acceptance criteria
   - Note any open questions

2. **Identify Work Units**
   Break the spec into tasks that are:
   - **Independent** - Can be worked on separately
   - **Sized Right** - Completable in 1-4 hours
   - **Testable** - Has clear completion criteria

3. **Sequence Tasks**
   Order by:
   - Dependencies (what must come first?)
   - Risk (tackle unknowns early)
   - Value (deliver user value incrementally)

4. **Define Each Task**
   For each task, specify:
   - Clear description
   - Files to create/modify
   - Acceptance criteria
   - Dependencies on other tasks

## Task Template

```yaml
- id: task-001
  name: [Brief descriptive name]
  description: |
    [What needs to be done]
  files:
    - [file paths to create/modify]
  acceptance_criteria:
    - [Specific, verifiable criteria]
    - [Another criteria]
  depends_on: []  # or [task-id]
  estimate: [1h/2h/4h]
  status: pending
```

## Output

Update `docs/sprint.yaml` with the task list:

```yaml
name: spark-ui - Sprint N
phase: implementing
current_spec: [spec-name]
specs:
  [spec-name]:
    status: in-progress
    tasks:
      - id: task-001
        name: ...
        status: pending
      - id: task-002
        ...
```

## Tips

- Start with scaffolding/setup tasks
- Group related changes together
- Include testing as part of each task, not separate
- Leave room for iteration
- Mark dependencies clearly

---

## After Completion

When tasks are created, present a summary and flexible next steps:

```
---
## Summary
---
✓ Created [N] tasks from the specification
✓ Estimated total effort: [X hours/days]
✓ Identified [N] tasks ready to start (no dependencies)
✓ Updated docs/sprint.yaml with task list

---
## Next Steps
---

Based on the task breakdown, here are your options:

1. **Start implementing** - Use `/implement [task-id]` for sequential implementation
2. **Orchestrate parallel work** - Use `/orchestrate` to launch Cloud Agents
3. **Review task breakdown** - Walk through tasks for feedback
4. **Adjust estimates/scope** - Refine the task definitions

**Quick Actions:**
- Reply "go" or "1" to start implementing the first task
- Reply "orchestrate" to launch parallel agents
- Reply with a number to choose that option
- Or tell me which task you'd like to start with

I'll adapt to whatever direction you want to take.
```


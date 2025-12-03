# /verify - Implementation Verification Workflow

> Use this prompt to verify that implementation matches specification.

## Instructions

I need help verifying the implementation of a feature in **spark-ui**.

## Verification Process

1. **Compare to Specification**
   - Read the spec in `docs/specs/`
   - Check each acceptance criterion
   - Verify user stories are satisfied

2. **Review the Code**
   - Check code quality and standards
   - Look for edge cases
   - Verify error handling

3. **Run Tests**
   - Execute the test suite
   - Check test coverage
   - Verify all tests pass

4. **Manual Testing**
   - Test the happy path
   - Test edge cases
   - Try to break it

## Verification Checklist

### Spec Compliance
- [ ] All acceptance criteria met
- [ ] User stories satisfied
- [ ] Edge cases handled
- [ ] Error states handled

### Code Quality
- [ ] Follows project standards
- [ ] Well-organized and readable
- [ ] Appropriate comments
- [ ] No obvious performance issues

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Test coverage adequate
- [ ] Manual testing complete

### Documentation
- [ ] Spec updated if changed
- [ ] Code documented appropriately
- [ ] sprint.yaml updated
- [ ] README updated if needed

## Output

After verification, update `docs/sprint.yaml`:

```yaml
specs:
  [spec-name]:
    status: done  # or needs-work
    verified: 2025-12-03
    notes: |
      [Any notes about verification results]
```

## If Issues Found

For each issue:
1. Document what doesn't match spec
2. Determine if it's code bug or spec clarification needed
3. Create follow-up tasks if needed
4. Update spec if requirements evolved

## Final Steps

When everything passes:
1. Mark spec as `done` in sprint.yaml
2. Consider if any patterns should go in standards
3. Update roadmap if feature is complete
4. Celebrate!

---

## After Completion

When verification is complete, present a summary and flexible next steps:

```
---
## Summary
---
✓ Verified implementation of [spec-name]
✓ All acceptance criteria met: [N/N]
✓ Code quality review: Passed
✓ Test coverage: [percentage or status]
✓ Updated sprint.yaml - spec marked done

---
## Next Steps
---

Based on the verification results, here are your options:

1. **Start next feature** - Use `/shape-spec` for the next roadmap item
2. **Create more tasks** - Break down another spec with `/create-tasks`
3. **Orchestrate remaining work** - Use `/orchestrate` for parallel development
4. **Update standards** - Document patterns we should reuse

**Quick Actions:**
- Reply "go" or "next" to start the next feature
- Reply "orchestrate" if there are parallel tasks waiting
- Reply with a number to choose that option
- Or tell me what you'd like to do next

I'll adapt to whatever direction you want to take.
```


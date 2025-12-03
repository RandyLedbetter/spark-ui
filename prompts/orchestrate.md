# /orchestrate - Launch Cloud Agents for Parallel Implementation

> Use this workflow to implement multiple independent tasks in parallel using Cursor Cloud Agents.

## What This Does

The `/orchestrate` command analyzes your sprint and launches Cloud Agents to work on independent tasks simultaneously. Each agent:
- Works on a separate branch
- Creates a PR when done
- Can be monitored and managed

## Prerequisites

Before orchestrating:
1. **GitHub repository** - Your project must be connected to GitHub
2. **API key configured** - In `.cursor-agent-os.yaml` or `CURSOR_API_KEY` env var
3. **Tasks defined** - Run `/create-tasks` to populate `docs/sprint.yaml`

## How to Use

### Step 1: I'll Analyze Your Sprint

Let me read your `docs/sprint.yaml` to identify tasks that can run in parallel.

I look for:
- Tasks with `status: pending`
- Tasks with no unmet dependencies (`depends_on` completed)
- Tasks from different specs that are independent

### Step 2: Launch Cloud Agents

Once tasks are identified, I'll run the orchestrate command for you:

```bash
cursor-agent-os orchestrate --auto
```

The `--auto` flag allows non-interactive execution, which is perfect when I'm running commands for you.

**Important:** If the user has "Run Everything" or terminal permissions enabled, run this command directly. Don't just tell them to run it - execute it yourself and report the results.

### Step 3: Monitor Progress

After launching, monitor your agents:

```bash
# List all agents
cursor-agent-os agents list

# Check specific agent
cursor-agent-os agents status <agent-id>

# Verify API key
cursor-agent-os agents verify
```

### Step 4: Review and Merge PRs

When agents complete:
1. Review the PRs they created
2. Merge approved PRs
3. Update `docs/sprint.yaml` to mark tasks done
4. Run `cursor-agent-os orchestrate` again for dependent tasks

## Example Workflow

```
You: /orchestrate

AI: I've analyzed your sprint.yaml. Here's what I found:

    Current Specs:
    - button-component: 2 tasks pending
    - card-component: 2 tasks pending
    - input-component: 3 tasks pending

    Ready for parallel implementation (no dependencies):
    - button-setup (button-component)
    - card-setup (card-component)
    - input-setup (input-component)

    Run this command to launch 3 Cloud Agents:

    $ cursor-agent-os orchestrate

You: [runs the command]

CLI Output:
    ☁️  Orchestrating Cloud Agents

    🔑 Verifying API key...
       ✓ API key valid (my-key-name)

    📋 Analyzing tasks...

    ✓ Found 3 task(s) ready for parallel implementation:

    ───────────────────────────────────────────────
       button-setup: Set up button component structure
       Spec: button-component

       card-setup: Set up card component structure
       Spec: card-component

       input-setup: Set up input component structure
       Spec: input-component
    ───────────────────────────────────────────────

    📦 Repository: github.com/username/project

    Launch 3 Cloud Agent(s)? [Y/n]: y

    🚀 Launching Cloud Agents...

       Launching agent for button-setup...
       ✓ Agent launched: agent-abc123
       Launching agent for card-setup...
       ✓ Agent launched: agent-def456
       Launching agent for input-setup...
       ✓ Agent launched: agent-ghi789

    📊 Summary
       ✓ Launched: 3 agent(s)

    🔍 Monitor Progress
       cursor-agent-os agents list
       cursor-agent-os agents status agent-abc123
       cursor-agent-os agents status agent-def456
       cursor-agent-os agents status agent-ghi789
```

## /implement vs /orchestrate

| Aspect | `/implement [task]` | `/orchestrate` |
|--------|---------------------|----------------|
| Who works | Main agent (me) | Cloud Agents |
| How | Sequential, one task at a time | Parallel, multiple tasks |
| Output | Direct code changes | PRs for review |
| Best for | Dependent tasks, careful oversight | Independent tasks, fast development |
| Requires | Nothing extra | GitHub repo + API key |

## Troubleshooting

### "Cloud Agents not configured"
Add your API key to `.cursor-agent-os.yaml`:
```yaml
cursor_api_key: "your-key-here"
```

Or set environment variable:
```bash
export CURSOR_API_KEY="your-key-here"
```

### "No tasks ready"
- Ensure tasks exist in `docs/sprint.yaml`
- Check that task dependencies are met
- Verify tasks have `status: pending`

### "No GitHub repository"
Set up a remote:
```bash
git remote add origin https://github.com/username/repo.git
```

---

## After Orchestration

When agents are launched, present a summary and flexible next steps:

```
---
## Summary
---
✓ Analyzed sprint.yaml for parallel tasks
✓ Launched [N] Cloud Agent(s)
✓ Agents working on: [list tasks]
✓ PRs will be created when complete

---
## Next Steps
---

Based on the orchestration, here are your options:

1. **Monitor agents** - Run `cursor-agent-os agents list` to check progress
2. **Continue other work** - Work on dependent tasks or other features
3. **Wait for completion** - Agents will create PRs when done
4. **Review early results** - Check if any PRs are ready to merge

**Quick Actions:**
- Reply "status" to check agent status
- Reply "wait" and I'll periodically check for completed PRs
- Reply with a number to choose that option
- Or tell me what you'd like to do while agents work

I'll adapt to whatever direction you want to take.
```

---

Ready to orchestrate? Let me analyze your sprint!

# spark-ui Quick Start Guide

cursor-agent-os v0.2.0 has been set up in your project. Here's how to get started.

---

## Understanding the Setup

Your project now contains:

```
.cursorrules              # Main AI instructions
.cursor/rules/            # Contextual AI rules
docs/product/             # Vision and roadmap
docs/specs/               # Feature specifications  
docs/standards/           # Coding standards
docs/sprint.yaml          # Sprint tracking
prompts/                  # Workflow command prompts
```

**The key insight:** When you type `/command` in Cursor's chat, the AI reads the corresponding prompt file from `prompts/` and follows it.

---

## Your First Session

### 1. Start Planning

Open Cursor's AI chat (Cmd/Ctrl + L) and type:

```
Read prompts/plan-product.md and let's do /plan-product
```

The AI will interview you about:
- What problem you're solving
- Who your users are
- What features are essential

**Output:** Updates `docs/product/vision.md` and `docs/product/roadmap.md`

### 2. Shape Your First Feature

```
Let's do /shape-spec for [your-feature-name]
```

This is a conversation where you and the AI define:
- The problem scope
- Your appetite (time budget)
- Solution approach
- What's in/out of scope

**Output:** A mental model of the feature, ready to document

### 3. Write the Specification

```
Now /write-spec to create the spec document
```

The AI creates a detailed spec in `docs/specs/[feature-name].md` with:
- Overview and goals
- User stories with acceptance criteria
- Technical approach
- Out of scope items

### 4. Create Tasks

```
/create-tasks for [feature-name]
```

The AI breaks your spec into implementable tasks:
- Scaffolding and setup
- Core functionality
- Edge cases
- Testing

**Output:** Tasks added to `docs/sprint.yaml`

### 5. Implement

For sequential work:
```
/implement task-001
```

For parallel work (requires Cloud Agents):
```
/orchestrate
```

### 6. Verify

When implementation is complete:
```
/verify
```

The AI reviews against acceptance criteria and updates status.

---

## Available Commands

| Chat Command | Purpose |
|--------------|---------|
| `/help` | Show all available commands |
| `/plan-product` | Define product vision and roadmap |
| `/shape-spec` | Shape a feature through conversation |
| `/write-spec` | Create detailed specification |
| `/create-tasks` | Break spec into tasks |
| `/implement [id]` | Implement a specific task |
| `/orchestrate` | Launch Cloud Agents for parallel work |
| `/verify` | Review against acceptance criteria |

## CLI Commands

```bash
cursor-agent-os status      # Show sprint progress
cursor-agent-os list        # List all specs
cursor-agent-os new-spec    # Create new spec
cursor-agent-os validate    # Check for issues
cursor-agent-os agents list # Show Cloud Agents
cursor-agent-os help        # Show all commands
```

---

## Tips for Best Results

### 1. Front-Load Context

Before starting a command, give the AI context:
```
Read docs/specs/user-auth.md and the current sprint.yaml, then /implement task-003
```

### 2. Use Next Steps

Each workflow ends with suggested next steps. You can:
- Reply with a number to choose an option
- Reply "accept all" to proceed with defaults
- Reply with specific modifications

### 3. Keep Specs Updated

If implementation reveals new requirements:
```
Let's update docs/specs/[feature].md to include [new requirement]
```

### 4. Track Progress

```bash
cursor-agent-os status
```

Shows your current sprint progress and what's next.

---

## Cloud Agents (Optional)

If you enabled Cloud Agents during setup:

1. **View Agents:** `cursor-agent-os agents list`
2. **Orchestrate:** Use `/orchestrate` to launch parallel agents
3. **Monitor:** Each agent creates a PR when done

Cloud Agents work best for:
- Independent components (UI library)
- Isolated features (separate services)
- Tasks without dependencies

---

## Need Help?

- Type `/help` in Cursor chat for command reference
- Run `cursor-agent-os help` for CLI options
- Check `prompts/` folder to see how each command works

---

Happy building! 🚀

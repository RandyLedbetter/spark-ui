# cursor-agent-os Manual Testing Guide (Orchestrate Flow)

Welcome! This guide walks you through testing **cursor-agent-os** with the `/orchestrate` workflow - using Cloud Agents to build features in parallel.

> **This folder tests the PARALLEL workflow.** For sequential `/implement` testing, see `cursor-agent-os-testing`.

---

## Prerequisites

- Node.js 18+ installed
- Cursor IDE
- **Cursor API Key** (required for Cloud Agents)
- This folder open in Cursor

---

## Installation

Since the package isn't published to npm yet, we'll run it directly from the source.

### Setup (One-time)

Create a shell alias that points to the local source:

```bash
alias cursor-agent-os='node /c/dev/cursor-agent-os/bin/cli.js'
```

Verify it works:
```bash
cursor-agent-os --help
```

You should see the help output with commands and options.

### Make It Permanent (Optional)

Add to your `~/.bashrc` or `~/.bash_profile`:
```bash
echo "alias cursor-agent-os='node /c/dev/cursor-agent-os/bin/cli.js'" >> ~/.bashrc
```

---

**For this guide, we'll use `cursor-agent-os` (the alias you just created).**

---

## Testing Phases

Each phase builds on the previous. Follow them in order.

---

### Phase 1: Pre-Installation Verification

**Goal:** Verify the CLI works before initializing anything.

#### Test 1.1: Check Help Output
```bash
cursor-agent-os --help
```

**Expected:** Clean help output showing:
- Available commands (init, status, list, validate, etc.)
- Options (--yes, --dry-run, --force)
- Examples

#### Test 1.2: Check Version
```bash
cursor-agent-os --version
```

**Expected:** Version number (e.g., `0.2.0`)

#### Test 1.3: Check Status on Empty Folder
```bash
cursor-agent-os status
```

**Expected:** 
- "❌ Not initialized" message
- Suggestion to run `cursor-agent-os init`

---

### Phase 2: Dry Run Preview

**Goal:** See what files would be created WITHOUT creating them.

#### Test 2.1: Preview File Generation
```bash
cursor-agent-os init --dry-run
```

**Expected:** 
- List of ~20 files that would be created
- **No actual files created** (verify with `ls -la`)
- Total file count shown

---

### Phase 3: Initialize with Cloud Agents Enabled

**Goal:** Initialize the project WITH Cloud Agents configured.

#### Test 3.1: Interactive Init (Recommended for this test)
```bash
cursor-agent-os init
```

When prompted:
1. Accept the project name
2. Accept detected settings
3. **Enable Cloud Agents: YES**
4. **Paste your Cursor API key** (get it from Cursor → Settings → Cloud Agents → API Keys)

**Expected:**
- "✅ API key will be saved to .cursor-agent-os.yaml"
- All files created including config

#### Test 3.2: Verify API Key Saved
```bash
cat .cursor-agent-os.yaml
```

**Expected:**
- Your API key is stored (or empty with instructions if skipped)
- `cloud_agents.enabled: true`

#### Test 3.3: Verify .gitignore Protects Key
```bash
cat .gitignore
```

**Expected:**
- `.cursor-agent-os.yaml` is listed

---

### Phase 4: Explore Generated Content

**Goal:** Review what was generated.

#### Test 4.1: Read the Quickstart Guide
```bash
cat QUICKSTART.md
```

#### Test 4.2: Review .cursorrules
```bash
cat .cursorrules
```

Look for the `/orchestrate` command in the workflow commands table.

#### Test 4.3: Check the Orchestrate Prompt
```bash
cat prompts/orchestrate.md
```

This is what the AI reads when you use `/orchestrate`.

---

### Phase 5: CLI Commands on Initialized Project

**Goal:** Test commands that query project state.

#### Test 5.1: Check Status (Should Show Cloud Agents)
```bash
cursor-agent-os status
```

**Expected:**
- "✅ Initialized" indicator
- "☁️ Cloud Agents: Enabled" or "Available"
- "✓ API key configured" (if you added one)

#### Test 5.2: Verify API Key
```bash
cursor-agent-os agents verify
```

**Expected (with valid key):**
- "✅ API key valid"
- Key name and email shown

#### Test 5.3: List Agents
```bash
cursor-agent-os agents list
```

**Expected:**
- Empty list (no agents yet) or list of any existing agents

---

### Phase 6: Creating Specifications for Components

**Goal:** Create independent component specs ideal for parallel development.

#### Test 6.1: Create Multiple Independent Specs
```bash
cursor-agent-os new-spec button-component
cursor-agent-os new-spec card-component
cursor-agent-os new-spec input-component
cursor-agent-os new-spec modal-component
cursor-agent-os new-spec toast-component
cursor-agent-os new-spec avatar-component
```

#### Test 6.2: List All Specs
```bash
cursor-agent-os list
```

**Expected:**
- All 6 components listed with "⏳ pending" status

#### Test 6.3: Check Sprint Status
```bash
cursor-agent-os status
```

**Expected:**
- Shows all 6 specs in the Specifications section

---

### Phase 7: Validation

**Goal:** Ensure project structure is correct.

```bash
cursor-agent-os validate
```

**Expected:**
- All required files present
- Sprint.yaml valid
- May show warnings about specs missing acceptance criteria (that's fine for now)

---

### Phase 8: The Orchestrate Workflow (Main Test)

**Goal:** Test the `/orchestrate` command with Cloud Agents.

Open Cursor's AI chat panel (Cmd/Ctrl + L).

#### Test 8.1: Plan the Product First
```
Read SAMPLE_PROJECT.md and then let's do /plan-product
```

This sets up the vision and roadmap for Spark UI.

#### Test 8.2: Write Specs for Components
For each component, write a detailed spec:
```
Let's do /write-spec for the button-component
```

Repeat for card, input, modal, toast, avatar.

**Tip:** You can do this in batches:
```
Let's do /write-spec for button-component, card-component, and input-component
```

#### Test 8.3: Create Tasks for All Specs
```
/create-tasks for all component specs
```

**Expected:** Tasks created for each component in sprint.yaml

#### Test 8.4: Launch Orchestrate!
```
/orchestrate
```

**Expected behavior:**
1. AI reads `prompts/orchestrate.md`
2. Identifies independent tasks across components
3. Uses Cloud Agents API to spin up parallel agents
4. Each agent works on one component
5. Each agent creates a PR for review
6. Main agent coordinates and reports progress

**Watch for:**
- Agent creation messages
- PR links being generated
- Status updates from agents

#### Test 8.5: Monitor Agent Progress
```bash
cursor-agent-os agents list
```

Check individual agent status:
```bash
cursor-agent-os agents status <agent-id>
```

---

### Phase 9: Compare with Sequential Flow

**Goal:** Understand the difference from `/implement`.

#### Sequential (NOT recommended for this project):
```
/implement button-component-task-1
```
Then wait, then implement the next task, etc.

#### Parallel (IDEAL for this project):
```
/orchestrate
```
All independent components developed simultaneously!

---

### Phase 10: Update Command

**Goal:** Test template updates preserve user content.

#### Test 10.1: Modify a User File
```bash
echo -e "\n\n## Custom Design Tokens\n\nOur brand colors: #FF6B6B, #4ECDC4" >> docs/product/vision.md
```

#### Test 10.2: Run Update
```bash
cursor-agent-os update
```

**Expected:**
- User content preserved in vision.md
- Only safe files updated

---

## Evaluation Checklist

After testing, consider these questions:

### Cloud Agents & Orchestration
- [ ] Was API key configuration intuitive?
- [ ] Did `/orchestrate` recognize independent tasks?
- [ ] Were agents launched in parallel?
- [ ] Were PRs created for each component?
- [ ] Was progress reporting clear?

### Comparison to Sequential
- [ ] Is `/orchestrate` faster for this type of project?
- [ ] Is the PR-based review helpful?
- [ ] Would you use this for real projects?

### Overall
- [ ] What's missing or confusing?
- [ ] What would make it better?

---

## Quick Reference

| Command | What it does |
|---------|--------------|
| `cursor-agent-os init` | Initialize (with API key prompt) |
| `cursor-agent-os status` | Show project + Cloud Agents status |
| `cursor-agent-os agents list` | List all Cloud Agents |
| `cursor-agent-os agents status <id>` | Get specific agent status |
| `cursor-agent-os agents verify` | Verify API key works |
| `/orchestrate` | Launch parallel agents for independent tasks |
| `/implement [task]` | Sequential single-task implementation |

---

## When to Use Each Flow

| Scenario | Recommended Flow |
|----------|-----------------|
| Sequential dependent features | `/implement` |
| Independent parallel features | `/orchestrate` |
| Solo careful development | `/implement` |
| Fast multi-component development | `/orchestrate` |
| Learning/exploring | `/implement` |
| Production sprint | `/orchestrate` |

---

## Clean Up

When done testing:
```bash
cd /c/dev
rm -rf cursor-agent-os-testing-2
```

---

Happy testing with Cloud Agents! ☁️


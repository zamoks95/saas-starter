---
name: create-pr
description: Use when the user wants to commit current work and create a pull request. Runs quality checks (lint, typecheck, tests), commits via commitizen, and opens a PR with context from OpenSpec if available.
---

Create a pull request after running quality gates and committing with conventional commits.

**Prerequisites**: `gh` CLI installed and authenticated (`gh auth login`).

---

**Steps**

1. **Run quality checks (all three in parallel)**

   ```bash
   bun run lint
   bun run typecheck
   bun run test
   ```

   - If ANY check fails: **STOP**. Show the errors to the user. Do NOT proceed.
   - If ALL pass: continue to step 2.

2. **Detect context: OpenSpec or standalone**

   Check if there is an active OpenSpec change being worked on:

   ```bash
   openspec status --json 2>/dev/null
   ```

   **If OpenSpec change is active** (has a current change with tasks in progress):
   - Read the change's `proposal.md` for the "Why" and "What Changes"
   - Read `tasks.md` for what was implemented
   - Derive from these:
     - **Commit type**: Map the change nature to conventional commit type (`feat`, `fix`, `refactor`, `docs`, `chore`, `test`)
     - **Commit scope**: Use the OpenSpec change name or the primary module affected
     - **Commit message**: Summarize what was implemented based on completed tasks
     - **PR title**: Short summary from the proposal (under 70 chars)
     - **PR body**: Use proposal's "Why" + list of completed tasks

   **If NO OpenSpec change** (standalone work):
   - Use **AskUserQuestion** to ask:
     > "What type of change is this and what does it do?"
     Options: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`
   - Ask for a brief description if not obvious from the diff
   - Derive commit message and PR info from the user's answer + git diff

3. **Stage and commit with commitizen**

   Stage the relevant files first:
   ```bash
   git add <specific files>
   ```

   Then run the interactive commit. Since `bun run commit` (`cz`) is interactive, build the commit message yourself using the conventional commit format and commit directly:

   ```bash
   git commit -m "<type>(<scope>): <description>"
   ```

   **IMPORTANT**: Do NOT use `bun run commit` directly — it launches an interactive TUI that cannot be automated. Instead, construct the conventional commit message yourself following the project's commitlint config (`@commitlint/config-conventional`):
   - Format: `<type>(<scope>): <short description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Scope: optional, the module or area affected
   - Description: imperative, lowercase, no period at end

   Husky's commit-msg hook will validate the format via commitlint automatically.

4. **Push and create PR**

   ```bash
   git push -u origin <current-branch>
   ```

   Then create the PR:

   ```bash
   gh pr create --title "<PR title>" --body "$(cat <<'EOF'
   ## Summary
   <bullets from proposal or user description>

   ## What changed
   <list of changes from tasks or diff>

   ## Quality checks
   - [x] Lint passed
   - [x] Typecheck passed
   - [x] Tests passed

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

5. **Return the PR URL to the user**

---

**Guardrails**
- NEVER skip quality checks. All three MUST pass before proceeding.
- NEVER use `--no-verify` on the commit — let Husky hooks run.
- NEVER push to `main` directly. If on `main`, ask the user to create a branch first.
- Stage specific files, not `git add -A` — review what's being committed.
- If on `main` branch, warn the user and ask them to create a feature branch before proceeding.

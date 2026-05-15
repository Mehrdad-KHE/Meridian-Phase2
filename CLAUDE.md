# CLAUDE

Updated: 2026-05-15

## Purpose

This file is the Claude-facing continuation and model-switch prompt for this project.
Use it after model selection, after interruptions, or when continuing work in a project.

## Resume Order

Read the current state from these control files first:

1. `STATE.md`
2. `HANDOFF.md`
3. `TASKS.md`

Read more only if needed:

1. `ARCHITECTURE.md`
2. `RULES.md`
3. `AI_BEHAVIOR.md`
4. `DECISIONS.md`
5. `DO_NOT_TOUCH.md`
6. `CLAUDE.md`

## Work Style

- Work from the control files, not stale chat memory.
- Keep execution light, safe, and local.
- Do not scan unrelated files unless there is a clear reason.
- If the model was just selected, confirm the choice in one short line and continue with the next safe step.
- Do not stay abstract or ask for another round of model picking unless the current choice is genuinely unclear.
- Phase 2 is the active scope for this workspace and must stay inside `D:\Mehrdad\Projects\Meridian\Phase 2`.
- If a request is for Phase 1, do not partially execute it from Phase 2.
- Treat the control files as the recovery source of truth.

## Model Selection Behavior

Prefer the smallest model that can safely finish the task.

- Recommended choice: `gpt-5.4`
  - Best balance for routine multi-step control-file work and repo-grounded edits.
- Faster choice: `gpt-5.4-mini`
  - Best when the task is small, low risk, and mostly documentation sync.
- Safer/more capable choice: `gpt-5.5`
  - Best when the task is ambiguous, multi-step, verification-heavy, or likely to touch several files.

## Switch Prompt Rules

- Always give one recommended choice, one faster choice, and one safer or more capable choice.
- Give one short tradeoff line for each choice.
- End with one direct next action for the user.
- If the best choice is unclear, say so briefly and ask only the one decision that matters.

## Project Control Rules

- Preserve the project's real logic, architecture, and naming.
- Do not rewrite the project from scratch.
- Do not invent missing details.
- Keep the persistent control files current.
- Avoid code changes unless they are explicitly required.

## Required Control Files

Maintain these files when they are missing or stale:

- `MASTER_PROMPT.md`
- `RULES.md`
- `STATE.md`
- `AI_BEHAVIOR.md`
- `ARCHITECTURE.md`
- `TASKS.md`
- `DECISIONS.md`
- `REPORT.md`
- `KNOWN_ISSUES.md`
- `DO_NOT_TOUCH.md`
- `STACK.md`
- `COMMANDS.md`
- `ENVIRONMENT.md`
- `HANDOFF.md`
- `TESTING.md`
- `GIT_RULES.md`
- `SECURITY_RULES.md`

## Required Sections

The control set must cover:

- current architecture
- active tasks
- known issues
- critical rules
- forbidden actions
- current stable state
- continuation and handoff state
- reporting workflow
- testing workflow
- model usage policy
- AI behavior expectations

## Maintenance Rules

- After meaningful work, update `STATE.md`, `TASKS.md`, `REPORT.md`, and `HANDOFF.md`.
- Update `DECISIONS.md` and `KNOWN_ISSUES.md` when needed.
- Keep the project stable, traceable, and easy to recover.
- Refresh the control files before finishing any meaningful task.

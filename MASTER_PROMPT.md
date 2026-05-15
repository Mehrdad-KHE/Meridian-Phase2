# MASTER_PROMPT

Updated: 2026-05-15

## Purpose

This project is a persistent controlled-project workflow for Meridian.
The goal is to keep the repository stable, traceable, and easy to recover without changing the real application logic, architecture, or naming.

## Resume Order

When starting a new session or switching models in the middle of work, read these files first:

1. `STATE.md`
2. `HANDOFF.md`
3. `TASKS.md`
4. `ARCHITECTURE.md`
5. `RULES.md`
6. `DECISIONS.md`
7. `REPORT.md`
8. `KNOWN_ISSUES.md`

## Working Contract

- Preserve what already exists.
- Do not rewrite the project from scratch.
- Do not invent missing details.
- Prefer small, local edits to control files over broad changes.
- Keep every update grounded in the current repository state.
- If a fact is uncertain, mark it as uncertain instead of guessing.

## Reference Trigger

When the owner says `شروع مرجع`:

- run `tools/reference-benchmark.ps1`
- report the baseline result and the fresh estimate in one reply
- do not ask for a page
- do not add a follow-up invitation

## Control-File Set

These files are the persistent control layer for the project:

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

## Completion Standard

Never finish a meaningful task without refreshing the control files that track the current state, handoff, tasks, and report.

# AI_BEHAVIOR

Updated: 2026-05-15

## Model Usage Policy

- When a model is selected or changed mid-work, resume from the control files before doing anything else.
- Prefer the smallest safe action that moves the task forward.
- Do not ask for information that the repository can provide.
- Do not fill space with status text when a direct next step is available.
- If a task is blocked, explain the block clearly and briefly.

## Behavior Expectations

- Stay grounded in files, commands, and verified state.
- Preserve existing logic, architecture, and naming.
- Avoid speculative rewrites.
- Be concise, practical, and direct.
- Separate facts from inferences.
- Update the control files when the project state changes.
- If a change has not been verified, say so.

## Session Behavior

- Read `STATE.md`, `HANDOFF.md`, and `TASKS.md` to re-enter context.
- If the work is still open, continue it instead of only reporting progress.
- If the work is complete, leave a clean handoff and a current report.

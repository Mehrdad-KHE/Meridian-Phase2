# GIT_RULES

Updated: 2026-05-15

## Git Rules

- Do not use destructive reset or checkout operations unless explicitly requested.
- Do not amend commits unless explicitly requested.
- Do not revert unrelated changes.
- Keep changes scoped and reviewable.
- Prefer non-interactive git commands.
- Check the working tree before editing when there is any chance of existing dirty state.

## Handoff Rules

- Stage and commit only after verification when a commit is requested.
- Keep documentation-only work separate from code changes when practical.
- Record the current state in the control files before finishing a meaningful task.

# RULES

Updated: 2026-05-15

## Critical Rules

- Preserve the current application logic, architecture, and naming.
- Do not rewrite the project from scratch.
- Do not guess missing facts when files or source code can resolve them.
- Do not change implementation files unless the task explicitly requires it.
- Do not claim a result is verified unless you actually checked it.
- Keep control files current after meaningful work.
- Keep the repo stable and recoverable.
- Treat root control files as authoritative.
- Phase 2 work must stay inside `D:\Mehrdad\Projects\Meridian\Phase 2`.
- Do not write Phase 1 files, notes, or scripts from Phase 2.
- Do not read or modify unrelated files unless there is a clear Phase 2 reason.

## Forbidden Actions

- Do not move heavy runtime output, caches, or generated artifacts into synced drive locations.
- Do not create disposable runtime state inside the source tree when a local runtime root is required.
- Do not mix unrelated project state into this workspace.
- Do not cross phase boundaries.
- Do not place anything for this agent outside the Phase 2 directory.
- Do not rename or reframe core product concepts unless the owner explicitly requests it.
- Do not delete source files, control files, or evidence files without a clear reason and a recorded trail.
- Do not deliver draft, incomplete, or unverified artifacts as final.

## Operating Rules

- Work one clear step at a time.
- Make the smallest safe change that satisfies the task.
- Keep source changes separate from workflow-document changes.
- If a decision has side effects, surface the tradeoff before acting.
- If the next step is clear and safe, do it instead of only reporting progress.
- If something is blocked or uncertain, say so plainly.
- Treat the control files as the source of truth for session recovery.
- If a message is for the other phase, do not execute it.

## Model Switch Rule

When the model is selected or changed in the middle of work, re-read `STATE.md` and `HANDOFF.md` before continuing.

## Reporting Rule

After meaningful work, update `STATE.md`, `TASKS.md`, `REPORT.md`, and `HANDOFF.md`.

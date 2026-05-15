# HANDOFF

Updated: 2026-05-15

## Continuation State

If work resumes in a new session or after a model change, read these first:

1. `STATE.md`
2. `HANDOFF.md`
3. `TASKS.md`
4. `ARCHITECTURE.md`
5. `RULES.md`
6. `DECISIONS.md`
7. `REPORT.md`
8. `KNOWN_ISSUES.md`

## Current Handoff Summary

- The controlled-project workflow is now established at the repo root.
- The control files are intended to be the recovery path for future work.
- `CLAUDE.md` now captures the Claude continuation and model-switch behavior for mid-work changes.
- Phase 2 is the active scope here and must remain isolated from Phase 1.
- The app implementation was left unchanged.
- The current stable architecture is the local Vite React + TypeScript SPA described in `ARCHITECTURE.md`.
- The current next step is maintenance: keep the control files synchronized with future meaningful work.
- Build verification completed successfully in this session with `npm run build`.
- `pnpm` was not available on PATH in this shell.
- Reference benchmark completed successfully in this session with `tools/reference-benchmark.ps1`.
- Fresh reference estimate: `97.6x fewer tokens per query`.

## Coordination Notes

- Treat Claude and Codex as mirrors inside the same phase only.
- Before making changes, check for in-flight Phase 2 edits.
- If a request belongs to Phase 1, do not partially execute it from Phase 2.
- Record any phase-specific decision here before handoff.

## Handoff Rule

- If the project state changes, refresh the control files before handoff.
- If the work is paused, leave the repo in a recoverable state and record the status here.

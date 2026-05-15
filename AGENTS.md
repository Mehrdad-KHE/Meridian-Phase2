# Codex Project Agent Contract

## Purpose

This workspace is a production-minded prototype for Codex. Keep the source of truth stable, the runtime local, and the recovery path explicit.

## Reference Trigger

- When the owner says `شروع مرجع`, do not ask follow-up questions unless there is a real blocker.
- Run the local benchmark script at `tools/reference-benchmark.ps1`.
- The response must follow this exact shape:
  - `مرجع فعال است.`
  - `عدد: <fresh token-reduction estimate>`
- Do not ask for a page.
- Do not add a follow-up invitation.
- If the benchmark cannot be rerun, use `عدد: نامشخص` plus a short blocker line.

## Platform Scope

- This contract is for Codex.
- Do not use `CLAUDE.md` as the active contract for Codex in this workspace.
- If Claude-specific guidance exists, keep it separate from the Codex path.

## Runtime Rule

- Keep generated graph files and any mirror used for the trigger under `%LOCALAPPDATA%\ElegantRuntime\Meridian Figma Ver`.
- Do not place live runtime output in the synced drive.

## Maintenance Rule

- If the source set changes, update `tools/reference-benchmark.ps1` and refresh the runtime mirror.
- Keep the trigger behavior in sync with `RULES.md`, `HANDOFF.md`, and `MERIDIAN_README.md`.

# STATE

Updated: 2026-05-15

## Current Stable State

- The repository is a local Meridian accounting workflow prototype built with React and TypeScript.
- The application is organized as a single-page app with local state in `app/context/AppContext.tsx`.
- The main navigation flow is:
  - `Workspace`
  - `Documents`
  - `Processing`
  - `Review`
  - `Accountant QA`
  - `Vendors`
  - `Export`
- The app bootstraps from `index.html` -> `src/main.tsx` -> `app/App.tsx`.
- `app/App.tsx` mounts `AppProvider`, `Layout`, screen routing, and the toaster.
- The current source of truth for data models is `app/types/index.ts`.
- The current source of truth for demo and empty state is `app/data/sampleData.ts`.

## Workflow State

- The controlled-project workflow is now active at the repo root.
- The control files are present and should be treated as the recovery layer for future sessions.
- `CLAUDE.md` now carries the Claude continuation and model-switch prompt.
- Phase 2 is the active scope for this workspace: frontend work only.
- Phase 2 must stay contained inside `D:\Mehrdad\Projects\Meridian\Phase 2`.
- The project should stay focused on preserving existing behavior rather than redesigning it.
- Root control files are authoritative; any mirrored copies are secondary references only.

## Runtime State

- Heavy or temporary runtime output must stay out of synced-drive locations.
- Local runtime output should use the required local runtime root when a task needs generated artifacts.
- This session has not added application code.
- This session has updated the workflow control layer only.

## Verification State

- Build verification completed successfully in this session with `npm run build`.
- `pnpm` was not available on PATH in this shell, so the verified command path used npm.
- Reference benchmark completed successfully in this session with `tools/reference-benchmark.ps1`.
- Fresh reference estimate: `97.6x fewer tokens per query`.

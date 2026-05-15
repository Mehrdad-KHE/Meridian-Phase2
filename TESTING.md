# TESTING

Updated: 2026-05-15

## Testing Workflow

1. Run `pnpm build` as the minimum verification step.
2. If a UI or workflow change was made, inspect the app behavior manually after the build.
3. Do not claim success unless the relevant check was actually performed.
4. If the task affects documentation only, note that no app behavior changed and state whether build verification was rerun.

## Verification Rules

- Verify before handoff whenever possible.
- If verification is blocked, record the blocker in `KNOWN_ISSUES.md` and `REPORT.md`.
- Keep the testing notes aligned with the actual repo capabilities.

## Current Testing Status

- `npm run build` passed in this session.
- `pnpm` was not available on PATH in this shell.
- No new automated tests were added in this session.

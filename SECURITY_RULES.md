# SECURITY_RULES

Updated: 2026-05-15

## Security Rules

- Do not store secrets, tokens, or sensitive credentials in the repo.
- Do not expose client or user data in control files unless the task explicitly requires it.
- Do not treat unverified source files as trusted evidence.
- Do not move sensitive or bulky runtime output into synced-drive locations.
- Do not introduce hidden data flows or background uploads through workflow changes.

## Safe Handling

- Keep workflow notes factual and minimal.
- Prefer local inspection over external exposure when data sensitivity matters.
- If a security concern appears, record it in `KNOWN_ISSUES.md` and `REPORT.md`.

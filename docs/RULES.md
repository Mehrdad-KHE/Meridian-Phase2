# Meridian Clean Rules

Updated: 2026-05-14

## Operating Rules

- Work one stage at a time.
- Do not jump ahead.
- Do not mix clients.
- Do not invent extra phases.
- Do not refactor unless explicitly instructed.
- Do not claim success unless validation was performed.
- Use short, factual reports.
- If unsure, stop and report the uncertainty.
- If the user's instruction is logically wrong, say so plainly.
- "گارد فعال" means the response must be execution-backed, not just status text.
- Keep the guard label, but every answer must clearly state what was actually done, what was not done, and why.
- Do not let the guard label replace the work.
- Standard Persian-facing response format:
  - انجام شد:
  - انجام نشد:
  - دلیل / مانع:

## OCR Rules

- OCR reads text only.
- OCR runs once per source file and writes to local cache.
- `tools/ocr_source_text.mjs` is the canonical OCR path.
- `tools/ocr-worker.mjs` is only a compatibility wrapper for older UI calls.
- OCR is not the place to decide whether pages belong together.
- The document protocol decides grouping, splitting, and final row creation.
- If the OCR source changes or the file is unreadable, OCR may run again.
- The document protocol also materializes one local archival PDF per final document.

## Document Rules

- A raw scan may contain one or more documents.
- A document may contain one or more pages or attachments.
- A final document must have one spreadsheet row.
- A final document must have one archival PDF.
- No scanned item may remain without a final disposition.

## Client Rules

- `client_001` is historical.
- `Hub Interior Group Corporation` is active.
- Each client has its own database, outputs, and archive.
- Never let a change intended for one client affect the other.
- Never use a synced drive as the live runtime root; only mirror verified final deliverables there.

## Drift Prevention

- Do not depend on old chat history when control files exist.
- When the workflow drifts, return to `STATE.md`, `HANDOFF.md`, and `TASKS.md`.
- Add new rules to the control files instead of leaving them in chat.

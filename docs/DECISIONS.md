# Meridian Clean Decisions

Updated: 2026-05-14

## Decisions Locked

- Phase 1 is the manual accounting workflow.
- Phase 2 is the automation/backend product built from the manual workflow rules.
- OCR canonical path is `tools/ocr_source_text.mjs`.
- The older OCR worker stays only as a compatibility wrapper for older UI calls.
- Document grouping and split/merge logic belongs to the protocol layer, not OCR.
- OCR results are cached locally and should not be recomputed unless needed.
- Each client gets its own database and outputs.
- Each final document gets one local archival PDF under that client's archive root.
- Synced drive paths are export-only mirrors for approved deliverables, not live runtime roots.
- `client_001` stays historical only.
- `Hub Interior Group Corporation` is the active client.
- The protocol files are the source of truth when chat continuity is weak.

## Working Style Decisions

- Correct terminology matters.
- If the user uses a file/scan/document word incorrectly, correct it gently.
- Do not mix scans, documents, receipts, attachments, and archive PDFs.
- Keep the control files small enough to be readable and useful.
- The guard label is mandatory in Persian-facing replies, but it must always be paired with real execution status.
- A guard label without actual work is a workflow failure.
- Persian-facing replies should use a stable three-part status format: done / not done / reason or blocker.

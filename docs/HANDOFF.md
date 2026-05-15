# Meridian Clean Handoff

Updated: 2026-05-14

## What Was Fixed

- OCR is now anchored to the source-file extraction path instead of depending only on the older interactive worker.
- A source-text OCR helper was added so each file can be read once, cached locally, and reused.
- The older worker now delegates to the canonical OCR path and is only a compatibility wrapper.
- Document protocol files were updated to carry OCR text, field inventory, and archive metadata together.
- The document protocol now also writes one archival PDF per final document under the local runtime archive root.
- Project data is stored per client and synced into the final database tables.

## Current Working Assumptions

- OCR should be the same for phase 1 and phase 2.
- The old OCR worker is only a fallback for interactive or UI-specific use.
- `ocr_source_text.mjs` is the reference OCR path for this project.
- Document protocol is responsible for grouping, separation, and final row creation.

## Continuity Risks

- Do not mix `client_001` with `Hub Interior Group Corporation`.
- Do not treat OCR as the place where document grouping happens.
- Do not rerun OCR unless there is a real reason.
- Do not rely on browser or chat memory when control files exist.

## Next Safe Handoff

- Continue from the control files only.
- If a new stage starts, read `STATE.md`, `HANDOFF.md`, and `TASKS.md` first.
- Only load more files if the control files are not enough.

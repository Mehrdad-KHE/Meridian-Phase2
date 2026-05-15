# Meridian Clean State

Updated: 2026-05-14

## Current Objective

- Lock the document-handling protocol for phase 1 manual accounting and make it the basis for phase 2 automation.
- Keep OCR, document grouping, database storage, and client separation consistent and reusable.

## Active Work

- OCR canonical path is now `tools/ocr_source_text.mjs`.
- The older OCR worker stays only as a compatibility wrapper for UI calls.
- OCR must run once per source file, cache results locally, and write them into the project database.
- Document grouping and split/merge decisions belong to the document protocol layer, not OCR.
- Each final document must become one spreadsheet row and one archival PDF.
- Archival PDFs are generated locally under the runtime archive root, one file per final document.

## Client Boundaries

- `client_001` is historical only.
- `Hub Interior Group Corporation` is the active client.
- No client data may be mixed across cases or outputs.
- Each client keeps its own database, outputs, and archive path.
- Live runtime output must stay local; `G:\My Drive\My Files\Meridian_Clean` is only for verified deliverables or mirrored read-only references.

## Document Definitions

- Raw scan: the incoming file.
- Document: the final working unit that must be resolved.
- Receipt / invoice / bill / statement / warehouse slip / waybill / attachment: possible parts of a document.
- Attachment / appendix: supporting pages that belong to the same document.
- A file may contain one document or multiple documents.
- A document may contain one or more pages and supporting files.

## Core Rules

- Every scanned item must be resolved.
- If pages belong together, keep them together.
- If pages are unrelated, split them.
- If something is unclear, ask the owner first; if still needed, ask Babak later.
- Do not rely on old chat memory when the control files are available.

## OCR Rule

- OCR is text extraction only.
- OCR should not decide document relationships.
- OCR output must be saved once and reused.
- Rerun OCR only when the source changes, readability is poor, or the owner explicitly requests it.

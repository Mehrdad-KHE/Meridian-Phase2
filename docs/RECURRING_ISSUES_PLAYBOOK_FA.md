# Meridian Clean Recurring Issues Playbook

Updated: 2026-05-14

## Purpose

This playbook turns repeated problems from client 1 and client 2 into permanent rules, procedures, and program hooks.

It exists so the same mistake does not have to be rediscovered in chat.

## How To Use

1. Identify the recurring problem pattern.
2. Apply the default rule in this playbook.
3. If the problem is new, add it here before leaving the work.
4. If the rule conflicts with a local habit, the playbook and control files win.
5. If a case-specific exception is approved, record the exception here and in the control files.

## Default Flow

- Raw intake enters the local runtime.
- OCR runs once per source file and stores reusable text locally.
- Document protocol decides whether pages stay together or split apart.
- Each final document becomes one spreadsheet row.
- Each final document becomes one archival PDF.
- Final verified deliverables may be mirrored to Google Drive.
- Live working state stays local.

## Permanent Problem Rules

| Problem pattern | Permanent rule | Program or procedure |
| --- | --- | --- |
| Client mixing | Every client gets its own client key, case key, database, output folder, and archive root. No shared live output. | Enforce client-boundaries in the ingest and export layer. |
| Phase confusion | Phase 1 is manual accounting work. Phase 2 is the automation product built from the manual rules. Do not rename one as the other in live work. | Keep phase labels in the control files and use them consistently in code and reports. |
| OCR reruns | OCR runs once per source file and is reused from local cache. Rerun only if the source changes, readability is poor, or the owner explicitly asks. | Canonical OCR path is the source-text OCR helper. |
| Scan vs document confusion | A raw scan is input only. A document is the final working unit. A receipt is only one possible document type. | The document protocol owns the final document model. |
| Multi-page grouping | Related pages and attachments stay in one document. Unrelated pages are split into separate documents. | Grouping and split logic must live outside OCR. |
| Missing business number on supplier docs | Do not guess. Leave blank unless the number is clearly printed on the source invoice or receipt. | Extract only what is visible on source material. |
| Date format drift | Normalize all output dates to `yyyy-mm-dd`. Preserve raw text if needed for audit. | Date normalization must happen before spreadsheet export. |
| Negative amounts | Keep the sign in the source record, but present the row in red for accountant review instead of rewriting the amount. | Mark the spreadsheet row red and keep the negative value visible in the source record and database. |
| Bank reference pages | Bank support pages are not expense lines. Keep them as support only unless they are part of a larger document bundle. | Mark as support or attach to the related document. |
| Survey and ad headers/footers | Do not treat advertising headers or footers as separate documents if they belong to a receipt page. | Preserve the receipt body and ignore the decorative wrapper. |
| Duplicate files | Exact duplicates are removed or collapsed. Near duplicates are reviewed before merging. | Duplicate detection must be explicit and logged. |
| Stale archive residue | Before rebuilding a client's final archive, clear old archive PDFs for that client so stale files do not survive beside the new final set. | Rebuild into a clean archive root or remove old PDFs before materializing the new final documents. |
| Unclear documents | Nothing remains undecided. Ask the owner first. If it is still an accounting decision, ask Babak later. | Review queue must capture the uncertainty and the next decision owner. |
| Control-file drift | State, handoff, tasks, rules, and decisions are the source of truth. Chat memory is not. | Update control files first, then code or exports. |
| Root vs mirror | The project root control files are the authority. The synced-drive mirror is secondary and must never become the live working source. | Write control changes to the project root first, then mirror them only if needed. |
| Final deliverables | Only verified final deliverables may go to the synced-drive mirror. Draft, working, preview, or unverified output stays local. | Use the local runtime path for active work and the mirror only for approved delivery. |
| Guard output | Guard is a response format and execution check, not a substitute for work. | Every answer must state what was done, what was not done, and why. |
| Live runtime on synced drive | Do not run live execution on Google Drive or sync folders. Only final verified deliverables may be mirrored there. | Keep runtime state under `%LOCALAPPDATA%\ElegantRuntime`. |
| Review backlog | Anything not confidently resolved goes to review, not into the final deliverable by guess. | Review queue must remain explicit and traceable. |
| Parallel project mode | Multiple projects may run at the same time only when each one has its own client key, case key, database, archive path, and deliverable folder. | Keep the project key explicit before any parallel execution. |
| Pre-delivery gate | Every final deliverable must pass a checklist before it is mirrored or handed off. | Write and keep `pre-delivery-checklist.md` and `pre-delivery-checklist.json` beside the client output. |
| Client key enforcement | Ingest and processing must stop if the manifest client key is missing or does not match the requested client. | Require an explicit client key before document protocol execution. |

## Current Client Defaults

- `client_001` is historical only.
- `Hub Interior Group Corporation` is active.
- Never let a change intended for one client affect the other.
- If a rule is learned from one client and is genuinely reusable, move it into this playbook.
- If a rule becomes global, it must also be mirrored into the control files.

## Source Control

- Update this playbook when a recurring issue appears more than once.
- Do not leave recurring fixes only in chat.
- If a code change depends on this playbook, update the control files first and then the code.

## Anti-Waffle Lock

- Do not respond with filler when a safe next action exists.
- If the next step is clear, execute it instead of narrating it.
- If a blocker exists, name the blocker briefly and stop there.
- Every answer must either move the project forward or clearly state why it cannot.
- Progress comments are allowed only when they are tied to a real execution step.
- Repeating the same point in new words is not allowed unless it changes the decision or unlocks the work.

## Final Rule

- Every repeated problem must end up as a reusable rule, procedure, or program hook.
- No raw scan, receipt, attachment, or archive file may remain without a final path.
- No recurring issue may remain as a one-off chat memory only.
- No unverified or draft artifact may be treated as final.

## Document Character Rules

These rules apply when the source itself is a mixed or ambiguous document bundle.

### Receipt, Invoice, And Support Page Bundles

- A receipt may be part of a larger document bundle.
- An invoice may carry the supplier identity and tax number even when the receipt body does not.
- A bank reference page is support, not an expense line, unless the bundle makes it part of a larger document.
- A survey header or footer does not cancel the receipt body if the receipt text is present on the same page.
- If a file contains both a receipt body and decorative or survey text, keep the receipt body and ignore the wrapper text.

### Multi-Part Documents

- If pages belong to the same transaction, keep them in one document.
- If the pages are separate transactions, split them into separate documents.
- If an attachment, waybill, slip, note, or appendix explains the same transaction, keep it with the document.
- If the pages are unrelated, do not force them together.
- If the relationship is unclear, mark it for review instead of guessing.

### Duplicate Resolution

- If multiple source files have the same OCR signature, they belong to one duplicate group.
- Keep one canonical copy per duplicate group unless a later page is clearly the cleaner source.
- Prefer the earliest readable original source unless a clearer later scan is the same document and is visibly better.
- If a duplicate group contains a truly different page or attachment, split it back out and do not collapse it.
- Record the kept source and the removed or redundant copies in the review note or duplicate manifest.
- Exact duplicate groups should not create multiple final spreadsheet rows.

### Missing Or Partial Source Data

- If the source has no clear date, keep the row empty until the date can be confirmed.
- Prefer dates in this order: explicit row date, labeled document date, transaction/posting date, source-file date, then title/file-name date.
- Do not borrow a date from an unrelated support page.
- For multi-page packages, use the date from the primary transaction page or the clearest labeled page.
- Store the date source with the record so the row can be audited later.
- If the source has no clear supplier business number, leave it blank unless a matching invoice clearly shows it.
- If the source has no clear payment method, leave the field empty instead of inferring it.
- If the source has a bank or card clue only, keep the clue as a clue, not as a final account number.
- If the document is readable but incomplete, preserve the missingness and send the row to review.

### Operational Outcome

- Each document character rule must end in one of these outcomes:
  - keep together
  - split apart
  - support only
  - review needed
  - blank field preserved

## Negative Amount Procedure

When a source line is negative:

1. Keep the minus sign in the source row.
2. Do not convert it to a positive expense.
3. Mark the spreadsheet row red for review.
4. If the negative line offsets a prior charge from the same vendor or account, link it to that prior item in the review note.
5. If the source does not clearly show the reason, send it to review instead of guessing.
6. For accountant handoff, keep the red row visible and do not add a separate explanation unless the document already supports one.

## What To Tell The Accountant

- "This row is highlighted in red for review."
- "If it offsets a prior charge, match it to that prior charge."
- "If the reason is unclear, leave it for review."

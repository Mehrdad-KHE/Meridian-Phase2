We are continuing the Meridian design.

Important role definition:
You are the product organizer and UX designer.
You are not the product owner.
Do not invent a different product direction.
Use the logic below as the source of truth and organize the product around it.

Goal:
Redesign and organize Meridian as a clean, QuickBooks-familiar, local-first accounting workflow assistant.

Meridian should not feel like:
- a technical dashboard
- a pile of tools
- an OCR control panel
- a backup utility
- a wizard that traps the user

Meridian should feel like:
- an operational accounting assistant
- a step-by-step workflow
- easy to go forward
- easy to go back
- easy to add or correct documents later
- clear about what the system did automatically
- clear about what still needs human decision

Core workflow:
1. App opens with a simple branded opening / welcome screen.
2. User starts or continues an engagement.
3. User selects or creates Accountant / Firm.
4. User selects or creates Client.
5. User selects Period.
6. User uploads documents.
7. System reads documents, checks fingerprints, detects duplicates and better scans.
8. System resolves safe/high-confidence items automatically.
9. Only exceptions go to Review.
10. User can change decisions manually.
11. User can ask Accountant when needed.
12. Accountant answer returns to Review as evidence only.
13. Final decision always happens in Review.
14. If new documents arrive later, user returns to Documents.
15. Only new/changed/affected items are reprocessed.
16. Export gives final package only when ready.
17. If not ready, only Draft Review Package is available.

Important correction loop:
This is not a one-way wizard.
The user must be able to go back to earlier stages without losing work.

Support:
- Add more documents later
- Replace with better scan
- Reopen a previous decision
- Change category/vendor/account code
- Reprocess only affected items
- Export status updates after changes

Please design a top workflow roadmap / stepper:
Home → Engagement Setup → Documents → Processing → Review → Accountant Q&A → Export

Visual idea:
Use connected step blocks, like rectangles that interlock with triangle notches:
- each step looks connected to the next
- current step is highlighted
- completed steps show checkmark
- locked future steps are muted
- previous steps are clickable
- forward steps only activate when requirements are met

This roadmap should reduce the need for many separate navigation buttons.

Important distinction:
Workflow Roadmap = where the user is in the process.
Context Bar = which engagement is active.

Context Bar should show:
Firm → Client → Period

Example:
Botax Accounting → Babak Mohammadhosseini → 2025 Annual

Opening / Welcome screen:
Create a simple branded opening screen for Meridian.
It should feel professional and calm.
It can show:
- Meridian logo/name
- short product sentence
- Start New Engagement
- Continue Existing Engagement
- Recent engagements

Do not make it flashy or time-consuming.
It should feel like a professional accounting app opening screen.

Accounting setup requirement:
Meridian must include a proper area for accounting standards and mappings.

Create a business-facing area, not technical settings, for:
- GIFI codes
- standard accounting codes
- Chart of Accounts
- vendor rules
- category mappings
- account codes
- export mappings
- software-specific mappings such as QuickBooks-compatible columns

This area should allow:
- viewing codes
- adding allowed custom codes
- editing mappings
- assigning vendor/category/account code rules
- saving export templates

Suggested name:
Accounting Setup

Inside Accounting Setup:
1. Vendor Rules
2. Chart of Accounts
3. GIFI / Standard Codes
4. Export Mapping
5. Saved Templates

Do not hide GIFI / accounting codes inside System / Advanced.
They are business/accounting configuration, not technical debug settings.

Documents screen:
Documents must support intake and correction.

Show:
- upload documents
- select folder
- read status
- needs fix
- duplicate detected
- better scan detected
- included / on hold / excluded

When a new file is uploaded:
- fingerprint it
- compare with existing documents
- if exact duplicate: warn user
- if better scan: ask before replacing
- never replace silently

Processing:
Processing is only progress/status.
It should show:
- reading documents
- OCR / extraction
- checking duplicates
- classifying
- matching categories/accounts
- preparing review items

It should clearly distinguish:
- processing all documents
- processing new documents
- reprocessing changed documents
- reprocessing affected documents after mapping/code changes

Review:
Review is only for exceptions and final human decisions.

Review must answer:
- why is this here?
- what does Meridian recommend?
- what evidence supports it?
- confidence level
- what decision is needed?

Actions:
- Accept Recommendation
- Change Category
- Ask Accountant
- Mark as Support Only
- Exclude
- Reopen Decision
- Replace with Better Scan if relevant

Grouped review:
Group similar items, but do not make one giant mixed group.
Split groups by useful decision type:
- same vendor
- same category
- duplicate/better scan
- unclear scanner documents
- same account code issue
- same GIFI/code mapping issue

Accountant Q&A:
This is evidence only.
It is not a decision screen.

Do not use labels like:
- Applied
- Resolved
- Completed

Use:
- Awaiting Response
- Answer Available
- Returned to Review
- Evidence Added

Final decision always happens in Review.

Export:
Export should have clear states:
1. Ready
2. Needs Attention
3. Needs Update

Ready:
Download Accountant Package

Needs Attention:
Show blockers:
- unresolved review
- unanswered accountant question
- unreadable document
- duplicate conflict
- missing required client/period/accounting code info

Allow:
Download Draft Review Package

Needs Update:
Show what changed since last export:
- new documents added
- category changed
- vendor rule changed
- GIFI/account code mapping changed
- better scan replaced

Actions:
- Reprocess & Update Export
- Download Previous Package if available

Excel / Export configuration:
Design a simple export configuration area.

The accountant review Excel should support configurable columns.

Default template:
- Document ID
- Date
- Vendor
- Amount
- Suggested Category
- Final Category
- Account Code
- GIFI Code
- HST/GST flag
- Confidence
- Review Status
- Notes
- Source File
- Accountant Question Reference

Allow:
- choose columns
- reorder columns
- save template
- choose accounting software export format
- QuickBooks-compatible format
- Generic CSV
- Accountant Review Excel

Help / Documentation:
Design the Help structure, but do not write full help content yet.

Help should be a standard program help center, not clutter on each page.

Main screens should only show very short helper text.

Help sections:
- Getting Started
- Workflow Guide
- Engagement Setup Guide
- Documents & Upload Guide
- OCR / Document Reading Guide
- Review & Decisions Guide
- Accountant Q&A Guide
- Export Package Guide
- Backup / Restore Guide
- Troubleshooting
- Accounting Terminology
- GIFI / Accounting Codes Guide

System / Advanced:
Only technical/admin tools go here:
- Backup / Restore
- OCR worker status
- OCRmyPDF / Tesseract status
- trace/debug/logs
- version
- data location
- raw backup/import/export utilities

Do not put normal accounting setup here.

Design rules:
- Each screen has one primary responsibility.
- User always knows next action.
- Buttons have stable positions.
- Primary next action should be consistent.
- Disabled buttons must explain why.
- Any long operation must show progress.
- While processing, other conflicting actions should be disabled.
- Notifications must not disturb layout.
- Use short text, not long explanations.
- Button colors must reflect action meaning:
  - blue = primary/continue
  - green = success/ready/accept
  - amber = needs attention
  - red = danger/exclude/delete
  - gray = secondary/back/details

Please produce:
1. Updated product workflow map
2. Updated correction loop map
3. Updated top roadmap / stepper design
4. Updated screen list
5. Updated wireframes for:
   - Opening / Home
   - Engagement Setup
   - Documents
   - Processing
   - Review
   - Accountant Q&A
   - Accounting Setup
   - Export
   - System / Advanced
   - Help
6. Export configuration flow
7. GIFI / accounting code setup flow
8. Manual override flow
9. Add-new-documents-later flow
10. Help / Documentation architecture
11. Clear notes for what should be visible vs hidden
12. Clear implementation notes for future Codex handoff

Do not create Codex handoff yet.
Do not start implementation.
Do not add unrelated features.
First show the updated design and workflow for review.
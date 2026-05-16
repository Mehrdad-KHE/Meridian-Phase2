# Meridian — Codex Implementation Handoff v3 (FINAL)

**Version**: v3 Final  
**Date**: 2026-05-12  
**Status**: ✅ APPROVED FOR IMPLEMENTATION  

---

## Executive Summary

Meridian is a **local-first accounting workflow assistant** with a **correction loop model** supporting bidirectional navigation, incremental reprocessing, and exception-based review.

**Core Innovation**: Users can return to any workflow stage, add/edit content, and reprocess only affected items without losing previous work.

---

## Source of Truth Files

### ✅ Authoritative Design Files (USE THESE)

1. **MERIDIAN_DESIGN_V2_FINAL.md** — Complete design specification
2. **MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md** — Core workflow wireframes
3. **MERIDIAN_ADDITIONAL_WIREFRAMES.md** — Accounting Setup, GIFI, Export Config, System/Advanced
4. **MERIDIAN_ROADMAP_FINAL.md** — Workflow roadmap visual design
5. **MERIDIAN_HELP_ARCHITECTURE_FINAL.md** — Help structure (placeholder implementation for MVP)
6. **MERIDIAN_EXPERT_UX_REVIEW.md** — Final design review, clarifications, edge cases
7. **CODEX_IMPLEMENTATION_HANDOFF_V3_FINAL.md** — THIS FILE

### ❌ Superseded Files (IGNORE THESE)

1. ❌ MERIDIAN_DESIGN_V1.md
2. ❌ MERIDIAN_DESIGN_V2.md
3. ❌ MERIDIAN_DESIGN_V2_REVISED.md
4. ❌ MERIDIAN_VISUAL_WIREFRAMES.md
5. ❌ MERIDIAN_VISUAL_WIREFRAMES_V2.md
6. ❌ CODEX_IMPLEMENTATION_HANDOFF.md
7. ❌ CODEX_IMPLEMENTATION_HANDOFF_V2.md
8. ❌ MERIDIAN_WORKFLOW_ROADMAP_UPDATE.md (replaced by MERIDIAN_ROADMAP_FINAL.md)
9. ❌ Any files not listed in "Authoritative Design Files"

---

## Tech Stack

- **React 18.3.1** + TypeScript
- **React Router 7.13.0** for client-side routing
- **Tailwind CSS v4** for styling
- **IndexedDB** for local-first storage
- **Lucide React** for icons

---

## CRITICAL: Preserve Existing Engines

### Existing Capability Preservation Rule

**DO NOT downgrade existing working engines into mocks.**

If OCR, extraction, processing automation, accounting rules, grouped review logic, Q&A evidence flow, export generation, or backup/restore capabilities already exist, they **MUST be preserved and reconnected** behind the approved UI.

### Implementation Approach

**If existing engines present**:
- **Preserve** all working logic
- **Reconnect** to new UI screens
- **Adapt** interfaces if needed (maintain functionality)

**If no existing engines**:
- Implement stubs with TODO comments
- Use mock data for now
- Mark areas for future development

---

## Screen List (18 Screens)

### Core Workflow (8 screens)
1. **Opening/Welcome Screen** — Recent engagements, start new engagement
2. **Setup: Firm Selection** — Select or add firm/accountant
3. **Setup: Client Selection** — Select or add client
4. **Setup: Period Selection** — Select accounting period
5. **Documents** — Upload documents, view status, filter by state
6. **Processing** — Progress bar, processing status, results summary
7. **Review** — Exception-based review, grouped items, evidence panels, decisions
8. **Export** — Export readiness status, package download, format selection

### Accounting Configuration (6 screens)
9. **Accounting Setup** — Main menu with cards for 6 subsections
10. **Vendor Rules** — Pattern matching rules for vendor categorization
11. **Chart of Accounts** — View/add/edit account codes
12. **GIFI Codes** — View/add standard GIFI codes (Canadian tax reporting)
13. **Category Mapping** — Map categories → account codes → GIFI codes
14. **Export Mapping** — QuickBooks-specific column mappings

### Export & Q&A (2 screens)
15. **Export Configuration** — Customize export columns, save templates
16. **Accountant Q&A** — Questions sent to accountant, evidence integration

### System (2 screens)
17. **System/Advanced** — Backup/restore, OCR settings, diagnostics, version info
18. **Help** — 12-section help placeholder (content TBD phase 2)

---

## Workflow Order & Roadmap States

### Workflow Stages (7 stages in roadmap)

```
Home → Setup → Documents → Processing → Review → Q&A → Export
```

### Roadmap State Calculation

| Current Stage | Home | Setup | Documents | Processing | Review | Q&A | Export |
|---------------|------|-------|-----------|------------|--------|-----|--------|
| **home** | current | accessible | locked | locked | locked | locked | locked |
| **setup** | completed | current | locked | locked | locked | locked | locked |
| **documents** | completed | completed | current | locked | locked | locked | locked |
| **processing** | completed | completed | completed | current | locked | locked | locked |
| **review** | completed | completed | completed | completed | current | locked | locked |
| **qa** | completed | completed | completed | completed | completed | current | locked |
| **export** | completed | completed | completed | completed | completed | completed | current |

**Key Rules**:
- **Completed stages**: Always clickable (bidirectional navigation)
- **Current stage**: Emphasized, not clickable
- **Locked stages**: Not clickable, tooltip explains why
- **Badge**: Review stage shows count when current and items > 0

---

## Roadmap Behavior

### Visual Design (from MERIDIAN_ROADMAP_FINAL.md)

**Pattern**: Connected rectangular blocks with subtle connector bars

**States**:
1. **Completed**: Green (`#059669`), white check icon, clickable
2. **Current**: Blue (`#3B82F6`), white dot icon, larger, glowing, not clickable
3. **Accessible**: Dark gray (`#1F2937`), circle outline, clickable
4. **Locked**: Very dark (`#0F1419`), lock icon, not clickable, tooltip

**Badge**: Amber circle (`#F59E0B`) on Review stage when `currentStage === 'review'`

**Connector Bars**: 3px height, 12px width, color matches source block

**See**: MERIDIAN_ROADMAP_FINAL.md for complete visual specification

---

## Correction Loop Behavior

### Core Principles

1. **Bidirectional Navigation**:
   - User can return to Documents at any time (always accessible in sidebar)
   - User can return to Review after Export
   - Completed stages in roadmap are clickable

2. **Incremental Reprocessing**:
   - Only affected documents reprocessed
   - Unchanged work preserved
   - Change tracking system detects what needs reprocessing

3. **Export Reactivity**:
   - Export status updates when changes detected
   - Three states: Ready, Needs Attention, Needs Update
   - User can download draft export even when blockers exist

### Key Scenarios

#### Scenario 1: Add Documents After Export
1. User on Export screen (Ready state)
2. User clicks Documents in sidebar
3. User uploads 3 new documents
4. System detects change, Export state → "Needs Update"
5. User navigates to Processing (or auto-triggers)
6. Processing screen shows "Processing 3 new documents"
7. After processing, Review shows only new exceptions (if any)
8. Export state remains "Needs Update" until user acknowledges changes

#### Scenario 2: Change Category After Review
1. User on Export screen
2. User clicks Review in sidebar
3. User reopens a resolved item
4. User changes category decision
5. System marks item as changed
6. Export state → "Needs Update"
7. User can reprocess or continue to Export
8. Export package reflects new decision

#### Scenario 3: Change Vendor Rule
1. User changes vendor rule in Accounting Setup
2. System identifies X documents affected by rule change
3. Shows "X documents affected, reprocess?" confirmation
4. If user confirms, affected documents reprocess
5. Review shows new exceptions (if any)
6. Export state → "Needs Update" if previously ready

---

## Sidebar / Subnavigation

### Sidebar Structure (Always Visible)

```
┌─────────────────────────┐
│ ≡ MERIDIAN              │
├─────────────────────────┤
│ 🏠 Home                 │
├─────────────────────────┤
│ Current Engagement:     │
│ • Documents             │ ← Always accessible
│ • Review                │ ← Always accessible
│ • Export                │ ← Always accessible
├─────────────────────────┤
│ Accounting Setup        │ ← Opens submenu
│ System / Advanced       │
│ Help                    │
└─────────────────────────┘
```

**Behavior**:
- Sidebar always visible (never hidden)
- Documents, Review, Export always accessible (correction loop)
- "Accounting Setup" expands to show 6 subsections
- Current screen highlighted in sidebar

### Accounting Setup Submenu

When "Accounting Setup" clicked, expands to show:
- Vendor Rules
- Chart of Accounts
- GIFI Codes
- Category Mapping
- Export Mapping
- Saved Templates

---

## Button Labels & Actions

### Documents Screen
| Button | Action | State |
|--------|--------|-------|
| "Select Files" | Opens file picker | Always enabled |
| "Continue to Processing" | Navigate to /processing | Enabled when documents uploaded |
| "Back" | Navigate to /setup/period | Always enabled |

### Processing Screen
| Button | Action | State |
|--------|--------|-------|
| "Go to Review" | Navigate to /review | Enabled when processing complete |

### Review Screen
| Button | Action | State |
|--------|--------|-------|
| "Accept Recommendation" | Accept system suggestion, mark item resolved | Enabled when item expanded |
| "Change Category" | Open category picker, change assignment | Enabled when item expanded |
| "Ask Accountant" | Navigate to /accountant-qa, pre-fill question | Enabled when item expanded |
| "Exclude from Accounting" | Mark document excluded, remove from export | Enabled when item expanded |
| "Replace with Better Scan" | Open file picker for replacement document | Enabled when item expanded |
| "Continue to Export" | Navigate to /export | Enabled when all items resolved |
| "Back" | Navigate to /processing | Always enabled |

### Accountant Q&A Screen
| Button | Action | State |
|--------|--------|-------|
| "Return to Review" | Navigate back to /review | Enabled when question answered |
| "Back to Review" | Navigate to /review | Always enabled |

### Export Screen
| Button | Action | State |
|--------|--------|-------|
| "Download Accountant Package" | Generate and download Excel package | Enabled when Ready |
| "Download QuickBooks CSV" | Generate and download CSV | Enabled when Ready |
| "Download Generic CSV" | Generate and download generic CSV | Enabled when Ready |
| "Go to Review to resolve items" | Navigate to /review | Enabled when Needs Attention |
| "Download Draft Package" | Download draft even with blockers | Enabled when Needs Attention |
| "Back" | Navigate to /review | Always enabled |

---

## States (Disabled, Loading, Completed, Error)

### Loading States

#### Document Upload
- Show progress bar during upload
- Display file name being uploaded
- Show "Uploading X of Y files..."
- Disable "Continue to Processing" until upload complete

#### Processing
- Show progress bar with percentage
- Display current step ("Reading documents", "Extracting text", etc.)
- List completed steps with checkmarks
- Disable navigation until processing complete

#### Export Generation
- Show spinner with "Generating export package..."
- Disable download buttons during generation
- Show success message when complete

### Error States

#### Upload Failure
- Show error message: "Failed to upload [filename]: [reason]"
- Reasons: File too large, unsupported format, storage full
- Provide "Retry" button
- Log error for troubleshooting

#### OCR Failure
- Mark document as "Needs Fix"
- Show in Documents screen with warning icon
- Explanation: "This document couldn't be read. Try replacing with a clearer scan."
- Provide "Replace with Better Scan" action

#### Processing Failure
- Show error message: "Processing failed: [reason]"
- Provide "Retry Processing" button
- If persistent, suggest contacting support
- Log error details for troubleshooting

#### Export Generation Failure
- Show error message: "Failed to generate export: [reason]"
- Provide "Retry" button
- Suggest checking browser console for details
- Log error for troubleshooting

### Completed States

#### Processing Complete
- Show success message with green checkmark
- Display summary statistics:
  - "Documents read successfully: X"
  - "Documents auto-classified: Y"
  - "Documents need review: Z"
- Enable "Go to Review" button

#### All Review Items Resolved
- Export status → "Ready to Export"
- Show green success banner
- Enable download buttons

#### Export Downloaded
- Show toast notification: "Export package downloaded"
- Keep user on Export screen (can download again if needed)

### Disabled States

#### Continue to Processing (Documents)
- Disabled when no documents uploaded
- Tooltip: "Upload at least one document to continue"

#### Continue to Export (Review)
- Disabled when unresolved review items exist
- Tooltip: "Resolve all review items before exporting"

#### Download Buttons (Export)
- Disabled when export state is "Needs Attention" or "Needs Update"
- Exception: "Download Draft" button remains enabled

---

## Help Placeholder Behavior

### MVP Implementation (Phase 1)

**Help Screen**:
- Accessible from sidebar at all times
- Shows 12 section titles (from MERIDIAN_HELP_ARCHITECTURE_FINAL.md)
- Clicking section shows placeholder: "Help content coming soon. This section will cover [brief description]."
- Close button returns to previous screen
- Scrollable list of sections

**Behavior**:
- No search functionality in MVP
- No actual help content (placeholder only)
- Structure in place for future content population

**Section Titles** (clickable but show placeholder):
1. Getting Started
2. Workflow Guide
3. Engagement Setup Guide
4. Documents & Upload Guide
5. OCR / Document Reading Guide
6. Review & Decisions Guide
7. Accountant Q&A Guide
8. Export Package Guide
9. Backup / Restore Guide
10. Troubleshooting
11. Accounting Terminology
12. GIFI / Accounting Codes Guide

---

## Accounting Setup / GIFI / Export Mapping Behavior

### Accounting Setup (Main Screen)

**Layout**: Card-based grid with 6 cards
- Vendor Rules
- Chart of Accounts
- GIFI Codes
- Category Mapping
- Export Mapping
- Saved Templates

**Behavior**:
- Click card navigates to detail screen
- Shows badge if incomplete (e.g., "No vendor rules defined")
- Shows count if populated (e.g., "12 vendor rules")

### GIFI Codes Screen

**Purpose**: View and manage GIFI codes for Canadian tax reporting

**Layout**:
- List of standard GIFI codes with descriptions
- Search/filter bar at top
- "Add Custom Code" button (advanced users only)

**Behavior**:
- Standard codes shown by default (read-only)
- User can add custom codes (rare, advanced use case)
- Click code to view which categories/accounts map to it
- Validation: GIFI code must be 4 digits

**Common GIFI Codes** (examples to show):
- 8000: Gross Revenue
- 8811: Subcontracts
- 9060: Office Expenses
- 9220: Vehicle Expenses
- 8523: Advertising and Promotion

### Category Mapping Screen

**Purpose**: Map expense categories → account codes → GIFI codes

**Layout**:
- Table with columns: Category, Account Code, GIFI Code, Tax Treatment
- "Add Mapping" button
- Search/filter bar

**Behavior**:
- Click row to edit mapping
- Dropdown for category selection
- Dropdown for account code selection
- Dropdown for GIFI code selection
- Checkbox for tax deductibility
- Save button validates all fields

### Export Mapping Screen

**Purpose**: QuickBooks-specific column mappings

**Layout**:
- List of export columns with toggle switches
- Drag handles to reorder columns
- "Save as Template" button

**Behavior**:
- Toggle columns on/off for export
- Drag to reorder (visual feedback during drag)
- Save template with name
- Load template from dropdown

**Default Columns** (16 total):
1. Document ID
2. Date
3. Vendor
4. Amount
5. Suggested Category
6. Final Category
7. Account Code
8. GIFI Code
9. HST/GST Flag
10. Confidence Score
11. Review Status
12. Processing Date
13. Notes
14. Source File
15. Document Fingerprint
16. Accountant Question Reference

### Vendor Rules Screen

**Purpose**: Define pattern-matching rules for vendor categorization

**Layout**:
- List of rules with pattern, category, confidence
- "Add Rule" button
- Search/filter bar

**Behavior**:
- Click rule to edit
- Pattern types: Exact, Contains, Starts With, Regex
- Test pattern against sample vendor names
- Assign category, account code, GIFI code
- Set confidence level (0-100%)
- Enable/disable rule toggle

**Validation**:
- Pattern required
- Category required
- Confidence must be 0-100%
- Warn if multiple rules match same vendor (priority system)

---

## System / Advanced: What Must Stay Hidden

### System/Advanced Screen Purpose

**ONLY for technical/admin tools**, NOT business configuration.

**What belongs here**:
- ✅ Backup & Restore
- ✅ OCR Engine Settings (OCRmyPDF, Tesseract)
- ✅ Diagnostics (logs, debug mode, performance stats)
- ✅ Data Management (storage usage, cache clearing)
- ✅ Version Information (app version, IndexedDB version)
- ✅ Advanced Developer Tools (if applicable)
- ✅ Export Raw Data (JSON dump for debugging)

**What does NOT belong here**:
- ❌ Vendor Rules (belongs in Accounting Setup)
- ❌ Category Mappings (belongs in Accounting Setup)
- ❌ GIFI Codes (belongs in Accounting Setup)
- ❌ Export Configuration (belongs in Export screen)
- ❌ Chart of Accounts (belongs in Accounting Setup)

**Warning Message**:
Display at top of System/Advanced screen:
> "⚠️ Advanced Settings — Most users don't need to change anything here. Business configuration (vendors, categories, codes) is in **Accounting Setup**."

---

## What Codex Must NOT Add

### Do Not Add These Features (Out of Scope)

1. ❌ **Cloud sync or server-side storage** — Meridian is local-first only
2. ❌ **User authentication or accounts** — No login system, single-user local app
3. ❌ **Multi-user collaboration** — Single user per browser/device
4. ❌ **Mobile native apps** — Web app only (responsive web design is fine)
5. ❌ **AI/ML model training** — Use existing OCR/extraction engines if present, stubs if not
6. ❌ **Real-time accountant messaging** — Q&A is asynchronous (send question, get answer later)
7. ❌ **Payment processing** — No monetization features
8. ❌ **Analytics tracking** — No telemetry or usage analytics (privacy-first)
9. ❌ **Automated tax filing** — Export only, no direct CRA/IRS integration
10. ❌ **Bank account integration** — Document upload only, no live bank feeds

### Do Not Change These Design Decisions

1. ❌ Do not convert to one-way wizard (correction loop is core)
2. ❌ Do not auto-apply accountant answers (evidence only, user decides)
3. ❌ Do not hide sidebar (always visible for bidirectional navigation)
4. ❌ Do not remove "Exclude from Accounting" option (user needs escape hatch)
5. ❌ Do not remove draft export option (user needs progress checkpoints)
6. ❌ Do not add confirmation dialogs for every action (only for destructive actions)
7. ❌ Do not change roadmap state logic (completed stages must be clickable)
8. ❌ Do not move business config to System/Advanced (stays in Accounting Setup)

---

## Acceptance Criteria (Per Screen)

### 1. Opening/Welcome Screen
- ✅ Shows Meridian logo and tagline
- ✅ "Start New Engagement" button prominently placed
- ✅ Recent engagements list (if any) with status colors
- ✅ Clicking engagement resumes workflow
- ✅ Empty state message when no engagements

### 2-4. Setup Screens (Firm, Client, Period)
- ✅ Selection dropdowns populated (or empty state)
- ✅ "Add New" buttons open modal forms
- ✅ Modal forms validate required fields
- ✅ "Continue" button advances to next step
- ✅ "Back" button returns to previous step
- ✅ Progress shown in roadmap (Home → Setup → ...)

### 5. Documents Screen
- ✅ Drag-and-drop upload works
- ✅ File picker button works
- ✅ Tabs filter documents by status
- ✅ Document list shows status icons
- ✅ "Continue to Processing" enabled when documents uploaded
- ✅ Roadmap shows Documents as current

### 6. Processing Screen
- ✅ Progress bar shows percentage
- ✅ Current step label updates during processing
- ✅ Step list shows checkmarks for completed steps
- ✅ Summary statistics shown when complete
- ✅ "Go to Review" button enabled when complete
- ✅ Roadmap shows Processing as current

### 7. Review Screen
- ✅ Only exceptions shown (grouped items)
- ✅ Expandable items show evidence panels
- ✅ All decision buttons functional
- ✅ "Ask Accountant" navigates to Q&A
- ✅ "Continue to Export" enabled when all resolved
- ✅ Roadmap shows Review as current, badge shows count

### 8. Export Screen
- ✅ Status banner shows Ready/Needs Attention/Needs Update
- ✅ Download buttons work for all formats
- ✅ Draft export available when blockers exist
- ✅ "Go to Review" button navigates correctly
- ✅ Roadmap shows Export as current

### 9-14. Accounting Setup Screens
- ✅ Main screen shows 6 cards
- ✅ Clicking card navigates to detail screen
- ✅ Detail screens allow view/add/edit/delete
- ✅ Validation prevents invalid data
- ✅ Changes saved to IndexedDB
- ✅ Accessible from sidebar at all times

### 15. Export Configuration Screen
- ✅ Column checkboxes toggle columns
- ✅ Drag handles reorder columns
- ✅ "Save as Template" stores configuration
- ✅ Template dropdown loads saved templates
- ✅ Changes apply to next export

### 16. Accountant Q&A Screen
- ✅ Questions list shows status
- ✅ Answered questions show answer panel
- ✅ "Return to Review" navigates correctly
- ✅ Roadmap shows Q&A as current

### 17. System/Advanced Screen
- ✅ Warning message displayed at top
- ✅ Backup button exports engagement data
- ✅ Restore button imports engagement data
- ✅ OCR settings (if applicable) shown
- ✅ Version information displayed

### 18. Help Screen
- ✅ Shows all 12 section titles
- ✅ Clicking section shows placeholder content
- ✅ Scrollable list
- ✅ Close button returns to previous screen

### Global (All Screens)
- ✅ Sidebar always visible
- ✅ Roadmap shows correct current stage
- ✅ Roadmap clickable stages navigate correctly
- ✅ Dark theme applied consistently
- ✅ Responsive layout (desktop, tablet, mobile)
- ✅ No page scrolling (only content areas scroll)
- ✅ Action buttons fixed at bottom

---

## Implementation Priorities

### Priority 1: Core Workflow (Must Have for MVP)
1. Opening/Welcome Screen
2. Setup Screens (Firm, Client, Period)
3. Documents Screen
4. Processing Screen (with stubs if no engine)
5. Review Screen (with mock data if no engine)
6. Export Screen (basic download functionality)
7. Sidebar navigation
8. Workflow roadmap component

### Priority 2: Configuration (Should Have for MVP)
1. Accounting Setup main screen
2. Vendor Rules screen (basic CRUD)
3. Category Mapping screen (basic CRUD)
4. Help placeholder screen

### Priority 3: Advanced Features (Nice to Have)
1. GIFI Codes screen
2. Export Configuration screen
3. Accountant Q&A screen
4. Chart of Accounts screen
5. System/Advanced screen
6. Backup/Restore functionality

### Priority 4: Enhancements (Post-MVP)
1. Help content population
2. Search functionality
3. Keyboard shortcuts
4. Advanced export templates
5. Performance optimizations

---

## Final Implementation Notes

### IndexedDB Schema (If Implementing Storage)

**Stores**:
- `engagements` — Engagement metadata (firm, client, period)
- `documents` — Uploaded documents (file data, status, metadata)
- `decisions` — User decisions from Review
- `rules` — Vendor rules, category mappings
- `questions` — Accountant Q&A questions and answers
- `exports` — Export history and configurations
- `settings` — User preferences, app settings

### Error Handling

**General Principle**: Show user-friendly error messages, log technical details for troubleshooting.

**User-Facing Errors**:
- "Something went wrong. Please try again."
- "This document couldn't be read. Try replacing it with a clearer scan."
- "Upload failed: File too large (max 10MB)"
- "Export generation failed. Please check your browser console."

**Technical Logging**:
- Log errors to browser console with full stack trace
- Include context (which action, which document, etc.)
- Consider IndexedDB error log for persistence

### Performance Considerations

**Large Document Sets**:
- Virtualize long document lists (only render visible items)
- Paginate review items if > 50 items
- Process documents in batches if possible

**Responsive Design**:
- Mobile: Horizontal scroll for roadmap
- Tablet: Adjust content width
- Desktop: Full width, comfortable spacing

### Testing Checklist

- ✅ Can create new engagement
- ✅ Can upload documents
- ✅ Can process documents (or see stub)
- ✅ Can review items (or see mock data)
- ✅ Can navigate backward (correction loop)
- ✅ Can export package
- ✅ Roadmap updates correctly
- ✅ Sidebar navigation works
- ✅ All buttons functional
- ✅ Error states display correctly
- ✅ Loading states display correctly
- ✅ Data persists in IndexedDB
- ✅ Dark theme applied throughout

---

## Final Approval

**Implementation Handoff Status**: ✅ **APPROVED AND FINALIZED**

**Approved By**: Senior Product Designer  
**Approval Date**: 2026-05-12

**Ready for Codex**: YES

**Estimated Complexity**: Medium-High (correction loop adds complexity, but well-specified)

**Estimated Timeline**: 
- Priority 1 (Core Workflow): 2-3 weeks
- Priority 2 (Configuration): 1-2 weeks
- Priority 3 (Advanced Features): 2-3 weeks
- **Total MVP**: 5-8 weeks

---

**File Status**: ✅ FINAL — This is the authoritative implementation handoff

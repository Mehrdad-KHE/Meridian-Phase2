# Meridian Design v2
**Accounting Workflow Assistant**

**Status**: Design refinement incorporating workflow flexibility and manual override capabilities

**Supersedes**: MERIDIAN_DESIGN_V1.md

---

## Design Philosophy

Meridian remains a **step-by-step workflow assistant** for accounting document preparation, NOT a technical dashboard.

### Core Principles
- Simple, sequential workflow for the primary path
- User never feels trapped—can always go back, add more, or override
- Technical details hidden by default, available when needed
- Accountant-friendly terminology and structure
- Exception-based review (system handles routine, user decides exceptions)
- Evidence-driven decisions (show why, not just what)

---

## Workflow Map

```
HOME
  ↓
ENGAGEMENT SETUP (Firm → Client → Period)
  ↓
DOCUMENTS INTAKE ←─────────┐
  ↓                        │ (can return to add more)
PROCESSING                 │
  ↓                        │
REVIEW ←───────────────────┘
  ↓
EXPORT

User can:
- Return to Home anytime via "← Back to Home" link
- Click context bar breadcrumb to change Firm/Client/Period
- Return to Documents to upload more files
- Return to Review after resolving blockers
- Override any system decision via document actions or Review buttons
```

---

## Navigation Model

### Global Navigation

**Top Bar (always visible)**
```
┌────────────────────────────────────────────────────────┐
│ ← Back to Home     MERIDIAN                            │
└────────────────────────────────────────────────────────┘
```

**Context Bar (after engagement setup)**
```
┌────────────────────────────────────────────────────────┐
│ [Botax Accounting] → [Babak Mohammadhosseini] → [2025 Annual] │
└────────────────────────────────────────────────────────┘
```
- Each part is **clickable**
- Click Firm name → change/select firm
- Click Client name → change/select client  
- Click Period → change/select period

**Screen Navigation**
```
Home
Engagement Setup
Documents ←── (always accessible to add more)
Processing (auto-triggered when new documents uploaded)
Review ←── (always accessible to revisit decisions)
Export
─────────────
Setup & Rules (accountant configuration)
System / Advanced (technical features)
Help (placeholder)
```

---

## Key Workflow Refinements

### 1. Re-entering Workflow

**When user adds new documents after moving forward:**

```
New documents uploaded
  ↓
System fingerprints new files
  ↓
Checks for duplicates/better scans
  ↓
If better scan detected → Ask user: "Replace previous version?"
  ↓
OCR + Extract only new documents
  ↓
Classify new documents
  ↓
Add new exceptions to Review (old decisions unchanged)
  ↓
Update Export readiness status
```

**Key behaviors:**
- Old completed documents NOT reprocessed
- Only new or affected items enter Review
- Export status auto-updates based on new Review items
- User can upload documents at any time, even after Export

### 2. Manual Override Paths

**Document-Level Actions (in Documents screen)**

Each document has "⋮" menu:
- View Details
- Change Category
- Mark as Support Only
- Exclude from Accounting
- Ask Accountant
- Replace with Better Scan

**Review-Level Actions (in Review screen)**

Each review item has buttons:
- Accept Recommendation (green)
- Change Category (neutral)
- Ask Accountant (blue)
- Exclude from Accounting (neutral)
- Replace with Better Scan (neutral)

**Reopen from Export**

If user wants to revisit a decision:
- Click "Return to Review" in Export screen
- Review shows all items (including previously accepted)
- User can reopen any item and change decision
- Export status updates accordingly

### 3. Accountant-Controlled Configuration

**Setup & Rules Screen** (replaces "Vendors / Rules")

Three main sections:

**A. Vendor Rules**
- Auto-categorization rules learned from documents
- Example: "Petro-Canada → Vehicle Fuel (95% confidence)"
- User can edit, add, or remove vendor rules

**B. Categories & Account Codes**
- Shows chart of accounts
- Each category has editable account code
- Example:
  ```
  Vehicle Fuel Expense     [5400]
  Office Supplies          [5200]
  Meals & Entertainment    [5350]
  ```
- User can add custom categories
- User can define custom account code structure

**C. Export Mapping**
- Configure column names for export
- Map Meridian fields to accounting software fields
- Select accounting software preset (QuickBooks, Xero, etc.)
- Custom mapping for advanced users

### 4. Export Table Configuration

**Export screen includes "Configure Export" button**

**Configuration Modal:**
```
┌──────────────────────────────────────────────────────┐
│ Export Configuration                            [×]  │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Template: [Default Accountant Review ▼]             │
│                                                      │
│ Columns to Include:                                  │
│ ☑ Document ID                                        │
│ ☑ Date                                               │
│ ☑ Vendor                                             │
│ ☑ Amount                                             │
│ ☑ Suggested Category                                 │
│ ☑ Final Category                                     │
│ ☑ Account Code                                       │
│ ☐ HST/GST Flag                                       │
│ ☐ Confidence Score                                   │
│ ☑ Review Status                                      │
│ ☐ Notes                                              │
│ ☑ Source File                                        │
│ ☐ Accountant Question Reference                     │
│                                                      │
│ [Save as New Template]                               │
│                            [Cancel]  [Apply]        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Export Templates:**
- Default Accountant Review Template (pre-configured)
- QuickBooks Import Template
- Generic CSV Template
- Custom templates saved by user

---

## Screen Designs (Updated)

### 0. Home

**Responsibility**: Welcome and engagement selection

**Navigation**:
- Primary: [Start New Engagement] or [Continue] on existing engagement
- Can access System/Advanced or Help from here

**Changes from v1**:
- No changes needed

---

### 1. Engagement Setup (Firm → Client → Period)

**Responsibility**: Configure engagement context

**Navigation**:
- "← Back to Home" link at top
- [Back] button to go to previous setup step
- [Continue] to next setup step
- After Period selection: [Continue to Documents]

**Context Bar**:
- Builds progressively: shows Firm → Client → Period as selected
- Each part becomes clickable after initial selection

**Changes from v1**:
- Add "← Back to Home" link at top of all setup screens
- Make context bar parts clickable to allow changing selection

---

### 2. Documents

**Responsibility**: Upload and manage documents

**Navigation**:
- "← Back to Home" link at top
- Context bar clickable: [Firm] → [Client] → [Period]
- [Upload More Documents] button (always visible)
- [Continue to Processing] (when new documents pending)
- Tabs: All / Read / Needs Fix / Duplicates / Excluded

**Document List**:
Each document shows:
- Icon (status indicator)
- Filename
- Status badge
- "⋮" menu button

**Document Actions Menu (⋮)**:
- View Details
- Change Category
- Mark as Support Only
- Exclude from Accounting
- Ask Accountant
- Replace with Better Scan

**Status Display**:
```
32 documents processed successfully
0 documents pending processing

[Upload More Documents]
```

**Changes from v1**:
- Add "← Back to Home" link
- Make context bar clickable
- Add "⋮" menu to each document
- Show document count status
- "Upload More Documents" always available
- Add "Excluded" tab

---

### 3. Processing

**Responsibility**: Show processing status for new documents only

**Navigation**:
- "← Back to Home" link at top
- Context bar clickable
- Cannot manually go back during processing
- Auto-advances to Review when complete

**Display**:
- Progress bar
- Current step indicator
- Processing count: "Processing 5 new documents..."
- Summary when complete

**Changes from v1**:
- Add "← Back to Home" link
- Show count of documents being processed
- Clarify "new documents" vs total documents

---

### 4. Review

**Responsibility**: Resolve exceptions and make final decisions

**Navigation**:
- "← Back to Home" link at top
- Context bar clickable
- [Back to Documents] button (to add more files)
- [Continue to Export] button (advances when ready)
- Can access at any time to revisit decisions

**Review Items**:
Each item shows:
- Exception reason
- Evidence panel
- Confidence score
- Recommendation
- Action buttons:
  - Accept Recommendation (green, primary)
  - Change Category (neutral)
  - Ask Accountant (blue)
  - Exclude from Accounting (neutral)
  - Replace with Better Scan (neutral)

**Status Display**:
```
6 items need your attention
26 items auto-classified
```

**Changes from v1**:
- Add "← Back to Home" link
- Add [Back to Documents] button
- Clarify that user can return here anytime
- Show count of auto-classified items for context

---

### 5. Accountant Q&A

**Responsibility**: Track questions sent to accountant for evidence

**Navigation**:
- "← Back to Home" link at top
- Context bar clickable
- [Return to Review] button (for answered questions)
- [Back to Review] button (general)

**Question Cards**:
Each shows:
- Status badge (Awaiting Answer / Answered / Cancelled)
- Question text
- Related documents
- Accountant's answer (if answered)
- [Return to Review] button (if answered)

**Changes from v1**:
- Add "← Back to Home" link
- Clarify that answered questions should return to Review for final decision

---

### 6. Setup & Rules

**Responsibility**: Accountant-controlled configuration

**Navigation**:
- "← Back to Home" link at top
- Context bar clickable (if in engagement context)
- Tabs or sections:
  - Vendor Rules
  - Categories & Account Codes
  - Export Mapping

**A. Vendor Rules Section**:
```
┌────────────────────────────────────────────────────┐
│ Vendor Rules                                       │
├────────────────────────────────────────────────────┤
│                                                    │
│ Petro-Canada → Vehicle Fuel Expense (95%)          │
│ [Edit Rule]                                        │
│                                                    │
│ Staples → Office Supplies (88%)                    │
│ [Edit Rule]                                        │
│                                                    │
│ [Add New Vendor Rule]                              │
└────────────────────────────────────────────────────┘
```

**B. Categories & Account Codes Section**:
```
┌────────────────────────────────────────────────────┐
│ Categories & Account Codes                         │
├────────────────────────────────────────────────────┤
│                                                    │
│ Vehicle Fuel Expense          [5400]  [Edit]       │
│ Office Supplies               [5200]  [Edit]       │
│ Meals & Entertainment         [5350]  [Edit]       │
│ Capital Equipment             [1600]  [Edit]       │
│                                                    │
│ [Add New Category]                                 │
└────────────────────────────────────────────────────┘
```

**C. Export Mapping Section**:
```
┌────────────────────────────────────────────────────┐
│ Export Mapping                                     │
├────────────────────────────────────────────────────┤
│                                                    │
│ Accounting Software: [QuickBooks ▼]                │
│                                                    │
│ Column Mapping:                                    │
│ Date          → Transaction Date                   │
│ Vendor        → Payee                              │
│ Amount        → Amount                             │
│ Category      → Account                            │
│ Account Code  → Account Number                     │
│                                                    │
│ [Edit Mapping]  [Reset to Default]                │
└────────────────────────────────────────────────────┘
```

**Changes from v1**:
- Renamed from "Vendors / Rules" to "Setup & Rules"
- Added Categories & Account Codes section
- Added Export Mapping section
- All accountant configuration in one place

---

### 7. Export

**Responsibility**: Generate final accountant package

**Navigation**:
- "← Back to Home" link at top
- Context bar clickable
- [Back to Review] button
- [Configure Export] button (opens modal)

**Two States:**

**A. Ready to Export** (all review items resolved):
```
┌────────────────────────────────────────────────────┐
│ ✓ Ready to Export                                  │
│ All review items resolved. Your package is ready.  │
└────────────────────────────────────────────────────┘

Export Options:
- Accountant Review Package (Excel)
- QuickBooks-Compatible CSV
- Generic CSV Export

[Configure Export]  [Download Accountant Package]
```

**B. Needs Attention** (blockers exist):
```
┌────────────────────────────────────────────────────┐
│ ⚠ Needs Attention                                  │
│ Some items need to be resolved.                    │
│                                                    │
│ Blockers:                                          │
│ • 3 unresolved review items                        │
│ • 1 unanswered accountant question                 │
└────────────────────────────────────────────────────┘

[Go to Review to Resolve Items]

Or download a draft version:
[Download Draft Review Package]
```

**Export Configuration Modal**:
(See "Export Table Configuration" section above)

**Changes from v1**:
- Add "← Back to Home" link
- Add [Configure Export] button
- Add [Back to Review] button
- Keep two clear states (Ready vs Needs Attention)

---

### 8. System / Advanced

**Responsibility**: Technical features and system management

**Navigation**:
- "← Back to Home" link at top

**Sections**:
- Backup / Restore
- OCR Worker Status
- OCRmyPDF / Tesseract Configuration
- Trace / Debug Logs
- Storage Management
- System Information

**Changes from v1**:
- Add "← Back to Home" link
- No other changes needed

---

### 9. Help

**Responsibility**: Documentation and user guidance (placeholder)

**Planned Structure** (not implemented yet):
- User Guide
- Workflow Guide
- Screen-by-Screen Help
- Troubleshooting
- Accounting Terminology
- Import / Export Guide
- OCR & Document Reading
- Backup / Restore Guide

**Current Display**:
```
Coming Soon
Documentation and help resources will be available here.
```

**Changes from v1**:
- Document planned structure
- Keep as placeholder for now

---

## Data Model Updates

### Document Status Values

Add new status:
- `excluded` - User manually excluded from accounting

### Document Actions History

Track user overrides:
```typescript
interface DocumentAction {
  id: string;
  documentId: string;
  action: 'change_category' | 'exclude' | 'mark_support_only' | 'ask_accountant' | 'replace';
  oldValue?: string;
  newValue?: string;
  reason?: string;
  timestamp: Date;
  userId?: string;
}
```

### Export Template

```typescript
interface ExportTemplate {
  id: string;
  name: string;
  columns: ExportColumn[];
  isDefault: boolean;
  accountingSoftware?: 'quickbooks' | 'xero' | 'sage' | 'generic';
}

interface ExportColumn {
  field: string; // Meridian field name
  label: string; // Column header in export
  mappedTo?: string; // Accounting software field name
  enabled: boolean;
  order: number;
}
```

### Category Configuration

```typescript
interface Category {
  id: string;
  name: string;
  accountCode: string;
  type: 'expense' | 'income' | 'asset' | 'liability';
  isCustom: boolean;
  parentCategory?: string;
}
```

---

## UX Guidelines for Refinements

### Navigation Principles

1. **Never trap the user**: Always provide clear path back
2. **Context bar is navigation**: Make breadcrumb clickable
3. **"← Back to Home" always visible**: User can always start over or switch engagement
4. **State follows user**: Returning to Documents doesn't lose Review decisions

### Override Principles

1. **System suggests, user decides**: Confidence score shows strength of suggestion
2. **Override is not failure**: Manual changes are normal workflow
3. **Evidence justifies suggestion**: User sees why system suggested something
4. **Clear action buttons**: No ambiguity about what each button does

### Configuration Principles

1. **Sensible defaults**: System works without configuration
2. **Configuration optional**: Power users can customize
3. **Configuration non-destructive**: Can reset to defaults
4. **Configuration contextual**: Available where relevant, hidden otherwise

### Re-entry Principles

1. **Incremental processing**: Only process new/changed documents
2. **Preserve completed work**: Old decisions stay unless explicitly changed
3. **Ask before replacing**: Don't auto-replace documents without confirmation
4. **Update not restart**: Export status updates, doesn't require full restart

---

## Implementation Notes for Codex

### Critical Requirements

1. **Clickable Context Bar**: Each part of breadcrumb must be clickable link
2. **Document Actions Menu**: Each document needs "⋮" button with action menu
3. **Incremental Processing**: Must track which documents are new vs existing
4. **Export Configuration**: Must support customizable column selection
5. **Better Scan Detection**: Must fingerprint and compare document similarity

### Workflow State Machine

```
ENGAGEMENT_SETUP → DOCUMENTS_UPLOADED → PROCESSING → REVIEW_PENDING
                      ↑                                    ↓
                      └────── (add more) ─────────────────┘
                                                           ↓
                                                    READY_TO_EXPORT
```

User can move freely between states. State determines what actions are available.

### Navigation Rules

- "← Back to Home" available everywhere except Home
- Context bar clickable after engagement setup complete
- Document actions menu available in Documents screen
- Review accessible even after Export (to reopen items)
- Setup & Rules accessible anytime (not engagement-specific)

---

## What Has Changed from v1

### New Features
1. Clickable context bar navigation
2. Document-level actions menu (⋮)
3. Ability to add documents after moving forward
4. Incremental processing (new docs only)
5. Setup & Rules with accountant configuration
6. Categories & Account Codes management
7. Export configuration modal
8. Export template system
9. "← Back to Home" link everywhere

### Enhanced Features
1. Review can be reopened from Export
2. Documents screen shows status counts
3. "Upload More Documents" always available
4. Better scan replacement asks user first
5. Export has "Configure Export" option

### Unchanged Core
- Step-by-step primary workflow
- Exception-based review
- Evidence-driven decisions
- Dark, minimal design
- Accounting-friendly terminology
- Simple, not technical

---

## Approval Required Before Implementation

This design specification must be reviewed and approved before:
1. Updating visual wireframes
2. Updating Codex implementation handoff
3. Beginning any code implementation

Once approved, MERIDIAN_DESIGN_V1.md will be marked as deprecated.

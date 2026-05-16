# Meridian Design v2 (Revised)
**Accounting Workflow Assistant**

**Status**: Design refinement with navigation, naming, and context-aware actions improvements

**Supersedes**: MERIDIAN_DESIGN_V2.md, MERIDIAN_DESIGN_V1.md

**Revision Date**: 2026-05-11

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
- Return to Home anytime via sidebar
- Click context bar breadcrumb to change Firm/Client/Period
- Return to Documents to upload more files
- Return to Review after resolving blockers
- Override any system decision via document actions or Review buttons
```

---

## Navigation Model (Revised)

### Sidebar Navigation (Always Visible)

```
┌─────────────────────────┐
│ ≡ MERIDIAN              │
├─────────────────────────┤
│ 🏠 Home                 │
├─────────────────────────┤
│ Current Engagement:     │
│ • Documents             │
│ • Review                │
│ • Export                │
├─────────────────────────┤
│ Accounting Setup        │
│ System / Advanced       │
│ Help                    │
└─────────────────────────┘
```

**Sidebar Behavior:**
- Always accessible (not hidden)
- "Home" always available as first item
- Current engagement section shows active workflow screens
- Configuration screens (Accounting Setup, System, Help) always accessible

### Context Bar (After Engagement Setup)

```
┌────────────────────────────────────────────────────────┐
│ [Botax Accounting] → [Babak Mohammadhosseini] → [2025 Annual] │
└────────────────────────────────────────────────────────┘
```

**Context Bar Behavior:**
- Each part is **clickable**
- Click Firm name → opens firm selector to change firm
- Click Client name → opens client selector to change client
- Click Period → opens period selector to change period
- Appears on all workflow screens after setup complete

### Local Step Navigation

**Back buttons only for local workflow steps:**
- Setup screens: [Back] to previous setup step
- Modal dialogs: [Cancel] or [×] to close
- No large "Back to Home" links cluttering screens

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

### 2. Manual Override Paths (Context-Aware)

**Document-Level Actions (in Documents screen)**

Actions shown depend on **document state**:

**Unreadable Document:**
```
⋮ Menu:
- Re-upload Document
- Hold for Manual Entry
- Exclude from Accounting
```

**Readable Categorized Document:**
```
⋮ Menu:
- View Details
- Change Category
- Mark as Support Only
- Ask Accountant
- Exclude from Accounting
```

**Duplicate / Better Scan Candidate:**
```
⋮ Menu:
- Compare with Original
- Replace Previous Version
- Keep Both Documents
- Exclude from Accounting
```

**Document in Review:**
```
⋮ Menu:
- View in Review
- Change Category
- Ask Accountant
- Exclude from Accounting
```

**Excluded Document:**
```
⋮ Menu:
- View Details
- Include in Accounting
```

**Support-Only Document:**
```
⋮ Menu:
- View Details
- Include in Accounting
- Change Category
```

**Context-Aware Principles:**
- Show only actions that make sense for current state
- Don't overwhelm user with irrelevant options
- Keep menu short and focused
- Common actions (View Details, Exclude) appear across states

### 3. Review-Level Actions

Each review item has buttons:
- Accept Recommendation (green, primary)
- Change Category (neutral)
- Ask Accountant (blue)
- Exclude from Accounting (neutral)
- Replace with Better Scan (neutral)

### 4. Reopen from Export

If user wants to revisit a decision:
- Click "Return to Review" in Export screen
- Review shows all items (including previously accepted)
- User can reopen any item and change decision
- Export status updates accordingly

### 5. Accountant-Controlled Configuration

**Accounting Setup Screen** (renamed from "Setup & Rules")

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

### 6. Export Table Configuration

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

---

## Screen Designs (Updated)

### 0. Home

**Responsibility**: Welcome and engagement selection

**Layout:**
- Sidebar visible with "Home" highlighted
- Main content: Start new engagement + recent engagements list
- No context bar (not in an engagement yet)

**Navigation:**
- Sidebar always accessible
- [Start New Engagement] → Engagement Setup (Firm)
- [Continue] on engagement → Goes to appropriate workflow screen

**No changes from v2** except sidebar presence.

---

### 1. Engagement Setup (Firm → Client → Period)

**Responsibility**: Configure engagement context

**Layout:**
- Sidebar visible
- Context bar builds progressively as user selects
- Main content: Selection cards or form

**Navigation:**
- Sidebar: Home always accessible
- Setup flow: [Back] button to previous setup step
- [Continue] or [Select] to next step
- After Period: [Continue to Documents]

**Context Bar Building:**
- After Firm selected: `[Botax Accounting]`
- After Client selected: `[Botax Accounting] → [Babak M.]`
- After Period selected: `[Botax Accounting] → [Babak M.] → [2025 Annual]`

**Changes from v2:**
- No large "Back to Home" link
- Sidebar visible with Home accessible
- [Back] button only for local step flow

---

### 2. Documents

**Responsibility**: Upload and manage documents

**Layout:**
- Sidebar visible (Documents highlighted)
- Context bar clickable: `[Firm] → [Client] → [Period]`
- Upload area
- Document list with tabs
- Each document has context-aware "⋮" menu

**Navigation:**
- Sidebar: Home, Review, Export accessible
- Context bar: Click parts to change firm/client/period
- [Upload More Documents] button always visible
- [Continue to Processing] when new docs pending

**Tabs:**
- All
- Read
- Needs Fix
- Duplicates
- Excluded
- Support Only

**Document List:**

Each document shows:
- Status icon
- Filename
- Status badge
- "⋮" menu (context-aware)

**Context-Aware Actions (see "Manual Override Paths" section above)**

**Status Display:**
```
32 documents processed successfully
0 documents pending processing

[Upload More Documents]
```

**Changes from v2:**
- Document actions menu is now context-aware based on state
- Sidebar replaces "Back to Home" link
- Added "Support Only" tab

---

### 3. Processing

**Responsibility**: Show processing status for new documents only

**Layout:**
- Sidebar visible
- Context bar clickable
- Progress indicator
- Processing status

**Navigation:**
- Sidebar: Home accessible (but discouraged during processing)
- Cannot manually navigate during active processing
- Auto-advances to Review when complete

**Display:**
- Progress bar
- Current step indicator
- Processing count: "Processing 5 new documents..."
- Summary when complete

**Changes from v2:**
- Sidebar replaces "Back to Home" link

---

### 4. Review

**Responsibility**: Resolve exceptions and make final decisions

**Layout:**
- Sidebar visible (Review highlighted)
- Context bar clickable
- Status summary
- Exception cards with evidence

**Navigation:**
- Sidebar: Home, Documents, Export accessible
- Can access Documents to add more files
- [Continue to Export] when ready

**Review Items:**
Each item shows:
- Exception reason
- Evidence panel
- Confidence score
- Recommendation
- Action buttons (5 buttons as defined)

**Status Display:**
```
6 items need your attention
26 items auto-classified
```

**Changes from v2:**
- Sidebar replaces "Back to Home" link
- Sidebar makes Documents directly accessible (instead of separate button)

---

### 5. Accountant Q&A

**Responsibility**: Track questions sent to accountant for evidence

**Layout:**
- Sidebar visible
- Context bar clickable
- Question cards

**Navigation:**
- Sidebar: Home, Documents, Review accessible
- [Return to Review] button on answered questions

**Question Cards:**
Each shows:
- Status badge (Awaiting Answer / Answered / Cancelled)
- Question text
- Related documents
- Accountant's answer (if answered)
- [Return to Review] button (if answered)

**Changes from v2:**
- Sidebar replaces "Back to Home" link

---

### 6. Accounting Setup

**Responsibility**: Accountant-controlled configuration

**Renamed from**: "Setup & Rules"

**Layout:**
- Sidebar visible (Accounting Setup highlighted)
- Context bar (if in engagement context, otherwise none)
- Tabs or sections for three areas

**Navigation:**
- Sidebar: Always accessible
- Can be accessed outside engagement context
- Changes apply globally or per-engagement as appropriate

**Three Sections:**

#### A. Vendor Rules
```
┌────────────────────────────────────────────────────┐
│ Vendor Rules                                       │
├────────────────────────────────────────────────────┤
│                                                    │
│ Petro-Canada → Vehicle Fuel Expense (95%)          │
│ 8 transactions                                     │
│ [Edit Rule]                                        │
│                                                    │
│ Staples → Office Supplies (88%)                    │
│ 3 transactions                                     │
│ [Edit Rule]                                        │
│                                                    │
│ [Add New Vendor Rule]                              │
└────────────────────────────────────────────────────┘
```

#### B. Categories & Account Codes
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

**Edit Category Modal:**
```
┌──────────────────────────────────┐
│ Edit Category                    │
├──────────────────────────────────┤
│                                  │
│ Name: [Vehicle Fuel Expense]     │
│ Account Code: [5400]             │
│ Type: [Expense ▼]                │
│                                  │
│           [Cancel]  [Save]       │
└──────────────────────────────────┘
```

#### C. Export Mapping
```
┌────────────────────────────────────────────────────┐
│ Export Mapping                                     │
├────────────────────────────────────────────────────┤
│                                                    │
│ Accounting Software: [QuickBooks ▼]                │
│                                                    │
│ Field Mapping:                                     │
│ Date          → Transaction Date                   │
│ Vendor        → Payee                              │
│ Amount        → Amount                             │
│ Category      → Account                            │
│ Account Code  → Account Number                     │
│                                                    │
│ [Edit Mapping]  [Reset to Default]                │
└────────────────────────────────────────────────────┘
```

**Changes from v2:**
- Renamed from "Setup & Rules" to "Accounting Setup"
- Sidebar replaces "Back to Home" link
- Clearer section organization

---

### 7. Export

**Responsibility**: Generate final accountant package

**Layout:**
- Sidebar visible (Export highlighted)
- Context bar clickable
- Export status (Ready / Needs Attention)
- Export options
- Configuration button

**Navigation:**
- Sidebar: Home, Documents, Review accessible
- [Configure Export] button (opens modal)
- Can navigate to Review to resolve blockers

**Two States:**

#### A. Ready to Export
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

#### B. Needs Attention
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

**Export Configuration Modal:**
(See "Export Table Configuration" section above)

**Changes from v2:**
- Sidebar replaces "Back to Home" link
- Sidebar makes Review directly accessible

---

### 8. System / Advanced

**Responsibility**: Technical features and system management

**Layout:**
- Sidebar visible (System / Advanced highlighted)
- No context bar (not engagement-specific)
- Section cards

**Navigation:**
- Sidebar: Always accessible

**Sections:**
- Backup / Restore
- OCR Worker Status
- OCRmyPDF / Tesseract Configuration
- Trace / Debug Logs
- Storage Management
- System Information

**Changes from v2:**
- Sidebar replaces "Back to Home" link

---

### 9. Help

**Responsibility**: Documentation and user guidance (placeholder)

**Layout:**
- Sidebar visible (Help highlighted)
- No context bar
- Placeholder content

**Planned Structure** (not implemented yet):
- User Guide
- Workflow Guide
- Screen-by-Screen Help
- Troubleshooting
- Accounting Terminology
- Import / Export Guide
- OCR & Document Reading
- Backup / Restore Guide

**Current Display:**
```
Coming Soon
Documentation and help resources will be available here.
```

**Changes from v2:**
- Sidebar replaces "Back to Home" link

---

## Data Model Updates

### Document State Enum

```typescript
type DocumentState = 
  | 'uploaded'           // Just uploaded, not yet processed
  | 'processing'         // Currently being OCR'd
  | 'read'              // Successfully read and categorized
  | 'unreadable'        // Could not extract text
  | 'duplicate'         // Detected as duplicate
  | 'better_scan'       // Better scan of existing doc
  | 'needs_review'      // In review queue
  | 'reviewed'          // User made decision
  | 'support_only'      // User marked as support-only
  | 'excluded'          // User excluded from accounting
  | 'pending_accountant' // Waiting for accountant input
```

### Document Actions by State

```typescript
interface DocumentActionConfig {
  state: DocumentState;
  availableActions: DocumentAction[];
}

type DocumentAction =
  | 'view_details'
  | 'change_category'
  | 'mark_support_only'
  | 'ask_accountant'
  | 'exclude'
  | 'include'
  | 'reupload'
  | 'hold'
  | 'compare'
  | 'replace_previous'
  | 'keep_both'
  | 'view_in_review';

const actionsByState: DocumentActionConfig[] = [
  {
    state: 'unreadable',
    availableActions: ['reupload', 'hold', 'exclude']
  },
  {
    state: 'read',
    availableActions: ['view_details', 'change_category', 'mark_support_only', 'ask_accountant', 'exclude']
  },
  {
    state: 'duplicate',
    availableActions: ['compare', 'replace_previous', 'keep_both', 'exclude']
  },
  {
    state: 'better_scan',
    availableActions: ['compare', 'replace_previous', 'keep_both', 'exclude']
  },
  {
    state: 'needs_review',
    availableActions: ['view_in_review', 'change_category', 'ask_accountant', 'exclude']
  },
  {
    state: 'support_only',
    availableActions: ['view_details', 'include', 'change_category']
  },
  {
    state: 'excluded',
    availableActions: ['view_details', 'include']
  }
];
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
  field: string;
  label: string;
  mappedTo?: string;
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

## UX Guidelines (Revised)

### Navigation Principles

1. **Sidebar always accessible**: Home and key screens always one click away
2. **Context bar is navigation**: Clickable breadcrumb to change context
3. **Local Back buttons**: Only for step-by-step flows (setup, modals)
4. **No clutter**: Don't put large navigation elements on every screen
5. **State follows user**: Returning to Documents doesn't lose Review decisions

### Override Principles

1. **System suggests, user decides**: Confidence score shows strength of suggestion
2. **Override is not failure**: Manual changes are normal workflow
3. **Evidence justifies suggestion**: User sees why system suggested something
4. **Clear action buttons**: No ambiguity about what each button does
5. **Context-aware actions**: Show only relevant actions for document state

### Configuration Principles

1. **Sensible defaults**: System works without configuration
2. **Configuration optional**: Power users can customize
3. **Configuration non-destructive**: Can reset to defaults
4. **Configuration contextual**: Available where relevant, hidden otherwise
5. **Accounting Setup accessible**: Not buried, not in the way

### Re-entry Principles

1. **Incremental processing**: Only process new/changed documents
2. **Preserve completed work**: Old decisions stay unless explicitly changed
3. **Ask before replacing**: Don't auto-replace documents without confirmation
4. **Update not restart**: Export status updates, doesn't require full restart

---

## Implementation Notes for Codex

### Critical Requirements

1. **Sidebar Navigation**: Must be present on all screens, Home always accessible
2. **Clickable Context Bar**: Each part of breadcrumb must be clickable link
3. **Context-Aware Actions**: Document menu actions filtered by document state
4. **Incremental Processing**: Must track which documents are new vs existing
5. **Export Configuration**: Must support customizable column selection
6. **Better Scan Detection**: Must fingerprint and compare document similarity

### Navigation Rules

- Sidebar visible on all screens
- "Home" in sidebar always accessible
- Context bar clickable after engagement setup
- Local [Back] buttons only in setup flow and modals
- No large "Back to Home" links on screens

### Document Action Rules

- Actions shown based on document state (see Data Model section)
- Don't show all actions for all documents
- Keep menus focused and short
- Common actions (View Details, Exclude) appear across multiple states

---

## What Has Changed from v2

### Refinements Applied

1. **Navigation Improvement**:
   - Removed large "Back to Home" links from screens
   - Added persistent sidebar with Home always accessible
   - Context bar remains clickable
   - Local [Back] buttons only for setup flow

2. **Naming Improvement**:
   - "Setup & Rules" renamed to "Accounting Setup"
   - Clearer, more professional terminology

3. **Context-Aware Actions**:
   - Document actions menu now filtered by state
   - Unreadable: Re-upload, Hold, Exclude
   - Readable: View Details, Change Category, Mark as Support Only, Ask Accountant, Exclude
   - Duplicate/Better Scan: Compare, Replace Previous, Keep Both, Exclude
   - Shows only relevant actions, not full list every time

### Unchanged Core

- Step-by-step workflow
- Exception-based review
- Evidence-driven decisions
- Re-entering workflow capability
- Export configuration
- Dark, minimal design
- Accounting-friendly terminology

---

## Approval Status

**Status**: Revised based on feedback, ready for visual wireframes

**Next Steps**:
1. Create updated visual wireframes with sidebar navigation
2. Show context-aware document actions in wireframes
3. Update Codex implementation handoff (after wireframes approved)

---

## Files Status

- ✓ **MERIDIAN_DESIGN_V2_REVISED.md** - This document (awaiting approval)
- ⏳ **MERIDIAN_VISUAL_WIREFRAMES_V2.md** - Next (after approval)
- ⏳ **CODEX_IMPLEMENTATION_HANDOFF_V2.md** - After wireframes
- 📦 **MERIDIAN_DESIGN_V2.md** - Superseded by this revision
- 📦 **MERIDIAN_DESIGN_V1.md** - Superseded

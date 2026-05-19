# Meridian Design v2 (Final - Correction Loop)
**Accounting Workflow Assistant with Full Correction Loop**

**⚠️ SOURCE OF TRUTH**: This is the authoritative design specification for Meridian

**Status**: Design with complete bidirectional workflow and incremental reprocessing

**Supersedes**: MERIDIAN_DESIGN_V2_REVISED.md, MERIDIAN_DESIGN_V2.md, MERIDIAN_DESIGN_V1.md, MERIDIAN_VISUAL_WIREFRAMES.md, MERIDIAN_VISUAL_WIREFRAMES_V2.md

**Companion Wireframes**: MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md

**Revision Date**: 2026-05-11 (Final - Approved for Implementation)

---

## Design Philosophy

Meridian is a **correction loop workflow assistant** for accounting document preparation, NOT a one-way wizard.

### Core Principles
- **Bidirectional workflow**: User can return to any stage without losing work
- **Incremental reprocessing**: Only affected items reprocessed, not everything
- **Correction-friendly**: Edit decisions, add documents, replace files at any time
- **State-aware**: Export status updates when changes made
- **Evidence-driven**: Show why system suggested something
- **Exception-based**: System handles routine, user decides exceptions
- **Never trapped**: Always clear path back and forward

---

## Workflow Loop Model

```
┌──────────────────────────────────────────────────────────┐
│                     CORRECTION LOOP                      │
│                                                          │
│    ENGAGEMENT SETUP                                      │
│           ↓                                              │
│    ┌─────────────┐      Add/Edit/Replace                │
│    │  DOCUMENTS  │←──────────────────────┐              │
│    └─────────────┘                       │              │
│           ↓                               │              │
│    ┌─────────────┐                       │              │
│    │ PROCESSING  │  (incremental)        │              │
│    └─────────────┘                       │              │
│           ↓                               │              │
│    ┌─────────────┐                       │              │
│    │   REVIEW    │←──────────────────────┤              │
│    └─────────────┘   Edit decisions      │              │
│           ↓               ↑               │              │
│    ┌─────────────┐       │               │              │
│    │   EXPORT    │       │               │              │
│    └─────────────┘       │               │              │
│           │               │               │              │
│      Change detected      │               │              │
│           ↓               │               │              │
│    Status: Needs Attention│               │              │
│           ↓               │               │              │
│    User chooses:          │               │              │
│    - Add Documents ───────┴───────────────┘              │
│    - Edit Decision ───────────────────────┘              │
│    - Reprocess ──────────────────────────→               │
│                                                          │
└──────────────────────────────────────────────────────────┘

Key Behaviors:
✓ Can return to Documents at any stage
✓ Can reopen Review decisions after Export
✓ Can change categories/vendors/mappings anytime
✓ Only affected items reprocessed
✓ Export status updates when changes detected
✓ Old completed work preserved
```

---

## Navigation Model

### Sidebar Navigation (Always Visible)

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
│ Accounting Setup        │
│ System / Advanced       │
│ Help                    │
└─────────────────────────┘
```

**Sidebar Behavior:**
- Always accessible (never hidden)
- **Documents always clickable** (add more at any time)
- **Review always clickable** (reopen decisions)
- **Export shows live status** (Ready / Needs Attention / Draft)
- Home returns to engagement list
- Can navigate freely without losing work

### Context Bar (After Engagement Setup)

```
┌────────────────────────────────────────────────────────┐
│ [Northpeak Accounting] → [Daniel Roberts] → [2025 Annual] │
└────────────────────────────────────────────────────────┘
```

**Context Bar Behavior:**
- Each part clickable to change firm/client/period
- Changing context does NOT lose current engagement work
- System asks: "Save current engagement before switching?"

---

## Workflow States and Transitions

### Engagement State Machine

```typescript
type EngagementState = 
  | 'setup_incomplete'      // Firm/Client/Period not all selected
  | 'documents_empty'       // No documents uploaded
  | 'documents_uploaded'    // Documents uploaded, not processed
  | 'processing'            // Processing in progress
  | 'review_pending'        // Has unresolved review items
  | 'review_complete'       // All review items resolved
  | 'export_ready'          // Ready to export
  | 'exported'              // Package exported
  | 'needs_reprocessing';   // Changes made, needs reprocess

interface EngagementStatus {
  state: EngagementState;
  documentsTotal: number;
  documentsProcessed: number;
  documentsPending: number;
  reviewItemsTotal: number;
  reviewItemsResolved: number;
  changesDetected: boolean;
  lastModified: Date;
}
```

### Change Detection and Reprocessing

```typescript
interface Change {
  id: string;
  type: ChangeType;
  affectedDocuments: string[];
  timestamp: Date;
  status: 'pending' | 'reprocessing' | 'completed';
}

type ChangeType =
  | 'document_added'           // New document uploaded
  | 'document_replaced'        // Better scan replaces old
  | 'document_removed'         // Document excluded/deleted
  | 'category_changed'         // Document category changed
  | 'vendor_rule_changed'      // Vendor mapping changed
  | 'account_code_changed'     // Account code changed
  | 'review_decision_reopened' // Previous decision changed
  | 'support_status_changed'   // Support-only status changed
  | 'inclusion_status_changed';// Included/excluded changed

interface ReprocessingQueue {
  items: ReprocessingItem[];
  status: 'idle' | 'running' | 'completed';
}

interface ReprocessingItem {
  documentId: string;
  reason: ChangeType;
  actions: ReprocessingAction[];
}

type ReprocessingAction =
  | 'reread_document'    // Re-run OCR
  | 'reclassify'         // Re-run classification
  | 'rematch_vendor'     // Re-match vendor rules
  | 'update_category'    // Update category based on rules
  | 'create_review_item' // Create new review item
  | 'update_review_item' // Update existing review item
  | 'remove_review_item';// Remove from review
```

---

## Correction Loop Behaviors

### 1. Adding Documents at Any Stage

**User Action**: Clicks "Add More Documents" from Documents, Review, or Export

**System Behavior:**
1. Navigate to Documents screen
2. Show existing documents + upload area
3. User uploads new files
4. Click "Process New Documents"
5. System:
   - Fingerprints new files
   - Checks for duplicates/better scans
   - Processes ONLY new documents
   - Adds new exceptions to Review
   - Updates Export status if needed
6. Navigate to Processing (incremental)
7. After processing, navigate to Review (shows new + unresolved items)

**Critical**: Old processed documents and resolved Review items NOT touched

### 2. Editing Document Decisions

**User Action**: Opens document ⋮ menu and changes category/status

**System Behavior:**
1. Record change
2. Add document to reprocessing queue
3. Update Export status to "Needs Attention" if was "Ready"
4. Show "Changes pending" indicator
5. User clicks "Reprocess Changes" or navigates naturally
6. System:
   - Reprocesses ONLY changed document
   - Updates related review items
   - Does NOT reprocess unaffected documents
7. Navigate to Review if new exceptions created

### 3. Reopening Review Decisions

**User Action**: From Review or Export, clicks "Reopen Decision" on resolved item

**System Behavior:**
1. Mark item as "unresolved"
2. Show item in Review screen with original evidence
3. User makes new decision
4. Click decision button
5. System:
   - Updates decision
   - Updates Export status if needed
   - NO reprocessing needed (decision-only change)

### 4. Changing Vendor/Category Rules

**User Action**: In Accounting Setup, edits vendor rule or category code

**System Behavior:**
1. Record rule change
2. Identify ALL documents affected by rule change
3. Add affected documents to reprocessing queue
4. Show "X documents affected" message
5. Update Export status to "Needs Attention"
6. User clicks "Reprocess Affected Documents" or navigates naturally
7. System:
   - Reprocesses ONLY affected documents
   - Updates categories based on new rules
   - Creates/updates review items if confidence drops
   - Does NOT touch unaffected documents

### 5. Replacing with Better Scan

**User Action**: Uploads new version of document (better scan)

**System Behavior:**
1. Fingerprint new document
2. Detect similarity to existing document
3. Show modal: "This appears to be a better scan of [document]. Replace previous version?"
4. If user clicks "Replace":
   - Mark old document as replaced
   - Process new document
   - Transfer any manual decisions to new document
   - Update review items if needed
   - Preserve Review history
5. Navigate to Processing (incremental)

### 6. Export Reactivity

**Export status updates automatically based on engagement state:**

```
Export Status Logic:

IF state === 'review_complete' AND changesDetected === false:
  → Status: "Ready to Export"
  → Show green checkmark
  → Enable [Download Accountant Package]

ELSE IF state === 'review_pending':
  → Status: "Needs Attention"
  → Show amber warning
  → List blockers (X unresolved items)
  → Enable [Go to Review]
  → Enable [Download Draft Package]

ELSE IF state === 'needs_reprocessing':
  → Status: "Changes Pending"
  → Show blue indicator
  → Message: "Changes detected. Reprocess to update export."
  → Enable [Reprocess Changes]
  → Enable [Download Previous Package]

ELSE IF state === 'exported' AND changesDetected === true:
  → Status: "Needs Update"
  → Show amber warning
  → Message: "Changes made since last export."
  → Enable [Reprocess & Update Package]
  → Enable [Download Previous Package]
```

---

## Screen-Specific Loop Behaviors

### Documents Screen

**Loop Behaviors:**
- **Always accessible** via sidebar
- "Add More Documents" button always visible
- Shows status: "32 processed | 5 pending | 2 changed"
- "Process Pending Documents" button (if pending > 0)
- "Reprocess Changed Documents" button (if changed > 0)
- Can edit document status/category via ⋮ menu
- Changes marked with indicator until reprocessed

**State Indicators:**
```
Document States:
✓ Processed    (green checkmark)
⏱ Pending      (amber clock)
🔄 Changed     (blue refresh icon)
❌ Excluded    (gray x)
📎 Support     (purple paperclip)
```

### Processing Screen

**Loop Behaviors:**
- **Incremental processing** clearly labeled
- Shows: "Processing 5 new documents" OR "Reprocessing 3 changed documents"
- Progress: "5 of 32 documents affected"
- Does NOT show all documents, only affected
- After completion, shows summary:
  - "5 new documents processed"
  - "3 changed documents reprocessed"
  - "24 unchanged documents preserved"

**Processing Types:**
```
Initial Processing:
"Processing all documents (32 documents)"

Incremental - New Documents:
"Processing new documents (5 of 32 total)"

Incremental - Changes:
"Reprocessing changed documents (3 of 32 total)"

Incremental - Rule Change:
"Reprocessing affected documents (12 of 32 total)"
→ Reason: "Vendor rule changed: Petro-Canada"
```

### Review Screen

**Loop Behaviors:**
- **Always accessible** via sidebar
- Shows ALL items needing attention (new + reopened)
- Resolved items shown in separate collapsible section
- Each resolved item has "Reopen Decision" button
- Status: "6 need attention | 26 resolved | 0 pending"
- Changes to decisions update Export status immediately

**Item States:**
```
Review Item States:
⏱ Unresolved       (needs user decision)
✓ Resolved         (user decided, can reopen)
🔄 Reopened        (was resolved, now unresolved again)
🆕 New             (from recent processing)
```

**Resolved Items Section:**
```
┌────────────────────────────────────────────┐
│ Resolved Items (26) [Collapse ▼]          │
├────────────────────────────────────────────┤
│ ✓ 8 fuel receipts → Vehicle Fuel Expense  │
│   Accepted recommendation                  │
│   [Reopen Decision]                        │
│                                            │
│ ✓ 5 office receipts → Office Supplies     │
│   Changed category manually                │
│   [Reopen Decision]                        │
└────────────────────────────────────────────┘
```

### Export Screen

**Loop Behaviors:**
- Status updates automatically when changes detected
- Three distinct states: Ready / Needs Attention / Needs Update
- Clear path back to resolve issues
- Previous package available even after changes
- "Last exported" timestamp shown

**Status Messages:**

**Ready:**
```
✓ Ready to Export
All review items resolved. Your package is ready.

[Configure Export]  [Download Accountant Package]
```

**Needs Attention:**
```
⚠ Needs Attention
Some items need to be resolved before export.

Blockers:
• 3 unresolved review items
• 1 unanswered accountant question

[Go to Review]  [Download Draft Package]
```

**Needs Update:**
```
🔄 Needs Update
Changes made since last export.

Changes:
• 5 new documents added
• 2 categories changed
• 1 vendor rule updated

Last exported: 2025-05-10 14:32

[Reprocess & Update]  [Download Previous Package]
```

---

## Action Labels for Loop Behavior

### Primary Loop Actions

**Adding/Editing Documents:**
- "Add More Documents"
- "Upload Additional Files"
- "Process New Documents"
- "Reprocess Changed Documents"
- "Replace with Better Scan"

**Processing:**
- "Process Pending Documents"
- "Reprocess Changes"
- "Reprocess Affected Documents"
- "Continue Processing"

**Review:**
- "Reopen Decision"
- "Edit Decision"
- "Return to Review"
- "Resolve Pending Items"
- "View Resolved Items"

**Export:**
- "Reprocess & Update Export"
- "Update Export Package"
- "Go to Review to Resolve"
- "Download Previous Package"
- "Download Draft Package"

**Navigation:**
- "Return to Documents"
- "Back to Review"
- "View Export Status"
- "Edit Accounting Setup"

---

## After-Correction Landing Logic

**Where user lands after making a change:**

```
IF change === 'document_added':
  → Navigate to Processing
  → Process new documents
  → Then navigate to Review (if new exceptions)
  → Otherwise navigate to Export (update status)

IF change === 'document_category_changed':
  → Add to reprocessing queue
  → Stay on current screen
  → Show "Changes pending" indicator
  → User can continue editing or click "Reprocess Changes"

IF change === 'review_decision_reopened':
  → Navigate to Review
  → Show reopened item at top
  → Other resolved items remain collapsed

IF change === 'vendor_rule_changed':
  → Show modal: "12 documents will be affected. Reprocess now?"
  → If "Yes": Navigate to Processing
  → If "No": Stay on Accounting Setup, mark as pending

IF change === 'accountant_answered':
  → Navigate to Review
  → Show answered item at top with evidence
  → User makes final decision

IF change === 'review_decision_made':
  → Stay on Review screen
  → Show next unresolved item
  → When all resolved: Show "All items resolved. Continue to Export?"

IF all_items_resolved:
  → Export status auto-updates to "Ready"
  → User can navigate to Export when ready
  → NOT automatically jumped to Export
```

---

## State Persistence and Safety

### Saving Work

**All changes saved immediately:**
- Document uploads saved
- Category changes saved
- Review decisions saved
- Vendor rule changes saved
- Export configuration saved

**No "Save" button needed** - changes persist automatically

### Confirming Destructive Actions

**Ask for confirmation:**
- Exclude document (can be undone)
- Delete document (cannot be undone - ask "Are you sure?")
- Replace with better scan (old version archived, can be restored)
- Change vendor rule affecting many documents (show count, ask confirm)

**No confirmation needed:**
- Add documents
- Change category
- Reopen decision
- Navigate between screens

---

## Implementation Notes for Codex

### Critical Requirements

1. **Bidirectional Navigation**
   - All workflow screens accessible via sidebar
   - Navigation preserves state
   - No loss of work when returning

2. **Incremental Reprocessing**
   - Track which documents changed
   - Reprocess only affected documents
   - Preserve unchanged documents and decisions

3. **Export Reactivity**
   - Export status updates when changes detected
   - Show clear blockers when not ready
   - Previous package available after changes

4. **Change Detection**
   - Track all types of changes
   - Show "pending changes" indicators
   - Batch changes into reprocessing queue

5. **State Management**
   - Engagement state machine
   - Document state tracking
   - Review item state tracking
   - Change queue management

### State Tracking

```typescript
// Track what needs reprocessing
const reprocessingQueue: {
  documentIds: string[];
  reason: ChangeType;
  priority: number;
}[];

// Track Export readiness
const exportStatus: {
  ready: boolean;
  blockers: string[];
  changesSinceExport: Change[];
  lastExportDate: Date;
};

// Track Review state
const reviewState: {
  unresolvedCount: number;
  resolvedCount: number;
  reopenedIds: string[];
};
```

---

## What Has Changed from v2 Revised

### Major Additions

1. **Workflow Loop Model**
   - Explicit bidirectional workflow diagram
   - Clear loop arrows showing return paths
   - "Add/Edit/Replace documents" loop shown

2. **Change Detection System**
   - ChangeType enum for all change types
   - ReprocessingQueue for managing affected items
   - Change affects Export status automatically

3. **Incremental Reprocessing**
   - Only affected items reprocessed
   - Clear labeling: "Reprocessing 3 of 32"
   - Unchanged work preserved

4. **Export Reactivity**
   - Three states: Ready / Needs Attention / Needs Update
   - Shows changes since last export
   - Previous package available

5. **Reopenable Decisions**
   - Resolved items shown in collapsible section
   - "Reopen Decision" button on each
   - Reopening navigates to Review

6. **After-Correction Landing Logic**
   - Explicit rules for where user lands
   - NOT jumped to end after every change
   - Land on relevant next step

7. **Action Labels**
   - Clear labels for loop behavior
   - "Add More Documents" not just "Upload"
   - "Reprocess Changes" not "Process"

### Enhanced Behaviors

- Documents: Always accessible, shows pending/changed counts
- Processing: Shows incremental processing clearly
- Review: Shows resolved items with reopen option
- Export: Updates status when changes detected
- Sidebar: Documents/Review/Export always clickable

---

## Help / Documentation Architecture

### Overview

Meridian includes a Help system accessible from the sidebar. This section defines the structure for future help content.

**Do not write full help content yet.** This is a structural specification only.

### Help Sections

```
┌─────────────────────────────────────┐
│ HELP / DOCUMENTATION                │
├─────────────────────────────────────┤
│ 1. Getting Started                  │
│    - First-time setup               │
│    - Creating your first engagement │
│    - Navigation overview            │
│                                     │
│ 2. Workflow Guide                   │
│    - Understanding the roadmap      │
│    - Sequential workflow stages     │
│    - Going back to make changes     │
│                                     │
│ 3. Engagement Setup Guide           │
│    - Selecting firm/client/period   │
│    - Engagement context             │
│    - Changing context               │
│                                     │
│ 4. Documents & Upload Guide         │
│    - Supported file types           │
│    - Upload best practices          │
│    - Handling poor scans            │
│    - Replacing documents            │
│                                     │
│ 5. OCR / Document Reading Guide     │
│    - How document reading works     │
│    - Confidence scores              │
│    - Unreadable documents           │
│    - Re-uploading for better results│
│                                     │
│ 6. Review & Decisions Guide         │
│    - Exception-based review         │
│    - Evidence-driven decisions      │
│    - Reopening decisions            │
│    - Resolved items                 │
│                                     │
│ 7. Accountant Q&A Guide             │
│    - Asking questions               │
│    - Question workflow              │
│    - Using accountant answers       │
│    - Evidence from answers          │
│                                     │
│ 8. Export Package Guide             │
│    - Export formats                 │
│    - QuickBooks compatibility       │
│    - Export states                  │
│    - Re-exporting after changes     │
│                                     │
│ 9. Backup / Restore Guide           │
│    - Local-first architecture       │
│    - IndexedDB storage              │
│    - Exporting engagement data      │
│    - Restoring from backup          │
│                                     │
│ 10. Troubleshooting                 │
│     - Common issues                 │
│     - Document reading failures     │
│     - Performance tips              │
│     - Browser compatibility         │
│                                     │
│ 11. Accounting Terminology          │
│     - Glossary of terms             │
│     - QuickBooks equivalents        │
│     - Category explanations         │
│     - Account code reference        │
│                                     │
│ 12. GIFI / Accounting Codes Guide   │
│     - Understanding GIFI codes      │
│     - Standard vs custom codes      │
│     - Code mapping workflow         │
│     - Category-to-code assignments  │
│     - Using codes in exports        │
└─────────────────────────────────────┘
```

### Help System Behavior

**Access:**
- Sidebar → Help
- Contextual help tooltips (? icon) on complex screens
- Inline help text where needed

**Search:**
- Full-text search across all help content
- Quick navigation to relevant sections

**Format:**
- Markdown-based content
- Code examples where appropriate
- Screenshots/diagrams for visual guidance
- Step-by-step instructions

---

## Navigation Model: Workflow Roadmap vs Context Bar

### Critical Distinction

**These are TWO DIFFERENT navigation elements. They must not be confused.**

### Workflow Roadmap

**Purpose**: Shows the **process stage** (where you are in the workflow)

**Location**: Top of main content area on workflow screens

**Shows**:
```
Home → Setup → Documents → Processing → Review → Q&A → Export
```

**Behavior**:
- Horizontal stepper/progress indicator
- Visual states: ✓ completed, ● current, ○ accessible, locked
- Clickable for navigation between workflow stages
- Only visible during active engagement workflow
- NOT visible on Home screen or settings screens

**Color scheme**:
- Completed stages: #10B981 (green) with ✓
- Current stage: #3B82F6 (blue) with ●
- Accessible stages: #9CA3AF (gray) with ○
- Locked stages: #6B7280 (muted) with no icon

### Context Bar

**Purpose**: Shows the **active engagement** (which firm/client/period)

**Location**: Below workflow roadmap, above main content

**Shows**:
```
[Northpeak Accounting] → [Daniel Roberts] → [2025 Annual]
```

**Behavior**:
- Breadcrumb-style clickable elements
- Each part clickable to change firm/client/period
- Always visible once engagement context is established
- NOT visible during initial setup (before firm/client/period selected)

**Color scheme**:
- Background: #1A1F28 (medium dark)
- Text: #F9FAFB (light)
- Separator arrows: #6B7280 (muted)

### Visual Hierarchy

```
┌────────────────────────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ WORKFLOW ROADMAP (primary workflow nav)     ┃ │
│ ┃ Home → Setup → Docs → Processing → Review   ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│ ┌──────────────────────────────────────────────┐ │
│ │ CONTEXT BAR (engagement context)             │ │
│ │ [Firm] → [Client] → [Period]                 │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ MAIN CONTENT                                     │
└────────────────────────────────────────────────────┘

Both needed, both distinct:
- Roadmap = WHERE in process
- Context Bar = WHICH engagement
```

---

## Opening / Welcome Screen

### Purpose

Create a professional, branded opening experience for Meridian that sets the tone as an accounting workflow assistant.

### Screen Design

**Visual Elements**:
- Meridian logo/branding (clean, professional)
- Short product tagline
- Primary action: Start New Engagement
- Secondary action: Continue existing work
- Recent Engagements list

**Tagline**: 
"Local-first accounting workflow assistant"
or
"Document preparation made simple"

**Visual Mood**:
- Professional, not flashy
- Calm, minimal design
- Quick to navigate (not time-consuming)
- Trust and clarity

### Layout

```
┌────────────────────────────────────────────────────┐
│                                                    │
│           ┏━━━━━━━━━━━━━━━━━━━━━┓                │
│           ┃    MERIDIAN LOGO    ┃                │
│           ┗━━━━━━━━━━━━━━━━━━━━━┛                │
│                                                    │
│        Local-first accounting workflow assistant   │
│                                                    │
│     ┌────────────────────────────────────┐       │
│     │  Start New Engagement   #3B82F6    │       │
│     └────────────────────────────────────┘       │
│                                                    │
│     ──────────────── or ────────────────          │
│                                                    │
│  Recent Engagements:                              │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │ Daniel Roberts - 2025 Annual      │  │
│  │ Status: Review 6 items                     │  │
│  │ [Continue] #3B82F6                         │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │ Smith LLC - Q4 2024                        │  │
│  │ Status: Ready to export                    │  │
│  │ [Continue] #3B82F6                         │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Behavior

**On First Launch**:
- Show "Start New Engagement" prominently
- Show empty state message if no engagements
- Guide user to create first engagement

**On Return**:
- Show Recent Engagements at top
- [Continue] button navigates to appropriate workflow stage
- [Start New Engagement] available but secondary

**Engagement Status Display**:
- Review X items → Navigate to Review
- Ready to export → Navigate to Export
- Processing documents → Navigate to Processing
- Setup incomplete → Navigate to Setup

---

## Accounting Setup

### Purpose

Business-facing configuration area for accounting standards, codes, mappings, and rules.

**This is NOT technical settings.** This is where accountants configure business logic.

### Navigation

**Location**: Sidebar → Accounting Setup

**NOT in System/Advanced** (that's for technical/admin tools)

### Subsections

```
Accounting Setup
├── Vendor Rules
├── Chart of Accounts
├── GIFI / Standard Codes
├── Category Mapping
├── Account Codes
├── Export Mapping
└── Saved Templates
```

### 1. Vendor Rules

**Purpose**: Define how vendor names map to categories and account codes

**Features**:
- List all vendor rules
- Add new vendor rule
- Edit existing rule
- Delete rule
- Test rule against documents

**Rule Structure**:
```typescript
interface VendorRule {
  id: string;
  vendorName: string;
  matchPattern: 'exact' | 'contains' | 'startsWith' | 'regex';
  matchValue: string;
  suggestedCategory: string;
  suggestedAccountCode?: string;
  suggestedGIFICode?: string;
  confidence: number;
  active: boolean;
  appliesTo: 'all' | 'specific-clients';
  notes?: string;
}
```

**Example**:
- Vendor: "Petro-Canada" (contains)
- Category: "Vehicle Fuel Expense"
- Account Code: 5450
- GIFI: 8811
- Confidence: 95%

### 2. Chart of Accounts

**Purpose**: View and manage the organization's chart of accounts

**Features**:
- View all account codes
- Add custom account codes
- Edit account names
- Organize by category
- Mark accounts as active/inactive
- Export chart

**Account Structure**:
```typescript
interface AccountCode {
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  category: string;
  subcategory?: string;
  gifiCode?: string;
  active: boolean;
  standard: boolean; // true = cannot delete
  customAdded: boolean; // true = user added
}
```

**Display**:
```
Assets
  1000 - Cash
  1200 - Accounts Receivable
  
Liabilities
  2000 - Accounts Payable
  2100 - Credit Card Payable
  
Expenses
  5000 - Office Supplies
  5450 - Vehicle Fuel Expense (GIFI: 8811)
  5500 - Meals & Entertainment
```

### 3. GIFI / Standard Codes

**Purpose**: Manage General Index of Financial Information (GIFI) codes for Canadian tax reporting

**Features**:
- View standard GIFI codes
- Add allowed custom codes (if permitted)
- Map categories to GIFI codes
- Map account codes to GIFI codes
- Search GIFI codes
- View GIFI code descriptions

**GIFI Code Structure**:
```typescript
interface GIFICode {
  code: string;
  description: string;
  type: 'balance-sheet' | 'income-statement';
  standard: boolean;
  customAllowed: boolean;
}
```

**Common GIFI Codes**:
```
8000 - Sales of goods and services
8811 - Motor vehicle expenses
9060 - Office expenses
9220 - Professional fees
```

### 4. Category Mapping

**Purpose**: Map document categories to account codes and GIFI codes

**Features**:
- List all category mappings
- Create new mapping
- Edit existing mapping
- Set default mappings
- Override for specific clients

**Mapping Structure**:
```typescript
interface CategoryMapping {
  id: string;
  categoryName: string;
  accountCode: string;
  gifiCode?: string;
  taxTreatment: 'none' | 'hst-included' | 'hst-excluded' | 'gst-included';
  deductible: boolean;
  requiresReceipt: boolean;
  notes?: string;
}
```

**Example**:
- Category: "Office Supplies"
- Account Code: 5000
- GIFI: 9060
- Tax: HST Included
- Deductible: Yes

### 5. Export Mapping

**Purpose**: Configure how data exports to accounting software

**Features**:
- QuickBooks column mappings
- Generic CSV mappings
- Custom field mappings
- Date format settings
- Amount format settings

**Mapping Structure**:
```typescript
interface ExportMapping {
  id: string;
  name: string;
  targetSoftware: 'quickbooks' | 'sage' | 'xero' | 'generic-csv';
  columnMappings: ColumnMapping[];
  dateFormat: string;
  amountFormat: string;
  includeHeaders: boolean;
}

interface ColumnMapping {
  sourceField: string;
  targetColumn: string;
  transform?: 'uppercase' | 'lowercase' | 'date-format' | 'amount-format';
  required: boolean;
}
```

### 6. Saved Templates

**Purpose**: Save and reuse export configurations

**Features**:
- List saved templates
- Create new template
- Edit template
- Delete template
- Set default template
- Duplicate template

**Template Structure**:
```typescript
interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  format: 'excel' | 'csv' | 'quickbooks-iif';
  columns: ExportColumn[];
  default: boolean;
  lastUsed: Date;
}
```

---

## GIFI / Accounting Codes Flow

### Overview

GIFI (General Index of Financial Information) codes are required for Canadian tax reporting. Meridian must support viewing, mapping, and using these codes throughout the workflow.

### User Flow

**Step 1: View GIFI Codes**
- Navigate to Accounting Setup → GIFI / Standard Codes
- See list of standard GIFI codes with descriptions
- Search/filter codes by number or description

**Step 2: Map Categories to GIFI**
- Navigate to Accounting Setup → Category Mapping
- Select category (e.g., "Vehicle Fuel")
- Assign GIFI code (e.g., 8811)
- Assign account code (e.g., 5450)
- Save mapping

**Step 3: Apply During Processing**
- System reads document
- Classifies category
- Looks up category mapping
- Assigns GIFI code automatically based on mapping

**Step 4: Review GIFI Assignments**
- In Review screen, GIFI code shown in evidence
- User can override GIFI code if needed
- Change triggers reprocessing

**Step 5: Export with GIFI**
- Export includes GIFI column
- Accountant review package shows GIFI for each transaction
- QuickBooks export includes GIFI in custom field

### GIFI Code Categories

**Balance Sheet Codes** (1000-3620):
- Assets
- Liabilities  
- Equity

**Income Statement Codes** (8000-9999):
- Revenue (8000-8299)
- Cost of Goods Sold (8300-8519)
- Operating Expenses (8520-9970)

### Common Mapping Examples

```
Category: Vehicle Fuel Expense
Account: 5450
GIFI: 8811 - Motor vehicle expenses

Category: Office Supplies
Account: 5000
GIFI: 9060 - Office expenses

Category: Professional Fees
Account: 6000
GIFI: 9220 - Professional fees

Category: Meals & Entertainment
Account: 5500
GIFI: 8523 - Meals and entertainment (partial deduction)
```

---

## Export Configuration

### Purpose

Allow users to customize the export package format, columns, and templates.

### Export Formats

1. **Accountant Review Excel** (default)
2. **QuickBooks-Compatible CSV**
3. **Generic CSV**
4. **Custom Format**

### Configuration Screen

**Location**: Export screen → [Configure Export]

**Features**:
- Choose export format
- Select columns
- Reorder columns
- Save as template
- Load saved template

### Default Excel Template Columns

```typescript
const defaultColumns: ExportColumn[] = [
  { id: 'doc_id', label: 'Document ID', width: 80 },
  { id: 'date', label: 'Date', width: 100 },
  { id: 'vendor', label: 'Vendor', width: 150 },
  { id: 'amount', label: 'Amount', width: 100, format: 'currency' },
  { id: 'suggested_category', label: 'Suggested Category', width: 150 },
  { id: 'final_category', label: 'Final Category', width: 150 },
  { id: 'account_code', label: 'Account Code', width: 100 },
  { id: 'gifi_code', label: 'GIFI Code', width: 100 },
  { id: 'hst_gst_flag', label: 'HST/GST', width: 80 },
  { id: 'confidence', label: 'Confidence', width: 90, format: 'percent' },
  { id: 'review_status', label: 'Review Status', width: 120 },
  { id: 'notes', label: 'Notes', width: 200 },
  { id: 'source_file', label: 'Source File', width: 150 },
  { id: 'accountant_question', label: 'Accountant Q&A', width: 150 }
];
```

### Column Customization UI

```
┌────────────────────────────────────────────────────┐
│ Export Configuration                               │
├────────────────────────────────────────────────────┤
│                                                    │
│ Format: [Accountant Review Excel ▼]               │
│                                                    │
│ Columns:                                          │
│                                                    │
│ ┌────────────────────────────────────────────┐   │
│ │ ☑ Document ID                              │   │
│ │ ☑ Date                                     │   │
│ │ ☑ Vendor                                   │   │
│ │ ☑ Amount                                   │   │
│ │ ☑ Suggested Category                       │   │
│ │ ☑ Final Category                           │   │
│ │ ☑ Account Code                             │   │
│ │ ☑ GIFI Code                                │   │
│ │ ☑ HST/GST Flag                             │   │
│ │ ☐ Confidence Score                         │   │
│ │ ☑ Review Status                            │   │
│ │ ☐ Processing Date                          │   │
│ │ ☑ Notes                                    │   │
│ │ ☑ Source File                              │   │
│ │ ☐ Fingerprint                              │   │
│ │ ☑ Accountant Question Reference            │   │
│ └────────────────────────────────────────────┘   │
│                                                    │
│ [Reorder Columns]  [Reset to Default]             │
│                                                    │
│ Template Name: [Default Template        ]         │
│ [Save as Template]  [Load Template ▼]             │
│                                                    │
│ [Cancel]  [Apply Configuration]                   │
└────────────────────────────────────────────────────┘
```

### QuickBooks-Compatible Format

**Special Requirements**:
- Date format: MM/DD/YYYY
- Amount format: no currency symbol
- Vendor name: no special characters
- Account: QuickBooks account name or number
- Memo field: combines category + notes

**Column Mapping**:
```
QuickBooks CSV Format:
Date,Vendor,Account,Amount,Memo,Class,HST/GST

Maps to:
Date → Transaction Date
Vendor → Vendor Name
Account → Account Code + Name
Amount → Amount
Memo → Final Category + Notes
Class → (optional client/project)
HST/GST → Tax Code
```

---

## System / Advanced

### Purpose

**Technical and administrative tools ONLY.** Not business configuration.

**Clear Separation**: Accounting Setup = business config, System/Advanced = technical tools

### Sections

**1. Backup / Restore**
- Export engagement data
- Import engagement backup
- Full database backup
- Restore from backup
- Scheduled auto-backup settings

**2. OCR Worker Status**
- OCR engine status (running/stopped)
- OCRmyPDF availability
- Tesseract version
- Supported languages
- Processing queue status

**3. OCRmyPDF / Tesseract Configuration**
- OCR engine settings
- Language packs installed
- DPI settings
- OCR timeout settings
- Force re-OCR option

**4. Trace / Debug / Logs**
- Application logs
- Processing logs
- Error logs
- Performance metrics
- Debug mode toggle

**5. Version Information**
- Meridian version
- Build date
- Electron version (if desktop)
- Browser compatibility
- Update check

**6. Data Location**
- IndexedDB location
- Backup directory
- Document cache location
- Log file location
- Clear cache options

**7. Raw Backup / Import / Export**
- Export raw JSON
- Import raw JSON
- Bulk document export
- Database utilities
- Data migration tools

### UI Organization

```
System / Advanced
├── Backup & Restore
│   ├── Create Backup
│   ├── Restore from Backup
│   └── Auto-Backup Settings
│
├── OCR Engine
│   ├── Worker Status
│   ├── Language Settings
│   └── Performance Tuning
│
├── Diagnostics
│   ├── View Logs
│   ├── Export Diagnostics
│   └── Debug Mode
│
└── Data Management
    ├── Storage Location
    ├── Clear Cache
    └── Database Utilities
```

### Clear Warning

**These are advanced technical tools. Normal accounting configuration belongs in Accounting Setup.**

---

## Accountant Q&A State Model

### Question States

**IMPORTANT**: Accountant answers are **evidence only**. Final decisions always happen in Review.

**Do NOT use "Applied" state.** Answers must not sound like they were automatically applied.

```typescript
type QuestionState =
  | 'draft'               // User composing question
  | 'sent'                // Sent to accountant, awaiting response
  | 'answered'            // Accountant provided answer
  | 'returned_to_review'  // Answer sent back to Review for user decision
  | 'evidence_added';     // Answer added as evidence to review item

interface AccountantQuestion {
  id: string;
  documentId: string;
  question: string;
  context: string;
  state: QuestionState;
  sentDate?: Date;
  answer?: string;
  answeredDate?: Date;
  returnedToReviewDate?: Date;
  relatedReviewItemId?: string;
}
```

### Q&A Workflow

```
Step 1: User in Review
  → Clicks "Ask Accountant" on review item
  → Modal opens with context pre-filled
  → User types question
  → Clicks [Send Question]
  → Question state: 'sent'

Step 2: Accountant responds (external system)
  → Answer received
  → Question state: 'answered'
  → User notified

Step 3: User views answer
  → Navigate to Q&A screen
  → See answered question with evidence
  → Answer shown as additional evidence
  → State label: "Answer Available" (NOT "Applied")

Step 4: User makes decision
  → Click [Return to Review Item]
  → Navigate to Review screen
  → Related review item shown with:
    - Original evidence
    - Accountant answer as additional evidence
    - Confidence score (if updated based on answer)
  → User makes final decision
  → Question state: 'returned_to_review' or 'evidence_added'
```

### Q&A Screen Labels

**Use these state labels:**
- **"Awaiting Response"** - Question sent, no answer yet
- **"Answer Available"** - Accountant answered, user hasn't reviewed yet
- **"Returned to Review"** - User returned to Review to make decision
- **"Evidence Added"** - Answer added as evidence to review item

**Do NOT use:**
- ~~"Applied"~~ - Implies automatic application
- ~~"Resolved"~~ - Implies final decision (Review handles this)
- ~~"Completed"~~ - Ambiguous

### Q&A Status Tabs

```
┌────────────────────────────────────────────┐
│ Awaiting Response (2) | Answer Available (3) | Returned to Review (5) │
└────────────────────────────────────────────┘

NOT:
Awaiting (2) | Answered (3) | Applied (5)  ← Don't use this
```

---

## Files Status

- ✓ **MERIDIAN_DESIGN_V2_FINAL.md** - This document (SOURCE OF TRUTH - design specification)
- ✓ **MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md** - Key wireframes with correction loop
- ✓ **MERIDIAN_WORKFLOW_ROADMAP_UPDATE.md** - Workflow roadmap specification
- ✓ **MERIDIAN_FINAL_WIREFRAMES_WITH_ROADMAP.md** - Complete wireframes with roadmap
- ⏳ **CODEX_IMPLEMENTATION_HANDOFF_V2.md** - After approval
- 📦 **MERIDIAN_DESIGN_V2_REVISED.md** - Superseded
- 📦 **MERIDIAN_DESIGN_V2.md** - Superseded
- 📦 **MERIDIAN_DESIGN_V1.md** - Superseded
- 📦 **MERIDIAN_VISUAL_WIREFRAMES.md** - Superseded
- 📦 **MERIDIAN_VISUAL_WIREFRAMES_V2.md** - Superseded

---

**Status**: Design approved. Ready for Codex implementation handoff.

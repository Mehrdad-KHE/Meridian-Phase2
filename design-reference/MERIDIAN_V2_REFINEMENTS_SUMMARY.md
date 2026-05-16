# Meridian v2 - Key Design Refinements Summary

**Purpose**: Visual summary of v1 → v2 refinements for quick review

---

## 1. Navigation Refinements

### Before (v1):
```
Sequential workflow only
No easy way back
Context bar display-only
```

### After (v2):
```
┌────────────────────────────────────────────────────────┐
│ ← Back to Home     MERIDIAN                            │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ [Botax Accounting] → [Babak M.] → [2025 Annual]       │
│  (click to change)    (clickable)   (clickable)        │
└────────────────────────────────────────────────────────┘

✓ "← Back to Home" link on every screen
✓ Clickable context bar breadcrumb
✓ Can return to Documents anytime
✓ Can revisit Review after Export
```

---

## 2. Re-entering Workflow

### Before (v1):
```
Upload all documents → Process → Review → Export
(no way to add more documents later)
```

### After (v2):
```
DOCUMENTS ←──┐
    ↓        │
PROCESSING   │ User can return
    ↓        │ to add more
REVIEW ←─────┘ files anytime
    ↓
EXPORT

When new documents added:
✓ Only new documents processed
✓ Old decisions preserved
✓ Review shows new exceptions only
✓ Export status auto-updates
```

### Better Scan Detection:
```
┌────────────────────────────────────────────────┐
│ Better Scan Detected                           │
├────────────────────────────────────────────────┤
│                                                │
│ This appears to be a clearer scan of:          │
│ "invoice-1024.pdf"                             │
│                                                │
│ Old scan: 72 DPI, poor OCR confidence         │
│ New scan: 300 DPI, high OCR confidence        │
│                                                │
│ Replace previous version?                      │
│                                                │
│               [Keep Both]  [Replace]          │
└────────────────────────────────────────────────┘
```

---

## 3. Manual Override Paths

### A. Document-Level Actions (in Documents screen)

```
┌────────────────────────────────────────────────────┐
│ Documents                                          │
├────────────────────────────────────────────────────┤
│                                                    │
│ ✓ receipt-2025-01-15.pdf  [Read]            ⋮     │ ← Click menu
│                                                    │
└────────────────────────────────────────────────────┘

Document Actions Menu (⋮):
┌──────────────────────────┐
│ View Details             │
│ Change Category          │
│ Mark as Support Only     │
│ Exclude from Accounting  │
│ Ask Accountant           │
│ Replace with Better Scan │
└──────────────────────────┘
```

### B. Review-Level Actions

```
Each Review Item has 5 action buttons:

[Accept Recommendation]  ← Green, primary action
[Change Category]        ← Opens category picker
[Ask Accountant]         ← Creates Q&A item
[Exclude from Accounting]← Removes from export
[Replace with Better Scan]← Upload replacement
```

### C. Reopen from Export

```
In Export screen:
[Back to Review] button

In Review screen (after returning from Export):
- Shows all items including previously accepted
- User can reopen and change any decision
- Export status updates accordingly
```

---

## 4. Accountant-Controlled Configuration

### New: Setup & Rules Screen

**Replaces**: "Vendors / Rules"

**Three Sections**:

#### A. Vendor Rules (existing, enhanced)
```
┌────────────────────────────────────────────────────┐
│ Petro-Canada                                       │
│ → Vehicle Fuel Expense                             │
│ 95% confidence | 8 transactions                    │
│ [Edit Rule]                                        │
└────────────────────────────────────────────────────┘

[Add New Vendor Rule]
```

#### B. Categories & Account Codes (NEW)
```
┌────────────────────────────────────────────────────┐
│ Vehicle Fuel Expense          [5400]  [Edit]       │
│ Office Supplies               [5200]  [Edit]       │
│ Meals & Entertainment         [5350]  [Edit]       │
│ Capital Equipment             [1600]  [Edit]       │
└────────────────────────────────────────────────────┘

[Add New Category]

Edit modal:
┌──────────────────────────────────┐
│ Edit Category                    │
├──────────────────────────────────┤
│ Name: [Vehicle Fuel Expense]     │
│ Account Code: [5400]             │
│ Type: [Expense ▼]                │
│                                  │
│           [Cancel]  [Save]       │
└──────────────────────────────────┘
```

#### C. Export Mapping (NEW)
```
┌────────────────────────────────────────────────────┐
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

---

## 5. Export Table Configuration

### New: Configure Export Button

```
EXPORT Screen:

[Configure Export]  [Download Accountant Package]
       ↓
Opens Configuration Modal:

┌──────────────────────────────────────────────────────┐
│ Export Configuration                            [×]  │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Template: [Default Accountant Review ▼]             │
│           [QuickBooks Import Template]              │
│           [Generic CSV Template]                    │
│           [My Custom Template]                      │
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
└──────────────────────────────────────────────────────┘
```

**Available Columns**:
- Document ID
- Date
- Vendor
- Amount
- Suggested Category
- Final Category
- Account Code
- HST/GST Flag
- Confidence Score
- Review Status
- Notes
- Source File
- Accountant Question Reference
- Custom fields (extensible)

**Export Templates**:
- Default Accountant Review Template
- QuickBooks Import Template
- Xero Import Template
- Sage Import Template
- Generic CSV Template
- User-created custom templates

---

## 6. Updated Workflow Visualization

```
┌──────────────────────────────────────────────────────┐
│                      HOME                            │
│ [Start New Engagement]                               │
│ Recent: [Continue] existing engagements              │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│              ENGAGEMENT SETUP                        │
│ Firm → Client → Period                               │
│ (clickable breadcrumb for changes)                   │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│                  DOCUMENTS                           │
│ Upload area | Document list with ⋮ menus            │
│ [Upload More Documents] ← always available           │
│ Status: 32 processed | 0 pending                     │
└──────────────────────────────────────────────────────┘
                       ↓
              ┌────────────────┐
              │   PROCESSING   │
              │ (auto-triggered│
              │  for new docs) │
              └────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│                    REVIEW                            │
│ Exception cards with evidence + 5 action buttons     │
│ Can return to Documents to add more                  │
│ Can be reopened from Export to change decisions      │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│                    EXPORT                            │
│ ✓ Ready or ⚠ Needs Attention                        │
│ [Configure Export] [Download Package]                │
│ [Back to Review] to reopen items                     │
└──────────────────────────────────────────────────────┘

        ┌────────────────────────────┐
        │   SETUP & RULES            │
        │ (accessible anytime)       │
        │ - Vendor Rules             │
        │ - Categories & Codes       │
        │ - Export Mapping           │
        └────────────────────────────┘
```

---

## 7. What Stays the Same

**Core Philosophy**:
✓ Step-by-step workflow assistant (not dashboard)
✓ Exception-based review
✓ Evidence-driven decisions
✓ Dark, minimal design
✓ Accounting-friendly terminology
✓ Simple primary path

**Core Screens**:
✓ Home (engagement list)
✓ Engagement Setup (Firm → Client → Period)
✓ Documents (upload area)
✓ Processing (progress indicator)
✓ Review (exception cards)
✓ Accountant Q&A (evidence gathering)
✓ Export (package generation)
✓ System/Advanced (technical features)
✓ Help (placeholder)

---

## 8. What Changes

### Added:
- "← Back to Home" link everywhere
- Clickable context bar breadcrumb
- Document actions menu (⋮)
- Ability to add documents anytime
- Incremental processing
- Setup & Rules screen
- Categories & Account Codes configuration
- Export Mapping configuration
- Export Configuration modal
- Export template system
- Better scan detection + confirmation

### Enhanced:
- Documents screen shows status counts
- Review can be reopened from Export
- "Upload More Documents" always available
- Each document has action menu
- Export has configurable columns

### Removed:
- Nothing removed
- All v1 features retained

---

## Key UX Principles Applied

1. **Never Trap the User**
   - Always provide clear path back
   - Context bar is navigation
   - Can add more documents anytime

2. **System Suggests, User Decides**
   - Confidence scores show suggestion strength
   - Evidence justifies suggestions
   - Manual override always available

3. **Sensible Defaults, Optional Power**
   - System works without configuration
   - Accountants can customize as needed
   - Configuration is non-destructive

4. **Incremental Not Restart**
   - Only new documents reprocessed
   - Old decisions preserved
   - Export status updates automatically

5. **Evidence Not Blind Trust**
   - Show why system suggested something
   - Show confidence level
   - Show related documents

---

## Next Steps

1. **Review & Approval Required**
   - Review MERIDIAN_DESIGN_V2.md
   - Approve refinements
   - Suggest changes if needed

2. **After Approval**
   - Update MERIDIAN_VISUAL_WIREFRAMES.md
   - Update CODEX_IMPLEMENTATION_HANDOFF.md
   - Mark MERIDIAN_DESIGN_V1.md as deprecated
   - Begin visual prototype implementation

3. **NOT Ready Yet**
   - Do NOT start code implementation
   - Do NOT send to Codex
   - Wait for visual design approval first

---

## Files Status

- ✓ **MERIDIAN_DESIGN_V2.md** - Created, awaiting approval
- ⏳ **MERIDIAN_VISUAL_WIREFRAMES_V2.md** - Pending (after approval)
- ⏳ **CODEX_IMPLEMENTATION_HANDOFF_V2.md** - Pending (after approval)
- 📦 **MERIDIAN_DESIGN_V1.md** - Will be marked deprecated after v2 approval

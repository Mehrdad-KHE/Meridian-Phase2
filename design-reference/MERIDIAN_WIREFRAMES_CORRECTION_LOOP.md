# Meridian - Correction Loop Wireframes
**Visual wireframes showing bidirectional workflow and incremental reprocessing**

**⚠️ SOURCE OF TRUTH**: Authoritative wireframes for Meridian correction loop model

**Companion Design**: MERIDIAN_DESIGN_V2_FINAL.md

**Focus**: Key screens demonstrating the correction loop model

**Date**: 2026-05-11 (Final - Approved for Implementation)

---

## Workflow Loop Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    CORRECTION LOOP MODEL                     │
│                                                              │
│                                                              │
│         ┌─────────────┐                                      │
│         │   SETUP     │                                      │
│         └──────┬──────┘                                      │
│                │                                             │
│                ↓                                             │
│         ┌─────────────┐      ← Add More Documents          │
│    ┌───│  DOCUMENTS  │←─────────────────────┐              │
│    │   └──────┬──────┘                       │              │
│    │          │                               │              │
│    │          ↓                               │              │
│    │   ┌─────────────┐                       │              │
│    │   │ PROCESSING  │ (incremental)         │              │
│    │   └──────┬──────┘                       │              │
│    │          │                               │              │
│    │          ↓                               │              │
│    │   ┌─────────────┐      ← Reopen        │              │
│    ├───│   REVIEW    │←──────────────┐       │              │
│    │   └──────┬──────┘   Decisions   │       │              │
│    │          │              ↑        │       │              │
│    │          ↓              │        │       │              │
│    │   ┌─────────────┐      │        │       │              │
│    │   │   EXPORT    │──────┘        │       │              │
│    │   └──────┬──────┘               │       │              │
│    │          │                       │       │              │
│    │     Change Detected             │       │              │
│    │          ↓                       │       │              │
│    │   Status: Needs Attention       │       │              │
│    │          │                       │       │              │
│    │          ↓                       │       │              │
│    │   Choose Action:                │       │              │
│    └──→ Add Documents ───────────────┴───────┘              │
│        Edit Decision ─────────────────────────┘              │
│        Reprocess Changes ────────────────────→               │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Key Features:
✓ Can return to Documents at ANY stage
✓ Can reopen Review decisions after Export
✓ Can add documents while in Review or Export
✓ Only affected items reprocessed
✓ Export status updates automatically
✓ Old work preserved
```

---

## Sidebar Navigation - Always Accessible

```
┏━━━━━━━━━━━━━━━┓
┃ ≡ MERIDIAN    ┃
┣━━━━━━━━━━━━━━━┫
┃ 🏠 Home       ┃ ← Always accessible
┣━━━━━━━━━━━━━━━┫
┃ Current:      ┃
┃ • Documents   ┃ ← Click anytime to add more
┃ • Review      ┃ ← Click anytime to reopen
┃ • Export      ┃ ← Shows live status
┃   [Ready ✓]   ┃    or [Needs Attention ⚠]
┣━━━━━━━━━━━━━━━┫
┃ Accounting    ┃
┃ Setup         ┃
┃               ┃
┃ System /      ┃
┃ Advanced      ┃
┃               ┃
┃ Help          ┃
┗━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar ALWAYS visible
- Documents/Review/Export in "Current" section
- Export shows live status badge
- All items clickable without losing work
- No wizard-style progression
```

---

## Documents Screen - With Loop Behavior

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌──────────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]  #1A1F28  ┃  │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                                  │ ┃
┃ │ Current:      │ │  Documents                                       │ ┃
┃ │ • Documents   │ │                                                  │ ┃
┃ │   (active)    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ • Review      │ │  ┃ Status: 32 processed │ 5 pending │      ┃  │ ┃
┃ │ • Export      │ │  ┃         2 changed    │ 0 excluded        ┃  │ ┃
┃ │   [Ready ✓]   │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                                  │ ┃
┃ │ Accounting    │ │  ┌──────────────────────────────────────────┐  │ ┃
┃ │ Setup         │ │  │ 📤 Upload Documents   #3B82F6 (area)     │  │ ┃
┃ │               │ │  │ Drag and drop files or click to select   │  │ ┃
┃ │ System /      │ │  │ [Select Files]                           │  │ ┃
┃ │ Advanced      │ │  └──────────────────────────────────────────┘  │ ┃
┃ │               │ │                                                  │ ┃
┃ │ Help          │ │  ── All │ Read │ Needs Fix │ Duplicates ──     │ ┃
┃ │               │ │                                                  │ ┃
┃ └───────────────┘ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ ✓ receipt-01.pdf  [Read]           ⋮  ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │                                                  │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ ⏱ receipt-02.pdf  [Pending]        ⋮  ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │                                                  │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ 🔄 receipt-03.pdf  [Changed]       ⋮  ┃   │ ┃
┃                   │  ┃ Category changed to Office Supplies    ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │                                                  │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ ⚠ fuel-scan.jpg  [Needs Fix]       ⋮  ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │                                                  │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ ✓ invoice-large.pdf  [Read]        ⋮  ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │                                                  │ ┃
┃                   │  [Process Pending Documents (5)]  #3B82F6       │ ┃
┃                   │  [Reprocess Changed Documents (2)]  #3B82F6     │ ┃
┃                   │                                                  │ ┃
┃                   └──────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Status bar shows: processed / pending / changed / excluded counts
- Upload area ALWAYS visible (can add more anytime)
- Document states shown with icons:
  ✓ Processed (green)
  ⏱ Pending (amber)
  🔄 Changed (blue)
  ⚠ Needs Fix (red)
- Two action buttons:
  • "Process Pending Documents" (if pending > 0)
  • "Reprocess Changed Documents" (if changed > 0)
- Changed documents show reason below
- Sidebar Export status shows "Ready ✓"
```

---

## Processing Screen - Incremental Reprocessing

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]    ┃  │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ Current:      │ │  Processing                                │ ┃
┃ │ • Documents   │ │                                            │ ┃
┃ │ • Review      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ • Export      │ │  ┃ Reprocessing changed documents     ┃  │ ┃
┃ │   [Ready ✓]   │ │  ┃ 2 of 39 total documents            ┃  │ ┃
┃ ├───────────────┤ │  ┃                                    ┃  │ ┃
┃ │ Accounting    │ │  ┃ Changes:                           ┃  │ ┃
┃ │ Setup         │ │  ┃ • receipt-03.pdf (category)        ┃  │ ┃
┃ │               │ │  ┃ • invoice-12.pdf (better scan)     ┃  │ ┃
┃ │ System /      │ │  ┃                                    ┃  │ ┃
┃ │ Advanced      │ │  ┃ ████████████████░░░░░░░░░░  65%   ┃  │ ┃
┃ │               │ │  ┃                                    ┃  │ ┃
┃ │ Help          │ │  ┃ Current: Reclassifying...          ┃  │ ┃
┃ │               │ │  ┃                                    ┃  │ ┃
┃ └───────────────┘ │  ┃ ✓ Reading documents                ┃  │ ┃
┃                   │  ┃ ✓ Extracting text                  ┃  │ ┃
┃                   │  ┃ ● Reclassifying documents          ┃  │ ┃
┃                   │  ┃ ○ Matching categories              ┃  │ ┃
┃                   │  ┃ ○ Updating review items            ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  37 unchanged documents preserved          │ ┃
┃                   │                                            │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Title: "Reprocessing changed documents" (NOT "Processing all")
- Count: "2 of 39 total" (shows only affected)
- Lists WHAT changed and WHY
- Progress bar for affected items only
- Bottom note: "37 unchanged documents preserved"
- Sidebar Export status remains "Ready ✓" (will update after)
- Auto-navigates to Review when complete if new exceptions
```

---

## Processing Screen - New Documents

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]    ┃  │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ Current:      │ │  Processing                                │ ┃
┃ │ • Documents   │ │                                            │ ┃
┃ │ • Review      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ • Export      │ │  ┃ Processing new documents           ┃  │ ┃
┃ │   [Ready ✓]   │ │  ┃ 5 of 44 total documents            ┃  │ ┃
┃ ├───────────────┤ │  ┃                                    ┃  │ ┃
┃ │ Accounting    │ │  ┃ New uploads:                       ┃  │ ┃
┃ │ Setup         │ │  ┃ • receipt-40.pdf                   ┃  │ ┃
┃ │               │ │  ┃ • receipt-41.pdf                   ┃  │ ┃
┃ │ System /      │ │  ┃ • invoice-15.pdf                   ┃  │ ┃
┃ │ Advanced      │ │  ┃ • invoice-16.pdf                   ┃  │ ┃
┃ │               │ │  ┃ • fuel-receipt-large.pdf           ┃  │ ┃
┃ │ Help          │ │  ┃                                    ┃  │ ┃
┃ │               │ │  ┃ ████████████████████░░░░░  80%    ┃  │ ┃
┃ └───────────────┘ │  ┃                                    ┃  │ ┃
┃                   │  ┃ Current: Classifying document 4/5  ┃  │ ┃
┃                   │  ┃                                    ┃  │ ┃
┃                   │  ┃ ✓ Reading documents                ┃  │ ┃
┃                   │  ┃ ✓ Extracting text                  ┃  │ ┃
┃                   │  ┃ ✓ Checking duplicates              ┃  │ ┃
┃                   │  ┃ ● Classifying documents            ┃  │ ┃
┃                   │  ┃ ○ Matching categories              ┃  │ ┃
┃                   │  ┃ ○ Preparing review items           ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  39 previously processed documents preserved│ ┃
┃                   │                                            │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Title: "Processing new documents" (NOT "Processing all")
- Count: "5 of 44 total" (shows only new)
- Lists NEW document names
- Progress for new documents only
- Bottom note: "39 previously processed documents preserved"
- Sidebar Export will update to "Needs Attention ⚠" if new exceptions
```

---

## Review Screen - With Resolved Items Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌──────────────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]  #1A1F28        ┃ │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ ├───────────────┤ │                                                      │ ┃
┃ │ Current:      │ │  Review                                              │ ┃
┃ │ • Documents   │ │  Resolve exceptions. All other documents have been   │ ┃
┃ │ • Review      │ │  automatically categorized.                          │ ┃
┃ │   (active)    │ │                                                      │ ┃
┃ │ • Export      │ │  6 need attention │ 28 resolved │ 0 pending         │ ┃
┃ │   [Needs ⚠]   │ │                                                      │ ┃
┃ ├───────────────┤ │  ━━━━━━━━━━━━━━ Items Needing Attention ━━━━━━━━━  │ ┃
┃ │ Accounting    │ │                                                      │ ┃
┃ │ Setup         │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │               │ │  ┃ ⚠ 5 fuel receipts from same vendor          ┃  │ ┃
┃ │ System /      │ │  ┃ Multiple similar receipts from Petro-Canada  ┃  │ ┃
┃ │ Advanced      │ │  ┃ [Expand ▼]                                   ┃  │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ Help          │ │                                                      │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ └───────────────┘ │  ┃ 🆕 3 new documents from recent upload        ┃  │ ┃
┃                   │  ┃ Office supplies - needs category confirmation┃  │ ┃
┃                   │  ┃ [Expand ▼]                                   ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                                      │ ┃
┃                   │  (more unresolved items...)                          │ ┃
┃                   │                                                      │ ┃
┃                   │  ━━━━━━━━━━━━━━ Resolved Items (28) ━━━━━━━━━━━━━  │ ┃
┃                   │  [Collapse ▲]                                        │ ┃
┃                   │                                                      │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ ✓ 8 fuel receipts → Vehicle Fuel Expense    ┃  │ ┃
┃                   │  ┃ Accepted recommendation                      ┃  │ ┃
┃                   │  ┃ Resolved: 2025-05-10 14:23                   ┃  │ ┃
┃                   │  ┃ [Reopen Decision]  #374151                   ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                                      │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ ✓ 12 office supplies → Office Supplies      ┃  │ ┃
┃                   │  ┃ Category changed manually                    ┃  │ ┃
┃                   │  ┃ Resolved: 2025-05-10 15:45                   ┃  │ ┃
┃                   │  ┃ [Reopen Decision]  #374151                   ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                                      │ ┃
┃                   │  (show all 28 resolved items...)                     │ ┃
┃                   │                                                      │ ┃
┃                   │                         [Continue to Export] #3B82F6│ ┃
┃                   └──────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Status: "6 need attention │ 28 resolved │ 0 pending"
- TWO sections: "Needing Attention" and "Resolved Items"
- 🆕 badge for new items from recent upload
- Resolved section is COLLAPSIBLE
- Each resolved item shows:
  • What was decided
  • When resolved
  • [Reopen Decision] button
- Clicking "Reopen Decision":
  → Moves item back to "Needing Attention"
  → Shows full evidence again
  → Updates Export to "Needs Attention"
- Sidebar Export shows "Needs ⚠" (has unresolved items)
```

---

## Export Screen - Ready State

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]    ┃  │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ Current:      │ │  Export                                    │ ┃
┃ │ • Documents   │ │                                            │ ┃
┃ │ • Review      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ • Export      │ │  ┃ ✓ Ready to Export      #10B981    ┃  │ ┃
┃ │   (active)    │ │  ┃ All review items resolved.        ┃  │ ┃
┃ │   [Ready ✓]   │ │  ┃ Your package is ready.            ┃  │ ┃
┃ ├───────────────┤ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ Accounting    │ │                                            │ ┃
┃ │ Setup         │ │  44 documents │ 0 unresolved               │ ┃
┃ │               │ │                                            │ ┃
┃ │ System /      │ │  Export Options:                           │ ┃
┃ │ Advanced      │ │  • Accountant Review Package (Excel)       │ ┃
┃ │               │ │  • QuickBooks-Compatible CSV               │ ┃
┃ │ Help          │ │  • Generic CSV Export                      │ ┃
┃ │               │ │                                            │ ┃
┃ └───────────────┘ │  [Configure Export]  #374151               │ ┃
┃                   │                                            │ ┃
┃                   │  [Download Accountant Package]  #10B981   │ ┃
┃                   │                                            │ ┃
┃                   │  ───────────────────────────────────────  │ ┃
┃                   │                                            │ ┃
┃                   │  Note: You can still add documents or      │ ┃
┃                   │  edit decisions. Export will update        │ ┃
┃                   │  automatically if changes are made.        │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Green checkmark banner
- Sidebar Export shows "Ready ✓"
- Document count and status
- Primary download button (green)
- Note at bottom: Can still add/edit, export will update
- NOT a dead-end - user can navigate away and return
```

---

## Export Screen - Needs Attention State

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]    ┃  │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ Current:      │ │  Export                                    │ ┃
┃ │ • Documents   │ │                                            │ ┃
┃ │ • Review      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ • Export      │ │  ┃ ⚠ Needs Attention      #F59E0B    ┃  │ ┃
┃ │   (active)    │ │  ┃ Some items need to be resolved.   ┃  │ ┃
┃ │   [Needs ⚠]   │ │  ┃                                   ┃  │ ┃
┃ ├───────────────┤ │  ┃ Blockers:                         ┃  │ ┃
┃ │ Accounting    │ │  ┃ • 3 unresolved review items       ┃  │ ┃
┃ │ Setup         │ │  ┃ • 1 unanswered accountant question┃  │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ System /      │ │                                            │ ┃
┃ │ Advanced      │ │  [Go to Review to Resolve Items]           │ ┃
┃ │               │ │  #3B82F6 (blue, primary)                   │ ┃
┃ │ Help          │ │                                            │ ┃
┃ │               │ │  ─────────────────────────────────────    │ ┃
┃ └───────────────┘ │                                            │ ┃
┃                   │  Or download a draft version:              │ ┃
┃                   │  #9CA3AF (muted)                           │ ┃
┃                   │                                            │ ┃
┃                   │  [Download Draft Review Package]           │ ┃
┃                   │  #F59E0B (amber border)                    │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Amber warning banner
- Sidebar Export shows "Needs ⚠"
- Blockers listed clearly
- Primary action: blue button to resolve
- Draft package available but secondary
- Can navigate to Review via sidebar OR button
```

---

## Export Screen - Needs Update State (After Changes)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025]    ┃  │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ Current:      │ │  Export                                    │ ┃
┃ │ • Documents   │ │                                            │ ┃
┃ │ • Review      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ • Export      │ │  ┃ 🔄 Needs Update        #3B82F6    ┃  │ ┃
┃ │   (active)    │ │  ┃ Changes made since last export.   ┃  │ ┃
┃ │   [Update 🔄] │ │  ┃                                   ┃  │ ┃
┃ ├───────────────┤ │  ┃ Changes:                          ┃  │ ┃
┃ │ Accounting    │ │  ┃ • 5 new documents added           ┃  │ ┃
┃ │ Setup         │ │  ┃ • 2 categories changed            ┃  │ ┃
┃ │               │ │  ┃ • 1 vendor rule updated           ┃  │ ┃
┃ │ System /      │ │  ┃                                   ┃  │ ┃
┃ │ Advanced      │ │  ┃ Last exported: 2025-05-10 14:32   ┃  │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ Help          │ │                                            │ ┃
┃ │               │ │  [Reprocess & Update Export]               │ ┃
┃ └───────────────┘ │  #3B82F6 (blue, primary)                   │ ┃
┃                   │                                            │ ┃
┃                   │  ─────────────────────────────────────    │ ┃
┃                   │                                            │ ┃
┃                   │  Previous package still available:         │ ┃
┃                   │  #9CA3AF (muted)                           │ ┃
┃                   │                                            │ ┃
┃                   │  [Download Previous Package]               │ ┃
┃                   │  #374151 (secondary)                       │ ┃
┃                   │  Exported: 2025-05-10 14:32 (44 docs)      │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Blue "Needs Update" indicator (NOT red error)
- Sidebar Export shows "Update 🔄"
- Lists WHAT changed (specific changes)
- Shows last export timestamp
- Primary action: "Reprocess & Update Export" (blue)
- Previous package still available (secondary button)
- User can reprocess to get updated package OR download old one
```

---

## Key Correction Loop Behaviors Summary

### 1. Sidebar Always Shows Status
```
┌───────────────┐
│ Current:      │
│ • Documents   │ ← Always clickable
│ • Review      │ ← Always clickable
│ • Export      │ ← Shows live status:
│   [Ready ✓]   │    • Ready ✓
│   [Needs ⚠]   │    • Needs Attention ⚠
│   [Update 🔄] │    • Needs Update 🔄
└───────────────┘
```

### 2. Documents Screen Counts
```
Status: 32 processed │ 5 pending │ 2 changed │ 0 excluded

[Process Pending Documents (5)]     ← Only if pending > 0
[Reprocess Changed Documents (2)]   ← Only if changed > 0
```

### 3. Processing Types
```
Initial:      "Processing all documents (32 documents)"
New Docs:     "Processing new documents (5 of 37 total)"
Changes:      "Reprocessing changed documents (2 of 37 total)"
Rule Change:  "Reprocessing affected documents (12 of 37 total)"
```

### 4. Review Sections
```
━━━━━━━━━━ Items Needing Attention ━━━━━━━━━━
(Show unresolved items here)

━━━━━━━━━━ Resolved Items (28) [Collapse ▲] ━━━━━━━━━━
(Show resolved items with [Reopen Decision] button)
```

### 5. Export States
```
✓ Ready           → All resolved, no changes
⚠ Needs Attention → Has unresolved items
🔄 Needs Update   → Changes made since export
```

---

## Implementation Critical Points

1. **Sidebar Status Updates**
   - Export status badge updates automatically
   - Changes anywhere trigger status update
   - User sees status without navigating

2. **Incremental Processing**
   - Track which documents changed
   - Process only affected documents
   - Preserve unchanged work
   - Clear labeling of scope

3. **Reopenable Decisions**
   - Resolved items stored separately
   - Can reopen and return to unresolved
   - Export status updates when reopened

4. **After-Change Navigation**
   - Don't auto-jump to Export
   - Land on relevant next step
   - User controls when to export

5. **Previous Package Available**
   - Even after changes, old package downloadable
   - Shows timestamp and doc count
   - User chooses: update or use old

---

**Status**: Correction loop model approved. Ready for Codex handoff.

**Source of Truth Files**:
- ✓ **MERIDIAN_DESIGN_V2_FINAL.md** (design specification - SOURCE OF TRUTH)
- ✓ **MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md** (this document - key wireframes - SOURCE OF TRUTH)
- ✓ **MERIDIAN_WORKFLOW_ROADMAP_UPDATE.md** (roadmap specification)
- ✓ **MERIDIAN_FINAL_WIREFRAMES_WITH_ROADMAP.md** (complete wireframes with roadmap)
- ⏳ **CODEX_IMPLEMENTATION_HANDOFF_V2.md** (implementation handoff - in progress)

# Meridian - Final Wireframes with Workflow Roadmap
**Complete visual design with persistent workflow navigation**

**Date**: 2026-05-11 (Final with Roadmap)

---

## Workflow Roadmap Component

### Visual Design

```
┌────────────────────────────────────────────────────────────────────┐
│                     WORKFLOW ROADMAP                               │
├────────────────────────────────────────────────────────────────────┤
│  ✓ Home  →  ✓ Setup  →  ● Documents  →  ○ Processing  →  Review   │
│  #10B981    #10B981       #3B82F6          #9CA3AF       #6B7280   │
│  done       done         current          accessible     locked     │
│  (click)    (click)      (current)        (click)     (can't click)│
└────────────────────────────────────────────────────────────────────┘

States:
✓ Completed  - Green checkmark, clickable
● Current    - Blue dot, highlighted, clickable
○ Accessible - Hollow circle, clickable (conditions met)
  Locked     - No icon, grayed out, not clickable

Hover on locked:
"Complete current stage to continue" or specific reason
```

---

## Screen Layouts with Roadmap

### Layout Pattern (All Workflow Screens)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────┐ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ SIDEBAR  │ │  ┃ WORKFLOW ROADMAP (horizontal)         ┃  │ ┃
┃ │          │ │  ┃ Home → Setup → Docs → Proc → Review   ┃  │ ┃
┃ │ • Home   │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ • Acct   │ │  ┌────────────────────────────────────────┐  │ ┃
┃ │ • System │ │  │ CONTEXT BAR                            │  │ ┃
┃ │ • Help   │ │  │ [Firm] → [Client] → [Period]           │  │ ┃
┃ │          │ │  └────────────────────────────────────────┘  │ ┃
┃ │          │ │                                                │ ┃
┃ │          │ │  MAIN CONTENT                                 │ ┃
┃ │          │ │                                                │ ┃
┃ └──────────┘ └────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Hierarchy:
1. Workflow Roadmap (primary workflow navigation)
2. Context Bar (engagement context)
3. Main Content
4. Sidebar (auxiliary navigation)
```

---

## 1. Home Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  MERIDIAN                                      │ ┃
┃ ├──────────┤ │                                                │ ┃
┃ │🏠Home    │ │  ┌──────────────────────────────────────────┐ │ ┃
┃ │(active)  │ │  │ Start New Engagement  #3B82F6 (blue)     │ │ ┃
┃ ├──────────┤ │  └──────────────────────────────────────────┘ │ ┃
┃ │Accounting│ │                                                │ ┃
┃ │Setup     │ │  ─────────────────────────────                 │ ┃
┃ │System/   │ │                                                │ ┃
┃ │Advanced  │ │  Recent Engagements                            │ ┃
┃ │Help      │ │                                                │ ┃
┃ └──────────┘ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Daniel Roberts     #1A1F28    ┃  │ ┃
┃              │  ┃ 2025 Annual                           ┃  │ ┃
┃              │  ┃ Status: Review 6 items  #F59E0B       ┃  │ ┃
┃              │  ┃ [Continue] #3B82F6                    ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                │ ┃
┃              │  (more engagements...)                         │ ┃
┃              └────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- NO ROADMAP on Home (not in workflow yet)
- Simple engagement list
- [Continue] navigates to appropriate workflow stage
```

---

## 2. Engagement Setup - Firm Selection

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├──────────┤ │  ┃ WORKFLOW ROADMAP                               ┃ │ ┃
┃ │🏠Home    │ │  ┃ ✓Home → ●Setup → Documents → ... → Export     ┃ │ ┃
┃ ├──────────┤ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │Accounting│ │  (No context bar yet - setup not complete)         │ ┃
┃ │Setup     │ │                                                    │ ┃
┃ │System/   │ │  Select Accountant / Firm                          │ ┃
┃ │Advanced  │ │                                                    │ ┃
┃ │Help      │ │  Select a firm or add a new one                    │ ┃
┃ └──────────┘ │  #9CA3AF (muted)                                   │ ┃
┃              │                                                    │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Northpeak Accounting           #1A1F28        ┃  │ ┃
┃              │  ┃ Toronto, ON                               ┃  │ ┃
┃              │  ┃ [Select Firm] #3B82F6                     ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                    │ ┃
┃              │  (more firms...)                                   │ ┃
┃              │                                                    │ ┃
┃              │  [Add New Firm] #374151 (secondary)                │ ┃
┃              └────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
✓ Home     - Completed, clickable (go back to home)
● Setup    - Current, highlighted
  Documents - Locked (setup not complete)
  ...       - Locked

Visual Notes:
- Roadmap appears at top
- Home checkmark shows it's completed
- Setup is current (blue dot)
- Later stages grayed out (setup incomplete)
- No local "Back" button needed
- Click "Home" in roadmap to go back
```

---

## 3. Documents Screen - Initial Upload

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌──────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├──────────┤ │  ┃ WORKFLOW ROADMAP                                   ┃ │ ┃
┃ │🏠Home    │ │  ┃ ✓Home → ✓Setup → ●Documents → Processing → ...   ┃ │ ┃
┃ ├──────────┤ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │Accounting│ │  ┌────────────────────────────────────────────────────┐ │ ┃
┃ │Setup     │ │  │ [Northpeak] → [Daniel M.] → [2025 Annual]  #1A1F28     │ │ ┃
┃ │System/   │ │  └────────────────────────────────────────────────────┘ │ ┃
┃ │Advanced  │ │                                                        │ ┃
┃ │Help      │ │  Documents                                             │ ┃
┃ └──────────┘ │                                                        │ ┃
┃              │  Status: 0 processed | 0 pending                       │ ┃
┃              │                                                        │ ┃
┃              │  ┌──────────────────────────────────────────────────┐ │ ┃
┃              │  │ 📤 Upload Documents   #3B82F6 (upload area)      │ │ ┃
┃              │  │ Drag and drop or click to select files           │ │ ┃
┃              │  │ [Select Files]                                   │ │ ┃
┃              │  └──────────────────────────────────────────────────┘ │ ┃
┃              │                                                        │ ┃
┃              │  ── All │ Read │ Needs Fix │ Duplicates ──           │ ┃
┃              │                                                        │ ┃
┃              │  (no documents yet)                                    │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
✓ Home       - Completed, clickable
✓ Setup      - Completed, clickable
● Documents  - Current, highlighted
  Processing - Locked (no documents yet)
  Review     - Locked
  ...        - Locked

Visual Notes:
- Roadmap shows progress
- Setup completed (green checkmark)
- Documents is current (blue dot)
- Later stages locked until documents uploaded
- Context bar visible (engagement setup complete)
```

---

## 4. Documents Screen - With Pending Files

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌──────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├──────────┤ │  ┃ ✓Home → ✓Setup → ●Documents → ○Processing → ...  ┃ │ ┃
┃ │🏠Home    │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ ├──────────┤ │  ┌────────────────────────────────────────────────────┐ │ ┃
┃ │Accounting│ │  │ [Northpeak] → [Daniel M.] → [2025 Annual]              │ │ ┃
┃ │Setup     │ │  └────────────────────────────────────────────────────┘ │ ┃
┃ │System/   │ │                                                        │ ┃
┃ │Advanced  │ │  Documents                                             │ ┃
┃ │Help      │ │                                                        │ ┃
┃ └──────────┘ │  Status: 0 processed | 5 pending | 0 changed          │ ┃
┃              │                                                        │ ┃
┃              │  ┌──────────────────────────────────────────────────┐ │ ┃
┃              │  │ Upload Documents (can add more anytime)          │ │ ┃
┃              │  └──────────────────────────────────────────────────┘ │ ┃
┃              │                                                        │ ┃
┃              │  ── All (5) │ Read │ Needs Fix │ Duplicates ──       │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ ⏱ receipt-01.pdf  [Pending]               ⋮  ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │  (4 more pending documents...)                         │ ┃
┃              │                                                        │ ┃
┃              │  [Process Pending Documents (5)]  #3B82F6 (blue)      │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
✓ Home       - Completed, clickable
✓ Setup      - Completed, clickable
● Documents  - Current
○ Processing - Accessible (documents uploaded, hollow circle, clickable)
  Review     - Locked
  ...        - Locked

Visual Notes:
- Processing now shows ○ (accessible - can click OR use button)
- Status shows "5 pending"
- Button: [Process Pending Documents (5)]
- User can: click button OR click "Processing" in roadmap
- Both actions do the same thing (navigate to Processing)
```

---

## 5. Processing Screen - Initial Processing

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├──────────┤ │  ┃ ✓Home → ✓Setup → ✓Documents → ●Processing → ...┃ │ ┃
┃ │🏠Home    │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ ├──────────┤ │  ┌──────────────────────────────────────────────────┐ │ ┃
┃ │Accounting│ │  │ [Northpeak] → [Daniel M.] → [2025]                    │ │ ┃
┃ │Setup     │ │  └──────────────────────────────────────────────────┘ │ ┃
┃ │System/   │ │                                                      │ ┃
┃ │Advanced  │ │  Processing                                          │ ┃
┃ │Help      │ │                                                      │ ┃
┃ └──────────┘ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Processing all documents                     ┃  │ ┃
┃              │  ┃ 37 documents                                 ┃  │ ┃
┃              │  ┃                                              ┃  │ ┃
┃              │  ┃ ████████████████████░░░░░░░░  75%           ┃  │ ┃
┃              │  ┃                                              ┃  │ ┃
┃              │  ┃ Current: Classifying documents               ┃  │ ┃
┃              │  ┃                                              ┃  │ ┃
┃              │  ┃ ✓ Reading documents                          ┃  │ ┃
┃              │  ┃ ✓ Extracting text                            ┃  │ ┃
┃              │  ┃ ✓ Checking duplicates                        ┃  │ ┃
┃              │  ┃ ● Classifying documents                      ┃  │ ┃
┃              │  ┃ ○ Matching categories                        ┃  │ ┃
┃              │  ┃ ○ Preparing review items                     ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                      │ ┃
┃              │  (Auto-navigates to Review when complete)            │ ┃
┃              └──────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
✓ Home       - Completed
✓ Setup      - Completed
✓ Documents  - Completed (checkmark added)
● Processing - Current
  Review     - Locked (processing not done)
  ...        - Locked

Visual Notes:
- Documents now has checkmark (completed)
- Processing is current
- Progress bar shows status
- Step indicators show current step
- Auto-navigates to Review when done
```

---

## 6. Review Screen - With Resolved Section

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌──────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├──────────┤ │  ┃ ✓Home → ✓Setup → ✓Docs → ✓Process → ●Review → ...┃ │ ┃
┃ │🏠Home    │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ ├──────────┤ │  ┌────────────────────────────────────────────────────┐ │ ┃
┃ │Accounting│ │  │ [Northpeak] → [Daniel M.] → [2025]                      │ │ ┃
┃ │Setup     │ │  └────────────────────────────────────────────────────┘ │ ┃
┃ │System/   │ │                                                        │ ┃
┃ │Advanced  │ │  Review                                                │ ┃
┃ │Help      │ │  Resolve exceptions. Others auto-categorized.          │ ┃
┃ └──────────┘ │                                                        │ ┃
┃              │  6 need attention │ 28 resolved │ 0 pending            │ ┃
┃              │                                                        │ ┃
┃              │  ━━━━━━━━ Items Needing Attention ━━━━━━━━            │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ ⚠ 5 fuel receipts from same vendor           ┃  │ ┃
┃              │  ┃ Multiple similar from Petro-Canada            ┃  │ ┃
┃              │  ┃ [Expand ▼]                                    ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  (5 more unresolved items...)                          │ ┃
┃              │                                                        │ ┃
┃              │  ━━━━━━━━ Resolved Items (28) [Collapse ▲] ━━━━━━━━  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ ✓ 8 fuel receipts → Vehicle Fuel              ┃  │ ┃
┃              │  ┃ Accepted recommendation                        ┃  │ ┃
┃              │  ┃ [Reopen Decision] #374151                     ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  (27 more resolved...)                                 │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
✓ Home       - Completed, clickable
✓ Setup      - Completed, clickable
✓ Documents  - Completed, clickable (can go back to add more!)
✓ Processing - Completed, clickable
● Review     - Current
  Q&A        - Locked
  Export     - Locked (6 unresolved items)

Visual Notes:
- All previous stages have checkmarks (clickable)
- Can click "Documents" to go back and add more files
- Review is current
- Export locked until items resolved
- Resolved section collapsible with [Reopen Decision] buttons
```

---

## 7. Go Back to Documents Flow - From Review

### Step 1: User in Review, Clicks "Documents" in Roadmap

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌──────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │          │ │  ┃ ✓Home → ✓Setup → ●Docs → ✓Process → ○Review → ...┃ │ ┃
┃ │          │ │  ┃                  ^^^^                               ┃ │ ┃
┃ │          │ │  ┃                  User clicked here                 ┃ │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │          │ │  ┌────────────────────────────────────────────────────┐ │ ┃
┃ │          │ │  │ [Northpeak] → [Daniel M.] → [2025]                      │ │ ┃
┃ │          │ │  └────────────────────────────────────────────────────┘ │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Documents                                             │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Status: 37 processed | 0 pending | 0 changed         │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ┌──────────────────────────────────────────────────┐ │ ┃
┃ │          │ │  │ 📤 Upload Documents (add more anytime)           │ │ ┃
┃ │          │ │  │ [Select Files]                                   │ │ ┃
┃ │          │ │  └──────────────────────────────────────────────────┘ │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ── All (37) │ Read (35) │ Needs Fix (2) ──          │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  (existing 37 documents listed...)                     │ ┃
┃ │          │ │                                                        │ ┃
┃ └──────────┘ └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State Changed:
● Documents  - Current (user navigated backward)
○ Review     - Accessible (can return, hollow circle)

Visual Notes:
- Roadmap updated: Documents is current
- Review changed from current to accessible (hollow circle)
- All 37 existing documents visible
- Upload area active - can add more
- Previous work preserved
```

### Step 2: User Uploads 5 New Files

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌──────────────────────────────────────────────────────────┐ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │          │ │  ┃ ✓Home → ✓Setup → ●Docs → ○Process → ○Review → ...┃ │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Documents                                             │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Status: 37 processed | 5 pending | 0 changed         │ ┃
┃ │          │ │                                    ^^^^^               │ ┃
┃ │          │ │                             New files added            │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ── All (42) │ Read (35) │ Pending (5) ──            │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ ⏱ receipt-38.pdf  [Pending]               ⋮  ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │  (4 more pending...)                                   │ ┃
┃ │          │ │  (37 processed docs...)                                │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  [Process Pending Documents (5)]  #3B82F6             │ ┃
┃ │          │ │                                                        │ ┃
┃ └──────────┘ └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
○ Processing - Now accessible (hollow circle - can click)
○ Review     - Still accessible (can return)

Visual Notes:
- Status: "5 pending" added
- Processing in roadmap now accessible (○)
- Button appears: [Process Pending Documents (5)]
- User can: click button OR click "Processing" in roadmap
```

### Step 3: User Clicks "Processing" or Button

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │          │ │  ┃ ✓Home → ✓Setup → ✓Docs → ●Process → ○Review ...┃ │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │          │ │                                                      │ ┃
┃ │          │ │  Processing                                          │ ┃
┃ │          │ │                                                      │ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ Processing new documents                     ┃  │ ┃
┃ │          │ │  ┃ 5 of 42 total documents                      ┃  │ ┃
┃ │          │ │  ┃ ^^^^^ Only new files being processed         ┃  │ ┃
┃ │          │ │  ┃                                              ┃  │ ┃
┃ │          │ │  ┃ New uploads:                                 ┃  │ ┃
┃ │          │ │  ┃ • receipt-38.pdf                             ┃  │ ┃
┃ │          │ │  ┃ • receipt-39.pdf                             ┃  │ ┃
┃ │          │ │  ┃ • invoice-20.pdf                             ┃  │ ┃
┃ │          │ │  ┃ • invoice-21.pdf                             ┃  │ ┃
┃ │          │ │  ┃ • fuel-large.pdf                             ┃  │ ┃
┃ │          │ │  ┃                                              ┃  │ ┃
┃ │          │ │  ┃ ████████████████░░░░░░░░  60%               ┃  │ ┃
┃ │          │ │  ┃                                              ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │                                                      │ ┃
┃ │          │ │  37 previously processed documents preserved         │ ┃
┃ │          │ │  ^^^^ Old work NOT reprocessed                       │ ┃
┃ └──────────┘ └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
● Processing - Current

Visual Notes:
- Title: "Processing new documents" (NOT "all")
- Count: "5 of 42 total"
- Lists ONLY new document names
- Bottom note: "37 previously processed documents preserved"
- INCREMENTAL processing clearly shown
```

### Step 4: Processing Complete, Navigate to Review

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌──────────────────────────────────────────────────────────┐ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │          │ │  ┃ ✓Home → ✓Setup → ✓Docs → ✓Process → ●Review → ...┃ │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Review                                                │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  8 need attention │ 34 resolved │ 0 pending            │ ┃
┃ │          │ │  ^^^^^ 2 new exceptions from recent upload             │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ━━━━━━━━ Items Needing Attention ━━━━━━━━            │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ 🆕 2 new documents from recent upload         ┃  │ ┃
┃ │          │ │  ┃ Office supplies - needs category confirm      ┃  │ ┃
┃ │          │ │  ┃ [Expand ▼]                                    ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ ⚠ 5 fuel receipts from same vendor           ┃  │ ┃
┃ │          │ │  ┃ (from before - still unresolved)              ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  (6 more unresolved...)                                │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ━━━━━━━━ Resolved Items (34) ━━━━━━━━                │ ┃
┃ │          │ │  (still preserved from before)                         │ ┃
┃ └──────────┘ └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
● Review - Current (back to review)

Visual Notes:
- Status: "8 need attention" (was 6, now 8)
- 🆕 badge on NEW exceptions from recent upload
- Old unresolved items still there (preserved)
- Resolved items still preserved (34, was 28 + 6 auto-resolved from new)
- User continues workflow from here
- Previous work NEVER lost
```

---

## 8. Export Screen - Ready State

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────┐ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ ✓Home → ✓Setup → ✓Docs → ... → ●Export  ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │                                                  │ ┃
┃ │          │ │  Export                                          │ ┃
┃ │          │ │                                                  │ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ ✓ Ready to Export      #10B981          ┃  │ ┃
┃ │          │ │  ┃ All review items resolved.              ┃  │ ┃
┃ │          │ │  ┃ Your package is ready.                  ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │                                                  │ ┃
┃ │          │ │  42 documents │ 0 unresolved                    │ ┃
┃ │          │ │                                                  │ ┃
┃ │          │ │  [Configure Export]  [Download Package]         │ ┃
┃ │          │ │                                                  │ ┃
┃ │          │ │  ──────────────────────────────────────────    │ ┃
┃ │          │ │                                                  │ ┃
┃ │          │ │  Note: You can still go back to Documents       │ ┃
┃ │          │ │  or Review using the roadmap above. Export      │ ┃
┃ │          │ │  will update if changes are made.               │ ┃
┃ └──────────┘ └────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Roadmap State:
✓ All stages completed, all clickable

Visual Notes:
- Roadmap shows all completed (all checkmarks)
- Export is current
- Can still click any previous stage in roadmap
- Note explicitly states can go back
- NOT a dead-end
```

---

## Key Roadmap Behaviors Summary

### 1. Roadmap Always Shows Full Workflow

```
✓ Home → ✓ Setup → ● Documents → ○ Processing → Review → Q&A → Export

States visible:
✓ Completed   - Green checkmark, clickable
● Current     - Blue dot, highlighted
○ Accessible  - Hollow circle, clickable (conditions met)
  Locked      - Grayed out, not clickable (conditions not met)
```

### 2. Backward Navigation Always Allowed

```
User in Export can click:
- Home (go to engagement list)
- Setup (revisit firm/client/period)
- Documents (add more files!)
- Processing (see results)
- Review (reopen decisions)
- Q&A (check questions)
```

### 3. Forward Navigation Conditional

```
Can advance IF:
- Previous stages complete
- Current stage conditions met

Cannot advance IF:
- Required work not done
- Hover shows reason: "Upload documents to continue"
```

### 4. Go Back and Continue Pattern

```
Step 1: User in Review
Step 2: Click "Documents" in roadmap (backward - allowed)
Step 3: Upload new files
Step 4: Click "Processing" in roadmap OR button (forward)
Step 5: Process new files only (incremental)
Step 6: Return to Review with new exceptions
Step 7: Previous work preserved throughout
```

---

## Implementation Critical Points

1. **Roadmap Component**
   - Always at top of workflow screens
   - Updates state automatically
   - Handles click events
   - Shows hover tooltips for locked stages

2. **State Management**
   - Track completed stages
   - Track current stage
   - Calculate accessible stages
   - Update on navigation

3. **Navigation Integration**
   - Roadmap = primary workflow navigation
   - Remove redundant back buttons
   - Sidebar for non-workflow navigation
   - Context bar for engagement context

4. **Incremental Processing**
   - Track pending/changed documents
   - Process only affected items
   - Preserve unchanged work
   - Clear labeling of scope

5. **Preserved Work**
   - Review decisions preserved
   - Resolved items preserved
   - Processed documents preserved
   - Export previous package available

---

**Status**: Final wireframes with roadmap complete

**Files**:
- ✓ MERIDIAN_WORKFLOW_ROADMAP_UPDATE.md (roadmap specification)
- ✓ MERIDIAN_FINAL_WIREFRAMES_WITH_ROADMAP.md (this document)
- ⏳ Update main design doc with roadmap
- ⏳ Prepare for Codex handoff (after approval)

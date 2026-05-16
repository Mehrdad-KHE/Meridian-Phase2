# Meridian - Visual Wireframes v2
**Low-Fidelity Visual Design Mockups**

Dark theme, calm, minimal, accounting-workflow oriented.

**Status**: Visual wireframes incorporating sidebar navigation, context-aware actions, and refined terminology

**Supersedes**: MERIDIAN_VISUAL_WIREFRAMES.md (v1)

---

## Design System

### Color Palette
```
Background Dark:    #0F1419  ████
Background Medium:  #1A1F28  ████
Background Light:   #252C37  ████

Primary Blue:       #3B82F6  ████
Success Green:      #10B981  ████
Warning Amber:      #F59E0B  ████
Error Red:          #EF4444  ████
Muted Gray:         #6B7280  ████

Text Primary:       #F9FAFB
Text Secondary:     #D1D5DB
Text Muted:         #9CA3AF
```

### Typography
```
H1: 24px, weight 600
H2: 20px, weight 600
H3: 16px, weight 600
Body: 14px, weight 400
Small: 12px, weight 400
```

### Spacing
```
4px, 8px, 12px, 16px, 24px, 32px, 48px
```

### Border Radius
```
Small: 4px
Medium: 8px
Large: 12px
```

---

## Layout System

### Sidebar + Main Content Layout

```
┌──────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────────────────────────┐ │
│ │          │  │                              │ │
│ │ SIDEBAR  │  │     MAIN CONTENT             │ │
│ │ (fixed)  │  │     (scrollable)             │ │
│ │          │  │                              │ │
│ │  240px   │  │     remaining width          │ │
│ │          │  │                              │ │
│ └──────────┘  └──────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## 0. Home Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  MERIDIAN                                  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ 🏠 Home       │ │  ┌──────────────────────────────────────┐ │ ┃
┃ │   (active)    │ │  │ Start New Engagement  │ #3B82F6       │ │ ┃
┃ ├───────────────┤ │  └──────────────────────────────────────┘ │ ┃
┃ │               │ │                                            │ ┃
┃ │ Accounting    │ │  ────────────────────────────────          │ ┃
┃ │ Setup         │ │                                            │ ┃
┃ │               │ │  Recent Engagements                        │ ┃
┃ │ System /      │ │                                            │ ┃
┃ │ Advanced      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │               │ │  ┃ Babak Mohammadhosseini     #1A1F28 ┃  │ ┃
┃ │ Help          │ │  ┃ 2025 Annual                (card)   ┃  │ ┃
┃ │               │ │  ┃ Status: Review 6 items  #F59E0B    ┃  │ ┃
┃ └───────────────┘ │  ┃ ┌──────────┐                       ┃  │ ┃
┃                   │  ┃ │Continue│ #3B82F6                 ┃  │ ┃
┃                   │  ┃ └──────────┘                       ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ Acme Trucking Ltd.         #1A1F28 ┃  │ ┃
┃                   │  ┃ 2024 Q4                    (card)   ┃  │ ┃
┃                   │  ┃ Status: Ready to export #10B981    ┃  │ ┃
┃                   │  ┃ ┌──────────┐                       ┃  │ ┃
┃                   │  ┃ │Continue│ #3B82F6                 ┃  │ ┃
┃                   │  ┃ └──────────┘                       ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┌───────────┐                            │ ┃
┃                   │  │ View All  │ #374151 (secondary)        │ ┃
┃                   │  └───────────┘                            │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar always visible on left (240px wide, #1A1F28)
- Home highlighted in sidebar
- No context bar (not in engagement yet)
- Simple engagement list in main content
- Status color-coded (amber for needs attention, green for ready)
```

---

## 1. Engagement Setup - Select Firm

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  Select Accountant / Firm                  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ 🏠 Home       │ │  [ENGAGEMENT SETUP] #3B82F6 badge          │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │               │ │  Select a firm or add a new one            │ ┃
┃ │ Accounting    │ │  #9CA3AF (muted text)                      │ ┃
┃ │ Setup         │ │                                            │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ System /      │ │  ┃ Botax Accounting       #1A1F28     ┃  │ ┃
┃ │ Advanced      │ │  ┃ Toronto, ON            (card)      ┃  │ ┃
┃ │               │ │  ┃ ┌──────────────┐                  ┃  │ ┃
┃ │ Help          │ │  ┃ │ Select Firm  │ #3B82F6          ┃  │ ┃
┃ │               │ │  ┃ └──────────────┘                  ┃  │ ┃
┃ └───────────────┘ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ Smith & Associates CPA #1A1F28     ┃  │ ┃
┃                   │  ┃ Vancouver, BC          (card)      ┃  │ ┃
┃                   │  ┃ ┌──────────────┐                  ┃  │ ┃
┃                   │  ┃ │ Select Firm  │ #3B82F6          ┃  │ ┃
┃                   │  ┃ └──────────────┘                  ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┌──────────────┐                         │ ┃
┃                   │  │ Add New Firm │ #374151 (outline)       │ ┃
┃                   │  └──────────────┘                         │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar visible, Home accessible
- "ENGAGEMENT SETUP" badge shows current phase
- Firm cards with selection buttons
- No "Back to Home" link needed (sidebar provides it)
- No context bar yet (firm not selected)
```

---

## 2. Engagement Setup - Select Client

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  Select Client                             │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ 🏠 Home       │ │  [ENGAGEMENT SETUP] #3B82F6 badge          │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ Accounting    │ │  ┃ [Botax Accounting]        #1A1F28  ┃  │ ┃
┃ │ Setup         │ │  ┃ (clickable, blue left border)      ┃  │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ System /      │ │                                            │ ┃
┃ │ Advanced      │ │  Select a client or add a new one          │ ┃
┃ │               │ │  #9CA3AF (muted)                           │ ┃
┃ │ Help          │ │                                            │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ └───────────────┘ │  ┃ Babak Mohammadhosseini #1A1F28     ┃  │ ┃
┃                   │  ┃ Self-employed contractor           ┃  │ ┃
┃                   │  ┃ ┌───────────────┐                  ┃  │ ┃
┃                   │  ┃ │ Select Client │ #3B82F6          ┃  │ ┃
┃                   │  ┃ └───────────────┘                  ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┌────────────────┐  ┌──────┐            │ ┃
┃                   │  │ Add New Client │  │ Back │            │ ┃
┃                   │  └────────────────┘  └──────┘            │ ┃
┃                   │  #374151 (outline)                         │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Context bar shows selected firm (clickable)
- [Back] button for local step flow (not "Back to Home")
- Context bar has blue left border highlighting
```

---

## 3. Engagement Setup - Select Period

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  Select Accounting Period                  │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ 🏠 Home       │ │  [ENGAGEMENT SETUP] #3B82F6 badge          │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ Accounting    │ │  ┃ [Botax] → [Babak M.]  #1A1F28      ┃  │ ┃
┃ │ Setup         │ │  ┃ (both clickable, blue left border) ┃  │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ System /      │ │                                            │ ┃
┃ │ Advanced      │ │  Select the fiscal year and period         │ ┃
┃ │               │ │                                            │ ┃
┃ │ Help          │ │  Fiscal Year *                             │ ┃
┃ │               │ │  [2025 ▼] #1A1F28 dropdown                 │ ┃
┃ └───────────────┘ │                                            │ ┃
┃                   │  Period Type *                             │ ┃
┃                   │  [Annual / Full Year ▼] #1A1F28           │ ┃
┃                   │                                            │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ Period: Jan 1, 2025 - Dec 31, 2025┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┌──────┐  ┌────────────────────────┐    │ ┃
┃                   │  │ Back │  │ Continue to Documents  │    │ ┃
┃                   │  └──────┘  └────────────────────────┘    │ ┃
┃                   │  #374151    #3B82F6 (primary)             │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Context bar shows Firm → Client (both clickable)
- [Back] button for local step flow
- [Continue to Documents] advances workflow
```

---

## 4. Documents Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌──────────────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025 Annual] #1A1F28 ┃ │ ┃
┃ │ 🏠 Home       │ │  ┃ (all clickable, blue left border)             ┃ │ ┃
┃ ├───────────────┤ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │ Current:      │ │                                                      │ ┃
┃ │ • Documents   │ │  Documents                                           │ ┃
┃ │   (active)    │ │                                                      │ ┃
┃ │ • Review      │ │  ┌───────────────────────────────────────────────┐  │ ┃
┃ │ • Export      │ │  │  📤 Upload Documents  #3B82F6 (large area)    │  │ ┃
┃ ├───────────────┤ │  │  Drag and drop files or click to select       │  │ ┃
┃ │ Accounting    │ │  │  [Select Files] button                        │  │ ┃
┃ │ Setup         │ │  └───────────────────────────────────────────────┘  │ ┃
┃ │               │ │                                                      │ ┃
┃ │ System /      │ │  ── All │ Read │ Needs Fix │ Duplicates │ Excluded─ │ ┃
┃ │ Advanced      │ │   (tabs, All active)                                 │ ┃
┃ │               │ │                                                      │ ┃
┃ │ Help          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃ │               │ │  ┃ ✓ receipt-2025-01-15.pdf  [Read]     ⋮    ┃   │ ┃
┃ └───────────────┘ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │     │                                               │ ┃
┃                   │     └─ ⋮ Menu (context-aware):                     │ ┃
┃                   │        • View Details                               │ ┃
┃                   │        • Change Category                            │ ┃
┃                   │        • Mark as Support Only                       │ ┃
┃                   │        • Ask Accountant                             │ ┃
┃                   │        • Exclude from Accounting                    │ ┃
┃                   │                                                      │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ ⚠ fuel-receipt-scan.jpg  [Needs Fix]  ⋮  ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │     │                                               │ ┃
┃                   │     └─ ⋮ Menu (unreadable document):               │ ┃
┃                   │        • Re-upload Document                         │ ┃
┃                   │        • Hold for Manual Entry                      │ ┃
┃                   │        • Exclude from Accounting                    │ ┃
┃                   │                                                      │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │ ┃
┃                   │  ┃ 📄 invoice-duplicate.pdf [Duplicate]  ⋮  ┃   │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │ ┃
┃                   │     │                                               │ ┃
┃                   │     └─ ⋮ Menu (duplicate):                         │ ┃
┃                   │        • Compare with Original                      │ ┃
┃                   │        • Replace Previous Version                   │ ┃
┃                   │        • Keep Both Documents                        │ ┃
┃                   │        • Exclude from Accounting                    │ ┃
┃                   │                                                      │ ┃
┃                   │  32 documents processed │ 0 pending                  │ ┃
┃                   │  [Upload More Documents] #374151                     │ ┃
┃                   │                                                      │ ┃
┃                   │                [Continue to Processing] #3B82F6     │ ┃
┃                   └──────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar shows "Current" engagement section with Documents highlighted
- Context bar fully populated and clickable
- Tabs for filtering documents
- Each document shows ⋮ menu with CONTEXT-AWARE actions
- Different actions for: readable, unreadable, duplicate states
- Status count at bottom
- "Upload More Documents" always available
```

---

## 5. Processing Screen

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
┃ │ • Export      │ │  ┃ Processing 5 new documents...     ┃  │ ┃
┃ ├───────────────┤ │  ┃                                   ┃  │ ┃
┃ │ Accounting    │ │  ┃ Reading documents            65% ┃  │ ┃
┃ │ Setup         │ │  ┃ ████████████████░░░░░░░░          ┃  │ ┃
┃ │               │ │  ┃                                   ┃  │ ┃
┃ │ System /      │ │  ┃ ✓ Reading documents              ┃  │ ┃
┃ │ Advanced      │ │  ┃ ✓ Extracting text                ┃  │ ┃
┃ │               │ │  ┃ ● Checking duplicates            ┃  │ ┃
┃ │ Help          │ │  ┃ ○ Classifying documents          ┃  │ ┃
┃ │               │ │  ┃ ○ Matching categories            ┃  │ ┃
┃ └───────────────┘ │  ┃ ○ Preparing review items         ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  (Auto-advances to Review when complete)   │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar visible, Home accessible
- Shows count of NEW documents being processed
- Progress bar with percentage
- Step indicator (✓ completed, ● active, ○ pending)
- No manual navigation during processing
```

---

## 6. Review Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025 Annual]  #1A1F28     ┃ │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ ├───────────────┤ │                                                            │ ┃
┃ │ Current:      │ │  Review                                                    │ ┃
┃ │ • Documents   │ │  These items need your attention. All other documents      │ ┃
┃ │ • Review      │ │  have been automatically categorized. #9CA3AF              │ ┃
┃ │   (active)    │ │                                                            │ ┃
┃ │ • Export      │ │  6 items need attention │ 26 auto-classified               │ ┃
┃ ├───────────────┤ │                                                            │ ┃
┃ │ Accounting    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │ Setup         │ │  ┃ ⚠ 8 fuel receipts from same vendor    #1A1F28    ┃ │ ┃
┃ │               │ │  ┃                                                   ┃ │ ┃
┃ │ System /      │ │  ┃ Multiple similar receipts from Petro-Canada      ┃ │ ┃
┃ │ Advanced      │ │  ┃ #9CA3AF (muted)                                  ┃ │ ┃
┃ │               │ │  ┃                                                   ┃ │ ┃
┃ │ Help          │ │  ┃ ── Expanded View: ──────────────────────────     ┃ │ ┃
┃ │               │ │  ┃                                                   ┃ │ ┃
┃ └───────────────┘ │  ┃ 📊 Recommendation #252C37 (dark panel)            ┃ │ ┃
┃                   │  ┃ Categorize all as Vehicle Fuel Expense            ┃ │ ┃
┃                   │  ┃ Confidence: 92% #10B981 (green)                   ┃ │ ┃
┃                   │  ┃                                                   ┃ │ ┃
┃                   │  ┃ 📋 Evidence #252C37 (dark panel)                  ┃ │ ┃
┃                   │  ┃ • All receipts from Petro-Canada                  ┃ │ ┃
┃                   │  ┃ • Transaction amounts: $45-$85                    ┃ │ ┃
┃                   │  ┃ • Dates: Jan 2-28, 2025                           ┃ │ ┃
┃                   │  ┃ • All include fuel product codes                  ┃ │ ┃
┃                   │  ┃                                                   ┃ │ ┃
┃                   │  ┃ ─────────────────────────────────────────────     ┃ │ ┃
┃                   │  ┃                                                   ┃ │ ┃
┃                   │  ┃ [Accept Recommendation] #10B981 (green)          ┃ │ ┃
┃                   │  ┃ [Change Category] #374151 (neutral)               ┃ │ ┃
┃                   │  ┃ [Ask Accountant] #3B82F6 (blue)                   ┃ │ ┃
┃                   │  ┃ [Exclude from Accounting] #374151                 ┃ │ ┃
┃                   │  ┃ [Replace with Better Scan] #374151                ┃ │ ┃
┃                   │  ┃                                                   ┃ │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃                   │                                                            │ ┃
┃                   │  (More review items...)                                    │ ┃
┃                   │                                                            │ ┃
┃                   │                            [Continue to Export] #3B82F6   │ ┃
┃                   └────────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar shows Review highlighted in Current section
- Can navigate to Documents or Export via sidebar
- Status shows items needing attention vs auto-classified
- Each review item is expandable card
- Evidence panel shows reasoning
- 5 action buttons with appropriate colors
- Green for accept, blue for accountant question, neutral for others
```

---

## 7. Accountant Q&A Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ ├───────────────┤ │  ┃ [Botax] → [Babak M.] → [2025 Annual] #1A1F28  ┃ │ ┃
┃ │ 🏠 Home       │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ ├───────────────┤ │                                                        │ ┃
┃ │ Current:      │ │  Accountant Q&A                                        │ ┃
┃ │ • Documents   │ │  Questions sent to your accountant for evidence.      │ ┃
┃ │ • Review      │ │                                                        │ ┃
┃ │ • Export      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ ├───────────────┤ │  ┃ [✓ Answered] #10B981   2025-05-10            ┃  │ ┃
┃ │ Accounting    │ │  ┃                                               ┃  │ ┃
┃ │ Setup         │ │  ┃ Are these home office equipment purchases     ┃  │ ┃
┃ │               │ │  ┃ fully deductible or should they be            ┃  │ ┃
┃ │ System /      │ │  ┃ depreciated?                                  ┃  │ ┃
┃ │ Advanced      │ │  ┃                                               ┃  │ ┃
┃ │               │ │  ┃ Related Documents: #252C37                    ┃  │ ┃
┃ │ Help          │ │  ┃ • Laptop receipt - $2,500                     ┃  │ ┃
┃ │               │ │  ┃ • Office chair - $450                         ┃  │ ┃
┃ └───────────────┘ │  ┃ • Monitor - $600                              ┃  │ ┃
┃                   │  ┃                                               ┃  │ ┃
┃                   │  ┃ Accountant's Answer: #10B981/10 (green bg)    ┃  │ ┃
┃                   │  ┃ For equipment over $500, these should be      ┃  │ ┃
┃                   │  ┃ depreciated as capital assets. The chair can  ┃  │ ┃
┃                   │  ┃ be expensed immediately.                      ┃  │ ┃
┃                   │  ┃                                               ┃  │ ┃
┃                   │  ┃ [Return to Review] #3B82F6                    ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                                        │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ [⏱ Awaiting Answer] #F59E0B   2025-05-11     ┃  │ ┃
┃                   │  ┃                                               ┃  │ ┃
┃                   │  ┃ Vehicle registration shows personal use.      ┃  │ ┃
┃                   │  ┃ What percentage should be allocated to        ┃  │ ┃
┃                   │  ┃ business?                                     ┃  │ ┃
┃                   │  ┃                                               ┃  │ ┃
┃                   │  ┃ Related Documents: #252C37                    ┃  │ ┃
┃                   │  ┃ • Vehicle registration 2025                   ┃  │ ┃
┃                   │  ┃ • Fuel receipts (monthly)                     ┃  │ ┃
┃                   │  ┃                                               ┃  │ ┃
┃                   │  ┃ Waiting for response...                       ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar accessible
- Status badges color-coded (green for answered, amber for awaiting)
- Answered questions show accountant's response in green panel
- [Return to Review] button brings evidence back to Review for decision
- Q&A is evidence-gathering only, not decision-making
```

---

## 8. Accounting Setup Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  Accounting Setup                                      │ ┃
┃ ├───────────────┤ │                                                        │ ┃
┃ │ 🏠 Home       │ │  ── Vendor Rules │ Categories │ Export Mapping ──     │ ┃
┃ ├───────────────┤ │   (tabs, Vendor Rules active)                          │ ┃
┃ │ Current:      │ │                                                        │ ┃
┃ │ • Documents   │ │  Vendor Rules                                          │ ┃
┃ │ • Review      │ │  Auto-categorization rules learned from documents      │ ┃
┃ │ • Export      │ │                                                        │ ┃
┃ ├───────────────┤ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ Accounting    │ │  ┃ 🏢 Petro-Canada              #1A1F28          ┃  │ ┃
┃ │ Setup         │ │  ┃ → Vehicle Fuel Expense                        ┃  │ ┃
┃ │ (active)      │ │  ┃ 95% confidence │ 8 transactions #9CA3AF       ┃  │ ┃
┃ │               │ │  ┃ [Edit Rule]  #374151                          ┃  │ ┃
┃ │ System /      │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ Advanced      │ │                                                        │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │ Help          │ │  ┃ 🏢 Staples                   #1A1F28          ┃  │ ┃
┃ │               │ │  ┃ → Office Supplies                             ┃  │ ┃
┃ └───────────────┘ │  ┃ 88% confidence │ 3 transactions                ┃  │ ┃
┃                   │  ┃ [Edit Rule]  #374151                          ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                                        │ ┃
┃                   │  [Add New Vendor Rule]  #374151                        │ ┃
┃                   │                                                        │ ┃
┃                   │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ┃
┃                   │                                                        │ ┃
┃                   │  Categories & Account Codes Tab:                       │ ┃
┃                   │                                                        │ ┃
┃                   │  Vehicle Fuel Expense        [5400]  [Edit]            │ ┃
┃                   │  Office Supplies             [5200]  [Edit]            │ ┃
┃                   │  Meals & Entertainment       [5350]  [Edit]            │ ┃
┃                   │  [Add New Category]                                    │ ┃
┃                   │                                                        │ ┃
┃                   │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ┃
┃                   │                                                        │ ┃
┃                   │  Export Mapping Tab:                                   │ ┃
┃                   │                                                        │ ┃
┃                   │  Accounting Software: [QuickBooks ▼]                   │ ┃
┃                   │  Date → Transaction Date                               │ ┃
┃                   │  Vendor → Payee                                        │ ┃
┃                   │  [Edit Mapping]  [Reset to Default]                   │ ┃
┃                   └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- RENAMED from "Setup & Rules" to "Accounting Setup"
- Sidebar shows Accounting Setup highlighted
- Three tabs: Vendor Rules, Categories, Export Mapping
- Vendor cards show confidence and transaction count
- Categories section shows editable account codes
- Export mapping shows field mapping to accounting software
```

---

## 9. Export Screen - Ready State

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
┃ ├───────────────┤ │  ┃ Your package is ready.            ┃  │ ┃
┃ │ Accounting    │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ Setup         │ │                                            │ ┃
┃ │               │ │  Export Options:                           │ ┃
┃ │ System /      │ │                                            │ ┃
┃ │ Advanced      │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │               │ │  ┃ 📊 Accountant Review Package      ┃  │ ┃
┃ │ Help          │ │  ┃ Excel summary, document index     ┃  │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ └───────────────┘ │                                            │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ 📄 QuickBooks-Compatible CSV      ┃  │ ┃
┃                   │  ┃ Import ready for QuickBooks       ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃                   │  ┃ 📋 Generic CSV Export             ┃  │ ┃
┃                   │  ┃ Standard accounting format        ┃  │ ┃
┃                   │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃                   │                                            │ ┃
┃                   │  [Configure Export]                        │ ┃
┃                   │  #374151 (secondary)                       │ ┃
┃                   │                                            │ ┃
┃                   │  [Download Accountant Package]             │ ┃
┃                   │  #10B981 (green, primary)                  │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Green checkmark banner for Ready state
- Export options as clickable cards
- [Configure Export] button for column customization
- Primary download button in green
- Sidebar makes Review accessible to reopen items if needed
```

---

## 10. Export Screen - Needs Attention State

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
┃ ├───────────────┤ │  ┃                                   ┃  │ ┃
┃ │ Accounting    │ │  ┃ Blockers:                         ┃  │ ┃
┃ │ Setup         │ │  ┃ • 3 unresolved review items       ┃  │ ┃
┃ │               │ │  ┃ • 1 unanswered accountant q       ┃  │ ┃
┃ │ System /      │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │ Advanced      │ │                                            │ ┃
┃ │               │ │  [Go to Review to Resolve Items]           │ ┃
┃ │ Help          │ │  #3B82F6 (blue, primary)                   │ ┃
┃ │               │ │                                            │ ┃
┃ └───────────────┘ │  ─────────────────────────                 │ ┃
┃                   │                                            │ ┃
┃                   │  Or download a draft version:              │ ┃
┃                   │  #9CA3AF (muted)                           │ ┃
┃                   │                                            │ ┃
┃                   │  [Download Draft Review Package]           │ ┃
┃                   │  #F59E0B (amber border)                    │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Amber warning banner for Needs Attention
- Blockers listed clearly
- Primary action is blue button to resolve issues
- Draft download option available but secondary
- Clear what needs to be done to become ready
```

---

## 11. Export Configuration Modal

```
┌──────────────────────────────────────────────────────┐
│ Export Configuration                            [×]  │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Template:                                            │
│ [Default Accountant Review ▼] #1A1F28               │
│  │                                                   │
│  ├─ Default Accountant Review                       │
│  ├─ QuickBooks Import Template                      │
│  ├─ Generic CSV Template                            │
│  └─ My Custom Template                              │
│                                                      │
│ Columns to Include:                                  │
│ ┌────────────────────────────────────────────────┐  │
│ │ ☑ Document ID                                  │  │
│ │ ☑ Date                                         │  │
│ │ ☑ Vendor                                       │  │
│ │ ☑ Amount                                       │  │
│ │ ☑ Suggested Category                           │  │
│ │ ☑ Final Category                               │  │
│ │ ☑ Account Code                                 │  │
│ │ ☐ HST/GST Flag                                 │  │
│ │ ☐ Confidence Score                             │  │
│ │ ☑ Review Status                                │  │
│ │ ☐ Notes                                        │  │
│ │ ☑ Source File                                  │  │
│ │ ☐ Accountant Question Reference                │  │
│ └────────────────────────────────────────────────┘  │
│ (scrollable list)                                    │
│                                                      │
│ [Save as New Template]  #374151                      │
│                                                      │
│                            [Cancel]  [Apply]        │
│                            #374151   #3B82F6        │
└──────────────────────────────────────────────────────┘

Visual Notes:
- Modal overlay with dark background
- Template dropdown with presets
- Scrollable checkbox list for columns
- Can save custom templates
- Cancel and Apply buttons at bottom
```

---

## 12. System / Advanced Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  System / Advanced                         │ ┃
┃ ├───────────────┤ │  Technical settings and system management  │ ┃
┃ │ 🏠 Home       │ │                                            │ ┃
┃ ├───────────────┤ │  ┏━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │               │ │  ┃ 💾 Backup /  ┃  ┃ ⚙️ OCR Worker    ┃ │ ┃
┃ │ Accounting    │ │  ┃    Restore   ┃  ┃    Status        ┃ │ ┃
┃ │ Setup         │ │  ┗━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │               │ │                                            │ ┃
┃ │ System /      │ │  ┏━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓ │ ┃
┃ │ Advanced      │ │  ┃ 📄 OCRmyPDF/ ┃  ┃ 🐛 Trace /       ┃ │ ┃
┃ │ (active)      │ │  ┃    Tesseract ┃  ┃    Debug         ┃ │ ┃
┃ │               │ │  ┗━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛ │ ┃
┃ │ Help          │ │                                            │ ┃
┃ │               │ │  ┏━━━━━━━━━━━━━━┓                        │ ┃
┃ └───────────────┘ │  ┃ 💽 Storage   ┃                        │ ┃
┃                   │  ┃    Management┃                        │ ┃
┃                   │  ┗━━━━━━━━━━━━━━┛                        │ ┃
┃                   │                                            │ ┃
┃                   │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ┃
┃                   │                                            │ ┃
┃                   │  System Information                        │ ┃
┃                   │  App Version:       1.0.0                  │ ┃
┃                   │  Database Size:     12.5 MB                │ ┃
┃                   │  OCR Engine:        Running ✓              │ ┃
┃                   │  Last Backup:       2025-05-10 14:32       │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Sidebar shows System / Advanced highlighted
- Grid of clickable section cards
- System information panel at bottom
- Clean, organized technical features
- Not cluttering main workflow
```

---

## 13. Help Screen (Placeholder)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┌────────────────────────────────────────────┐ ┃
┃ │ ≡ MERIDIAN    │ │  Help                                      │ ┃
┃ ├───────────────┤ │                                            │ ┃
┃ │ 🏠 Home       │ │                                            │ ┃
┃ ├───────────────┤ │  ┌────────────────────────────────────┐   │ ┃
┃ │               │ │  │                                    │   │ ┃
┃ │ Accounting    │ │  │         📚                         │   │ ┃
┃ │ Setup         │ │  │                                    │   │ ┃
┃ │               │ │  │    Coming Soon                     │   │ ┃
┃ │ System /      │ │  │                                    │   │ ┃
┃ │ Advanced      │ │  │  Documentation and help resources  │   │ ┃
┃ │               │ │  │  will be available here.           │   │ ┃
┃ │ Help          │ │  │                                    │   │ ┃
┃ │ (active)      │ │  │                                    │   │ ┃
┃ │               │ │  └────────────────────────────────────┘   │ ┃
┃ └───────────────┘ │                                            │ ┃
┃                   │  Planned Sections:                         │ ┃
┃                   │  • User Guide                              │ ┃
┃                   │  • Workflow Guide                          │ ┃
┃                   │  • Screen-by-Screen Help                   │ ┃
┃                   │  • Troubleshooting                         │ ┃
┃                   │  • Accounting Terminology                  │ ┃
┃                   │  • Import / Export Guide                   │ ┃
┃                   │  • OCR & Document Reading                  │ ┃
┃                   │  • Backup / Restore Guide                  │ ┃
┃                   └────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Placeholder with planned structure documented
- Simple, minimal current display
- Lists what will be available
```

---

## Key Visual Design Patterns

### 1. Sidebar Navigation
- 240px wide, fixed position
- #1A1F28 background
- Always visible
- "Home" always accessible
- "Current" section shows active engagement screens
- Configuration screens always accessible

### 2. Context Bar
- Appears after engagement setup
- #1A1F28 background with blue left border
- Each part clickable
- Format: `[Firm] → [Client] → [Period]`
- Hover state shows clickability

### 3. Document Cards
- #1A1F28 background
- Border #252C37
- Hover: border changes to #3B82F6
- Status icons color-coded
- ⋮ menu aligned right

### 4. Review Exception Cards
- #1A1F28 background
- Expandable/collapsible
- Evidence panel: #252C37 background
- Recommendation panel: #252C37 background
- Confidence score color-coded
- 5 action buttons with semantic colors

### 5. Status Badges
- Success: #10B981 text + background/10
- Warning: #F59E0B text + background/10
- Error: #EF4444 text + background/10
- Muted: #6B7280 text + background/10
- Small border-radius (4px)

### 6. Buttons
- Primary: #3B82F6 background, white text
- Success: #10B981 background, white text
- Warning: #F59E0B border + text (for draft actions)
- Secondary: #374151 border + #D1D5DB text
- Danger: #EF4444 (when needed)

### 7. Progress Indicators
- Progress bar: #3B82F6 fill on #252C37 background
- Step indicators: ✓ (completed), ● (active), ○ (pending)
- Color: green for completed, blue for active, gray for pending

---

## Implementation Notes

### Navigation
- Sidebar must be persistent across all screens
- Context bar must be functionally clickable, not just visual
- No large "Back to Home" text links
- Local [Back] buttons only in setup flow

### Context-Aware Actions
- Document actions filtered by state (see design doc)
- Menu must check document state before rendering actions
- Keep menus short (3-5 items maximum)

### Responsive Behavior
- Sidebar can collapse to icons on narrow screens
- Context bar can wrap on narrow screens
- Main content remains scrollable
- Modals center and adapt to screen size

### Accessibility
- Sidebar items keyboard navigable
- Context bar parts keyboard navigable
- Focus states visible
- Color not sole indicator of state

---

## Files Status

- ✓ **MERIDIAN_DESIGN_V2_REVISED.md** - Design spec with refinements
- ✓ **MERIDIAN_VISUAL_WIREFRAMES_V2.md** - This document (awaiting approval)
- ⏳ **CODEX_IMPLEMENTATION_HANDOFF_V2.md** - Next (after wireframes approved)
- 📦 **MERIDIAN_VISUAL_WIREFRAMES.md (v1)** - Superseded by this version

---

**Next Step**: Await approval of visual wireframes before creating Codex implementation handoff.

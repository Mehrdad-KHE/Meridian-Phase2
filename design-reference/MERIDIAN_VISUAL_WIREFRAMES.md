# Meridian - Visual Wireframes v1
**Low-Fidelity Visual Design Mockups**

Dark theme, calm, minimal, and accounting-workflow oriented.

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

---

## 0. Home Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ MERIDIAN                                          ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  ┌─────────────────────────────────────────┐    ┃
┃  │ Start New Engagement │ #3B82F6 (blue)    ┃
┃  └─────────────────────────────────────────┘    ┃
┃                                                   ┃
┃  ─────────────────────────────────────────       ┃
┃                                                   ┃
┃  Recent Engagements                               ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Daniel Roberts          #1A1F28 ┃    ┃
┃  ┃ 2025 Annual                      (card)  ┃    ┃
┃  ┃ Status: Review 6 items  #F59E0B (amber) ┃    ┃
┃  ┃ ┌──────────┐                            ┃    ┃
┃  ┃ │Continue│ #3B82F6 (blue)              ┃    ┃
┃  ┃ └──────────┘                            ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Acme Trucking Ltd.              #1A1F28 ┃    ┃
┃  ┃ 2024 Q4                          (card)  ┃    ┃
┃  ┃ Status: Ready to export #10B981 (green) ┃    ┃
┃  ┃ ┌──────────┐                            ┃    ┃
┃  ┃ │Continue│ #3B82F6 (blue)              ┃    ┃
┃  ┃ └──────────┘                            ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Jones Contracting               #1A1F28 ┃    ┃
┃  ┃ 2025 Q1                          (card)  ┃    ┃
┃  ┃ Status: Exported        #6B7280 (muted) ┃    ┃
┃  ┃ ┌──────┐                                ┃    ┃
┃  ┃ │View│ #374151 (secondary)             ┃    ┃
┃  ┃ └──────┘                                ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌───────────┐                                   ┃
┃  │ View All  │ #374151 (secondary)               ┃
┃  └───────────┘                                   ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Clean, minimal home screen
- Primary action (Start New) is prominent blue button
- Each engagement card shows: Client, Period, Status, Action
- Status badges have color-coded borders and backgrounds
- No dashboard clutter - just simple list
```

---

## 1. Engagement Setup - Select Firm

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Select Accountant / Firm                          ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [ENGAGEMENT SETUP] #3B82F6 label                ┃
┃                                                   ┃
┃  Select a firm or add a new one                   ┃
┃  #9CA3AF (muted text)                            ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Northpeak Accounting            #1A1F28     ┃    ┃
┃  ┃ Toronto, ON                 (card)      ┃    ┃
┃  ┃ ┌──────────────┐                       ┃    ┃
┃  ┃ │ Select Firm  │ #3B82F6 (blue)        ┃    ┃
┃  ┃ └──────────────┘                       ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Smith & Associates CPA      #1A1F28     ┃    ┃
┃  ┃ Vancouver, BC               (card)      ┃    ┃
┃  ┃ ┌──────────────┐                       ┃    ┃
┃  ┃ │ Select Firm  │ #3B82F6 (blue)        ┃    ┃
┃  ┃ └──────────────┘                       ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌──────────────┐                                ┃
┃  │ Add New Firm │ #374151 (secondary)            ┃
┃  └──────────────┘                                ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Clear label showing current setup step
- Firm cards with name, location, and action button
- Primary action buttons are consistent blue
- Add New Firm is secondary style (outline)
```

---

## 2. Engagement Setup - Select Client

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Select Client                                     ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [ENGAGEMENT SETUP] #3B82F6 label                ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Northpeak Accounting            #1A1F28      ┃  ┃
┃  ┃ (context bar with blue left border)      ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  Select a client or add a new one                 ┃
┃  #9CA3AF (muted text)                            ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Daniel Roberts      #1A1F28     ┃    ┃
┃  ┃ Self-employed contractor    (card)      ┃    ┃
┃  ┃ ┌───────────────┐                       ┃    ┃
┃  ┃ │ Select Client │ #3B82F6 (blue)        ┃    ┃
┃  ┃ └───────────────┘                       ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Acme Trucking Ltd.          #1A1F28     ┃    ┃
┃  ┃ Corporation                 (card)      ┃    ┃
┃  ┃ ┌───────────────┐                       ┃    ┃
┃  ┃ │ Select Client │ #3B82F6 (blue)        ┃    ┃
┃  ┃ └───────────────┘                       ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌────────────────┐  ┌──────┐                   ┃
┃  │ Add New Client │  │ Back │                    ┃
┃  └────────────────┘  └──────┘                   ┃
┃  #374151 (secondary)                             ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Context bar shows selected firm with blue left border
- Similar card layout to firm selection
- Back button available as secondary action
```

---

## 3. Engagement Setup - Select Period

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Select Accounting Period                          ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [ENGAGEMENT SETUP] #3B82F6 label                ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Northpeak Accounting → Daniel Roberts ┃  ┃
┃  ┃ (context bar)                #1A1F28      ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  Select the fiscal year and period                ┃
┃  #9CA3AF (muted text)                            ┃
┃                                                   ┃
┃  Fiscal Year *                                    ┃
┃  ┏━━━━━━━━━━━┓                                   ┃
┃  ┃ 2025  ▼   ┃ #1A1F28 dropdown                  ┃
┃  ┗━━━━━━━━━━━┛                                   ┃
┃                                                   ┃
┃  Period Type *                                    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━┓                         ┃
┃  ┃ Annual / Full Year ▼┃ #1A1F28 dropdown        ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━┛                         ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Period: January 1, 2025 - December 31, 2025  ┃
┃  ┃ #0F1419 (darker info box)                ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌──────┐  ┌──────────────────────┐              ┃
┃  │ Back │  │ Continue to Documents│              ┃
┃  └──────┘  └──────────────────────┘              ┃
┃  #374151   #3B82F6 (primary)                     ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Context bar now shows Firm → Client breadcrumb
- Form fields with clear labels
- Dark dropdowns matching theme
- Info box shows calculated period dates
- Primary action clearly labeled "Continue to Documents"
```

---

## 4. Documents

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Documents                                         ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [DOCUMENTS] #3B82F6 label                       ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax → Daniel M. → 2025 Annual   #1A1F28 ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  ┌──────────────────┐  ┌──────────────┐         ┃
┃  │ Upload Documents │  │ Select Folder│         ┃
┃  └──────────────────┘  └──────────────┘         ┃
┃  #3B82F6              #374151                    ┃
┃                                                   ┃
┃  ╔═══════════════════════════════════════════╗  ┃
┃  ║                                           ║  ┃
┃  ║              📄                           ║  ┃
┃  ║  Drag and drop files here                ║  ┃
┃  ║  or click to browse                      ║  ┃
┃  ║                                           ║  ┃
┃  ╚═══════════════════════════════════════════╝  ┃
┃  #0F1419 with dashed border #374151             ┃
┃                                                   ┃
┃  ┏━━━━━━━━┓  ┏━━━━━━┓  ┏━━━━━━━━━━━━━━┓       ┃
┃  ┃   24   ┃  ┃  22  ┃  ┃      2       ┃       ┃
┃  ┃uploaded┃  ┃ read ┃  ┃need attention┃       ┃
┃  ┗━━━━━━━━┛  ┗━━━━━━┛  ┗━━━━━━━━━━━━━━┛       ┃
┃  #1A1F28 stat cards, #3B82F6 numbers            ┃
┃                                                   ┃
┃  Included (22) | On Hold (0) | Excluded (2)      ┃
┃  ─────────────   ────────────   ─────────        ┃
┃  #3B82F6 active  #9CA3AF       #9CA3AF          ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ ✓ receipt_gas_march_12.pdf  #1A1F28    ┃    ┃
┃  ┃ Read successfully                       ┃    ┃
┃  ┃ ┌──────┐ ┌──────┐ ┌─────────┐          ┃    ┃
┃  ┃ │ View │ │ Hold │ │ Exclude │          ┃    ┃
┃  ┃ └──────┘ └──────┘ └─────────┘          ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ ⚠ invoice_blur.jpg          #1A1F28    ┃    ┃
┃  ┃ Unreadable - blurry image              ┃    ┃
┃  ┃ ┌───────────┐ ┌──────┐ ┌─────────┐    ┃    ┃
┃  ┃ │ Re-upload │ │ Hold │ │ Exclude │    ┃    ┃
┃  ┃ └───────────┘ └──────┘ └─────────┘    ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌──────────────────┐                            ┃
┃  │Process Documents │ #10B981 (success green)    ┃
┃  └──────────────────┘                            ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Context bar persistent across workflow
- Upload area with dashed border and icon
- Summary stats in separate cards with large numbers
- Tabs for filtering documents by status
- Each document shows status icon (✓ or ⚠)
- Action buttons inline with each document
- Primary "Process" button is green (success action)
```

---

## 5. Processing

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Processing                                        ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [PROCESSING] #3B82F6 label                      ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax → Daniel M. → 2025 Annual   #1A1F28 ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  Processing Documents                             ┃
┃  Current Stage: Classifying documents             ┃
┃  #9CA3AF                                         ┃
┃                                                   ┃
┃  ████████████████░░░░░░░░                        ┃
┃  #3B82F6 fill, #252C37 background                ┃
┃  18 of 24 documents                               ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Results so far:              #0F1419     ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ 15 documents auto-classified            ┃    ┃
┃  ┃ 3 documents need review                 ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ Estimated time: ~2 minutes              ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌───────┐                                       ┃
┃  │ Pause │ #374151 (secondary)                   ┃
┃  └───────┘                                       ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

PROCESSING COMPLETE:

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Processing Complete                               ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  ✓ Processing Complete                           ┃
┃  #10B981 (success green), 24px                   ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Summary:                     #0F1419     ┃    ┃
┃  ┃ • 24 documents processed                ┃    ┃
┃  ┃ • 18 documents auto-classified          ┃    ┃
┃  ┃ • 6 documents need review               ┃    ┃
┃  ┃ • 2 documents unreadable                ┃    ┃
┃  ┃ • 1 duplicate found                     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┌──────────────┐                                ┃
┃  │ Go to Review │ #3B82F6 (primary)              ┃
┃  └──────────────┘                                ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Clean progress indicator with percentage fill
- Current stage description in muted text
- Results box shows intermediate counts
- Complete state has large success checkmark
- Bullet list summary of results
- Clear next action button
```

---

## 6. Review

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Review                                            ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [REVIEW] #3B82F6 label                          ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax → Daniel M. → 2025 Annual   #1A1F28 ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  6 items need review                              ┃
┃                                                   ┃
┃  ╔═══════════════════════════════════════════╗  ┃
┃  ║ Group: 4 receipts from "Joe's Auto Parts"║  ┃
┃  ║ #1A1F28 with #3B82F6 border (highlighted)║  ┃
┃  ║                                           ║  ┃
┃  ║ Why needs review:                         ║  ┃
┃  ║ New vendor not in system                  ║  ┃
┃  ║ #9CA3AF                                   ║  ┃
┃  ║                                           ║  ┃
┃  ║ System suggests: Vehicle Maintenance      ║  ┃
┃  ║ #3B82F6 text                              ║  ┃
┃  ║ [65%] #3B82F6 confidence badge            ║  ┃
┃  ║                                           ║  ┃
┃  ║ Evidence:                                 ║  ┃
┃  ║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ║  ┃
┃  ║ ┃ • Vendor name contains "Auto"   ┃    ║  ┃
┃  ║ ┃ • Items: oil filter, brake pads ┃    ║  ┃
┃  ║ ┃ • Similar vendor categorized... ┃    ║  ┃
┃  ║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ║  ┃
┃  ║ #0F1419 darker evidence box               ║  ┃
┃  ║                                           ║  ┃
┃  ║ ┌──────────────────────┐                 ║  ┃
┃  ║ │ View All 4 Receipts  │                 ║  ┃
┃  ║ └──────────────────────┘                 ║  ┃
┃  ║ #374151 secondary                        ║  ┃
┃  ║                                           ║  ┃
┃  ║ ─────────────────────────────────        ║  ┃
┃  ║                                           ║  ┃
┃  ║ Decision:                                 ║  ┃
┃  ║ ┌──────────────────────┐                 ║  ┃
┃  ║ │Accept Recommendation │ #10B981 (green) ║  ┃
┃  ║ └──────────────────────┘                 ║  ┃
┃  ║ ┌─────────────────┐ ┌────────────────┐  ║  ┃
┃  ║ │ Change Category │ │ Ask Accountant │  ║  ┃
┃  ║ └─────────────────┘ └────────────────┘  ║  ┃
┃  ║ ┌──────────────────────┐ ┌──────────┐   ║  ┃
┃  ║ │ Mark as Support Only │ │ Exclude  │   ║  ┃
┃  ║ └──────────────────────┘ └──────────┘   ║  ┃
┃  ║ #374151 secondary    #EF4444 danger     ║  ┃
┃  ║                                           ║  ┃
┃  ║ □ Remember this vendor rule               ║  ┃
┃  ║                                           ║  ┃
┃  ╚═══════════════════════════════════════════╝  ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ receipt_unclear.pdf         #1A1F28     ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ Why needs review:                        ┃    ┃
┃  ┃ Vendor name unclear in image             ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ System suggests: Office Supplies         ┃    ┃
┃  ┃ [40%] low confidence                     ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ Evidence:                                ┃    ┃
┃  ┃ • Text: "...ffice Depot ... $125.00"    ┃    ┃
┃  ┃ • Possible vendor: Office Depot          ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ (Decision buttons same as above)         ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Highlight card has blue border and subtle shadow
- Evidence displayed in darker inset box with bullets
- Confidence shown as percentage badge
- Decision buttons clearly separated
- Accept is green (success)
- Change/Ask/Support are secondary (gray outline)
- Exclude is red danger button
- Checkbox for learning vendor rule
```

---

## 7. Accountant Q&A

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Accountant Q&A                                    ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [ACCOUNTANT Q&A] #3B82F6 label                  ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax → Daniel M. → 2025 Annual   #1A1F28 ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  ┌──────────────────┐                            ┃
┃  │ Ask New Question │ #3B82F6 (primary)          ┃
┃  └──────────────────┘                            ┃
┃                                                   ┃
┃  Awaiting (2) | Answered (1) | Applied (5)       ┃
┃  ─────────      ────────────   ─────────         ┃
┃  #9CA3AF       #3B82F6 active  #9CA3AF          ┃
┃                                                   ┃
┃  ╔═══════════════════════════════════════════╗  ┃
┃  ║ Q: How to categorize "Cloud Services Inc"║  ┃
┃  ║    recurring $89/month charges?          ║  ┃
┃  ║ #1A1F28 with #3B82F6 border              ║  ┃
┃  ║                                           ║  ┃
┃  ║ Context:                                  ║  ┃
┃  ║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ║  ┃
┃  ║ ┃ • 3 monthly invoices            ┃    ║  ┃
┃  ║ ┃ • Amount: $89 each              ┃    ║  ┃
┃  ║ ┃ • Description: "Professional..."┃    ║  ┃
┃  ║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ║  ┃
┃  ║ #0F1419 evidence box                     ║  ┃
┃  ║                                           ║  ┃
┃  ║ [✓ Answered (2 hours ago)] #10B981       ║  ┃
┃  ║                                           ║  ┃
┃  ║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ║  ┃
┃  ║ ┃ Accountant response:            ┃    ║  ┃
┃  ║ ┃                                 ┃    ║  ┃
┃  ║ ┃ "Categorize as Software &       ┃    ║  ┃
┃  ║ ┃ Subscriptions under operating   ┃    ║  ┃
┃  ║ ┃ expenses. Monthly business      ┃    ║  ┃
┃  ║ ┃ subscriptions are deductible."  ┃    ║  ┃
┃  ║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ║  ┃
┃  ║ #0F1419 response box                     ║  ┃
┃  ║                                           ║  ┃
┃  ║ ┌─────────────────┐                      ║  ┃
┃  ║ │ Return to Review│ #3B82F6 (primary)   ║  ┃
┃  ║ └─────────────────┘                      ║  ┃
┃  ║                                           ║  ┃
┃  ╚═══════════════════════════════════════════╝  ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Q: Can I deduct client site mileage?    ┃    ┃
┃  ┃ #1A1F28                                  ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ Context: (similar evidence box)          ┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ [⏱ Awaiting response (1 day ago)] #3B82F6┃    ┃
┃  ┃                                          ┃    ┃
┃  ┃ ┌─────────────────┐                     ┃    ┃
┃  ┃ │ Cancel Question │ #EF4444 (danger)    ┃    ┃
┃  ┃ └─────────────────┘                     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ ℹ Note: Accountant answers are evidence  ┃  ┃
┃  ┃ only. Final decisions happen in Review.   ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃  #3B82F6 background tint, blue left border      ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Tabs for filtering by status (Awaiting/Answered/Applied)
- Answered card highlighted with blue border
- Context and response in separate darker boxes
- Status badges: green for answered, blue for awaiting
- Primary action is "Return to Review" (not "Apply")
- Important note box at bottom with blue accent
- Clear visual hierarchy: Q → Context → Status → Response → Action
```

---

## 8. Export - Ready

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Export                                            ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [EXPORT] #3B82F6 label                          ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax → Daniel M. → 2025 Annual   #1A1F28 ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  ✓ Ready                                         ┃
┃  #10B981 (success green), 24px                   ┃
┃                                                   ┃
┃  All items resolved. Package ready.               ┃
┃  #9CA3AF                                         ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Package Contents:            #0F1419     ┃    ┃
┃  ┃ • 24 categorized documents              ┃    ┃
┃  ┃ • 3 accountant Q&A records              ┃    ┃
┃  ┃ • 8 vendor rules applied                ┃    ┃
┃  ┃ • Transaction summary by category       ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  Export Format:                                   ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ ○ Accountant Review (PDF + Documents)  ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ ○ Excel Workbook                       ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ ○ QuickBooks Import                    ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ ○ CSV Files                            ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃  #0F1419 with #374151 border, hover #3B82F6     ┃
┃                                                   ┃
┃  ┌────────────────┐  ┌─────────────────────────┐┃
┃  │ Preview Package│  │Download Accountant Package┃
┃  └────────────────┘  └─────────────────────────┘┃
┃  #374151           #10B981 (success green)      ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Large green checkmark for Ready state
- Package contents in dark info box
- Format options as selectable cards
- Radio button style selection
- Primary action is green "Download Accountant Package"
- Preview available as secondary action
```

---

## 8b. Export - Needs Attention

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Export                                            ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [EXPORT - NEEDS ATTENTION] #F59E0B label        ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax → Daniel M. → 2025 Annual   #1A1F28 ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  ⚠ Needs Attention                               ┃
┃  #F59E0B (warning amber), 24px                   ┃
┃                                                   ┃
┃  Cannot export final package yet.                 ┃
┃  #9CA3AF                                         ┃
┃                                                   ┃
┃  Blockers:                                        ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ 6 review items need decision   #EF4444  ┃    ┃
┃  ┃ (red background tint)                   ┃    ┃
┃  ┃ ┌──────────────┐                        ┃    ┃
┃  ┃ │ Go to Review │ #3B82F6 (primary)      ┃    ┃
┃  ┃ └──────────────┘                        ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ 2 documents unreadable         #EF4444  ┃    ┃
┃  ┃ (red background tint)                   ┃    ┃
┃  ┃ ┌────────────────┐                      ┃    ┃
┃  ┃ │ Go to Documents│ #3B82F6 (primary)    ┃    ┃
┃  ┃ └────────────────┘                      ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ─────────────────────────────────────────       ┃
┃                                                   ┃
┃  You can download a draft:                        ┃
┃  #9CA3AF                                         ┃
┃                                                   ┃
┃  ┌───────────────────────────┐                   ┃
┃  │Download Draft Review Package│ #374151         ┃
┃  └───────────────────────────┘                   ┃
┃                                                   ┃
┃  (Draft includes unresolved items flagged)        ┃
┃  #6B7280 (small muted text)                      ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Amber warning icon for Needs Attention state
- Blocker cards have red tint background
- Each blocker has clear action button to resolve
- Draft download option separated by divider
- Draft button is secondary style (outline)
- Small explanatory text about draft contents
```

---

## 9. System / Advanced

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ System / Advanced                                 ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [SYSTEM / ADVANCED] #6B7280 muted label         ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ ⚠ Advanced Settings          #EF4444     ┃  ┃
┃  ┃ Red background tint, red left border     ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                   ┃
┃  Backup & Restore                                 ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Last backup: May 11, 2026 - 10:32 AM   ┃    ┃
┃  ┃ #0F1419 (darker)                        ┃    ┃
┃  ┃ ┌──────────────┐  ┌─────────┐          ┃    ┃
┃  ┃ │Create Backup │  │ Restore │          ┃    ┃
┃  ┃ └──────────────┘  └─────────┘          ┃    ┃
┃  ┃ #374151 (secondary)                     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  OCR & Processing                                 ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Engine: Tesseract 5.3.0                ┃    ┃
┃  ┃ Status: Idle                            ┃    ┃
┃  ┃ Documents processed today: 24           ┃    ┃
┃  ┃ #0F1419 (darker)                        ┃    ┃
┃  ┃ ┌───────────┐                           ┃    ┃
┃  ┃ │ View Logs │ #374151 (secondary)       ┃    ┃
┃  ┃ └───────────┘                           ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  Debug                                            ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ □ Enable debug mode                    ┃    ┃
┃  ┃ #0F1419 (darker)                        ┃    ┃
┃  ┃ ┌────────────────┐  ┌─────────────────┐┃    ┃
┃  ┃ │View Trace Logs │  │Export Debug Data││    ┃
┃  ┃ └────────────────┘  └─────────────────┘┃    ┃
┃  ┃ #374151 (secondary)                     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  System Info                                      ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Version: 1.0.0                          ┃    ┃
┃  ┃ Data location: ~/Documents/Meridian     ┃    ┃
┃  ┃ #0F1419 (darker)                        ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Warning banner at top with red accent
- Sections clearly separated
- Info boxes are darker than main background
- All actions are secondary style (not primary blue)
- Technical information displayed in monospace-style
- Minimal and functional - no decoration
```

---

## 10. Help / Documentation (Reserved)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Help / Documentation                              ┃ #0F1419
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃                                                   ┃
┃  [HELP - RESERVED] #6B7280 muted label           ┃
┃                                                   ┃
┃              📚                                   ┃
┃         (large icon, 48px)                        ┃
┃                                                   ┃
┃         Documentation                             ┃
┃         #F9FAFB (large heading)                   ┃
┃                                                   ┃
┃    Help content will be added in a future release ┃
┃    #9CA3AF (muted)                               ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Getting Started              #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Workflow Guide               #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Screen-by-Screen Help        #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Troubleshooting              #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Accounting Terminology       #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Import / Export Guide        #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ OCR & Document Reading       #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    ┃
┃  ┃ Backup / Restore Guide       #1A1F28     ┃    ┃
┃  ┃ Coming soon                  #6B7280     ┃    ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┃                                                   ┃
┃  ─────────────────────────────────────────       ┃
┃                                                   ┃
┃  Need help now?                                   ┃
┃  Version: 1.0.0                                   ┃
┃  support@meridian.app #3B82F6                    ┃
┃  (center aligned, muted text)                     ┃
┃                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Centered empty state with icon
- Help sections as clickable cards
- All marked "Coming soon"
- Footer with support contact
- Clean placeholder design
- Ready for future content
```

---

## Summary: Visual Design Principles

### 1. Dark Theme
- Background: #0F1419 (darkest)
- Cards: #1A1F28 (medium)
- Borders: #252C37 (light)

### 2. Color Semantics
- Primary actions: #3B82F6 (blue)
- Success/Ready: #10B981 (green)
- Warning/Attention: #F59E0B (amber)
- Danger/Error: #EF4444 (red)
- Muted/Inactive: #6B7280 (gray)

### 3. Typography Hierarchy
- Page title: 24px, 600 weight
- Section headings: 20px, 600 weight
- Subsections: 16px, 600 weight
- Body: 14px, 400 weight
- Small/Caption: 12px, 400 weight

### 4. Component Patterns
- **Context Bar**: Blue left border, shows breadcrumb
- **Cards**: Rounded corners (6px), subtle borders
- **Highlight Cards**: Blue border + shadow (for review items)
- **Buttons**: Rounded (6px), clear hierarchy (primary/secondary/danger)
- **Status Badges**: Pill shape, colored border + tint background
- **Evidence Boxes**: Darker inset, bullet points
- **Progress Bars**: Rounded, blue fill on dark background

### 5. Spacing & Layout
- Consistent padding: 24px main areas, 16px cards
- Card spacing: 16px between items
- Button spacing: 8px horizontal gap
- Section spacing: 32-48px vertical

### 6. Interaction States
- Hover: Lighter border or background tint
- Active: Blue accent
- Disabled: Gray with reduced opacity
- Loading: Blue with spinner

### 7. Accounting Workflow Feel
- Professional, calm, not flashy
- Clear hierarchy and information density
- Evidence-based decision support
- Status-driven navigation
- Minimal decoration, maximum clarity

---

**End of Visual Wireframes**

This design is ready for implementation with React + Tailwind CSS.

# Meridian - Additional Wireframes
**Opening Screen, Accounting Setup, GIFI, Export Config, System/Advanced**

**Date**: 2026-05-11 (Gap Closure)

**Purpose**: Wireframes for screens missing from correction loop design

---

## 1. Opening / Welcome Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                    ┃
┃                        ┏━━━━━━━━━━━━━━━━┓                        ┃
┃                        ┃  MERIDIAN      ┃                        ┃
┃                        ┃  [Logo/Icon]   ┃                        ┃
┃                        ┗━━━━━━━━━━━━━━━━┛                        ┃
┃                                                                    ┃
┃               Local-first accounting workflow assistant           ┃
┃                                                                    ┃
┃                    ┌────────────────────────────┐                ┃
┃                    │ Start New Engagement       │                ┃
┃                    │ #3B82F6 (primary blue)     │                ┃
┃                    └────────────────────────────┘                ┃
┃                                                                    ┃
┃             ─────────────────────────────────────────            ┃
┃                                                                    ┃
┃  Recent Engagements                                               ┃
┃                                                                    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax Accounting                                         ┃  ┃
┃  ┃ Babak Mohammadhosseini → 2025 Annual                     ┃  ┃
┃  ┃ Status: Review 6 items  #F59E0B (amber warning)          ┃  ┃
┃  ┃ Last activity: 2026-05-10 14:32                          ┃  ┃
┃  ┃                                                           ┃  ┃
┃  ┃ [Continue] #3B82F6                                        ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                                    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax Accounting                                         ┃  ┃
┃  ┃ Smith LLC → Q4 2024                                      ┃  ┃
┃  ┃ Status: Ready to export  #10B981 (green success)        ┃  ┃
┃  ┃ Last activity: 2026-05-09 10:15                          ┃  ┃
┃  ┃                                                           ┃  ┃
┃  ┃ [Continue] #3B82F6                                        ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                                    ┃
┃  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
┃  ┃ Botax Accounting                                         ┃  ┃
┃  ┃ Johnson Inc → 2024 Annual                                ┃  ┃
┃  ┃ Status: Processing documents  #3B82F6 (blue)            ┃  ┃
┃  ┃ Last activity: 2026-05-11 09:22                          ┃  ┃
┃  ┃                                                           ┃  ┃
┃  ┃ [Continue] #3B82F6                                        ┃  ┃
┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
┃                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Clean, professional, minimal design
- Meridian logo/branding prominent at top
- Tagline clearly communicates purpose
- Primary action (Start New) visually prominent
- Recent engagements show clear status with color coding
- [Continue] navigates to appropriate workflow stage
- No sidebar (this is welcome screen, not workflow)
- Quick to navigate, not time-consuming
```

---

## 2. Accounting Setup - Main Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  Accounting Setup                                      │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │🏠Home    │ │  Configure accounting standards, codes, and mappings  │ ┃
┃ ├──────────┤ │  #9CA3AF (muted helper text)                          │ ┃
┃ │Accounting│ │                                                        │ ┃
┃ │Setup     │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │(active)  │ │  ┃ Vendor Rules                                 ┃  │ ┃
┃ │System/   │ │  ┃ Define vendor-to-category mappings           ┃  │ ┃
┃ │Advanced  │ │  ┃ 12 rules configured                          ┃  │ ┃
┃ │Help      │ │  ┃ [View & Edit Rules] →                        ┃  │ ┃
┃ └──────────┘ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Chart of Accounts                            ┃  │ ┃
┃              │  ┃ View and manage account codes                ┃  │ ┃
┃              │  ┃ 45 accounts, 5 custom added                  ┃  │ ┃
┃              │  ┃ [View Chart of Accounts] →                   ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ GIFI / Standard Codes                        ┃  │ ┃
┃              │  ┃ Canadian tax reporting codes                 ┃  │ ┃
┃              │  ┃ 25 mappings configured                       ┃  │ ┃
┃              │  ┃ [View & Edit GIFI Codes] →                   ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Category Mapping                             ┃  │ ┃
┃              │  ┃ Map categories to account codes              ┃  │ ┃
┃              │  ┃ 18 categories mapped                         ┃  │ ┃
┃              │  ┃ [View & Edit Mappings] →                     ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Export Mapping                               ┃  │ ┃
┃              │  ┃ Configure export column mappings             ┃  │ ┃
┃              │  ┃ 3 templates saved                            ┃  │ ┃
┃              │  ┃ [View & Edit Templates] →                    ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- No workflow roadmap (not workflow screen)
- Sidebar shows "Accounting Setup" as active
- Card-based layout for each subsection
- Each card shows count and navigation
- Business-facing language, not technical
- Clear separation from System/Advanced
```

---

## 3. GIFI Codes Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  GIFI / Standard Codes                                 │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │🏠Home    │ │  ← Back to Accounting Setup                            │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │Accounting│ │  General Index of Financial Information codes for     │ ┃
┃ │Setup     │ │  Canadian tax reporting                                │ ┃
┃ │(active)  │ │                                                        │ ┃
┃ │System/   │ │  [Search codes...]  [Add Custom Code]  [Import CSV]  │ ┃
┃ │Advanced  │ │                                                        │ ┃
┃ │Help      │ │  ── Income Statement │ Balance Sheet ──               │ ┃
┃ └──────────┘ │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Code  Description                Category    ┃  │ ┃
┃              │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │ ┃
┃              │  ┃ 8000  Sales of goods/services   Revenue     ┃  │ ┃
┃              │  ┃       Mapped: 3 categories                   ┃  │ ┃
┃              │  ┃       [View Mappings] [Edit]                 ┃  │ ┃
┃              │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │ ┃
┃              │  ┃ 8811  Motor vehicle expenses    Expense     ┃  │ ┃
┃              │  ┃       Mapped: Vehicle Fuel                   ┃  │ ┃
┃              │  ┃       Account: 5450                          ┃  │ ┃
┃              │  ┃       [View Mappings] [Edit]                 ┃  │ ┃
┃              │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │ ┃
┃              │  ┃ 9060  Office expenses           Expense     ┃  │ ┃
┃              │  ┃       Mapped: Office Supplies                ┃  │ ┃
┃              │  ┃       Account: 5000                          ┃  │ ┃
┃              │  ┃       [View Mappings] [Edit]                 ┃  │ ┃
┃              │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │ ┃
┃              │  ┃ 9220  Professional fees         Expense     ┃  │ ┃
┃              │  ┃       Mapped: 2 categories                   ┃  │ ┃
┃              │  ┃       [View Mappings] [Edit]                 ┃  │ ┃
┃              │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │ ┃
┃              │  ┃ 8523  Meals and entertainment   Expense     ┃  │ ┃
┃              │  ┃       Mapped: Meals & Entertainment          ┃  │ ┃
┃              │  ┃       Account: 5500 (50% deductible)         ┃  │ ┃
┃              │  ┃       [View Mappings] [Edit]                 ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  (more codes...)                                       │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- List of GIFI codes with descriptions
- Shows which categories are mapped to each code
- Shows account code assignments
- [View Mappings] opens detail modal
- [Edit] allows changing mappings
- Search bar for quick code lookup
- Tabs for Income Statement vs Balance Sheet codes
```

---

## 4. Category Mapping Detail

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  Category Mapping                                      │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │🏠Home    │ │  ← Back to Accounting Setup                            │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │Accounting│ │  Map document categories to account codes and GIFI    │ ┃
┃ │Setup     │ │                                                        │ ┃
┃ │(active)  │ │  [Add New Mapping]  [Import CSV]  [Export Template]  │ ┃
┃ │System/   │ │                                                        │ ┃
┃ │Advanced  │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │Help      │ │  ┃ Category: Vehicle Fuel Expense              ┃  │ ┃
┃ └──────────┘ │  ┃ Account Code: 5450                          ┃  │ ┃
┃              │  ┃ GIFI Code: 8811 (Motor vehicle expenses)    ┃  │ ┃
┃              │  ┃ Tax Treatment: HST Included                 ┃  │ ┃
┃              │  ┃ Deductible: Yes (100%)                      ┃  │ ┃
┃              │  ┃ [Edit] [Delete]                             ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Category: Office Supplies                   ┃  │ ┃
┃              │  ┃ Account Code: 5000                          ┃  │ ┃
┃              │  ┃ GIFI Code: 9060 (Office expenses)           ┃  │ ┃
┃              │  ┃ Tax Treatment: HST Included                 ┃  │ ┃
┃              │  ┃ Deductible: Yes (100%)                      ┃  │ ┃
┃              │  ┃ [Edit] [Delete]                             ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Category: Meals & Entertainment             ┃  │ ┃
┃              │  ┃ Account Code: 5500                          ┃  │ ┃
┃              │  ┃ GIFI Code: 8523 (Meals and entertainment)   ┃  │ ┃
┃              │  ┃ Tax Treatment: HST Included                 ┃  │ ┃
┃              │  ┃ Deductible: Yes (50% - CRA limit)  ⚠      ┃  │ ┃
┃              │  ┃ [Edit] [Delete]                             ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  (more mappings...)                                    │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Each mapping shows complete configuration
- Account code + GIFI code shown together
- Tax treatment clearly indicated
- Deductibility percentage shown
- Warning icon (⚠) for partial deductions
- [Edit] opens mapping editor
- [Delete] confirms before removing
```

---

## 5. Export Configuration Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  Export Configuration                                  │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │          │ │  ← Back to Export                                      │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Configure export format and columns                   │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Export Format: [Accountant Review Excel ▼]           │ ┃
┃ │          │ │  Options: Excel / QuickBooks CSV / Generic CSV        │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │          │ │  ┃ Columns                      [Select All]    ┃  │ ┃
┃ │          │ │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │ ┃
┃ │          │ │  ┃ ☑ Document ID                               ┃  │ ┃
┃ │          │ │  ┃ ☑ Date                                      ┃  │ ┃
┃ │          │ │  ┃ ☑ Vendor                                    ┃  │ ┃
┃ │          │ │  ┃ ☑ Amount                                    ┃  │ ┃
┃ │          │ │  ┃ ☑ Suggested Category                        ┃  │ ┃
┃ │          │ │  ┃ ☑ Final Category                            ┃  │ ┃
┃ │          │ │  ┃ ☑ Account Code                              ┃  │ ┃
┃ │          │ │  ┃ ☑ GIFI Code                                 ┃  │ ┃
┃ │          │ │  ┃ ☑ HST/GST Flag                              ┃  │ ┃
┃ │          │ │  ┃ ☐ Confidence Score                          ┃  │ ┃
┃ │          │ │  ┃ ☑ Review Status                             ┃  │ ┃
┃ │          │ │  ┃ ☐ Processing Date                           ┃  │ ┃
┃ │          │ │  ┃ ☑ Notes                                     ┃  │ ┃
┃ │          │ │  ┃ ☑ Source File                               ┃  │ ┃
┃ │          │ │  ┃ ☐ Document Fingerprint                      ┃  │ ┃
┃ │          │ │  ┃ ☑ Accountant Question Reference             ┃  │ ┃
┃ │          │ │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  [Reorder Columns]  [Reset to Default]                │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  ──────────────────────────────────────               │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  Template Name: [Default Excel Template    ]          │ ┃
┃ │          │ │  Description:   [Standard accountant review]          │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  [Save as New Template]  [Load Template ▼]            │ ┃
┃ │          │ │                                                        │ ┃
┃ │          │ │  [Cancel] [Apply Configuration] #3B82F6               │ ┃
┃ │          │ │                                                        │ ┃
┃ │          └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Format dropdown at top (Excel/CSV options)
- Checkbox list for all available columns
- [Select All] toggle
- Reorder button opens drag-and-drop interface
- Template name/description fields
- Save template for reuse
- Load template dropdown shows saved templates
- [Apply Configuration] closes and uses settings
```

---

## 6. Column Reorder Modal

```
┌──────────────────────────────────────────────────┐
│ Reorder Export Columns                 [✕ Close] │
├──────────────────────────────────────────────────┤
│                                                  │
│ Drag columns to reorder:                        │
│                                                  │
│ ┌────────────────────────────────────────────┐ │
│ │ ≡ Document ID            [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ Date                   [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ Vendor                 [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ Amount                 [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ Suggested Category     [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ Final Category         [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ Account Code           [↑] [↓]          │ │
│ ├────────────────────────────────────────────┤ │
│ │ ≡ GIFI Code              [↑] [↓]          │ │
│ └────────────────────────────────────────────┘ │
│                                                  │
│ [Cancel] [Apply Order] #3B82F6                  │
└──────────────────────────────────────────────────┘

Visual Notes:
- Drag handle (≡) for reordering
- Up/Down arrows as alternative
- Live preview of order
- [Apply Order] saves and closes
```

---

## 7. System / Advanced Screen

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────┐ ┌────────────────────────────────────────────────────────┐ ┃
┃ │ MERIDIAN │ │  System / Advanced                                     │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │🏠Home    │ │  Technical and administrative tools                    │ ┃
┃ ├──────────┤ │                                                        │ ┃
┃ │Accounting│ │  ⚠ Warning: These are advanced settings. For business │ ┃
┃ │Setup     │ │  configuration, use Accounting Setup.                  │ ┃
┃ │System/   │ │                                                        │ ┃
┃ │Advanced  │ │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃ │(active)  │ │  ┃ Backup & Restore                             ┃  │ ┃
┃ │Help      │ │  ┃ Export/import engagement data                ┃  │ ┃
┃ └──────────┘ │  ┃ Last backup: 2026-05-10 22:00                ┃  │ ┃
┃              │  ┃ [Create Backup] [Restore from File]          ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ OCR Engine                                   ┃  │ ┃
┃              │  ┃ Status: Running  #10B981                     ┃  │ ┃
┃              │  ┃ OCRmyPDF: v14.2.0 installed                  ┃  │ ┃
┃              │  ┃ Tesseract: v5.3.0 (English, French)          ┃  │ ┃
┃              │  ┃ [View Worker Status] [Configure]             ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Diagnostics                                  ┃  │ ┃
┃              │  ┃ View logs, debug mode, performance metrics   ┃  │ ┃
┃              │  ┃ [View Logs] [Export Diagnostics]             ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Data Management                              ┃  │ ┃
┃              │  ┃ Storage location, cache, database tools      ┃  │ ┃
┃              │  ┃ IndexedDB size: 245 MB                       ┃  │ ┃
┃              │  ┃ [View Storage Info] [Clear Cache]            ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              │                                                        │ ┃
┃              │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ┃
┃              │  ┃ Version Information                          ┃  │ ┃
┃              │  ┃ Meridian: v1.2.3 (build 2026-05-01)          ┃  │ ┃
┃              │  ┃ React: 18.3.1                                ┃  │ ┃
┃              │  ┃ Browser: Chrome 124.0.6367.60                ┃  │ ┃
┃              │  ┃ [Check for Updates]                          ┃  │ ┃
┃              │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ┃
┃              └────────────────────────────────────────────────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Notes:
- Warning at top: advanced tools, not business config
- Clear separation from Accounting Setup
- OCR engine status with version info
- Backup/restore tools
- Diagnostics and logs
- Data management utilities
- Version information
- Each section card-based for clarity
```

---

## Visual Summary

**Added Screens**:
1. ✅ Opening/Welcome Screen with branding
2. ✅ Accounting Setup main menu
3. ✅ GIFI Codes listing and mapping
4. ✅ Category Mapping detail
5. ✅ Export Configuration with customizable columns
6. ✅ Column Reorder interface
7. ✅ System/Advanced tools

**Key Visual Patterns**:
- Card-based layouts for configuration areas
- Clear navigation back to parent screens
- Checkbox lists for selections
- Professional, calm design
- Color-coded status indicators
- Consistent button placement

**Complete Screen Count**: 18 screens
- 1 Opening/Welcome
- 3 Setup (Firm/Client/Period)
- 1 Documents
- 1 Processing
- 1 Review
- 1 Accountant Q&A
- 5 Accounting Setup (main + subsections)
- 1 Export
- 1 Export Configuration
- 1 System/Advanced
- 1 Help
- 1 Vendors (legacy/reference)

---

**Status**: Additional wireframes complete

**Next**: Update CODEX handoff after gap closure approval

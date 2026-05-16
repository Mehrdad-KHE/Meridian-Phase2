# Meridian Design Specification
**A Local-First Accounting Document Management System**

---

## Design Philosophy

Meridian is an **operational assistant**, not a technical dashboard.

### Core Principles
- **User sees**: Where to start, what system did, what needs human input, why it needs input, next step, when output is ready
- **User does NOT see**: OCR workers, traces, backups, technical counters, system internals
- **Feel**: "I drop documents in; system reads, sorts, asks only about exceptions, prepares accountant output"

---

## User Journey

### Complete Flow (Entry → Exit)

```
ENTRY
  ↓
1. SELECT WORKSPACE
   (Firm → Client → Period → Case)
   ↓
2. UPLOAD DOCUMENTS
   (Batch upload, mark as Included/On Hold/Excluded)
   ↓
3. PROCESS DOCUMENTS
   (System reads, extracts, categorizes automatically)
   ↓
4. REVIEW EXCEPTIONS
   (Only items system couldn't confidently resolve)
   ↓
5. ASK ACCOUNTANT (if needed)
   (Questions about ambiguous items)
   ↓
6. APPLY ACCOUNTANT GUIDANCE
   (Use as evidence in Review)
   ↓
7. MANAGE VENDORS/RULES
   (Learn from decisions, build mappings)
   ↓
8. EXPORT PACKAGE
   (Generate accountant review package)
   ↓
EXIT
```

### Next Action Bar
Every screen shows a persistent top bar indicating the next logical step:

```
┌────────────────────────────────────────────────────┐
│ Next: Review 12 documents that need your decision  │ ← Blue/cyan accent
└────────────────────────────────────────────────────┘

or

┌────────────────────────────────────────────────────┐
│ Ready to export accountant review package          │ ← Green accent
└────────────────────────────────────────────────────┘

or

┌────────────────────────────────────────────────────┐
│ Upload documents to begin                          │ ← Muted accent
└────────────────────────────────────────────────────┘
```

---

## Navigation Structure

### Primary Navigation (Sidebar)
```
┌─────────────────────┐
│ MERIDIAN            │ ← Logo/Brand
├─────────────────────┤
│ Workspace           │ ← Firm/Client/Period/Case selector
│ Documents           │ ← Upload & manage
│ Processing          │ ← System work status
│ Review              │ ← Needs human decision
│ Accountant Q&A      │ ← Questions sent to accountant
│ Vendors / Rules     │ ← Business mappings
│ Export              │ ← Generate output
├─────────────────────┤
│ System / Advanced   │ ← Technical settings (muted)
└─────────────────────┘
```

---

## Screen Responsibilities

### 1. Workspace
**Single Responsibility**: Select or create work context

**What it shows**:
- Hierarchy selector: Firm → Client → Period → Case
- Recent cases (last 5)
- Create new case button

**What it does NOT show**:
- Dashboards
- Counters
- Backup status
- OCR status
- Technical metrics

**Primary actions**:
```
[Select Existing Case]
[Create New Case]
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  Next: Select or create a case to begin                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Select Workspace                                           │
│                                                             │
│  ┌───────────────────┐  ┌───────────────────┐             │
│  │ Firm              │→ │ Client            │→            │
│  │ [Select...]       │  │ [Select...]       │             │
│  └───────────────────┘  └───────────────────┘             │
│                                                             │
│  ┌───────────────────┐  ┌───────────────────┐             │
│  │ Period            │→ │ Case              │             │
│  │ [Select...]       │  │ [Select...]       │             │
│  └───────────────────┘  └───────────────────┘             │
│                                                             │
│  [Create New Case]                                         │
│                                                             │
│  ─────────────────────────────────────                     │
│                                                             │
│  Recent Cases                                               │
│  • Acme Corp / Q1 2026 / Initial Review                    │
│  • Smith Contracting / March 2026 / Expense Review         │
│  • Jones Trucking / Feb 2026 / Receipt Processing          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 2. Documents
**Single Responsibility**: Upload and manage document inclusion

**What it shows**:
- Document count summary (simple)
- Upload status per document (uploaded, read, needs correction)
- Inclusion status: Included / On Hold / Excluded
- Re-upload button for unreadable documents

**What it does NOT show**:
- OCR worker status
- Trace logs
- Technical error details (only user-facing messages)

**Primary actions**:
```
[Upload Documents]
[Process Included Documents]
[Mark as On Hold]
[Mark as Excluded]
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  Next: Process 24 included documents                        │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Documents                                                  │
│                                                             │
│  [Upload Documents]       [Process Included Documents]     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Status                                               │  │
│  │                                                       │  │
│  │  24 documents uploaded                                │  │
│  │  22 documents read successfully                       │  │
│  │  2 documents need correction                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Included (24)   On Hold (3)   Excluded (5)               │
│  ────────────    ──────────    ─────────                  │
│                                                             │
│  ┌─────────────────────────────────────────────┐          │
│  │ receipt_gas_march_12.pdf                     │          │
│  │ Status: Read successfully                     │          │
│  │ [View] [Mark On Hold] [Exclude]              │          │
│  └─────────────────────────────────────────────┘          │
│                                                             │
│  ┌─────────────────────────────────────────────┐          │
│  │ invoice_supplier_blur.jpg                    │          │
│  │ Status: Unreadable - blurry image            │          │
│  │ [Re-upload] [Mark On Hold] [Exclude]         │          │
│  └─────────────────────────────────────────────┘          │
│                                                             │
│  [Show more...]                                            │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 3. Processing
**Single Responsibility**: Show system work status

**What it shows**:
- Current processing stage
- Progress (X of Y documents processed)
- How many auto-resolved
- How many need review
- Simple progress indicator

**What it does NOT show**:
- Technical worker status
- OCR pipeline details
- Backend trace logs
- Database operations

**Primary actions**:
```
[Pause Processing] (if needed)
[View Results] (when complete)
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  Processing in progress...                                  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Processing Documents                                       │
│                                                             │
│  Current Stage: Categorizing documents                      │
│                                                             │
│  ████████████████░░░░░░░░░░  18 of 24 documents            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Results so far:                                      │  │
│  │                                                       │  │
│  │  15 documents categorized automatically               │  │
│  │  3 documents need review                              │  │
│  │                                                       │  │
│  │  Estimated time remaining: ~2 minutes                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [Pause Processing]                                        │
│                                                             │
│  ─────────────────────────────────────                     │
│                                                             │
│  What's happening:                                          │
│  • Reading document text                                    │
│  • Detecting document type (receipt, invoice, statement)   │
│  • Extracting key information (date, vendor, amount)        │
│  • Matching against known vendors                          │
│  • Applying learned rules                                   │
│  • Flagging ambiguous items for review                     │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 4. Review
**Single Responsibility**: Resolve items system couldn't confidently decide

**What it shows**:
- Why this item needs review
- System suggestion + confidence level
- Evidence (text extracted, similar past items)
- Grouped similar items (e.g., "5 receipts from same vendor")
- Decision actions

**What it does NOT show**:
- Technical classification scores
- ML model internals
- Raw OCR output (only cleaned evidence)

**Primary actions**:
```
[Accept System Suggestion]
[Choose Different Category]
[Ask Accountant]
[Mark as Invalid]
[Apply to Similar Items]
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  Next: Review 12 documents that need your decision          │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Review Queue                                               │
│                                                             │
│  12 items need review  │  Grouped: 3  │  Individual: 9    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Group: 5 similar receipts from "Joe's Auto Parts"    │  │
│  │                                                       │  │
│  │ Why needs review:                                     │  │
│  │ New vendor not in system. Similar amounts             │  │
│  │ ($45-$67). Need category confirmation.                │  │
│  │                                                       │  │
│  │ System suggests: Vehicle Maintenance                  │  │
│  │ Confidence: Medium (62%)                              │  │
│  │                                                       │  │
│  │ Evidence:                                             │  │
│  │ • Vendor name contains "Auto"                         │  │
│  │ • Receipts show "oil filter", "brake pads"            │  │
│  │ • Similar vendor "Jim's Auto" was categorized as      │  │
│  │   Vehicle Maintenance                                 │  │
│  │                                                       │  │
│  │ [View All 5 Receipts]                                 │  │
│  │                                                       │  │
│  │ Your decision:                                        │  │
│  │ [Accept: Vehicle Maintenance]                         │  │
│  │ [Choose Different Category]                           │  │
│  │ [Ask Accountant]                                      │  │
│  │ [Mark All as Invalid]                                 │  │
│  │                                                       │  │
│  │ □ Remember this vendor rule                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ receipt_unclear_vendor.pdf                            │  │
│  │                                                       │  │
│  │ Why needs review:                                     │  │
│  │ Vendor name unclear in image. Amount readable ($125)  │  │
│  │                                                       │  │
│  │ System suggests: Office Supplies                      │  │
│  │ Confidence: Low (34%)                                 │  │
│  │                                                       │  │
│  │ Evidence:                                             │  │
│  │ • Text extracted: "...ffice Depot ... $125.00"        │  │
│  │ • Possible vendor: "Office Depot"                     │  │
│  │                                                       │  │
│  │ [View Document Image]                                 │  │
│  │                                                       │  │
│  │ Your decision:                                        │  │
│  │ [Accept: Office Supplies]                             │  │
│  │ [Choose Different Category]                           │  │
│  │ [Ask Accountant]                                      │  │
│  │ [Mark as Needs Better Scan]                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 5. Accountant Q&A
**Single Responsibility**: Manage questions sent to accountant

**What it shows**:
- Questions sent (with context)
- Accountant responses (stored as evidence)
- Link back to related review item
- Status: Waiting / Answered / Applied

**What it does NOT show**:
- Direct decision UI (decisions happen in Review)
- Technical message queues

**Primary actions**:
```
[Ask New Question]
[View Response]
[Apply to Review Item]
[Mark as Resolved]
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  Next: Apply 2 accountant responses to review items         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Accountant Q&A                                             │
│                                                             │
│  [Ask New Question]                                        │
│                                                             │
│  Waiting for Response (2)  │  Answered (3)  │  Applied (8) │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Q: How should I categorize recurring charges from     │  │
│  │    "Cloud Services Inc" for $89/month?                │  │
│  │                                                       │  │
│  │ Your context:                                         │  │
│  │ • 3 monthly invoices                                  │  │
│  │ • Amounts: $89 each                                   │  │
│  │ • Description: "Professional plan subscription"       │  │
│  │                                                       │  │
│  │ Status: ✓ Answered (2 hours ago)                      │  │
│  │                                                       │  │
│  │ Accountant response:                                  │  │
│  │ "These should be categorized as 'Software &           │  │
│  │ Subscriptions' under operating expenses. Monthly      │  │
│  │ subscriptions like this are deductible business       │  │
│  │ expenses."                                            │  │
│  │                                                       │  │
│  │ [Apply to 3 Related Review Items]                     │  │
│  │ [Mark as Resolved]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Q: Can I deduct mileage for trips to client sites?   │  │
│  │                                                       │  │
│  │ Your context:                                         │  │
│  │ • Self-employed contractor                            │  │
│  │ • 15 trip records in documents                        │  │
│  │                                                       │  │
│  │ Status: ⏱ Waiting for response (sent 1 day ago)       │  │
│  │                                                       │  │
│  │ [Cancel Question]                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 6. Vendors / Rules
**Single Responsibility**: Manage business mappings and learned rules

**What it shows**:
- Vendor list with learned categories
- Manual vendor rules
- Chart of Accounts (simplified)
- Category mappings

**What it does NOT show**:
- ML training data
- Technical rule engine details
- Database schema

**Primary actions**:
```
[Add Vendor Rule]
[Edit Category Mapping]
[Import Chart of Accounts]
[Export Vendor List]
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  Vendors / Rules                                            │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  [Add Vendor Rule]  [Import Chart of Accounts]             │
│                                                             │
│  Known Vendors (24)  │  Categories (12)  │  Manual Rules (3)│
│                                                             │
│  Search vendors...  [Search box]                           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Joe's Auto Parts                                      │  │
│  │ Default Category: Vehicle Maintenance                 │  │
│  │ Learned from: 5 manual reviews                        │  │
│  │ Last used: March 2026                                 │  │
│  │ [Edit] [View History]                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Office Depot                                          │  │
│  │ Default Category: Office Supplies                     │  │
│  │ Learned from: 8 manual reviews                        │  │
│  │ Last used: May 2026                                   │  │
│  │ [Edit] [View History]                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ─────────────────────────────────────                     │
│                                                             │
│  Categories                                                 │
│                                                             │
│  • Vehicle Maintenance (12 transactions)                   │
│  • Office Supplies (8 transactions)                        │
│  • Software & Subscriptions (6 transactions)               │
│  • Professional Services (4 transactions)                  │
│  • Meals & Entertainment (15 transactions)                 │
│  • Fuel (22 transactions)                                  │
│  [View All Categories]                                     │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 7. Export
**Single Responsibility**: Generate accountant review package

**What it shows**:
- Ready vs Needs Attention status
- Specific blockers (if not ready)
- Package contents preview
- Export format options

**What it does NOT show**:
- Technical export pipeline
- Database export details

**Primary actions**:
```
[Download Accountant Review Package]
[Download Draft Package]
[Preview Package]
[Email to Accountant]
```

**Wireframe (Ready state)**:
```
┌────────────────────────────────────────────────────────────┐
│  Ready to export accountant review package                  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Export                                                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ✓ Ready to Export                                    │  │
│  │                                                       │  │
│  │  All documents processed                              │  │
│  │  All review items resolved                            │  │
│  │  No outstanding questions                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Package Contents:                                          │
│  • 24 categorized documents                                │
│  • 3 accountant Q&A records                                │
│  • 12 vendor rules applied                                 │
│  • Transaction summary by category                         │
│  • Documents requiring accountant attention: 0             │
│                                                             │
│  Export Format:                                             │
│  ○ PDF Report + Document Folder                            │
│  ○ Excel Spreadsheet + Document Folder                     │
│  ○ QuickBooks Import File + Documents                      │
│                                                             │
│  [Preview Package]                                         │
│  [Download Accountant Review Package]                      │
│  [Email to Accountant]                                     │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Wireframe (Not Ready state)**:
```
┌────────────────────────────────────────────────────────────┐
│  Not ready to export - 2 blockers                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Export                                                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ⚠ Needs Attention                                    │  │
│  │                                                       │  │
│  │  Cannot export final package yet.                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Blockers:                                                  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  12 review items need your decision                   │  │
│  │  [Go to Review]                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  2 documents unreadable                               │  │
│  │  [Go to Documents]                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ─────────────────────────────────────                     │
│                                                             │
│  You can still download a draft:                           │
│  [Download Draft Review Package]                           │
│  (Draft includes unresolved items flagged for accountant)  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

### 8. System / Advanced
**Single Responsibility**: Technical settings and diagnostics

**What it shows** (ALL the technical stuff hidden from other screens):
- Backup / Restore
- OCR worker status
- Processing trace logs
- Debug mode
- Version information
- Database management
- Export raw data
- Technical settings

**Primary actions**:
```
[Create Backup]
[Restore from Backup]
[View Trace Logs]
[Export Debug Data]
[Clear Cache]
[Reset Case]
```

**Wireframe**:
```
┌────────────────────────────────────────────────────────────┐
│  System / Advanced                                          │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ⚠ Advanced Technical Settings                             │
│  Changes here may affect system behavior.                  │
│                                                             │
│  Backup & Restore                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Last backup: May 11, 2026 - 10:32 AM                │  │
│  │  [Create Backup Now]  [Restore from Backup]           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  OCR & Processing                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  OCR Engine: Tesseract 5.3.0                          │  │
│  │  Status: Idle                                         │  │
│  │  Documents processed (today): 24                      │  │
│  │  [View Processing Logs]                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Debug & Diagnostics                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  □ Enable debug mode                                  │  │
│  │  □ Log all classification decisions                   │  │
│  │  [View Trace Logs]  [Export Debug Data]               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Database                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Size: 45 MB                                          │  │
│  │  [Optimize Database]  [Export Raw Data]               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  System Information                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Version: 1.0.2                                       │  │
│  │  Platform: Electron + React                           │  │
│  │  Data location: ~/Documents/Meridian                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Danger Zone                                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [Clear All Cache]                                    │  │
│  │  [Reset Current Case]                                 │  │
│  │  [Factory Reset]                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## Visual Design System

### Color Palette (Dark Theme)

**Base Colors**
```
Background Dark: #0F1419
Background Medium: #1A1F28
Background Light: #252C37
```

**Accent Colors**
```
Primary (Action): #3B82F6 (blue)
Success: #10B981 (green)
Warning: #F59E0B (amber)
Error: #EF4444 (red)
Muted: #6B7280 (gray)
```

**Text Colors**
```
Primary Text: #F9FAFB
Secondary Text: #D1D5DB
Muted Text: #9CA3AF
Disabled: #6B7280
```

**Status Colors**
```
Ready: #10B981 (green)
Needs Attention: #F59E0B (amber)
Processing: #3B82F6 (blue)
Error: #EF4444 (red)
```

### Typography

**Headings**
```
H1: 28px, weight 600, -0.02em tracking
H2: 22px, weight 600, -0.01em tracking
H3: 18px, weight 600
H4: 16px, weight 600
```

**Body**
```
Body Large: 16px, weight 400, 1.6 line-height
Body: 14px, weight 400, 1.5 line-height
Body Small: 13px, weight 400, 1.4 line-height
Caption: 12px, weight 400, 1.3 line-height
```

**Monospace** (for technical data in System/Advanced)
```
Mono: 13px, "SF Mono", "Consolas", monospace
```

### Spacing Scale
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Component Patterns

#### Buttons

**Primary Action**
```css
background: #3B82F6
text: #FFFFFF
padding: 12px 24px
border-radius: 6px
font-weight: 600
hover: #2563EB
```

**Secondary Action**
```css
background: transparent
border: 1px solid #3B82F6
text: #3B82F6
padding: 12px 24px
border-radius: 6px
font-weight: 600
hover background: #1E3A8A20
```

**Destructive Action**
```css
background: transparent
border: 1px solid #EF4444
text: #EF4444
padding: 12px 24px
border-radius: 6px
font-weight: 600
hover background: #7F1D1D20
```

#### Cards

**Standard Card**
```css
background: #1A1F28
border: 1px solid #252C37
border-radius: 8px
padding: 20px
shadow: 0 1px 3px rgba(0,0,0,0.3)
```

**Elevated Card** (for review items)
```css
background: #1A1F28
border: 1px solid #3B82F6
border-radius: 8px
padding: 24px
shadow: 0 4px 12px rgba(59,130,246,0.15)
```

#### Status Badges

```css
Ready Badge:
  background: #10B98120
  text: #10B981
  border: 1px solid #10B981
  padding: 4px 12px
  border-radius: 12px
  font-size: 12px
  font-weight: 600

Needs Attention Badge:
  background: #F59E0B20
  text: #F59E0B
  border: 1px solid #F59E0B
  padding: 4px 12px
  border-radius: 12px
  font-size: 12px
  font-weight: 600
```

#### Progress Indicators

**Progress Bar**
```css
background: #252C37 (rail)
fill: #3B82F6 (progress)
height: 8px
border-radius: 4px
```

**Loading Spinner** (minimal, calm animation)
```css
border: 2px solid #252C37
border-top: 2px solid #3B82F6
border-radius: 50%
size: 20px
animation: spin 1s linear infinite
```

### Layout Principles

**Sidebar Navigation**
- Width: 240px
- Fixed position
- Dark background (#0F1419)
- Logo at top
- Active item: left blue border (4px) + blue text
- Muted item: gray text
- System/Advanced at bottom, separated by divider, smaller text

**Main Content Area**
- Max width: 1200px
- Padding: 32px
- Background: #0F1419
- Cards float on #1A1F28

**Next Action Bar**
- Height: 56px
- Background: #1A1F28
- Blue left border (4px) for active actions
- Sticky at top of content area
- Icon + text + action link

---

## Button & Label Text Examples

### Workspace
- **Select Existing Case**
- **Create New Case**
- **Continue with [Case Name]**

### Documents
- **Upload Documents**
- **Process Included Documents**
- **Mark as On Hold**
- **Mark as Excluded**
- **Re-upload**
- **View Document**

### Processing
- **Pause Processing**
- **View Results**
- **Cancel**

### Review
- **Accept System Suggestion**
- **Choose Different Category**
- **Ask Accountant**
- **Mark as Invalid**
- **Apply to All Similar Items**
- **View Document Image**
- **View Evidence**
- **Skip for Now**

### Accountant Q&A
- **Ask New Question**
- **View Response**
- **Apply to Review Item**
- **Mark as Resolved**
- **Cancel Question**

### Vendors / Rules
- **Add Vendor Rule**
- **Edit Category Mapping**
- **Import Chart of Accounts**
- **Export Vendor List**
- **Edit**
- **View History**

### Export
- **Download Accountant Review Package**
- **Download Draft Review Package**
- **Preview Package**
- **Email to Accountant**
- **Go to Review**
- **Go to Documents**

### System / Advanced
- **Create Backup Now**
- **Restore from Backup**
- **View Processing Logs**
- **View Trace Logs**
- **Export Debug Data**
- **Optimize Database**
- **Export Raw Data**
- **Clear All Cache**
- **Reset Current Case**
- **Factory Reset**

---

## What Goes in System / Advanced

**Hide these from main user flow:**
- Backup / Restore functionality
- OCR worker status
- Processing engine diagnostics
- Trace logs
- Debug mode toggles
- Database optimization
- Raw data export
- Cache management
- Technical version info
- Factory reset
- Processing pipeline configuration
- Error logs
- Performance metrics
- API credentials (if any)
- Advanced import/export formats

**Keep these in main flow:**
- Document upload status (simple)
- Processing progress (simple)
- Review decisions
- Accountant Q&A
- Vendor/category management
- Final package export

---

## User Journey Example (Step-by-Step)

### Scenario: Small Business Owner with 50 Receipts

**Step 1: Entry**
- User opens Meridian
- Sees: "Next: Select or create a case to begin"
- Goes to **Workspace**

**Step 2: Create Case**
- Selects: Firm: "Smith Contracting LLC"
- Selects: Client: "Self" (or creates one)
- Selects: Period: "Q1 2026"
- Creates Case: "Receipt Processing March"
- System: Auto-navigates to **Documents**

**Step 3: Upload Documents**
- Sees: "Next: Upload documents to begin"
- Clicks: **Upload Documents**
- Drags 50 receipt images into upload area
- System: Uploads complete
- Sees: "50 documents uploaded, 0 read"
- Clicks: **Process Included Documents**
- System: Auto-navigates to **Processing**

**Step 4: Watch Processing**
- Sees: "Processing in progress... Current Stage: Reading documents"
- Progress bar: 15 of 50 documents
- Sees: "12 documents categorized automatically, 3 need review"
- Waits ~3 minutes
- Processing completes
- Sees: "48 documents processed successfully, 2 unreadable"
- Next Action Bar updates: "Review 12 documents that need your decision"
- Clicks: **View Results** (or clicks **Review** in nav)

**Step 5: Review Exceptions**
- Goes to **Review**
- Sees grouped item: "5 receipts from Joe's Auto Parts"
- Reads: "Why needs review: New vendor. System suggests Vehicle Maintenance (62% confidence)"
- Sees evidence: vendor name, line items, similar past vendors
- Clicks: **Accept: Vehicle Maintenance**
- Checks: "Remember this vendor rule"
- System: Applies to all 5, removes from queue
- Sees next item: "Receipt with unclear vendor name"
- Reads: "Text extracted: '...ffice Depot'"
- Not sure about category
- Clicks: **Ask Accountant**

**Step 6: Ask Accountant**
- Modal opens: "Ask accountant about this document"
- Writes: "Is this deductible as Office Supplies?"
- Clicks: **Send Question**
- System: Adds to **Accountant Q&A**, marks review item as "waiting for accountant"
- Continues reviewing remaining items
- Resolves 10 more items by accepting system suggestions or choosing categories
- 1 item left: waiting for accountant

**Step 7: Accountant Responds (next day)**
- User returns to Meridian
- Next Action Bar: "Apply 1 accountant response to review items"
- Goes to **Accountant Q&A**
- Sees accountant response: "Yes, categorize as Office Supplies"
- Clicks: **Apply to Review Item**
- System: Auto-navigates to **Review**, pre-fills decision
- User confirms: **Accept: Office Supplies**
- Review queue now: 0 items

**Step 8: Check Export Readiness**
- Next Action Bar updates: "Ready to export accountant review package"
- Goes to **Export**
- Sees: "✓ Ready to Export"
- Package contents: 48 categorized documents, 1 Q&A record, 2 unreadable flagged
- Clicks: **Preview Package**
- Reviews PDF preview
- Clicks: **Download Accountant Review Package**
- System: Generates ZIP file with:
  - Excel summary by category
  - All document images in folders
  - Q&A record
  - 2 unreadable documents flagged for accountant

**Step 9: Done**
- User emails package to accountant
- Returns to **Workspace** to start next case

---

## Implementation Notes for Codex

### Tech Stack
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS (dark theme configured)
- **State Management**: React Context or Zustand (for case state, review queue)
- **Local Storage**: IndexedDB (for documents, OCR results, rules)
- **OCR**: Tesseract.js (client-side)
- **File Handling**: Local file system access (Electron or browser File System Access API)
- **Routing**: React Router (for navigation between screens)

### Key Data Models

**Case**
```typescript
interface Case {
  id: string;
  firm: string;
  client: string;
  period: string;
  name: string;
  createdAt: Date;
  status: 'active' | 'exported' | 'archived';
}
```

**Document**
```typescript
interface Document {
  id: string;
  caseId: string;
  filename: string;
  uploadedAt: Date;
  status: 'uploaded' | 'read' | 'unreadable' | 'processed';
  inclusionStatus: 'included' | 'on_hold' | 'excluded';
  ocrText?: string;
  category?: string;
  vendor?: string;
  amount?: number;
  date?: Date;
  confidence?: number;
}
```

**ReviewItem**
```typescript
interface ReviewItem {
  id: string;
  documentId: string;
  reason: string; // why needs review
  systemSuggestion: string;
  confidence: number;
  evidence: string[];
  groupId?: string; // for grouped similar items
  status: 'pending' | 'resolved' | 'waiting_accountant';
  resolution?: {
    category: string;
    decidedAt: Date;
    decidedBy: 'user' | 'accountant';
  };
}
```

**AccountantQuestion**
```typescript
interface AccountantQuestion {
  id: string;
  reviewItemId: string;
  question: string;
  context: string;
  askedAt: Date;
  status: 'sent' | 'answered' | 'applied';
  response?: {
    answer: string;
    answeredAt: Date;
  };
}
```

**VendorRule**
```typescript
interface VendorRule {
  id: string;
  vendorName: string;
  category: string;
  learnedFrom: 'manual' | 'accountant' | 'import';
  usageCount: number;
  lastUsed: Date;
}
```

### Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx (sidebar nav + main content)
│   │   ├── Sidebar.tsx
│   │   └── NextActionBar.tsx
│   ├── screens/
│   │   ├── Workspace.tsx
│   │   ├── Documents.tsx
│   │   ├── Processing.tsx
│   │   ├── Review.tsx
│   │   ├── AccountantQA.tsx
│   │   ├── VendorsRules.tsx
│   │   ├── Export.tsx
│   │   └── SystemAdvanced.tsx
│   ├── shared/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── DocumentPreview.tsx
│   └── features/
│       ├── review/
│       │   ├── ReviewItemCard.tsx
│       │   ├── ReviewGroupCard.tsx
│       │   └── CategoryPicker.tsx
│       └── export/
│           └── PackagePreview.tsx
├── context/
│   ├── CaseContext.tsx
│   └── ReviewContext.tsx
├── hooks/
│   ├── useDocuments.ts
│   ├── useReviewQueue.ts
│   └── useVendorRules.ts
├── services/
│   ├── ocrService.ts
│   ├── categorizationService.ts
│   └── exportService.ts
└── utils/
    ├── groupSimilarItems.ts
    └── generateEvidence.ts
```

### Critical Implementation Details

1. **Next Action Bar Logic**
   - Calculate dynamically based on app state
   - Priority order: unreadable docs → review items → accountant responses → ready to export

2. **Review Grouping**
   - Group by: same vendor + similar amounts + similar dates
   - Max 10 items per group
   - Show representative sample in group card

3. **Evidence Generation**
   - Extract: vendor name patterns, line item keywords, similar past decisions
   - Format as bullet points
   - Keep under 5 bullet points per item

4. **Confidence Calculation**
   - Simple rule-based:
     - 90%+: Known vendor with clear match
     - 60-90%: Similar vendor or strong keyword match
     - <60%: New vendor or unclear text

5. **Export Package Structure**
   ```
   accountant-review-package/
   ├── summary.xlsx (or summary.csv)
   ├── qa-record.pdf
   ├── documents/
   │   ├── vehicle-maintenance/
   │   ├── office-supplies/
   │   └── needs-attention/
   └── metadata.json
   ```

6. **Local-First Architecture**
   - All processing happens client-side
   - IndexedDB for persistence
   - No server calls (except optional email)
   - Backup = export IndexedDB to JSON file

---

## Final Design Checklist

### ✅ Each Screen Has Single Responsibility
- Workspace: select/create case only
- Documents: upload/manage only
- Processing: show system work only
- Review: resolve exceptions only
- Accountant Q&A: manage questions only
- Vendors/Rules: manage mappings only
- Export: generate output only
- System/Advanced: technical settings only

### ✅ Technical Details Hidden from Main Flow
- No OCR worker status (except in System/Advanced)
- No trace logs (except in System/Advanced)
- No backup UI (except in System/Advanced)
- No database counters (except in System/Advanced)

### ✅ Clear User Guidance
- Next Action Bar on every screen
- Why items need review (with evidence)
- Specific blockers when not ready to export
- System suggestions with confidence

### ✅ Minimal Visual Noise
- Dark, calm theme
- High information density but not overwhelming
- Status badges only where needed
- Progress indicators simple and clear

### ✅ Operational Assistant Feel
- Language: "Review 12 documents" not "12 classification failures"
- Actions: "Accept suggestion" not "Override model output"
- Status: "Ready to export" not "All workflows complete"
- Errors: "Unreadable document" not "OCR pipeline error"

---

## End of Design Specification

This design is ready for implementation in React + Tailwind CSS with local-first architecture.

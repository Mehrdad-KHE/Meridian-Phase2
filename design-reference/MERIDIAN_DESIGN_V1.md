# Meridian Design v1
**Accounting Workflow Assistant**

---

## Workflow Map

```
START
  ↓
0. HOME
   Welcome / Recent engagements / Start new
   ↓
1. ACCOUNTANT/FIRM SETUP
   Select or create accounting firm
   ↓
2. CLIENT SETUP
   Select or create client
   ↓
3. PERIOD SETUP
   Select fiscal year and period
   ↓
4. DOCUMENTS INTAKE
   Upload and manage documents
   ↓
5. PROCESSING
   System reads and categorizes
   ↓
6. REVIEW
   Resolve exceptions only
   ↓
7. ACCOUNTANT Q&A (if needed)
   Ask accountant questions
   ↓
8. EXPORT
   Generate accountant package
   ↓
END
```

---

## Navigation Model

### Sidebar Navigation
```
┌─────────────────────┐
│ MERIDIAN            │
├─────────────────────┤
│ Home                │
├─────────────────────┤
│ Engagement Setup    │
│  ├─ Accountant      │
│  ├─ Client          │
│  └─ Period          │
├─────────────────────┤
│ Documents           │
│ Processing          │
│ Review              │
│ Accountant Q&A      │
│ Export              │
├─────────────────────┤
│ System / Advanced   │
│ Help                │
└─────────────────────┘
```

**Note**: Help is a reserved placeholder for future documentation. Currently empty.

### Context Bar (top of every screen after setup)
```
┌────────────────────────────────────────────────────────┐
│ Northpeak Accounting → Daniel Roberts → 2025 Annual│
└────────────────────────────────────────────────────────┘
```

---

## Screen Designs

### 0. Home

**Responsibility**: Welcome screen and engagement selection

**Next Action**: "Start a new engagement or continue an existing one"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  MERIDIAN                                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Start New Engagement]                          │
│                                                  │
│  ─────────────────────                           │
│                                                  │
│  Recent Engagements                              │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Daniel Roberts                     │ │
│  │ 2025 Annual                                │ │
│  │ Status: Review 6 items                     │ │
│  │ [Continue]                                 │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Acme Trucking Ltd.                         │ │
│  │ 2024 Q4                                    │ │
│  │ Status: Ready to export                    │ │
│  │ [Continue]                                 │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Jones Contracting                          │ │
│  │ 2025 Q1                                    │ │
│  │ Status: Exported                           │ │
│  │ [View]                                     │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [View All]                                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Start New Engagement]` or `[Continue]` existing

**Simple Status Options**:
- "Setup in progress"
- "Review X items"
- "Ready to export"
- "Exported"
- "Processing..."

---

### 1. Accountant / Firm Setup

**Responsibility**: Select or create accounting firm

**Next Action**: "Select a firm to begin engagement setup"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Select Accountant / Firm                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Select a firm or add a new one                 │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Northpeak Accounting                           │ │
│  │ Toronto, ON                                │ │
│  │ [Select Firm]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Smith & Associates CPA                     │ │
│  │ Vancouver, BC                              │ │
│  │ [Select Firm]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [Add New Firm]                                 │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Select Firm]` or `[Add New Firm]`

**Add New Firm Modal**:
```
┌──────────────────────────────────────────────────┐
│  Add New Firm                               [×]  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Firm / Accountant Name *                       │
│  [________________________]                      │
│                                                  │
│  Email *                                         │
│  [________________________]                      │
│                                                  │
│  Phone                                           │
│  [________________________]                      │
│                                                  │
│  Address                                         │
│  [________________________]                      │
│                                                  │
│                     [Cancel]  [Add Firm]        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### 2. Client Setup

**Responsibility**: Select or create client

**Next Action**: "Select a client to continue"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Select Client                                   │
├──────────────────────────────────────────────────┤
│                                                  │
│  Northpeak Accounting                               │
│                                                  │
│  Select a client or add a new one               │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Daniel Roberts                     │ │
│  │ Self-employed contractor                   │ │
│  │ [Select Client]                            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Acme Trucking Ltd.                         │ │
│  │ Corporation                                │ │
│  │ [Select Client]                            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [Add New Client]                               │
│                                                  │
│                            [Back]               │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Select Client]` or `[Add New Client]`

**Add New Client Modal**:
```
┌──────────────────────────────────────────────────┐
│  Add New Client                             [×]  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Client Name *                                   │
│  [________________________]                      │
│                                                  │
│  Business Type *                                 │
│  [Sole Proprietor ▼]                            │
│                                                  │
│  Email                                           │
│  [________________________]                      │
│                                                  │
│  Phone                                           │
│  [________________________]                      │
│                                                  │
│  Business Number (Optional)                      │
│  [________________________]                      │
│                                                  │
│  ▼ Show Additional Fields                        │
│                                                  │
│                     [Cancel]  [Add Client]      │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### 3. Period Setup

**Responsibility**: Select fiscal year and accounting period

**Next Action**: "Select the accounting period for this engagement"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Select Accounting Period                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Northpeak Accounting → Daniel Roberts      │
│                                                  │
│  Select the fiscal year and period              │
│                                                  │
│  Fiscal Year *                                   │
│  [2025 ▼]                                       │
│                                                  │
│  Period Type *                                   │
│  [Annual / Full Year ▼]                         │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  Period: January 1, 2025 - December 31, 2025│ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  Period options:                                 │
│  • Annual / Full Year                           │
│  • Quarterly (Q1, Q2, Q3, Q4)                   │
│  • Semi-Annual (H1, H2)                         │
│  • Monthly                                       │
│  • Custom Period                                 │
│                                                  │
│                [Back]  [Continue to Documents]  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Continue to Documents]`

---

### 4. Documents Intake

**Responsibility**: Upload and manage documents

**Next Action**: "Upload documents to begin processing"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Documents                                       │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Upload Documents]      [Select Folder]        │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  📄 Drag and drop files here               │ │
│  │     or click to browse                     │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  Documents (0)                                   │
│                                                  │
│  No documents uploaded yet.                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**After Upload**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Documents                                       │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Upload More]  [Process Documents]             │
│                                                  │
│  Status:                                         │
│  24 uploaded  |  22 read  |  2 need attention   │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │ Included (22)  On Hold (0)  Excluded (2)     ││
│  ├──────────────────────────────────────────────┤│
│  │                                               ││
│  │ ✓ receipt_gas_march_12.pdf                   ││
│  │   Read successfully                           ││
│  │   [View] [Hold] [Exclude]                    ││
│  │                                               ││
│  │ ⚠ invoice_blur.jpg                           ││
│  │   Unreadable - blurry image                  ││
│  │   [Re-upload] [Hold] [Exclude]               ││
│  │                                               ││
│  │ ✓ receipt_coffee_march_15.pdf                ││
│  │   Read successfully                           ││
│  │   [View] [Hold] [Exclude]                    ││
│  │                                               ││
│  └──────────────────────────────────────────────┘│
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Process Documents]`

**During Upload**:
```
┌────────────────────────────────────────────────┐
│  Uploading documents...                        │
│                                                │
│  ████████████░░░░░░░░░░  12 of 24 files       │
│                                                │
│  receipt_gas_march_12.pdf                     │
│  Reading document...                           │
└────────────────────────────────────────────────┘
```

---

### 5. Processing

**Responsibility**: Show system processing status

**Next Action**: "System is processing your documents"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Processing                                      │
├──────────────────────────────────────────────────┤
│                                                  │
│  Processing Documents                            │
│                                                  │
│  Current Stage: Classifying documents            │
│                                                  │
│  ████████████████░░░░░░  18 of 24 documents     │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  Results so far:                           │ │
│  │                                            │ │
│  │  15 documents auto-classified              │ │
│  │  3 documents need review                   │ │
│  │                                            │ │
│  │  Estimated time: ~2 minutes                │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [Pause]                                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Processing Complete**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Processing Complete                             │
├──────────────────────────────────────────────────┤
│                                                  │
│  ✓ Processing Complete                          │
│                                                  │
│  Summary:                                        │
│  • 24 documents processed                       │
│  • 18 documents auto-classified                 │
│  • 6 documents need review                      │
│  • 2 documents unreadable                       │
│  • 1 duplicate found                            │
│                                                  │
│                              [Go to Review]     │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Go to Review]`

**Processing Stages**:
- Reading documents
- Extracting text
- Checking duplicates
- Classifying documents
- Matching to categories
- Preparing review items

---

### 6. Review

**Responsibility**: Resolve exceptions that need human decision

**Next Action**: "Review 6 items that need your decision"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Review                                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  6 items need review                             │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Group: 4 receipts from "Joe's Auto Parts" │ │
│  │                                            │ │
│  │ Why needs review:                          │ │
│  │ New vendor not in system                   │ │
│  │                                            │ │
│  │ System suggests: Vehicle Maintenance       │ │
│  │ Confidence: 65%                            │ │
│  │                                            │ │
│  │ Evidence:                                  │ │
│  │ • Vendor name contains "Auto"              │ │
│  │ • Items: oil filter, brake pads            │ │
│  │ • Similar vendor categorized as Vehicle    │ │
│  │                                            │ │
│  │ [View All 4 Receipts]                      │ │
│  │                                            │ │
│  │ Decision:                                  │ │
│  │ [Accept Recommendation]                    │ │
│  │ [Change Category]                          │ │
│  │ [Ask Accountant]                           │ │
│  │ [Mark as Support Only]                     │ │
│  │ [Exclude]                                  │ │
│  │                                            │ │
│  │ ☐ Remember this vendor rule                │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ receipt_unclear.pdf                        │ │
│  │                                            │ │
│  │ Why needs review:                          │ │
│  │ Vendor name unclear in image               │ │
│  │                                            │ │
│  │ System suggests: Office Supplies           │ │
│  │ Confidence: 40%                            │ │
│  │                                            │ │
│  │ Evidence:                                  │ │
│  │ • Text: "...ffice Depot ... $125.00"       │ │
│  │ • Possible vendor: Office Depot            │ │
│  │                                            │ │
│  │ [View Document]                            │ │
│  │                                            │ │
│  │ Decision:                                  │ │
│  │ [Accept Recommendation]                    │ │
│  │ [Change Category]                          │ │
│  │ [Ask Accountant]                           │ │
│  │ [Mark as Support Only]                     │ │
│  │ [Exclude]                                  │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: Accept Recommendation, Change Category, Ask Accountant, Mark as Support Only, or Exclude

**Review Queue Empty**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Review                                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ✓ All review items resolved                    │
│                                                  │
│  No items need your attention.                   │
│                                                  │
│                          [Continue to Export]   │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### 7. Accountant Q&A

**Responsibility**: Manage questions sent to accountant

**Next Action**: "2 questions awaiting accountant response"

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Accountant Q&A                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Ask New Question]                              │
│                                                  │
│  Awaiting (2)  |  Answered (1)  |  Applied (5)  │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Q: How to categorize "Cloud Services Inc"  │ │
│  │    recurring $89/month charges?            │ │
│  │                                            │ │
│  │ Context:                                   │ │
│  │ • 3 monthly invoices                       │ │
│  │ • Amount: $89 each                         │ │
│  │ • Description: "Professional subscription" │ │
│  │                                            │ │
│  │ Status: ✓ Answered (2 hours ago)           │ │
│  │                                            │ │
│  │ Accountant response:                       │ │
│  │ "Categorize as Software & Subscriptions    │ │
│  │ under operating expenses. Monthly business │ │
│  │ subscriptions are deductible."             │ │
│  │                                            │ │
│  │ [Return to Review]                         │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Q: Can I deduct client site mileage?      │ │
│  │                                            │ │
│  │ Context:                                   │ │
│  │ • Self-employed contractor                 │ │
│  │ • 15 trip records                          │ │
│  │                                            │ │
│  │ Status: ⏱ Awaiting response (1 day ago)    │ │
│  │                                            │ │
│  │ [Cancel Question]                          │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: `[Return to Review]` or `[Ask New Question]`

**Core Rule**: Accountant Q&A never finalizes a decision. Accountant answers are evidence only. Final decisions always happen in Review.

**Ask New Question Modal**:
```
┌──────────────────────────────────────────────────┐
│  Ask Accountant                             [×]  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Related Documents: 4 receipts from Joe's Auto  │
│                                                  │
│  Your Question:                                  │
│  ┌────────────────────────────────────────────┐ │
│  │                                            │ │
│  │                                            │ │
│  │                                            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  Context (auto-included):                        │
│  • 4 receipts                                   │
│  • Vendor: Joe's Auto Parts                     │
│  • Total amount: $234.50                        │
│  • Items: oil, brake pads, filters              │
│                                                  │
│                      [Cancel]  [Send Question]  │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### 8. Export

**Responsibility**: Generate accountant review package

**Next Action**: "Ready to export" or "Resolve blockers before export"

**Wireframe (Ready)**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Export                                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ✓ Ready                                        │
│                                                  │
│  All items resolved. Package ready.              │
│                                                  │
│  Package Contents:                               │
│  • 24 categorized documents                     │
│  • 3 accountant Q&A records                     │
│  • 8 vendor rules applied                       │
│  • Transaction summary by category              │
│                                                  │
│  Export Format:                                  │
│  ○ Accountant Review (PDF + Documents)          │
│  ○ Excel Workbook                               │
│  ○ QuickBooks Import                            │
│  ○ CSV Files                                    │
│                                                  │
│  [Preview Package]                              │
│  [Download Accountant Package]                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Wireframe (Needs Attention)**:
```
┌──────────────────────────────────────────────────┐
│  Northpeak Accounting → Daniel Roberts → 2025 Annual│
├──────────────────────────────────────────────────┤
│  Export                                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ⚠ Needs Attention                              │
│                                                  │
│  Cannot export final package yet.                │
│                                                  │
│  Blockers:                                       │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ 6 review items need decision               │ │
│  │ [Go to Review]                             │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ 2 documents unreadable                     │ │
│  │ [Go to Documents]                          │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ─────────────────────                          │
│                                                  │
│  You can download a draft:                      │
│  [Download Draft Review Package]                │
│                                                  │
│  (Draft includes unresolved items flagged)      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action (Ready)**: `[Download Accountant Package]`

**Main Action (Needs Attention)**: `[Download Draft Review Package]` or resolve blockers

**Two Clear States**:
- **Ready**: All items resolved → Download Accountant Package
- **Needs Attention**: Blockers present → Download Draft Review Package

---

### 9. System / Advanced

**Responsibility**: Technical settings and diagnostics

**Next Action**: None (utility screen)

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  System / Advanced                               │
├──────────────────────────────────────────────────┤
│                                                  │
│  ⚠ Advanced Settings                            │
│                                                  │
│  Backup & Restore                                │
│  ┌────────────────────────────────────────────┐ │
│  │ Last backup: May 11, 2026 - 10:32 AM      │ │
│  │ [Create Backup]  [Restore]                 │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  OCR & Processing                                │
│  ┌────────────────────────────────────────────┐ │
│  │ Engine: Tesseract 5.3.0                    │ │
│  │ Status: Idle                               │ │
│  │ Documents processed today: 24              │ │
│  │ [View Logs]                                │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  Debug                                           │
│  ┌────────────────────────────────────────────┐ │
│  │ ☐ Enable debug mode                        │ │
│  │ [View Trace Logs]  [Export Debug Data]     │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  System Info                                     │
│  ┌────────────────────────────────────────────┐ │
│  │ Version: 1.0.0                             │ │
│  │ Data location: ~/Documents/Meridian        │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: None (utility functions only)

---

### 10. Help / Documentation

**Responsibility**: Documentation hub (reserved for future)

**Next Action**: None (utility screen)

**Wireframe**:
```
┌──────────────────────────────────────────────────┐
│  Help / Documentation                            │
├──────────────────────────────────────────────────┤
│                                                  │
│  📚 Documentation                                │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Getting Started                            │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Workflow Guide                             │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Screen-by-Screen Help                      │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Troubleshooting                            │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Accounting Terminology                     │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Import / Export Guide                      │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ OCR & Document Reading                     │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Backup / Restore Guide                     │ │
│  │ [Coming soon]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ─────────────────────                          │
│                                                  │
│  Need help now?                                  │
│  Version: 1.0.0                                  │
│  Contact: support@meridian.app                   │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Main Action**: None (reserved for future content)

**Future Documentation Structure**:
- **Getting Started**: First-time user guide, basic workflow overview
- **Workflow Guide**: Step-by-step explanation of each workflow stage
- **Screen-by-Screen Help**: Contextual help for each screen
- **Troubleshooting**: Common issues and solutions
- **Accounting Terminology**: Glossary of terms (Fiscal Year, Period, Chart of Accounts, etc.)
- **Import / Export Guide**: Format specifications and platform integrations
- **OCR & Document Reading**: How OCR works, tips for better scans
- **Backup / Restore Guide**: Data safety and recovery procedures

---

## Next Action Messages

| Screen              | Next Action Message                                      |
|---------------------|----------------------------------------------------------|
| Home                | "Start a new engagement or continue an existing one"     |
| Accountant Setup    | "Select a firm to begin engagement setup"                |
| Client Setup        | "Select a client to continue"                            |
| Period Setup        | "Select the accounting period for this engagement"       |
| Documents (empty)   | "Upload documents to begin processing"                   |
| Documents (ready)   | "Process 24 documents to continue"                       |
| Processing          | "System is processing your documents"                    |
| Processing Complete | "Processing complete - review 6 items"                   |
| Review (active)     | "Review 6 items that need your decision"                 |
| Review (complete)   | "All items resolved - ready to export"                   |
| Accountant Q&A      | "2 questions awaiting response"                          |
| Export (ready)      | "Ready - download accountant package"                    |
| Export (blocked)    | "Needs attention - resolve blockers or download draft"   |
| System / Advanced   | None                                                     |
| Help / Documentation| None (reserved for future)                               |

---

## Core Design Rules

### 1. Accountant Q&A Role
**Critical Rule**: Accountant Q&A never finalizes a decision.

- Accountant answers are **evidence only**
- Final decisions **always** happen in Review
- When accountant responds, the item returns to Review with the answer as additional evidence
- User makes the final categorization decision in Review screen

### 2. Export States
**Two Clear States Only**:

**Ready**:
- All review items resolved
- No blockers
- Action: Download Accountant Package

**Needs Attention**:
- Unresolved review items or blockers present
- Action: Download Draft Review Package (includes flagged items)
- Or: Resolve blockers first

### 3. Review Decisions
**Available Actions**:
- Accept Recommendation (use system suggestion)
- Change Category (pick different category)
- Ask Accountant (send to Q&A for evidence)
- Mark as Support Only (for reference, not accounting)
- Exclude (remove from package)

### 4. Engagement Setup Flow
**Sequential Setup**:
1. Select Firm (or Add New Firm)
2. Select Client (or Add New Client)
3. Select Period
4. Continue to Documents

Each step must be completed before proceeding to next.

---

## Button Placement Rules

### Primary Action Buttons
**Location**: Bottom right of screen
**Style**: Blue, prominent
**Examples**: `[Continue]`, `[Process Documents]`, `[Download Package]`

### Secondary Action Buttons
**Location**: Bottom left or inline with content
**Style**: Gray outline
**Examples**: `[Back]`, `[Cancel]`, `[View]`

### Danger Action Buttons
**Location**: Inline with item
**Style**: Red outline
**Examples**: `[Exclude]`, `[Delete]`

### Utility Buttons
**Location**: Top right or inline with section
**Style**: Gray, small
**Examples**: `[Preview]`, `[Edit]`, `[View Logs]`

---

## Button States

### Enabled (Primary)
```css
background: #3B82F6
text: #FFFFFF
cursor: pointer
```

### Disabled
```css
background: #374151
text: #6B7280
cursor: not-allowed
tooltip: "Reason why disabled"
```

### Loading
```css
background: #3B82F6
text: #FFFFFF
spinner: visible
cursor: wait
```

### Success
```css
background: #10B981
text: #FFFFFF
icon: checkmark
```

### Warning
```css
background: #F59E0B
text: #1F2937
icon: alert
```

---

## Visual Style

### Colors (Dark Theme)
```
Background Dark:    #0F1419
Background Medium:  #1A1F28
Background Light:   #252C37

Primary Blue:       #3B82F6
Success Green:      #10B981
Warning Amber:      #F59E0B
Error Red:          #EF4444
Muted Gray:         #6B7280

Text Primary:       #F9FAFB
Text Secondary:     #D1D5DB
Text Muted:         #9CA3AF
```

### Typography
```
Heading 1:  24px, weight 600
Heading 2:  20px, weight 600
Heading 3:  16px, weight 600
Body:       14px, weight 400
Small:      12px, weight 400
```

### Spacing
```
4px, 8px, 12px, 16px, 24px, 32px
```

### Border Radius
```
Small:  4px
Medium: 6px
Large:  8px
```

---

## Implementation Notes

### Tech Stack
- React + TypeScript
- Tailwind CSS (dark theme)
- React Router (navigation)
- IndexedDB (local storage)
- Tesseract.js (OCR)

### Key Features
- All processing client-side (local-first)
- Real-time upload feedback
- Duplicate detection via file hash
- Automatic categorization with confidence scores
- Evidence-based review decisions
- Grouped similar items in review
- Export to multiple formats

### Data Models

**Firm**
```typescript
interface Firm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}
```

**Client**
```typescript
interface Client {
  id: string;
  firmId: string;
  name: string;
  businessType: string;
  email?: string;
  phone?: string;
  businessNumber?: string;
}
```

**Period**
```typescript
interface Period {
  id: string;
  clientId: string;
  fiscalYear: number;
  periodType: 'annual' | 'quarterly' | 'semi-annual' | 'monthly' | 'custom';
  startDate: Date;
  endDate: Date;
}
```

**Document**
```typescript
interface Document {
  id: string;
  periodId: string;
  filename: string;
  hash: string;
  uploadedAt: Date;
  status: 'uploaded' | 'read' | 'unreadable' | 'processed' | 'duplicate';
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
  documentIds: string[];
  reason: string;
  systemSuggestion: string;
  confidence: number;
  evidence: string[];
  groupId?: string;
  status: 'pending' | 'resolved' | 'waiting_accountant';
  resolution?: {
    category: string;
    decidedAt: Date;
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
  status: 'sent' | 'answered' | 'applied';
  response?: {
    answer: string;
    answeredAt: Date;
  };
}
```

---

## End of Design v1

This is the first clean version of Meridian.
Focus: Simple workflow, clear responsibility per screen, minimal technical noise.

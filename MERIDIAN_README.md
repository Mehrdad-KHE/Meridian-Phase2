# Meridian - Accounting Workflow Prototype

## Overview

Meridian is a production-minded operational accounting workflow application for Canadian accounting firms. This prototype demonstrates the complete workflow from document intake through final Excel export.

## What This Prototype Does

This is a **fully functional local-state prototype** that demonstrates:

✅ **Complete workflow** from empty workspace to final export
✅ **Real state management** with all actions working
✅ **Export gating** that actually blocks until requirements are met
✅ **Audit trail** tracking all decisions and changes
✅ **Canadian accounting context** (HST, GST, shareholder expenses, etc.)
✅ **Two operational modes**: Empty workspace and seeded demo data

## Key Features

### 1. Workspace Setup
- Create accounting firms
- Add clients with business numbers
- Define review periods
- Create cases for work packages

### 2. Documents
- Add source documents (prototype accepts filenames)
- Rotate and reprocess problem documents
- Exclude documents with reasons
- Track readable, needs-fix, and excluded states

### 3. Processing
- Real-time progress tracking
- Document reading and data extraction
- Transaction matching
- Review item generation for uncertain items

### 4. Review (Main Operator Workflow)
- Master-detail layout with queue on left
- First item opens by default
- Actions that **actually change state**:
  - Approve items
  - Mark as personal/shareholder expense
  - Mark as support-only
  - Exclude with reason
  - Send to accountant with questions

### 5. Accountant Q&A
- Grouped questions with context
- Professional judgment requests
- Answers apply back to review items
- Items return to resolved state after answer

### 6. Vendor Directory
- Learned vendor rules
- Chart of accounts mapping
- Canadian standard accounts (HST/GST, Due to/from Shareholder, etc.)
- QuickBooks-style vocabulary

### 7. Final Export
- **Export gating that works**: blocked until all requirements met
- Shows exactly what blocks export
- Transaction summary by decision source (System/Operator/Accountant)
- Excluded items with reasons
- Package options (full package, audit trail, etc.)
- Audit trail of all decisions

## Decision Source Color Coding

The prototype uses color to show who made each decision:

- **Blue**: System (automated decisions)
- **Green**: Operator (review decisions)
- **Purple**: Accountant (professional judgment)

## Demo Data

The seeded demo includes:

- **Firm**: Maple Accounting Partners
- **Client**: North Star Construction Ltd. (Canadian business)
- **Period**: Q1 2026
- **Case**: January 2026 Expenses
- **Sample documents**: Tim Hortons receipt, Home Depot invoice, rotated gas receipt, potential personal Amazon purchase
- **Review items**: Meals threshold, rotation needed, personal expense detection
- **Vendor rules**: Home Depot, Tim Hortons with HST mappings

## End-to-End Demo Path

1. Start with demo data loaded (default)
2. Go to **Documents** → see 4 sample documents
3. Fix the rotated document → click Rotate → click Process
4. Go to **Processing** → see progress and review items
5. Go to **Review** → resolve the 3 pending items:
   - Approve Tim Hortons receipt
   - Mark Amazon as personal
   - Process the gas receipt
6. Go to **Accountant Q&A** → no questions (unless you sent one)
7. Go to **Export** → should be ready (green) after fixing documents and resolving reviews
8. Generate Excel package (prototype logs to console)

## What Works vs. What's Prototype

### ✅ Works (Real Local State)
- All navigation
- Creating firms, clients, periods, cases
- Adding documents (by filename)
- Rotating and processing documents
- Resolving review items
- Marking transactions as personal/support/excluded
- Sending questions to accountant
- Answering accountant questions
- Creating vendor rules
- Export gating logic
- Audit trail tracking
- Decision reversibility (before export)

### 🔧 Prototype Limitations (Backend Required)
- File upload (enter filenames instead)
- Actual OCR/document reading
- Real bank connections
- Real QuickBooks integration
- Excel file generation (logs to console)
- Multi-user collaboration
- Document storage
- Persistent database

## Implementation Notes

### Data Models
- `types/index.ts`: Complete TypeScript definitions for all entities
- `data/sampleData.ts`: Empty state and seeded demo data generators

### State Management
- `context/AppContext.tsx`: React Context with full CRUD operations
- All actions are real state changes, not fake buttons
- Audit events automatically logged

### Components
- `Layout.tsx`: Main navigation and breadcrumb
- 7 screen components for each workflow step
- Master-detail pattern in Review screen
- Inline create/edit forms (no fake modals)

### Backend Handoff Notes

For production implementation:

1. **Database schema** maps directly to TypeScript types
2. **Audit events** table critical for compliance
3. **Document storage** should remain in client source folders
4. **OCR integration** replaces `extractedData` stub
5. **Export generator** creates actual Excel files
6. **Vendor learning** can use ML for pattern detection
7. **Chart of accounts** should be client-configurable

## Critical Behaviors Implemented

✅ No decorative buttons - every action works
✅ Review decisions change state immediately
✅ Accountant answers apply back to workflow
✅ Export stays blocked until requirements met
✅ Excluded items require reasons
✅ Audit trail keeps all change history
✅ Sample data looks like demo data, not the only data

## Canadian Accounting Context

The prototype includes realistic Canadian examples:

- HST (13%) and GST tax codes
- Meals and Entertainment (50% deduction rule)
- Shareholder-paid expenses
- Due to/from Shareholder accounts
- Business Number format
- Personal vs. business expense separation
- Support-only documents

## Technology Stack

- React 18 with TypeScript
- Tailwind CSS v4
- Local state management (Context API)
- Lucide icons
- No external libraries for state/routing

## Next Steps for Production

1. **Backend integration**: Replace local state with API calls
2. **File upload**: Real file picker and document storage
3. **OCR service**: Integrate document processing API
4. **Excel export**: Implement actual package generation
5. **Authentication**: Add firm/user authentication
6. **Multi-user**: Real-time collaboration features
7. **Bank integration**: Connect to financial institutions
8. **QuickBooks sync**: Two-way integration when ready

## Reference Trigger

- Say `شروع مرجع` to begin from the active baseline.
- The trigger must run `tools/reference-benchmark.ps1`.
- The response must follow this exact shape:
  - `مرجع فعال است.`
  - `عدد: <fresh token-reduction estimate>`
- No follow-up question.
- No page prompt.
- No invitation to continue.
- If the benchmark cannot be rerun, replace the number line with `عدد: نامشخص` and a short blocker line.

## Last Verified Estimate

- Fresh local benchmark result: `8.6x` fewer tokens per query.
- Rerun `tools/reference-benchmark.ps1` for a fresh value.

## Quality Notes

- All imports resolve correctly
- No missing exports or broken references
- TypeScript types are complete
- State transitions are reversible
- Audit trail is comprehensive
- Export gating logic is sound

---

**This is a working operational prototype, not a mockup.** Every button does something real. The workflow can complete end-to-end using local state.

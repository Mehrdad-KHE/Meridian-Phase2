# Meridian — Final Design Documentation Package

**Version**: v3 Final  
**Date**: 2026-05-12  
**Status**: ✅ COMPLETE — Ready for Implementation  

---

## Product Purpose

### What is Meridian?

Meridian is a **local-first accounting workflow assistant** designed to help small business owners and accountants prepare expense documents for accounting and tax purposes.

**Core Value Proposition**:
- Reduces manual document review from 100% to ~5-10% (exception-based)
- Supports iterative correction workflow (not a one-way wizard)
- Works entirely in the browser (no server, no accounts, no cloud sync)
- Preserves user decisions when changes are made (incremental reprocessing)

### Who Uses Meridian?

**Primary Users**:
1. **Small business owners** — Self-employed, contractors, sole proprietors
2. **Bookkeepers** — Managing documents for multiple clients
3. **Accountants** — Preparing client documents for tax season

**User Pain Points Meridian Solves**:
- Manual review of every single receipt/invoice is tedious
- Losing progress when documents need to be re-uploaded
- Unclear which documents need attention vs which are fine
- Exporting to QuickBooks or accountant is manual and error-prone
- Going back to fix mistakes requires starting over (in traditional tools)

### Key Differentiators

1. **Correction Loop Model** — Not a one-way wizard, can return to any stage
2. **Exception-Based Review** — Only shows documents needing decisions
3. **Incremental Reprocessing** — Only reprocess changed items, preserve rest
4. **Local-First** — No server, no accounts, complete privacy
5. **Evidence-Driven** — Shows why system made suggestions (confidence, reasoning)

---

## User Journey

### First-Time User Journey

```
1. Open Meridian in browser
   ↓
2. See Opening/Welcome Screen
   - Explains what Meridian does (brief tagline)
   - "Start New Engagement" button prominent
   ↓
3. Select/Add Firm
   - Choose existing accountant or add new
   ↓
4. Select/Add Client
   - Choose existing client or add new
   ↓
5. Select Period
   - Annual, Quarterly, Monthly, or Custom
   ↓
6. Upload Documents
   - Drag-and-drop receipts, invoices, expense documents
   - See status: Read, Needs Fix, Duplicate
   ↓
7. Process Documents
   - Wait while system reads documents (OCR)
   - Extracts vendor, date, amount, category
   - Auto-classifies routine documents
   ↓
8. Review Exceptions
   - Only 6 documents need attention (out of 100)
   - See grouped items (e.g., "8 fuel receipts from same vendor")
   - View evidence (confidence, reasoning, data extracted)
   - Make decisions: Accept, Change Category, Ask Accountant, Exclude
   ↓
9. Accountant Q&A (if needed)
   - Send question to accountant with related documents
   - Wait for answer
   - Return to Review with accountant's guidance (evidence)
   ↓
10. Export
    - Export status: Ready to Export
    - Choose format: Accountant Review Package, QuickBooks CSV, Generic CSV
    - Download package
    ↓
11. Done!
    - Can return to any stage if changes needed later
    - Can add more documents and reprocess
```

### Returning User Journey (Correction Loop)

```
User exported package yesterday, but needs to add 3 more receipts today:

1. Open Meridian
   ↓
2. Opening/Welcome Screen shows recent engagement
   - Click "Botax Accounting → Babak → 2025 Annual" engagement
   ↓
3. Lands on Export screen (last visited)
   - Sees "Ready to Export" status
   ↓
4. Click "Documents" in sidebar (always accessible)
   ↓
5. Upload 3 new receipts
   ↓
6. Click "Processing" (or auto-triggers)
   - Processing shows "Processing 3 new documents"
   - Preserves previous 100 documents (no reprocessing)
   ↓
7. Review shows only 1 new exception (if any)
   - Make decision on new item
   ↓
8. Export status now "Needs Update"
   - Download updated package
   ↓
9. Done!
   - New export includes all 103 documents
```

---

## Screen Responsibilities

### 1. Opening/Welcome Screen
**Job**: Launch point, engagement selection  
**Shows**: Meridian logo/tagline, "Start New Engagement" button, recent engagements list  
**User Does**: Start new engagement or resume existing one  

### 2-4. Setup Screens (Firm, Client, Period)
**Job**: Define engagement scope  
**Shows**: Dropdowns/forms for firm, client, period selection  
**User Does**: Select or add firm → client → period  

### 5. Documents Screen
**Job**: Document upload and status tracking  
**Shows**: Upload area, document list with status tabs  
**User Does**: Upload documents, filter by status, continue to processing  

### 6. Processing Screen
**Job**: OCR and classification processing  
**Shows**: Progress bar, current step, summary statistics  
**User Does**: Wait for processing to complete, review summary  

### 7. Review Screen
**Job**: Exception-based decision-making  
**Shows**: Grouped review items, evidence panels, decision buttons  
**User Does**: Review exceptions, make decisions, ask accountant if needed  

### 8. Export Screen
**Job**: Package generation and download  
**Shows**: Export readiness status, format options, download buttons  
**User Does**: Download export package in chosen format  

### 9-14. Accounting Setup Screens
**Job**: Business configuration (vendors, codes, mappings)  
**Shows**: Vendor rules, GIFI codes, category mappings, export columns  
**User Does**: Configure business-specific settings, save templates  

### 15. Export Configuration Screen
**Job**: Customize export columns and templates  
**Shows**: Column checkboxes, drag-to-reorder, template management  
**User Does**: Select columns, reorder, save as template  

### 16. Accountant Q&A Screen
**Job**: Send questions to accountant, receive answers  
**Shows**: Question list with statuses, answer panels  
**User Does**: Review questions, read answers, return to Review with evidence  

### 17. System/Advanced Screen
**Job**: Technical admin tools (NOT business config)  
**Shows**: Backup/restore, OCR settings, diagnostics, version info  
**User Does**: Backup engagement, restore from backup, view system info  

### 18. Help Screen
**Job**: Product documentation and guidance  
**Shows**: 12 help section titles (placeholder content in MVP)  
**User Does**: Read help content, search for answers (future)  

---

## Correction Loop Explained

### What is the Correction Loop?

Traditional accounting document tools are **one-way wizards**:
```
Upload → Process → Review → Export → DONE (locked)
```

Meridian is a **correction loop**:
```
Upload → Process → Review → Export
  ↑←←←←←←←←←←←←←←←←←←←←←←←←←┘
  (can return to any stage, add/edit, reprocess)
```

### Why the Correction Loop Matters

**Real-World Scenarios**:
1. **User forgets documents**: Can add more after processing without starting over
2. **Accountant requests changes**: Can go back to Review, change decisions, re-export
3. **Better scan becomes available**: Can replace document and reprocess only that one
4. **Vendor rule changes**: Can change rule, reprocess affected documents automatically
5. **User makes mistake**: Can undo decision and redo without losing other work

### How Incremental Reprocessing Works

**Key Principle**: Only reprocess what changed, preserve everything else.

**Example**:
- User has 100 documents processed
- User uploads 3 new documents
- System processes only the 3 new documents (not all 103)
- Existing 100 documents and decisions preserved
- Export includes all 103 documents

**Change Detection**:
- Document added/replaced: Reprocess that document
- Category mapping changed: Reprocess affected documents
- Vendor rule changed: Reprocess documents matching rule
- Decision changed: Update decision, no reprocessing needed (unless user requests)

### Export Reactivity

Export status updates automatically when changes detected:

**Three States**:
1. **Ready to Export** — All review items resolved, no changes detected
2. **Needs Attention** — Unresolved review items exist, must resolve before export
3. **Needs Update** — Changes made that affect export (new documents, changed decisions)

**User Actions**:
- **Ready**: Download export package
- **Needs Attention**: Go to Review, resolve items, then export
- **Needs Update**: Acknowledge changes, download updated export (or download draft first)

---

## Roadmap Behavior

### Visual Design

**Pattern**: Connected rectangular blocks with subtle connector bars

**7 Stages**: Home → Setup → Documents → Processing → Review → Q&A → Export

**States**:
- **Completed** (Green): Clickable, returns to that stage
- **Current** (Blue): Emphasized (larger, glowing), not clickable
- **Accessible** (Dark Gray): Clickable, available when prerequisites met
- **Locked** (Very Dark): Not clickable, tooltip explains why

**Badge**: Amber circle on Review stage shows count of items needing attention

### State Logic

- Stages before current: **Completed** (clickable)
- Current stage: **Current** (emphasized, not clickable)
- Next available stage: **Accessible** (clickable when ready)
- Future stages: **Locked** (not clickable, tooltip)

**Example**: On Documents screen:
- Home: Completed (can click to go back)
- Setup: Completed (can click to change firm/client/period)
- Documents: Current (you are here)
- Processing: Locked (upload documents first)
- Review: Locked (process documents first)
- Q&A: Locked (complete review first)
- Export: Locked (resolve review items first)

### Interaction

**Click Behavior**:
- **Completed stages**: Navigate to that stage, preserve current work
- **Current stage**: No action (already here)
- **Accessible stages**: Navigate forward to next step
- **Locked stages**: Show tooltip explaining unlock condition

**Hover Behavior**:
- **Completed**: Darken slightly, cursor pointer
- **Current**: No change, cursor default
- **Accessible**: Lighten slightly, cursor pointer
- **Locked**: No change, cursor not-allowed, tooltip after 500ms

---

## Help Structure

### 12 Help Sections (Placeholder in MVP)

1. **Getting Started** — Onboarding, first-time setup
2. **Workflow Guide** — Correction loop, bidirectional navigation
3. **Engagement Setup Guide** — Firm, Client, Period selection
4. **Documents & Upload Guide** — File types, statuses, filtering
5. **OCR / Document Reading Guide** — How OCR works, troubleshooting
6. **Review & Decisions Guide** — Exception-based review, evidence, decisions
7. **Accountant Q&A Guide** — When to ask, how answers are used
8. **Export Package Guide** — Formats, customization, downloading
9. **Backup / Restore Guide** — Data safety, export/import engagements
10. **Troubleshooting** — Common problems, error messages, solutions
11. **Accounting Terminology** — Chart of Accounts, GIFI, categories, etc.
12. **GIFI / Accounting Codes Guide** — Canadian tax reporting codes

**MVP Behavior**:
- Help accessible from sidebar
- Shows 12 section titles
- Clicking section shows placeholder: "Content coming soon"
- Actual content written in Phase 2 (post-MVP)

---

## Export Behavior

### Export Readiness States

#### 1. Ready to Export (Green)
**Condition**: All review items resolved, no changes detected  
**User Sees**: Green success banner "Ready to Export"  
**Available Actions**:
- Download Accountant Review Package (Excel)
- Download QuickBooks-Compatible CSV
- Download Generic CSV Export

#### 2. Needs Attention (Amber)
**Condition**: Unresolved review items exist  
**User Sees**: Amber warning banner "Needs Attention"  
**Available Actions**:
- "Go to Review to resolve items" (navigates to Review)
- "Download Draft Review Package" (download even with blockers)

**Blockers Shown**: List of what's blocking export (e.g., "3 unresolved review items")

#### 3. Needs Update (Blue)
**Condition**: Changes made after previous export (new documents, changed decisions, changed rules)  
**User Sees**: Blue info banner "Needs Update"  
**Available Actions**:
- "Reprocess" (if changes require reprocessing)
- "Download Updated Package" (acknowledge changes, download new export)

**Changes Shown**: List of what changed (e.g., "3 new documents added", "1 category changed")

### Export Package Formats

#### Accountant Review Package (Excel)
**Contents**:
- Summary sheet (totals by category, date range, statistics)
- Document index (all documents with metadata)
- Review decisions (what user decided for each exception)
- Evidence log (confidence scores, reasoning for system suggestions)
- Q&A transcript (questions and answers, if any)

**Purpose**: Send to accountant for final review before filing

#### QuickBooks-Compatible CSV
**Contents**:
- QuickBooks-formatted columns (Date, Vendor, Amount, Account, Memo)
- Ready to import into QuickBooks Desktop or Online
- Includes GIFI codes if mapped

**Purpose**: Direct import into QuickBooks

#### Generic CSV Export
**Contents**:
- Standard accounting columns (configurable)
- Universal format for any accounting software

**Purpose**: Flexibility for non-QuickBooks users

### Export Configuration

**Customization**:
- Choose which columns to include (16 available)
- Reorder columns (drag-and-drop)
- Save as template for reuse
- Load saved templates

**Templates**:
- Default Template (all columns)
- QuickBooks Template (QuickBooks-specific columns)
- Minimal Template (date, vendor, amount, category only)
- Custom Templates (user-defined)

---

## Implementation Boundaries

### What's In Scope (Must Implement)

1. ✅ All 18 screens (core workflow + configuration)
2. ✅ Workflow roadmap component
3. ✅ Sidebar navigation (always visible)
4. ✅ Correction loop behavior (bidirectional navigation)
5. ✅ Export state management (Ready/Needs Attention/Needs Update)
6. ✅ IndexedDB storage for local-first data
7. ✅ Document upload and status tracking
8. ✅ Help placeholder screen (12 section titles, no content)
9. ✅ Accounting Setup screens (Vendor Rules, GIFI, mappings)
10. ✅ Dark Meridian theme throughout

### What's Out of Scope (Do NOT Implement)

1. ❌ Cloud sync or server-side storage
2. ❌ User authentication or accounts
3. ❌ Multi-user collaboration
4. ❌ Mobile native apps
5. ❌ AI/ML model training
6. ❌ Real-time accountant messaging
7. ❌ Payment processing
8. ❌ Analytics tracking
9. ❌ Automated tax filing
10. ❌ Bank account integration

### Stubs Acceptable (If No Existing Engine)

If OCR or processing engines don't exist yet:
- Use mock data for Processing results
- Use placeholder functions with TODO comments
- Show processing progress (even if instant)
- Mark areas for future engine integration

**DO NOT** build full OCR/ML engines from scratch — that's beyond scope.

---

## Design Quality Summary

### Strengths

1. **Clear Workflow** — Correction loop is well-defined, logical progression
2. **Exception-Based Efficiency** — Focuses user on what matters (5-10% of documents)
3. **Bidirectional Navigation** — User never trapped, can always go back
4. **Incremental Reprocessing** — Preserves work when changes made
5. **Evidence-Driven Decisions** — Shows why, not just what
6. **Comprehensive Help Structure** — 12 sections cover all areas
7. **Professional Appearance** — Dark theme, clean, suitable for accounting domain
8. **Flexible Export** — Multiple formats, customizable columns

### Areas for Future Enhancement

1. **Help Content** — Placeholder in MVP, needs writing in Phase 2
2. **Search Functionality** — Help search, document search (future)
3. **Keyboard Shortcuts** — Power user efficiency (future)
4. **Batch Operations** — Select multiple documents, bulk actions (future)
5. **Advanced Templates** — More export templates, rule templates (future)
6. **Performance Optimization** — Large document sets (>500 docs) may need optimization

---

## Success Criteria

### MVP is successful if:

1. ✅ User can create engagement and upload documents
2. ✅ Documents process (even if stub/mock)
3. ✅ User can review exceptions and make decisions
4. ✅ User can export package in multiple formats
5. ✅ User can return to Documents and add more (correction loop works)
6. ✅ Export status updates when changes made
7. ✅ Roadmap shows progress and allows navigation
8. ✅ Help structure in place (even if placeholder content)
9. ✅ Data persists in IndexedDB (doesn't lose work on refresh)
10. ✅ Dark theme applied consistently across all screens

### Post-MVP is successful if:

1. ⏳ Help content populated for all 12 sections
2. ⏳ OCR engine integrated (if not in MVP)
3. ⏳ Advanced features (GIFI, export config) fully functional
4. ⏳ Performance optimizations for large document sets
5. ⏳ User testing validates correction loop value proposition

---

## Timeline Estimate

### MVP (Priority 1 + 2)
- **Core Workflow**: 2-3 weeks
- **Configuration Screens**: 1-2 weeks
- **Help Placeholder**: 1-2 days
- **Polish & Testing**: 1 week
- **Total MVP**: 5-8 weeks

### Post-MVP (Priority 3)
- **Advanced Features**: 2-3 weeks
- **Help Content**: 1-2 weeks
- **Enhancements**: 2-3 weeks
- **Total Post-MVP**: 5-8 weeks

**Full Product**: 10-16 weeks (2.5-4 months)

---

## Final Status

**Design Phase**: ✅ COMPLETE  
**Expert Review**: ✅ APPROVED  
**Implementation Handoff**: ✅ FINALIZED  
**Ready for Development**: ✅ YES  

**Approval Date**: 2026-05-12  
**Approved By**: Senior Product Designer  

**Next Steps**:
1. Hand off to Codex for implementation
2. Begin Phase 1 (Core Workflow) development
3. Set up IndexedDB schema
4. Implement workflow roadmap component
5. Build out screen-by-screen per priority order

---

**File Status**: ✅ FINAL — Complete design documentation package

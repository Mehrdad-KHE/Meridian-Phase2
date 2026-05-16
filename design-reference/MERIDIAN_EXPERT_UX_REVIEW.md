# Meridian — Expert UX Review (Final)

**Reviewer Role**: Senior Product Designer  
**Review Date**: 2026-05-12  
**Design Version**: v2 Final + Correction Loop  

---

## Executive Summary

**Overall Assessment**: ✅ **APPROVED FOR IMPLEMENTATION**

The Meridian design is **solid, well-structured, and implementation-ready** with minor clarifications needed. The correction loop model is clear, the workflow is logical, and the exception-based review approach is sound.

**Readiness Score**: 8.5/10

---

## 1. UX Problems, Inconsistencies, or Risks

### ✅ No Major Problems Found

The design has no critical UX problems that would block implementation.

### ⚠️ Minor Risks Identified

#### Risk 1: Initial Empty State Guidance
**Issue**: When a user first opens Meridian with no prior engagements, the path forward may not be immediately obvious.

**Impact**: Low — Users will likely figure it out, but first-run experience could be smoother.

**Recommendation**: 
- Opening/Welcome Screen should have a clear "Start New Engagement" button prominently placed
- Consider a very brief (1-2 sentence) tagline explaining what Meridian does
- First engagement should feel guided, not intimidating

**Status**: Design mentions this in MERIDIAN_ADDITIONAL_WIREFRAMES.md, so this is already covered.

#### Risk 2: Export "Needs Update" vs "Needs Attention" Clarity
**Issue**: Export has three states (Ready, Needs Attention, Needs Update). The difference between "Needs Attention" and "Needs Update" may not be immediately clear to users.

**Impact**: Low-Medium — Could cause confusion about what action to take.

**Recommendation**: 
- "Needs Attention" = Unresolved review items (user must act)
- "Needs Update" = Changes made that affect export (reprocess available)
- Ensure messaging clearly explains the difference and what to do

**Status**: Design specifies this distinction. Recommend clear in-app messaging when showing these states.

#### Risk 3: Reprocessing Scope Ambiguity
**Issue**: When user adds new documents after Review, it's clear those new documents get processed. But if user changes a *vendor rule* or *category mapping*, which documents reprocess?

**Impact**: Medium — Users need to understand scope of reprocessing.

**Recommendation**: 
- When vendor rule changes: Show "X documents affected" before reprocessing
- When category mapping changes: Show affected documents
- Provide preview of what will be reprocessed before user commits

**Status**: Design implies this but doesn't explicitly specify. Add to implementation notes.

#### Risk 4: "Accountant Q&A" vs "Ask Accountant" Button Naming
**Issue**: The Review screen has an "Ask Accountant" button, and there's a separate "Accountant Q&A" screen. Could this naming cause confusion?

**Impact**: Low — Naming is consistent enough.

**Recommendation**: Keep as-is. "Ask Accountant" (action) vs "Accountant Q&A" (screen) is clear in context.

**Status**: No action needed.

---

## 2. Is the Workflow Too Complex Anywhere?

### ✅ Overall Workflow Complexity: APPROPRIATE

The correction loop is inherently more complex than a one-way wizard, but this complexity is **necessary** and well-managed.

### Areas Analyzed

#### Engagement Setup (Home → Firm → Client → Period)
**Complexity**: LOW  
**Assessment**: ✅ Simple three-step selection process. Clear progression.

#### Documents Upload
**Complexity**: LOW  
**Assessment**: ✅ Drag-and-drop + tabs for filtering. Standard pattern.

#### Processing
**Complexity**: LOW  
**Assessment**: ✅ Progress bar + status. User just waits. No decisions.

#### Review (Exception-Based)
**Complexity**: MEDIUM (appropriate)  
**Assessment**: ✅ This is the most complex screen, but appropriately so. Users see grouped exceptions, expand for evidence, make decisions. The complexity matches the task.

**Potential simplification**: Could offer a "Quick Accept All" mode for power users who trust the system, but this risks reducing quality. Recommend keeping as-is.

#### Accountant Q&A
**Complexity**: LOW  
**Assessment**: ✅ Simple list of questions with statuses. Clear actions.

#### Export
**Complexity**: LOW-MEDIUM  
**Assessment**: ✅ Three states (Ready/Needs Attention/Needs Update) are clear when properly messaged.

### Recommendation
**No simplification needed.** Complexity is appropriate for the task domain (accounting document preparation).

---

## 3. Are Any Screens Doing More Than One Job?

### Analysis by Screen

#### ✅ Home Screen
**Job**: Show recent engagements, start new engagement  
**Assessment**: Single clear purpose. ✓

#### ✅ Setup Screens (Firm, Client, Period)
**Jobs**: Each screen selects one thing  
**Assessment**: Single responsibility each. ✓

#### ✅ Documents Screen
**Jobs**: Upload documents, view document status, filter by state  
**Assessment**: Related jobs, all about document management. ✓

#### ✅ Processing Screen
**Jobs**: Show processing progress, display results  
**Assessment**: Single purpose (processing). ✓

#### ⚠️ Review Screen
**Jobs**: 
- Show grouped exceptions
- Show evidence for each exception
- Allow decision-making
- Allow "Ask Accountant" action
- Allow category changes
- Allow vendor changes
- Allow document exclusion
- Allow document replacement

**Assessment**: This screen does MANY things, but they are all **variations of the same core job: resolve exceptions**. This is appropriate.

**Recommendation**: Keep as-is. The multiple actions are all serving the single purpose of "resolve review items."

#### ✅ Accountant Q&A Screen
**Job**: Show questions sent to accountant, show answers received  
**Assessment**: Single purpose. ✓

#### ✅ Export Screen
**Jobs**: Show export readiness, allow export configuration, download package  
**Assessment**: All related to exporting. ✓

### Verdict
**No screens violate single-responsibility principle.** Review screen is complex but appropriately so.

---

## 4. Are Any Buttons, States, or Labels Unclear?

### Button Labels Reviewed

| Screen | Button | Clarity | Issue | Recommendation |
|--------|--------|---------|-------|----------------|
| Home | "Start New Engagement" | ✅ Clear | None | Keep |
| Setup | "Select Firm" | ✅ Clear | None | Keep |
| Setup | "Select Client" | ✅ Clear | None | Keep |
| Setup | "Continue to Documents" | ✅ Clear | None | Keep |
| Documents | "Select Files" | ✅ Clear | None | Keep |
| Documents | "Continue to Processing" | ✅ Clear | None | Keep |
| Processing | "Go to Review" | ✅ Clear | None | Keep |
| Review | "Accept Recommendation" | ✅ Clear | None | Keep |
| Review | "Change Category" | ✅ Clear | None | Keep |
| Review | "Ask Accountant" | ✅ Clear | None | Keep |
| Review | "Exclude from Accounting" | ✅ Clear | Could be "Exclude Document" for brevity | Optional refinement |
| Review | "Replace with Better Scan" | ✅ Clear | None | Keep |
| Review | "Continue to Export" | ✅ Clear | None | Keep |
| Q&A | "Return to Review" | ✅ Clear | None | Keep |
| Export | "Download Accountant Package" | ✅ Clear | None | Keep |
| Export | "Go to Review to resolve items" | ✅ Clear | None | Keep |

### State Labels Reviewed

| State | Label | Clarity | Issue | Recommendation |
|-------|-------|---------|-------|----------------|
| Document | "Read" | ✅ Clear | "Successfully Read" might be clearer | Optional: "Read Successfully" |
| Document | "Needs Fix" | ✅ Clear | None | Keep |
| Document | "Duplicate" | ✅ Clear | None | Keep |
| Document | "On Hold" | ✅ Clear | None | Keep |
| Document | "Excluded" | ✅ Clear | None | Keep |
| Review Item | "Resolved" | ✅ Clear | None | Keep |
| Review Item | "Waiting for Accountant" | ✅ Clear | None | Keep |
| Review Item | "Reopened" | ✅ Clear | None | Keep |
| Q&A | "Awaiting Answer" | ✅ Clear | Could be "Pending" | Keep — more explicit |
| Q&A | "Answer Available" | ⚠️ Slightly verbose | "Answered" is shorter | Recommend: "Answered" |
| Q&A | "Returned to Review" | ✅ Clear | None | Keep |
| Export | "Ready to Export" | ✅ Clear | None | Keep |
| Export | "Needs Attention" | ✅ Clear | Context explains it | Keep |
| Export | "Needs Update" | ✅ Clear | Context explains it | Keep |

### Recommendations
1. **Q&A State**: Change "Answer Available" to "Answered" (simpler)
2. **Document State**: Consider "Read Successfully" instead of "Read" (optional)
3. All other labels are clear and appropriate

---

## 5. Is the Correction Loop Clear Enough?

### ✅ YES — Correction Loop is Well-Defined

The design clearly specifies:

#### Bidirectional Navigation
- ✅ User can return to Documents at any time (sidebar always accessible)
- ✅ User can return to Review after Export
- ✅ User can edit decisions and reprocess

#### Incremental Reprocessing
- ✅ Only affected documents reprocessed, not all
- ✅ Unchanged work preserved
- ✅ Change tracking system defined

#### Export Reactivity
- ✅ Export status updates when changes detected
- ✅ Three states clearly defined (Ready/Needs Attention/Needs Update)
- ✅ User can download draft before resolving issues

#### Navigation Paths
- ✅ All return paths specified
- ✅ Sidebar provides quick access to key screens
- ✅ No "trapped" states

### Minor Clarification Needed

**Issue**: When user is on Export screen (Ready state) and then navigates back to Documents to add more files, what happens?

**Expected behavior** (implied but not explicitly stated):
1. User on Export (Ready)
2. User clicks Documents in sidebar
3. User uploads 3 new files
4. User clicks Processing (or system auto-triggers)
5. Processing screen shows "Processing 3 new documents"
6. After processing, Review shows only new exceptions (if any)
7. Export state becomes "Needs Update" (because new docs affect export)

**Recommendation**: Add explicit flow diagram for "Add Documents After Export" scenario in implementation notes.

### Verdict
**Correction loop is clear enough** with minor implementation clarification needed for edge cases.

---

## 6. Is the Roadmap / Chevron Workflow Clear Enough?

### Current Roadmap Design

Based on latest implementation (Concept 2 inspired):
- Connected rectangular blocks
- Small connecting bars between stages
- Icon + label inside each block
- State-based coloring (green completed, blue current, gray locked)
- Current block slightly larger with glow

### ✅ YES — Roadmap is Clear

The roadmap clearly communicates:
- ✅ Where user is (current stage emphasized)
- ✅ Where user has been (green completed stages)
- ✅ Where user can go (clickable vs locked)
- ✅ Progress through workflow (green trail)
- ✅ Forward direction (left-to-right)

### Strengths
1. **Visual hierarchy**: Current stage is unmistakable (larger, blue glow)
2. **Progress indication**: Green completed stages show achievement
3. **Clickability**: Completed stages are clickable (bidirectional navigation)
4. **Locked state**: Gray locked stages with tooltips explain why unavailable
5. **Badge support**: Review stage shows attention count when issues present

### Potential Improvements (Optional)
1. **Stage labels**: Consider abbreviations on mobile (e.g., "Docs" instead of "Documents")
2. **Connector thickness**: Current 3px bars are subtle — could go to 4px for stronger connection
3. **Hover feedback**: Clickable stages could show subtle animation on hover

### Verdict
**Roadmap is clear and effective.** No changes required, optional refinements available.

---

## 7. Is the Help / Documentation Structure Sufficient?

### Current Help Structure (12 Sections)

1. Getting Started
2. Workflow Guide
3. Engagement Setup Guide
4. Documents & Upload Guide
5. OCR / Document Reading Guide
6. Review & Decisions Guide
7. Accountant Q&A Guide
8. Export Package Guide
9. Backup / Restore Guide
10. Troubleshooting
11. Accounting Terminology
12. GIFI / Accounting Codes Guide

### ✅ YES — Help Structure is Comprehensive

This structure covers all major areas:
- ✅ Onboarding (Getting Started)
- ✅ Workflow understanding (Workflow Guide)
- ✅ Feature-specific help (each screen covered)
- ✅ Technical operations (Backup/Restore)
- ✅ Problem-solving (Troubleshooting)
- ✅ Domain knowledge (Accounting Terminology, GIFI)

### Recommended Additions (Optional)

#### 13. Keyboard Shortcuts (Future)
If keyboard shortcuts are implemented, add this section.

#### 14. Data Privacy & Security (Optional)
Brief section explaining:
- Data stored locally (IndexedDB)
- No cloud sync
- Backup recommendations
- What happens if browser data is cleared

#### 15. Integration Guide (Future)
If QuickBooks import/export becomes more sophisticated, add dedicated integration guide.

### Verdict
**Help structure is sufficient for MVP launch.** Optional additions can come in future releases.

---

## 8. Is Anything Missing Before Handoff to Codex?

### Critical Missing Items

#### ✅ All Critical Items Present

The design specifications include:
- ✅ Complete workflow model (correction loop)
- ✅ All screen wireframes
- ✅ State definitions
- ✅ Button labels and actions
- ✅ Navigation model
- ✅ Roadmap behavior
- ✅ Sidebar structure
- ✅ Help architecture
- ✅ Export behavior
- ✅ Incremental reprocessing logic
- ✅ Exception-based review approach

### Recommended Clarifications (Non-Blocking)

#### 1. Loading States
**Status**: Implied but not explicitly detailed  
**Recommendation**: Add explicit loading state specifications for:
- Document upload progress
- Processing progress (already specified)
- Export generation
- Q&A question submission

#### 2. Error States
**Status**: Partially specified  
**Recommendation**: Add explicit error state specifications for:
- Upload failures (file too large, unsupported format)
- OCR failures (unreadable document)
- Processing failures (system error)
- Export generation failures

#### 3. Empty States
**Status**: Partially specified  
**Recommendation**: Add explicit empty state specifications for:
- No documents uploaded yet
- No review items (everything auto-classified)
- No Q&A questions
- First-time user (no engagements)

#### 4. Confirmation Dialogs
**Status**: Not specified  
**Recommendation**: Specify when confirmation dialogs are needed:
- Exclude document from accounting (are you sure?)
- Delete engagement (are you sure?)
- Replace document with better scan (confirm replacement)

#### 5. Toast Notifications / Feedback
**Status**: Not specified  
**Recommendation**: Specify success/error feedback for actions:
- "Document uploaded successfully"
- "Category changed"
- "Question sent to accountant"
- "Export package downloaded"

#### 6. GIFI Code Interaction Details
**Status**: High-level specified in MERIDIAN_ADDITIONAL_WIREFRAMES.md  
**Recommendation**: Clarify:
- How user searches for GIFI codes
- How user assigns GIFI codes to categories
- How standard vs custom codes are differentiated
- What happens if user enters invalid GIFI code

#### 7. Vendor Rules Pattern Matching
**Status**: Mentioned but not detailed  
**Recommendation**: Clarify:
- What pattern types are supported (exact, contains, starts with, regex)
- How user tests a pattern before saving
- What happens if multiple rules match same vendor
- Rule priority system

#### 8. Keyboard Navigation
**Status**: Not specified  
**Recommendation**: Specify:
- Tab order through screens
- Keyboard shortcuts (if any)
- Focus management
- Enter key behavior

### Verdict
**Design is complete enough for implementation**, but adding the 8 clarifications above would reduce implementation ambiguity and rework.

---

## Final Recommendations

### Must-Have Before Implementation
1. ✅ None — design is ready

### Should-Have (Reduce Ambiguity)
1. **Loading, Error, and Empty States**: Add explicit specifications
2. **Confirmation Dialogs**: Define when confirmations are needed
3. **Toast Notifications**: Specify user feedback for actions
4. **GIFI Code Interaction**: Add detailed interaction model
5. **Vendor Rules Details**: Clarify pattern matching behavior

### Nice-to-Have (Can Come Later)
1. Keyboard navigation specification
2. Mobile responsive behavior details
3. Print-friendly export preview
4. Batch operations (select multiple documents)

---

## Design Quality Assessment

| Criterion | Score | Notes |
|-----------|-------|-------|
| **Workflow Clarity** | 9/10 | Correction loop well-defined, minor edge cases need clarification |
| **Screen Purpose** | 10/10 | Each screen has clear responsibility |
| **State Management** | 8/10 | States clear, but loading/error states need more detail |
| **Navigation Model** | 9/10 | Bidirectional navigation clear, sidebar always accessible |
| **Button Labels** | 9/10 | Clear and action-oriented, minor label refinements suggested |
| **Visual Hierarchy** | 9/10 | Roadmap clear, current stage emphasized |
| **Exception Handling** | 7/10 | Error states and edge cases need more specification |
| **Help Structure** | 9/10 | Comprehensive, covers all major areas |
| **Correction Loop** | 9/10 | Well-defined, incremental reprocessing clear |
| **Implementation Readiness** | 8.5/10 | Ready, with recommended clarifications |

**Overall Score**: 8.8/10

---

## Approval Status

### ✅ APPROVED FOR IMPLEMENTATION

The Meridian design is **well-structured, thoughtfully designed, and ready for Codex implementation**.

### Recommended Actions Before Handoff

1. **High Priority**: Add loading/error/empty state specifications
2. **Medium Priority**: Define confirmation dialogs and toast notifications
3. **Low Priority**: Add keyboard navigation and GIFI interaction details

### Estimated Risk Level

**LOW** — Design is solid. Recommended clarifications will reduce implementation questions but are not blockers.

---

## Summary for Stakeholders

**Meridian is ready for implementation.** The correction loop model is sound, the workflow is logical, and the user experience is well-thought-out. Minor clarifications around edge cases, error states, and detailed interactions would further reduce implementation ambiguity, but the core design is complete and approved.

**Proceed to Codex handoff.**

---

**Review Completed**: 2026-05-12  
**Reviewer**: Senior Product Designer  
**Next Step**: Finalize deliverables and create Codex implementation handoff v3

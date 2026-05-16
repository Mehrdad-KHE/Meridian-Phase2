# Meridian Help & Documentation Architecture — Final

**Version**: v1 Final  
**Date**: 2026-05-12  
**Status**: ✅ APPROVED FOR IMPLEMENTATION  

---

## Overview

Meridian Help system provides comprehensive guidance for all product features, workflows, and domain concepts. Help is accessible via sidebar at all times.

**Help Design Principles**:
- **Task-oriented**: Organized by what user wants to accomplish
- **Progressive disclosure**: Start simple, provide depth when needed
- **Searchable**: Users can find answers quickly
- **Domain-aware**: Explains accounting concepts, not just software features
- **Screenshot-supported**: Visual aids for complex interactions (future enhancement)

---

## Help Structure (12 Main Sections)

### 1. Getting Started

**Purpose**: Onboarding new users, first-time setup guidance

**Topics**:
- What is Meridian?
- Who should use Meridian?
- System requirements (browser, storage)
- First engagement setup walkthrough
- Quick start checklist

**Target Audience**: New users, first-time users

**Depth**: Introductory

**Estimated Length**: 2-3 pages

---

### 2. Workflow Guide

**Purpose**: Explain the correction loop model, bidirectional workflow, incremental reprocessing

**Topics**:
- Understanding the correction loop
- Workflow stages overview (Home → Setup → Documents → Processing → Review → Q&A → Export)
- When to use each stage
- How to navigate between stages
- Going back to edit previous work
- Incremental reprocessing explained
- Export status reactivity

**Target Audience**: All users

**Depth**: Core concept — detailed explanation

**Estimated Length**: 4-5 pages

---

### 3. Engagement Setup Guide

**Purpose**: Guide users through Firm → Client → Period selection

**Topics**:
- What is an engagement?
- Selecting or adding a firm/accountant
- Selecting or adding a client
- Choosing accounting period (annual, quarterly, monthly, custom)
- Editing engagement details later
- Managing multiple engagements

**Target Audience**: All users

**Depth**: Feature guide — step-by-step

**Estimated Length**: 2-3 pages

---

### 4. Documents & Upload Guide

**Purpose**: Explain document upload, status tracking, filters

**Topics**:
- Supported file types (PDF, JPG, PNG)
- How to upload documents (drag-and-drop, file picker)
- Document status explained (Read, Needs Fix, Duplicate, On Hold, Excluded)
- Using tabs to filter documents
- Adding documents after processing
- Replacing documents with better scans
- Excluding documents from accounting

**Target Audience**: All users

**Depth**: Feature guide — step-by-step

**Estimated Length**: 3-4 pages

---

### 5. OCR / Document Reading Guide

**Purpose**: Explain how Meridian reads documents, what to do when OCR fails

**Topics**:
- How OCR (text extraction) works
- What Meridian looks for in documents (date, vendor, amount, category clues)
- Why some documents can't be read (poor quality, handwriting, non-standard formats)
- What "Needs Fix" means
- How to improve scan quality
- When to replace with better scan
- When to exclude unreadable documents

**Target Audience**: Users encountering OCR issues

**Depth**: Technical explanation — troubleshooting focus

**Estimated Length**: 3-4 pages

---

### 6. Review & Decisions Guide

**Purpose**: Explain exception-based review, grouped items, decision-making, evidence

**Topics**:
- What is exception-based review?
- Why only some documents appear in review (routine items auto-handled)
- Understanding grouped review items
- Reading evidence panels (confidence, reasoning, source data)
- Making decisions:
  - Accept recommendation
  - Change category
  - Ask accountant
  - Exclude from accounting
  - Replace with better scan
- Reopening decisions later
- How changes affect export

**Target Audience**: All users — critical workflow step

**Depth**: Core feature — detailed with examples

**Estimated Length**: 5-6 pages

---

### 7. Accountant Q&A Guide

**Purpose**: Explain when and how to ask accountant questions, how answers are used

**Topics**:
- When to ask your accountant
- How to send a question
- What information to include (related documents, specific question)
- Question statuses (Awaiting Answer, Answered, Returned to Review)
- How accountant answers are used (evidence only, not auto-applied)
- Returning to review with accountant's answer
- Canceling or editing questions

**Target Audience**: Users needing accountant guidance

**Depth**: Feature guide — workflow integration focus

**Estimated Length**: 2-3 pages

---

### 8. Export Package Guide

**Purpose**: Explain export readiness, package formats, customization

**Topics**:
- When export is ready
- Export status explained (Ready, Needs Attention, Needs Update)
- Export package formats:
  - Accountant Review Package (Excel summary + documents)
  - QuickBooks-Compatible CSV
  - Generic CSV Export
- Customizing export columns
- Saving export templates
- Downloading draft exports
- What happens after export (can still edit and re-export)

**Target Audience**: Users ready to export, accountants receiving packages

**Depth**: Feature guide — output focus

**Estimated Length**: 4-5 pages

---

### 9. Backup / Restore Guide

**Purpose**: Explain data backup, restoring engagements, data portability

**Topics**:
- Why backup is important (local-first = your responsibility)
- How to create engagement backup
- What's included in backup (documents, decisions, mappings, everything)
- How to restore engagement
- Exporting for archival
- Clearing browser data warning (what happens if data is cleared)
- Best practices for backup frequency

**Target Audience**: All users — data safety education

**Depth**: Technical guide — safety focus

**Estimated Length**: 2-3 pages

---

### 10. Troubleshooting

**Purpose**: Solve common problems, explain error messages, provide workarounds

**Topics**:
- Upload failures (file too large, unsupported format)
- OCR failures (unreadable documents)
- Processing errors (system errors)
- Export generation failures
- Browser compatibility issues
- Performance issues (slow processing, slow upload)
- "What to do if..." scenarios
- How to report bugs or get support

**Target Audience**: Users encountering problems

**Depth**: Problem-solving — practical solutions

**Estimated Length**: 4-5 pages

---

### 11. Accounting Terminology

**Purpose**: Explain accounting concepts, terms, and jargon used in Meridian

**Topics**:
- Common accounting terms:
  - Chart of Accounts
  - Category (expense category)
  - Vendor
  - Account Code
  - GIFI Code
  - Deductible vs Non-Deductible
  - Capital Asset vs Expense
  - T4A, T5018, HST/GST
- QuickBooks terminology mapping
- Canadian vs US terminology differences (if applicable)

**Target Audience**: Users unfamiliar with accounting

**Depth**: Educational — definitions and context

**Estimated Length**: 3-4 pages

---

### 12. GIFI / Accounting Codes Guide

**Purpose**: Explain GIFI codes (Canadian tax reporting), account code mapping, category-to-code assignments

**Topics**:
- What are GIFI codes? (General Index of Financial Information)
- Why GIFI codes matter (Canadian tax reporting)
- Standard GIFI codes vs custom codes
- Common GIFI code examples:
  - 8000 (Gross Revenue)
  - 8811 (Subcontracts)
  - 9060 (Office Expenses)
  - 9220 (Vehicle Expenses)
  - 8523 (Advertising and Promotion)
- Mapping categories to GIFI codes
- Mapping account codes to GIFI codes
- Using GIFI codes in exports
- When to add custom codes (rare)
- Viewing and editing GIFI mappings

**Target Audience**: Canadian users, accountants

**Depth**: Domain-specific — Canadian tax context

**Estimated Length**: 4-5 pages

---

## Help Navigation Structure

### Sidebar Navigation (Help Section)

```
┌─────────────────────────────────┐
│ 📘 Help & Documentation         │
├─────────────────────────────────┤
│ → Getting Started               │
│ → Workflow Guide                │
│ → Engagement Setup Guide        │
│ → Documents & Upload Guide      │
│ → OCR / Document Reading Guide  │
│ → Review & Decisions Guide      │
│ → Accountant Q&A Guide          │
│ → Export Package Guide          │
│ → Backup / Restore Guide        │
│ → Troubleshooting               │
│ → Accounting Terminology        │
│ → GIFI / Accounting Codes Guide │
└─────────────────────────────────┘
```

**Behavior**:
- Click section opens help content in main area
- Help screen has search bar at top (future enhancement)
- Help content scrollable in main panel
- Back button returns to previous screen or closes help

---

## Help Screen Wireframe

```
┌────────────────────────────────────────────────────────────┐
│ ≡  Help & Documentation                          [✕ Close] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 🔍 Search help...                                  │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  Selected: Review & Decisions Guide                       │
│  ─────────────────────────────────────────────────────    │
│                                                            │
│  ## What is Exception-Based Review?                       │
│                                                            │
│  Meridian only shows you documents that need your         │
│  attention. Routine documents that the system is          │
│  confident about are automatically categorized and        │
│  don't appear in Review.                                  │
│                                                            │
│  ### Why This Matters                                     │
│                                                            │
│  Instead of reviewing all 100 documents, you only review  │
│  the 6 documents that need decisions...                   │
│                                                            │
│  [Content continues, scrollable]                          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Content Writing Guidelines

### Tone
- **Professional but approachable**: Accounting software for real users, not just accountants
- **Clear and concise**: Short sentences, avoid jargon unless explained
- **Action-oriented**: Focus on what user can do, not abstract concepts
- **Helpful, not condescending**: Assume user is smart but may be new to accounting

### Structure
- **Headings**: Use clear, descriptive headings (H2, H3)
- **Bullet points**: For lists, steps, options
- **Examples**: Real-world examples wherever possible
- **Screenshots**: (Future enhancement) Show UI states, not just describe
- **Cross-links**: Link to related help sections when relevant

### Length
- **Keep sections focused**: 2-6 pages per section
- **Progressive disclosure**: Start with overview, then drill into details
- **Use subsections**: Break complex topics into digestible chunks

---

## Implementation Phases

### Phase 1 (MVP)
- ✅ Help structure defined
- ✅ 12 sections outlined
- ⏳ Help screen placeholder (shows section titles, "Content coming soon")
- ⏳ Help accessible from sidebar

### Phase 2 (Content Population)
- ⏳ Write actual help content for all 12 sections
- ⏳ Add real examples
- ⏳ Polish language and structure

### Phase 3 (Enhancements)
- ⏳ Add search functionality
- ⏳ Add screenshots/diagrams
- ⏳ Add video tutorials (optional)
- ⏳ Add contextual help (help button on each screen links to relevant section)

---

## Technical Implementation Notes

### Help Content Storage

**Option A: Markdown Files** (Recommended for MVP)
- Store each section as a markdown file
- Render markdown to HTML in Help screen
- Easy to update without code changes
- Simple for non-developers to edit

**Option B: React Components**
- Each help section is a React component
- Full control over interactive elements
- More complex to update (requires code changes)

**Recommendation**: Use Markdown for MVP (simple, maintainable)

### Help Screen Component

```tsx
<HelpScreen>
  <SearchBar /> {/* Phase 3 */}
  <SectionList>
    {sections.map(section => (
      <SectionLink 
        title={section.title} 
        onClick={() => setActiveSection(section.id)} 
      />
    ))}
  </SectionList>
  <ContentPanel>
    <MarkdownRenderer content={activeSectionContent} />
  </ContentPanel>
</HelpScreen>
```

### Search Implementation (Phase 3)

- Index all help content on app load
- Use client-side search (Fuse.js or similar)
- Highlight matches in results
- Jump to section with search term highlighted

---

## Acceptance Criteria

### Phase 1 (MVP) — Help Structure
1. ✅ Help accessible from sidebar
2. ✅ Help screen shows all 12 section titles
3. ✅ Clicking section shows placeholder "Content coming soon"
4. ✅ Close button returns to previous screen
5. ✅ Help screen is scrollable
6. ✅ Help screen matches Meridian dark theme

### Phase 2 — Help Content
1. ⏳ All 12 sections have complete content
2. ⏳ Content follows writing guidelines
3. ⏳ Examples included where appropriate
4. ⏳ Cross-links between sections work
5. ⏳ Content reviewed for accuracy

### Phase 3 — Enhancements
1. ⏳ Search bar functional
2. ⏳ Search returns relevant results
3. ⏳ Screenshots added to key sections
4. ⏳ Contextual help links from screens
5. ⏳ Help content kept up-to-date with product changes

---

## Future Enhancements (Post-MVP)

### Contextual Help
- Help button on each screen
- Opens relevant help section automatically
- Example: Help button on Review screen opens "Review & Decisions Guide"

### Interactive Tutorials
- Step-by-step walkthroughs for first-time users
- Highlight UI elements during tutorial
- "Show me how" for complex features

### Video Tutorials
- Short screencast videos explaining key features
- Embedded in help sections
- Especially useful for visual learners

### Community Support
- Link to community forum or support email
- User can ask questions not covered in help
- Feedback loop for improving help content

---

## Content Maintenance Plan

### Regular Updates
- Review help content when product features change
- Update screenshots when UI changes
- Add new sections for new features

### User Feedback
- Track which help sections are most viewed (analytics)
- Collect user feedback on help usefulness
- Identify gaps in help coverage

### Version Control
- Help content versioned alongside product
- Release notes reference help updates
- Major product changes trigger help content review

---

## Final Approval

**Help Architecture Status**: ✅ **APPROVED FOR IMPLEMENTATION**

**Approved By**: Senior Product Designer  
**Approval Date**: 2026-05-12

**Implementation Priority**: Medium (MVP = placeholder, Phase 2 = content)

**MVP Deliverable**: Help screen with 12 section titles, placeholder content

**Phase 2 Deliverable**: Complete help content for all 12 sections

---

**File Status**: ✅ FINAL — Ready for implementation

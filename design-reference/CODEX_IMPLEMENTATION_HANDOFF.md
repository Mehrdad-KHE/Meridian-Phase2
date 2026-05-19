# Meridian - Codex Implementation Handoff
**Implementation-Ready Specification for React + Tailwind CSS**

---

## Overview

Meridian is a **local-first accounting document management application**. This handoff provides exact specifications for implementing the approved design.

**Technology Stack:**
- React + TypeScript
- Tailwind CSS v4 (dark theme)
- React Router (navigation)
- IndexedDB (local storage)
- Tesseract.js (OCR - future integration)

**Design Philosophy:**
- Dark, calm, minimal, professional
- Accounting workflow assistant (not technical dashboard)
- Exception-based review (not full inspection)
- Evidence-driven decisions
- Status-driven navigation

---

## Screen List (Implementation Order)

Implement in this exact order:

0. **Home** - Welcome and engagement selection
1. **Engagement Setup - Firm** - Select or add accounting firm
2. **Engagement Setup - Client** - Select or add client
3. **Engagement Setup - Period** - Select fiscal year and period
4. **Documents** - Upload and manage documents
5. **Processing** - System processing status
6. **Review** - Resolve exceptions only
7. **Accountant Q&A** - Evidence from accountant
8. **Export** - Generate accountant package
9. **System / Advanced** - Technical settings only
10. **Help** - Reserved placeholder only

---

## Navigation Structure

### Sidebar Navigation (Fixed Left, 240px)

```
┌─────────────────────┐
│ MERIDIAN            │ ← Logo/Brand (#3B82F6)
├─────────────────────┤
│ Home                │ ← Always visible
├─────────────────────┤
│ Engagement Setup    │ ← Collapsed section
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
│ System / Advanced   │ ← Muted/separated
│ Help                │ ← Muted
└─────────────────────┘
```

**Navigation Rules:**
- Active item: blue text (#3B82F6) + blue left border (4px)
- Inactive item: gray text (#9CA3AF)
- Hover: lighter text (#F9FAFB) + blue background tint
- System/Advanced and Help: separate section, smaller, muted

### Context Bar (Top of Main Content, After Setup Complete)

```
┌────────────────────────────────────────────────────┐
│ Northpeak Accounting → Daniel Roberts → 2025 Annual │
└────────────────────────────────────────────────────┘
```

**Context Bar Rules:**
- Background: #1A1F28
- Blue left border: 4px #3B82F6
- Text: #D1D5DB
- Shows: Firm → Client → Period
- Only visible after Engagement Setup complete
- Persistent across all workflow screens

---

## Workflow Order (Strict Sequential)

```
START
  ↓
HOME (select or create engagement)
  ↓
ENGAGEMENT SETUP
  ├─ Step 1: Select Firm
  ├─ Step 2: Select Client (requires Step 1)
  └─ Step 3: Select Period (requires Step 2) → Continue to Documents
  ↓
DOCUMENTS (upload and manage)
  ↓
PROCESSING (system work, auto-proceeds to Review when done)
  ↓
REVIEW (exceptions only, user decisions)
  ↔─ ACCOUNTANT Q&A (if needed, returns to Review with answer)
  ↓
EXPORT (Ready: download package | Needs Attention: resolve blockers)
  ↓
END
```

**Sequential Rules:**
- Cannot skip steps
- Cannot proceed until current step complete
- Back button available where appropriate
- Processing auto-proceeds to Review when complete

---

## Screen-by-Screen Specifications

### 0. Home

**Route:** `/` or `/home`

**Responsibility:** Welcome screen and engagement selection

**Must Show:**
- `[Start New Engagement]` button (primary blue, prominent)
- Recent Engagements list (max 10)
- Each engagement card:
  - Client name (H3, 16px, weight 600)
  - Period (14px, #9CA3AF)
  - Status badge (color-coded, see status list below)
  - `[Continue]` button (for active) or `[View]` (for completed)
- `[View All]` button (secondary) if more than 10 engagements

**Must NOT Show:**
- Dashboards
- Counters (total docs, total clients, etc.)
- Charts or graphs
- Technical metrics
- Backup status
- OCR status

**Status Badge Options:**
- "Setup in progress" - #6B7280 (muted gray)
- "Review X items" - #F59E0B (warning amber)
- "Ready to export" - #10B981 (success green)
- "Exported" - #6B7280 (muted gray)
- "Processing..." - #3B82F6 (info blue)

**Button Actions:**
- `[Start New Engagement]` → Navigate to Engagement Setup - Firm
- `[Continue]` → Navigate to appropriate screen based on engagement state
- `[View]` → Navigate to read-only view (future feature, for now same as Continue)
- `[View All]` → Show full list modal or separate page

**Acceptance Criteria:**
- [ ] Primary action button is prominent and blue
- [ ] Engagement cards are simple (no clutter)
- [ ] Status badges are color-coded correctly
- [ ] No dashboard elements visible
- [ ] Clicking Start New navigates to Firm Setup

---

### 1. Engagement Setup - Firm

**Route:** `/engagement/firm`

**Responsibility:** Select or add accounting firm

**Must Show:**
- Screen label: `[ENGAGEMENT SETUP]` (#3B82F6 badge, top left)
- Instruction text: "Select a firm or add a new one" (#9CA3AF)
- List of existing firms (cards):
  - Firm name (H3, 16px, weight 600)
  - Location/address (14px, #9CA3AF)
  - `[Select Firm]` button (primary blue)
- `[Add New Firm]` button (secondary gray outline)

**Must NOT Show:**
- Context bar (not yet created)
- Back button (this is first step)
- Client or Period data

**Add New Firm Modal:**
- Fields:
  - Firm / Accountant Name * (required)
  - Email * (required)
  - Phone (optional)
  - Address (optional)
- Buttons:
  - `[Cancel]` (secondary)
  - `[Add Firm]` (primary blue)
- Required field indicator: red asterisk
- Validation: show error if required fields empty

**Button Actions:**
- `[Select Firm]` → Save selection, navigate to Client Setup
- `[Add New Firm]` → Open modal
- Modal `[Add Firm]` → Save new firm, navigate to Client Setup
- Modal `[Cancel]` → Close modal

**Button States:**
- `[Add Firm]` disabled if required fields empty
- Show inline error messages on validation failure

**Acceptance Criteria:**
- [ ] Engagement Setup label visible
- [ ] Firm cards display name and location
- [ ] Select Firm button navigates to Client
- [ ] Add New Firm modal opens
- [ ] Required fields validated
- [ ] New firm saved to IndexedDB
- [ ] No context bar visible yet

---

### 2. Engagement Setup - Client

**Route:** `/engagement/client`

**Responsibility:** Select or add client

**Must Show:**
- Screen label: `[ENGAGEMENT SETUP]` (#3B82F6 badge)
- Context bar (partial): Shows selected firm name only
- Instruction text: "Select a client or add a new one" (#9CA3AF)
- List of existing clients (cards):
  - Client name (H3)
  - Business type (14px, #9CA3AF)
  - `[Select Client]` button (primary blue)
- `[Add New Client]` button (secondary)
- `[Back]` button (secondary, bottom left)

**Must NOT Show:**
- Full context bar with Client → Period (not complete yet)

**Add New Client Modal:**
- Fields:
  - Client Name * (required)
  - Business Type * (dropdown, required)
    - Options: Sole Proprietor, Corporation, Partnership, LLC, Other
  - Email (optional)
  - Phone (optional)
  - Business Number (optional)
  - Collapsible: "Show Additional Fields" (for future expansion)
- Buttons:
  - `[Cancel]` (secondary)
  - `[Add Client]` (primary blue)

**Button Actions:**
- `[Select Client]` → Save selection, navigate to Period Setup
- `[Add New Client]` → Open modal
- Modal `[Add Client]` → Save new client, navigate to Period
- `[Back]` → Return to Firm Setup

**Acceptance Criteria:**
- [ ] Partial context bar shows firm name
- [ ] Client cards display name and business type
- [ ] Select Client navigates to Period
- [ ] Add New Client modal works
- [ ] Back button returns to Firm
- [ ] New client saved to IndexedDB

---

### 3. Engagement Setup - Period

**Route:** `/engagement/period`

**Responsibility:** Select fiscal year and accounting period

**Must Show:**
- Screen label: `[ENGAGEMENT SETUP]` (#3B82F6 badge)
- Context bar (partial): Firm → Client
- Instruction text: "Select the fiscal year and period" (#9CA3AF)
- Form fields:
  - Fiscal Year * (dropdown)
    - Options: 2024, 2025, 2026, 2027 (current year ±2)
    - Default: Previous year (if 2026, default to 2025)
  - Period Type * (dropdown)
    - Options: Annual / Full Year, Quarterly, Semi-Annual, Monthly, Custom Period
    - Default: Annual / Full Year
- Info box (darker background #0F1419):
  - Shows calculated period dates
  - Example: "Period: January 1, 2025 - December 31, 2025"
- Helper text:
  - "Period options:"
  - "• Annual / Full Year"
  - "• Quarterly (Q1, Q2, Q3, Q4)"
  - "• Semi-Annual (H1, H2)"
  - "• Monthly"
  - "• Custom Period"
- Buttons:
  - `[Back]` (secondary, bottom left)
  - `[Continue to Documents]` (primary blue, bottom right)

**Must NOT Show:**
- Document count
- Processing status

**Period Type Logic:**
- Annual: Jan 1 - Dec 31 of selected year
- Quarterly: Show Q1/Q2/Q3/Q4 selector, calculate dates
- Semi-Annual: Show H1/H2 selector
- Monthly: Show month selector
- Custom: Show start/end date pickers

**Button Actions:**
- `[Continue to Documents]` → Save period, navigate to Documents
- `[Back]` → Return to Client Setup

**Acceptance Criteria:**
- [ ] Context bar shows Firm → Client
- [ ] Fiscal year defaults to previous year
- [ ] Period type defaults to Annual
- [ ] Calculated period displays correctly
- [ ] Continue to Documents creates engagement
- [ ] Full context bar appears on next screen

---

### 4. Documents

**Route:** `/engagement/:id/documents`

**Responsibility:** Upload and manage documents

**Must Show:**
- Screen label: `[DOCUMENTS]` (#3B82F6 badge)
- Full context bar: Firm → Client → Period
- Buttons (top):
  - `[Upload Documents]` (primary blue)
  - `[Select Folder]` (secondary)
- Upload area:
  - Dashed border (#374151)
  - Background: #0F1419
  - Icon: 📄 (48px)
  - Text: "Drag and drop files here or click to browse"
- Status summary (after upload):
  - Three stat cards (#1A1F28 background)
  - Large numbers (#3B82F6, 28px, weight 600)
  - Labels (#9CA3AF, 13px)
  - "X uploaded" | "X read" | "X need attention"
- Tabs:
  - "Included (X)" (active: #3B82F6 underline)
  - "On Hold (X)" (#9CA3AF)
  - "Excluded (X)" (#9CA3AF)
- Document list (cards):
  - Status icon: ✓ (success) or ⚠ (warning)
  - Filename (14px, weight 600)
  - Status text (13px, #9CA3AF)
  - Action buttons: `[View]` `[Hold]` `[Exclude]` or `[Re-upload]` (if unreadable)
- `[Process Documents]` button (success green #10B981, prominent, bottom)

**Must NOT Show:**
- OCR worker status
- Technical processing details
- Review results before processing
- Export options

**Upload States:**
- Empty: Show upload area only
- Uploading: Show progress bar with "X of Y files"
- Current file name and "Reading document..."
- Uploaded: Show status summary + tabs + document list

**Document Status Options:**
- "Read successfully" (#10B981 checkmark)
- "Unreadable - blurry image" (#F59E0B warning)
- "Duplicate" (#6B7280 muted)

**Button Actions:**
- `[Upload Documents]` → Open file picker, upload files
- `[Select Folder]` → Open folder picker (if supported)
- `[View]` → Preview document modal
- `[Hold]` → Move to "On Hold" tab
- `[Exclude]` → Move to "Excluded" tab
- `[Re-upload]` → Replace with new file
- `[Process Documents]` → Navigate to Processing, start processing

**Button States:**
- `[Process Documents]` disabled if no documents in "Included" tab
- Show tooltip: "No documents to process" when disabled

**Acceptance Criteria:**
- [ ] Full context bar visible
- [ ] Upload area accepts drag and drop
- [ ] Files upload with progress indicator
- [ ] Stat cards show correct counts
- [ ] Tabs filter documents correctly
- [ ] Process button navigates to Processing
- [ ] No technical details visible

---

### 5. Processing

**Route:** `/engagement/:id/processing`

**Responsibility:** Show system processing status

**Must Show:**
- Screen label: `[PROCESSING]` (#3B82F6 badge)
- Full context bar
- Heading: "Processing Documents"
- Current stage text: "Current Stage: [stage name]" (#9CA3AF)
  - Stages: "Reading documents", "Extracting text", "Checking duplicates", "Classifying documents", "Matching to categories", "Preparing review items"
- Progress bar:
  - Background: #252C37
  - Fill: #3B82F6
  - Height: 8px, rounded
  - Show: "X of Y documents"
- Results box (dark card #0F1419):
  - "Results so far:"
  - "X documents auto-classified"
  - "X documents need review"
  - "Estimated time: ~X minutes"
- `[Pause]` button (secondary, optional for v1)

**Processing Complete State:**
- Heading: "Processing Complete"
- Large checkmark: ✓ (#10B981, 24px)
- Summary box (dark card):
  - "Summary:"
  - Bullet list:
    - "• X documents processed"
    - "• X documents auto-classified"
    - "• X documents need review"
    - "• X documents unreadable"
    - "• X duplicates found"
- `[Go to Review]` button (primary blue, bottom right)

**Must NOT Show:**
- OCR worker details
- Technical pipeline info
- Database operations
- Trace logs
- Detailed classification scores

**Auto-Navigation:**
- When processing completes, show "Processing Complete" state
- User must click `[Go to Review]` to proceed (do not auto-navigate)

**Button Actions:**
- `[Pause]` → Pause processing (optional, future feature)
- `[Go to Review]` → Navigate to Review screen

**Acceptance Criteria:**
- [ ] Progress bar animates smoothly
- [ ] Current stage updates during processing
- [ ] Results update in real-time
- [ ] Processing complete shows summary
- [ ] Go to Review navigates correctly
- [ ] No technical details visible

---

### 6. Review

**Route:** `/engagement/:id/review`

**Responsibility:** Resolve exceptions that need human decision

**Must Show:**
- Screen label: `[REVIEW]` (#3B82F6 badge)
- Full context bar
- Count heading: "X items need review"
- Review item cards (highlighted with #3B82F6 border):
  - Title: "Group: X receipts from [vendor]" or single filename
  - Section: "Why needs review:"
    - Reason text (#9CA3AF)
  - Section: "System suggests:"
    - Category name (#3B82F6)
    - Confidence badge: "X%" (#3B82F6 background, rounded)
  - Section: "Evidence:"
    - Darker inset box (#0F1419)
    - Bullet points (blue bullets)
  - `[View All X Receipts]` or `[View Document]` button (secondary)
  - Divider line
  - Section: "Decision:"
    - `[Accept Recommendation]` (success green #10B981)
    - `[Change Category]` (secondary gray)
    - `[Ask Accountant]` (secondary gray)
    - `[Mark as Support Only]` (secondary gray)
    - `[Exclude]` (danger red outline)
  - Checkbox: "☐ Remember this vendor rule" (for grouped items)

**Review Queue Empty State:**
- Large checkmark: ✓ (#10B981)
- Text: "All review items resolved"
- Subtext: "No items need your attention."
- `[Continue to Export]` button (primary blue, bottom right)

**Must NOT Show:**
- Auto-classified documents (already resolved)
- Technical classification scores (ML confidence)
- Raw OCR output
- All documents (only exceptions)

**Decision Actions:**
- `[Accept Recommendation]` → Apply suggested category, mark resolved, remove from queue
- `[Change Category]` → Open category picker modal, apply selection, mark resolved
- `[Ask Accountant]` → Open "Ask Accountant" modal, send to Q&A, mark as "waiting_accountant"
- `[Mark as Support Only]` → Mark as support document (not for accounting), remove from queue
- `[Exclude]` → Exclude from package entirely, remove from queue
- Checkbox: Save vendor rule to database for future auto-classification

**Modals:**

**Change Category Modal:**
- Title: "Select Category"
- Dropdown or searchable list of categories
- Common categories: Vehicle Maintenance, Office Supplies, Software & Subscriptions, Meals & Entertainment, Fuel, Professional Services, etc.
- Buttons: `[Cancel]` `[Apply Category]`

**Ask Accountant Modal:**
- Title: "Ask Accountant"
- Related documents: "4 receipts from Joe's Auto Parts"
- Text area: "Your Question:"
- Auto-included context:
  - "• X receipts"
  - "• Vendor: [name]"
  - "• Total amount: $X"
  - "• Items: [descriptions]"
- Buttons: `[Cancel]` `[Send Question]`

**Button States:**
- All decision buttons enabled always (no disabled state)
- After clicking, show loading spinner on button
- After action completes, remove card from queue with animation

**Acceptance Criteria:**
- [ ] Only exception items visible (not all documents)
- [ ] Why needs review clearly stated
- [ ] System suggestion and confidence shown
- [ ] Evidence displayed in darker box
- [ ] 5 decision buttons available
- [ ] Accept button is green (success)
- [ ] Exclude button is red (danger)
- [ ] Change Category modal works
- [ ] Ask Accountant modal works
- [ ] Questions sent to Q&A screen
- [ ] Empty state shows when queue empty
- [ ] No technical details visible

---

### 7. Accountant Q&A

**Route:** `/engagement/:id/qa`

**Responsibility:** Manage questions sent to accountant (evidence only)

**Must Show:**
- Screen label: `[ACCOUNTANT Q&A]` (#3B82F6 badge)
- Full context bar
- `[Ask New Question]` button (primary blue, top)
- Tabs:
  - "Awaiting (X)" (#9CA3AF)
  - "Answered (X)" (#3B82F6 if active)
  - "Applied (X)" (#9CA3AF)
- Question cards (highlighted with #3B82F6 border if answered):
  - Title: "Q: [question text]"
  - Section: "Context:"
    - Dark box (#0F1419) with bullet points
  - Status badge:
    - "✓ Answered (X hours/days ago)" (#10B981) or
    - "⏱ Awaiting response (X days ago)" (#3B82F6)
  - If answered, section: "Accountant response:"
    - Dark box (#0F1419) with response text
  - Buttons:
    - If answered: `[Return to Review]` (primary blue)
    - If awaiting: `[Cancel Question]` (danger red)
- Important note box (bottom, blue tint #3B82F620, blue left border):
  - "ℹ Note: Accountant answers are evidence only. Final decisions happen in Review."

**Must NOT Show:**
- `[Apply to Related Items]` button (removed)
- `[Mark as Resolved]` button (removed)
- Any decision buttons (decisions happen in Review only)
- Automatic decision application

**Button Actions:**
- `[Ask New Question]` → Open "Ask Accountant" modal (same as Review screen)
- `[Return to Review]` → Navigate to Review, pre-populate answer as evidence in related item
- `[Cancel Question]` → Remove question from queue

**Tab Filtering:**
- Awaiting: status = "sent"
- Answered: status = "answered"
- Applied: status = "applied" (after user returns to Review and makes decision)

**Critical Rule (Display Prominently):**
- Accountant Q&A never finalizes a decision
- Answers are evidence only
- Final decisions always happen in Review
- Show note box at bottom of screen always

**Acceptance Criteria:**
- [ ] Tabs filter questions correctly
- [ ] Answered cards show response
- [ ] Only "Return to Review" button visible (no Apply or Mark Resolved)
- [ ] Note box always visible
- [ ] Return to Review navigates correctly
- [ ] Answer appears as evidence in Review item
- [ ] No decision buttons present

---

### 8. Export

**Route:** `/engagement/:id/export`

**Responsibility:** Generate accountant review package

**Two States: Ready or Needs Attention**

### State 1: Ready

**Must Show:**
- Screen label: `[EXPORT]` (#3B82F6 badge)
- Full context bar
- Large checkmark: ✓ (#10B981, 24px)
- Heading: "Ready"
- Subtext: "All items resolved. Package ready." (#9CA3AF)
- Package contents (dark box #0F1419):
  - "Package Contents:"
  - Bullet list:
    - "• X categorized documents"
    - "• X accountant Q&A records"
    - "• X vendor rules applied"
    - "• Transaction summary by category"
- Section: "Export Format:"
  - Format option cards (selectable, radio button style):
    - "○ Accountant Review (PDF + Documents)"
    - "○ Excel Workbook"
    - "○ QuickBooks Import"
    - "○ CSV Files"
  - Background: #0F1419, border: #374151
  - Hover: border #3B82F6
- Buttons:
  - `[Preview Package]` (secondary, bottom left)
  - `[Download Accountant Package]` (success green #10B981, bottom right)

**Must NOT Show (Removed):**
- ~~`[Email to Accountant]`~~ (future feature, removed from v1)

### State 2: Needs Attention

**Must Show:**
- Screen label: `[EXPORT - NEEDS ATTENTION]` (#F59E0B badge)
- Full context bar
- Warning icon: ⚠ (#F59E0B, 24px)
- Heading: "Needs Attention"
- Subtext: "Cannot export final package yet." (#9CA3AF)
- Section: "Blockers:"
  - Blocker cards (red tint background):
    - Text: "X review items need decision"
    - Button: `[Go to Review]` (primary blue)
  - Blocker cards:
    - Text: "X documents unreadable"
    - Button: `[Go to Documents]` (primary blue)
  - (Add more blocker types as needed)
- Divider line
- Section: "You can download a draft:"
  - Text: "You can download a draft:" (#9CA3AF)
  - Button: `[Download Draft Review Package]` (secondary gray)
  - Small text: "(Draft includes unresolved items flagged)" (#6B7280)

**Blocker Types:**
- Unresolved review items
- Unanswered accountant questions
- Unreadable documents
- Missing required client/period information

**Button Actions (Ready):**
- `[Preview Package]` → Open preview modal/window
- `[Download Accountant Package]` → Generate and download final package

**Button Actions (Needs Attention):**
- `[Go to Review]` → Navigate to Review
- `[Go to Documents]` → Navigate to Documents
- `[Download Draft Review Package]` → Generate and download draft package with blockers flagged

**Critical Rules:**
- Two states must be visually distinct (green vs amber)
- Ready = green checkmark, "Download Accountant Package"
- Needs Attention = amber warning, "Download Draft Review Package"
- Draft download available even with blockers
- Blockers must list specific issues and action buttons

**Acceptance Criteria:**
- [ ] Ready state shows green checkmark
- [ ] Needs Attention shows amber warning
- [ ] Blockers listed specifically
- [ ] Each blocker has action button
- [ ] Ready: primary button is green "Download Accountant Package"
- [ ] Needs Attention: secondary button "Download Draft"
- [ ] Draft button available when blockers exist
- [ ] Email to Accountant NOT present

---

### 9. System / Advanced

**Route:** `/settings/advanced`

**Responsibility:** Technical settings and diagnostics only

**Must Show:**
- Screen label: `[SYSTEM / ADVANCED]` (#6B7280 muted badge)
- Warning banner (red tint, red left border):
  - "⚠ Advanced Settings"
- Section: "Backup & Restore"
  - Dark box (#0F1419):
    - Text: "Last backup: [date] - [time]"
    - Buttons: `[Create Backup]` `[Restore]` (secondary)
- Section: "OCR & Processing"
  - Dark box:
    - Text: "Engine: Tesseract 5.3.0"
    - Text: "Status: Idle" or "Processing"
    - Text: "Documents processed today: X"
    - Button: `[View Logs]` (secondary)
- Section: "Debug"
  - Dark box:
    - Checkbox: "☐ Enable debug mode"
    - Buttons: `[View Trace Logs]` `[Export Debug Data]` (secondary)
- Section: "System Info"
  - Dark box:
    - Text: "Version: 1.0.0"
    - Text: "Data location: ~/Documents/Meridian"

**Must NOT Show:**
- Main workflow features
- User-facing operations
- Business logic
- Document management
- Review tools

**What Belongs Here:**
- Backup / Restore
- OCR worker status
- Processing engine diagnostics
- Trace logs
- Debug mode toggles
- Database optimization
- Raw data export
- Cache management
- Technical version info
- Factory reset
- Advanced import/export formats

**What Does NOT Belong Here:**
- Document upload
- Processing progress (user-facing)
- Review decisions
- Export package generation
- Accountant Q&A

**Button Actions:**
- `[Create Backup]` → Export IndexedDB to JSON file
- `[Restore]` → Import from backup file
- `[View Logs]` → Show processing logs modal
- `[View Trace Logs]` → Show debug trace logs
- `[Export Debug Data]` → Download debug package

**Acceptance Criteria:**
- [ ] Warning banner at top
- [ ] All sections separated clearly
- [ ] All buttons secondary style (not primary blue)
- [ ] Info boxes darker than main background
- [ ] No workflow features visible

---

### 10. Help / Documentation

**Route:** `/help`

**Responsibility:** Documentation hub (reserved for future)

**Must Show:**
- Screen label: `[HELP - RESERVED]` (#6B7280 muted badge)
- Centered content:
  - Large icon: 📚 (48px)
  - Heading: "Documentation" (#F9FAFB, large)
  - Subtext: "Help content will be added in a future release" (#9CA3AF)
- Help section cards (8 total):
  - "Getting Started" - "Coming soon"
  - "Workflow Guide" - "Coming soon"
  - "Screen-by-Screen Help" - "Coming soon"
  - "Troubleshooting" - "Coming soon"
  - "Accounting Terminology" - "Coming soon"
  - "Import / Export Guide" - "Coming soon"
  - "OCR & Document Reading" - "Coming soon"
  - "Backup / Restore Guide" - "Coming soon"
- Footer (center-aligned, muted):
  - "Need help now?"
  - "Version: 1.0.0"
  - "support@meridian.app" (#3B82F6)

**Must NOT Show:**
- Full help content
- Long documentation pages
- User guides (future feature)
- Tutorials

**Card Behavior:**
- Cards are styled but not clickable (future)
- Hover: border turns blue
- All show "Coming soon"

**Future Documentation Structure (Do NOT Implement Content):**
- Getting Started
- Workflow Guide
- Screen-by-Screen Help
- Troubleshooting
- Accounting Terminology
- Import / Export Guide
- OCR & Document Reading
- Backup / Restore Guide

**Acceptance Criteria:**
- [ ] Centered empty state
- [ ] 8 section cards visible
- [ ] All cards show "Coming soon"
- [ ] Support contact visible
- [ ] No actual help content

---

## Global Design Specifications

### Color System (Dark Theme)

```
Backgrounds:
- Dark:   #0F1419 (main background)
- Medium: #1A1F28 (cards, sidebar)
- Light:  #252C37 (borders, subtle divisions)

Primary Colors:
- Blue:   #3B82F6 (primary actions, links)
- Green:  #10B981 (success, ready, accept)
- Amber:  #F59E0B (warning, attention)
- Red:    #EF4444 (danger, error, exclude)
- Gray:   #6B7280 (muted, disabled)

Text Colors:
- Primary:   #F9FAFB (headings, important text)
- Secondary: #D1D5DB (body text)
- Muted:     #9CA3AF (helper text, labels)
```

### Typography

```
H1 (Page Title):     24px, weight 600, -0.02em tracking
H2 (Section):        20px, weight 600, -0.01em tracking
H3 (Subsection):     16px, weight 600
Body Large:          16px, weight 400, 1.6 line-height
Body:                14px, weight 400, 1.5 line-height
Small:               13px, weight 400, 1.4 line-height
Caption:             12px, weight 400, 1.3 line-height
```

### Spacing Scale

```
xs:  4px
sm:  8px
md:  12px
lg:  16px
xl:  24px
2xl: 32px
3xl: 48px
4xl: 64px
```

### Border Radius

```
Small:  4px
Medium: 6px
Large:  8px
```

### Button Styles

**Primary (Blue):**
```
Background: #3B82F6
Text: #FFFFFF
Padding: 12px 24px
Border-radius: 6px
Font-weight: 600
Hover: #2563EB (darker)
```

**Success (Green):**
```
Background: #10B981
Text: #FFFFFF
Padding: 12px 24px
Border-radius: 6px
Font-weight: 600
Hover: #059669 (darker)
```

**Secondary (Gray Outline):**
```
Background: transparent
Border: 1px solid #374151
Text: #D1D5DB
Padding: 12px 24px
Border-radius: 6px
Font-weight: 600
Hover: background #1E3A8A20 (blue tint)
```

**Danger (Red Outline):**
```
Background: transparent
Border: 1px solid #EF4444
Text: #EF4444
Padding: 12px 24px
Border-radius: 6px
Font-weight: 600
Hover: background #7F1D1D20 (red tint)
```

**Disabled:**
```
Background: #374151
Text: #6B7280
Cursor: not-allowed
Opacity: 0.6
Tooltip: Show reason why disabled
```

**Loading:**
```
Background: (same as button type)
Text: (same as button type)
Spinner: visible, 16px, white
Cursor: wait
```

### Button Placement Rules

**Primary Action:**
- Location: Bottom right
- Style: Blue (or green for success actions)
- Examples: Continue, Process Documents, Download Package

**Secondary Action:**
- Location: Bottom left or inline
- Style: Gray outline
- Examples: Back, Cancel, View

**Danger Action:**
- Location: Inline with item
- Style: Red outline
- Examples: Exclude, Delete

**Small Utility:**
- Location: Inline or top right
- Style: Small, gray
- Examples: View, Edit, Preview

### Component Patterns

**Cards:**
```
Background: #1A1F28
Border: 1px solid #252C37
Border-radius: 8px
Padding: 20px
Shadow: 0 1px 3px rgba(0,0,0,0.3)
```

**Highlight Cards (Review Items):**
```
Background: #1A1F28
Border: 1px solid #3B82F6
Border-radius: 8px
Padding: 24px
Shadow: 0 4px 12px rgba(59,130,246,0.15)
```

**Status Badges:**
```
Padding: 4px 12px
Border-radius: 12px (pill)
Font-size: 12px
Font-weight: 600
Border: 1px solid (matching color)
Background: (matching color with 20% opacity)
```

**Progress Bars:**
```
Background: #252C37 (rail)
Fill: #3B82F6 (progress)
Height: 8px
Border-radius: 4px
```

**Evidence/Info Boxes:**
```
Background: #0F1419 (darker than card)
Border-radius: 6px
Padding: 12px 16px
Margin: 12px 0
```

**Context Bar:**
```
Background: #1A1F28
Border-left: 4px solid #3B82F6
Padding: 12px 20px
Font-size: 14px
Color: #D1D5DB
Margin-bottom: 24px
```

---

## Data Models (TypeScript Interfaces)

```typescript
interface Firm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

interface Client {
  id: string;
  firmId: string;
  name: string;
  businessType: 'sole_proprietor' | 'corporation' | 'partnership' | 'llc' | 'other';
  email?: string;
  phone?: string;
  businessNumber?: string;
  createdAt: Date;
}

interface Period {
  id: string;
  clientId: string;
  fiscalYear: number;
  periodType: 'annual' | 'quarterly' | 'semi-annual' | 'monthly' | 'custom';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

interface Engagement {
  id: string;
  firmId: string;
  clientId: string;
  periodId: string;
  status: 'setup' | 'documents' | 'processing' | 'review' | 'ready' | 'exported';
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  engagementId: string;
  filename: string;
  fileHash: string; // for duplicate detection
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

interface ReviewItem {
  id: string;
  engagementId: string;
  documentIds: string[]; // array for grouped items
  reason: string; // why needs review
  systemSuggestion: string; // suggested category
  confidence: number; // 0-100
  evidence: string[]; // bullet points
  groupId?: string; // for grouping similar items
  status: 'pending' | 'resolved' | 'waiting_accountant';
  resolution?: {
    category: string;
    decision: 'accept' | 'change' | 'support' | 'exclude';
    decidedAt: Date;
  };
  createdAt: Date;
}

interface AccountantQuestion {
  id: string;
  engagementId: string;
  reviewItemId: string;
  question: string;
  context: string; // auto-generated context
  status: 'sent' | 'answered' | 'applied';
  response?: {
    answer: string;
    answeredAt: Date;
  };
  createdAt: Date;
}

interface VendorRule {
  id: string;
  engagementId: string;
  vendorName: string;
  category: string;
  learnedFrom: 'manual' | 'accountant' | 'import';
  usageCount: number;
  lastUsed?: Date;
  createdAt: Date;
}
```

---

## What Codex Must NOT Add

**Do NOT implement these features (future scope):**
- Email to Accountant from Export
- Real OCR integration (mock for now)
- External API calls
- Cloud sync
- Multi-user collaboration
- Real-time updates
- Advanced search
- Filters beyond tabs
- Bulk operations
- Keyboard shortcuts (unless time permits)
- Undo/Redo
- Version history
- Audit logs
- Custom categories (use predefined list)
- Custom business types (use predefined list)
- Chart of Accounts editor
- Vendor management screen (auto-save only)
- Report generation (beyond export package)
- Notifications
- Settings beyond System/Advanced

**Do NOT add to scope:**
- Additional screens
- Additional workflow steps
- Additional features per screen
- Dashboard elements
- Analytics
- Charts or graphs
- Technical dashboards
- Detailed logs (except in System/Advanced)

---

## What Must Be Preserved

**Local-First Architecture:**
- All data stored in IndexedDB
- No server calls required
- Works offline
- Fast performance

**Dark Theme:**
- Must be dark by default
- No light mode toggle needed for v1

**Accounting Terminology:**
- Use correct accounting terms
- Fiscal Year, Period, Chart of Accounts
- Vendor, Transaction, Category
- Do not use generic terms

**Workflow Sequential Logic:**
- Cannot skip Engagement Setup steps
- Cannot proceed without completing current step
- Back button available where appropriate

**Exception-Based Review:**
- Review only shows exceptions (not all documents)
- System auto-resolves high-confidence items
- Only ambiguous items shown to user

**Evidence-Driven Decisions:**
- Show why item needs review
- Show system suggestion + confidence
- Show evidence (bullet points)
- User makes final decision

**Q&A as Evidence Only:**
- Accountant answers do not finalize decisions
- Answers return to Review as evidence
- User makes final decision in Review

---

## Acceptance Criteria Summary

### Global Acceptance Criteria

- [ ] Dark theme applied consistently
- [ ] All screens follow design system colors
- [ ] Typography scale consistent
- [ ] Spacing scale consistent
- [ ] Button styles correct (primary/secondary/danger)
- [ ] Navigation sidebar works
- [ ] Context bar appears after Engagement Setup
- [ ] Context bar shows Firm → Client → Period
- [ ] Routes work for all screens
- [ ] IndexedDB stores all data
- [ ] No server calls made
- [ ] Works offline
- [ ] Fast performance (no lag)

### Per-Screen Acceptance Criteria

**Home:**
- [ ] Simple list, no dashboard
- [ ] Start New Engagement button prominent
- [ ] Recent engagements show Client, Period, Status, Continue
- [ ] Status badges color-coded
- [ ] No counters or metrics

**Engagement Setup - Firm:**
- [ ] Firm selection works
- [ ] Add New Firm modal works
- [ ] Required fields validated
- [ ] Navigates to Client after selection
- [ ] No context bar visible

**Engagement Setup - Client:**
- [ ] Client selection works
- [ ] Add New Client modal works
- [ ] Partial context bar shows Firm
- [ ] Back button returns to Firm
- [ ] Navigates to Period after selection

**Engagement Setup - Period:**
- [ ] Fiscal year defaults to previous year
- [ ] Period type defaults to Annual
- [ ] Calculated period displays
- [ ] Context bar shows Firm → Client
- [ ] Continue to Documents creates engagement
- [ ] Full context bar appears on next screen

**Documents:**
- [ ] Upload area accepts files
- [ ] Progress shows during upload
- [ ] Stat cards show counts
- [ ] Tabs filter documents
- [ ] Process Documents navigates to Processing
- [ ] No technical details

**Processing:**
- [ ] Progress bar animates
- [ ] Current stage updates
- [ ] Results update in real-time
- [ ] Processing Complete shows summary
- [ ] Go to Review navigates
- [ ] No technical details

**Review:**
- [ ] Only exceptions shown
- [ ] Why needs review stated
- [ ] System suggestion + confidence shown
- [ ] Evidence displayed
- [ ] 5 decision buttons work
- [ ] Change Category modal works
- [ ] Ask Accountant modal works
- [ ] Questions sent to Q&A
- [ ] Empty state shows when done
- [ ] No technical details

**Accountant Q&A:**
- [ ] Tabs filter questions
- [ ] Answered cards show response
- [ ] Only "Return to Review" button (no Apply or Mark Resolved)
- [ ] Note box always visible
- [ ] Return navigates with evidence
- [ ] No decision buttons

**Export:**
- [ ] Ready state: green checkmark
- [ ] Needs Attention: amber warning
- [ ] Blockers listed specifically
- [ ] Ready: green "Download Accountant Package"
- [ ] Needs Attention: secondary "Download Draft"
- [ ] Draft available with blockers
- [ ] No Email to Accountant

**System / Advanced:**
- [ ] Warning banner at top
- [ ] Sections separated
- [ ] All buttons secondary
- [ ] No workflow features

**Help:**
- [ ] Centered empty state
- [ ] 8 sections show "Coming soon"
- [ ] Support contact visible
- [ ] No actual content

---

## Implementation Notes for Codex

### Tech Stack Reminders

**React + TypeScript:**
- Use functional components
- Use hooks (useState, useEffect, useContext)
- TypeScript interfaces for all data models
- Strict type checking

**Tailwind CSS v4:**
- Use Tailwind classes for all styling
- Follow design system colors (use theme colors)
- Responsive design (mobile-first)
- Dark theme by default

**React Router:**
- Use BrowserRouter
- Implement all routes listed above
- Protected routes (require engagement context)
- Navigation guards where appropriate

**IndexedDB:**
- Use Dexie.js or native IndexedDB
- Store all data locally
- Implement CRUD operations
- Handle errors gracefully

**File Handling:**
- Use File API for uploads
- Calculate file hash (SHA-256) for duplicates
- Store file reference in IndexedDB
- Support drag and drop

### Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── ContextBar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Modal.tsx
│   └── screens/
│       ├── Home.tsx
│       ├── EngagementSetup/
│       │   ├── FirmSetup.tsx
│       │   ├── ClientSetup.tsx
│       │   └── PeriodSetup.tsx
│       ├── Documents.tsx
│       ├── Processing.tsx
│       ├── Review.tsx
│       ├── AccountantQA.tsx
│       ├── Export.tsx
│       ├── SystemAdvanced.tsx
│       └── Help.tsx
├── context/
│   ├── EngagementContext.tsx
│   └── AppContext.tsx
├── hooks/
│   ├── useEngagement.ts
│   ├── useDocuments.ts
│   └── useReview.ts
├── services/
│   ├── database.ts (IndexedDB wrapper)
│   ├── fileService.ts
│   └── processingService.ts (mock OCR)
├── types/
│   └── index.ts (all TypeScript interfaces)
└── App.tsx
```

### Mock Data for Development

**For Processing (Mock OCR):**
- Simulate OCR by returning mock text
- Simulate classification with random confidence (60-95%)
- Create mock review items (20% need review)
- Add realistic delays (100-200ms per document)

**For Accountant Q&A:**
- Store questions in IndexedDB
- Manually answer questions in UI (simulate accountant response)
- Show answered status after manual response

**For Export:**
- Generate mock PDF/Excel (placeholder files)
- Show download dialog
- Log export to console

### Performance Considerations

- Use React.memo for expensive components
- Debounce search/filter inputs
- Virtualize long lists (if >100 items)
- Lazy load routes (React.lazy)
- Optimize re-renders (useCallback, useMemo)

### Error Handling

- Show user-friendly error messages
- Handle IndexedDB errors gracefully
- Handle file upload errors
- Show toast notifications for errors
- Log errors to console (not user-facing)

---

## Final Checklist for Codex

Before considering implementation complete:

### Functionality
- [ ] All 10 screens implemented
- [ ] All routes work
- [ ] Navigation sidebar works
- [ ] Context bar appears correctly
- [ ] Sequential workflow enforced
- [ ] All buttons have actions
- [ ] All modals work
- [ ] IndexedDB stores data
- [ ] File uploads work
- [ ] Mock processing works
- [ ] Review decisions work
- [ ] Q&A workflow works
- [ ] Export states work

### Design Adherence
- [ ] Dark theme consistent
- [ ] Colors match design system
- [ ] Typography matches spec
- [ ] Spacing matches scale
- [ ] Button styles correct
- [ ] Card styles correct
- [ ] Badge styles correct
- [ ] Progress bars correct
- [ ] Icons used appropriately
- [ ] No visual clutter

### Scope Compliance
- [ ] No extra features added
- [ ] No dashboard elements
- [ ] No technical details in main flow
- [ ] Review shows exceptions only
- [ ] Q&A has no decision buttons
- [ ] Export has two clear states
- [ ] System/Advanced has technical only
- [ ] Help has placeholder only
- [ ] No Email to Accountant button
- [ ] No Mark as Resolved button

### Code Quality
- [ ] TypeScript types correct
- [ ] No any types used
- [ ] Components well-structured
- [ ] Hooks used properly
- [ ] Context used appropriately
- [ ] No memory leaks
- [ ] Performance optimized
- [ ] Responsive design works
- [ ] Accessible (basic ARIA)

---

## End of Codex Implementation Handoff

**This document is the complete and final specification for implementing Meridian v1.**

**What Codex should do:**
1. Read this document carefully
2. Implement each screen in order (0-10)
3. Follow design system exactly
4. Test each screen against acceptance criteria
5. Do not add features beyond this specification

**What Codex should NOT do:**
- Add new features
- Expand scope
- Change design
- Skip acceptance criteria
- Add technical dashboards
- Add features to Help screen

**Approved and ready for implementation.**

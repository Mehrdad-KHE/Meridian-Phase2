# Meridian - Codex Implementation Handoff v2
**Complete implementation specification for correction loop workflow**

**Date**: 2026-05-11 (Final)

**Based on approved designs**:
- MERIDIAN_DESIGN_V2_FINAL.md
- MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md
- MERIDIAN_WORKFLOW_ROADMAP_UPDATE.md
- MERIDIAN_FINAL_WIREFRAMES_WITH_ROADMAP.md

---

## Executive Summary

Meridian is a **local-first accounting workflow assistant** with a **correction loop model** that supports bidirectional navigation, incremental reprocessing, and exception-based review.

**Core Innovation**: Users can return to any workflow stage, add/edit content, and reprocess only affected items without losing previous work.

### Key Characteristics

- **Local-first**: IndexedDB storage, no server required
- **Correction loop**: Not a one-way wizard
- **Incremental**: Reprocess only changed items
- **Evidence-driven**: Show why, confidence, reasoning
- **Exception-based**: Auto-handle routine, show only exceptions
- **Accounting-friendly**: QuickBooks-familiar terminology

### Tech Stack

- **React 18.3.1** + TypeScript
- **React Router 7.13.0** for client-side routing
- **Tailwind CSS v4** for styling
- **IndexedDB** for local-first storage

---

## CRITICAL: Preserve Existing Engines

### Existing Capability Preservation Rule

**DO NOT downgrade existing working engines into mocks.**

If OCR, extraction, processing automation, accounting rules, grouped review logic, Accountant Q&A evidence flow, export package generation, or backup/restore capabilities already exist in the current codebase, they **MUST be preserved and reconnected** behind the approved UI.

### Existing Systems to Preserve

The following existing capabilities must be preserved and integrated:

1. **OCR / Document Extraction Engine**
   - If an OCR or text extraction engine exists, preserve it
   - Do not replace with mock data or stub implementations
   - Reconnect behind Documents → Processing workflow

2. **File-Backed Intake**
   - Existing file upload and storage mechanisms
   - Document fingerprinting and duplicate detection
   - File format support and validation

3. **Processing Automation**
   - Existing classification engines
   - Category matching algorithms
   - Vendor recognition systems
   - Confidence scoring mechanisms

4. **Accounting Rules Engine**
   - Vendor rule matching
   - Category mappings
   - Account code assignments
   - Rule-based automation logic

5. **Grouped Review Logic**
   - Exception grouping algorithms
   - Review item creation
   - Evidence aggregation
   - Confidence-based filtering

6. **Accountant Q&A Evidence Flow**
   - Question/answer storage
   - Evidence integration
   - State management (if exists)

7. **Export Package Logic**
   - QuickBooks CSV generation
   - Excel package creation
   - Generic export formats
   - Package assembly logic

8. **Backup / Restore Capabilities**
   - IndexedDB backup
   - Engagement export
   - Data restoration
   - Migration tools

### Implementation Approach

**If existing engines are present:**
- **Preserve** all working logic
- **Reconnect** to new UI screens
- **Adapt** interfaces if needed
- **Extend** with correction loop support (incremental reprocessing, change tracking)
- **Do NOT rewrite** working systems

**If clean reset needed for UI development:**
- Temporary mocks for UI development **MUST be clearly marked** with comments:
  ```typescript
  // TEMPORARY MOCK: Replace with existing OCR engine at [file_path]
  const mockOCR = (file: File) => { /* ... */ };
  ```
- Include clear migration path in comments
- Document location of existing implementation
- Plan reconnection before completion

**If no existing engine (genuinely new capability):**
- Implement as specified in this handoff
- Use mock data initially if needed
- Mark for future enhancement

### Verification Checklist

Before declaring implementation complete, verify:

- [ ] Existing OCR/extraction engine connected (if exists)
- [ ] Existing processing automation preserved (if exists)
- [ ] Existing accounting rules integrated (if exists)
- [ ] Existing review grouping logic reconnected (if exists)
- [ ] Existing Q&A flow preserved (if exists)
- [ ] Existing export generation working (if exists)
- [ ] Existing backup/restore functional (if exists)
- [ ] All temporary mocks clearly marked
- [ ] Migration path documented for any temporary stubs

---

## Application Architecture

### Color System

```typescript
const colors = {
  // Backgrounds
  bgDark: '#0F1419',      // Primary background
  bgMedium: '#1A1F28',    // Cards, modals
  bgLight: '#252C37',     // Hover states
  
  // Semantic
  primary: '#3B82F6',     // Blue - primary actions
  success: '#10B981',     // Green - completed, success
  warning: '#F59E0B',     // Amber - needs attention
  error: '#EF4444',       // Red - errors, failures
  
  // Text
  textPrimary: '#F9FAFB', // Primary text
  textMuted: '#9CA3AF',   // Secondary text
  textDisabled: '#6B7280', // Disabled states
  
  // Borders
  border: '#374151',      // Default borders
  borderHover: '#4B5563', // Hover borders
};
```

### Typography

```css
/* Do not use Tailwind classes for font size, weight, or line-height */
/* These are defined in /src/styles/theme.css */

h1 { /* Main headings */ }
h2 { /* Section headings */ }
h3 { /* Subsection headings */ }
body { /* Default text */ }
.text-muted { /* Secondary text */ }
```

### Layout Structure

```
┌──────────────────────────────────────────────────────┐
│ ┌────────┐ ┌────────────────────────────────────┐ │
│ │SIDEBAR │ │ WORKFLOW ROADMAP (workflow screens)│ │
│ │        │ ├────────────────────────────────────┤ │
│ │• Home  │ │ CONTEXT BAR (if in engagement)     │ │
│ │• Acct  │ ├────────────────────────────────────┤ │
│ │• System│ │                                    │ │
│ │• Help  │ │ MAIN CONTENT                       │ │
│ │        │ │                                    │ │
│ └────────┘ └────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘

Hierarchy:
1. Workflow Roadmap (top, workflow navigation)
2. Context Bar (below roadmap, engagement context)
3. Main Content (screen-specific content)
4. Sidebar (left, always visible, auxiliary navigation)
```

---

## Workflow Roadmap Implementation

### Component Specification

**Purpose**: Shows current position in workflow and enables navigation between stages.

**Visual States**:
- ✓ Completed (green #10B981, clickable)
- ● Current (blue #3B82F6, highlighted, clickable)
- ○ Accessible (gray #9CA3AF, hollow circle, clickable)
- Locked (muted #6B7280, no icon, not clickable)

### TypeScript Interfaces

```typescript
type RoadmapStageState = 
  | 'completed'   // Stage finished, can revisit
  | 'current'     // User is here now
  | 'accessible'  // Can navigate forward (conditions met)
  | 'locked';     // Cannot navigate forward (conditions not met)

interface RoadmapStage {
  id: string;
  label: string;
  state: RoadmapStageState;
  clickable: boolean;
  route: string;
  completionCondition?: () => boolean;
}

interface WorkflowProgress {
  completedStages: string[];
  currentStage: string;
  accessibleStages: string[];
}
```

### Stage Definitions

```typescript
const roadmapStages: RoadmapStage[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/',
    clickable: true,
    completionCondition: null
  },
  {
    id: 'setup',
    label: 'Setup',
    route: '/setup/firm',
    clickable: true,
    completionCondition: () => {
      return engagement.firm && engagement.client && engagement.period;
    }
  },
  {
    id: 'documents',
    label: 'Documents',
    route: '/documents',
    clickable: true,
    completionCondition: () => {
      return documents.uploaded.length > 0;
    }
  },
  {
    id: 'processing',
    label: 'Processing',
    route: '/processing',
    clickable: true,
    completionCondition: () => {
      return documents.pending === 0 && !processing.inProgress;
    }
  },
  {
    id: 'review',
    label: 'Review',
    route: '/review',
    clickable: true,
    completionCondition: () => {
      return reviewItems.unresolved === 0;
    }
  },
  {
    id: 'qa',
    label: 'Q&A',
    route: '/accountant-qa',
    clickable: true,
    completionCondition: () => {
      return questions.unanswered === 0;
    }
  },
  {
    id: 'export',
    label: 'Export',
    route: '/export',
    clickable: true,
    completionCondition: null
  }
];
```

### Navigation Rules

```typescript
// Backward navigation always allowed
const canNavigateBackward = (currentStage: string, targetStage: string): boolean => {
  const currentIndex = stages.findIndex(s => s.id === currentStage);
  const targetIndex = stages.findIndex(s => s.id === targetStage);
  return targetIndex <= currentIndex;
};

// Forward navigation requires completion
const canNavigateForward = (currentStage: string, targetStage: string): boolean => {
  const currentIndex = stages.findIndex(s => s.id === currentStage);
  const targetIndex = stages.findIndex(s => s.id === targetStage);
  
  if (targetIndex <= currentIndex) return true;
  
  // Check all intermediate stages are complete
  for (let i = currentIndex; i < targetIndex; i++) {
    const stage = stages[i];
    if (stage.completionCondition && !stage.completionCondition()) {
      return false;
    }
  }
  
  return true;
};
```

### Visual Component

```tsx
interface WorkflowRoadmapProps {
  stages: RoadmapStage[];
  currentStageId: string;
  onStageClick: (stageId: string) => void;
}

const WorkflowRoadmap: React.FC<WorkflowRoadmapProps> = ({
  stages,
  currentStageId,
  onStageClick
}) => {
  const getStageState = (stage: RoadmapStage): RoadmapStageState => {
    const currentIndex = stages.findIndex(s => s.id === currentStageId);
    const stageIndex = stages.findIndex(s => s.id === stage.id);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    if (canNavigateForward(currentStageId, stage.id)) return 'accessible';
    return 'locked';
  };

  return (
    <div className="workflow-roadmap flex items-center gap-2 px-6 py-3 bg-[#1A1F28]">
      {stages.map((stage, index) => {
        const state = getStageState(stage);
        const clickable = canNavigateBackward(currentStageId, stage.id) || 
                         canNavigateForward(currentStageId, stage.id);
        
        return (
          <React.Fragment key={stage.id}>
            <button
              onClick={() => clickable && onStageClick(stage.id)}
              disabled={!clickable}
              className={`
                flex items-center gap-2 px-3 py-1 rounded
                ${state === 'current' ? 'bg-[#3B82F6] text-white' : ''}
                ${state === 'completed' ? 'text-[#10B981]' : ''}
                ${state === 'accessible' ? 'text-[#9CA3AF] hover:text-white' : ''}
                ${state === 'locked' ? 'text-[#6B7280] cursor-not-allowed' : ''}
                ${clickable ? 'cursor-pointer hover:bg-[#252C37]' : ''}
              `}
            >
              {state === 'completed' && <span>✓</span>}
              {state === 'current' && <span>●</span>}
              {state === 'accessible' && <span>○</span>}
              <span>{stage.label}</span>
            </button>
            {index < stages.length - 1 && (
              <span className="text-[#6B7280]">→</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
```

---

## Context Bar vs Workflow Roadmap

### Critical Distinction

**These are TWO DIFFERENT components. Do not confuse them.**

### Workflow Roadmap

- **Purpose**: Shows WHERE in process (workflow stage)
- **Shows**: `Home → Setup → Documents → Processing → Review → Q&A → Export`
- **Location**: Top of main content area
- **Visible**: Only during active engagement workflow
- **Color scheme**: Green/Blue/Gray based on state

### Context Bar

- **Purpose**: Shows WHICH engagement (firm/client/period)
- **Shows**: `[Northpeak Accounting] → [Daniel Roberts] → [2025 Annual]`
- **Location**: Below roadmap, above main content
- **Visible**: Once engagement context established
- **Color scheme**: Background #1A1F28, text #F9FAFB

### Implementation

```tsx
const ContextBar: React.FC<{ engagement: Engagement }> = ({ engagement }) => {
  return (
    <div className="context-bar flex items-center gap-2 px-6 py-2 bg-[#1A1F28] border-b border-[#374151]">
      <button className="text-[#F9FAFB] hover:text-[#3B82F6]">
        {engagement.firm.name}
      </button>
      <span className="text-[#6B7280]">→</span>
      <button className="text-[#F9FAFB] hover:text-[#3B82F6]">
        {engagement.client.name}
      </button>
      <span className="text-[#6B7280]">→</span>
      <button className="text-[#F9FAFB] hover:text-[#3B82F6]">
        {engagement.period.label}
      </button>
    </div>
  );
};
```

---

## Engagement State Machine

### Core States

```typescript
type EngagementState = 
  | 'setup_incomplete'      // Firm/Client/Period not all selected
  | 'documents_empty'       // No documents uploaded
  | 'documents_uploaded'    // Documents uploaded, not processed
  | 'processing'            // Processing in progress
  | 'review_pending'        // Has unresolved review items
  | 'review_complete'       // All review items resolved
  | 'export_ready'          // Ready to export
  | 'exported'              // Package exported
  | 'needs_reprocessing';   // Changes made, needs reprocess

interface EngagementStatus {
  state: EngagementState;
  documentsTotal: number;
  documentsProcessed: number;
  documentsPending: number;
  reviewItemsTotal: number;
  reviewItemsResolved: number;
  changesDetected: boolean;
  lastModified: Date;
}
```

### State Transitions

```typescript
const updateEngagementState = (engagement: Engagement): EngagementState => {
  // Setup incomplete
  if (!engagement.firm || !engagement.client || !engagement.period) {
    return 'setup_incomplete';
  }
  
  // No documents
  if (engagement.documents.length === 0) {
    return 'documents_empty';
  }
  
  // Has pending documents
  if (engagement.documents.some(d => d.status === 'pending')) {
    return 'documents_uploaded';
  }
  
  // Processing active
  if (engagement.processing.inProgress) {
    return 'processing';
  }
  
  // Has changes needing reprocessing
  if (engagement.changes.length > 0) {
    return 'needs_reprocessing';
  }
  
  // Has unresolved review items
  const unresolved = engagement.reviewItems.filter(r => !r.resolved).length;
  if (unresolved > 0) {
    return 'review_pending';
  }
  
  // All resolved
  if (engagement.exported) {
    return 'exported';
  }
  
  return 'export_ready';
};
```

---

## Change Detection and Incremental Reprocessing

### Change Types

```typescript
type ChangeType =
  | 'document_added'           // New document uploaded
  | 'document_replaced'        // Better scan replaces old
  | 'document_removed'         // Document excluded/deleted
  | 'category_changed'         // Document category changed
  | 'vendor_rule_changed'      // Vendor mapping changed
  | 'account_code_changed'     // Account code changed
  | 'review_decision_reopened' // Previous decision changed
  | 'support_status_changed'   // Support-only status changed
  | 'inclusion_status_changed';// Included/excluded changed

interface Change {
  id: string;
  type: ChangeType;
  affectedDocuments: string[];
  timestamp: Date;
  status: 'pending' | 'reprocessing' | 'completed';
  reason?: string;
}
```

### Reprocessing Queue

```typescript
interface ReprocessingQueue {
  items: ReprocessingItem[];
  status: 'idle' | 'running' | 'completed';
}

interface ReprocessingItem {
  documentId: string;
  reason: ChangeType;
  actions: ReprocessingAction[];
}

type ReprocessingAction =
  | 'reread_document'    // Re-run OCR
  | 'reclassify'         // Re-run classification
  | 'rematch_vendor'     // Re-match vendor rules
  | 'update_category'    // Update category based on rules
  | 'create_review_item' // Create new review item
  | 'update_review_item' // Update existing review item
  | 'remove_review_item';// Remove from review
```

### Incremental Processing Logic

```typescript
const processChanges = async (engagement: Engagement) => {
  const changes = engagement.changes.filter(c => c.status === 'pending');
  
  // Collect affected documents (deduplicate)
  const affectedDocs = new Set<string>();
  changes.forEach(change => {
    change.affectedDocuments.forEach(id => affectedDocs.add(id));
  });
  
  const totalDocs = engagement.documents.length;
  const affectedCount = affectedDocs.size;
  const preservedCount = totalDocs - affectedCount;
  
  // Show incremental processing UI
  console.log(`Processing ${affectedCount} of ${totalDocs} documents`);
  console.log(`${preservedCount} unchanged documents preserved`);
  
  // Process only affected documents
  for (const docId of affectedDocs) {
    await processDocument(docId, engagement);
  }
  
  // Mark changes as completed
  changes.forEach(change => {
    change.status = 'completed';
  });
  
  // Update engagement state
  engagement.state = updateEngagementState(engagement);
};
```

---

## Document Management

### Document States

```typescript
type DocumentStatus =
  | 'pending'     // Uploaded, not processed
  | 'processing'  // Currently being processed
  | 'processed'   // Successfully processed
  | 'unreadable'  // OCR failed
  | 'duplicate'   // Duplicate of existing
  | 'changed'     // Edited, needs reprocessing
  | 'excluded'    // User excluded
  | 'support';    // Support-only, not for review

interface Document {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  status: DocumentStatus;
  fingerprint: string;
  ocrConfidence?: number;
  ocrText?: string;
  category?: string;
  vendor?: string;
  amount?: number;
  date?: Date;
  reviewItemId?: string;
}
```

### Document Actions (Context Menu)

**Context-aware ⋮ menu based on document state:**

```typescript
const getDocumentActions = (doc: Document): Action[] => {
  switch (doc.status) {
    case 'unreadable':
      return [
        { label: 'Re-upload', icon: '📤', action: () => reupload(doc) },
        { label: 'Hold for Better Scan', icon: '⏸', action: () => hold(doc) },
        { label: 'Exclude', icon: '❌', action: () => exclude(doc) }
      ];
    
    case 'processed':
      return [
        { label: 'View Details', icon: '👁', action: () => view(doc) },
        { label: 'Change Category', icon: '🏷', action: () => changeCategory(doc) },
        { label: 'Mark as Support Only', icon: '📎', action: () => markSupport(doc) },
        { label: 'Ask Accountant', icon: '❓', action: () => askAccountant(doc) },
        { label: 'Exclude', icon: '❌', action: () => exclude(doc) }
      ];
    
    case 'duplicate':
      return [
        { label: 'Compare Files', icon: '🔍', action: () => compare(doc) },
        { label: 'Replace Previous', icon: '🔄', action: () => replace(doc) },
        { label: 'Keep Both', icon: '✓✓', action: () => keepBoth(doc) },
        { label: 'Exclude This Copy', icon: '❌', action: () => exclude(doc) }
      ];
    
    default:
      return [];
  }
};
```

### Document Fingerprinting

```typescript
const generateFingerprint = async (file: File): Promise<string> => {
  // Generate hash of file content for duplicate detection
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const detectDuplicates = (newDoc: Document, existingDocs: Document[]): Document[] => {
  // Exact duplicate: same fingerprint
  const exactMatch = existingDocs.find(d => d.fingerprint === newDoc.fingerprint);
  if (exactMatch) return [exactMatch];
  
  // Similar: fuzzy match on OCR text (for better scans)
  const similarDocs = existingDocs.filter(d => {
    if (!d.ocrText || !newDoc.ocrText) return false;
    const similarity = calculateSimilarity(d.ocrText, newDoc.ocrText);
    return similarity > 0.85; // 85% similar
  });
  
  return similarDocs;
};
```

---

## Review System (Exception-Based)

### Review Item Types

```typescript
type ReviewItemType =
  | 'low_confidence'      // OCR confidence < 80%
  | 'ambiguous_category'  // Multiple possible categories
  | 'vendor_mismatch'     // Vendor name unclear
  | 'amount_unclear'      // Amount not detected
  | 'date_unclear'        // Date not detected
  | 'duplicate_detected'  // Possible duplicate
  | 'manual_flag'         // User flagged for review
  | 'accountant_input';   // Accountant answered question

interface ReviewItem {
  id: string;
  type: ReviewItemType;
  documentIds: string[];
  status: 'unresolved' | 'resolved' | 'reopened';
  confidence: number;
  evidence: Evidence[];
  suggestion?: Suggestion;
  userDecision?: Decision;
  resolvedDate?: Date;
  reopenedDate?: Date;
}

interface Evidence {
  type: 'ocr_text' | 'category_match' | 'vendor_match' | 'similar_docs' | 'accountant_answer';
  content: string;
  confidence: number;
  source: string;
}

interface Suggestion {
  category?: string;
  vendor?: string;
  amount?: number;
  date?: Date;
  reasoning: string;
  confidence: number;
}

interface Decision {
  accepted: boolean;
  category?: string;
  vendor?: string;
  amount?: number;
  date?: Date;
  reason?: string;
  timestamp: Date;
}
```

### Review Item UI

```tsx
const ReviewItemCard: React.FC<{ item: ReviewItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="review-item border border-[#374151] rounded-lg p-4 bg-[#1A1F28]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-[#F9FAFB] font-semibold">
            {getReviewItemTitle(item)}
          </h3>
          <p className="text-[#9CA3AF] text-sm mt-1">
            {getReviewItemDescription(item)}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#3B82F6] hover:text-[#60A5FA]"
        >
          {expanded ? 'Collapse ▲' : 'Expand ▼'}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-4">
          {/* Evidence Section */}
          <div className="mb-4">
            <h4 className="text-[#F9FAFB] font-medium mb-2">Evidence:</h4>
            {item.evidence.map((evidence, index) => (
              <div key={index} className="mb-2 pl-4 border-l-2 border-[#374151]">
                <div className="text-[#9CA3AF] text-sm">
                  {evidence.type}: {evidence.content}
                </div>
                <div className="text-[#6B7280] text-xs">
                  Confidence: {Math.round(evidence.confidence * 100)}%
                </div>
              </div>
            ))}
          </div>
          
          {/* Suggestion */}
          {item.suggestion && (
            <div className="mb-4 p-3 bg-[#252C37] rounded">
              <h4 className="text-[#F9FAFB] font-medium mb-2">
                Suggestion ({Math.round(item.suggestion.confidence * 100)}% confidence):
              </h4>
              <p className="text-[#9CA3AF] text-sm">{item.suggestion.reasoning}</p>
              <div className="mt-2">
                <span className="text-[#10B981]">
                  {item.suggestion.category}
                </span>
              </div>
            </div>
          )}
          
          {/* Decision Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => acceptSuggestion(item)}
              className="px-4 py-2 bg-[#10B981] text-white rounded hover:bg-[#059669]"
            >
              Accept Suggestion
            </button>
            <button
              onClick={() => showCategoryPicker(item)}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded hover:bg-[#2563EB]"
            >
              Choose Different Category
            </button>
            <button
              onClick={() => askAccountant(item)}
              className="px-4 py-2 border border-[#374151] text-[#F9FAFB] rounded hover:bg-[#252C37]"
            >
              Ask Accountant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
```

### Reopening Decisions

```typescript
const reopenDecision = (item: ReviewItem) => {
  // Mark as reopened
  item.status = 'reopened';
  item.reopenedDate = new Date();
  
  // Update engagement state
  engagement.state = 'review_pending';
  
  // Update export status
  if (exportStatus.ready) {
    exportStatus.ready = false;
    exportStatus.blockers.push(`Review item #${item.id} reopened`);
  }
  
  // Navigate to review screen
  navigate('/review');
};
```

---

## Accountant Q&A System

### CRITICAL: Q&A States (No "Applied")

**Accountant answers are EVIDENCE ONLY. Final decisions happen in Review.**

```typescript
type QuestionState =
  | 'draft'               // User composing
  | 'sent'                // Sent, awaiting response
  | 'answered'            // Accountant provided answer
  | 'returned_to_review'  // Answer sent back to Review
  | 'evidence_added';     // Answer added as evidence

interface AccountantQuestion {
  id: string;
  documentId: string;
  question: string;
  context: string;
  state: QuestionState;
  sentDate?: Date;
  answer?: string;
  answeredDate?: Date;
  returnedToReviewDate?: Date;
  relatedReviewItemId?: string;
}
```

### Q&A State Labels

**Use these labels:**
- "Awaiting Response" (not "Awaiting" or "Sent")
- "Answer Available" (not "Answered" or "Applied")
- "Returned to Review" (not "Applied" or "Resolved")
- "Evidence Added" (not "Applied")

**Do NOT use:**
- ~~"Applied"~~ - Implies automatic application
- ~~"Resolved"~~ - Implies final decision
- ~~"Completed"~~ - Ambiguous

### Q&A Workflow

```typescript
// Step 1: User asks question
const askAccountant = async (doc: Document, question: string) => {
  const q: AccountantQuestion = {
    id: generateId(),
    documentId: doc.id,
    question,
    context: generateContext(doc),
    state: 'sent',
    sentDate: new Date()
  };
  
  await db.questions.add(q);
  
  // In real app: send to external accountant system
  // For prototype: simulate answer after delay
};

// Step 2: Accountant answers
const receiveAnswer = async (questionId: string, answer: string) => {
  const q = await db.questions.get(questionId);
  q.answer = answer;
  q.answeredDate = new Date();
  q.state = 'answered';
  
  await db.questions.update(questionId, q);
  
  // Notify user
  showNotification(`Accountant answered your question about ${q.documentId}`);
};

// Step 3: User returns to review
const returnToReview = async (questionId: string) => {
  const q = await db.questions.get(questionId);
  q.state = 'returned_to_review';
  q.returnedToReviewDate = new Date();
  
  // Find related review item
  const reviewItem = await db.reviewItems.get(q.relatedReviewItemId);
  
  // Add answer as evidence
  reviewItem.evidence.push({
    type: 'accountant_answer',
    content: q.answer,
    confidence: 0.95, // High confidence from expert
    source: 'Accountant'
  });
  
  await db.reviewItems.update(reviewItem.id, reviewItem);
  await db.questions.update(questionId, q);
  
  // Navigate to review
  navigate('/review');
};
```

### Q&A Screen UI

```tsx
const AccountantQA: React.FC = () => {
  const [filter, setFilter] = useState<QuestionState>('sent');
  const questions = useQuestions(filter);
  
  return (
    <div>
      <h1>Accountant Q&A</h1>
      <p className="text-[#9CA3AF]">
        Ask your accountant for guidance. Answers are added as evidence to help you make final decisions.
      </p>
      
      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#374151] mb-6">
        <button
          onClick={() => setFilter('sent')}
          className={filter === 'sent' ? 'active-tab' : 'tab'}
        >
          Awaiting Response ({counts.sent})
        </button>
        <button
          onClick={() => setFilter('answered')}
          className={filter === 'answered' ? 'active-tab' : 'tab'}
        >
          Answer Available ({counts.answered})
        </button>
        <button
          onClick={() => setFilter('returned_to_review')}
          className={filter === 'returned_to_review' ? 'active-tab' : 'tab'}
        >
          Returned to Review ({counts.returned})
        </button>
      </div>
      
      {/* Question List */}
      {questions.map(q => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
};
```

---

## Export System

### Export States

```typescript
type ExportStatus =
  | 'not_ready'      // Cannot export yet
  | 'ready'          // All resolved, can export
  | 'needs_attention'// Has blockers
  | 'needs_update';  // Changes since export

interface ExportState {
  status: ExportStatus;
  ready: boolean;
  blockers: string[];
  changesSinceExport: Change[];
  lastExportDate?: Date;
  lastExportPackagePath?: string;
}
```

### Export Status Logic

```typescript
const updateExportStatus = (engagement: Engagement): ExportState => {
  const state: ExportState = {
    status: 'not_ready',
    ready: false,
    blockers: [],
    changesSinceExport: [],
    lastExportDate: engagement.lastExportDate,
    lastExportPackagePath: engagement.lastExportPackage
  };
  
  // Check blockers
  const unresolvedReview = engagement.reviewItems.filter(r => !r.resolved);
  const unansweredQuestions = engagement.questions.filter(q => q.state === 'sent');
  const pendingDocs = engagement.documents.filter(d => d.status === 'pending');
  
  if (unresolvedReview.length > 0) {
    state.blockers.push(`${unresolvedReview.length} unresolved review items`);
  }
  
  if (unansweredQuestions.length > 0) {
    state.blockers.push(`${unansweredQuestions.length} unanswered questions`);
  }
  
  if (pendingDocs.length > 0) {
    state.blockers.push(`${pendingDocs.length} pending documents`);
  }
  
  // Determine status
  if (state.blockers.length > 0) {
    state.status = 'needs_attention';
    return state;
  }
  
  // Check if changes since export
  if (engagement.exported) {
    const changesSince = engagement.changes.filter(c => 
      c.timestamp > engagement.lastExportDate
    );
    
    if (changesSince.length > 0) {
      state.status = 'needs_update';
      state.changesSinceExport = changesSince;
      return state;
    }
  }
  
  // Ready to export
  state.status = 'ready';
  state.ready = true;
  return state;
};
```

### Export UI States

```tsx
const ExportScreen: React.FC = () => {
  const exportState = useExportState();
  
  return (
    <div>
      <h1>Export</h1>
      
      {exportState.status === 'ready' && (
        <div className="p-6 bg-[#1A1F28] border-l-4 border-[#10B981] rounded">
          <h2 className="text-[#10B981] text-xl font-semibold">✓ Ready to Export</h2>
          <p className="text-[#9CA3AF] mt-2">
            All review items resolved. Your package is ready.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="px-6 py-3 bg-[#10B981] text-white rounded">
              Download Accountant Package
            </button>
            <button className="px-6 py-3 border border-[#374151] text-[#F9FAFB] rounded">
              Configure Export
            </button>
          </div>
        </div>
      )}
      
      {exportState.status === 'needs_attention' && (
        <div className="p-6 bg-[#1A1F28] border-l-4 border-[#F59E0B] rounded">
          <h2 className="text-[#F59E0B] text-xl font-semibold">⚠ Needs Attention</h2>
          <p className="text-[#9CA3AF] mt-2">
            Some items need to be resolved before export.
          </p>
          <div className="mt-4">
            <h3 className="text-[#F9FAFB] font-medium">Blockers:</h3>
            <ul className="list-disc list-inside text-[#9CA3AF] mt-2">
              {exportState.blockers.map((blocker, i) => (
                <li key={i}>{blocker}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-6 py-3 bg-[#3B82F6] text-white rounded">
              Go to Review
            </button>
            <button className="px-6 py-3 border border-[#F59E0B] text-[#F9FAFB] rounded">
              Download Draft Package
            </button>
          </div>
        </div>
      )}
      
      {exportState.status === 'needs_update' && (
        <div className="p-6 bg-[#1A1F28] border-l-4 border-[#3B82F6] rounded">
          <h2 className="text-[#3B82F6] text-xl font-semibold">🔄 Needs Update</h2>
          <p className="text-[#9CA3AF] mt-2">
            Changes made since last export.
          </p>
          <div className="mt-4">
            <h3 className="text-[#F9FAFB] font-medium">Changes:</h3>
            <ul className="list-disc list-inside text-[#9CA3AF] mt-2">
              {exportState.changesSinceExport.map((change, i) => (
                <li key={i}>{getChangeDescription(change)}</li>
              ))}
            </ul>
            <p className="text-[#6B7280] text-sm mt-2">
              Last exported: {formatDate(exportState.lastExportDate)}
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-6 py-3 bg-[#3B82F6] text-white rounded">
              Reprocess & Update Export
            </button>
            <button className="px-6 py-3 border border-[#374151] text-[#F9FAFB] rounded">
              Download Previous Package
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## Screen-by-Screen Implementation

### 1. Home Screen

**Route**: `/`

**Purpose**: List engagements, create new

**Key Features**:
- [Start New Engagement] button
- Recent engagements list with status
- [Continue] button for each

**No roadmap on this screen** (not in workflow yet)

```tsx
const Home: React.FC = () => {
  const engagements = useEngagements();
  
  return (
    <div className="p-6">
      <h1>Meridian</h1>
      
      <button className="px-6 py-3 bg-[#3B82F6] text-white rounded mb-6">
        Start New Engagement
      </button>
      
      <h2 className="text-[#F9FAFB] font-semibold mb-4">Recent Engagements</h2>
      
      {engagements.map(eng => (
        <EngagementCard key={eng.id} engagement={eng} />
      ))}
    </div>
  );
};
```

### 2. Setup Screens (Firm / Client / Period)

**Routes**: `/setup/firm`, `/setup/client`, `/setup/period`

**Purpose**: Sequential engagement setup

**Key Features**:
- Roadmap visible: `✓Home → ●Setup → Documents → ...`
- Select from existing or add new
- Auto-advance to next step
- Context bar NOT visible yet (setup incomplete)

```tsx
const SelectFirm: React.FC = () => {
  const firms = useFirms();
  
  return (
    <div>
      <WorkflowRoadmap currentStage="setup" />
      
      <div className="p-6">
        <h1>Select Accountant / Firm</h1>
        <p className="text-[#9CA3AF]">Select a firm or add a new one</p>
        
        {firms.map(firm => (
          <FirmCard key={firm.id} firm={firm} onSelect={selectFirm} />
        ))}
        
        <button className="mt-4 px-4 py-2 border border-[#374151] text-[#F9FAFB] rounded">
          Add New Firm
        </button>
      </div>
    </div>
  );
};
```

### 3. Documents Screen

**Route**: `/documents`

**Purpose**: Upload and manage documents

**Key Features**:
- Roadmap: `✓Home → ✓Setup → ●Documents → ○Processing → ...`
- Context bar visible: `[Firm] → [Client] → [Period]`
- Upload area ALWAYS visible
- Status bar: `X processed | X pending | X changed | X excluded`
- Document list with tabs: All / Read / Needs Fix / Duplicates
- Context menu (⋮) with state-aware actions
- [Process Pending Documents (X)] button if pending > 0
- [Reprocess Changed Documents (X)] button if changed > 0

```tsx
const Documents: React.FC = () => {
  const engagement = useEngagement();
  const documents = useDocuments();
  const [tab, setTab] = useState('all');
  
  const statusCounts = {
    processed: documents.filter(d => d.status === 'processed').length,
    pending: documents.filter(d => d.status === 'pending').length,
    changed: documents.filter(d => d.status === 'changed').length,
    excluded: documents.filter(d => d.status === 'excluded').length
  };
  
  return (
    <div>
      <WorkflowRoadmap currentStage="documents" />
      <ContextBar engagement={engagement} />
      
      <div className="p-6">
        <h1>Documents</h1>
        
        <div className="status-bar mb-6 p-4 bg-[#1A1F28] rounded">
          {statusCounts.processed} processed | {statusCounts.pending} pending | 
          {statusCounts.changed} changed | {statusCounts.excluded} excluded
        </div>
        
        <div className="upload-area mb-6 p-8 border-2 border-dashed border-[#3B82F6] rounded">
          <p className="text-center text-[#9CA3AF]">
            📤 Upload Documents
          </p>
          <p className="text-center text-[#6B7280] text-sm">
            Drag and drop or click to select files
          </p>
          <button className="mt-4 mx-auto block px-6 py-2 bg-[#3B82F6] text-white rounded">
            Select Files
          </button>
        </div>
        
        <div className="tabs flex gap-4 border-b border-[#374151] mb-6">
          <button onClick={() => setTab('all')}>All ({documents.length})</button>
          <button onClick={() => setTab('read')}>Read ({statusCounts.processed})</button>
          <button onClick={() => setTab('needs-fix')}>Needs Fix</button>
          <button onClick={() => setTab('duplicates')}>Duplicates</button>
        </div>
        
        <div className="document-list">
          {documents.filter(d => filterByTab(d, tab)).map(doc => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
        
        {statusCounts.pending > 0 && (
          <button className="mt-6 px-6 py-3 bg-[#3B82F6] text-white rounded">
            Process Pending Documents ({statusCounts.pending})
          </button>
        )}
        
        {statusCounts.changed > 0 && (
          <button className="mt-6 ml-3 px-6 py-3 bg-[#3B82F6] text-white rounded">
            Reprocess Changed Documents ({statusCounts.changed})
          </button>
        )}
      </div>
    </div>
  );
};
```

### 4. Processing Screen

**Route**: `/processing`

**Purpose**: Show processing progress

**Key Features**:
- Roadmap: `... → ●Processing → ...`
- Context bar visible
- Incremental processing clearly labeled
- Title shows type: "Processing all documents" / "Processing new documents" / "Reprocessing changed documents"
- Count: "X of Y total documents"
- Progress bar
- Step indicators
- Bottom note: "X unchanged documents preserved" (if incremental)
- Auto-navigates to Review when done (if new exceptions)

```tsx
const Processing: React.FC = () => {
  const engagement = useEngagement();
  const processingState = useProcessingState();
  
  const title = processingState.type === 'initial' 
    ? 'Processing all documents'
    : processingState.type === 'new'
    ? 'Processing new documents'
    : 'Reprocessing changed documents';
  
  const count = processingState.type === 'initial'
    ? `${processingState.total} documents`
    : `${processingState.affected} of ${processingState.total} total documents`;
  
  return (
    <div>
      <WorkflowRoadmap currentStage="processing" />
      <ContextBar engagement={engagement} />
      
      <div className="p-6">
        <h1>Processing</h1>
        
        <div className="processing-box p-8 bg-[#1A1F28] rounded">
          <h2 className="text-[#F9FAFB] text-xl font-semibold">{title}</h2>
          <p className="text-[#9CA3AF] mt-2">{count}</p>
          
          {processingState.type !== 'initial' && (
            <div className="mt-4 text-[#6B7280] text-sm">
              {processingState.affected < processingState.total 
                ? `${processingState.total - processingState.affected} unchanged documents preserved`
                : ''}
            </div>
          )}
          
          <div className="progress-bar mt-6">
            <div className="w-full h-2 bg-[#374151] rounded">
              <div 
                className="h-full bg-[#3B82F6] rounded transition-all"
                style={{ width: `${processingState.progress}%` }}
              />
            </div>
            <p className="text-center text-[#9CA3AF] mt-2">
              {Math.round(processingState.progress)}%
            </p>
          </div>
          
          <div className="steps mt-6">
            <p className="text-[#9CA3AF] mb-2">
              Current: {processingState.currentStep}
            </p>
            {processingState.steps.map(step => (
              <div key={step.name} className="flex items-center gap-2 text-sm">
                {step.status === 'completed' && <span>✓</span>}
                {step.status === 'current' && <span>●</span>}
                {step.status === 'pending' && <span>○</span>}
                <span className={step.status === 'current' ? 'text-[#F9FAFB]' : 'text-[#6B7280]'}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 5. Review Screen

**Route**: `/review`

**Purpose**: Resolve exceptions

**Key Features**:
- Roadmap: `... → ●Review → ...`
- Context bar visible
- Status: `X need attention | X resolved | X pending`
- TWO sections:
  - "Items Needing Attention" (unresolved)
  - "Resolved Items (X)" (collapsible, with [Reopen Decision] buttons)
- Evidence-driven review cards
- Decision buttons: Accept / Change / Ask Accountant
- 🆕 badge for new items from recent processing

```tsx
const Review: React.FC = () => {
  const engagement = useEngagement();
  const reviewItems = useReviewItems();
  
  const unresolved = reviewItems.filter(r => !r.resolved);
  const resolved = reviewItems.filter(r => r.resolved);
  
  return (
    <div>
      <WorkflowRoadmap currentStage="review" />
      <ContextBar engagement={engagement} />
      
      <div className="p-6">
        <h1>Review</h1>
        <p className="text-[#9CA3AF]">
          Resolve exceptions. All other documents have been automatically categorized.
        </p>
        
        <div className="status-bar mt-4 mb-6">
          {unresolved.length} need attention | {resolved.length} resolved | 0 pending
        </div>
        
        <h2 className="text-[#F9FAFB] font-semibold mb-4">Items Needing Attention</h2>
        
        {unresolved.map(item => (
          <ReviewItemCard key={item.id} item={item} />
        ))}
        
        <h2 className="text-[#F9FAFB] font-semibold mt-8 mb-4">
          Resolved Items ({resolved.length})
          <button className="ml-2 text-sm text-[#3B82F6]">
            [Collapse ▲]
          </button>
        </h2>
        
        {resolved.map(item => (
          <ResolvedItemCard key={item.id} item={item} onReopen={reopenDecision} />
        ))}
        
        {unresolved.length === 0 && (
          <button className="mt-6 px-6 py-3 bg-[#3B82F6] text-white rounded">
            Continue to Export
          </button>
        )}
      </div>
    </div>
  );
};
```

### 6. Accountant Q&A Screen

**Route**: `/accountant-qa`

**Purpose**: View questions and answers

**Key Features**:
- Roadmap: `... → ●Q&A → ...`
- Context bar visible
- Tabs: "Awaiting Response (X)" | "Answer Available (X)" | "Returned to Review (X)"
- **Do NOT use "Applied" state**
- Question cards with answers
- [Return to Review Item] button for answered questions
- Evidence-only approach (answers don't auto-apply)

```tsx
const AccountantQA: React.FC = () => {
  const engagement = useEngagement();
  const [filter, setFilter] = useState<QuestionState>('sent');
  const questions = useQuestions(filter);
  
  const counts = {
    sent: questions.filter(q => q.state === 'sent').length,
    answered: questions.filter(q => q.state === 'answered').length,
    returned: questions.filter(q => q.state === 'returned_to_review').length
  };
  
  return (
    <div>
      <WorkflowRoadmap currentStage="qa" />
      <ContextBar engagement={engagement} />
      
      <div className="p-6">
        <h1>Accountant Q&A</h1>
        <p className="text-[#9CA3AF]">
          Ask your accountant for guidance. Answers are added as evidence to help you make final decisions.
        </p>
        
        <div className="tabs flex gap-4 border-b border-[#374151] mt-6 mb-6">
          <button
            onClick={() => setFilter('sent')}
            className={filter === 'sent' ? 'active-tab' : 'tab'}
          >
            Awaiting Response ({counts.sent})
          </button>
          <button
            onClick={() => setFilter('answered')}
            className={filter === 'answered' ? 'active-tab' : 'tab'}
          >
            Answer Available ({counts.answered})
          </button>
          <button
            onClick={() => setFilter('returned_to_review')}
            className={filter === 'returned_to_review' ? 'active-tab' : 'tab'}
          >
            Returned to Review ({counts.returned})
          </button>
        </div>
        
        {questions.filter(q => q.state === filter).map(q => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
};
```

### 7. Export Screen

**Route**: `/export`

**Purpose**: Configure and download export package

**Key Features**:
- Roadmap: `... → ●Export`
- Context bar visible
- Three states: Ready / Needs Attention / Needs Update
- Clear blockers listed
- Previous package available even after changes
- [Download Accountant Package] / [Download Draft Package] / [Download Previous Package]

(See Export UI States section above for full implementation)

---

## IndexedDB Schema

### Database Structure

```typescript
const db = await openDB('meridian', 1, {
  upgrade(db) {
    // Engagements
    db.createObjectStore('engagements', { keyPath: 'id' });
    
    // Documents
    const docs = db.createObjectStore('documents', { keyPath: 'id' });
    docs.createIndex('engagementId', 'engagementId');
    docs.createIndex('status', 'status');
    
    // Review Items
    const review = db.createObjectStore('reviewItems', { keyPath: 'id' });
    review.createIndex('engagementId', 'engagementId');
    review.createIndex('status', 'status');
    
    // Questions
    const questions = db.createObjectStore('questions', { keyPath: 'id' });
    questions.createIndex('engagementId', 'engagementId');
    questions.createIndex('state', 'state');
    
    // Changes
    const changes = db.createObjectStore('changes', { keyPath: 'id' });
    changes.createIndex('engagementId', 'engagementId');
    changes.createIndex('status', 'status');
    
    // Firms, Clients, Periods
    db.createObjectStore('firms', { keyPath: 'id' });
    db.createObjectStore('clients', { keyPath: 'id' });
    db.createObjectStore('periods', { keyPath: 'id' });
    
    // Accounting Setup
    db.createObjectStore('vendorRules', { keyPath: 'id' });
    db.createObjectStore('categoryMappings', { keyPath: 'id' });
  }
});
```

---

## Help System Architecture

**Location**: Sidebar → Help

**Sections**:
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

**Do not write full help content yet.** Structure only.

```tsx
const Help: React.FC = () => {
  const [section, setSection] = useState('getting-started');
  
  return (
    <div className="flex">
      <div className="help-sidebar w-64 border-r border-[#374151] p-4">
        <h2 className="text-[#F9FAFB] font-semibold mb-4">Help Topics</h2>
        {helpSections.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={section === s.id ? 'active' : ''}
          >
            {s.title}
          </button>
        ))}
      </div>
      
      <div className="help-content flex-1 p-6">
        <HelpContent section={section} />
      </div>
    </div>
  );
};
```

---

## Critical Implementation Requirements

### 1. Bidirectional Navigation

- All workflow screens accessible via roadmap
- Backward navigation ALWAYS allowed
- Forward navigation conditional on completion
- Navigation preserves state
- No loss of work when returning

### 2. Incremental Reprocessing

- Track which documents changed
- Reprocess ONLY affected documents
- Preserve unchanged documents and decisions
- Clear labeling: "Processing X of Y total"
- Bottom note: "X unchanged documents preserved"

### 3. Export Reactivity

- Export status updates automatically when changes detected
- Three states: Ready / Needs Attention / Needs Update
- Show clear blockers when not ready
- Previous package available after changes

### 4. Change Detection

- Track all types of changes (document, category, vendor, etc.)
- Show "pending changes" indicators
- Batch changes into reprocessing queue
- Clear visual feedback

### 5. State Management

- Engagement state machine
- Document state tracking
- Review item state tracking
- Change queue management
- Workflow progress tracking

### 6. Q&A Evidence Model

- **NO "Applied" state**
- Use: "Awaiting Response" / "Answer Available" / "Returned to Review" / "Evidence Added"
- Answers are evidence, not automatic decisions
- Final decisions always in Review

### 7. Roadmap vs Context Bar

- **Two distinct components**
- Roadmap = workflow stage
- Context Bar = engagement context
- Do not confuse them

---

## Testing Checklist

### Correction Loop Flows

- [ ] User can go back to Documents from Review
- [ ] Uploading new files shows incremental processing
- [ ] Old documents preserved when processing new
- [ ] Resolved review items preserved when adding documents
- [ ] Export status updates when changes made
- [ ] Previous export package remains downloadable

### Roadmap Navigation

- [ ] Backward navigation always works
- [ ] Forward navigation blocked when conditions not met
- [ ] Visual states update correctly
- [ ] Hover tooltips show reasons for locked stages
- [ ] Clicking roadmap navigates correctly

### Document Management

- [ ] Context menu shows correct actions based on state
- [ ] Duplicate detection works
- [ ] Better scan replacement works
- [ ] Document states update correctly
- [ ] Fingerprinting prevents exact duplicates

### Review System

- [ ] Exception-based (only shows items needing attention)
- [ ] Evidence displayed clearly
- [ ] Suggestions shown with confidence
- [ ] Reopening decisions works
- [ ] Resolved section collapsible

### Q&A System

- [ ] **No "Applied" state anywhere**
- [ ] State labels correct: "Awaiting Response", "Answer Available", "Returned to Review"
- [ ] Answers added as evidence
- [ ] User makes final decision in Review
- [ ] Question workflow complete

### Export System

- [ ] Three states display correctly
- [ ] Blockers listed clearly
- [ ] Previous package available after changes
- [ ] Export updates reactively

---

## Next Steps

1. **Initial Setup**
   - Create React + TypeScript + Tailwind project
   - Set up React Router
   - Configure IndexedDB
   - Implement color system

2. **Core Components**
   - WorkflowRoadmap component
   - ContextBar component
   - Sidebar navigation
   - Layout wrapper

3. **Screen Implementation** (in order)
   - Home
   - Setup (Firm/Client/Period)
   - Documents
   - Processing
   - Review
   - Q&A
   - Export

4. **State Management**
   - Engagement state machine
   - Document state tracking
   - Change detection
   - Reprocessing queue

5. **Testing**
   - Correction loop flows
   - Roadmap navigation
   - Incremental reprocessing
   - Export reactivity

---

## Source of Truth Files

### Design Authority
- **MERIDIAN_DESIGN_V2_FINAL.md** - Complete design specification with correction loop model, navigation architecture, Q&A states, Help structure, and all system behaviors

### Wireframe Authority
- **MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md** - Key wireframes demonstrating bidirectional workflow, incremental reprocessing, and correction loop patterns

### Implementation Authority
- **CODEX_IMPLEMENTATION_HANDOFF_V2.md** (THIS DOCUMENT) - Complete technical specification with TypeScript interfaces, component code, screen-by-screen implementation guide, IndexedDB schema, and testing checklist

### Supporting References
- MERIDIAN_WORKFLOW_ROADMAP_UPDATE.md - Roadmap component specification
- MERIDIAN_FINAL_WIREFRAMES_WITH_ROADMAP.md - Complete wireframes with roadmap integration

### Superseded Files (DO NOT REFERENCE)
- ❌ MERIDIAN_DESIGN_V1.md
- ❌ MERIDIAN_DESIGN_V2.md
- ❌ MERIDIAN_DESIGN_V2_REVISED.md
- ❌ MERIDIAN_VISUAL_WIREFRAMES.md
- ❌ MERIDIAN_VISUAL_WIREFRAMES_V2.md
- ❌ CODEX_IMPLEMENTATION_HANDOFF_V1.md

**All older V1/V2/revised files are superseded and must not be used for implementation.**

---

## Implementation Status

**Status**: Implementation handoff complete and approved with engine preservation rule

**Ready for**: Codex implementation

**Critical Requirements**:
1. Preserve all existing OCR/processing/automation engines
2. Implement correction loop model as specified
3. Connect existing capabilities to new UI
4. Follow design authorities exactly

**Date**: 2026-05-11 (Final with Engine Preservation)

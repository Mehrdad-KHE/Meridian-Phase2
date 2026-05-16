# Meridian - Workflow Roadmap Update
**Adding persistent visual workflow navigation**

**Date**: 2026-05-11 (Final Refinement)

---

## The Missing Piece: Workflow Roadmap

### Problem
Users currently have:
- Sidebar navigation
- Context bar breadcrumb
- Various Back buttons

But they lack a **clear visual representation** of:
- Where they are in the workflow
- What stages are complete
- What comes next
- How to navigate backward/forward through workflow stages

### Solution: Persistent Workflow Roadmap

Add a **horizontal stepper/roadmap** at the top of all main workflow screens showing:

```
Home → Setup → Documents → Processing → Review → Q&A → Export
```

**With visual indicators:**
- ✓ Completed stages (green)
- ● Current stage (blue, highlighted)
- ○ Upcoming stages (gray)
- Clickable to navigate backward freely
- Forward movement only when conditions met

---

## Workflow Roadmap Design

### Visual Structure - Interlocking Blocks

**Design Concept**: Connected rectangular blocks with triangle notches that interlock, creating a visual flow.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┏━━━━━━━┓    ┏━━━━━━━┓    ┏━━━━━━━━━━┓    ┏━━━━━━━━━━━┓           │
│  ┃  ✓    ┃◥   ┃  ✓    ┃◥   ┃    ●     ┃◥   ┃     ○     ┃◥          │
│  ┃ Home  ┃ ▶  ┃ Setup ┃ ▶  ┃Documents ┃ ▶  ┃Processing ┃ ▶ ...     │
│  ┗━━━━━━━┛    ┗━━━━━━━┛    ┗━━━━━━━━━━┛    ┗━━━━━━━━━━━┛           │
│   green         green         blue            gray                     │
│  completed    completed      current        accessible                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Visual Features:
- Rectangular blocks with rounded corners
- Triangle notch on right side (◥ shape)
- Interlocking connection with next block
- Visual flow left-to-right
- Color-coded by state
- Icons inside blocks (✓ ● ○)
```

### Full Roadmap Visual

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              MERIDIAN WORKFLOW                                      │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ╔════════╗    ╔════════╗    ╔══════════╗    ╔═══════════╗    ╔════════╗       │
│   ║   ✓    ║ ▶  ║   ✓    ║ ▶  ║    ●     ║ ▶  ║     ○     ║ ▶  ║   ○    ║ ▶     │
│   ║ Home   ║    ║ Setup  ║    ║Documents ║    ║Processing ║    ║ Review ║       │
│   ╚════════╝    ╚════════╝    ╚══════════╝    ╚═══════════╝    ╚════════╝       │
│    #10B981       #10B981        #3B82F6          #9CA3AF          #9CA3AF        │
│   completed     completed       CURRENT        accessible        accessible       │
│   (clickable)   (clickable)   (highlighted)    (clickable)      (clickable)      │
│                                                                                     │
│   ╔════════╗    ╔════════╗                                                        │
│   ║        ║ ▶  ║        ║                                                        │
│   ║  Q&A   ║    ║ Export ║                                                        │
│   ╚════════╝    ╚════════╝                                                        │
│    #6B7280       #6B7280                                                          │
│    locked        locked                                                            │
│  (not clickable)(not clickable)                                                   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

Key Visual Elements:
1. Block Shape: Rectangular with triangle notch on right
2. Connection: Triangle from current block points into next block
3. Spacing: Blocks slightly overlap visually to show connection
4. Current State: Larger, bold border, highlighted background
5. Completed: Green fill, checkmark, slightly smaller
6. Accessible: Gray outline, hollow circle, clickable
7. Locked: Muted gray, no icon, grayed text
```

### Detailed Block States

```
COMPLETED BLOCK:
╔════════╗
║   ✓    ║ ▶
║ Label  ║
╚════════╝
- Background: #10B981 (green)
- Border: solid 2px #10B981
- Text: white
- Icon: ✓ checkmark
- Triangle: points right, green
- Clickable: yes
- Hover: slightly lighter green

CURRENT BLOCK:
╔══════════╗
║     ●    ║ ▶
║  Label   ║
╚══════════╝
- Background: #3B82F6 (blue gradient)
- Border: solid 3px #3B82F6
- Text: white, bold
- Icon: ● filled circle
- Triangle: points right, blue, glowing
- Size: 10% larger than others
- Shadow: 0 4px 12px rgba(59,130,246,0.3)
- Clickable: yes (stays current)

ACCESSIBLE BLOCK:
╔════════╗
║   ○    ║ ▶
║ Label  ║
╚════════╝
- Background: transparent
- Border: solid 2px #9CA3AF
- Text: #9CA3AF
- Icon: ○ hollow circle
- Triangle: points right, gray
- Clickable: yes
- Hover: border changes to #3B82F6, text to white

LOCKED BLOCK:
╔════════╗
║        ║
║ Label  ║
╚════════╝
- Background: transparent
- Border: dashed 1px #6B7280
- Text: #6B7280 (muted)
- Icon: none
- Triangle: none (or grayed out)
- Clickable: no
- Cursor: not-allowed
- Hover: tooltip shows "Complete Documents to continue"
```

### Triangle Notch Design

```
Right side of each block has triangle notch:

Block edge:     Triangle points into next block:
┃               ▶  (creates interlocking effect)
┃             ◥
┃           ▶

ASCII representation:
Block 1        Block 2
┏━━━━━┓◥    ┏━━━━━━┓◥
┃     ┃ ▶   ┃      ┃ ▶
┗━━━━━┛     ┗━━━━━━┛

CSS/SVG implementation would use:
- clip-path for triangle cutout
- or SVG path for custom shape
- or border-right with triangle overlay
```

### Roadmap States

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
```

### Stage Definitions

```typescript
const roadmapStages: RoadmapStage[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/',
    clickable: true, // Always clickable
    completionCondition: null // No completion needed
  },
  {
    id: 'setup',
    label: 'Setup',
    route: '/setup/firm', // First step of setup
    clickable: true, // Always clickable to return
    completionCondition: () => {
      return engagement.firm && engagement.client && engagement.period;
    }
  },
  {
    id: 'documents',
    label: 'Documents',
    route: '/documents',
    clickable: true, // Always clickable to add more
    completionCondition: () => {
      return documents.uploaded.length > 0;
    }
  },
  {
    id: 'processing',
    label: 'Processing',
    route: '/processing',
    clickable: true, // Can revisit to see results
    completionCondition: () => {
      return documents.pending === 0 && !processing.inProgress;
    }
  },
  {
    id: 'review',
    label: 'Review',
    route: '/review',
    clickable: true, // Always clickable to reopen decisions
    completionCondition: () => {
      return reviewItems.unresolved === 0;
    }
  },
  {
    id: 'qa',
    label: 'Q&A',
    route: '/accountant-qa',
    clickable: true, // Can check questions anytime
    completionCondition: () => {
      return questions.unanswered === 0;
    }
  },
  {
    id: 'export',
    label: 'Export',
    route: '/export',
    clickable: true, // Can check export status anytime
    completionCondition: null // Export is the end
  }
];
```

### Navigation Rules

**Backward Navigation (always allowed):**
- User can click any previous stage
- Work is preserved
- Current state saved
- No confirmation needed

**Forward Navigation (conditional):**
```
Forward navigation allowed IF:
  - All previous stages completed
  - Current stage completion condition met

Forward navigation blocked IF:
  - Previous stage incomplete
  - Current stage condition not met

Visual Feedback:
  - Allowed: Stage label clickable (blue hover)
  - Blocked: Stage label grayed out, not clickable, shows reason on hover
```

### Visual States

```
Completed Stage:
┌─────────┐
│ ✓ Setup │  ← Green checkmark, clickable
└─────────┘

Current Stage:
┌─────────────┐
│ ● Documents │  ← Blue dot, highlighted background, clickable
└─────────────┘

Accessible Forward Stage:
┌─────────────┐
│ ○ Processing│  ← Hollow circle, clickable if conditions met
└─────────────┘

Locked Forward Stage:
┌─────────────┐
│   Review    │  ← Grayed out, not clickable
└─────────────┘
    ↓
Hover: "Complete current stage to continue"
```

---

## Roadmap Behavior Examples

### Example 1: User in Documents Stage

```
Home → Setup → Documents → Processing → Review → Q&A → Export
 ✓      ✓        ●           ○           ○       ○       ○
click  click   current    can't click yet (no docs processed)
```

**User actions:**
- Can click "Home" → Navigate to home
- Can click "Setup" → Navigate to setup
- Already on "Documents"
- Cannot click "Processing" until documents uploaded
- Cannot click "Review" (too far ahead)

### Example 2: User in Review with Unresolved Items

```
Home → Setup → Documents → Processing → Review → Q&A → Export
 ✓      ✓        ✓           ✓           ●       ○       ○
click  click    click       click      current  locked  locked
```

**User actions:**
- Can click "Documents" → Add more files
- Can click "Processing" → See results
- Already on "Review"
- Cannot click "Export" until review items resolved
- Hover "Export": "Resolve 3 review items to continue"

### Example 3: After Adding Documents in Review

**User is in Review, clicks "Documents":**
```
Step 1: User in Review
Home → Setup → Documents → Processing → Review → Q&A → Export
 ✓      ✓        ✓           ✓           ●       ○       ○

Step 2: User clicks "Documents" (backward navigation - allowed)
Home → Setup → Documents → Processing → Review → Q&A → Export
 ✓      ✓        ●           ✓           ○       ○       ○
                current    completed   accessible

Step 3: User uploads 5 new files
- Documents: 5 pending added
- Status changes to need reprocessing

Step 4: User clicks "Processing" (forward with new files)
Home → Setup → Documents → Processing → Review → Q&A → Export
 ✓      ✓        ✓           ●           ○       ○       ○
                done      current    accessible

Step 5: Processing complete, new exceptions created
- Auto-navigates to Review OR user clicks "Review"

Home → Setup → Documents → Processing → Review → Q&A → Export
 ✓      ✓        ✓           ✓           ●       ○       ○
```

**Key point**: User went backward, added files, processed forward incrementally

---

## Roadmap Integration with Existing Navigation

### What Stays

**Sidebar:**
- Still exists for non-workflow navigation
- Home access
- Accounting Setup
- System / Advanced
- Help

**Context Bar:**
- Still shows: `[Firm] → [Client] → [Period]`
- Still clickable to change context
- Appears below roadmap

### What Changes

**Removed:**
- Large "Back to Home" buttons on every screen
- Excessive local [Back] buttons
- Redundant navigation in workflow

**Primary Navigation:**
- **Roadmap** = Primary workflow navigation
- **Sidebar** = Non-workflow navigation + shortcuts
- **Context Bar** = Engagement context

---

## Screen Layout with Roadmap

### Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│  ┌────────────┐  ┌──────────────────────────────────────┐  │
│  │            │  │  WORKFLOW ROADMAP (horizontal)       │  │
│  │  SIDEBAR   │  │  Home → Setup → Docs → ... → Export  │  │
│  │            │  ├──────────────────────────────────────┤  │
│  │  • Home    │  │  CONTEXT BAR (if in engagement)      │  │
│  │  • Acct    │  │  [Firm] → [Client] → [Period]        │  │
│  │  • System  │  ├──────────────────────────────────────┤  │
│  │  • Help    │  │                                      │  │
│  │            │  │  MAIN CONTENT                        │  │
│  │            │  │                                      │  │
│  │            │  │                                      │  │
│  └────────────┘  └──────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

Hierarchy:
1. Workflow Roadmap (top, workflow navigation)
2. Context Bar (below roadmap, engagement context)
3. Main Content (workflow screen content)
4. Sidebar (left, always visible, auxiliary navigation)
```

---

## Roadmap Component Specification

### Visual Design

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  ✓ Home  →  ✓ Setup  →  ● Documents  →  ○ Processing  →  Review  │
│  #10B981    #10B981       #3B82F6          #9CA3AF       #9CA3AF  │
│  done       done         current          upcoming       locked    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

Colors:
- Completed: #10B981 (green) with checkmark
- Current: #3B82F6 (blue) with dot, highlighted background
- Accessible: #9CA3AF (gray) with hollow circle, clickable
- Locked: #6B7280 (muted gray) with no icon, not clickable

Typography:
- Current stage: 14px, weight 600 (bold)
- Other stages: 14px, weight 400
- Arrow separator: #6B7280

Hover States:
- Clickable stages: Blue underline
- Locked stages: Tooltip explaining why locked
```

### Responsive Behavior

**Desktop (wide screen):**
```
Home → Setup → Documents → Processing → Review → Q&A → Export
```

**Tablet (medium width):**
```
Home → Setup → Docs → Process → Review → Q&A → Export
(shortened labels)
```

**Mobile (narrow):**
```
< Documents > (3/7)
(carousel with indicators)
```

---

## Updated Navigation Pattern

### Primary Workflow Navigation = Roadmap

**Use roadmap for:**
- Moving between workflow stages
- Understanding current progress
- Seeing what's complete
- Checking what's next
- Going back to add/edit

### Sidebar Navigation = Auxiliary

**Use sidebar for:**
- Home (engagement list)
- Accounting Setup (configuration)
- System / Advanced (technical)
- Help (documentation)

### Context Bar = Engagement Context

**Use context bar for:**
- Seeing current engagement
- Changing firm/client/period

---

## Explicit "Go Back and Continue" Flows

### Flow 1: Add Documents from Review

```
User in Review:
┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ✓           ●       ○        │
└────────────────────────────────────────────────────────────┘

User clicks "Documents" in roadmap:
┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ●           ✓           ○       ○        │
└────────────────────────────────────────────────────────────┘

Documents Screen:
- Shows: 32 processed | 0 pending | 0 changed
- Upload area active
- User uploads 5 new files
- Status updates: 32 processed | 5 pending | 0 changed
- Button appears: [Process Pending Documents (5)]

User clicks "Process Pending Documents":
(Option A: Click button, Option B: Click "Processing" in roadmap)

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ●           ○       ○        │
└────────────────────────────────────────────────────────────┘

Processing Screen:
- "Processing new documents (5 of 37 total)"
- Progress bar
- Auto-navigates to Review when done (if new exceptions)

Review Screen (after processing):
┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ✓           ●       ○        │
└────────────────────────────────────────────────────────────┘

- Shows: 8 need attention | 28 resolved | 0 pending
- 2 new items from recent upload
- 6 previous unresolved items still there
- User continues resolving
```

### Flow 2: Replace Document from Export

```
User in Export (Ready state):
┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ✓           ✓       ●        │
└────────────────────────────────────────────────────────────┘

User realizes one document scan is poor, clicks "Documents":

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ●           ✓           ✓       ○        │
└────────────────────────────────────────────────────────────┘

Documents Screen:
- User finds poor document: fuel-receipt-blurry.jpg
- Clicks ⋮ menu → "Replace with Better Scan"
- Uploads fuel-receipt-clear.jpg
- System detects similarity
- Modal: "This appears to be a better scan. Replace previous version?"
- User clicks "Replace"
- Status: 36 processed | 0 pending | 1 changed (replacement)

User clicks "Processing" in roadmap OR clicks [Reprocess Changed Documents]:

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ●           ✓       ○        │
└────────────────────────────────────────────────────────────┘

Processing Screen:
- "Reprocessing replaced document (1 of 37 total)"
- "fuel-receipt-blurry.jpg → fuel-receipt-clear.jpg"
- Process completes
- No new exceptions (replacement successful)
- Export status changes to "Needs Update"

User clicks "Export" in roadmap:

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ✓           ✓       ●        │
└────────────────────────────────────────────────────────────┘

Export Screen:
- Status: "🔄 Needs Update"
- "Changes: 1 document replaced"
- [Reprocess & Update Export]
- [Download Previous Package]
- User clicks "Reprocess & Update Export"
- Processing runs briefly
- Export ready again with updated document
```

### Flow 3: Edit Category, Then Continue

```
User in Documents, changes category:

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ●           ✓           ✓       ○        │
└────────────────────────────────────────────────────────────┘

- Document: receipt-15.pdf [Read]
- User clicks ⋮ → "Change Category"
- Changes: Meals → Office Supplies
- Status: 36 processed | 0 pending | 1 changed
- Export status changes to "Needs Update"

User clicks "Processing" in roadmap:

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ●           ✓       ○        │
└────────────────────────────────────────────────────────────┘

Processing:
- "Reprocessing changed documents (1 of 37 total)"
- "receipt-15.pdf (category changed)"
- Completes quickly (just category update)
- No new exceptions
- Navigates back to Documents automatically

User clicks "Export" in roadmap:

┌────────────────────────────────────────────────────────────┐
│  Home → Setup → Documents → Processing → Review → Export   │
│   ✓      ✓        ✓           ✓           ✓       ●        │
└────────────────────────────────────────────────────────────┘

Export:
- Status: "✓ Ready to Export" (updated)
- Changes processed, no new exceptions
- [Download Accountant Package]
```

---

## Roadmap Advantages

### 1. Clear Mental Model
- User always sees full workflow
- Current position obvious
- Progress visible
- Next steps clear

### 2. Simplified Navigation
- One primary navigation pattern
- No confusion about how to go back
- No excessive buttons
- Cleaner UI

### 3. Workflow Understanding
- Sequential flow obvious
- Completion requirements visible
- Can't skip required steps
- Can always go back

### 4. Flexible Correction
- Easy to return to Documents
- Clear path forward after changes
- Progress preserved
- No dead ends

---

## Implementation Requirements

### Roadmap Component

```typescript
interface WorkflowRoadmapProps {
  stages: RoadmapStage[];
  currentStageId: string;
  engagement: Engagement;
  onStageClick: (stageId: string) => void;
}

const WorkflowRoadmap: React.FC<WorkflowRoadmapProps> = ({
  stages,
  currentStageId,
  engagement,
  onStageClick
}) => {
  const canNavigateToStage = (stage: RoadmapStage): boolean => {
    // Can always go backward
    const currentIndex = stages.findIndex(s => s.id === currentStageId);
    const targetIndex = stages.findIndex(s => s.id === stage.id);
    
    if (targetIndex < currentIndex) {
      return true; // Backward navigation allowed
    }
    
    // Forward navigation requires completion
    if (targetIndex === currentIndex) {
      return true; // Can click current stage
    }
    
    // Check if all previous stages complete
    for (let i = currentIndex; i < targetIndex; i++) {
      const prevStage = stages[i];
      if (prevStage.completionCondition && !prevStage.completionCondition()) {
        return false;
      }
    }
    
    return true;
  };

  const getStageState = (stage: RoadmapStage): RoadmapStageState => {
    const currentIndex = stages.findIndex(s => s.id === currentStageId);
    const stageIndex = stages.findIndex(s => s.id === stage.id);
    
    if (stageIndex < currentIndex) {
      return 'completed';
    }
    
    if (stageIndex === currentIndex) {
      return 'current';
    }
    
    if (canNavigateToStage(stage)) {
      return 'accessible';
    }
    
    return 'locked';
  };

  return (
    <div className="workflow-roadmap">
      {stages.map((stage, index) => (
        <React.Fragment key={stage.id}>
          <RoadmapStage
            stage={stage}
            state={getStageState(stage)}
            clickable={canNavigateToStage(stage)}
            onClick={() => canNavigateToStage(stage) && onStageClick(stage.id)}
          />
          {index < stages.length - 1 && (
            <span className="separator">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
```

### State Tracking

```typescript
// Track workflow progress
interface WorkflowProgress {
  completedStages: string[];
  currentStage: string;
  accessibleStages: string[];
}

// Update on stage completion
const markStageComplete = (stageId: string) => {
  if (!workflowProgress.completedStages.includes(stageId)) {
    workflowProgress.completedStages.push(stageId);
  }
};

// Check stage accessibility
const isStageAccessible = (stageId: string): boolean => {
  const stage = roadmapStages.find(s => s.id === stageId);
  if (!stage) return false;
  
  // Always can go backward
  const currentIndex = getCurrentStageIndex();
  const targetIndex = getStageIndex(stageId);
  if (targetIndex <= currentIndex) return true;
  
  // Forward requires completion
  return stage.completionCondition ? stage.completionCondition() : true;
};
```

---

## Updated Files Needed

1. **MERIDIAN_DESIGN_V2_FINAL.md** → Update with roadmap specification
2. **MERIDIAN_WIREFRAMES_CORRECTION_LOOP.md** → Update with roadmap visuals
3. Create clear "go back and continue" flow diagrams

---

**Status**: Roadmap design complete, ready to update main documents

**Next**: Update design doc and wireframes with roadmap integration

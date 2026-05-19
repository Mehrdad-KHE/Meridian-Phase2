# Meridian - Workflow Roadmap Component
**Interlocking Arrow-Block Visual Design**

**Date**: 2026-05-12

**Purpose**: Define the exact visual appearance and behavior of the workflow roadmap component

---

## Visual Design Concept

The roadmap uses **interlocking arrow-block steps** where each block connects to the next like puzzle pieces.

**Not this** (separate blocks):
```
[Home] → [Setup] → [Documents]
```

**But this** (interlocking):
```
[Home ▶]◀[Setup ▶]◀[Documents ▶]
```

Each block has:
- Rectangular body
- Triangle/arrow point on right side (▶)
- Matching inward notch on left side (◀)
- Visual connection where right arrow of one block fits into left notch of next

---

## Desktop Version - Full Roadmap

### Default Layout

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                              WORKFLOW ROADMAP                                              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                                            ┃
┃   ╔════════╗     ╔════════╗     ╔═══════════╗     ╔═══════════╗     ╔════════╗          ┃
┃   ║   ✓    ║▶   ◀║   ✓    ║▶   ◀║     ●     ║▶   ◀║     ○     ║▶   ◀║        ║▶         ┃
┃   ║ Home   ║     ║ Setup  ║     ║ Documents ║     ║Processing ║     ║ Review ║          ┃
┃   ╚════════╝     ╚════════╝     ╚═══════════╝     ╚═══════════╝     ╚════════╝          ┃
┃    #10B981       #10B981          #3B82F6           #4B5563          #6B7280             ┃
┃   Completed     Completed         CURRENT          Accessible        Locked              ┃
┃                                                                                            ┃
┃                 ╔════════╗     ╔════════╗                                                 ┃
┃                ◀║        ║▶   ◀║        ║                                                 ┃
┃                 ║  Q&A   ║     ║ Export ║                                                 ┃
┃                 ╚════════╝     ╚════════╝                                                 ┃
┃                  #6B7280        #6B7280                                                   ┃
┃                  Locked          Locked                                                    ┃
┃                                                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Visual Elements:
- Each block has: ║ body ║▶ (right arrow)
- Next block has: ◀║ body ║▶ (left notch + right arrow)
- Arrow from previous block visually "locks into" notch of next block
- Current step (Documents) is larger and has blue glow
- Icons: ✓ (completed), ● (current), ○ (accessible), blank (locked)
```

---

## Block State Examples

### 1. Completed Step (Green)

```
╔════════╗
║   ✓    ║▶
║ Label  ║
╚════════╝
#10B981 (green)

Visual Properties:
- Background: solid #10B981
- Border: 2px solid #10B981
- Text: white, 14px, weight 500
- Icon: ✓ white checkmark, 16px
- Arrow: solid green triangle, points right
- Shadow: none
- Hover: cursor pointer, slightly brighter (#059669)
- Click: Navigate to that stage
```

### 2. Current Step (Blue, Highlighted)

```
╔═══════════╗
║     ●     ║▶
║  CURRENT  ║
╚═══════════╝
#3B82F6 (blue)

Visual Properties:
- Background: solid #3B82F6 or gradient
- Border: 3px solid #2563EB (darker blue)
- Text: white, 14px, weight 600 (bold)
- Icon: ● white filled circle, 12px
- Arrow: solid blue triangle with glow
- Shadow: 0 4px 12px rgba(59, 130, 246, 0.4)
- Size: 10-15% larger than other blocks
- Glow: subtle blue glow around entire block
- Animation: gentle pulse (optional)
- Hover: cursor pointer (stays current)
- Click: Stays on current stage (no navigation)
```

### 3. Accessible Step (Dark/Neutral)

```
╔════════╗
║   ○    ║▶
║ Label  ║
╚════════╝
#4B5563 (slate)

Visual Properties:
- Background: solid #4B5563 or transparent with border
- Border: 2px solid #4B5563
- Text: #D1D5DB (light gray), 14px, weight 500
- Icon: ○ hollow circle, 12px
- Arrow: solid slate triangle
- Shadow: none
- Hover: cursor pointer, border changes to #3B82F6, text to white
- Click: Navigate to that stage (forward progression)
```

### 4. Locked Step (Muted Gray)

```
╔════════╗
║        ║▷
║ Label  ║
╚════════╝
#6B7280 (gray)

Visual Properties:
- Background: transparent or very dark (#1A1F28)
- Border: 1px dashed #6B7280
- Text: #6B7280 (muted), 14px, weight 400
- Icon: none (or very faint lock icon)
- Arrow: dashed gray outline triangle (▷ hollow)
- Shadow: none
- Hover: cursor not-allowed
- Tooltip: "Complete Documents to continue" or specific blocker
- Click: Disabled (no navigation)
```

### 5. Needs Attention Step (Amber Badge)

```
╔════════╗  ⚠ 6
║   ○    ║▶
║ Review ║
╚════════╝
#4B5563 + #F59E0B badge

Visual Properties:
- Same as Accessible Step
- Badge: small amber circle with number
  - Position: top-right corner of block
  - Background: #F59E0B (amber)
  - Text: white, 10px, weight 600
  - Size: 20px diameter
  - Shadow: 0 2px 4px rgba(0,0,0,0.2)
- Badge Examples:
  - "6" (6 items need attention)
  - "⚠" (warning icon only)
  - "Update" (text badge)
```

---

## Interlocking Connection Detail

### How Blocks Connect

```
Block 1 connects to Block 2:

╔════════╗     ╔════════╗
║ Label1 ║▶   ◀║ Label2 ║▶
╚════════╝     ╚════════╝
         ↑     ↑
         └──┬──┘
            Connection point:
            Right arrow of Block 1
            fits into left notch of Block 2
```

### Visual Connection Styles

**Option A: Overlapping** (Recommended)
```
Block edges overlap slightly:

╔═══════╗
║ Home  ║▶══╗
╚═══════╝   ║
         ╔══╝
        ◀║ Setup ║▶
         ╚═══════╝

Overlap: 8-12px
Visual effect: blocks "lock" together
```

**Option B: Touching**
```
Blocks touch at arrow/notch:

╔═══════╗╔═══════╗
║ Home  ║║ Setup ║
╚═══════╝╚═══════╝

Simpler but less visual connection
```

**Recommended**: Use Option A (overlapping) for stronger visual connection

---

## Roadmap with Context Bar Below

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                        WORKFLOW ROADMAP                             ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                     ┃
┃  ╔════╗    ╔════╗    ╔═══════╗    ╔════════╗    ╔══════╗          ┃
┃  ║ ✓  ║▶  ◀║ ✓  ║▶  ◀║   ●   ║▶  ◀║   ○    ║▶  ◀║      ║▶  ...   ┃
┃  ║Home║    ║Setup║   ║  Docs ║    ║Process ║    ║Review║          ┃
┃  ╚════╝    ╚════╝    ╚═══════╝    ╚════════╝    ╚══════╝          ┃
┃   green     green       blue        slate         locked           ┃
┃                                                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                        CONTEXT BAR                                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  Northpeak Accounting  →  Daniel Roberts  →  2025 Annual       ┃
┃  #1A1F28 background, #F9FAFB text                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Spacing:
- Roadmap: 12px padding top/bottom
- Context Bar: 8px padding top/bottom
- Gap between: 0px (touching borders)
```

---

## Badge Placement Examples

### Review with 6 Items

```
╔══════════╗  ⚠ 6
║    ○     ║▶
║  Review  ║
╚══════════╝

Badge Position:
- Top-right corner
- 4px from top edge
- 4px from right edge (before arrow)
- Amber background #F59E0B
- White text "6"
- Font: 10px bold
```

### Export Needs Update

```
╔══════════╗  🔄
║    ○     ║▶
║  Export  ║
╚══════════╝

Badge:
- Blue refresh icon 🔄
- Or text "Update"
- Position: same as above
```

### Q&A Awaiting Response

```
╔══════════╗  2
║    ○     ║▶
║   Q&A    ║
╚══════════╝

Badge:
- Number of unanswered questions
- Amber #F59E0B
```

---

## Responsive Behavior

### Desktop (Wide Screen)

```
Full labels, all steps visible:

Home → Setup → Documents → Processing → Review → Q&A → Export
```

### Tablet (Medium Width)

```
Shorter labels:

Home → Setup → Docs → Process → Review → Q&A → Export
```

### Mobile (Narrow Screen)

**Option A: Horizontal Scroll**
```
Scrollable container, swipe left/right:

[visible area]
╔════╗  ╔════╗  ╔═══════╗  ╔═══════
║ ✓  ║▶◀║ ✓  ║▶◀║   ●   ║▶◀║   ○  →
║Home║  ║Setup║  ║ Docs  ║  ║Proces
╚════╝  ╚════╝  ╚═══════╝  ╚═══════

User can swipe to see more
Current step always centered
```

**Option B: Dropdown Current Step** (Alternative)
```
Mobile shows only current step in dropdown:

┌──────────────────────────┐
│ Current: Documents   ▼   │
└──────────────────────────┘

Tap to see all steps:
┌──────────────────────────┐
│ ✓ Home                   │
│ ✓ Setup                  │
│ ● Documents (current)    │
│ ○ Processing             │
│   Review                 │
│   Q&A                    │
│   Export                 │
└──────────────────────────┘
```

**Recommended**: Use Option A (horizontal scroll) to maintain visual consistency

---

## Detailed State Specifications

### State 1: All Steps Locked (Start of Engagement)

```
╔════╗    ╔═════╗    ╔═══════╗    ╔════════╗    ╔══════╗    ╔═══╗    ╔══════╗
║    ║▷  ◀║     ║▷  ◀║       ║▷  ◀║        ║▷  ◀║      ║▷  ◀║   ║▷  ◀║      ║
║Home║    ║Setup║    ║ Docs  ║    ║Process ║    ║Review║    ║Q&A║    ║Export║
╚════╝    ╚═════╝    ╚═══════╝    ╚════════╝    ╚══════╝    ╚═══╝    ╚══════╝
gray       gray       gray         gray          gray        gray     gray

All locked except Home (always accessible)
```

### State 2: Setup Complete, Documents Active

```
╔════╗    ╔═════╗    ╔═══════╗    ╔════════╗    ╔══════╗    ╔═══╗    ╔══════╗
║ ✓  ║▶  ◀║  ✓  ║▶  ◀║   ●   ║▶  ◀║   ○    ║▷  ◀║      ║▷  ◀║   ║▷  ◀║      ║
║Home║    ║Setup║    ║ Docs  ║    ║Process ║    ║Review║    ║Q&A║    ║Export║
╚════╝    ╚═════╝    ╚═══════╝    ╚════════╝    ╚══════╝    ╚═══╝    ╚══════╝
green      green      BLUE         accessible   locked      locked   locked
click      click      current      (if docs     (no docs    (no      (not
back       back       (here)       uploaded)    processed)  questions) ready)

Hover on Processing:
- If docs uploaded: "Click to process documents"
- If no docs: "Upload documents first" (locked)
```

### State 3: Review Needs Attention

```
╔════╗    ╔═════╗    ╔═══════╗    ╔════════╗    ╔══════╗  ⚠ 6    ╔═══╗    ╔══════╗
║ ✓  ║▶  ◀║  ✓  ║▶  ◀║   ✓   ║▶  ◀║   ✓    ║▶  ◀║  ●   ║▶      ◀║   ║▷  ◀║      ║
║Home║    ║Setup║    ║ Docs  ║    ║Process ║    ║Review║          ║Q&A║    ║Export║
╚════╝    ╚═════╝    ╚═══════╝    ╚════════╝    ╚══════╝          ╚═══╝    ╚══════╝
green      green      green        green         BLUE             gray     locked
                                                  current          (no Q)   (6 items
                                                  6 items need              unresolved)
                                                  attention

Amber badge "6" shows count of unresolved items
Export locked until Review complete
```

### State 4: Export Ready

```
╔════╗    ╔═════╗    ╔═══════╗    ╔════════╗    ╔══════╗    ╔═══╗    ╔══════╗  ✓
║ ✓  ║▶  ◀║  ✓  ║▶  ◀║   ✓   ║▶  ◀║   ✓    ║▶  ◀║  ✓   ║▶  ◀║ ✓ ║▶  ◀║  ●   ║
║Home║    ║Setup║    ║ Docs  ║    ║Process ║    ║Review║    ║Q&A║    ║Export║
╚════╝    ╚═════╝    ╚═══════╝    ╚════════╝    ╚══════╝    ╚═══╝    ╚══════╝
green      green      green        green         green       green    BLUE
                                                                       current
                                                                       Ready ✓

Green checkmark badge on Export shows "Ready"
All previous steps completed
```

### State 5: Export Needs Update (After Changes)

```
╔════╗    ╔═════╗    ╔═══════╗  +5    ╔════════╗    ╔══════╗    ╔═══╗    ╔══════╗  🔄
║ ✓  ║▶  ◀║  ✓  ║▶  ◀║   ✓   ║▶     ◀║   ✓    ║▶  ◀║  ✓   ║▶  ◀║ ✓ ║▶  ◀║  ○   ║
║Home║    ║Setup║    ║ Docs  ║        ║Process ║    ║Review║    ║Q&A║    ║Export║
╚════╝    ╚═════╝    ╚═══════╝        ╚════════╝    ╚══════╝    ╚═══╝    ╚══════╝
green      green      green           green         green       green    accessible
                      badge: +5                                           blue refresh
                      new docs                                            badge

Documents badge "+5" shows 5 new documents added
Export badge "🔄" shows needs update
Export accessible but not current (user in Review)
```

---

## Hover States and Tooltips

### Completed Step Hover

```
Before hover:
╔════╗
║ ✓  ║▶
║Home║
╚════╝

On hover:
╔════╗  ← Click to return to Home
║ ✓  ║▶
║Home║
╚════╝
Cursor: pointer
Effect: slight brightness increase
Tooltip: "Click to return to Home"
```

### Locked Step Hover

```
Before hover:
╔══════╗
║      ║▷
║Export║
╚══════╝

On hover:
╔══════╗  ⚠ Resolve 6 review items first
║      ║▷
║Export║
╚══════╝
Cursor: not-allowed
Tooltip: "Resolve 6 review items first"
Or: "Complete Documents to continue"
Or: "Upload documents first"

Tooltip shows specific blocker
```

### Accessible Step Hover

```
Before hover:
╔════════╗
║   ○    ║▶
║Process ║
╚════════╝
#4B5563 slate

On hover:
╔════════╗
║   ○    ║▶  ← Click to process documents
║Process ║
╚════════╝
Border: #3B82F6 (blue)
Text: white
Cursor: pointer
```

---

## Implementation Notes

### CSS/SVG Structure

```css
.roadmap-block {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  border: 2px solid;
  border-radius: 6px 0 0 6px; /* rounded on left only */
  position: relative;
  margin-right: -12px; /* overlap for interlocking */
}

.roadmap-block::after {
  /* Right arrow */
  content: '';
  position: absolute;
  right: -12px;
  width: 0;
  height: 0;
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  border-left: 12px solid currentColor;
}

.roadmap-block::before {
  /* Left notch */
  content: '';
  position: absolute;
  left: 0;
  width: 12px;
  height: 48px;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
}

.roadmap-block.completed {
  background: #10B981;
  border-color: #10B981;
  color: white;
}

.roadmap-block.current {
  background: #3B82F6;
  border-color: #2563EB;
  border-width: 3px;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transform: scale(1.1);
  z-index: 10;
}

.roadmap-block.accessible {
  background: #4B5563;
  border-color: #4B5563;
  color: #D1D5DB;
  cursor: pointer;
}

.roadmap-block.accessible:hover {
  border-color: #3B82F6;
  color: white;
}

.roadmap-block.locked {
  background: transparent;
  border: 1px dashed #6B7280;
  color: #6B7280;
  cursor: not-allowed;
}

.roadmap-badge {
  position: absolute;
  top: -8px;
  right: 4px;
  background: #F59E0B;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

### React Component Example

```typescript
interface RoadmapBlockProps {
  label: string;
  state: 'completed' | 'current' | 'accessible' | 'locked';
  badge?: string | number;
  onClick?: () => void;
  tooltip?: string;
}

const RoadmapBlock: React.FC<RoadmapBlockProps> = ({
  label,
  state,
  badge,
  onClick,
  tooltip
}) => {
  const icon = {
    completed: '✓',
    current: '●',
    accessible: '○',
    locked: ''
  }[state];

  return (
    <div
      className={`roadmap-block ${state}`}
      onClick={state !== 'locked' ? onClick : undefined}
      title={tooltip}
    >
      {badge && <span className="roadmap-badge">{badge}</span>}
      <span className="roadmap-icon">{icon}</span>
      <span className="roadmap-label">{label}</span>
    </div>
  );
};
```

---

## Visual Summary

### Key Visual Elements

1. **Interlocking Connection**: Right arrow of each block visually locks into left notch of next
2. **State Colors**: Green (done), Blue (current), Slate (accessible), Gray (locked)
3. **Icons**: ✓ ● ○ (clear state indication)
4. **Badges**: Amber circles for attention, counts, warnings
5. **Current Highlight**: Larger, glowing, bold border
6. **Hover Effects**: Color changes, tooltips, cursor changes
7. **Responsive**: Horizontal scroll on mobile, maintains visual design

### Visual Hierarchy

```
Most Prominent:
  Current step (blue, large, glowing)
  ↓
Clear Status:
  Completed (green checkmarks)
  ↓
Available Actions:
  Accessible steps (neutral, hoverable)
  ↓
Least Prominent:
  Locked steps (muted, dashed)
```

---

## Complete Example States

### Example 1: Mid-Workflow (Documents Complete, Review Active)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                           WORKFLOW ROADMAP                                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                           ┃
┃  ╔════╗    ╔═════╗    ╔═══════╗    ╔════════╗    ╔══════╗  ⚠ 6          ┃
┃  ║ ✓  ║▶  ◀║  ✓  ║▶  ◀║   ✓   ║▶  ◀║   ✓    ║▶  ◀║  ●   ║▶              ┃
┃  ║Home║    ║Setup║    ║ Docs  ║    ║Process ║    ║Review║                ┃
┃  ╚════╝    ╚═════╝    ╚═══════╝    ╚════════╝    ╚══════╝                ┃
┃  #10B981   #10B981    #10B981      #10B981       #3B82F6                 ┃
┃  (click    (click     (click       (click        CURRENT                 ┃
┃   back)     back)      back)        back)        6 items                 ┃
┃                                                                           ┃
┃            ╔═══╗    ╔══════╗                                             ┃
┃           ◀║   ║▷  ◀║      ║                                             ┃
┃            ║Q&A║    ║Export║                                             ┃
┃            ╚═══╝    ╚══════╝                                             ┃
┃            #6B7280   #6B7280                                             ┃
┃            Locked    Locked                                               ┃
┃            (no Qs)   (review incomplete)                                  ┃
┃                                                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

User can:
- Click Home, Setup, Docs, or Process to go back
- See they're in Review (current, blue)
- See 6 items need attention (amber badge)
- See Q&A and Export are locked (can't proceed yet)
- Hover Export to see: "Resolve 6 review items first"
```

### Example 2: Ready to Export

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                           WORKFLOW ROADMAP                                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                           ┃
┃  ╔════╗    ╔═════╗    ╔═══════╗    ╔════════╗    ╔══════╗    ╔═══╗     ┃
┃  ║ ✓  ║▶  ◀║  ✓  ║▶  ◀║   ✓   ║▶  ◀║   ✓    ║▶  ◀║  ✓   ║▶  ◀║ ✓ ║▶    ┃
┃  ║Home║    ║Setup║    ║ Docs  ║    ║Process ║    ║Review║    ║Q&A║      ┃
┃  ╚════╝    ╚═════╝    ╚═══════╝    ╚════════╝    ╚══════╝    ╚═══╝      ┃
┃                                                                           ┃
┃                      ╔══════╗  ✓                                         ┃
┃                     ◀║  ●   ║                                            ┃
┃                      ║Export║                                            ┃
┃                      ╚══════╝                                            ┃
┃                      #3B82F6                                             ┃
┃                      CURRENT                                              ┃
┃                      Ready ✓                                              ┃
┃                                                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

All steps complete (green checkmarks)
Export current with green "Ready ✓" badge
User can go back to any previous step if needed
```

---

**Status**: Workflow Roadmap Component visual specification complete

**Implementation Ready**: Yes - exact visual design specified

**Codex Guidance**: Do not redesign - implement as specified with interlocking arrow blocks

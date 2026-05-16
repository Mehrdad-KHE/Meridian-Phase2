# WorkflowRoadmap Visual State Examples

**Date**: 2026-05-12

---

## Live Examples by Current Stage

### 1. On Documents Screen

```
Roadmap visualization:

┌─────────┐   ›   ┌──────────┐   ›   ┌─────────────┐   ›   ┌────────────┐   ›   ┌────────┐   ›   ┌─────┐   ›   ┌────────┐
│ ✓ Home  │       │ ✓ Setup  │       │ ● Documents │       │ 🔒 Processing│       │ 🔒 Review│       │ 🔒 Q&A│       │ 🔒 Export│
└─────────┘       └──────────┘       └─────────────┘       └────────────┘       └────────┘       └─────┘       └────────┘
  green            green               blue                   gray                gray            gray           gray
  tinted           tinted              solid                  muted               muted           muted          muted
  ✓ icon           ✓ icon              • icon                🔒 icon             🔒 icon         🔒 icon        🔒 icon
  clickable        clickable           current               locked              locked          locked         locked

Chevrons:
  green/40         green/40            blue/60               gray                gray            gray
  (subtle)         (subtle)            (soft)                (neutral)           (neutral)       (neutral)
```

**State breakdown**:
- **Home**: Completed (green tint, check icon, clickable)
- **Setup**: Completed (green tint, check icon, clickable)
- **Documents**: Current (blue solid, dot icon, emphasized)
- **Processing**: Locked (gray, lock icon, "Upload documents first" tooltip)
- **Review**: Locked (gray, lock icon, "Process documents first" tooltip)
- **Q&A**: Locked (gray, lock icon, "Complete review first" tooltip)
- **Export**: Locked (gray, lock icon, "Resolve review items first" tooltip)

---

### 2. On Review Screen (with attention badge)

```
Roadmap visualization:

┌─────────┐   ›   ┌──────────┐   ›   ┌─────────────┐   ›   ┌─────────────┐   ›   ┌─────────┐   ›   ┌─────┐   ›   ┌────────┐
│ ✓ Home  │       │ ✓ Setup  │       │ ✓ Documents │       │ ✓ Processing│       │ ● Review│       │ 🔒 Q&A│       │ 🔒 Export│
└─────────┘       └──────────┘       └─────────────┘       └─────────────┘       └────⁶────┘       └─────┘       └────────┘
  green            green               green                 green                 blue            gray           gray
  tinted           tinted              tinted                tinted                solid           muted          muted
  ✓ icon           ✓ icon              ✓ icon                ✓ icon                • icon          🔒 icon        🔒 icon
  clickable        clickable           clickable             clickable             current         locked         locked
                                                                                   [6 badge]

Chevrons:
  green/40         green/40            green/40              green/40              blue/60         gray
```

**State breakdown**:
- **Home**: Completed (clickable back to home)
- **Setup**: Completed (clickable to revisit setup)
- **Documents**: Completed (clickable to add more documents)
- **Processing**: Completed (clickable to reprocess)
- **Review**: Current (emphasized, has badge showing 6 items need attention)
- **Q&A**: Locked (not accessible until review complete)
- **Export**: Locked (not accessible until review complete)

**Badge detail**:
```
   ╭─╮
  │ 6 │  ← Amber circle (#F59E0B)
   ╰─╯     White text, 9px bold
           Ring separation from stage
           -4px top, -4px right
```

---

### 3. On Setup/Firm Screen

```
Roadmap visualization:

┌─────────┐   ›   ┌─────────┐   ›   ┌─────────────┐   ›   ┌────────────┐   ›   ┌────────┐   ›   ┌─────┐   ›   ┌────────┐
│ ✓ Home  │       │ ● Setup │       │ 🔒 Documents│       │ 🔒 Processing│       │ 🔒 Review│       │ 🔒 Q&A│       │ 🔒 Export│
└─────────┘       └─────────┘       └─────────────┘       └────────────┘       └────────┘       └─────┘       └────────┘
  green            blue                gray                  gray                 gray            gray           gray
  tinted           solid               muted                 muted                muted           muted          muted
  ✓ icon           • icon              🔒 icon               🔒 icon              🔒 icon         🔒 icon        🔒 icon
  clickable        current             locked                locked               locked          locked         locked

Chevrons:
  green/40         blue/60             gray                  gray                 gray            gray
```

**State breakdown**:
- **Home**: Completed (can return home)
- **Setup**: Current (on setup flow)
- **Documents**: Locked ("Complete setup first" tooltip)
- **Processing**: Locked ("Upload documents first" tooltip)
- **Review**: Locked ("Process documents first" tooltip)
- **Q&A**: Locked ("Complete review first" tooltip)
- **Export**: Locked ("Resolve review items first" tooltip)

---

### 4. On Export Screen (final stage)

```
Roadmap visualization:

┌─────────┐   ›   ┌──────────┐   ›   ┌─────────────┐   ›   ┌─────────────┐   ›   ┌─────────┐   ›   ┌────────┐   ›   ┌─────────┐
│ ✓ Home  │       │ ✓ Setup  │       │ ✓ Documents │       │ ✓ Processing│       │ ✓ Review│       │ ✓ Q&A  │       │ ● Export│
└─────────┘       └──────────┘       └─────────────┘       └─────────────┘       └─────────┘       └────────┘       └─────────┘
  green            green               green                 green                 green           green            blue
  tinted           tinted              tinted                tinted                tinted          tinted           solid
  ✓ icon           ✓ icon              ✓ icon                ✓ icon                ✓ icon          ✓ icon           • icon
  clickable        clickable           clickable             clickable             clickable       clickable        current

Chevrons:
  green/40         green/40            green/40              green/40              green/40        green/40
```

**State breakdown**:
- **All previous stages**: Completed (all clickable to revisit)
- **Export**: Current (final stage, ready to export)
- **Visual**: Complete green trail leading to current blue stage

**Perfect state**: All work done, ready to export

---

## Hover State Examples

### Hovering Over Completed Stage (Home)

**Before hover**:
```
┌─────────┐
│ ✓ Home  │  ← Background: #10B981/10 (10% green)
└─────────┘    Border: #10B981/40 (40% green)
```

**During hover**:
```
┌─────────┐
│ ✓ Home  │  ← Background: #10B981/20 (20% green - brighter)
└─────────┘    Border: #10B981/60 (60% green - stronger)
               Cursor: pointer
               Transition: 200ms smooth
```

### Hovering Over Accessible Stage (Future Stage)

**Before hover**:
```
┌────────────┐
│ ○ Processing│  ← Background: #252C37 (dark gray)
└────────────┘    Border: #374151 (medium gray)
                  Text: #9CA3AF (medium gray)
```

**During hover**:
```
┌────────────┐
│ ○ Processing│  ← Background: #252C37 (unchanged)
└────────────┘    Border: #4B5563 (lighter gray)
                  Text: #D1D5DB (lighter gray)
                  Cursor: pointer
                  Transition: 200ms smooth
```

### Hovering Over Locked Stage

**No hover state change**:
```
┌────────┐
│ 🔒 Export│  ← No background change
└────────┘    No border change
              Cursor: not-allowed
              Tooltip appears: "Resolve review items first"
```

### Hovering Over Current Stage

**No hover state change**:
```
┌─────────────┐
│ ● Documents │  ← Already emphasized
└─────────────┘    No additional hover effect needed
                   Cursor: default (not clickable to self)
```

---

## Color Reference Chart

### Completed State Colors
```
Background:     #10B981 at 10% opacity  ██ (very light green tint)
Border:         #10B981 at 40% opacity  ██ (visible green outline)
Text:           #10B981                 ██ (solid green)
Icon:           #10B981                 ██ (solid green check)
Hover BG:       #10B981 at 20% opacity  ██ (brighter tint)
Hover Border:   #10B981 at 60% opacity  ██ (stronger outline)
```

### Current State Colors
```
Background:     #3B82F6                 ██ (solid blue)
Border:         #3B82F6                 ██ (solid blue)
Text:           #FFFFFF                 ██ (white)
Icon:           #FFFFFF                 ██ (white dot)
Ring Shadow:    #3B82F6 at 12% opacity  ░░ (subtle glow)
```

### Accessible State Colors
```
Background:     #252C37                 ██ (dark slate)
Border:         #374151                 ██ (medium slate)
Text:           #9CA3AF                 ██ (medium gray)
Icon:           #4B5563                 ██ (darker gray dot)
Hover Border:   #4B5563                 ██ (lighter slate)
Hover Text:     #D1D5DB                 ██ (light gray)
```

### Locked State Colors
```
Background:     #1A1F28                 ██ (very dark, matches app)
Border:         #2D3748                 ██ (subtle outline)
Text:           #4B5563                 ██ (muted gray)
Icon:           #4B5563                 ██ (muted gray lock)
```

### Badge Colors
```
Background:     #F59E0B                 ██ (amber)
Text:           #FFFFFF                 ██ (white)
Ring:           #1A1F28                 ██ (dark separation)
```

### Chevron Colors
```
After Completed: #10B981 at 40%         ░░ (subtle green)
After Current:   #3B82F6 at 60%         ░░ (soft blue)
After Other:     #374151                ██ (neutral gray)
```

---

## Spacing Measurements

```
Container padding:
├─ Vertical: 16px (py-4)
└─ Horizontal: 24px (px-6)

Stage pill padding:
├─ Default: 16px horizontal × 8px vertical (px-4 py-2)
└─ Current: 20px horizontal × 10px vertical (px-5 py-2.5)

Gap between elements:
├─ Stage to Chevron: 8px (gap-2)
└─ Chevron to Stage: 8px (gap-2)

Badge positioning:
├─ Top: -4px (absolute)
├─ Right: -4px (absolute)
└─ Size: 16px × 16px

Border width:
└─ All states: 2px (border-2)

Border radius:
└─ Pill shape: 9999px (rounded-full)

Icon sizes:
├─ Check: 14px
├─ Lock: 12px
├─ Dot: 2px diameter
└─ Chevron: 16px
```

---

## Typography Measurements

```
Stage label:
├─ Font size: 14px (text-sm)
├─ Font weight: 500 (font-medium) or 600 (font-semibold for current)
├─ Line height: 20px (default)
└─ Whitespace: nowrap (no wrapping)

Badge number:
├─ Font size: 9px
├─ Font weight: 700 (bold)
└─ Line height: 1 (tight)
```

---

## Shadow Specifications

### Current Stage Ring Shadow
```
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);

Breakdown:
├─ X offset: 0 (centered)
├─ Y offset: 0 (centered)
├─ Blur: 0 (sharp ring)
├─ Spread: 3px (ring thickness)
└─ Color: #3B82F6 at 12% opacity (subtle blue)
```

### Badge Shadow
```
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

Breakdown:
├─ X offset: 0
├─ Y offset: 1px (slight drop)
├─ Blur: 2px (soft)
└─ Color: Black at 10% opacity (subtle)
```

---

## Transition Specifications

```
All interactive states:
transition: all 200ms ease-in-out;

Applies to:
├─ Background color changes (hover)
├─ Border color changes (hover)
├─ Text color changes (hover)
└─ Chevron color changes (progression)

No transition on:
├─ Current stage emphasis (instant)
└─ Badge appearance (instant)
```

---

## Responsive Behavior

### Desktop (1024px+)
```
All stages visible in single row
No horizontal scroll needed
Full labels visible
Comfortable spacing
```

### Tablet (768px - 1023px)
```
Stages may require horizontal scroll
All labels still visible
Touch targets adequate (44px+ height)
Horizontal scroll with hidden scrollbar
```

### Mobile (< 768px)
```
Horizontal scroll required
Stages maintain full size (no shrinking)
Touch targets generous (44px+ height)
Swipe to reveal locked stages
Hidden scrollbar for cleaner appearance
```

---

## Accessibility Features

### Color Contrast
```
✓ Completed text on tinted background: 4.5:1+ (WCAG AA)
✓ Current white text on blue: 4.5:1+ (WCAG AA)
✓ Accessible text on dark background: 4.5:1+ (WCAG AA)
✓ Locked text on dark background: Intentionally muted but readable
```

### Icon Semantics
```
✓ Check icon: Universal "completed" symbol
✓ Lock icon: Universal "unavailable" symbol
✓ Dot icon: Neutral position marker
✓ Chevron: Universal "forward/next" symbol
```

### Keyboard Navigation
```
✓ Tab through clickable stages
✓ Skip locked stages (not in tab order)
✓ Enter/Space to activate stage navigation
✓ Visible focus ring (browser default)
```

### Screen Reader
```
✓ Stage label announced
✓ Current state announced via icon alt
✓ Locked tooltip announced on focus
✓ Badge count announced
```

---

**Status**: Comprehensive visual specification complete

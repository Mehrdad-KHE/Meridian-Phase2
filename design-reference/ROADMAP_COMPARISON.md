# WorkflowRoadmap Design Comparison

**Date**: 2026-05-12

---

## Side-by-Side Comparison

### Arrow-Block Interlocking Design (Original Concept)

```
┏━━━━━━━━━┓◥ ┏━━━━━━━━━┓◥ ┏━━━━━━━━━━━━━┓◥ ┏━━━━━━━━━━━━┓
┃ ✓ Home  ┃▶┃ ✓ Setup  ┃▶┃ ● Documents  ┃▶┃ ○ Processing┃
┗━━━━━━━━━┛  ┗━━━━━━━━━┛  ┗━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━┛
```

**Visual characteristics**:
- Rectangular blocks with sharp corners
- Right-pointing triangular arrows (CSS borders)
- Blocks overlap by 12px (interlocking effect)
- Current block scaled 105% larger
- Left notch cutout (clipPath)
- Solid color fills
- Text icons (✓ ● ○)
- Dashed borders for locked states

**Pros**:
- Strong geometric visual
- Literal "interlocking" appearance
- Clear arrow direction

**Cons**:
- Complex CSS (z-index, positioning, border triangles)
- Geometric shapes can feel rigid
- Scaling current block creates layout shifts
- Text icons less semantic
- Dashed borders can look unpolished

---

### Pill + Chevron Design (Final Polished)

```
┌─────────┐  ›  ┌──────────┐  ›  ┌─────────────┐  ›  ┌────────────┐
│ ✓ Home  │     │ ✓ Setup  │     │ ● Documents │     │ ○ Processing│
└─────────┘     └──────────┘     └─────────────┘     └────────────┘
```

**Visual characteristics**:
- Rounded pill shapes
- Chevron (›) connectors between stages
- Clear gaps (8px) between elements
- Current stage slightly larger padding
- Soft ring shadow on current stage
- Tinted backgrounds for completed (green/10%)
- Proper icons (Check, Lock from Lucide)
- Subtle solid borders

**Pros**:
- Clean, modern appearance
- Simple CSS (no tricks)
- Semantic icons (universal symbols)
- Professional SaaS aesthetic
- Better state differentiation
- Smoother hover states
- Easier to maintain

**Cons**:
- Less "unique" (follows established patterns)
- May feel less "connected" at first glance (mitigated by chevrons)

---

## State Comparison

### Completed State

**Arrow-Block**:
```
Background: #10B981 (solid green)
Border: #10B981 (solid green)
Text: White
Icon: ✓ (text character)
Hover: Darker green
```

**Pill + Chevron**:
```
Background: #10B981/10 (10% green tint)
Border: #10B981/40 (40% green)
Text: #10B981 (green)
Icon: Check (14px Lucide icon)
Hover: Brighter tint (20%), stronger border (60%)
```

**Winner**: Pill + Chevron — More sophisticated use of color, clearer "done but revisitable" state

---

### Current State

**Arrow-Block**:
```
Background: #3B82F6 (solid blue)
Border: #3B82F6 (same as background)
Text: White
Icon: ● (text character)
Scale: 105%
Shadow: 0_2px_8px_rgba(59,130,246,0.3)
```

**Pill + Chevron**:
```
Background: #3B82F6 (solid blue)
Border: #3B82F6 (same as background)
Text: White
Icon: Dot (2px white circle)
Padding: +4px horizontal, +2px vertical
Shadow: 0_0_0_3px_rgba(59,130,246,0.12) (ring)
```

**Winner**: Pill + Chevron — Ring shadow more elegant than drop shadow, padding increase cleaner than scale transform

---

### Accessible State

**Arrow-Block**:
```
Background: #374151 (medium gray solid)
Border: #4B5563 (slightly lighter)
Text: #D1D5DB (light gray)
Icon: ○ (text character)
Hover: Blue tint overlay
```

**Pill + Chevron**:
```
Background: #252C37 (darker gray)
Border: #374151 (medium gray)
Text: #9CA3AF (medium gray)
Icon: Dot (2px #4B5563 circle)
Hover: Lighter border + lighter text
```

**Winner**: Pill + Chevron — Better integration with dark theme, clearer hover feedback

---

### Locked State

**Arrow-Block**:
```
Background: #1A1F28 (dark)
Border: #374151 (solid, standard)
Text: #6B7280 (gray)
Icon: (empty)
Opacity: 60%
Arrow: Dashed border style
```

**Pill + Chevron**:
```
Background: #1A1F28 (dark)
Border: #2D3748 (subtle)
Text: #4B5563 (muted)
Icon: Lock (12px Lucide icon)
No opacity reduction
```

**Winner**: Pill + Chevron — Lock icon is universally recognized, no need for opacity tricks or dashed styles

---

## Badge Comparison

**Arrow-Block**:
```
Size: 16px × 16px
Position: -6px top, -6px right
Background: #F59E0B (amber)
Text: 9px bold
Ring: 2px #1A1F28
```

**Pill + Chevron**:
```
Size: 16px × 16px
Position: -4px top, -4px right
Background: #F59E0B (amber)
Text: 9px bold
Ring: 2px #1A1F28
```

**Winner**: Tie — Nearly identical design (both good)

---

## Directional Flow Comparison

**Arrow-Block**:
- Right-pointing triangles built with CSS borders
- Triangles same color as source block
- Visual "penetration" into next block via overlap
- Strong geometric directionality

**Pill + Chevron**:
- Chevron (›) icon from Lucide
- Color reflects completed path (green) or pending (gray)
- Clear spacing between stages
- Universal "next" symbol

**Winner**: Context-dependent
- Arrow-Block wins on: Geometric strength, unique appearance
- Pill + Chevron wins on: Simplicity, clarity, recognizability

---

## Code Complexity Comparison

### Arrow-Block Structure
```tsx
<div style={{ marginRight: '-12px' }}>
  <div style={{ zIndex: current ? 10 : 1 }}>
    <div clipPath="polygon()" /> {/* Left notch */}
    <span>{icon}</span>
    <span>{label}</span>
    <div style={{ borderLeft: '12px solid', borderTop: '22px transparent' }} />
  </div>
</div>
```

**Lines of CSS logic**: ~40
**Complex positioning**: Yes (overlap, z-index)
**CSS tricks**: Yes (border triangles, clipPath)

### Pill + Chevron Structure
```tsx
<div className="gap-2">
  <div className="rounded-full">
    <Icon />
    <span>{label}</span>
  </div>
  <ChevronRight />
</div>
```

**Lines of CSS logic**: ~20
**Complex positioning**: No (standard flexbox)
**CSS tricks**: None (semantic icons)

**Winner**: Pill + Chevron — 50% less complexity, easier to maintain

---

## Mobile / Responsive Comparison

**Arrow-Block**:
- Horizontal scroll works
- Overlap can cause touch target issues on small screens
- Scale transform on current can cause reflow
- Text icons scale with font size

**Pill + Chevron**:
- Horizontal scroll works
- Clear gaps ensure no touch target conflicts
- Padding increase maintains layout stability
- Icon size fixed (better control)

**Winner**: Pill + Chevron — Better touch targets, more predictable behavior

---

## Accessibility Comparison

**Arrow-Block**:
- Color-coded states: Yes
- Semantic icons: Partial (text characters)
- Keyboard navigation: Works but scale can be jarring
- Screen reader: Relies on text and title attribute
- Lock indication: Via opacity only

**Pill + Chevron**:
- Color-coded states: Yes
- Semantic icons: Full (Check, Lock symbols)
- Keyboard navigation: Smooth focus states
- Screen reader: Proper icon labels + title attribute
- Lock indication: Via icon + cursor + color

**Winner**: Pill + Chevron — Better icon semantics, clearer lock state

---

## Professional Context

**For accounting/finance software**:

**Arrow-Block** feels:
- More "designed" or "stylized"
- Slightly more playful
- Unique / distinctive

**Pill + Chevron** feels:
- More professional / serious
- More "enterprise SaaS"
- Trusted / familiar

**Winner for Meridian context**: Pill + Chevron — Better fit for professional accounting workflow

---

## Summary Matrix

| Criterion | Arrow-Block | Pill + Chevron | Winner |
|-----------|-------------|----------------|--------|
| Visual Simplicity | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| State Clarity | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| Directional Flow | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Arrow |
| Code Maintainability | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| Professional Polish | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| Visual Uniqueness | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Arrow |
| Accessibility | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| Mobile/Responsive | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| Icon Semantics | ⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |
| Hover States | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pill |

**Overall**: Pill + Chevron wins on most professional criteria

---

## Workflow Logic

Both designs: **100% identical workflow logic**
- Stage definitions: Identical
- State calculations: Identical
- Navigation behavior: Identical
- Badge logic: Identical
- Tooltip logic: Identical

**Workflow Parity**: ✅ Complete

---

## Recommendation

**Use: Pill + Chevron Design (Final Polished)**

**Reasoning**:
1. Better professional appearance for accounting software
2. Simpler, more maintainable code
3. Excellent state differentiation via semantic icons
4. Modern SaaS aesthetic (Stripe, Linear, Figma style)
5. Better accessibility and mobile experience
6. Cleaner hover states and interactions
7. No compromise on directional flow (chevrons work well)

**Trade-off accepted**:
- Less visually unique (but more trusted)
- Follows established patterns (which users recognize)

---

**Decision**: Final polished design recommended for production

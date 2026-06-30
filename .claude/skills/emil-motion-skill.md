---
name: emil-design-eng
description: Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great.
---

# Design Engineering - Motion Skill

## Core Philosophy
Taste is trained, not innate. Unseen details compound. Beauty is leverage.

## Animation Decision Framework
1. Should this animate? (100x/day → no, occasional → yes)
2. What is the purpose? (spatial consistency, feedback, preventing jarring)
3. What easing? (entering → ease-out, moving → ease-in-out, hover → ease)
4. How fast? (button press: 100-160ms, dropdowns: 150-250ms, modals: 200-500ms)

## Easing
- Custom curves: `cubic-bezier(0.23, 1, 0.32, 1)` for ease-out
- Never use ease-in for UI (starts slow, feels sluggish)
- iOS drawer curve: `cubic-bezier(0.32, 0.72, 0, 1)`

## Component Principles
- Buttons: `transform: scale(0.97)` on :active with 160ms ease-out
- Never animate from scale(0). Start from scale(0.95) + opacity: 0
- Popovers: transform-origin from trigger, not center
- Tooltips: skip delay on subsequent hovers
- Use CSS transitions over keyframes for interruptible UI
- Use blur (<20px) to mask imperfect transitions

## Performance
- Only animate transform and opacity
- CSS variables are inheritable - don't update on containers with many children
- CSS animations beat JS under load (off main thread)
- Use WAAPI for programmatic CSS animations

## Accessibility
- prefers-reduced-motion: keep opacity/color, remove movement
- Touch hover: `@media (hover: hover) and (pointer: fine)`

## Review Checklist
- No `transition: all` - specify exact properties
- No `scale(0)` - start from 0.95
- No `ease-in` on UI - use ease-out or custom
- Duration < 300ms for UI elements
- Hover animations gated by media query
- Enter/exit: exit faster than enter
- Stagger delay: 30-80ms between items

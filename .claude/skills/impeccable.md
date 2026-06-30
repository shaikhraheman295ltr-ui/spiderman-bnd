---
name: impeccable
description: Production-grade frontend design. Covers UX review, visual hierarchy, accessibility, performance, responsive behavior, typography, spacing, color, motion, micro-interactions.
version: 3.8.0
---

# Impeccable Design System

## Color
- Verify contrast: body ≥4.5:1, large text ≥3:1
- Gray text on colored bg: use darker shade of bg's own hue
- Use OKLCH for color

## Typography
- Body line length: 65-75ch
- Don't pair similar fonts (two geometric sans). Pair on contrast axis.
- Hero heading clamp max ≤ 6rem (~96px)
- Display heading letter-spacing ≥ -0.04em
- text-wrap: balance on h1-h3
- text-wrap: pretty on prose

## Layout
- Cards are lazy. Use only when best affordance.
- Flexbox for 1D, Grid for 2D
- Responsive: `repeat(auto-fit, minmax(280px, 1fr))`
- Semantic z-index scale, no arbitrary 999/9999

## Motion
- Intentional, not afterthought
- Don't animate CSS layout properties
- Ease out with exponential curves (quart/quint/expo)
- prefers-reduced-motion: non-optional

## Absolute Bans
- Side-stripe borders (>1px colored left/right border)
- Gradient text (background-clip: text)
- Glassmorphism as default
- Hero-metric template (big number, small label)
- Identical card grids
- Eyebrow above every section
- Numbered section markers (01/02/03) as default
- Text that overflows its container

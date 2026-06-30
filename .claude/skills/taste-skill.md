---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated.
---

# tasteskill: Anti-Slop Frontend Skill

## 0. BRIEF INFERENCE
Before touching code, infer what the user actually wants. Read: page kind, vibe words, reference signals, audience, brand assets, quiet constraints.

### 0.B Output a one-line "Design Read" before generating
"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, Inter + slate-900.

## THE THREE DIALS
- DESIGN_VARIANCE: 8 (1=Symmetry, 10=Chaos)
- MOTION_INTENSITY: 6 (1=Static, 10=Cinematic)
- VISUAL_DENSITY: 4 (1=Airy, 10=Packed)

## 4. DESIGN ENGINEERING DIRECTIVES

### 4.1 Typography
- Inter discouraged as default. Prefer Geist, Outfit, Cabinet Grotesk, Satoshi.
- Serif discouraged as default. Sans display for creative/agency/premium.
- BANNED as defaults: Fraunces, Instrument_Serif
- body line length: max 65ch
- h1-h3: text-wrap balance

### 4.2 Color
- Max 1 accent. Saturation < 80%.
- NO AI-purple/blue glow default.
- NO warm beige/cream/brass default for premium.
- Use OKLCH. Tinted neutrals: 0.005-0.015 chroma toward brand hue.

### 4.3 Layout
- Anti-center bias when VARIANCE > 4.
- Cards only when elevation communicates hierarchy.
- Pick ONE corner-radius and stick to it.

### 4.7 Layout Discipline
- Hero must fit initial viewport. Headline max 2 lines, subtext max 20 words.
- No eyebrow on every section (max 1 per 3 sections).
- Navigation single line on desktop, height max 80px.
- Section-layout-repetition ban: same layout family max once per page.

## AI TELLS (Forbidden)
- NO neon/outer glows
- NO pure black (#000000)
- NO gradient text (background-clip: text)
- NO glassmorphism as default
- NO hero-metric template
- NO identical card grids
- NO numbered section markers (01/02/03) as default
- NO side-stripe borders

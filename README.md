# Spider-Man: Brand New Day — Fan Experience

A cinematic, interactive fan website for **Spider-Man: Brand New Day** (2026), built with Next.js 14, TypeScript, Tailwind CSS, GSAP, and Three.js. Features auto-playing frame sequences from the teaser trailers, cast bios, gallery, trailer player, and immersive scroll-triggered animations.

![Spider-Man Brand New Day](https://static.wikia.nocookie.net/logopedia/images/e/e7/Spider-Man_Brand_New_Day.png/revision/latest?cb=20260404090454)

---

## Live Demo

<p align="center">
  <a href="https://spiderman-93259e8ap-luffy6.vercel.app" target="_blank">
    <strong>🔗 spiderman-93259e8ap-luffy6.vercel.app</strong>
  </a>
</p>

---

## Features

### 🎬 Frame Sequence Player
- **Hero intro** — 200 frames (v1) auto-play at 10fps with crossfade blending
- **Interlude** — 210 frames (v3) looping at 12fps between Cast and Bios
- **Video Outro** — 231 frames (v2) playing at 24fps on scroll enter
- Canvas-based rendering with dual-layer transitions for smooth playback

### 🧑‍🎤 Cast & Characters
- Horizontal scroll **CastSection** with 6 character cards
- Detailed bios for **Tom Holland** (Peter Parker) and **Zendaya** (MJ) with career timelines, stats, and quotes
- Compact **CastBiosSection** for Sadie Sink, Jon Bernthal, Mark Ruffalo, Michael Mando

### 🎥 Trailer Player
- Local MP4 playback with play/pause, mute/unmute, and replay controls
- Hindi audio trailer embedded directly in the page

### 🖼️ Gallery
- 12-image grid with hover reveal and click-to-view modal (t-modal transition)

### 🕵️ Secrets & Interactive Elements
- **SecretFilesSection** — mouse-reveal spotlight effect with icon-swap
- **FloatingNav** — pill navigation with t-dropdown "More" menu
- **WebCursor** — custom cursor following mouse movement
- **FinalCTA** — live countdown to July 31, 2026 release date

### 🎨 Design System
- Dark cinematic aesthetic (`#0A0A0F` base, `#E8192C` red accent)
- Web-thread grid overlay
- Gold accent (`#FFD700`) for key typography
- Scroll snap with Lenis smooth scrolling
- Fully responsive (mobile through 4K)

---

## Project Structure

```
spiderman-bnd/
├── app/
│   ├── globals.css             # Design tokens, transitions-dev CSS
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Section assembly + Lenis setup
│
├── components/
│   ├── ui/
│   │   ├── MagneticButton.tsx  # Hover-reactive button
│   │   ├── SectionLabel.tsx    # Reusable section label
│   │   └── SplitTextReveal.tsx # Text reveal animation
│   │
│   ├── HeroSection.tsx         # v1 frame autoplay (hero intro, 10fps)
│   ├── V3AutoplaySection.tsx   # v3 frame autoplay (interlude, 12fps)
│   ├── VideoOutroSection.tsx   # v2 frame autoplay (outro, 24fps)
│   ├── CastSection.tsx         # Horizontal scroll cast cards
│   ├── TomHollandSection.tsx   # Tom Holland bio (timeline, stats, quotes)
│   ├── ZendayaSection.tsx      # Zendaya bio (timeline, stats, quotes)
│   ├── CastBiosSection.tsx     # Side-by-side cast bios grid
│   ├── GallerySection.tsx      # Image grid + modal viewer
│   ├── TrailerSection.tsx      # Local MP4 player with controls
│   ├── SecretFilesSection.tsx  # Spotlight mouse-reveal interaction
│   ├── CrewSection.tsx         # Director, writers, producers credits
│   ├── FinalCTA.tsx            # Countdown to July 31, 2026
│   ├── FloatingNav.tsx         # Pill navigation with dropdown
│   ├── Footer.tsx              # Credits, social links, back-to-top
│   ├── Preloader.tsx           # Loading screen
│   ├── WebCursor.tsx           # Custom cursor
│   ├── SynopsisSection.tsx     # Plot synopsis
│   └── three/                  # Three.js / R3F components
│       ├── ThreeSpiderSuit.tsx # 3D Spider-Man suit model
│       └── ThreeSpine.tsx      # 3D spine model
│
├── public/
│   ├── hero-frames-v1/         # 200 frames (2160p, 10fps intro)
│   ├── hero-frames-v2/         # 231 frames (2160p, 24fps outro)
│   ├── hero-frames-v3/         # 210 frames (2160p, 12fps interlude)
│   ├── images/
│   │   ├── cast/               # Actor headshots (1.jpg–6.jpg)
│   │   ├── gallery/            # Gallery images (1.jpg–12.jpg)
│   │   ├── villains/           # Villain concept art
│   │   └── ...                 # Other static images
│   ├── icons/
│   │   └── spider-mark.svg     # Spider-Man icon
│   └── *.mp4                   # Hindi audio trailer
│
├── lib/
│   ├── gsap.ts                 # GSAP import wrapper
│   ├── lenis.ts                # Lenis smooth scroll init
│   └── utils.ts                # Shared utilities
│
├── .claude/
│   └── skills/                 # Project design skill sets
│       ├── taste-skill.md
│       ├── emil-motion-skill.md
│       ├── impeccable.md
│       └── transitions-dev.md
│
├── app/globals.css             # Global styles + design tokens
├── tailwind.config.ts          # Tailwind customization
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies & scripts
└── README.md                   # You are here
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14.2** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **GSAP + ScrollTrigger** | Scroll-driven animations & pinning |
| **Lenis** | Smooth scroll engine |
| **Three.js / R3F** | 3D suit model rendering |
| **lucide-react** | Icon library |
| **Vercel** | Hosting & deployment |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shaikhraheman295ltr-ui/spiderman-bnd.git

# Install dependencies
cd spiderman-bnd
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Frame Data

| Set | Frames | FPS | Usage |
|---|---|---|---|
| v1 | 200 | 10 | Hero intro (autoplay, ~20s) |
| v2 | 231 | 24 | Video outro (scroll-triggered) |
| v3 | 210 | 12 | Interlude section (looping) |

All frames are 1-indexed with 5-digit zero-padding (`frame00001.jpg`–`frame00231.jpg`).

---

## Skills & Design Principles

This project follows four curated design skill sets:

| Skill | Focus |
|---|---|
| **taste-skill** | Typography hierarchy & color discipline |
| **emil-motion-skill** | Easing curves & entrance animations |
| **impeccable** | Balance, readability & z-index layering |
| **transitions-dev** | Icon-swap, dropdown & modal transitions |

---

## License

This project is a **fan-made tribute** and is not affiliated with Marvel Studios, Sony Pictures, or Disney. All characters, footage, and trademarks belong to their respective owners.

---

## Connect

<p align="center">
  <a href="https://github.com/shaikhraheman295ltr-ui/spiderman-bnd">
    <strong>📦 GitHub Repository</strong>
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://spiderman-93259e8ap-luffy6.vercel.app" target="_blank">
    <strong>🌐 Live Demo</strong>
  </a>
</p>

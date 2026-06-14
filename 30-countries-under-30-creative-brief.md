# 🌍 Creative Brief — "30 Under 30" Travel Tracker
**Project type:** Personal travel tracker web app  
**Stack:** React + TypeScript → deployed via Vercel (GitHub-connected)  
**Data model:** Static / git-committed (no backend, no auth)  
**Prepared for:** UX Design Agent

---

## 1. The Concept

Two people. One shared obsession. A race against their own birthdays.

**"30 Countries Under 30"** is a couples' travel challenge tracker — part passport, part scoreboard, part love letter to the world. The site documents every country visited by a couple before each person turns 30, with a shared view and individual views, photo souvenirs, and a gamified progress system.

### The Stakes (hardcode these countdowns)
| Person | Birthday | Turns 30 | Days from launch |
|--------|----------|----------|-----------------|
| **Him** | 4 March 1997 | **4 March 2027** | ~264 days from June 2026 |
| **Her** | 26 June 1997 | **26 June 2027** | ~378 days from June 2026 |

> The earlier deadline (his) is the shared race clock. Her deadline is ~114 days more generous — a design-worthy tension.

---

## 2. Design Direction

### Vibe
- **Modern adventure.** Think premium travel editorial meets gamified app — not cheesy tourist clipart, not sterile dashboard.  
- Reference: the polish of Linear.app + the wanderlust energy of a National Geographic spread + the playfulness of Duolingo's streak mechanic.

### Visual Language
- **Color palette:** Pastel-neutral system across two modes:
  - **Light mode —** Soft off-white background (`#F7F9F4`), warm surface cards (`#EEFAF0`), mint accent (`#E1F0C4`) with a slightly deeper interactive state (`#B8DBA0`), muted sage secondary (`#C9E0CA`), pastel peach for highlights (`#FFE8D6`), soft pastel gold for milestones (`#FAE9A0`). Text in dark slate (`#2D3748`).
  - **Dark mode —** Deep navy-gray base (`#0E1420`), raised surface (`#162032`), card surface (`#1C2A3E`). The mint accent (`#E1F0C4`) carries over and pops warmly against the dark ground. Milestone moments in soft gold (`#FAE9A0`). Text in warm off-white (`#EDF2EE`).
  - **Principle:** No electric or saturated colors anywhere. Every hue should feel like it belongs on a linen postcard — calm, considered, and a little romantic.
- **Typography:** Display font — something bold with personality (e.g., *Clash Display* or *Syne*). Body — clean and readable (e.g., *Inter* or *DM Sans*).
- **Aesthetic:** Dark mode primary. Glass morphism cards. Soft ambient glow behind country cards. Subtle grain texture overlay for warmth.
- **Motif:** Passport stamps — but deconstructed and modern. Think geometric ink-stamp shapes, not literal clipart stamps.

### Tone
Playful but premium. This is a keepsake as much as a tracker. It should feel like something worth sharing.

---

## 3. Site Architecture — Views

### 3.1 — `/ ` (Together / Home View)
The flagship shared experience. This is the default landing page.

**Hero Section**
- Large animated globe or stylized world map (SVG, not Google Maps) with visited countries lit up in the accent color — unvisited dimmed
- Floating dual-avatar badge: *"Him & Her • On a mission"*
- Dual countdown clocks side by side: his deadline and hers — animated, urgent-feeling
- Shared progress bar: **X / 30 countries** with a satisfying fill animation on load

**Countries Grid**
- Masonry or 3-col card grid of visited countries
- Each card shows:
  - Country name + flag emoji or SVG flag
  - A shared couple photo (souvenir image)
  - Date visited
  - A subtle animated "stamp" overlay when card is hovered
  - Continent tag badge
- Unvisited "ghost" slots (30 total) rendered as dotted-outline placeholder cards — creates a sense of incompleteness, urgency, and anticipation
- On hover of a visited card: micro-lift + glow effect
- On click: modal or slide-over with full souvenir photo, date, notes snippet, and both travelers' individual photos if different

**Stats Bar (sticky or fixed)**
- Continents unlocked (out of 6 populated)
- Total countries: X/30
- Days remaining (his deadline as default)
- "Furthest from home" country flag

---

### 3.2 — `/him` (His View)
Same layout philosophy, but:
- Accent shifts slightly to a soft pastel sky blue (`#BDD9F2`) — cool and calm, distinct from the shared mint
- Avatar / name in the header is his
- Country cards show **his souvenir photo**, not the shared one
- His individual countdown is the featured timer
- Progress ring for his 30 is his own
- "Countries only he has visited" vs "countries both visited" are visually distinguished (solo flag vs duo badge)

---

### 3.3 — `/her` (Her View)
Mirror of above, but:
- Accent shifts to a soft pastel blush-lavender (`#E8D5F0`) — warm and gentle, distinct from both mint and sky
- Her souvenir photo per country
- Her deadline is featured
- Her unique countries are highlighted

---

## 4. Key Components

### 4.1 — Country Card
```
┌──────────────────────────────┐
│  [Souvenir photo — full bleed]│
│                              │
│  🇯🇵  Japan          Apr 2025 │
│  ● Asia   ● Together         │
│  [ Stamp overlay on hover ]  │
└──────────────────────────────┘
```
- Card aspect ratio: ~3:4 portrait (photo-first feel)
- Ghost/placeholder cards: dashed border, muted color, "?" or globe icon center
- Number badge in corner: `#7 of 30`

### 4.2 — Progress Ring (Gamified)
For each individual view: a large circular progress ring (SVG animated) at the top of the page:
- Center shows: avatar photo + `X/30`
- Ring fills clockwise as countries are added
- Milestone pulses at 10, 20, 25, and 30 countries (subtle confetti burst or ring glow animation)

### 4.3 — Continent Unlock Badges
A horizontal badge strip showing 6 continent badges:
- Locked: grayscale, subtle shimmer
- Unlocked: full color, glowing, with number of countries visited in that continent
- Unlocking animation: a "reveal" wipe + short glow burst

Continents: `🌍 Europe` `🌎 Americas` `🌏 Asia` `🌍 Africa` `🌏 Oceania` `🌎 Antarctica`

### 4.4 — Countdown Clock
- Large, elegant digital/flip-style or smooth-number countdown
- Shows: `264 days · 18 hrs · 32 min · 14 sec` (live)
- Below the number: a thin depleting progress bar showing % of time remaining since "challenge start" date
- When under 30 days: shifts to red/amber pulsing

### 4.5 — World Map
- SVG world map in the hero (recommend using `react-simple-maps` or similar)
- Visited countries: filled with accent gradient
- Unvisited: dark, low-opacity fill
- Tooltip on hover: country name + visit date
- On Together view: both colors blended; on individual views, solo color

### 4.6 — Navigation
- Minimal top nav (not heavy)
- Three tabs/pills: `Together` | `Him` | `Her`
- Active view: underline or filled pill indicator
- Mobile: bottom tab bar (more thumb-friendly)

---

## 5. Gamification System

### XP / Level System (visual only, no backend)
Assign XP per country based on fun criteria baked into the static data:
- +10 XP base per country
- +5 XP if it's a new continent
- +15 XP if it's a "remote" or "difficult" destination (can flag in data)
- +20 XP on completion (30 countries)

Show a **Level badge** next to each person's name:
`Lv. 4 · Globetrotter` → `Lv. 6 · Expedition Class` → `Lv. 9 · World Citizen`

### Achievement Badges (unlockable, shown in profile)
| Badge | Condition |
|-------|-----------|
| 🛂 First Stamp | First country logged |
| 👫 Dynamic Duo | First country together |
| 🌍 Continent Collector | All 6 continents visited |
| 🏃 Solo Adventurer | Country visited by only one person |
| 🔥 On a Roll | 3+ countries in 30 days |
| 🎯 Halfway There | 15/30 reached |
| 🌐 World Citizen | All 30 completed |
| ⏰ Under the Wire | Completed within 7 days of deadline |

Badges render as small glowing icons in the profile header. Locked badges are shown as silhouettes — so the user can see what's coming.

### Fun Stat Cards (bottom of each view)
- 🏆 "Most stamps in a month: April 2025 (4 countries)"
- ✈️ "Furthest destination: New Zealand (9,500km)"
- 🌍 "Last country: Japan · 42 days ago"
- ⚡ "Current pace: on track / X countries behind to hit deadline"

---

## 6. Data Model (Static — Git Committed)

No backend. All data lives in a TypeScript file committed to the repo. The UX agent does not need to solve this, but should design around it:

```ts
// Example country entry (src/data/countries.ts)
{
  id: "japan",
  name: "Japan",
  flag: "🇯🇵",
  continent: "Asia",
  dateVisited: "2025-04-12",
  isShared: true,
  notes: "Cherry blossom season in Kyoto",
  photos: {
    shared: "/assets/countries/japan/shared.jpg",
    him: "/assets/countries/japan/him.jpg",
    her: "/assets/countries/japan/her.jpg",
  }
}
```

Design should assume photos are local static assets. No upload UI needed. No auth. No forms. This is a read-only display app that gets updated via git.

---

## 7. Animation & Motion Principles

All animations should feel **purposeful, not gimmicky**. Recommended:

| Interaction | Animation |
|-------------|-----------|
| Page load | Country cards stagger-fade up (30ms delay between each) |
| Map load | Countries "light up" one by one in sequence |
| Progress ring | Draws from 0% to current % on mount |
| Countdown | Smooth number-flip (CSS flip-card or Framer Motion) |
| Badge unlock | Reveal wipe + glow pulse + subtle confetti |
| Card hover | Lift (translateY -4px) + shadow bloom |
| Card click | Smooth modal slide-up |
| Tab switch | Cross-fade between views (color accent transition) |
| 30/30 completion | Full-screen celebration: confetti, globe animation, "WORLD CITIZEN" banner |

**Motion library:** Framer Motion (React-native feel, excellent for this type of work)

---

## 8. Responsive Behavior

### Mobile (< 640px)
- Single column card grid
- Bottom tab bar navigation (Together / Him / Her)
- Condensed hero: smaller globe, stacked countdowns
- Stats as a horizontal scroll strip
- Touch-friendly card tap → modal

### Tablet (640px–1024px)
- 2-column card grid
- Top nav
- Map at 60% width with stats panel alongside

### Desktop (> 1024px)
- 3-column card grid
- Full-width hero map
- Sticky sidebar option for stats on individual views

---

## 9. Pages / Routes Summary

| Route | View |
|-------|------|
| `/` | Together / Shared view |
| `/him` | His individual tracker |
| `/her` | Her individual tracker |
| `/country/:id` | (Optional) individual country deep-dive page |

---

## 10. Deliverables Expected from UX Agent

1. **High-fidelity Figma mockups** for all 3 views (Together, Him, Her) — desktop + mobile
2. **Component library** in Figma: Country Card, Ghost Card, Progress Ring, Badge, Countdown, Nav, Modal
3. **Prototype** with key interactions: tab switching, card click → modal, badge hover
4. **Design tokens file:** colors, typography scale, spacing, border radius, shadow levels
5. **Animation notes** annotated on each interaction component
6. **Handoff notes** for the React/TypeScript developer including component names, state suggestions, and asset export specs

---

## 11. Inspiration / Reference Sites

- **Linear.app** — polish, dark mode, spacing
- **Duolingo** — gamification, streak energy, delight on achievement
- **Craft.do** — card-based elegance
- **National Geographic** — editorial photo treatment
- **Luma.ai / cal.com** — modern, clean, open-source aesthetic

---

*This brief is intentionally design-first. Tech decisions (Vercel deployment, static data via git commits, React + TypeScript) are already decided by the client. The UX agent should focus purely on experience, visual design, and interaction.*

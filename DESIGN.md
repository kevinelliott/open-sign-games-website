---
name: Open Sign Restaurant Group
description: One night block, four distinct restaurant-game worlds.
colors:
  night-ink: "#05070a"
  raised-enamel: "#090d14"
  soft-enamel: "#0f1520"
  cool-paper: "#f3f6fa"
  cool-muted: "#a9b3c4"
  cool-dim: "#728097"
  hardware-line: "#2b3545"
  hardware-strong: "#526078"
  cobalt-current: "#68a0ff"
  cobalt-glass: "#b4d2ff"
  electrode-red: "#ff6548"
  cantina-coral: "#ff6b43"
  sushi-blue: "#8bb2ff"
  baron-brass: "#d9ad5f"
  signal-green: "#8bdd78"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 4.4vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Atkinson Hyperlegible, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  square: "0px"
spacing:
  circuit: "8px"
  compact: "12px"
  control: "18px"
  section: "28px"
  chapter: "44px"
components:
  primary-link:
    textColor: "{colors.cool-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px 0"
  status-label:
    textColor: "{colors.cool-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "8px 10px"
---

# Design System: Open Sign Restaurant Group

## Overview

**Creative North Star: "The Block, Wired as One Hand-Bent Neon Circuit"**

The system is an after-hours publisher threshold for four restaurant-game
worlds. Ink-black enamel, exposed sign hardware, cobalt glass current, and warm
electrode endpoints create the family identity. The group owns the sign and the
street; each restaurant owns its silhouette, color, instrument, rhythm, and
interaction.

The design is restrained in chrome and expressive in subject matter. It uses
flat, countable geometry and precise typography instead of photorealism,
decorative glass, or generic game cards. Information stays legible when the
glow, motion, custom fonts, or JavaScript are unavailable.

**Key Characteristics:**

- Stable block topology with four structurally different doors.
- Functional neon current used for selection and state.
- Square enamel surfaces, one-pixel dividers, and visible hardware.
- Condensed display lettering paired with high-legibility body copy.
- Game color belongs to a restaurant; cobalt belongs to the group circuit.

## Colors

The ground is near-black enamel; cobalt current and cool paper carry the group,
while four restaurant accents stay local to their own scenes and chapters.

### Primary

- **Cobalt Current** (`#68a0ff`): active group circuit, primary action rules,
  and group-level navigation state.
- **Cobalt Glass** (`#b4d2ff`): lit lettering and high-emphasis group text.

### Secondary

- **Electrode Red** (`#ff6548`): circuit endpoints only; it marks energy
  entering or leaving the system.
- **Cantina Coral** (`#ff6b43`), **Sushi Blue** (`#8bb2ff`), **Baron Brass**
  (`#d9ad5f`), and **Signal Green** (`#8bdd78`): title-specific identity and
  state, never interchangeable palette options.

### Neutral

- **Night Ink** (`#05070a`): page ground.
- **Raised Enamel** (`#090d14`) and **Soft Enamel** (`#0f1520`): tonal layers.
- **Cool Paper** (`#f3f6fa`): primary text.
- **Cool Muted** (`#a9b3c4`) and **Cool Dim** (`#728097`): secondary and
  tertiary text.
- **Hardware Line** (`#2b3545`) and **Hardware Strong** (`#526078`): dividers,
  rails, clamps, and inactive controls.

**The Circuit Ownership Rule.** Cobalt identifies the group circuit; restaurant
accents identify their own door and proof. Do not wash whole sections in cobalt
or move one restaurant's accent into another.

## Typography

**Display Font:** Barlow Condensed (self-hosted, with Arial Narrow fallback)
**Body Font:** Atkinson Hyperlegible (self-hosted, with Arial fallback)

**Character:** Condensed lettering evokes fabricated signs and makes long game
names authoritative without becoming ornamental. The body face stays open and
legible at small sizes and in dense factual passages.

### Hierarchy

- **House wordmark** (700, `1.12rem`–`1.38rem` in the header and
  `clamp(1.8rem, 3.25vw, 4rem)` at threshold scale): the Open Sign name, always
  visually dominant with the same 0.025em tracking and 0.8 line height.
- **House signature** (600, `0.58rem`–`0.9rem`, 0.19em, uppercase): Restaurant
  Group beneath the wordmark with unchanged proportions at every scale.
- **Display** (600, `clamp(3rem, 4.4vw, 5.6rem)`, 0.9): homepage thesis and
  major section statements.
- **Chapter** (600, `clamp(4rem, 7vw, 6rem)`, 0.9): game names at chapter scale.
- **Title** (600, `clamp(2rem, 2.6vw, 3.5rem)`, 0.95): the active circuit name.
- **Body** (400, `1rem`, 1.55): explanatory copy, capped around 69 characters.
- **Label** (600, `0.72rem`–`0.95rem`, 0.08em–0.13em, uppercase): controls,
  status, readouts, and mechanical vocabulary.

**The Fabricated Letter Rule.** Uppercase, tracked display text belongs to
labels and sign hardware. Paragraphs always use sentence case in the body face.

## Layout

The desktop opening uses a narrow editorial rail beside a dominant block stage.
Four equal façade bays remain spatially stable above the active circuit console.
Game chapters alternate copy and a large geometric instrument, but they collapse
to one consistent reading order on smaller screens: copy first, instrument
second.

The principal breakpoints are 1180px, 900px, and 620px. At 900px the opening
rail becomes a two-column introduction and the façades become a two-by-two
block. At 620px the opening, façades, console, chapters, close, and footer stack
to one column. Essential targets remain at least 44 CSS pixels.

Spacing is deliberately uneven: dense sign mechanics use 8–18px intervals;
copy groups use 28–44px; chapters and major transitions use 70–180px depending
on viewport. More space precedes a major heading than follows it.

## Elevation & Depth

The system is flat by default. Depth comes from tonal enamel layers, overlapping
hardware, and localized shadows under real awnings or lit glass. Cobalt and
restaurant text may use a restrained optical glow because the subject is gas
discharge; ordinary panels never receive a generic halo or card shadow.

**The Enamel-First Rule.** Establish hierarchy with tone, border, and overlap.
Glow belongs only to something that is visibly lit.

## Shapes

Corners are square. One-pixel dividers, straight rails, right-angle routes,
notched silhouettes, exposed clamps, and small electrode squares establish the
form language. Circles appear only where the subject requires them: lamps,
coals, plates, or electrical endpoints. Façade scenes and instruments use crisp,
countable geometry. Chapter environments use crisp, high-detail pixel clusters
and grounded spatial depth rather than sketch illustration or generic key art.

## Components

### Group identity mark

- **Structure:** one canonical horizontal lockup places the bold OS house
  monogram beside a two-level wordmark. **Open Sign** is dominant and
  **Restaurant Group** is the institutional signature. The mark, typography,
  tracking, and proportions do not change between placements.
- **Behavior:** the same lockup appears at compact header scale and larger
  threshold scale. The editorial rail begins with the page thesis instead of
  repeating the company name as a third treatment. Two independent circuit
  segments terminate beside the threshold plate; no line passes behind it.

### Primary links

- **Shape:** square, text-led, no filled container.
- **Style:** condensed uppercase label with a one-pixel cobalt rule and an
  authored 20px arrow.
- **Focus:** three-pixel cool-paper outline at four-pixel offset.

### Selector and navigation

- **Style:** neutral labels at rest, cool paper when active, with a small
  title-colored state light and explicit Selected/Preview text.
- **Behavior:** focus and pointer preview the active façade and circuit console;
  the underlying anchor still leads to the full chapter without JavaScript.

### Status labels

- **Shape:** square one-pixel hardware border with compact uppercase copy.
- **State:** status is always written in text; color may reinforce but never
  replace the label.

### Tezos chain marker

- **Structure:** the official blue Tezos mark appears beside the shared Open
  Sign threshold, leads one item in the group commitment strip, and repeats as
  a compact marker inside each restaurant chapter. Every placement pairs the
  mark with exact language that Tezos is the first planned blockchain.
- **Hierarchy:** the marker is visible near the opening block but remains
  secondary to the Open Sign house lockup, restaurant titles, and selection.
- **Truth boundary:** it never implies a current deployment, formal partnership,
  token offer, or investment value.

### Façades

- **Structure:** four equal bays with a sign, a deliberate crop of the matching
  restaurant environment, one shared unobstructed image frame, and a three-verb
  label rail. Every bay uses the same fill track at a given breakpoint, with
  the artwork covering that track edge to edge. On desktop, the shared artwork
  track receives all surplus viewport height while the live detail console stays
  content-sized.
- **State:** the selected bay changes its enamel ground and receives a one-pixel
  inset restaurant-color frame while its window brightens. Selection never
  changes image position, scale, or window size.

### Live circuit console

- **Structure:** current status, fantasy/name/description, three factual
  readouts, and one chapter link.
- **Motion:** selection replays one bounded 680ms dash-offset current using
  `cubic-bezier(0.16, 1, 0.3, 1)`; reduced motion collapses it to an immediate
  state.

### Restaurant environment art

- **Structure:** one wide, title-specific pixel-art environment per chapter,
  reused as a deliberate storefront crop and paired with a compact
  verb-and-consequence caption at chapter scale.
- **Role:** establish continuity from the opening block to each full chapter
  while the façade overlays and live console retain the mechanically legible
  overview.
- **Delivery:** optimized local WebP assets with explicit alt text; no baked-in
  wordmarks, third-party marks, or visitor-facing source links.

## Do's and Don'ts

### Do:

- **Do** keep the four doors stable while state and information change.
- **Do** use game color locally and cobalt for shared circuitry.
- **Do** preserve text equivalents for status, motion, and color-coded state.
- **Do** author icons and diagrams as crisp SVG or CSS geometry.
- **Do** keep status and availability language exact and internally evidence-backed.

### Don't:

- **Don't** replace the block with a generic hero and equal feature-card grid.
- **Don't** introduce rounded cards, glassmorphism, gradients, token tickers, or
  ambient neon around unlit objects.
- **Don't** reuse one game's topology, instrument, cultural ornament, or tempo
  for another.
- **Don't** turn ownership into the primary action or imply investment value.
- **Don't** invent locations, hours, launch dates, testimonials, or playable
  availability.

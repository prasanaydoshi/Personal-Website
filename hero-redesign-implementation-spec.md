# Hero Redesign — Implementation Spec

**Date:** March 25, 2026  
**Scope:** Redesign the hero section (`src/app/page.tsx` + related components) to add a particle constellation background, rotating identity text, and minor global branding changes.  
**Reference mockups:** See the Visualizer mockups in the Claude chat titled `hero_v3_particle_constellation_refined` (dark mode) and `hero_desktop_light_with_gauge` (light mode).

---

## 1. Global changes (all pages)

### 1a. Nav wordmark: PYD → PRHD

**File:** `src/components/Nav.tsx`

Change the wordmark text from `PYD` to `PRHD`:

```tsx
// BEFORE
<a href="#" className="font-heading font-bold text-lg tracking-tight" ...>
  PYD
</a>

// AFTER
<a href="#" className="font-heading font-bold text-lg tracking-tight" ...>
  PRHD
</a>
```

### 1b. Page metadata: PYD → PRHD

**File:** `src/app/layout.tsx`

Update all instances of "PYD" in the metadata object:

```tsx
// BEFORE
title: "PYD — Prasana | Developer Portfolio",

// AFTER
title: "PRHD — Prasana | Developer Portfolio",
```

Same for `openGraph.title`.

### 1c. Footer colophon

**File:** `src/app/page.tsx` — footer section at the bottom

```tsx
// BEFORE
{"> end of log. // PYD"}

// AFTER
{"> end of log. // PRHD"}
```

---

## 2. Color changes to hero text

### 2a. Name color: warm accent → lighter cream

**File:** `src/components/TerminalBoot.tsx`

The name "Prasana Y Doshi" currently uses `var(--color-accent-warm)` (#d4a98a). Change it to a lighter cream that works in both themes.

Add new CSS custom properties:

**File:** `src/app/globals.css`

```css
/* Light mode */
:root {
  --color-name-highlight: #c8b89a;  /* warm cream, readable on linen bg */
}

/* Dark mode */
[data-theme="dark"] {
  --color-name-highlight: #e8d5bc;  /* lighter cream, pops on dark navy */
}
```

Then in `TerminalBoot.tsx`:

```tsx
// BEFORE
<span style={{ color: "var(--color-accent-warm)" }}>
  Prasana Y Doshi
</span>

// AFTER
<span style={{ color: "var(--color-name-highlight)" }}>
  Prasana Y Doshi
</span>
```

### 2b. Download Resume button color

The "Download Resume" button currently uses `var(--color-accent-warm)` as its background. Update it to match the new cream tone.

**File:** `src/app/page.tsx` — CTA buttons section

```tsx
// BEFORE
style={{
  backgroundColor: "var(--color-accent-warm)",
  color: "#2C2C2C",
}}

// AFTER
style={{
  backgroundColor: "var(--color-name-highlight)",
  color: "#2C2C2C",
}}
```

---

## 3. Remove the three decorative dots

**File:** `src/components/TerminalBoot.tsx`

Delete the entire "decorative dots" block (the three colored circles below the tagline):

```tsx
// DELETE THIS ENTIRE BLOCK
<div
  className="flex items-center gap-2 mt-6"
  style={{
    opacity: phase >= 3 || instant ? 1 : 0,
    transition: instant ? "none" : "opacity 0.5s ease 0.2s",
  }}
>
  {[
    "var(--color-accent-thread)",
    "var(--color-accent-warm)",
    "var(--color-accent-sky)",
  ].map((color, i) => (
    <span
      key={i}
      className="w-[6px] h-[6px] rounded-full"
      style={{ backgroundColor: color }}
    />
  ))}
</div>
```

---

## 4. Add the rotating "currently:" line

**File:** `src/components/TerminalBoot.tsx`

Add a new element **after** the tagline paragraph and **in place of** the deleted dots block.

**New state and effect (add to the component):**

```tsx
const [identityIndex, setIdentityIndex] = useState(0);
const [identityVisible, setIdentityVisible] = useState(true);

const identities = [
  "diving into data pipelines at Munich Re",
  "120+ dives deep, still descending",
  "building ML models that move the needle",
  "analyzing equities before the market opens",
];

useEffect(() => {
  if (phase < 3) return; // wait for boot animation to finish
  const interval = setInterval(() => {
    setIdentityVisible(false);
    setTimeout(() => {
      setIdentityIndex((prev) => (prev + 1) % identities.length);
      setIdentityVisible(true);
    }, 400); // 400ms fade-out before swap
  }, 3000); // rotate every 3 seconds
  return () => clearInterval(interval);
}, [phase]);
```

**JSX (replaces the deleted dots):**

```tsx
<div
  className="mt-4"
  style={{
    opacity: phase >= 3 || instant ? 1 : 0,
    transition: instant ? "none" : "opacity 0.5s ease 0.2s",
  }}
>
  <span
    className="font-mono text-[12px] tracking-wider"
    style={{ color: "var(--color-accent-thread)" }}
  >
    currently:
  </span>
  <span
    className="font-mono text-[12px] ml-2"
    style={{
      color: "var(--color-text-secondary)",
      opacity: identityVisible ? 1 : 0,
      transition: "opacity 0.4s ease",
    }}
  >
    {identities[identityIndex]}
  </span>
</div>
```

---

## 5. Add spacing between accent line and "Hey"

**File:** `src/components/TerminalBoot.tsx`

Currently the vertical teal accent line is absolutely positioned and sits flush against the heading. Convert it to a normal-flow element with bottom margin so there's visible breathing room.

Replace the existing accent line:

```tsx
// BEFORE (absolute positioned, no gap)
<div
  className="absolute -left-4 top-0 bottom-0 w-[2px]"
  style={{
    background: `linear-gradient(to bottom, var(--color-accent-thread), transparent)`,
    opacity: phase >= 1 || instant ? 0.6 : 0,
    transition: instant ? "none" : "opacity 0.8s ease",
  }}
/>
```

```tsx
// AFTER (normal flow, 20px gap before the h1)
<div
  style={{
    width: "2px",
    height: "40px",
    background: "linear-gradient(to bottom, var(--color-accent-thread), transparent)",
    opacity: phase >= 1 || instant ? 0.6 : 0,
    transition: instant ? "none" : "opacity 0.8s ease",
    marginBottom: "20px",
  }}
/>
```

This places the accent line above and separated from the name heading.

---

## 6. Particle constellation background (new component)

### 6a. Create new file: `src/components/ParticleConstellation.tsx`

This is a `"use client"` component that renders an HTML `<canvas>` with an animated particle system.

**Core behavior:**

- **Particle count:** ~30 particles (component is hidden on mobile via `hidden md:block`, so no mobile count needed)
- **Particle properties:** Each particle has `x`, `y`, `vx`, `vy`, `color`, `radius`
  - Velocity: random between -0.25 and 0.25 px/frame
  - Radius: random between 1.3 and 2.8px
  - Colors cycle through 3 values:
    - Teal: `rgba(123, 189, 164, <alpha>)`
    - Warm: `rgba(212, 169, 138, <alpha>)`
    - Sky: `rgba(140, 184, 212, <alpha>)`
- **Movement:** Particles drift linearly, bounce off canvas edges (reverse velocity on collision)

**Connection lines between particles:**

- For every pair of particles closer than 110px, draw a line
- Line color: `rgba(123, 189, 164, <alpha>)` where `alpha = factor * (1 - distance / 110)`
  - Factor = `0.07` in dark mode, `0.12` in light mode
- Line width: 0.5px

**Text zone avoidance (critical):**

- Define a rectangular exclusion zone covering approximately the left ~55% of the container width and the middle ~55% of the height (where the heading, tagline, currently, and CTAs live)
- Approximately: `{ x: 30, y: "20% of height", width: 520, height: "55% of height" }`
- Any particle that drifts into this zone receives a gentle push force away from the zone center:
  ```
  dx = particle.x - zone_center_x
  dy = particle.y - zone_center_y
  dist = sqrt(dx² + dy²)
  particle.vx += (dx / dist) * 0.07
  particle.vy += (dy / dist) * 0.07
  ```
- Particles are initially spawned outside the text zone (retry random position up to 50 times)

**Mouse interaction (desktop only):**

- Track mouse position via `mousemove` on the container
- Reset to off-screen on `mouseleave`
- For particles within 120px of cursor:
  - Increase rendered radius by up to 3px (proportional to proximity)
  - Increase alpha by up to 0.4
  - Draw a faint glow circle at `radius + boost * 8` with low alpha
  - Draw connection lines from cursor to those particles (same alpha formula)

**Canvas setup:**

- 2x resolution for retina: `canvas.width = element.offsetWidth * 2; ctx.scale(2, 2)`
- Use `requestAnimationFrame` for the render loop
- Clean up on component unmount (cancel animation frame, remove event listeners)

**Theme awareness:**

- Read current theme from `document.documentElement.getAttribute("data-theme")`
- Dark mode: particle base alpha = 0.35, line factor = 0.07
- Light mode: particle base alpha = 0.25, line factor = 0.12 (compensates for lower contrast)

**Reduced motion:**

- Check `window.matchMedia("(prefers-reduced-motion: reduce)")`
- If true: render particles once in initial positions (static), don't run animation loop

**Props:**

```tsx
interface ParticleConstellationProps {
  className?: string;
}
```

The component renders just a `<canvas>` element that fills its container.

### 6b. Integrate into hero section

**File:** `src/app/page.tsx`

Wrap the hero section content and add the particle background:

```tsx
import ParticleConstellation from "@/components/ParticleConstellation";

// In the hero section:
<section className="min-h-[100vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-16 max-w-content mx-auto relative overflow-hidden">
  
  {/* Particle background — desktop only, hidden on mobile */}
  <ParticleConstellation className="absolute inset-0 z-0 hidden md:block" />

  {/* All existing hero content needs z-10 to sit above canvas */}
  <div className="relative z-10">
    <TerminalBoot onComplete={() => setTerminalDone(true)} />

    {/* CTA buttons */}
    <div
      className="flex flex-col sm:flex-row items-start gap-4 mt-10 ml-0 max-w-[640px]"
      style={{ /* existing fade-in styles */ }}
    >
      {/* ... buttons ... */}
    </div>

    {/* Scroll indicator */}
    <div className="mt-auto pt-12 flex justify-center" style={{ /* ... */ }}>
      {/* ... */}
    </div>
  </div>
</section>
```

**Important:** The canvas needs `pointer-events: auto` for mouse tracking, but the content above it also needs to be clickable. Solution: set `pointer-events: none` on the canvas wrapper and attach mouse event listeners directly to the `<section>` element instead, passing coordinates down. Or, set canvas to `pointer-events: none` and use a `mousemove` listener on the parent section.

---

## 7. Thread gauge (ThreadSVG) — no changes needed

The existing `ThreadSVG` component already:
- Shows only on `lg:` screens (CSS class `hidden lg:block`)
- Sits fixed on the left side of the viewport
- Draws scroll-progress and section nodes

It coexists fine with the particle constellation since particles avoid the left text zone. **No modifications required.**

---

## 8. Files changed — summary

| File | Action | What changes |
|------|--------|-------------|
| `src/app/globals.css` | **Edit** | Add `--color-name-highlight` to both `:root` and `[data-theme="dark"]` blocks |
| `src/app/layout.tsx` | **Edit** | "PYD" → "PRHD" in `title` and `openGraph.title` |
| `src/app/page.tsx` | **Edit** | Footer "PYD" → "PRHD"; wrap hero content in `relative z-10` div; add `<ParticleConstellation />` with `absolute inset-0 z-0`; change Download Resume button to use `--color-name-highlight` |
| `src/components/Nav.tsx` | **Edit** | Wordmark "PYD" → "PRHD" |
| `src/components/TerminalBoot.tsx` | **Edit** | Name color → `--color-name-highlight`; delete 3 dots; add rotating "currently:" line with state + effect; convert accent line from absolute to flow with 20px margin-bottom |
| `src/components/ParticleConstellation.tsx` | **New** | Canvas-based particle system with text zone avoidance, mouse interaction, theme awareness, reduced motion support |

---

## 9. Testing checklist

- [ ] Light mode: particles visible but subtle against linen background (#faf7f2)
- [ ] Dark mode: particles visible with slightly higher alpha against navy (#161c26)
- [ ] Mouse hover (desktop): nearby particles glow brighter, connection lines appear to cursor
- [ ] Text zone: particles drift away from the heading/tagline/CTA area, no overlap
- [ ] Mobile (< 768px): particles completely hidden (`hidden md:block`), clean text-only hero
- [ ] Reduced motion: particles render static in initial positions, no animation loop
- [ ] "currently:" line rotates every 3 seconds with 400ms opacity fade transition
- [ ] Accent line has ~20px visible gap before "Hey, I am..."
- [ ] Nav reads "PRHD" on all pages including /blog and blog post pages
- [ ] Browser tab title reads "PRHD — Prasana | Developer Portfolio"
- [ ] Three decorative dots are completely removed
- [ ] Download Resume button uses new cream color (`--color-name-highlight`)
- [ ] Name "Prasana Y Doshi" uses new lighter cream, not the old warm accent
- [ ] Thread gauge on left side still renders and animates on scroll (desktop only)
- [ ] No layout shift or FOUC on page load

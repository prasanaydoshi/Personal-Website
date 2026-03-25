# Particle Constellation — Visual Tweaks Spec

**Date:** March 25, 2026  
**File:** `src/components/ParticleConstellation.tsx`  
**Context:** Adjustments to particle visibility, connection line colors, particle count, and bounding box strictness.

---

## 1. Connection line colors — theme-dependent

Currently the connection lines between particles use `rgba(123, 189, 164, alpha)` (teal) in both modes. Change to:

**Dark mode:** White lines
```js
// BEFORE
ctx.strokeStyle = `rgba(123, 189, 164, ${0.07 * (1 - dist / linkDist)})`;

// AFTER
ctx.strokeStyle = `rgba(255, 255, 255, ${0.09 * (1 - dist / linkDist)})`;
```

**Light mode:** Black lines
```js
ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 * (1 - dist / linkDist)})`;
```

The alpha factors are bumped ~25% from the originals (0.07 → 0.09 for dark, 0.12 → 0.15 for light). This applies to both particle-to-particle lines AND cursor-to-particle lines.

**How to detect theme:** Read `document.documentElement.getAttribute("data-theme")` at the start of each animation frame (so it reacts live to theme toggles). Store as a boolean:

```js
const isDark = document.documentElement.getAttribute("data-theme") === "dark";
const lineColor = isDark ? "255, 255, 255" : "0, 0, 0";
const lineFactor = isDark ? 0.09 : 0.15;
```

Then use throughout the draw loop:
```js
ctx.strokeStyle = `rgba(${lineColor}, ${lineFactor * (1 - dist / linkDist)})`;
```

---

## 2. Increase particle count by 15%

```js
// BEFORE
const N = 30;

// AFTER
const N = 35;
```

---

## 3. Strict bounding box (hard boundary)

Replace the current soft-push force with a hard boundary. Particles cannot enter the text zone at all.

### Define the bounding box

The bounding box should cover the entire content area visible in the screenshot: from the accent line at the top, through the heading, tagline, "currently:" line, both CTA buttons, down to just above the scroll indicator. With generous padding.

```js
// Bounding box as percentages of the canvas container
const textZone = {
  left:   0.0,    // starts at left edge (text is left-aligned)
  top:    0.08,   // just above the accent line
  right:  0.65,   // covers text width + button width + padding
  bottom: 0.82,   // just below the buttons, above scroll indicator
};
```

These translate to pixel coordinates each frame:
```js
const zoneLeft   = textZone.left * canvasWidth;
const zoneTop    = textZone.top * canvasHeight;
const zoneRight  = textZone.right * canvasWidth;
const zoneBottom = textZone.bottom * canvasHeight;
```

### Hard boundary enforcement

On every frame, after updating particle position, check if it's inside the zone. If so, push it out to the nearest edge and reverse the relevant velocity component:

```js
particles.forEach(p => {
  // Normal movement
  p.x += p.vx;
  p.y += p.vy;

  // Bounce off canvas edges (existing)
  if (p.x < 0 || p.x > w) p.vx *= -1;
  if (p.y < 0 || p.y > h) p.vy *= -1;

  // Hard bounding box — if inside, eject to nearest edge
  if (p.x > zoneLeft && p.x < zoneRight && p.y > zoneTop && p.y < zoneBottom) {
    // Find nearest edge
    const dLeft   = p.x - zoneLeft;
    const dRight  = zoneRight - p.x;
    const dTop    = p.y - zoneTop;
    const dBottom = zoneBottom - p.y;
    const minDist = Math.min(dLeft, dRight, dTop, dBottom);

    if (minDist === dLeft)        { p.x = zoneLeft - 1;   p.vx = -Math.abs(p.vx); }
    else if (minDist === dRight)  { p.x = zoneRight + 1;  p.vx =  Math.abs(p.vx); }
    else if (minDist === dTop)    { p.y = zoneTop - 1;    p.vy = -Math.abs(p.vy); }
    else                          { p.y = zoneBottom + 1;  p.vy =  Math.abs(p.vy); }
  }
});
```

### Initial spawn outside zone

Already in the current code, but make sure the zone coordinates match the new larger box:

```js
for (let i = 0; i < N; i++) {
  let x, y, tries = 0;
  do {
    x = Math.random() * canvasWidth;
    y = Math.random() * canvasHeight;
    tries++;
  } while (
    x > zoneLeft && x < zoneRight && y > zoneTop && y < zoneBottom && tries < 80
  );
  // ... create particle
}
```

---

## 4. Connection lines also respect the bounding box (optional but recommended)

To prevent lines from visually crossing through the text zone, skip drawing a connection line if the midpoint of the two particles falls inside the bounding box:

```js
const midX = (particles[i].x + particles[j].x) / 2;
const midY = (particles[i].y + particles[j].y) / 2;
if (midX > zoneLeft && midX < zoneRight && midY > zoneTop && midY < zoneBottom) {
  continue; // skip this line, it would cross the text
}
```

This prevents constellation lines from drawing across the heading even when two particles are on opposite sides of the text zone.

---

## Summary

| # | Change | Detail |
|---|--------|--------|
| 1 | Line colors | White (`rgba(255,255,255,...)`) in dark mode, black (`rgba(0,0,0,...)`) in light mode |
| 2 | Line visibility | Alpha factor +25%: dark 0.07→0.09, light 0.12→0.15 |
| 3 | Particle count | 30 → 35 (+15%) |
| 4 | Bounding box | Hard boundary — particles ejected to nearest edge on contact, velocity reversed. Zone covers 0–65% width, 8–82% height |
| 5 | Line clipping (optional) | Skip drawing lines whose midpoint falls inside the bounding box |

All changes are in a single file: `ParticleConstellation.tsx`.

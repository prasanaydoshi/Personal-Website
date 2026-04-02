# PRHD Logo Replacement Directive (v2)

**Date:** April 1, 2026  
**Scope:** Replace all instances of the "PRHD" text wordmark and favicon with the SVG logo file. Fix navigation bug on subpages. Fix SVG viewBox so logo is actually visible.

---

## Critical: SVG viewBox Fix

The current `logo.svg` has a viewBox of `0 0 2666.6667 2666.6667` but the actual logo artwork (the masked teal letterforms) only occupies a ~500×558 region near the center. When rendered at nav height (~28px), the letters are sub-pixel and invisible.

**Fix:** Open `logo.svg` and change the viewBox to crop to the content bounds. Replace:

```xml
viewBox="0 0 2666.6667 2666.6667"
```

With (adding ~20px padding around the computed content area):

```xml
viewBox="1059 1033 540 600"
```

Also update the `width` and `height` attributes to match the new aspect ratio, or remove them entirely and let CSS control sizing:

```xml
<!-- Remove these fixed dimensions -->
<!-- width="2666.6667" height="2666.6667" -->
```

**Alternative (recommended):** Open the SVG in Inkscape → select all content → `Edit > Resize Page to Selection` (or `Shift+Ctrl+E`) → Save. This auto-crops the viewBox to the artwork bounds.

---

## Theme-Awareness Note

The logo uses `fill:#ffffff` (white) paths inside a `<mask>` to reveal a `fill:#7bbda4` (teal) rectangle. This means the logo will always render as teal regardless of theme — it won't adapt to light/dark mode automatically.

**If you want theme-adaptive color:**  
You would need to refactor the SVG to use `currentColor` instead of the mask+rectangle technique. This is a non-trivial change given the Inkscape-generated mask structure. For now, the teal logo works on both light and dark backgrounds since `#7bbda4` has sufficient contrast against both.

---

## Files to Modify

### 1. `src/components/Nav.tsx`

**Bug fix:** Change `href="#"` to `href="/"` on the wordmark link so it navigates home from any page (currently broken on `/blog/*` routes — clicking PRHD on a blog post just scrolls to top of that page instead of going home).

**Logo swap:** Replace the plain-text "PRHD" with an `<img>` of the cropped SVG logo.

```tsx
// BEFORE
<a href="#" className="font-heading font-bold text-lg tracking-tight"
   style={{ color: "var(--color-text-primary)" }}>
  PRHD
</a>

// AFTER
<a href="/" aria-label="PRHD — Home">
  <img src="/logo.svg" alt="PRHD logo" className="h-7 w-auto" />
</a>
```

### 2. `src/app/layout.tsx`

No change needed — the metadata title `"PRHD — Prasana | Developer Portfolio"` is a `<title>` tag, not visual branding.

### 3. `src/app/page.tsx` — Footer

The footer colophon `"> end of log. // PRHD"` is stylistic text. Leave as-is unless you want the SVG logo there too.

### 4. Favicon — `src/app/`

Next.js 14 App Router auto-detects favicon files in the `app/` directory:

- Copy the **cropped** SVG into `src/app/icon.svg` — Next.js will serve it automatically as the site icon.
- Optionally also provide `src/app/favicon.ico` (32×32 conversion) for legacy browser support.
- Remove any existing `favicon.ico` if present.

### 5. Place the Logo File

- Copy the cropped SVG to **`/public/logo.svg`** (for the Nav `<img>` to reference).
- Copy the same cropped SVG to **`src/app/icon.svg`** (for the favicon).

---

## Summary

| # | Change | File | What |
|---|--------|------|------|
| 0 | **SVG fix** | `logo.svg` | Crop viewBox from `0 0 2666 2666` to `1059 1033 540 600` |
| 1 | Bug fix | `Nav.tsx` | `href="#"` → `href="/"` |
| 2 | Logo swap | `Nav.tsx` | Text "PRHD" → `<img src="/logo.svg" />` |
| 3 | Favicon | `src/app/icon.svg` | Add cropped SVG logo as favicon |
| 4 | Asset | `/public/logo.svg` | Place cropped logo file here |
| 5 | Optional | `page.tsx` footer | Replace or keep text "PRHD" |
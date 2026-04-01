# PRHD Logo Replacement Directive

**Date:** April 1, 2026  
**Scope:** Replace all instances of the "PRHD" text wordmark and favicon with the SVG logo file. Fix navigation bug on subpages.

---

## Files to modify

### 1. `src/components/Nav.tsx`

**Bug fix:** Change `href="#"` to `href="/"` on the wordmark link so it navigates home from any page (currently broken on `/blog/*` routes).

**Logo swap:** Replace the plain-text "PRHD" with an inline `<img>` (or inline SVG) of the logo file. The logo should be placed in `/public/` (e.g., `/public/logo.svg`) and referenced as `/logo.svg`.

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

If the logo needs to be theme-aware (different fill for light/dark), import it as a React component instead and apply `style={{ color: "var(--color-text-primary)" }}` with `currentColor` fills in the SVG.

---

### 2. `src/app/layout.tsx`

No text change needed here (metadata title `"PRHD — Prasana | Developer Portfolio"` is fine as-is — it's a `<title>` tag, not visual branding).

---

### 3. `src/app/page.tsx` — Footer

The footer colophon `"> end of log. // PRHD"` is stylistic. Leave as-is unless you want the logo there too — in which case inline the SVG at a smaller size (h-4) next to the text.

---

### 4. Favicon — `src/app/`

Next.js 14 App Router auto-detects favicon files placed in the `app/` directory. To set the SVG as the favicon:

- Copy the SVG into `src/app/icon.svg`. Next.js will serve it automatically as the site icon.
- If you also want a traditional `.ico` fallback, convert the SVG to a 32×32 `.ico` and place it at `src/app/favicon.ico`.
- Remove any existing `favicon.ico` if present.

---

### 5. Place the logo file

- Copy your SVG logo to **`/public/logo.svg`** (for the Nav component to reference via `<img src="/logo.svg" />`).
- Copy the same SVG to **`src/app/icon.svg`** (for the favicon).

---

## Summary

| Change | File | What |
|---|---|---|
| Bug fix | `Nav.tsx` | `href="#"` → `href="/"` |
| Logo swap | `Nav.tsx` | Text "PRHD" → `<img src="/logo.svg" />` |
| Favicon | `src/app/icon.svg` | Add SVG logo as favicon |
| Asset | `/public/logo.svg` | Place logo file here |
| Optional | `page.tsx` footer | Replace or keep text "PRHD" |

---

## Theme-awareness note

If your SVG logo uses hardcoded fill colors (e.g., white or dark fills), it won't adapt to theme toggles automatically. If you want it to respond to light/dark mode, the SVG's fill values need to use `currentColor`, and you'd wrap it in a React component rather than using an `<img>` tag (since `<img>` doesn't inherit CSS color).
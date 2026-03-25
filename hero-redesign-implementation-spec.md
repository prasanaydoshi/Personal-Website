# Hero Redesign — Addendum (Mini Spec)

**Date:** March 25, 2026  
**Context:** Remaining tweaks after initial implementation. All other changes from the main spec are done.

---

## 1. Name color → fixed #7BBDA4

**File:** `src/components/TerminalBoot.tsx`

The name "Prasana Y Doshi" should be `#7BBDA4` (the teal accent), hardcoded — not theme-dependent, same color in both light and dark mode.

```tsx
// BEFORE
<span style={{ color: "var(--color-name-highlight)" }}>
  Prasana Y Doshi
</span>

// AFTER
<span style={{ color: "#7BBDA4" }}>
  Prasana Y Doshi
</span>
```

You can also remove the `--color-name-highlight` CSS variable from `globals.css` if nothing else uses it — it's no longer needed.

---

## 2. Remove the period after the name

**File:** `src/components/TerminalBoot.tsx`

Delete the teal dot that follows the name:

```tsx
// DELETE THIS
<span style={{ color: "var(--color-accent-thread)" }}>.</span>
```

The heading should just end with "Prasana Y Doshi" — no trailing punctuation.

---

## 3. Download Resume button → #7BBDA4

**File:** `src/app/page.tsx` — CTA buttons in the hero section

Change the background color to the same fixed teal. Also update the text color to dark (`#1a1a1a`) for contrast.

```tsx
// BEFORE
style={{
  backgroundColor: "var(--color-name-highlight)",
  color: "#2C2C2C",
}}

// AFTER
style={{
  backgroundColor: "#7BBDA4",
  color: "#1a1a1a",
}}
```

Same color in both light and dark mode — no CSS variable, just the hardcoded hex.

---

## 4. Centre both CTA buttons

**File:** `src/app/page.tsx` — the flex container wrapping both buttons

Change alignment from `items-start` to `items-center` and add `justify-center`:

```tsx
// BEFORE
<div
  className="flex flex-col sm:flex-row items-start gap-4 mt-10 ml-0 max-w-[640px]"
  ...
>

// AFTER
<div
  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 max-w-[640px] mx-auto"
  ...
>
```

The key changes: `items-start` → `items-center`, add `justify-center`, add `mx-auto`, remove `ml-0`.

---

## Summary

| # | Change | File |
|---|--------|------|
| 1 | Name color → hardcoded `#7BBDA4` | `TerminalBoot.tsx` |
| 2 | Remove period after name | `TerminalBoot.tsx` |
| 3 | Download Resume button bg → `#7BBDA4` | `page.tsx` |
| 4 | Centre both CTA buttons | `page.tsx` |

Optional cleanup: delete `--color-name-highlight` from `globals.css` (both `:root` and `[data-theme="dark"]` blocks) since it's no longer referenced.
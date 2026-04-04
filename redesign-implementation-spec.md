# Personal Website Change Request

Repo: `prasanaydoshi/Personal-Website`

Goal: keep the current visual style and overall UI, but make the copy more personal, clean up placeholder content, remove fake visuals for work-related projects, and add a simple tabbed resume switcher.

## 1) Hero rotating lines

File: `src/components/TerminalBoot.tsx`

Replace the current `identities` array with this:

```tsx
const identities = [
  "diving into data pipelines at Munich Re",
  "building ML models that move the needle",
  "deep in data, deeper in curiosity",
  "analyzing equities",
  "planning my next dive trip",
  "prompting claude code",
  "120+ dives deep, still descending",
];
```

Notes:
- Keep the current animation and switching behavior exactly the same.
- Only update the content in the array.

## 2) About section cleanup

File: `src/app/page.tsx`

In `ENTRY 001 — About / Signal`, remove this part from the first paragraph:

`and exploring some of the latest Cafe's downtown.`

Use this cleaned-up paragraph instead:

```tsx
<p
  className="text-md leading-relaxed"
  style={{ color: "var(--color-text-primary)" }}
>
  Hi, I&apos;m Prasana. I study Computer Science at the University of
  Waterloo and Business at Wilfrid Laurier University. I love building
  things that drive impact and help stakeholders. Currently, I am
  interning at Munich Re.
</p>
```

Leave the second paragraph as-is unless there is a strong reason to tighten it for flow.

## 3) Rename and update the personal section

File: `src/app/page.tsx`

In `ENTRY 005`, change the title from:

```tsx
title="Beyond the Terminal"
```

to:

```tsx
title="Away from the Screen"
```

Replace the current side annotations with:

```tsx
<Annotation type="metric" label="Dives logged">
  120+
</Annotation>
<Annotation type="metric" label="Current pursuit">
  Private pilot licence
</Annotation>
<Annotation type="metric" label="Stage background">
  Regional theatre
</Annotation>
```

Replace the lorem ipsum paragraph with:

```tsx
<p
  className="text-md leading-relaxed"
  style={{ color: "var(--color-text-primary)" }}
>
  I am usually doing something that gets me out of routine. In the summers,
  that often means diving, and lately it also means working toward my private
  pilot licence. I have also spent a big part of my life around public
  speaking and theatre, with years of performing in regional plays shaping how
  I communicate and carry myself. Beyond that, I enjoy hiking, travelling, and
  exploring new places whenever I get the chance.
</p>
```

## 4) Deep Dives section cleanup and expansion

Files:
- `src/app/page.tsx`
- `src/components/ProjectCard.tsx`

### Required changes
- Keep the current general card style and spacing.
- Do **not** add any screenshots, mock visuals, or image placeholders.
- Remove the visual placeholder block from the featured project cards completely.
- Add a third featured experience so the section can better represent:
  - 1 ML experience
  - 1 SWE experience
  - 1 Data experience

### ProjectCard component changes
In `src/components/ProjectCard.tsx`:
- Remove the left/right visual placeholder block entirely.
- Remove the `imageAlt` prop if it is no longer used.
- Keep:
  - title
  - context
  - approach
  - outcome
  - tech
  - metrics
  - optional link
- Rework the layout so the content fills the space cleanly without the image column.
- Keep the current typography and reveal animation style.

### Data source changes
In `src/app/page.tsx`:
- Update the `featuredProjects` array so it includes 3 total experiences.
- Keep the structure consistent with the current UI.
- No image fields needed if `ProjectCard` no longer uses them.

### Content direction
Use three experiences that clearly map to:
- ML
- SWE
- Data

The exact experience copy can be updated based on the real resume content, but the UI should be ready for three experiences with no placeholder visuals.

## 5) Add a tabbed resume switcher without changing the overall UI

Files:
- `src/components/ContactBlock.tsx`
- optionally create `src/components/ResumeSwitcher.tsx`

### Goal
Keep the current styling and feel. Do not redesign this area. Just replace the single static resume link with a clean tabbed switcher.

### Desired behavior
- Separate tabs:
  - ML
  - SWE
  - Data
- Clicking a tab updates:
  - the active resume label
  - the download link
- Keep the existing visual tone and spacing.
- No extra images or big redesigns.

### Suggested implementation
Use either:
- a small local state block inside `ContactBlock.tsx`, or
- a dedicated `ResumeSwitcher` component

Suggested resume files in `public/`:
- `/resume-ml.pdf`
- `/resume-swe.pdf`
- `/resume-data.pdf`

Suggested shape:

```tsx
const resumes = {
  ml: {
    label: "Machine Learning",
    href: "/resume-ml.pdf",
  },
  swe: {
    label: "Software Engineering",
    href: "/resume-swe.pdf",
  },
  data: {
    label: "Data",
    href: "/resume-data.pdf",
  },
};
```

### UI direction
- Keep the existing "Resume" section where it is.
- Add 3 small tabs above or beside the download link.
- Keep the same overall style language as the rest of the site.
- The download CTA should update based on the selected tab.
- Default tab can be `ML` for now unless there is a better reason to default to another one.

## 6) Things to preserve

Please do **not** change these unless necessary:
- the overall site theme
- the current layout structure
- the existing hero animation behavior
- the current tone of the site
- the current spacing system unless needed after removing the project image column

## 7) Optional cleanup items

These are optional but recommended:

### Blog section
If the blog posts are placeholder-only and not backed by real pages yet, consider hiding that section until the content is real.

### Contact form
The contact form currently logs to console only. Either:
- wire it up properly, or
- simplify the section and rely on direct email + socials for now

## 8) Summary of final requested changes

- Update hero rotating lines
- Clean up the About paragraph
- Rename `Beyond the Terminal` to `Away from the Screen`
- Replace lorem ipsum with the provided personal copy
- Update the personal side annotations
- Remove all fake project visual placeholders
- Add a third featured experience
- Keep the current UI style
- Add a separate-tab resume switcher for ML / SWE / Data
- No pictures for work-related experience cards
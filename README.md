# PYD — The Thread Log Portfolio

A distinctive developer portfolio built with Next.js 14, featuring a scroll-drawing SVG thread, terminal boot animation, and an editorial log-entry layout system.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS 3 + CSS custom properties (design tokens)
- **Animation:** Framer Motion + CSS animations + Intersection Observer
- **Fonts:** Satoshi, General Sans (Fontshare), JetBrains Mono (Google Fonts)
- **Deployment:** Vercel

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## Deploy to Vercel (Step by Step)

### Step 1: Push to GitHub

```bash
# Initialize git repo
git init
git add .
git commit -m "Initial commit: PYD portfolio"

# Create repo on GitHub (via github.com or CLI)
gh repo create pyd-portfolio --public --source=. --push

# Or manually:
git remote add origin https://github.com/YOUR_USERNAME/pyd-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New → Project"**
3. Import your `pyd-portfolio` repository
4. Vercel auto-detects Next.js — leave all defaults
5. Click **"Deploy"**
6. Your site will be live at `https://pyd-portfolio.vercel.app` (or similar)

### Step 3: Connect Your Custom Domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g., `pyd.dev`)
3. Vercel will give you DNS records to add
4. In **Cloudflare DNS** (since you use Cloudflare):
   - Add a `CNAME` record: `@` → `cname.vercel-dns.com`
   - Add a `CNAME` record: `www` → `cname.vercel-dns.com`
   - **Important:** Set Cloudflare proxy to **DNS only** (grey cloud) for Vercel to handle SSL
5. Wait for DNS propagation (usually < 5 minutes)
6. Vercel auto-provisions SSL

### Step 4: Auto-Deploys

Every push to `main` will auto-deploy. Preview deployments are created for PRs.

---

## Customization Guide

### Replace Placeholder Content

All content is in **`src/app/page.tsx`**. Update these sections:

| Section | What to change |
|---------|---------------|
| **Hero** | Your name and tagline are already set |
| **About (Entry 001)** | Edit the bio paragraphs and annotation sidebar |
| **Deep Dives (Entry 002)** | Replace `featuredProjects` array with your real projects |
| **Index (Entry 003)** | Replace `otherProjects` array — add your stock dashboard link |
| **Blog (Entry 004)** | Replace `blogPosts` array or connect to a CMS/MDX |
| **Beyond (Entry 005)** | Edit the personal interests paragraph |
| **Contact (Entry 006)** | Update email in `ContactBlock.tsx` |

### Add Your Photo

Replace the photo placeholder in Entry 001:
1. Add your image to `/public/images/`
2. In `page.tsx`, find the About section's `LogEntry` and add an `<Image>` in the aside

### Add Your Resume

Drop your PDF at `/public/resume.pdf` — the download buttons already link to it.

### Update Social Links

Edit `src/components/ContactBlock.tsx`:
- Update the GitHub URL
- Update the LinkedIn URL
- Update the email address

### Blog Setup (Future)

For a real blog, you have options:
- **MDX:** Add `@next/mdx` and create posts in `src/app/blog/[slug]/`
- **CMS:** Connect Contentful, Sanity, or Notion as a headless CMS
- **Simple:** Keep the current static posts array and update manually

---

## Project Structure

```
pyd-portfolio/
├── public/                     # Static assets (resume.pdf, images)
├── src/
│   ├── app/
│   │   ├── globals.css         # Design tokens + base styles
│   │   ├── layout.tsx          # Root layout (ThemeProvider, metadata)
│   │   └── page.tsx            # Main portfolio page (all content)
│   ├── components/
│   │   ├── Annotation.tsx      # Marginal notes (metrics, tags, timestamps)
│   │   ├── BlogPreview.tsx     # Blog post previews
│   │   ├── ContactBlock.tsx    # Contact form + socials
│   │   ├── LogEntry.tsx        # Section wrapper with scroll reveal
│   │   ├── Nav.tsx             # Sticky nav + theme toggle
│   │   ├── ProjectCard.tsx     # Featured project deep-dive
│   │   ├── ProjectRow.tsx      # Compact project listing
│   │   ├── ScrollProgressBar.tsx # Scroll progress with section ticks
│   │   ├── TerminalBoot.tsx    # Hero typing animation
│   │   ├── ThemeProvider.tsx   # Dark/light mode context
│   │   └── ThreadSVG.tsx       # Scroll-drawing SVG thread
│   └── hooks/
│       ├── useIntersectionReveal.ts  # Scroll-triggered visibility
│       └── useScrollProgress.ts      # Scroll position tracking
├── tailwind.config.ts          # Tailwind with custom design tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Design System

- **Colors:** Warm pastels — sage/teal thread (`#7BBDA4`), sky blue secondary (`#8CB8D4`), warm linen backgrounds
- **Typography:** Satoshi (headings), General Sans (body), JetBrains Mono (code/annotations)
- **Layout:** 12-column asymmetric grid (7/4 split for content/annotations)
- **Motion:** Scroll-triggered reveals, terminal typing, SVG thread drawing
- **Accessibility:** Skip links, ARIA labels, keyboard navigation, reduced-motion support

---

## Connect Contact Form to Email

The contact form currently logs to console. To make it send real emails:

**Option A: Formspree (easiest)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, get your form ID
3. In `ContactBlock.tsx`, change the form action:
   ```tsx
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });
     setSubmitted(true);
   };
   ```

**Option B: Next.js API route + Resend**
1. `npm install resend`
2. Create `src/app/api/contact/route.ts`
3. Use Resend to send emails from your domain

---

## License

MIT

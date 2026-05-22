# StaaS Site — Claude Context

This is the marketing site for **Startup as a Service (StaaS)** by **All Shapes** (allshapes.io).
Live at: `staas.allshapes.io` (not yet deployed to prod — currently on preview branch).

---

## Stack

- **Astro 6.x** — static output, file-based routing, content collections
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` (CSS `@theme` tokens in `src/styles/global.css`, NOT a `tailwind.config.mjs`)
- **Fonts** — Recoleta (self-hosted woff2/woff in `public/fonts/`), Inter via Google Fonts
- **Deployment** — Vercel (preview branch), also tested on Netlify Drop
- **Repo** — GitHub: `TPRHorak/staas-site`
- **Branch** — `step-9/polish-feedback` (open PR #6)

---

## Design System

| Token | Value |
|---|---|
| Navy deep (hero bg) | `#1F1B4A` |
| Navy mid | `#2B2660` |
| Navy border | `#3d3870` |
| Cream | `#F2ECCA` |
| Cream deep | `#ECE4B8` |
| Cream border | `#d8d0a8` |
| Coral (accent) | `#E34C39` |
| Muted purple | `#a09cbe` |
| Dim purple | `#575280` |

- Font serif = Recoleta (`font-serif` in Tailwind)
- Font mono = system mono (`font-mono`)
- Font sans = Inter (`font-sans`)
- Section labels use `font-mono text-xs` in muted grey (`#575280`) — NOT coral (coral was too distracting as a label)
- Dark-first design: most sections are navy backgrounds, cream sections for contrast

---

## Page Structure (homepage, in order)

1. `Hero` — "Startup as a Service." h1, serif subline, case study image mosaic (FMJ tall + DK + AC stacked)
2. `ClientTicker` — CSS marquee, clients + sectors, `✦` separator
3. `AntiPositioning` — "AI made writing code cheap..." + 3 competitor cards
4. `WhoItsFor` — 3-column card grid, three ICP profiles
5. `HowWeStart` — 2×2 step grid (Sprint → Onboard → Ship → Learn)
6. `PricingTiers` — 3 tiers: Launch €12,500 / Scale €19,500 / Embed €17.5–25.5k
7. `SelectedWork` — 2×2 image grid with gradient overlay, 4 case studies
8. `Testimonials` — 3 rows, all cream bg, all navy quote text (uniform)
9. `AboutTeam` — Tom Horak + Callum, cream bg
10. `WhatWeBelieve` — LEFT: cream panel "We do" / RIGHT: dark panel "We don't" with coral strikethrough titles
11. `FAQ` — 10 Q&As, `<details>` accordion, cream bg
12. `FinalCTA` — "Let's build something that works.", dark bg

---

## Other Pages

- `/sprint` — Sprint page: Week 1 (find the bet) + Week 2 Path A/B, €6,250
- `/work` — Work index (lists case studies)
- `/work/[slug]` — Individual case studies (content collections in `src/content/work/`)
- `/compare` — Compare table page
- `/notes` — Notes index + individual note pages

---

## Key Files

```
src/
  styles/global.css        — @theme tokens, ticker animation, font-face rules
  layouts/BaseLayout.astro — head, Nav, Footer, password gate script
  components/
    Nav.astro              — sticky cream nav, "Book the sprint" CTA
    Footer.astro           — navy footer, offices: USA/UK/Germany/Czech Republic/India
    Hero.astro             — image mosaic hero (no terminal widget)
    ClientTicker.astro     — CSS marquee
    AntiPositioning.astro
    WhoItsFor.astro
    HowWeStart.astro
    PricingTiers.astro
    SelectedWork.astro
    Testimonials.astro
    AboutTeam.astro
    WhatWeBelieve.astro
    FAQ.astro
    FinalCTA.astro
  content/work/            — .md files for case studies
  pages/
    index.astro            — wires all homepage components
    sprint.astro           — Sprint page
    work/index.astro       — work listing
    compare.astro
    notes/

public/
  fonts/                   — recoleta-regular.woff2, recoleta-semibold.woff2 (+ .woff)
  case-studies/            — five-minute-journal.jpg, doctors-kitchen.jpg, rnt-fitness.jpg, allens-camera.jpg, unapp.jpg
  logos/                   — as-logo-white.svg, as-logo.svg
```

---

## Password Gate

A client-side JS password overlay is in `BaseLayout.astro`.
Password: `allshapes` — stored in `sessionStorage` once entered.
This is for preview sharing only (not cryptographic security).

---

## Pending / Ideas Discussed

- **New lower tier** (~€5–6k/month, support-oriented) — discussed but not yet named or built. User wants to add this below Launch. Scope: bug fixes, small improvements, App Store submissions, async advice.
- **Callum's last name** — unknown, used "Callum" only in AboutTeam.
- **Tom bios** — placeholder bios written; Tom should verify accuracy.
- **Nav** — still uses old logo `acs_logo_clean.png`; could be updated to SVG logos in `public/logos/`.
- **Vercel deployment protection** — still on for preview URLs, which is why a Netlify deploy was tried. Turn off at: Vercel → Project Settings → Deployment Protection.

---

## Brand Voice

- Direct, confident, no agency fluff
- Serif (Recoleta) for headlines and big statements
- Monospace for labels and technical asides
- No discovery theatre, no equity, no rotating juniors — these are core positioning points
- All prices in EUR (€), UK spelling

---

## Commands

```bash
npm run dev      # local dev server
npm run build    # build to dist/
git push origin step-9/polish-feedback  # push to preview branch
```

Case studies content is in `src/content/work/*.md` — edit those for copy changes to individual project pages.

The full site copy (all sections as plain text) is at:
`/Users/tprhorak/Desktop/Startup as a Service StaaS/StaaS Site Copy.md`

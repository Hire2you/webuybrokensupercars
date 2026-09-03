# Cursor Instructions — We Buy Broken Supercars Restyle

Use with Composer 2.5. Work through these in order, in separate prompts —
don't paste them all at once. Confirm each stage looks right (run the dev
server, eyeball it) before moving to the next.

Before starting: add `design-system.md` to the root of the
`webuybrokensupercars` repo and commit it. Reference it by path in every
prompt below rather than re-pasting the spec.

---

## Stage 0 — Confirm the codebase is copied and running

If you haven't already:

```
Copy all the source files from ../webuybrokenjaguars into this project —
components, pages, styles, configs, everything except .git, node_modules,
and .env. Then run the install and confirm the project builds and runs
locally.
```

---

## Stage 1 — Audit how styling is currently structured

```
Look at how colours, fonts, spacing, and border-radius are defined across
this project — is it a Tailwind config, CSS variables, a central theme
file, or hardcoded per-component? Give me a summary of every place a colour
or font value is set before we change anything.
```

Read the summary before continuing — it tells you whether Stage 2 is quick
or needs a wider sweep.

---

## Stage 2 — Establish the new design tokens

This project uses Tailwind v4 with no `tailwind.config.*` — theme lives in
`app/globals.css` via `:root` CSS variables and `@theme inline`. There's
also a duplicated hardcoded accent colour (`#1f7a52` / `GREEN_ON_DARK`)
scattered across ~20 files that isn't in the token system at all, plus a
separate palette in the email templates. Do this in four sub-stages so
each is checkable before moving on.

**2a — Replace the core tokens in `app/globals.css`:**

```
In app/globals.css, replace the existing CSS variables in :root and the
@theme inline block with the tokens from design-system.md — map every
current variable to its closest new equivalent:

--background → --bg-primary (#080808)
--foreground → --text-primary (#F7F7F7)
--brand-green / --brand-green-dark / --brand-green-mid / --green-hover →
  --red-primary / --red-dark / --red-bright (#E21B16 / #9D0D0A / #FF2B24)
--jet-black / --ink → --bg-dark (#030303)
--brand-slate / --grey-secondary → --text-secondary / --text-muted
--line / --grey-border → --border-primary / --border-light
--off-white → --text-primary
--placeholder, --plate-yellow → keep as-is, these are functional not brand
Hero-specific vars (--hero-asphalt*, --hero-lane) → keep for now, we'll
  handle the hero separately in Stage 3

Add any design-system.md tokens that don't have a Jaguars equivalent
(--radius-sm, --radius-md, --radius-lg, --container-width, --red-glow) as
new variables.

Update every Tailwind class usage that referenced the old variable names
(bg-brand-green, text-ink, brand-green-dark, etc.) to use the new token
names instead, across all components and pages.

Don't touch the hardcoded #1f7a52 occurrences, GREEN_ON_DARK constant, or
the email template palette yet — that's the next step. List every file you
changed.
```

**2b — Sweep the hardcoded accent colour:**

```
Across the whole project, replace every occurrence of the hardcoded accent
colour #1f7a52 (and its hover pair #2a9d6a) with var(--red-primary) and
var(--red-bright) respectively — including:
- The local GREEN_ON_DARK constant defined in app/about/page.tsx,
  app/about/AboutHero.tsx, app/blog/page.tsx,
  app/components/WhatWeBuy.tsx, app/components/Testimonials.tsx,
  app/how-it-works/page.tsx, app/sell-my-broken-jaguar-kent/page.tsx
  (rename the constant to something brand-neutral like ACCENT_ON_DARK)
- Tailwind arbitrary values like text-[#1f7a52], bg-[#1f7a52],
  hover:bg-[#1f7a52]/10
- components/Button.tsx accent variant, components/SectionHeading.tsx dark
  eyebrow, components/IconSquare.tsx solid variant
- Related hardcoded shades: #1a6b4a, #083528, #021610, #031c14, #0c1210 —
  replace with the nearest design-system.md dark/red token
- One-off hardcodes: #3dba7a in Footer.tsx, #f3f6f4 in Hero.tsx background
  (leave #e30613 badge, #003399/#0056b3 plate blue, and #25D366 WhatsApp
  green untouched — those aren't brand colours)

List every file changed.
```

**2c — Radius sweep:**

```
Shrink border radius across the project to match design-system.md exactly:
rounded-2xl and rounded-xl → rounded-md (6px) for cards, forms, FAQ, blog
cards, and image wrappers. rounded-lg → rounded-md or rounded-sm (4px) for
icon squares and small inner elements as appropriate. Buttons and inputs →
rounded-sm (4px). Leave rounded-full (pills, avatars, blur orbs, step
dots) untouched — that's not covered by design-system.md. List every file
changed and flag any component where shrinking the radius looks visually
broken so we can review it.
```

**2d — Font:**

```
Keep Bodoni Moda (font-numeral) exactly as currently wired up for
decorative numerals — no change needed there. Confirm font-sans and
font-display still resolve to Inter after the token changes above.
```

Run the dev server after each sub-stage and check nothing's visually
broken before moving to the next. Once 2a–2d are done, the site should be
in the new palette globally, even if section-specific details (hero
lighting, form styling, process gradients) aren't polished yet — that's
Stage 3.

**Note:** `lib/email/valuation-email-templates.ts` has its own duplicate
`BRAND` object and hardcoded Arial font — this doesn't render through CSS
so it's untouched by 2a–2d. Handle it as its own small task once the main
site is done:

```
Update the BRAND object in lib/email/valuation-email-templates.ts to use
the design-system.md colour values instead of the Jaguars greens. Leave
the font as Arial/Helvetica — email clients don't reliably support Inter.
```

---

## Stage 3 — Section-by-section detail pass

Run these one at a time, checking the result after each. Attach the
reference screenshot alongside the prompt for visual comparison where
useful.

**Hero:**
```
Restyle the hero section per the "Hero Section" and "Headings" sections
of design-system.md — but keep the existing hero structure and the
HeroPillars.tsx pillar design exactly as it is. Do not remove, redesign,
or restructure the pillars — only recolour them.

Specifically:
- In HeroPillars.tsx, replace the BRAND_GREEN constant (and any other
  hardcoded green fill/stroke values) with the new red tokens
  (var(--red-primary), var(--red-dark), var(--red-bright) as appropriate)
  so the pillars render in red instead of green, keeping their current
  shape, layout, and animation untouched.
- Update the --hero-asphalt, --hero-asphalt-dark, --hero-asphalt-lit, and
  --hero-lane CSS variables in globals.css to darker near-black tones that
  fit design-system.md (--bg-primary / --bg-dark family) instead of their
  current green-tinted values.
- Apply the subtle red radial gradient background and red framing light
  from the "Hero Section" spec around/behind the existing pillars, rather
  than replacing them with a new background treatment.
- Update the H1 to the two-tone treatment (first line white, key phrase in
  red) per the Headings section.

List every file changed, and show me before/after on the pillar colours
specifically so I can check they still look intentional in red rather than
just a straight green-to-red swap.
```

**Valuation form:**
```
Restyle the valuation form per the "Valuation Form" section of
design-system.md — dark semi-transparent container with red border,
dark inputs with red focus states, and keep the UK registration input's
yellow numberplate styling.
```

**Process / "three easy steps" section:**
```
Restyle the process section per the "Process Section" section of
design-system.md — active/first step with the red gradient panel, other
steps dark surface, large italic step numbers.
```

**Cards and the supercar model grid:**
```
Restyle all card components (feature cards, the supercar brand/model grid,
review cards) per the "Cards", "Supercar Brand / Model Grid", and
"Reviews" sections of design-system.md.
```

**FAQ:**
```
Restyle the FAQ section per the "FAQ" section of design-system.md,
including the active-state left border and icon colour change.
```

**CTA banners, header, footer:**
```
Restyle the CTA banner(s), header, and footer per the corresponding
sections of design-system.md.
```

---

## Stage 4 — Content and brand pass (do this after styling is settled)

```
Search this whole project for anything referencing "Jaguar" or "JBerry" —
page titles, meta descriptions, on-page copy, image alt text, schema
markup, analytics/tracking IDs, and environment variables. List everything
you find, grouped by file, so I can review before anything is changed.
```

Review the list, then work through swapping in supercars-specific content,
imagery, and your own analytics/tracking IDs.

---

## Stage 5 — Commit and deploy

```bash
git add .
git commit -m "Restyle: apply supercars design system"
git push
```

Then connect the repo to a new Vercel project (if not already done) and
point `webuybrokensupercars.co.uk` at it once you're happy with the result
on the temporary Vercel URL.

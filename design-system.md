# We Buy Broken Supercars — Website Design System

This document is the single source of truth for the visual restyle of this site.
The site structure, layout, and component logic should remain as inherited from
the We Buy Broken Jaguars codebase — only visual styling, typography, imagery,
and branding change.

## Overall Style

Premium, aggressive, high-end automotive aesthetic. The site should feel:

- Luxury
- Performance-focused
- Dark and sophisticated
- Modern
- Trustworthy
- Slightly dramatic without looking like a gaming website
- Similar in feel to premium supercar manufacturers, performance tuning brands
  and luxury automotive dealerships

**Design principle:** "Luxury supercar buyer meets premium automotive
performance brand." NOT "red and black gaming website." Red should account
for roughly 10–15% of the visible interface. Black, charcoal, white and
automotive imagery should dominate.

**Visual priority order:**
1. Cars / automotive photography
2. Strong white typography
3. Deep black surfaces
4. Red accents
5. Subtle borders and shadows

**Avoid:**
- Excessive gradients
- Neon/cyberpunk styling
- Too much bright red
- Rounded SaaS-style cards
- Overly playful UI
- Excessive glow effects
- Pure flat grey backgrounds
- Generic Bootstrap appearance
- Large 15px–30px SaaS-style rounded corners

---

## Design Tokens (CSS Variables)

These are the single source of truth for colour, radius, font, and container
width across the whole site. Every existing Jaguars colour reference should
be replaced with these.

```css
:root {
  --bg-primary: #080808;
  --bg-dark: #030303;
  --bg-surface: #111111;
  --bg-surface-light: #171717;

  --red-primary: #E21B16;
  --red-dark: #9D0D0A;
  --red-bright: #FF2B24;
  --red-glow: rgba(226, 27, 22, 0.18);

  --text-primary: #F7F7F7;
  --text-secondary: #B5B5B5;
  --text-muted: #777777;

  --border-primary: #292929;
  --border-light: #343434;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  --container-width: 1240px;
  --font-primary: "Inter", sans-serif;
}
```

### Colour usage

| Token | Use for |
|---|---|
| `--bg-primary` (#080808) | Main website background |
| `--bg-dark` (#030303) | Darker sections, footer, high-contrast panels |
| `--bg-surface` (#111111) | Cards, FAQ rows, feature blocks, form containers |
| `--bg-surface-light` (#171717) | Sparingly, for subtle card differentiation |
| `--border-primary` (#292929) | Primary subtle border colour |
| `--border-light` (#343434) | When a slightly more visible border is needed |
| `--red-primary` (#E21B16) | CTA buttons, icons, accent lines, active states, small headings, important text, form focus states |
| `--red-dark` (#9D0D0A) | Darker red backgrounds, subtle red gradients |
| `--red-bright` (#FF2B24) | Very sparingly — highlights, hover states, tiny accents |
| `--red-glow` | Subtle glow around selected hero elements or CTAs only |
| `--text-primary` (#F7F7F7) | Main headings, important body text, CTA text |
| `--text-secondary` (#B5B5B5) | Normal paragraph copy |
| `--text-muted` (#777777) | Captions, helper text, metadata, footer copy |

---

## Typography

**Primary font:** "Inter", sans-serif — used throughout for a clean, modern,
premium feel.

**Optional alternative heading font:** "Manrope", sans-serif — if greater
distinction between heading and body typography is wanted (headings in
Manrope, body/UI in Inter).

Do not use futuristic, motorsport, or overly stylised fonts.

**Headings:**
```css
font-family: "Inter", sans-serif;
font-weight: 700-800;
letter-spacing: -0.03em;
```
Hero headings: `font-weight: 800; letter-spacing: -0.045em;`

**Body copy:**
```css
font-weight: 400;
line-height: 1.55-1.7;
```

**Buttons:**
```css
font-weight: 700;
letter-spacing: 0.02em;
```

**Small section labels:**
```css
font-size: 11px-13px;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
color: var(--red-primary);
```

### Headings sizing

**Hero H1** — large, bold, condensed visually through tight spacing.
```css
font-size: clamp(48px, 5vw, 74px);
line-height: 0.98;
font-weight: 800;
```
Highlight key phrases in red. Example:

> SELL YOUR BROKEN (white)
> SUPERCAR TODAY (red)

**H2:**
```css
font-size: clamp(32px, 3vw, 46px);
line-height: 1.05;
font-weight: 750-800;
```

**H3:**
```css
font-size: 20px-26px;
font-weight: 700;
```

---

## Buttons

**Primary CTA:**
```css
background: var(--red-primary);
color: #FFFFFF;
border: 1px solid var(--red-primary);
border-radius: 3px to 5px;
padding: 14px 22px;
font-weight: 700;
```
Buttons should generally be rectangular rather than heavily rounded.

Hover:
```css
background: var(--red-bright);
transform: translateY(-1px);
box-shadow: 0 8px 30px rgba(226, 27, 22, 0.15); /* optional, subtle */
```

**Secondary button:**
```css
background: transparent;
border: 1px solid #444;
color: #FFFFFF;
```
Hover: `border-color: var(--red-primary); color: #FFFFFF;`

---

## Border Radius

Keep the site relatively sharp — no large SaaS-style rounding.

| Element | Radius |
|---|---|
| Inputs | 4px |
| Buttons | 4px |
| Cards | 6px |
| Large image panels | 8px |

---

## Hero Section

Visually dramatic. Background very dark / near black, with subtle red
lighting elements or red architectural light strips behind the vehicles.
Red lighting should frame the content rather than overpower it. Do not make
the hero bright red.

Composition: approximately three supercars — red, black (centrally,
dominant focal point), and white/light. Cars overlap the lower portion of
the hero valuation form slightly.

Optional background gradient:
```css
background:
  radial-gradient(
    circle at 50% 40%,
    rgba(120, 0, 0, 0.16),
    transparent 45%
  ),
  #050505;
```

---

## Valuation Form

Should feel premium and substantial.

**Container:**
```css
background: rgba(10, 10, 10, 0.92);
border: 1px solid rgba(226, 27, 22, 0.55);
border-radius: 6px;
backdrop-filter: blur(12px); /* optional */
```

**Inputs:**
```css
background: #161616;
border: 1px solid #333;
color: #FFFFFF;
```
Focus:
```css
border-color: var(--red-primary);
box-shadow: 0 0 0 2px rgba(226, 27, 22, 0.12);
```

**UK registration input** retains the traditional yellow numberplate look:
```css
background: #F7D117;
color: #111111;
font-weight: 800;
```

**Next button:**
```css
background: linear-gradient(90deg, var(--red-primary), #B60E0A);
```
Keep gradients subtle.

---

## Sections

Alternate between `#080808` and `#0D0D0D`. Use borders between important
sections: `border-top: 1px solid #1E1E1E;`. Avoid dramatic background
colour changes — the site should feel cohesive and almost continuous.

---

## Cards

```css
background: var(--bg-surface);
border: 1px solid var(--border-primary);
border-radius: 6px;
```
Hover (where appropriate, not on every element):
```css
border-color: rgba(226, 27, 22, 0.7);
transform: translateY(-2px);
```

---

## Feature Icons

Thin-line icons, colour `var(--red-primary)`, kept small and understated.

Icon container:
```css
background: rgba(226, 27, 22, 0.08);
border: 1px solid rgba(226, 27, 22, 0.2);
```

---

## Process Section

Three steps as premium dark panels.

Active / first step:
```css
background: linear-gradient(
  90deg,
  rgba(226, 27, 22, 0.75),
  rgba(120, 0, 0, 0.45)
);
```
Other steps: `background: var(--bg-surface);`

Large step numbers:
```css
font-size: 40px-50px;
font-style: italic;
color: rgba(255, 255, 255, 0.3);
```
Keep 01 / 02 / 03 visually prominent.

---

## Image Style

Automotive photography should feel high-end, cinematic, moody,
performance-orientated, natural rather than overprocessed.

Prefer: dark roads, mountain roads, modern garages, black studio
environments, dramatic overcast lighting, urban night environments.

Avoid: cheap stock imagery, cars on plain dealership forecourts, cartoonish
renders, heavy artificial red filters.

Optional subtle dark overlay on images:
```css
linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.05));
```

---

## Supercar Brand / Model Grid

Real-looking premium automotive photography. Example makes: Ferrari,
Lamborghini, McLaren, Porsche, Aston Martin, Bentley, Mercedes-AMG, BMW M,
Audi R8, Nissan GT-R, Maserati, Corvette.

```css
aspect-ratio: 16 / 10;
overflow: hidden;
border-radius: 6px;
border: 1px solid var(--border-primary);
```
Vehicle/manufacturer name bottom-left, over a dark gradient overlay.

---

## Reviews

```css
background: var(--bg-surface);
border: 1px solid #272727;
```
Stars: `var(--red-primary)`. Keep reviews clean rather than oversized.
Highlight verified status subtly with red or muted grey.

---

## FAQ

```css
background: var(--bg-surface);
border-bottom: 1px solid var(--border-primary);
```
Active FAQ: `border-left: 2px solid var(--red-primary);`
Question: white, semibold. Answer: `var(--text-secondary)`.
Plus icon: white normally, red when active.

---

## CTA Banners

Dark backgrounds rather than bright red blocks.

```css
background: linear-gradient(90deg, #080808, #170403, #080808);
border: 1px solid rgba(226, 27, 22, 0.45);
```
Optional faded supercar image behind content at ~10–15% opacity.

---

## Header

Minimal.
```css
background: #050505;
border-bottom: 1px solid #171717;
```
Logo left, nav right. Nav text `#D2D2D2`, hover `#FFFFFF`, active accent
`var(--red-primary)`.

---

## Footer

```css
background: var(--bg-dark);
border-top: 1px solid #181818;
```
Headings white. Links `#8E8E8E`, hover `var(--red-primary)`.

---

## Spacing

| | Desktop | Mobile |
|---|---|---|
| Max content width | 1200px–1280px (`--container-width: 1240px`) | — |
| Horizontal padding | 24px–40px | — |
| Section vertical padding | 80px–110px | 55px–70px |

Allow generous breathing room while keeping the page fairly dense.

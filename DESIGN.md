# Design Brief

## Direction

Fitness Power Light — a clean, conversion-focused fitness program landing page with warm charcoal depth and bold orange energy.

## Tone

Professional yet energetic: light cream background with a dark hero section and vivid orange-red primary creates trust and urgency without feeling aggressive.

## Differentiation

The inverted dark hero on a light-background app anchors the page with authority, while every card uses gradient-orange icon badges to maintain brand energy throughout scroll.

## Color Palette

| Token      | OKLCH         | Role                       |
| ---------- | ------------- | -------------------------- |
| background | 0.98 0.008 60 | Warm off-white page base   |
| foreground | 0.15 0.02 50  | Near-black text            |
| card       | 1.0 0.004 60  | Pure white card surfaces   |
| primary    | 0.62 0.22 42  | Vivid orange-red CTA/brand |
| accent     | 0.55 0.2 42   | Deep orange accent         |
| muted      | 0.94 0.018 60 | Warm light grey            |

## Typography

- Display: Bricolage Grotesque — headings, nav brand, card titles
- Body: Figtree — body copy, labels, form elements
- Scale: hero text-3xl/5xl, h2 text-2xl/3xl, label font-medium, body text-sm

## Elevation & Depth

Cards use shadow-subtle at rest, shadow-elevated on hover; hero uses a dark overlay with background image at 10% opacity for depth.

## Structural Zones

| Zone    | Background           | Border   | Notes                              |
| ------- | -------------------- | -------- | ---------------------------------- |
| Header  | bg-card              | border-b | Sticky, shadow-subtle              |
| Hero    | gradient-hero (dark) | —        | Dark inverted section with overlay |
| Content | bg-background        | —        | White/warm base                    |
| Enroll  | bg-muted/30          | —        | Alternate section background       |
| Footer  | bg-muted/40          | border-t  | Subtle warm muted footer           |

## Spacing & Rhythm

Section padding py-16/py-24; card grid gap-5; form fields space-y-5; generous padding px-4/px-6 sm.

## Component Patterns

- Buttons: rounded-md, gradient-primary orange, hover opacity-90, shadow-elevated on CTAs
- Cards: rounded-lg, bg-card, border-border, shadow-subtle hover shadow-elevated
- Badges: soft primary/10 background, primary text, primary/20 border

## Motion

- Entrance: none (conversion-focused; no distraction)
- Hover: transition-smooth 0.3s on cards, buttons, links
- Decorative: none

## Constraints

- No raw color classes; all via design tokens
- No excessive animation; minimal friction is the priority
- Mobile-first layout; single-column on mobile, grid on md+

## Signature Detail

Every feature card and section icon uses a gradient-primary orange badge — a consistent bold accent that ties the brand color through every section.

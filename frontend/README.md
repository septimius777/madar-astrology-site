# Meridian

A cinematic, scroll-driven astrology site. The site opens on a sunrise, then
compresses a full day into night across a single pinned scroll transition —
the sun rises and recedes, the sky cross-fades through five stops, stars and
a constellation draw in, and the moon rises to hold a second headline. The
rest of the page (instrument-style astrology intro, an interactive birth
chart form, sessions, testimonials, contact) lives in the night that
transition ends on.

## Stack

React 18 + TypeScript + Vite, Tailwind CSS for layout/utility styling, GSAP +
ScrollTrigger for the scroll-scrubbed scenes, Framer Motion for small
hover/tap/enter micro-interactions (buttons, hover lift, testimonial swap).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # type-check only, no emit
```

## Structure

```
src/
  animations/          GSAP timelines & helpers, kept separate from JSX
    skyJourney.ts       the signature pinned hero → night transition
    reveal.ts           shared "emerge from darkness" scroll reveal + slow rotation
  components/
    celestial/          Sun, Moon, Clouds, Starfield (canvas), ConstellationSVG,
                         AmbientNightBackground (the persistent night backdrop
                         used by every section after the Sky Journey)
    sections/           one component per full-height story beat
    ui/                 small shared primitives (GlassPanel, SectionEyebrow)
    Header.tsx
  data/                 typed content: constellations, services, testimonials
  types/                shared TypeScript interfaces
```

Each section is a self-contained component; the scroll-tied animation logic
for the hero lives in `animations/skyJourney.ts` rather than inline in the
component, so the timeline can be read, tuned, or reused independently of
the markup.

## Design tokens

Six named colors carry the whole day → night journey (see
`tailwind.config.ts`): `dawn.white` / `dawn.blue` (morning), `gold` (golden
hour), `ember` (sunset), `dusk` (twilight/indigo), `night.navy` (night, the
base background for everything after the hero), plus `moon` and `star` for
the two light sources. Typography: **Fraunces** (display, used only for
headlines), **Inter** (body), **Space Mono** (small caps labels, coordinates,
prices — an "instrument readout" motif that runs through the whole site).

## Notes on what's real vs. decorative

- The rotating chart rings and the composite chart in the birth-chart
  section are **stylized decoration**, not a real ephemeris calculation.
  Wiring up an actual natal chart would mean calling a real astrology/
  ephemeris API or library (e.g. Swiss Ephemeris) with the submitted
  date/time/location and rendering real planetary placements instead.
- The birth chart form and the contact form both `preventDefault` and show
  a local success state — neither is wired to a real backend. Point
  `handleSubmit` at your booking/email/CRM endpoint of choice.
- Testimonial attributions and pricing are placeholders — swap in real
  client quotes (with permission) and your actual rates before launch.

## Performance & accessibility

- The starfields are single `<canvas>` elements with an internal rAF loop,
  not hundreds of animated DOM nodes.
- `prefers-reduced-motion` is respected: the starfield twinkle/shooting
  stars are disabled, and global CSS shortens/removes transition and
  animation durations. The scroll-scrubbed scenes still progress (they're
  driven by scroll position, not a decorative loop) but arrive without
  eased motion.
- Focus states are visible (`:focus-visible` outline) and all interactive
  elements are real `button`/`a`/form controls.

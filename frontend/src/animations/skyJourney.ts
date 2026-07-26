import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SkyJourneyElements {
  section: HTMLElement;
  sun: HTMLElement;
  headlineA: HTMLElement;
  clouds: HTMLElement;
  skyMorning: HTMLElement;
  skyGolden: HTMLElement;
  skySunset: HTMLElement;
  skyTwilight: HTMLElement;
  skyNight: HTMLElement;
  starsWrapper: HTMLElement;
  constellations: SVGSVGElement;
  moon: HTMLElement;
  headlineB: HTMLElement;
  scrollCue: HTMLElement;
}

/**
 * Builds the pinned "day becomes night" timeline described in the brief
 * as the site's signature moment. The section pins for ~3200px of scroll
 * while every other element is scrubbed against a single 0→1 progress
 * value, so the whole scene stays perfectly synced to the scrollbar
 * regardless of scroll speed.
 *
 * Positions below (the second argument to each .to()) are authored as
 * fractions of the total journey (0 = pin starts, 1 = pin releases) so
 * the sequence reads independently of any particular scroll distance.
 */
export function createSkyJourneyTimeline(el: SkyJourneyElements) {
  const constellationLines = el.constellations.querySelectorAll<SVGLineElement>(
    ".constellation-line"
  );
  const constellationPoints = el.constellations.querySelectorAll<SVGCircleElement>(
    ".constellation-point"
  );

  // GSAP owns the transform on the sun/moon/headline entirely (rather than
  // mixing with CSS translate utility classes) so that later yPercent/y
  // tweens compose correctly instead of clobbering a class-based centering
  // transform. These baselines are set synchronously by the caller via
  // useLayoutEffect, before first paint, so there is no visible jump.
  gsap.set(el.sun, { xPercent: -50, yPercent: -50 });
  gsap.set(el.moon, { xPercent: -50, yPercent: 60, opacity: 0 });
  gsap.set(el.headlineB, { y: 16 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el.section,
      start: "top top",
      end: "+=3200",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
    defaults: { ease: "none" },
  });

  // The idle scroll cue disappears the instant the journey begins.
  tl.to(el.scrollCue, { opacity: 0, duration: 0.05 }, 0);

  // The sun carries its own weight — it rises and recedes at its own pace,
  // clearing the frame well before the sky finishes changing.
  tl.to(el.sun, { yPercent: "-=175", scale: 0.82, duration: 1 }, 0);
  tl.to(el.headlineA, { opacity: 0, y: -28, duration: 0.16 }, 0.02);

  // Clouds dissolve early — they belong only to the morning.
  tl.to(el.clouds, { opacity: 0, duration: 0.2 }, 0);

  // Sky cross-fade chain: morning -> golden hour -> sunset -> twilight -> night.
  tl.to(el.skyMorning, { opacity: 0, duration: 0.2 }, 0);
  tl.to(el.skyGolden, { opacity: 1, duration: 0.2 }, 0);
  tl.to(el.skyGolden, { opacity: 0, duration: 0.2 }, 0.2);
  tl.to(el.skySunset, { opacity: 1, duration: 0.2 }, 0.2);
  tl.to(el.skySunset, { opacity: 0, duration: 0.22 }, 0.42);
  tl.to(el.skyTwilight, { opacity: 1, duration: 0.22 }, 0.42);
  tl.to(el.skyTwilight, { opacity: 0, duration: 0.25 }, 0.64);
  tl.to(el.skyNight, { opacity: 1, duration: 0.36 }, 0.64);

  // Stars surface gradually as twilight deepens, well before the moon arrives.
  tl.to(el.starsWrapper, { opacity: 1, duration: 0.3 }, 0.55);

  // Constellations draw themselves once the sky is mostly dark — each line
  // and point staggers slightly so the figure feels hand-traced, not stamped.
  tl.to(
    constellationLines,
    { strokeDashoffset: 0, opacity: 0.8, duration: 0.3, stagger: 0.02 },
    0.68
  );
  tl.to(constellationPoints, { opacity: 1, duration: 0.2, stagger: 0.02 }, 0.7);

  // The moon rises from below, arriving with its own gentle deceleration
  // rather than moving in lockstep with everything else.
  tl.to(
    el.moon,
    { yPercent: "-=110", opacity: 1, duration: 0.36, ease: "power2.out" },
    0.5
  );

  // The second headline only settles into the moon once it is nearly centered.
  tl.to(el.headlineB, { opacity: 1, y: 0, duration: 0.2 }, 0.86);

  return tl;
}

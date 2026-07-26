import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades a group of elements up out of darkness with a soft blur resolve,
 * staggered slightly so a row of cards doesn't arrive as one flat block.
 * Used by AstrologyIntro, ServicesSection, and TestimonialsSection.
 */
export function revealFromDarkness(
  targets: Element[] | NodeListOf<Element>,
  trigger: Element,
  opts: { stagger?: number; start?: string } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 36, filter: "blur(8px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: opts.stagger ?? 0.12,
      scrollTrigger: {
        trigger,
        start: opts.start ?? "top 78%",
      },
    }
  );
}

/** Slow, near-imperceptible rotation used for background chart rings. */
export function slowRotate(target: Element, duration = 90) {
  return gsap.to(target, {
    rotate: 360,
    duration,
    repeat: -1,
    ease: "none",
  });
}

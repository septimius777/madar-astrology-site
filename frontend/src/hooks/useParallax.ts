import { useEffect, useRef } from "react";

/**
 * Ports the `initParallax()` logic from the original main.js for a single
 * element: rAF-throttled, IntersectionObserver-gated, lighter on mobile,
 * disabled for prefers-reduced-motion.
 *
 * @param speed the element's `data-parallax` factor from the original site
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const factor = isMobile ? 0.45 : 1;

    let active = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(el);

    let ticking = false;
    function update() {
      if (active && el) {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * speed * factor * -1;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [speed]);

  return ref;
}

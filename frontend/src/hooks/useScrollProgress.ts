import { useScroll, useSpring } from "framer-motion";

/**
 * Returns a smoothed 0..1 progress value representing how far the user
 * has scrolled through the entire page. Used to drive the ambient
 * background transitions (zooming starfield, nebula fades, etc).
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });
  return smoothed;
}

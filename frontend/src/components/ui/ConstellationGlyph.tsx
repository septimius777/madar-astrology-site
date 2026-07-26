import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ZodiacSign } from "../../data/zodiacData";

interface ConstellationGlyphProps {
  sign: ZodiacSign;
  /** Whether to play the draw-in / twinkle animation (defaults to true). */
  animate?: boolean;
}

/**
 * Ports the `constellationSVG()` helper from the original main.js — draws a
 * small dot-and-line constellation pattern for a zodiac sign.
 *
 * Upgraded from a static SVG into an animated one: the connecting lines
 * draw themselves in (stroke pathLength 0 -> 1) and the dots twinkle in
 * with a staggered pop, instead of just appearing instantly.
 */
export default function ConstellationGlyph({
  sign,
  animate = true,
}: ConstellationGlyphProps) {
  const prefersReducedMotion = useReducedMotion();
  const play = animate && !prefersReducedMotion;

  // Random dot radius / delay generated once per sign (not on every re-render).
  const radii = useMemo(
    () => sign.points.map(() => 1.6 + Math.random() * 1.2),
    [sign]
  );
  const dotDelays = useMemo(
    () => sign.points.map(() => 0.4 + Math.random() * 0.5),
    [sign]
  );

  return (
    <svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
      {sign.edges.map(([a, b], i) => {
        const [x1, y1] = sign.points[a];
        const [x2, y2] = sign.points[b];
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            initial={play ? { pathLength: 0, opacity: 0 } : false}
            animate={play ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
      {sign.points.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={radii[i]}
          initial={play ? { opacity: 0, scale: 0 } : false}
          animate={
            play ? { opacity: [0, 1, 0.65, 1], scale: [0, 1.35, 1] } : undefined
          }
          transition={{ duration: 0.9, delay: dotDelays[i], ease: "easeOut" }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}
import { forwardRef } from "react";
import type { Constellation } from "../../types";

interface ConstellationSVGProps {
  constellation: Constellation;
  className?: string;
  /** Stroke/point color. Defaults to a soft star-white. */
  color?: string;
  /** If true, points/lines render at full opacity immediately (no draw-in). */
  lit?: boolean;
}

/**
 * Renders a constellation's lines and points as SVG. Each line uses
 * pathLength={100} so every path can be animated identically with
 * stroke-dasharray/stroke-dashoffset regardless of its actual length —
 * this is what lets GSAP "draw" the constellation on scroll or on demand
 * (see animations/skyJourney.ts and BirthChartSection).
 */
const ConstellationSVG = forwardRef<SVGSVGElement, ConstellationSVGProps>(
  function ConstellationSVG(
    { constellation, className = "", color = "#FDFBF7", lit = false },
    ref
  ) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className={`constellation-svg overflow-visible ${className}`}
        data-constellation-id={constellation.id}
      >
        {constellation.lines.map(([a, b], i) => {
          const pa = constellation.points[a];
          const pb = constellation.points[b];
          return (
            <line
              key={i}
              className="constellation-line"
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={color}
              strokeWidth={0.35}
              strokeLinecap="round"
              pathLength={100}
              style={{
                strokeDasharray: 100,
                strokeDashoffset: lit ? 0 : 100,
                opacity: lit ? 0.8 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          );
        })}
        {constellation.points.map((p, i) => (
          <circle
            key={i}
            className="constellation-point"
            cx={p.x}
            cy={p.y}
            r={1.1}
            fill={color}
            style={{
              opacity: lit ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        ))}
      </svg>
    );
  }
);

export default ConstellationSVG;

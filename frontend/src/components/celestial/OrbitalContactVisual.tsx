import { useEffect, useRef } from "react";
import CelestialBody from "./CelestialBody";
import { contactCopy } from "../../content/fa/homepage";

interface OrbitalContactVisualProps {
  className?: string;
}

/**
 * Astrolabe-style orbital arc for the contact section. The moon sits on the
 * primary track; dashed slots reserve space for planets you'll add later.
 */
export default function OrbitalContactVisual({ className = "" }: OrbitalContactVisualProps) {
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = moonRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let angle = 0.72;
    let raf = 0;
    const orbit = () => {
      angle += 0.0004;
      const cx = 50 + Math.cos(angle) * 28;
      const cy = 48 + Math.sin(angle) * 14;
      el.style.left = `${cx}%`;
      el.style.top = `${cy}%`;
      raf = requestAnimationFrame(orbit);
    };
    raf = requestAnimationFrame(orbit);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`relative aspect-[4/3] w-full max-w-lg select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 280"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arc-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F1ECE2" stopOpacity="0" />
            <stop offset="20%" stopColor="#F1ECE2" stopOpacity="0.18" />
            <stop offset="80%" stopColor="#F1ECE2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F1ECE2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer instrument ring */}
        <ellipse
          cx="200"
          cy="140"
          rx="175"
          ry="95"
          fill="none"
          stroke="rgba(241,236,226,0.06)"
          strokeWidth="0.8"
        />
        <ellipse
          cx="200"
          cy="140"
          rx="130"
          ry="72"
          fill="none"
          stroke="url(#arc-fade)"
          strokeWidth="1"
        />

        {/* Primary orbit — moon travels here */}
        <ellipse
          cx="200"
          cy="135"
          rx="112"
          ry="38"
          fill="none"
          stroke="rgba(242,169,77,0.25)"
          strokeWidth="0.8"
        />

        {/* Future planet tracks */}
        {[0.55, 0.72, 0.88].map((t, i) => {
          const x = 200 + Math.cos(Math.PI * t) * 112;
          const y = 135 + Math.sin(Math.PI * t) * 38;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="none"
                stroke="rgba(253,251,247,0.08)"
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
            </g>
          );
        })}

        {/* Radial ticks — observatory scale */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x1 = 200 + Math.cos(a) * 118;
          const y1 = 135 + Math.sin(a) * 40;
          const x2 = 200 + Math.cos(a) * 125;
          const y2 = 135 + Math.sin(a) * 42;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(241,236,226,0.15)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* Animated moon */}
      <div
        ref={moonRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-none"
        style={{ left: "72%", top: "42%" }}
      >
        <CelestialBody kind="moon" size={96} label={contactCopy.orbitLabels.moon} />
      </div>

      {/* Vacant slots */}
      <div className="absolute left-[22%] top-[58%] -translate-x-1/2 -translate-y-1/2">
        <CelestialBody kind="vacant" label={contactCopy.orbitLabels.vacant} />
      </div>
      <div className="absolute left-[50%] top-[72%] -translate-x-1/2 -translate-y-1/2">
        <CelestialBody kind="vacant" />
      </div>
      <div className="absolute left-[78%] top-[58%] -translate-x-1/2 -translate-y-1/2">
        <CelestialBody kind="vacant" />
      </div>

      {/* Ephemeris readout */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/8 pt-5">
        <dl className="grid grid-cols-3 gap-4 text-center sm:text-start">
          <div>
            <dt className="font-label mb-1 text-[10px] text-dawn-white/35">جرم</dt>
            <dd className="font-display text-sm text-dawn-white/80">
              {contactCopy.ephemeris.body}
            </dd>
          </div>
          <div>
            <dt className="font-label mb-1 text-[10px] text-dawn-white/35">مختصات</dt>
            <dd className="font-label text-[11px] leading-relaxed text-dawn-white/55">
              {contactCopy.ephemeris.coords}
            </dd>
          </div>
          <div>
            <dt className="font-label mb-1 text-[10px] text-dawn-white/35">فاز</dt>
            <dd className="font-display text-sm text-gold/80">
              {contactCopy.ephemeris.phaseFa}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

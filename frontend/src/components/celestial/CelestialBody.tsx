import { useEffect, useRef } from "react";

export type CelestialBodyKind = "moon" | "vacant";

interface CelestialBodyProps {
  kind: CelestialBodyKind;
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Refined SVG celestial bodies for the contact orbital scene.
 * `vacant` marks reserved slots for future planets — same scale, muted treatment.
 */
export default function CelestialBody({
  kind,
  size = 88,
  className = "",
  label,
}: CelestialBodyProps) {
  const glowRef = useRef<SVGFEGaussianBlurElement>(null);

  useEffect(() => {
    if (kind !== "moon" || !glowRef.current) return;
    let frame = 0;
    let raf = 0;
    const pulse = () => {
      frame += 0.012;
      const std = 6 + Math.sin(frame) * 1.5;
      glowRef.current!.setAttribute("stdDeviation", String(std));
      raf = requestAnimationFrame(pulse);
    };
    raf = requestAnimationFrame(pulse);
    return () => cancelAnimationFrame(raf);
  }, [kind]);

  if (kind === "vacant") {
    return (
      <div
        className={`flex flex-col items-center gap-2 ${className}`}
        aria-hidden={!label}
      >
        <svg
          width={size * 0.45}
          height={size * 0.45}
          viewBox="0 0 40 40"
          className="opacity-35"
        >
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="3 4"
            className="text-dawn-white/40"
          />
          <circle cx="20" cy="20" r="2" fill="currentColor" className="text-dawn-white/20" />
        </svg>
        {label && (
          <span className="font-label text-[10px] text-dawn-white/25">{label}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="moon-light" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#FFFEF9" />
            <stop offset="42%" stopColor="#F1ECE2" />
            <stop offset="78%" stopColor="#B8B4AA" />
            <stop offset="100%" stopColor="#6E6A62" />
          </radialGradient>
          <radialGradient id="moon-shadow" cx="72%" cy="58%" r="55%">
            <stop offset="0%" stopColor="#1A1820" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1A1820" stopOpacity="0" />
          </radialGradient>
          <filter id="moon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur ref={glowRef} stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="moon-disc">
            <circle cx="60" cy="60" r="46" />
          </clipPath>
        </defs>

        <circle
          cx="60"
          cy="60"
          r="52"
          fill="rgba(241,236,226,0.08)"
          filter="url(#moon-glow)"
        />

        <g clipPath="url(#moon-disc)">
          <circle cx="60" cy="60" r="46" fill="url(#moon-light)" />
          <ellipse
            cx="78"
            cy="68"
            rx="38"
            ry="34"
            fill="url(#moon-shadow)"
          />
          {/* Maria — abstract, not cartoon craters */}
          <ellipse cx="42" cy="52" rx="14" ry="10" fill="#9A9690" fillOpacity="0.22" />
          <ellipse cx="58" cy="38" rx="9" ry="7" fill="#8A8680" fillOpacity="0.18" />
          <ellipse cx="34" cy="68" rx="11" ry="8" fill="#7A7670" fillOpacity="0.15" />
          <ellipse cx="52" cy="72" rx="7" ry="5" fill="#6A6660" fillOpacity="0.12" />
        </g>

        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="rgba(253,251,247,0.12)"
          strokeWidth="0.5"
        />
      </svg>
      {label && (
        <span className="font-label text-[11px] text-dawn-white/45">{label}</span>
      )}
    </div>
  );
}

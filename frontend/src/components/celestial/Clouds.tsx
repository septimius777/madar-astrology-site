import { forwardRef } from "react";

interface CloudsProps {
  className?: string;
}

/**
 * Three soft blurred cloud shapes drift slowly via CSS animation. Actual
 * fade-out on scroll is driven by GSAP tweening this element's opacity
 * through the forwarded ref (see animations/skyJourney.ts).
 */
const Clouds = forwardRef<HTMLDivElement, CloudsProps>(function Clouds(
  { className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute left-[8%] top-[22%] h-24 w-[34%] animate-[drift_38s_linear_infinite] rounded-full bg-white/50 blur-3xl" />
      <div className="absolute left-[52%] top-[14%] h-20 w-[28%] animate-[drift_46s_linear_infinite] rounded-full bg-white/40 blur-3xl" />
      <div className="absolute left-[30%] top-[34%] h-16 w-[22%] animate-[drift_52s_linear_infinite_reverse] rounded-full bg-white/35 blur-2xl" />
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-6%); }
          50% { transform: translateX(6%); }
          100% { transform: translateX(-6%); }
        }
      `}</style>
    </div>
  );
});

export default Clouds;

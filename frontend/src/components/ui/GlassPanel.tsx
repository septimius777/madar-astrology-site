import type { HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
}

/**
 * Shared "floating celestial panel" surface — used by services, the birth
 * chart form, and the contact form so the glass treatment stays consistent
 * instead of being redefined per section.
 */
export default function GlassPanel({
  children,
  glow = false,
  className = "",
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 ${
        glow
          ? "hover:border-gold/40 hover:bg-white/[0.06] hover:shadow-[0_0_60px_-15px_rgba(242,169,77,0.35)]"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

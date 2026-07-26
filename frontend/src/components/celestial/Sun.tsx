import { forwardRef, type ReactNode } from "react";

interface SunProps {
  children?: ReactNode;
  className?: string;
}

/**
 * The sun is rendered as layered radial gradients rather than an image so
 * it can shift hue with the sky (handled by the parent's GSAP timeline,
 * which tweens this element's transform/opacity via the forwarded ref).
 */
const Sun = forwardRef<HTMLDivElement, SunProps>(function Sun(
  { children, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute left-1/2 top-1/2 flex aspect-square w-[62vmin] items-center justify-center rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #FFF6E4 0%, #FDE3A7 28%, #F2A94D 55%, rgba(242,169,77,0) 72%)",
        boxShadow:
          "0 0 120px 60px rgba(242,169,77,0.35), 0 0 260px 140px rgba(225,85,46,0.15)",
      }}
    >
      <div className="pointer-events-auto max-w-[46vmin] px-6 text-center">
        {children}
      </div>
    </div>
  );
});

export default Sun;

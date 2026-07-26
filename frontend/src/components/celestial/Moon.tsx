import { forwardRef, type ReactNode } from "react";

interface MoonProps {
  children?: ReactNode;
  className?: string;
}

const Moon = forwardRef<HTMLDivElement, MoonProps>(function Moon(
  { children, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute left-1/2 top-1/2 flex aspect-square w-[40vmin] items-center justify-center rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 38% 35%, #FFFDF8 0%, #F1ECE2 45%, #CFCBC0 80%, rgba(207,203,192,0) 100%)",
        boxShadow:
          "0 0 90px 30px rgba(241,236,226,0.25), 0 0 200px 90px rgba(160,190,220,0.08)",
      }}
    >
      {/* subtle craters for texture, kept faint so the moon still reads as a light source */}
      <div
        className="absolute inset-0 rounded-full opacity-20 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle at 30% 65%, rgba(120,120,130,0.5) 0 6%, transparent 7%), radial-gradient(circle at 60% 30%, rgba(120,120,130,0.4) 0 4%, transparent 5%), radial-gradient(circle at 68% 68%, rgba(120,120,130,0.35) 0 5%, transparent 6%)",
        }}
      />
      <div className="pointer-events-auto max-w-[30vmin] px-4 text-center">
        {children}
      </div>
    </div>
  );
});

export default Moon;

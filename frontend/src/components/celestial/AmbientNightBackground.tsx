import Starfield from "./Starfield";

/**
 * A single fixed starfield shared by every section below the Sky Journey.
 * Keeping this as one persistent layer (rather than re-mounting a
 * starfield per section) is both truer to the brief — the night never
 * really ends, sections just bring different foreground content over it
 * — and cheaper, since only one canvas animation loop runs at a time.
 */
export default function AmbientNightBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #0E1130 0%, #070B22 55%, #05070F 100%)",
        }}
      />
      <Starfield density={0.6} shootingStars />
      <div className="grain absolute inset-0" />
    </div>
  );
}

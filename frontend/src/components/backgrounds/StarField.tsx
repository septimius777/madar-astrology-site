import { useEffect, useRef } from "react";

interface StarFieldProps {
  density: number; // 0..1, higher = more stars (further from sun = more visible stars)
  color: string; // tint color for stars in this region
  depth: number; // 0..1, drives parallax drift speed & star scale ("zooming out" feel)
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftSpeed: number;
  layer: number; // 0 near, 1 mid, 2 far -> parallax layers
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export default function StarField({ density, color, depth }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const propsRef = useRef({ density, color, depth });

  propsRef.current = { density, color, depth };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const buildStars = () => {
      const count = Math.floor(140 + propsRef.current.density * 260);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.3,
          baseAlpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.006,
          twinklePhase: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.15 + 0.02,
          layer: Math.floor(Math.random() * 3),
        });
      }
      starsRef.current = stars;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      buildStars();
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const render = () => {
      t += 1;
      const { color: tint, depth: d } = propsRef.current;
      const { r, g, b } = hexToRgb(tint);
      ctx.clearRect(0, 0, width, height);

      // subtle radial vignette so stars fade toward edges
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.35)");

      for (const star of starsRef.current) {
        const parallax = 1 + star.layer * 0.6 * d;
        star.y += star.driftSpeed * 0.05 * parallax;
        if (star.y > height) star.y = 0;

        const twinkle =
          Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.35 + 0.65;
        const alpha = star.baseAlpha * twinkle;
        const scale = 1 + d * 0.6 * (star.layer / 2);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(star.x, star.y, star.radius * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = grad as unknown as string;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

import { useEffect, useRef } from "react";

interface StarfieldProps {
  className?: string;
  /** Roughly how many stars per 10,000 square px. */
  density?: number;
  shootingStars?: boolean;
}

interface StarParticle {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
}

/**
 * Ambient starfield rendered on a single canvas for performance — this
 * avoids mounting hundreds of DOM nodes for a purely decorative layer.
 * Twinkle and shooting stars run on a continuous rAF loop independent of
 * scroll; scroll-tied opacity is controlled by whatever wraps this
 * component (see SkyJourney), not by this component itself.
 */
export default function Starfield({
  className,
  density = 1,
  shootingStars = true,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let stars: StarParticle[] = [];
    let shooters: ShootingStar[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildStars = () => {
      const area = width * height;
      const count = Math.round((area / 10000) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.6 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let last = performance.now();
    let shooterCooldown = Math.random() * 4 + 3;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const twinkle = prefersReducedMotion
          ? 1
          : 0.6 + 0.4 * Math.sin(now * 0.001 * s.twinkleSpeed + s.twinklePhase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 251, 247, ${s.baseAlpha * twinkle})`;
        ctx.fill();
      }

      if (shootingStars && !prefersReducedMotion) {
        shooterCooldown -= dt;
        if (shooterCooldown <= 0 && shooters.length < 1) {
          shooters.push({
            x: Math.random() * width * 0.6 + width * 0.2,
            y: Math.random() * height * 0.25,
            len: Math.random() * 90 + 60,
            speed: Math.random() * 500 + 400,
            angle: (Math.PI / 180) * (35 + Math.random() * 10),
            life: 0,
            maxLife: 0.7,
          });
          shooterCooldown = Math.random() * 6 + 5;
        }

        shooters = shooters.filter((sh) => sh.life < sh.maxLife);
        for (const sh of shooters) {
          sh.life += dt;
          sh.x += Math.cos(sh.angle) * sh.speed * dt;
          sh.y += Math.sin(sh.angle) * sh.speed * dt;
          const fade = 1 - sh.life / sh.maxLife;
          const tailX = sh.x - Math.cos(sh.angle) * sh.len;
          const tailY = sh.y - Math.sin(sh.angle) * sh.len;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(253, 251, 247, ${0.9 * fade})`);
          grad.addColorStop(1, "rgba(253, 251, 247, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [density, shootingStars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

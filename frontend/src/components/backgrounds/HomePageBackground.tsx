import { useEffect, useRef } from "react";
import Starfield from "../celestial/Starfield";

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  hue: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  pulsePhase: number;
}

/**
 * Animated deep-space backdrop for /homepage — nebula drift, a slow-turning
 * galaxy core, and a shared starfield. Swap this file out when you have
 * your own background ready.
 */
export default function HomePageBackground() {
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
    let clouds: NebulaCloud[] = [];
    let spiralAngle = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildClouds = () => {
      clouds = Array.from({ length: 7 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * Math.min(width, height) * 0.28 + 120,
        hue: i % 2 === 0 ? 270 + Math.random() * 40 : 310 + Math.random() * 30,
        driftX: (Math.random() - 0.5) * 8,
        driftY: (Math.random() - 0.5) * 6,
        pulseSpeed: Math.random() * 0.15 + 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildClouds();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const drawSpiral = () => {
      const cx = width * 0.52;
      const cy = height * 0.42;
      const rotation = prefersReducedMotion ? 0 : spiralAngle;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      for (let arm = 0; arm < 2; arm++) {
        const armOffset = arm * Math.PI;
        ctx.beginPath();
        for (let t = 0; t <= 1; t += 0.008) {
          const angle = armOffset + t * Math.PI * 3.2;
          const radius = 40 + t * Math.min(width, height) * 0.38;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.35;
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(-200, 0, 200, 0);
        grad.addColorStop(0, "rgba(168, 85, 247, 0)");
        grad.addColorStop(0.45, "rgba(192, 132, 252, 0.12)");
        grad.addColorStop(1, "rgba(244, 114, 182, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 28;
        ctx.filter = "blur(12px)";
        ctx.stroke();
      }

      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, 90);
      core.addColorStop(0, "rgba(253, 251, 247, 0.35)");
      core.addColorStop(0.25, "rgba(244, 114, 182, 0.2)");
      core.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.filter = "none";
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(0, 0, 90, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (!prefersReducedMotion) {
        spiralAngle += 0.00008;
      }
    };

    const drawClouds = (time: number) => {
      for (const cloud of clouds) {
        if (!prefersReducedMotion) {
          cloud.x += cloud.driftX * 0.016;
          cloud.y += cloud.driftY * 0.016;

          if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
          if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
          if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
          if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;
        }

        const pulse = prefersReducedMotion
          ? 1
          : 0.85 + 0.15 * Math.sin(time * 0.001 * cloud.pulseSpeed + cloud.pulsePhase);
        const r = cloud.radius * pulse;

        const nebula = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, r);
        nebula.addColorStop(0, `hsla(${cloud.hue}, 70%, 55%, 0.22)`);
        nebula.addColorStop(0.45, `hsla(${cloud.hue + 20}, 65%, 35%, 0.1)`);
        nebula.addColorStop(1, "rgba(5, 0, 15, 0)");

        ctx.fillStyle = nebula;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (time: number) => {
      ctx.fillStyle = "#030008";
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(26, 10, 46, 0.55)");
      vignette.addColorStop(0.55, "rgba(10, 0, 20, 0.35)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      drawClouds(time);
      drawSpiral();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      <Starfield className="absolute inset-0" density={0.75} shootingStars />
      <div className="grain absolute inset-0 opacity-60" />
    </div>
  );
}

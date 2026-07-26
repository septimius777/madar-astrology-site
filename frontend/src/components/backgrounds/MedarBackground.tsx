import { useEffect, useRef } from "react";

/**
 * Fixed cosmic background layer for the "مدار" (Medar) astrology page.
 * Ports the `.cosmos` markup + `initStarfield()` canvas animation from the
 * original site's index.html / js/main.js: a twinkling starfield with
 * occasional shooting stars, three blurred nebula blobs, and a grain overlay.
 */
export default function MedarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const starCount = isMobile ? 70 : 220;

    let width = 0;
    let height = 0;
    let stars: {
      x: number;
      y: number;
      r: number;
      base: number;
      speed: number;
      phase: number;
    }[] = [];
    let running = true;
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    function build() {
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        base: Math.random() * 0.5 + 0.35,
        speed: Math.random() * 0.02 + 0.006,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      // Cap canvas height so we don't allocate a giant buffer on very long pages.
      height = Math.min(height, window.innerHeight * 3);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    }
    window.addEventListener("resize", onResize);
    resize();

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.globalAlpha = s.base;
        ctx.fillStyle = "#ede7d9";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    if (prefersReducedMotion) {
      drawStatic();
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(resizeTimer);
      };
    }

    let t = 0;
    let shootingStar:
      | { x: number; y: number; vx: number; vy: number; life: number }
      | null = null;

    function maybeSpawnShootingStar() {
      if (isMobile) return;
      if (!shootingStar && Math.random() < 0.0025) {
        shootingStar = {
          x: Math.random() * width * 0.6,
          y: Math.random() * height * 0.4,
          vx: 6 + Math.random() * 4,
          vy: 2 + Math.random() * 2,
          life: 0,
        };
      }
    }

    function tick() {
      if (!running || !ctx) return;
      t += 1;
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        const twinkle = 0.75 + 0.25 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = s.base * twinkle;
        ctx.fillStyle = "#ede7d9";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      maybeSpawnShootingStar();
      if (shootingStar) {
        const s = shootingStar;
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * 8,
          s.y - s.vy * 8
        );
        grad.addColorStop(0, "rgba(237,231,217,.9)");
        grad.addColorStop(1, "rgba(237,231,217,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.stroke();
        if (s.life > 90 || s.x > width + 50 || s.y > height + 50) {
          shootingStar = null;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    function onVisibilityChange() {
      running = document.visibilityState === "visible";
      if (running) rafId = requestAnimationFrame(tick);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="medar-cosmos" aria-hidden="true">
      <canvas ref={canvasRef} id="medarStarfield" />
      <div className="medar-nebula medar-nebula--a" />
      <div className="medar-nebula medar-nebula--b" />
      <div className="medar-nebula medar-nebula--c" />
      <div className="medar-grain" />
    </div>
  );
}

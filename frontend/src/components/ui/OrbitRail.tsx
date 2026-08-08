import { useEffect, useRef, useState } from "react";

const NODES = [
  { target: "hero", glyph: "☉" },
  { target: "method", glyph: "☿" },
  { target: "chart", glyph: "☾" },
  { target: "gallery", glyph: "✶" },
  { target: "services", glyph: "♃" },
  { target: "testimonials", glyph: "♄" },
  { target: "contact", glyph: "☄" },
];

/**
 * Ports the `.orbit-rail` scroll-progress instrument (desktop only):
 * a vertical line with a dot that tracks scroll position, plus clickable
 * planetary-glyph nodes that highlight the active section.
 */
export default function OrbitRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {

    const sections = NODES.map((n) => document.getElementById(n.target)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = sections.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => io.observe(s));

    let ticking = false;
    function updateDot() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const railHeight = listRef.current?.parentElement?.getBoundingClientRect().height ?? 0;
      if (dotRef.current) {
        dotRef.current.style.top = `${Math.min(1, Math.max(0, progress)) * railHeight}px`;
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateDot);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    updateDot();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(target: string) {
    const el = document.getElementById(target);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <nav className="medar-orbit-rail" aria-hidden="true">
      <div className="medar-orbit-rail__line" />
      <div className="medar-orbit-rail__dot" ref={dotRef} />
      <ul className="medar-orbit-rail__nodes" ref={listRef}>
        {NODES.map((node, i) => (
          <li
            key={node.target}
            className={i === activeIndex ? "medar-is-active" : ""}
            onClick={() => handleClick(node.target)}
          >
            <span className="medar-orbit-rail__glyph">{node.glyph}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

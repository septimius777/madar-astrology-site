import React, { useEffect, useMemo, useRef } from "react";
import "./OrbitalGiants.css";

type Planet = {
  id: "jupiter" | "saturn" | "uranus";
  name: string;
  tag: string;
  desc: string;
  scale: number;
};

const PLANETS: Planet[] = [
  {
    id: "jupiter",
    name: "Jupiter",
    tag: "PLANET · V",
    desc: "A storm three Earths wide, raging for centuries",
    scale: 1,
  },
  {
    id: "saturn",
    name: "Saturn",
    tag: "PLANET · VI",
    desc: "Crowned by a hundred thousand miles of ice",
    scale: 0.86,
  },
  {
    id: "uranus",
    name: "Uranus",
    tag: "PLANET · VII",
    desc: "Knocked on its side, it spins lying down",
    scale: 0.6,
  },
];

/**
 * OrbitalGiants — "Giants of the Outer Dark"
 * A three-planet row (Jupiter, Saturn, Uranus) matching the dark,
 * brass-on-void aesthetic of the reference planet card.
 *
 * Signature idea: the three worlds slide in along a drawn orbital arc,
 * staggered in real orbital order (V, VI, VII from the Sun) rather than
 * an arbitrary 1-2-3 — Jupiter arrives first, Uranus last, echoing how
 * far out each world actually sits.
 */
export default function OrbitalGiants() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // deterministic "random" starfield — no Math.random so it never reflows differently
  const stars = useMemo(
    () =>
      Array.from({ length: 44 }).map((_, i) => {
        const top = (i * 53 + (i % 7) * 11) % 100;
        const left = (i * 71 + (i % 5) * 17) % 100;
        const size = 1 + (i % 3);
        const delay = (i % 10) * 0.35;
        const dur = 3 + (i % 4) * 0.8;
        return { id: i, top, left, size, delay, dur };
      }),
    []
  );

  return (
    <section className="orbital-giants" ref={sectionRef}>
      <div className="og-haze" aria-hidden="true" />
      <div className="og-stars" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="og-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="og-inner">
        <p className="og-eyebrow">Beyond the Asteroid Belt</p>
        <h2 className="og-heading">Giants of the Outer Dark</h2>
        <p className="og-lede">
          Three worlds too vast for solid ground — banded, ringed, and tilted
          on their sides.
        </p>

        <div className="og-row">
          <svg
            className="og-orbit"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,32 Q500,-6 1000,32" pathLength="1" />
          </svg>

          {PLANETS.map((p, i) => (
            <article
              className={`og-card og-card--${p.id}`}
              key={p.id}
              style={
                {
                  "--delay": `${i * 0.2}s`,
                  "--scale": p.scale,
                } as React.CSSProperties
              }
            >
              <div className="og-visual">
                {p.id === "jupiter" && (
                  <div className="og-sphere og-sphere--jupiter">
                    <div className="og-bands" />
                    <div className="og-storm" />
                    <div className="og-shade" />
                  </div>
                )}

                {p.id === "saturn" && (
                  <>
                    <div className="og-ring og-ring--saturn" />
                    <div className="og-sphere og-sphere--saturn">
                      <div className="og-shade" />
                    </div>
                  </>
                )}

                {p.id === "uranus" && (
                  <>
                    <div className="og-ring og-ring--uranus" />
                    <div className="og-sphere og-sphere--uranus">
                      <div className="og-shade" />
                    </div>
                  </>
                )}
              </div>

              <p className="og-tag">{p.tag}</p>
              <h3 className="og-name">{p.name}</h3>
              <p className="og-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useRef } from "react";
import "./NeptuneSection.css";

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "4h 10m", label: "Sunlight delay" },
  { value: "2,100 km/h", label: "Peak recorded winds" },
  { value: "164 yrs", label: "One orbit of the Sun" },
];

/**
 * NeptuneSection — "Found on Paper Before It Was Found in the Sky"
 *
 * A solo spotlight, deliberately laid out differently from the three-up
 * Jupiter/Saturn/Uranus row: asymmetric split, big stats, and a two-point
 * "predicted vs. confirmed" marker — the one true fact that makes Neptune
 * different from every other planet: it was calculated into existence
 * from Uranus's wobble before anyone pointed a telescope at it, and found
 * within about 1° of that prediction the same night astronomers looked.
 */
export default function NeptuneSection() {
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

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => {
        const top = (i * 61 + (i % 6) * 13) % 100;
        const left = (i * 83 + (i % 4) * 19) % 100;
        const size = 1 + (i % 3);
        const delay = (i % 8) * 0.4;
        const dur = 3.4 + (i % 5) * 0.7;
        return { id: i, top, left, size, delay, dur };
      }),
    []
  );

  return (
    <section className="neptune-section" ref={sectionRef}>
      <div className="np-stars" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="np-star"
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

      <div className="np-inner">
        <div className="np-visual">
          <div className="np-orbit-ring np-orbit-ring--outer" aria-hidden="true" />
          <div className="np-orbit-ring np-orbit-ring--inner" aria-hidden="true" />

          <div className="np-sphere">
            <div className="np-streaks" />
            <div className="np-spot" />
            <div className="np-shade" />
          </div>
        </div>

        <div className="np-content">
          <p className="np-eyebrow">
            Planet · VIII &nbsp;·&nbsp; The Outermost World
          </p>
          <h2 className="np-heading">Neptune</h2>
          <p className="np-lede">
            A cold blue giant lashed by the fastest winds in the solar system —
            and the only planet no one ever had to find by looking up.
          </p>

          <div className="np-stats">
            {STATS.map((s) => (
              <div className="np-stat" key={s.label}>
                <span className="np-stat-value">{s.value}</span>
                <span className="np-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="np-predict">
            <div className="np-predict-line" aria-hidden="true">
              <span className="np-predict-dot np-predict-dot--a" />
              <span className="np-predict-track" />
              <span className="np-predict-dot np-predict-dot--b" />
            </div>
            <div className="np-predict-copy">
              <div className="np-predict-row">
                <span className="np-predict-tag">Predicted</span>
                <span className="np-predict-text">
                  Urbain Le Verrier calculated its position from Uranus&apos;s
                  wobble — on paper, months before any telescope confirmed it.
                </span>
              </div>
              <div className="np-predict-row">
                <span className="np-predict-tag np-predict-tag--b">
                  Confirmed
                </span>
                <span className="np-predict-text">
                  Astronomers pointed to that exact patch of sky on 23 September
                  1846 and found it within about 1° of the prediction.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

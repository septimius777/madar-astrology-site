import { useEffect, useRef } from 'react';
import './SunToMurcury.css';

const SunToMercury: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let ticking = false;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      // progress through this section only (0 → 1)
      const raw = total > 0
        ? Math.min(Math.max(-rect.top / total, 0), 1)
        : 0;

      const p =
        raw < 0.55
          ? Math.pow(raw / 0.55, 1.4) * 0.85
          : 0.85 + ((raw - 0.55) / 0.45) * 0.15;

      const scale = 1.35 - p * 0.87;
      const sunFade = Math.max(0, 1 - p * 1.45);
      const mercIn = Math.min(1, Math.max(0, (p - 0.12) * 1.7));
      const glow = Math.max(0, 1 - p * 1.2);
      const sunLabel = Math.max(0, 1 - p * 2.2);
      const mercLabel = Math.min(1, Math.max(0, (p - 0.35) * 2.2));

      root.style.setProperty('--p', p.toFixed(5));
      root.style.setProperty('--raw', raw.toFixed(5));
      root.style.setProperty('--scale', scale.toFixed(4));
      root.style.setProperty('--sun-fade', sunFade.toFixed(4));
      root.style.setProperty('--merc-in', mercIn.toFixed(4));
      root.style.setProperty('--glow', glow.toFixed(4));
      root.style.setProperty('--sun-label', sunLabel.toFixed(4));
      root.style.setProperty('--merc-label', mercLabel.toFixed(4));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="stm-root" ref={rootRef}>
      {/* pinned viewport — stays fixed while section scrolls */}
      <div className="stm-pin">
        <div className="stm-space">
          <div className="stm-stars" />
        </div>

        <div className="stm-ambient" />

        <div className="stm-stage">
          <div className="stm-body">
            <div className="stm-corona stm-corona-outer" />
            <div className="stm-corona stm-corona-inner" />

            <div className="stm-sun">
              <div className="stm-sun-core" />
              <div className="stm-flare stm-flare-a" />
              <div className="stm-flare stm-flare-b" />
            </div>

            <div className="stm-mercury">
              <div className="stm-merc-surface" />
              <div className="stm-merc-craters">
                <i className="c c1" />
                <i className="c c2" />
                <i className="c c3" />
                <i className="c c4" />
                <i className="c c5" />
                <i className="c c6" />
                <i className="c c7" />
                <i className="c c8" />
              </div>
              <div className="stm-merc-terminator" />
            </div>
          </div>
        </div>

        <header className="stm-label stm-label-sun">
          <span className="tag">STAR</span>
          <h1>THE SUN</h1>
          <p>Scroll to leave the photosphere</p>
        </header>

        <footer className="stm-label stm-label-mercury">
          <span className="tag">PLANET</span>
          <h1>MERCURY</h1>
          <p>Closest world to the Sun</p>
        </footer>

        <div className="stm-bar">
          <div className="stm-bar-fill" />
        </div>

        <div className="stm-hint">
          <span>scroll</span>
          <i />
        </div>
      </div>

      {/* creates the scroll distance for the morph */}
      <div className="stm-runway" aria-hidden="true" />
    </div>
  );
};

export default SunToMercury;

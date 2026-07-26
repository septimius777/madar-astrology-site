import { ZODIAC } from "../../data/zodiacData";
import Reveal from "../ui/Reveal";

/** Ports the HERO section (the Sun) including the animated orrery SVG. */
export default function MedarHeroSection() {
  const r = 270;
  const cx = 300;
  const cy = 300;

  return (
    <section id="hero" className="medar-section medar-hero">
      <div className="medar-hero__orrery" aria-hidden="true">
        <svg viewBox="0 0 600 600" className="medar-orrery">
          <g className="medar-orrery__ring medar-orrery__ring--outer">
            <circle cx={300} cy={300} r={270} />
            <g className="medar-orrery__glyphs">
              {ZODIAC.map((z, i) => {
                const angle = (i / ZODIAC.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                return (
                  <text
                    key={z.latin}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(230,200,119,.55)"
                    fontSize={16}
                  >
                    {z.symbol}
                  </text>
                );
              })}
            </g>
          </g>
          <g className="medar-orrery__ring medar-orrery__ring--mid">
            <circle cx={300} cy={300} r={205} />
          </g>
          <g className="medar-orrery__ring medar-orrery__ring--inner">
            <circle cx={300} cy={300} r={140} />
          </g>
          <circle cx={300} cy={300} r={8} className="medar-orrery__core" />
        </svg>
      </div>

      <Reveal className="medar-hero__content">
        <p className="medar-eyebrow">☉ رصدخانه‌ی مدار</p>
        <h1 className="medar-hero__title">
          آسمان، در لحظه‌ی دقیقِ
          <br />
          تولدِ تو
        </h1>
        <p className="medar-hero__lead">
          مدار نقشه‌ای‌ست از جای خورشید، ماه و سیاره‌ها در روزی که به دنیا آمدی؛
          برای شناختن خودت، نه برای شنیدنِ آینده از زبانِ ستاره‌ها.
        </p>
        <div className="medar-hero__actions">
          <a href="#chart" className="medar-btn medar-btn--primary">
            زایچه‌ی من را بساز
          </a>
          <a href="#method" className="medar-btn medar-btn--ghost">
            روش را ببین
          </a>
        </div>
      </Reveal>

      <div className="medar-scroll-cue" aria-hidden="true">
        <span />
        <p>پیمایش کن</p>
      </div>
    </section>
  );
}

import React from 'react';
import './VenusEarthMars.css';

/**
 * Venus · Earth · Mars — matches the site's existing "Mercury" card language:
 * near-black backdrop, sparse static stars, serif display names, small-caps
 * labels, soft neutral shadows (no neon). The three planets orbit around a
 * shared center that now holds the section's title. A detail list below
 * gives each planet its own label / name / line, same rhythm as the
 * Mercury card. Persian / RTL.
 */
const VenusEarthMars: React.FC = () => {
  return (
    <section className="vem-section" dir="rtl">
      <div className="vem-stars" />
      <div className="vem-halo" />

      <div className="vem-content">
        <div className="vem-stage-wrap">
          <div className="vem-stage">
            <div className="vem-ring" />

            {/* title now lives in the middle of the orbiting circles */}
            <div className="vem-core">
              <span className="vem-core-eyebrow">سه همسایه</span>
              <h2 className="vem-core-title">زهره · زمین · مریخ</h2>
              <span className="vem-core-sub">در چرخش به دور خورشید</span>
            </div>

            {/* shared rotating orbit */}
            <div className="vem-orbit">
              {/* Venus at 0° */}
              <div className="vem-arm vem-arm-venus">
                <div className="vem-planet-wrap">
                  <div className="vem-planet vem-venus">
                    <div className="vem-venus-clouds" />
                  </div>
                </div>
              </div>

              {/* Earth at 120° */}
              <div className="vem-arm vem-arm-earth">
                <div className="vem-planet-wrap">
                  <div className="vem-planet vem-earth">
                    <div className="vem-earth-land vem-land-1" />
                    <div className="vem-earth-land vem-land-2" />
                    <div className="vem-earth-land vem-land-3" />
                    <div className="vem-earth-cloud" />
                  </div>
                </div>
              </div>

              {/* Mars at 240° */}
              <div className="vem-arm vem-arm-mars">
                <div className="vem-planet-wrap">
                  <div className="vem-planet vem-mars">
                    <div className="vem-mars-dark" />
                    <div className="vem-mars-polar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* detail rows — same rhythm as the Mercury card, one per planet */}
        <div className="vem-rows">
          <div className="vem-row">
            <span className="vem-row-eyebrow">سیاره دوم</span>
            <h3 className="vem-row-title">زهره</h3>
            <p className="vem-row-sub">داغ‌ترین سیاره‌ی منظومه شمسی، پوشیده از ابرهای غلیظ</p>
          </div>

          <div className="vem-row-divider" />

          <div className="vem-row">
            <span className="vem-row-eyebrow">سیاره سوم</span>
            <h3 className="vem-row-title">زمین</h3>
            <p className="vem-row-sub">خانه‌ی ما، تنها جهان شناخته‌شده با آب و حیات</p>
          </div>

          <div className="vem-row-divider" />

          <div className="vem-row">
            <span className="vem-row-eyebrow">سیاره چهارم</span>
            <h3 className="vem-row-title">مریخ</h3>
            <p className="vem-row-sub">سیاره‌ی سرخ و کویری، به‌خاطر خاک آهن‌دارش</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenusEarthMars;
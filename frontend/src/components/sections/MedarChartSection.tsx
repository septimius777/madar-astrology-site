import { useMemo, useState, type FormEvent } from "react";
import { CURRENT_JALALI_YEAR, ZODIAC } from "../../data/zodiacData";
import Reveal from "../ui/Reveal";
import { useParallax } from "../../hooks/useParallax";

const YEARS = Array.from({ length: 106 }, (_, i) => CURRENT_JALALI_YEAR - i);

/** Ports the CHART TOOL section (the Moon) — day/month/year selects + result. */
export default function MedarChartSection() {
  const planetRef = useParallax<HTMLDivElement>(0.1);

  const [monthIndex, setMonthIndex] = useState(0);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(CURRENT_JALALI_YEAR);
  const [result, setResult] = useState<{
    day: number;
    year: number;
    monthIndex: number;
  } | null>(null);

  const dayCount = ZODIAC[monthIndex].days;
  const days = useMemo(
    () => Array.from({ length: dayCount }, (_, i) => i + 1),
    [dayCount]
  );

  function handleMonthChange(newIndex: number) {
    setMonthIndex(newIndex);
    const count = ZODIAC[newIndex].days;
    setDay((current) => Math.min(current, count));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setResult({ day, year, monthIndex });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Give the result panel a tick to render before scrolling to it.
    requestAnimationFrame(() => {
      document
        .getElementById("chartResult")
        ?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
    });
  }

  const z = result ? ZODIAC[result.monthIndex] : null;

  return (
    <section id="chart" className="medar-section medar-chart-tool">
      <div
        ref={planetRef}
        className="medar-planet medar-planet--moon"
        aria-hidden="true"
      />
      <div className="medar-container medar-chart-tool__grid">
        <div className="medar-chart-tool__intro">
          <Reveal as="p" className="medar-eyebrow">
            ☾ ماه — زایچه‌ی تو
          </Reveal>
          <Reveal as="h2" className="medar-section-title">
            روز، ماه و سالِ تولدت را وارد کن
          </Reveal>
          <Reveal as="p">
            بر اساس گاه‌شماری خورشیدی، هر ماه دقیقاً با یک برج آسمانی برابر است —
            برای همین تقویم ایرانی، دقیق‌ترین راه رسیدن به برجِ توست.
          </Reveal>

          <Reveal
            as="form"
            className="medar-chart-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="medar-chart-form__row">
              <label>
                <span>روز</span>
                <select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  required
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>ماه</span>
                <select
                  value={monthIndex}
                  onChange={(e) => handleMonthChange(Number(e.target.value))}
                  required
                >
                  {ZODIAC.map((zItem, i) => (
                    <option key={zItem.month} value={i}>
                      {zItem.month}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>سال</span>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  required
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="medar-btn medar-btn--primary">
              برجِ من چیست؟
            </button>
          </Reveal>
        </div>

        <div
          className="medar-chart-tool__result"
          id="chartResult"
          aria-live="polite"
        >
          {!z ? (
            <div className="medar-result-placeholder">
              <svg
                viewBox="0 0 200 200"
                className="medar-result-placeholder__ring"
                aria-hidden="true"
              >
                <circle cx={100} cy={100} r={90} />
                <circle cx={100} cy={100} r={64} />
              </svg>
              <p>هنوز چیزی وارد نشده — تاریخ تولدت را کامل کن.</p>
            </div>
          ) : (
            <div className="medar-zodiac-result">
              <div className="medar-zodiac-result__symbol">{z.symbol}</div>
              <div className="medar-zodiac-result__name">
                {z.sign}{" "}
                <span style={{ color: "var(--medar-c-mist-dim)", fontWeight: 400 }}>
                  ({z.latin})
                </span>
              </div>
              <div className="medar-zodiac-result__month">
                متولد {result!.day} {z.month} {result!.year}
              </div>
              <div className="medar-zodiac-result__meta">
                <div>
                  <span>عنصر</span>
                  <strong>{z.element}</strong>
                </div>
                <div>
                  <span>سیاره‌ی حاکم</span>
                  <strong>{z.ruler}</strong>
                </div>
              </div>
              <p className="medar-zodiac-result__trait">{z.long}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import {
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { CURRENT_JALALI_YEAR, ZODIAC } from "../../data/zodiacData";
import Reveal from "../ui/Reveal";
import { useParallax } from "../../hooks/useParallax";

const YEARS = Array.from({ length: 106 }, (_, i) => CURRENT_JALALI_YEAR - i);
const SIGN_COUNT = ZODIAC.length;

/**
 * Deterministic (not Math.random-on-every-render) twinkle timing per wheel
 * node, so the idle wheel reads as a field of stars blinking at their own
 * pace instead of pulsing in unison — but never re-randomizes on re-render.
 */
const NODE_TWINKLE = ZODIAC.map((_, i) => ({
  duration: 2.4 + ((i * 37) % 17) / 5, // ~2.4s – 5.6s
  delay: ((i * 53) % 24) / 10, // 0s – 2.3s
}));

/**
 * Position (in %) of sign `index` around the wheel, 0deg = 12 o'clock,
 * clockwise — the same convention CSS `conic-gradient` uses, so rotating
 * the light beam by a sign's angle always points it exactly at that sign's
 * node, never an approximation.
 */
function nodePosition(index: number, radius = 40) {
  const angleDeg = (index / SIGN_COUNT) * 360;
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    angleDeg,
    x: 50 + Math.cos(rad) * radius,
    y: 50 + Math.sin(rad) * radius,
  };
}

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
  const targetAngle = result ? nodePosition(result.monthIndex).angleDeg : 0;

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
          <div className="medar-chart-wheel-wrap">
            {/* Decorative — the wheel is always mounted. Before a result
                exists the beam idly sweeps ("searching"); once the form is
                submitted it settles, exactly once, on the real computed
                sign's node — never a random one. The text result below is
                the actual accessible content. */}
            <div className="medar-chart-wheel" aria-hidden="true">
              <div className="medar-chart-wheel__ring medar-chart-wheel__ring--outer" />
              <div className="medar-chart-wheel__ring medar-chart-wheel__ring--inner" />
              <div
                className={
                  result
                    ? "medar-chart-wheel__beam medar-chart-wheel__beam--locked"
                    : "medar-chart-wheel__beam medar-chart-wheel__beam--searching"
                }
                style={
                  result
                    ? ({
                        "--medar-beam-angle": `${targetAngle}deg`,
                      } as CSSProperties)
                    : undefined
                }
              />
              <div className="medar-chart-wheel__nodes">
                {ZODIAC.map((sign, index) => {
                  const { x, y } = nodePosition(index);
                  const tw = NODE_TWINKLE[index];
                  const lit = result?.monthIndex === index;
                  return (
                    <span
                      key={sign.latin}
                      className={
                        lit
                          ? "medar-chart-node medar-chart-node--lit"
                          : "medar-chart-node"
                      }
                      style={
                        {
                          left: `${x}%`,
                          top: `${y}%`,
                          "--tw-dur": `${tw.duration}s`,
                          "--tw-delay": `${tw.delay}s`,
                        } as CSSProperties
                      }
                    >
                      {sign.symbol}
                    </span>
                  );
                })}
              </div>
              <div className="medar-chart-wheel__core" />
            </div>

            {!z ? (
              <p className="medar-chart-wheel__hint">
                هنوز چیزی وارد نشده — تاریخ تولدت را کامل کن.
              </p>
            ) : (
              <div
                className="medar-zodiac-result medar-zodiac-result--reveal"
                key={`${result!.monthIndex}-${result!.day}-${result!.year}`}
              >
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
      </div>
    </section>
  );
}
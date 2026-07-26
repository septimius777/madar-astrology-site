import Reveal from "../ui/Reveal";
import { useParallax } from "../../hooks/useParallax";

const PRINCIPLES = [
  {
    glyph: "◍",
    title: "ابزار، نه پیش‌گویی",
    text: "زایچه فقط ثبتِ موقعیتِ سیاره‌هاست در لحظه‌ی تولد؛ نه وعده‌ای برای آینده.",
  },
  {
    glyph: "◎",
    title: "موقعیت، نه قضاوت",
    text: "جای هر سیاره یک داده است. معنایش را خودت می‌سازی، نه ما.",
  },
  {
    glyph: "◑",
    title: "قابل‌تکرار، نه رازآلود",
    text: "با همین تاریخ تولد، هر کسی می‌تواند دقیقاً همین زایچه را دوباره بسازد.",
  },
];

/** Ports the METHOD section (Mercury). */
export default function MedarMethodSection() {
  const planetRef = useParallax<HTMLDivElement>(0.06);

  return (
    <section id="method" className="medar-section medar-method">
      <div
        ref={planetRef}
        className="medar-planet medar-planet--mercury"
        aria-hidden="true"
      />
      <div className="medar-container">
        <Reveal as="p" className="medar-eyebrow">
          ☿ عطارد — روش
        </Reveal>
        <Reveal as="h2" className="medar-section-title">
          بخوانش مثل یک ابزار، نه یک تیتر خبری
        </Reveal>

        <div className="medar-principle-grid">
          {PRINCIPLES.map((p) => (
            <Reveal as="article" key={p.title} className="medar-principle-card">
              <span className="medar-principle-card__glyph">{p.glyph}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

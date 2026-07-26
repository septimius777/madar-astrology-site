import Reveal from "../ui/Reveal";
import { useParallax } from "../../hooks/useParallax";

const SERVICES = [
  {
    title: "زایچه‌ی تولدِ کامل",
    text: "خوانشِ عمیقِ جای‌گیریِ سیاره‌ها در لحظه‌ی تولد، در یک گزارشِ مکتوب.",
    icon: (
      <>
        <circle cx={24} cy={24} r={16} />
        <ellipse cx={24} cy={24} rx={22} ry={7} />
      </>
    ),
  },
  {
    title: "هم‌ترازیِ دو نفره",
    text: "مقایسه‌ی دو زایچه؛ برای فهمیدنِ سازگاری و نقاطِ اصطکاک در یک رابطه.",
    icon: (
      <>
        <circle cx={17} cy={24} r={11} />
        <circle cx={31} cy={24} r={11} />
      </>
    ),
  },
  {
    title: "مسیرِ سالانه",
    text: "نقشه‌ی یک سالِ پیشِ رو، بر اساس بازگشتِ خورشید به جایگاهِ تولدت.",
    icon: <path d="M24 6 L27 20 L41 24 L27 28 L24 42 L21 28 L7 24 L21 20 Z" />,
  },
  {
    title: "جلسه‌ی مشاوره‌ی زنده",
    text: "یک گفت‌وگوی صوتیِ یک‌ساعته برای مرور زایچه‌ات، پرسش و پاسخ زنده.",
    icon: (
      <>
        <rect x={10} y={18} width={28} height={18} rx={2} />
        <path d="M18 18 L24 8 L30 18 Z" />
      </>
    ),
  },
];

/** Ports the SERVICES section (Jupiter). */
export default function MedarServicesSection() {
  const planetRef = useParallax<HTMLDivElement>(0.05);

  return (
    <section id="services" className="medar-section medar-services">
      <div
        ref={planetRef}
        className="medar-planet medar-planet--jupiter"
        aria-hidden="true"
      />
      <div className="medar-container">
        <Reveal as="p" className="medar-eyebrow">
          ♃ مشتری — خدمات
        </Reveal>
        <Reveal as="h2" className="medar-section-title">
          خدماتِ رصدخانه
        </Reveal>

        <div className="medar-service-grid">
          {SERVICES.map((s) => (
            <Reveal as="article" key={s.title} className="medar-service-card">
              <svg
                className="medar-service-card__icon"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                {s.icon}
              </svg>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

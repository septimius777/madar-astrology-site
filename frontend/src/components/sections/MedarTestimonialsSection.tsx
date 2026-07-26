import Reveal from "../ui/Reveal";
import { useParallax } from "../../hooks/useParallax";

const TESTIMONIALS = [
  {
    quote:
      "«فکر می‌کردم چیزِ عجیب‌وغریبی می‌بینم، ولی بیشتر شبیهِ یک آینه بود تا یک پیش‌گویی.»",
    author: "سارا، ۲۹ ساله",
  },
  {
    quote:
      "«توضیحِ برجم آن‌قدر دقیق بود که حس کردم یک نفر واقعاً نشسته و مرا خوانده، نه یک متنِ عمومی.»",
    author: "آرش، ۳۴ ساله",
  },
  {
    quote:
      "«جلسه‌ی مشاوره بیشتر شبیهِ یک گفت‌وگوی خوب بود تا یک جلسه‌ی فالگیری. همین را دوست داشتم.»",
    author: "نگار، ۲۶ ساله",
  },
];

/** Ports the TESTIMONIALS section (Saturn). */
export default function MedarTestimonialsSection() {
  const planetRef = useParallax<HTMLDivElement>(0.07);

  return (
    <section id="testimonials" className="medar-section medar-testimonials">
      <div
        ref={planetRef}
        className="medar-planet medar-planet--saturn"
        aria-hidden="true"
      />
      <div className="medar-container">
        <Reveal as="p" className="medar-eyebrow">
          ♄ زحل — پیام‌های رسیده
        </Reveal>
        <Reveal as="h2" className="medar-section-title">
          آن‌چه دیگران نوشته‌اند
        </Reveal>

        <div className="medar-testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <Reveal
              as="blockquote"
              key={t.author}
              className="medar-testimonial-card"
            >
              <p>{t.quote}</p>
              <cite>{t.author}</cite>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

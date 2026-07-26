import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ZODIAC } from "../../data/zodiacData";
import Reveal from "../ui/Reveal";
import ConstellationGlyph from "../ui/ConstellationGlyph";

/** Per-element accent color, used to tint the active sign's glow + badge. */
const ELEMENT_COLOR: Record<string, string> = {
  "آتش": "rgba(180,87,58,.55)", // fire — ember
  "خاک": "rgba(168,146,74,.5)", // earth — brass/olive
  "باد": "rgba(146,181,214,.45)", // air — pale blue-silver
  "آب": "rgba(94,120,196,.5)", // water — deep blue
};

const AUTO_ADVANCE_MS = 4200;
const RESUME_DELAY_MS = 3200;

const wheelVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * GALLERY section, redesigned as a "zodiac compass": twelve nodes arranged
 * in a circle (auto-cycling, hoverable, tappable) drive a crossfading
 * "stage" panel that shows the active sign's full detail. The wheel itself
 * has a slow ambient spin plus a scroll-linked rotation/scale tied to how
 * far the section has scrolled through the viewport.
 */
export default function MedarGallerySection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const interacting = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const wheelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);

  // Auto-cycle the active sign, unless the person is actively hovering/
  // focusing/tapping a node (see `selectSign` below).
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      if (!interacting.current) {
        setActiveIndex((i) => (i + 1) % ZODIAC.length);
      }
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  function selectSign(index: number) {
    setActiveIndex(index);
    interacting.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      interacting.current = false;
    }, RESUME_DELAY_MS);
  }

  const nodes = useMemo(
    () =>
      ZODIAC.map((sign, index) => {
        const angle = (index / ZODIAC.length) * Math.PI * 2 - Math.PI / 2;
        return {
          sign,
          index,
          x: 50 + Math.cos(angle) * 42,
          y: 50 + Math.sin(angle) * 42,
        };
      }),
    []
  );

  const active = ZODIAC[activeIndex];
  const activeColor = ELEMENT_COLOR[active.element] ?? "rgba(230,200,119,.4)";

  return (
    <section
      id="gallery"
      className="medar-section medar-gallery"
      ref={sectionRef}
    >
      <div className="medar-container">
        <Reveal as="p" className="medar-eyebrow">
          ✶ نوارِ منطقةالبروج — دوازده برج
        </Reveal>
        <Reveal as="h2" className="medar-section-title">
          دوازده صورتِ فلکی، دوازده مزاج
        </Reveal>
        <Reveal as="p" className="medar-section-lead">
          یکی را نشان کن یا بگذار خودش بچرخد.
        </Reveal>

        <div className="medar-zodiac-compass">
          <motion.div
            className="medar-zodiac-wheel"
            style={
              prefersReducedMotion
                ? undefined
                : { rotate: wheelRotate, scale: wheelScale }
            }
          >
            <div className="medar-zodiac-wheel__sweep" aria-hidden="true" />
            <div className="medar-zodiac-wheel__ring medar-zodiac-wheel__ring--outer" />
            <div className="medar-zodiac-wheel__ring medar-zodiac-wheel__ring--inner" />

            <motion.div
              className="medar-zodiac-wheel__nodes"
              variants={wheelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {nodes.map(({ sign, index, x, y }) => (
                <motion.button
                  key={sign.latin}
                  type="button"
                  variants={nodeVariants}
                  className={`medar-zodiac-node${
                    index === activeIndex ? " medar-is-active" : ""
                  }`}
                  style={{ left: `${x}%`, top: `${y}%`, x: "-50%", y: "-50%" }}
                  onMouseEnter={() => selectSign(index)}
                  onFocus={() => selectSign(index)}
                  onClick={() => selectSign(index)}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.18 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  aria-label={`${sign.sign} — ${sign.latin}`}
                  aria-pressed={index === activeIndex}
                >
                  <span>{sign.symbol}</span>
                </motion.button>
              ))}
            </motion.div>

            <div className="medar-zodiac-wheel__core" aria-hidden="true" />
          </motion.div>

          <div className="medar-zodiac-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.latin}
                className="medar-zodiac-stage__panel"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ boxShadow: `0 0 80px -20px ${activeColor}` }}
              >
                <div className="medar-zodiac-stage__glyph">
                  <ConstellationGlyph sign={active} />
                </div>

                <motion.div
                  className="medar-zodiac-stage__symbol"
                  animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {active.symbol}
                </motion.div>

                <h3 className="medar-zodiac-stage__name">
                  {active.sign} <span>({active.latin})</span>
                </h3>
                <p className="medar-zodiac-stage__month">ماه {active.month}</p>

                <div className="medar-zodiac-stage__badges">
                  <span
                    className="medar-zodiac-badge"
                    style={{ borderColor: activeColor, color: activeColor }}
                  >
                    <i style={{ background: activeColor }} />
                    عنصر {active.element}
                  </span>
                  <span className="medar-zodiac-badge">
                    سیاره‌ی حاکم {active.ruler}
                  </span>
                </div>

                <p className="medar-zodiac-stage__short">{active.short}</p>
                <p className="medar-zodiac-stage__long">{active.long}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
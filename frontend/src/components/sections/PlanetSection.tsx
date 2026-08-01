import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlanetData } from "../../types/planet";
import Planet from "../celestial/Planet";
import { staggerContainer, staggerItem } from "../../animations/variants";

interface PlanetSectionProps {
  planet: PlanetData;
  index: number;
  reversed?: boolean;
}

export default function PlanetSection({ planet, index, reversed }: PlanetSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const planetY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const planetScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const planetOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      data-section-index={index}
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24 sm:px-12"
    >
      <div
        className={`mx-auto flex w-full max-w-6xl flex-col items-center gap-14 md:gap-10 ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Planet visual */}
        <motion.div
          style={{ y: planetY, scale: planetScale, opacity: planetOpacity }}
          className="flex flex-1 items-center justify-center"
        >
          <Planet planet={planet} />
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-1 flex-col items-center text-center md:items-start md:text-right"
        >
          <motion.span
            variants={staggerItem}
            dir="ltr"
            className="mb-3 font-mono text-xs tracking-[0.3em] text-white/50"
            style={{ color: planet.colorSoft }}
          >
            {String(index).padStart(2, "0")} — {planet.nameEn}
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="font-display text-5xl font-bold text-white sm:text-6xl"
          >
            {planet.nameFa}
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mt-2 text-lg font-medium"
            style={{ color: planet.colorSoft }}
          >
            {planet.tagline}
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-xl text-balance leading-8 text-white/75"
          >
            {planet.description}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            {planet.traits.map((trait) => (
              <div
                key={trait.label}
                className="rounded-full border px-4 py-1.5 text-xs text-white/80 backdrop-blur-sm"
                style={{ borderColor: `${planet.color}55`, backgroundColor: `${planet.color}14` }}
              >
                <span className="text-white/50">{trait.label}:</span> {trait.value}
              </div>
            ))}
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 font-mono text-xs tracking-wide text-white/35"
          >
            {planet.distanceLabel}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

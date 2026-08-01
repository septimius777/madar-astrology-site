import { motion } from "framer-motion";
import Sun from "../celestial/Sun";
import ScrollHint from "../ui/ScrollHint";
import { fadeUp, staggerContainer, staggerItem } from "../../animations/variants";
import { siteContent } from "../../content/site";

export default function HeroSection() {
  return (
    <section
      data-section-index={0}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.span
          variants={staggerItem}
          dir="ltr"
          className="mb-4 font-mono text-xs tracking-[0.4em] text-white/50"
        >
          {siteContent.eyebrow}
        </motion.span>

        <motion.h1
          variants={staggerItem}
          className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl"
        >
          {siteContent.heroTitle}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mt-5 max-w-xl text-balance leading-8 text-white/70"
        >
          {siteContent.heroBody}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14">
          <Sun />
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="mt-14 max-w-md text-sm leading-7 text-white/45"
        >
          {siteContent.heroFootnote}
        </motion.p>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

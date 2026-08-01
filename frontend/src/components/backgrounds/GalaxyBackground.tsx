import { motion } from "framer-motion";
import { planets } from "../../data/planets";
import StarField from "./StarField";

interface GalaxyBackgroundProps {
  activeIndex: number;
}

export default function GalaxyBackground({ activeIndex }: GalaxyBackgroundProps) {
  const current = planets[activeIndex] ?? planets[0];
  const depth = activeIndex / (planets.length - 1); // 0 near sun -> 1 deep space

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* base void gradient, darkens as we travel further out */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(120% 100% at 50% 20%, ${current.colorDeep}22 0%, #05060f 55%, #020208 100%)`,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* ambient nebula glow, color-shifts per planet */}
      <motion.div
        className="absolute -left-1/4 top-1/3 h-[60vw] w-[60vw] rounded-full blur-[120px]"
        animate={{
          backgroundColor: current.nebulaColor,
          opacity: 0.16 + depth * 0.08,
        }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[50vw] w-[50vw] rounded-full blur-[140px]"
        animate={{
          backgroundColor: current.colorSoft,
          opacity: 0.1 + depth * 0.06,
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <StarField
        density={current.starDensity}
        color={current.starColor}
        depth={depth}
      />

      {/* soft vignette so foreground text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}

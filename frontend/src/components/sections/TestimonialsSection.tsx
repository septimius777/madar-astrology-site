import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import SectionEyebrow from "../ui/SectionEyebrow";
import ConstellationSVG from "../celestial/ConstellationSVG";
import { testimonials } from "../../data/testimonials";
import { getConstellationById } from "../../data/constellations";
import { revealFromDarkness } from "../../animations/reveal";

export default function TestimonialsSection() {
  const [activeId, setActiveId] = useState(testimonials[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  const active = testimonials.find((t) => t.id === activeId) ?? testimonials[0];

  useEffect(() => {
    if (!sectionRef.current || !nodesRef.current) return;
    const ctx = gsap.context(() => {
      const nodes = nodesRef.current!.querySelectorAll(".testimonial-node");
      revealFromDarkness(nodes, sectionRef.current!, { stagger: 0.18 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-16 px-6 py-32 sm:px-10"
    >
      <div className="flex flex-col gap-6">
        <SectionEyebrow index="04" label="Written in the Stars" />
        <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight text-dawn-white sm:text-5xl">
          A few things clients said afterward.
        </h2>
      </div>

      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          ref={nodesRef}
          className="flex flex-row justify-center gap-8 lg:flex-col lg:items-start lg:gap-6"
        >
          {testimonials.map((t) => {
            const constellation = getConstellationById(t.constellationId);
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className="testimonial-node group flex items-center gap-4 text-left"
                aria-pressed={isActive}
              >
                <span className="relative h-14 w-14 shrink-0">
                  <ConstellationSVG
                    constellation={constellation}
                    lit={isActive}
                    color={isActive ? "#F2A94D" : "#F1ECE2"}
                    className="h-full w-full opacity-90 transition-opacity group-hover:opacity-100"
                  />
                </span>
                <span
                  className={`hidden font-mono text-xs uppercase tracking-widest2 transition-colors lg:inline ${
                    isActive ? "text-gold" : "text-dawn-white/40"
                  }`}
                >
                  {constellation.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <blockquote className="text-balance font-display text-2xl font-light leading-snug text-dawn-white sm:text-3xl">
                "{active.quote}"
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest2 text-dawn-white/40">
                {active.attribution}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

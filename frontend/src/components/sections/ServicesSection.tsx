import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import GlassPanel from "../ui/GlassPanel";
import SectionEyebrow from "../ui/SectionEyebrow";
import { services } from "../../data/services";
import { revealFromDarkness } from "../../animations/reveal";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".service-card");
      revealFromDarkness(cards, sectionRef.current!, { stagger: 0.1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-16 px-6 py-32 sm:px-10"
    >
      <div className="flex flex-col gap-6">
        <SectionEyebrow index="03" label="Sessions" />
        <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight text-dawn-white sm:text-5xl">
          Choose how closely you want to look.
        </h2>
      </div>

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="service-card"
          >
            <GlassPanel glow className="flex h-full flex-col gap-5 p-7 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-medium text-dawn-white">
                  {service.name}
                </h3>
                <span className="whitespace-nowrap font-mono text-sm text-gold/80">
                  {service.price}
                </span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/40">
                {service.duration}
              </p>
              <p className="text-sm leading-relaxed text-dawn-white/60">
                {service.description}
              </p>
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-white/10 pt-4">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-dawn-white/50"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

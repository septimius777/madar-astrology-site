import { useEffect, useRef } from "react";
import gsap from "gsap";
import { revealFromDarkness, slowRotate } from "../../animations/reveal";
import SectionEyebrow from "../ui/SectionEyebrow";

const principles = [
  {
    title: "The instrument, not the omen",
    body: "A chart is a record of exactly where the sun, moon, and planets stood at your first breath — read like an instrument panel, not a fortune.",
  },
  {
    title: "Placement over prophecy",
    body: "Where a planet sits matters more than what it 'means.' Position is data. Meaning is something we build together, in session.",
  },
  {
    title: "Repeatable, not mystical",
    body: "Anyone with your birth data and time can recalculate your chart exactly. The method is old. The math still holds.",
  },
];

export default function AstrologyIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringOuterRef = useRef<SVGGElement>(null);
  const ringInnerRef = useRef<SVGGElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      if (ringOuterRef.current) slowRotate(ringOuterRef.current, 120);
      if (ringInnerRef.current) slowRotate(ringInnerRef.current, 80);

      const cards = cardsRef.current!.querySelectorAll(".principle-card");
      revealFromDarkness(cards, sectionRef.current!, { stagger: 0.15 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-16 px-6 py-32 sm:px-10"
    >
      <div className="flex flex-col gap-6">
        <SectionEyebrow index="01" label="The Method" />
        <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight text-dawn-white sm:text-5xl">
          Read like an instrument, not a headline.
        </h2>
      </div>

      <div className="relative grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Decorative rotating chart rings — ambient, not tied to real ephemeris data */}
        <div className="relative mx-auto aspect-square w-full max-w-md opacity-80">
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
            <g ref={ringOuterRef} style={{ transformOrigin: "100px 100px" }}>
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="#F1ECE2"
                strokeOpacity="0.25"
                strokeWidth="0.6"
              />
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const x1 = 100 + Math.cos(angle) * 92;
                const y1 = 100 + Math.sin(angle) * 92;
                const x2 = 100 + Math.cos(angle) * 86;
                const y2 = 100 + Math.sin(angle) * 86;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#F1ECE2"
                    strokeOpacity="0.3"
                    strokeWidth="0.6"
                  />
                );
              })}
            </g>
            <g ref={ringInnerRef} style={{ transformOrigin: "100px 100px" }}>
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="#F2A94D"
                strokeOpacity="0.3"
                strokeWidth="0.6"
              />
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x2 = 100 + Math.cos(angle) * 62;
                const y2 = 100 + Math.sin(angle) * 62;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={x2}
                    y2={y2}
                    stroke="#F2A94D"
                    strokeOpacity="0.12"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
            <circle cx="100" cy="100" r="3" fill="#F2A94D" fillOpacity="0.8" />
          </svg>
        </div>

        <div ref={cardsRef} className="flex flex-col gap-6">
          {principles.map((p) => (
            <div
              key={p.title}
              className="principle-card border-l border-white/10 pl-6"
            >
              <h3 className="mb-2 font-display text-xl font-medium text-dawn-white">
                {p.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-dawn-white/60">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

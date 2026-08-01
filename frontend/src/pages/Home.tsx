import { planets } from "../data/planets";
import { siteContent } from "../content/site";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollProgress } from "../hooks/useScrollProgress";
import GalaxyBackground from "../components/backgrounds/GalaxyBackground";
import Header from "../components/Header";
import HeroSection from "../components/sections/HeroSection";
import PlanetSection from "../components/sections/PlanetSection";
import ScrollProgress from "../components/ui/ScrollProgress";

export default function Home() {
  const activeIndex = useActiveSection(planets.length);
  const progress = useScrollProgress();

  const otherPlanets = planets.filter((p) => p.id !== "sun");

  return (
    <div className="relative">
      <GalaxyBackground activeIndex={activeIndex} />
      <Header />
      <ScrollProgress progress={progress} activeIndex={activeIndex} />

      <main>
        <HeroSection />
        {otherPlanets.map((planet, i) => (
          <PlanetSection
            key={planet.id}
            planet={planet}
            index={planet.order}
            reversed={i % 2 === 1}
          />
        ))}

        <footer className="relative flex flex-col items-center gap-2 px-6 pb-16 pt-10 text-center text-white/35">
          <p className="text-sm">{siteContent.footerLine1}</p>
          <p dir="ltr" className="font-mono text-[10px] tracking-[0.3em]">
            {siteContent.footerLine2}
          </p>
        </footer>
      </main>
    </div>
  );
}

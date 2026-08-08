import AstrologyIntro from "../components/SolarSystem/SunToMurcury";
import VenusEarthMars from "../components/SolarSystem/VenusEarthMars";
import NeptuneSection from "../components/SolarSystem/NeptuneSection";
import OrbitalGiants from "../components/SolarSystem/OrbitalGiants";

export default function HomePage() {
  // ... your existing useEffect

  return (
    <div className="relative min-h-screen">
      <AstrologyIntro />
      <VenusEarthMars />   {/* ← new section */}
      <OrbitalGiants /> 
      <NeptuneSection /> 
      
    </div>
  );
}
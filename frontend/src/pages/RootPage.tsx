import AmbientNightBackground from "../components/celestial/AmbientNightBackground";
import Header from "../components/Header";
import SkyJourney from "../components/sections/SkyJourney";
export default function RootPage() {
  return (
      <div id="top" className="relative">
        <Header />
  
        {/* Hero + the pinned day-to-night scroll transition (the signature moment) */}
        <SkyJourney />
  
        {/* Everything below lives in the night the transition ends on */}
        <div className="relative">
          <AmbientNightBackground />
        </div>
      </div>
    );
}

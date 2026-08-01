import SolarBackground from '../components/backgrounds/SolarBackground'
import ScrollProgress from '../components/ui/ScrollProgress'
import SunSection from '../components/sections/SunSection'
import MercurySection from '../components/sections/MercurySection'
import VenusSection from '../components/sections/VenusSection'
import EarthSection from '../components/sections/EarthSection'
import MarsSection from '../components/sections/MarsSection'
import JupiterSection from '../components/sections/JupiterSection'
import SaturnSection from '../components/sections/SaturnSection'
import UranusSection from '../components/sections/UranusSection'
import NeptuneSection from '../components/sections/NeptuneSection'

export default function HomePage() {
  return (
    <div className="relative">
      <SolarBackground />
      <ScrollProgress />

      <SunSection />
      <MercurySection />
      <VenusSection />
      <EarthSection />
      <MarsSection />
      <JupiterSection />
      <SaturnSection />
      <UranusSection />
      <NeptuneSection />
    </div>
  )
}

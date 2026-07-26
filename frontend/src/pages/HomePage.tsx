import { useEffect } from "react";
import AstrologyIntro from "../components/sections/AstrologyIntro";
import BirthChartSection from "../components/sections/BirthChartSection";
import ServicesSection from "../components/sections/ServicesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ContactSection from "../components/sections/ContactSection";
import HomePageBackground from "../components/backgrounds/HomePageBackground";

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add("route-homepage");
    return () => document.body.classList.remove("route-homepage");
  }, []);

  return (
    <div className="relative min-h-screen">
      <HomePageBackground />
      <AstrologyIntro />
      <BirthChartSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
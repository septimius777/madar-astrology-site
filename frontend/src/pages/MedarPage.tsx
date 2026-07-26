import { useEffect } from "react";
import MedarBackground from "../components/backgrounds/MedarBackground";
import MedarHeader from "../components/ui/MedarHeader";
import OrbitRail from "../components/ui/OrbitRail";
import MedarFooter from "../components/ui/MedarFooter";
import MedarHeroSection from "../components/sections/MedarHeroSection";
import MedarMethodSection from "../components/sections/MedarMethodSection";
import MedarChartSection from "../components/sections/MedarChartSection";
import MedarGallerySection from "../components/sections/MedarGallerySection";
import MedarServicesSection from "../components/sections/MedarServicesSection";
import MedarTestimonialsSection from "../components/sections/MedarTestimonialsSection";
import MedarContactSection from "../components/sections/MedarContactSection";
import "../styles/medar.css";

const FONT_LINK_ID = "medar-vazirmatn-font";

/**
 * "مدار" (Medar) — single-page Persian/RTL astrology site, ported from a
 * static HTML/CSS/JS build into this project's React + TypeScript stack.
 *
 * Mirrors the pattern used by HomePage.tsx: a background component, a route
 * body class, and a flat list of section components.
 */
export default function MedarPage() {
  useEffect(() => {
    document.body.classList.add("route-medar");

    // Load the Vazirmatn font (same as the original site's <link> tags),
    // only once, so it doesn't matter how many times this page mounts.
    if (!document.getElementById(FONT_LINK_ID)) {
      const preconnect1 = document.createElement("link");
      preconnect1.rel = "preconnect";
      preconnect1.href = "https://fonts.googleapis.com";

      const preconnect2 = document.createElement("link");
      preconnect2.rel = "preconnect";
      preconnect2.href = "https://fonts.gstatic.com";
      preconnect2.crossOrigin = "anonymous";

      const fontLink = document.createElement("link");
      fontLink.id = FONT_LINK_ID;
      fontLink.rel = "stylesheet";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap";

      document.head.append(preconnect1, preconnect2, fontLink);
    }

    return () => document.body.classList.remove("route-medar");
  }, []);

  return (
    <div className="medar-page" dir="rtl" lang="fa">
      <MedarBackground />
      <OrbitRail />
      <MedarHeader />

      <main>
        <MedarHeroSection />
        <MedarMethodSection />
        <MedarChartSection />
        <MedarGallerySection />
        <MedarServicesSection />
        <MedarTestimonialsSection />
        <MedarContactSection />
      </main>

      <MedarFooter />
    </div>
  );
}

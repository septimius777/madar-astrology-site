import { useEffect, useState } from "react";

/**
 * Watches a list of section elements (by data-section-index attribute)
 * and returns the index of the section most visible in the viewport.
 */
export function useActiveSection(sectionCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-index]")
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = Number(entry.target.getAttribute("data-section-index"));
            setActiveIndex(idx);
          }
        });
      },
      { threshold: [0.5, 0.6, 0.7] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionCount]);

  return activeIndex;
}

/**
 * Single source of truth for primary navigation.
 * MedarHeader, MedarNavPanel, and MedarFooter all import this —
 * add or reorder a link once, and it updates everywhere.
 */
export const NAV_LINKS = [
  { href: "#method", label: "روش" },
  { href: "#chart", label: "زایچه‌ی تو" },
  { href: "#gallery", label: "بروج" },
  { href: "#services", label: "خدمات" },
  { href: "#testimonials", label: "نظرات" },
  { href: "#contact", label: "تماس" },
];

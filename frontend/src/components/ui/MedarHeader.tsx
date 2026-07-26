import { useState } from "react";

const NAV_LINKS = [
  { href: "#method", label: "روش" },
  { href: "#chart", label: "زایچه‌ی تو" },
  { href: "#gallery", label: "بروج" },
  { href: "#services", label: "خدمات" },
  { href: "#testimonials", label: "نظرات" },
  { href: "#contact", label: "تماس" },
];

/** Ports .site-header / .nav-toggle / .site-nav from the original site. */
export default function MedarHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="medar-header">
      <a href="#hero" className="medar-brand__mark" onClick={() => setOpen(false)}>
        مدار
      </a>
      <button
        className="medar-nav-toggle"
        aria-label="باز کردن فهرست"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`medar-nav${open ? " medar-nav-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export { NAV_LINKS };

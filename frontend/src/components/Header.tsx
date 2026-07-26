import { useEffect, useState } from "react";

const links = [
  { href: "#chart", label: "Chart" },
  { href: "#services", label: "Sessions" },
  { href: "#contact", label: "Contact" },
];

/**
 * Fixed, minimal header. Gains a subtle glass backdrop once the page has
 * scrolled past the hero, so it never competes with the sunrise/sun.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 sm:px-10 ${
        scrolled
          ? "border-b border-white/10 bg-night-navy/50 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#top"
        className="font-mono text-xs uppercase tracking-widest2 text-dawn-white/80"
      >
        Meridian
      </a>
      <nav className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/50 transition-colors hover:text-gold"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

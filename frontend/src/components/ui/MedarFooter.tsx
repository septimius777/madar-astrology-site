import { NAV_LINKS } from "./MedarHeader";

/** Ports the site footer. */
export default function MedarFooter() {
  return (
    <footer className="medar-footer">
      <div className="medar-container medar-footer__grid">
        <span className="medar-brand__mark">مدار</span>
        <nav className="medar-footer__nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="medar-footer__meta">
          مدار — یک ابزار برای فهمیدن، نه یک وعده برای آینده.
        </p>
      </div>
    </footer>
  );
}

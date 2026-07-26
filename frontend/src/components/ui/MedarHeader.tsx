import { useState } from "react";
import MedarNavPanel from "./MedarNavPanel";
import { NAV_LINKS } from "./medar-nav-links";

/**
 * Site header: brand mark + the toggle that opens the slide-in nav panel.
 * The panel itself lives in MedarNavPanel.jsx — this file only owns the
 * open/closed state and the trigger button.
 */
export default function MedarHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="medar-header">
        <button
          type="button"
          className={`medar-nav-toggle${open ? " medar-is-open" : ""}`}
          aria-label={open ? "بستن فهرست" : "باز کردن فهرست"}
          aria-expanded={open}
          aria-controls="medar-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>


        <a href="#hero" className="medar-brand__mark" onClick={() => setOpen(false)}>
          مدار
        </a>

        
      </header>

      <MedarNavPanel
        id="medar-nav-panel"
        open={open}
        onClose={() => setOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}

export { NAV_LINKS };
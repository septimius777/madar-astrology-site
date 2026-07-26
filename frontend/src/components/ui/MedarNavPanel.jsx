import { useEffect, useRef } from "react";

/**
 * Slide-in navigation drawer — docks to the right edge and slides
 * right → left into view. Owns its own behaviour (escape key, backdrop
 * click, scroll lock, focus handling) so MedarHeader — or anything else
 * later — can mount it and just flip `open`.
 */
export default function MedarNavPanel({
  id = "medar-nav-panel",
  open,
  onClose,
  links,
}) {
  const firstLinkRef = useRef(null);

  // Lock page scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Escape to close, focus the first link on open.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`medar-nav-backdrop${open ? " medar-is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id={id}
        className={`medar-nav-panel${open ? " medar-is-open" : ""}`}
        aria-hidden={!open}
        aria-label="فهرست ناوبری"
      >
        <div className="medar-nav-panel__head">
          <span className="medar-nav-panel__orbit" aria-hidden="true">
            <span className="medar-nav-panel__orbit-ring" />
            <span className="medar-nav-panel__orbit-dot" />
          </span>
          <button
            type="button"
            className="medar-nav-panel__close"
            onClick={onClose}
            aria-label="بستن فهرست"
            tabIndex={open ? 0 : -1}
          >
            <span />
            <span />
          </button>
        </div>

        <nav className="medar-nav-panel__nav">
          <ul>
            {links.map((link, i) => (
              <li key={link.href} style={{ "--medar-i": i }}>
                <a
                  href={link.href}
                  ref={i === 0 ? firstLinkRef : null}
                  tabIndex={open ? 0 : -1}
                  onClick={onClose}
                >
                  <span className="medar-nav-panel__dot" aria-hidden="true" />
                  <span className="medar-nav-panel__label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="medar-nav-panel__foot">
          مدار — یک ابزار برای فهمیدن، نه یک وعده برای آینده.
        </p>
      </aside>
    </>
  );
}

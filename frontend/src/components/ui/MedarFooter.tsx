import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./MedarHeader";
import "./MedarFooter.css";

function useDockVisibility() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastY.current = window.scrollY;

    const NEAR_TOP = 24;
    const THRESHOLD = 6;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (y <= NEAR_TOP) {
          setVisible(true);
        } else if (delta > THRESHOLD) {
          setVisible(false);
        } else if (delta < -THRESHOLD) {
          setVisible(true);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

const MOBILE_LABELS = ["آغاز", "افق", "جریان", "روایت"];

export default function MedarFooter() {
  const visible = useDockVisibility();
  const isMobile = useIsMobile();

  const desktopLinks = NAV_LINKS.slice(0, 6);
  const mobileLinks = NAV_LINKS.slice(0, 4).map((link, index) => ({
    ...link,
    label: MOBILE_LABELS[index] ?? link.label,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.footer
          className="medar-footer"
          dir="rtl"
          initial={{ y: 90, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 90, opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.7 }}
        >
          <div className="medar-footer__frame">
            <div className="medar-footer__dock">
              {!isMobile && (
                <>
                  <span className="medar-footer__bump" aria-hidden="true">
                    <span className="medar-footer__bump-ring" />
                    <span className="medar-footer__bump-core" />
                  </span>

                  <div className="medar-footer__stars" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="medar-footer__brand">
                    <span className="medar-footer__mark">مدار</span>
                  </div>

                  <nav className="medar-footer__nav medar-footer__nav--desktop">
                    {desktopLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="medar-footer__link"
                      >
                        <span className="medar-footer__link-dot" />
                        <span className="medar-footer__link-label">{link.label}</span>
                      </a>
                    ))}
                  </nav>

                  <p className="medar-footer__meta">
                    یک ابزار برای فهمیدن، نه یک وعده برای آینده.
                  </p>
                </>
              )}

              {isMobile && (
                <>
                  <div className="medar-footer__stars medar-footer__stars--mobile" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <nav className="medar-footer__mobile-nav" dir="ltr">
                    <a
                      href={mobileLinks[0]?.href}
                      className="medar-footer__mobile-cell medar-footer__link medar-footer__link--mobile"
                    >
                      <span className="medar-footer__link-dot" />
                      <span className="medar-footer__link-label">{mobileLinks[0]?.label}</span>
                    </a>

                    <a
                      href={mobileLinks[1]?.href}
                      className="medar-footer__mobile-cell medar-footer__link medar-footer__link--mobile"
                    >
                      <span className="medar-footer__link-dot" />
                      <span className="medar-footer__link-label">{mobileLinks[1]?.label}</span>
                    </a>

                    <div className="medar-footer__mobile-center" aria-hidden="true">
                      <span className="medar-footer__bump">
                        <span className="medar-footer__bump-ring" />
                        <span className="medar-footer__bump-core" />
                      </span>
                    </div>

                    <a
                      href={mobileLinks[2]?.href}
                      className="medar-footer__mobile-cell medar-footer__link medar-footer__link--mobile"
                    >
                      <span className="medar-footer__link-dot" />
                      <span className="medar-footer__link-label">{mobileLinks[2]?.label}</span>
                    </a>

                    <a
                      href={mobileLinks[3]?.href}
                      className="medar-footer__mobile-cell medar-footer__link medar-footer__link--mobile"
                    >
                      <span className="medar-footer__link-dot" />
                      <span className="medar-footer__link-label">{mobileLinks[3]?.label}</span>
                    </a>
                  </nav>
                </>
              )}
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}
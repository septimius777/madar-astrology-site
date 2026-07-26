import { useEffect, useRef, useState, type ElementType, type PropsWithChildren } from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Ports the original site's `.reveal` / `.is-visible` scroll-reveal pattern.
 * Adds "medar-reveal" on mount and "medar-visible" once the element scrolls
 * into view (matching css transition defined in styles/medar.css).
 * Respects prefers-reduced-motion, same as the original main.js.
 *
 * Any extra props (onSubmit, noValidate, aria-*, id, ...) are forwarded to
 * the rendered tag — use this instead of nesting another element inside,
 * especially for `as="form"`.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: PropsWithChildren<RevealProps>) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`medar-reveal${visible ? " medar-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

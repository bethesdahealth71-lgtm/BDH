"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * "group"  — stagger the direct children (section content, card grids)
   * "single" — move the element itself as one unit
   */
  mode?: "group" | "single";
  /** Seconds of delay before the tween starts. */
  delay?: number;
  /** Per-child stagger. Kept ≤0.08 — beyond that the last items feel laggy. */
  stagger?: number;
  style?: React.CSSProperties;
};

/**
 * Standard-tier scroll reveal.
 *
 * ── Why `gsap.from()` and not a CSS `opacity: 0` default ──────────────────────
 * This is the load-bearing decision in this file. The elements render VISIBLE in
 * the HTML; GSAP animates them *from* a hidden state after hydration. So:
 *   · crawlers and no-JS users see fully rendered content (this site's whole
 *     point is local SEO — hiding below-fold copy behind JS would be self-harm)
 *   · if GSAP fails to load, nothing is invisible; the page just doesn't animate
 * Setting `opacity: 0` in CSS and revealing with JS would invert that risk.
 *
 * Reduced motion is honoured via gsap.matchMedia — under `prefers-reduced-motion`
 * no tween is created at all, so content simply is where it belongs.
 */
export function Reveal({
  children,
  as: As = "div",
  className,
  mode = "group",
  delay = 0,
  stagger = 0.07,
  style,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = scope.current;
        if (!el) return;

        const targets = mode === "group" ? Array.from(el.children) : el;
        if (mode === "group" && (targets as Element[]).length === 0) return;

        gsap.from(targets, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          delay,
          ease: "power2.out",
          stagger: mode === "group" ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            // play-none-none-reverse would re-hide on scroll-up; for reference
            // content that reads as a flicker, so we play once and leave it.
            toggleActions: "play none none none",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <As ref={scope} className={className} style={style}>
      {children}
    </As>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Hero entrance — one orchestrated timeline on load, replacing the CSS
 * `.rise` animation. Split Studio's reveal is "opposite halves cross-fade in,
 * slightly staggered", so the copy side leads and the triage panel follows.
 *
 * Targets `[data-hero-item]` rather than nth-child so the order survives
 * refactors, and uses `gsap.from()` so the hero is visible without JS.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = scope.current?.querySelectorAll("[data-hero-item]");
        if (!items?.length) return;

        gsap.from(items, {
          opacity: 0,
          y: 18,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.09,
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="diptych">
      {children}
    </div>
  );
}

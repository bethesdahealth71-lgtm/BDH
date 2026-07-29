"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Hero entrance — one orchestrated timeline on load.
 *
 * Split Studio's reveal is "opposite halves cross-fade in, slightly staggered",
 * so the copy leads, the panel follows, and the photograph settles from a
 * gentle scale. The image uses scale rather than translate so nothing can
 * shift layout (no CLS) while it animates.
 *
 * Everything is `gsap.from()`, so the hero is fully visible without JS.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;

        const items = root.querySelectorAll("[data-hero-item]");
        const media = root.querySelector("[data-hero-media]");
        const frame = root.querySelector("[data-hero-frame]");

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (items.length) {
          tl.from(items, { opacity: 0, y: 20, duration: 0.7, stagger: 0.09 }, 0);
        }
        if (media) {
          tl.from(media, { opacity: 0, scale: 1.06, duration: 1.1 }, 0.05);
        }
        if (frame) {
          // The accent rule sweeps out from the pivot — a small nod to the
          // range-of-motion mark, not a decorative flourish for its own sake.
          tl.from(frame, { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, 0.25);
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}

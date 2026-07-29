"use client";

import { useEffect, useRef, useState } from "react";
import { booking, site } from "@/content/site";

/**
 * JaneApp booking, embedded rather than linked away to.
 *
 * The iframe is mounted only once it is close to the viewport, so a heavy
 * third-party app never competes with LCP. A real fallback link is always
 * rendered — if Jane blocks framing on this origin, the patient still books.
 */
export function BookingEmbed({
  janeDisciplineId,
  title = "Book an appointment",
}: {
  janeDisciplineId?: number;
  title?: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [slow, setSlow] = useState(false);
  const src = booking.forDiscipline(janeDisciplineId);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // If the frame hasn't reported in, surface the direct link rather than
  // leaving someone staring at a blank box.
  useEffect(() => {
    if (!mount) return;
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, [mount]);

  return (
    <div ref={holder} className="booking-embed">
      {mount ? (
        <iframe
          src={src}
          title={title}
          className="booking-frame"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="booking-fallback">
          <p style={{ margin: 0, color: "var(--color-ink-3)" }}>Loading the booking calendar…</p>
        </div>
      )}

      <p className="field-note" style={{ marginTop: "var(--space-sm)" }}>
        {slow ? (
          <>
            Calendar slow to load?{" "}
            <a href={src} className="inline-link" target="_blank" rel="noopener">
              Open the booking page directly
            </a>{" "}
            or call{" "}
            <a href={site.phoneHref} className="inline-link">
              {site.phone}
            </a>
            .
          </>
        ) : (
          <>
            Booking is handled by Jane, our scheduling system. Prefer the phone?{" "}
            <a href={site.phoneHref} className="inline-link">
              {site.phone}
            </a>
          </>
        )}
      </p>
    </div>
  );
}

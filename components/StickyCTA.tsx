import Link from "next/link";
import { site, booking } from "@/content/site";

/**
 * C4 · Sticky bottom bar — mobile only, always visible.
 * Three targets, one thumb: call, book, directions. Each ≥44px.
 */
export function StickyCTA() {
  return (
    <div className="sticky-cta" role="group" aria-label="Quick actions">
      <a href={site.phoneHref}>
        <span className="sticky-cta-glyph" aria-hidden="true">
          ☏
        </span>
        Call
      </a>
      <a href={booking.base} target="_blank" rel="noopener" data-primary="true">
        <span className="sticky-cta-glyph" aria-hidden="true">
          ⌁
        </span>
        Book
      </a>
      <Link href="/locations">
        <span className="sticky-cta-glyph" aria-hidden="true">
          ⌖
        </span>
        Find us
      </Link>
    </div>
  );
}

/**
 * Tier-B hand-built SVG mark — the only illustrative element on the site.
 *
 * It draws a range-of-motion arc: a fixed pivot, a limb at rest, and the same
 * limb swept to a fuller range. That is literally what the clinic sells, and it
 * reads as a mark rather than a picture, so it holds at 28px in the nav.
 */
export function Wordmark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="wordmark"
    >
      {/* the sweep — restored range */}
      <path
        d="M7 25 A 18 18 0 0 1 25 7"
        stroke="var(--color-accent-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 4.4"
      />
      {/* limb at rest */}
      <path
        d="M7 25 H 24"
        stroke="var(--color-ink-3)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* limb, moved */}
      <path
        d="M7 25 L 22.5 12.5"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* the pivot */}
      <circle cx="7" cy="25" r="2.6" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * Shimmer skeletons.
 *
 * Used for route-level loading.tsx and for the booking calendar, which is a
 * third-party iframe and genuinely slow. A skeleton beats a spinner whenever
 * the final layout is known — it reserves the space, so nothing shifts when
 * the real content lands.
 *
 * The shimmer is pure CSS (a moving background-position), so it costs nothing
 * and it stops entirely under prefers-reduced-motion.
 */
export function Skeleton({
  w = "100%",
  h = "1rem",
  radius = "var(--radius-sm)",
  className,
}: {
  w?: string;
  h?: string;
  radius?: string;
  className?: string;
}) {
  return (
    <span
      className={`skeleton ${className ?? ""}`}
      style={{ width: w, height: h, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

/** A page-shaped placeholder: heading, lede, then a body block. */
export function PageSkeleton() {
  return (
    <div className="shell band" role="status" aria-label="Loading page">
      <span className="sr-only">Loading…</span>
      <div className="diptych">
        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          <Skeleton w="70%" h="3.25rem" />
          <Skeleton w="45%" h="3.25rem" />
          <Skeleton w="100%" h="1.1rem" />
          <Skeleton w="94%" h="1.1rem" />
          <Skeleton w="78%" h="1.1rem" />
          <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-md)" }}>
            <Skeleton w="9rem" h="2.875rem" />
            <Skeleton w="7rem" h="2.875rem" />
          </div>
        </div>
        <Skeleton w="100%" h="20rem" radius="var(--radius-lg)" />
      </div>
    </div>
  );
}

/** Matches the booking calendar's footprint so the page does not jump. */
export function BookingSkeleton() {
  return (
    <div className="booking-skeleton" role="status" aria-label="Loading the booking calendar">
      <span className="sr-only">Loading the booking calendar…</span>
      <div style={{ display: "grid", gap: "var(--space-md)" }}>
        <Skeleton w="40%" h="1.5rem" />
        <Skeleton w="100%" h="3rem" />
        <div className="booking-skeleton-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} h="3.25rem" />
          ))}
        </div>
      </div>
    </div>
  );
}

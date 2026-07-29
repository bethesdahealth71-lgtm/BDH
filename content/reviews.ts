export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  /** ISO date */
  date: string;
  source: "Google" | "Direct";
  /** Written consent on file to publish this. Required before it renders. */
  consented: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * INTENTIONALLY EMPTY.
 *
 * Patient testimonials are not written here. Fabricated reviews are deceptive
 * to patients, and in a health context they are also a regulatory risk —
 * Alberta's health colleges restrict the use of patient testimonials in
 * advertising, and Google's review policies prohibit fabricated content.
 *
 * Populate this from one of:
 *   1. The Google Business Profile API (recommended — reviews stay current and
 *      verifiable, and AggregateRating schema is then legitimate).
 *   2. Reviews collected directly with written patient consent on file.
 *
 * Until then `<ReviewsSection>` renders an honest empty state instead of
 * pretending. The AggregateRating JSON-LD is only emitted when real reviews
 * exist — emitting it with invented numbers is structured-data spam and can
 * earn a manual action from Google.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const reviews: Review[] = [];

export const publishableReviews = reviews.filter((r) => r.consented);

export const aggregateRating =
  publishableReviews.length > 0
    ? {
        ratingValue:
          Math.round(
            (publishableReviews.reduce((sum, r) => sum + r.rating, 0) /
              publishableReviews.length) *
              10,
          ) / 10,
        reviewCount: publishableReviews.length,
      }
    : null;

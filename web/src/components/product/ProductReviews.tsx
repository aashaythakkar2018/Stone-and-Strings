/**
 * pdp-reviews — Judge.me (or chosen app) in production. No reviews exist yet, so nothing is
 * claimed: no stars, no aggregateRating schema (handoff §2, honesty principle).
 */
export function ProductReviews({ productTitle }: { productTitle: string }) {
  return (
    <section className="sec sec--tight" data-ss-section="pdp-reviews" aria-labelledby="h-reviews">
      <div className="wrap">
        <div className="sec-head sec-head--sm"><p className="eyebrow">In their words</p><h2 id="h-reviews">Reviews</h2></div>
        <div className="reviews-empty">
          <p>No reviews yet for {productTitle} — every order invites one, and this is where they'll live.</p>
        </div>
      </div>
    </section>
  );
}

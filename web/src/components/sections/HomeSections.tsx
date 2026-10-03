import { Link } from 'react-router-dom';
import { pledges, testimonials, trustPoints } from '@/data/site';
import { stones } from '@/data/stones';
import { stoneCollections } from '@/data/collections';
import { getFeaturedProducts } from '@/data/catalog';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SmartImage } from '@/components/ui/SmartImage';
import './sections.css';

/* home-pledge — the differentiator, stated */
export function Pledge() {
  return (
    <section className="pledge" data-ss-section="home-pledge" aria-labelledby="h-pledge">
      <div className="wrap pledge__wrap">
        <h2 id="h-pledge" className="pledge__h">Our promise on every piece</h2>
        <ul className="pledge__grid" role="list">
          {pledges.map((p) => (
            <li className="pledge__item" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="pledge__note">
          Most brands won't tell you when a stone is dyed. <b>We always will.</b>{' '}
          <Link to="/pages/our-stones">See how we disclose →</Link>
        </p>
      </div>
    </section>
  );
}

/* home-featured */
export function FeaturedProducts() {
  return (
    <section className="sec" data-ss-section="home-featured" aria-labelledby="h-featured">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">New &amp; loved</p>
          <h2 id="h-featured">Founder favourites</h2>
        </div>
        <ProductGrid products={getFeaturedProducts(6)} />
        <div className="center" style={{ marginTop: 48 }}>
          <Button to="/collections/all" variant="ghost">View all bracelets</Button>
        </div>
      </div>
    </section>
  );
}

/* home-founder */
export function BrandStory() {
  return (
    <section className="vidhi" data-ss-section="home-founder" aria-labelledby="h-vidhi">
      {/* PRODUCTION IMG: portrait of Vidhi stringing a bracelet at her studio bench */}
      <SmartImage
        className="vidhi__visual"
        image={{ tone: 'warm', alt: 'Vidhi, founder of Stone & Strings, stringing a bracelet at her studio bench', caption: 'Vidhi at the bench' }}
      />
      <div className="vidhi__copy">
        <p className="eyebrow">The studio</p>
        <h2 id="h-vidhi">Meet Vidhi</h2>
        <p>
          Trained as a gemologist under a master with thirty-five years at the bench, Vidhi started Stone &amp; Strings
          with a single bracelet made for someone she loved. Every piece since carries the same idea — jewellery that
          means something, made honestly, by hand.
        </p>
        <p>
          She still strings each order herself, and still tells you exactly what's inside it. If you want something
          entirely your own, that starts at the <Link className="inline-link" to="/pages/custom">Custom Studio</Link>.
        </p>
        <p className="vidhi__sig">Vidhi</p>
        <div style={{ marginTop: 22 }}>
          <Button to="/pages/about" variant="ghost">Read Vidhi's story</Button>
        </div>
      </div>
    </section>
  );
}

/* home-stones-teaser */
export function StonesTeaser() {
  const featured = stoneCollections.map((c) => ({ c, s: stones.find((x) => x.handle === c.stone)! }));
  return (
    <section className="stones-teaser" data-ss-section="home-stones-teaser" aria-labelledby="h-stones">
      <div className="wrap stones-teaser__wrap">
        <div className="sec-head">
          <p className="eyebrow">Know before you wear</p>
          <h2 id="h-stones">Explore the stones</h2>
          <p>Where each stone comes from, what it has meant across cultures, and how we use it — no health claims, just the honest story.</p>
        </div>
        <ul className="stones-row" role="list">
          {featured.map(({ c, s }) => (
            <li key={c.handle}>
              <Link className="stone-chip" to={`/collections/${c.handle}`}>
                <span className="stone-chip__dot" style={{ background: s.gradient }} aria-hidden="true" />
                <h3>{s.name}</h3>
                <span>{s.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="center" style={{ marginTop: 44 }}>
          <Link className="textlink" to="/pages/our-stones">Explore every stone</Link>
        </div>
      </div>
    </section>
  );
}

/* home-custom — the strategic front door */
export function PromotionalBanner() {
  return (
    <section className="customstrip" data-ss-section="home-custom" aria-labelledby="h-custom">
      <div className="customstrip__bg ph ph--olive ph--grain" aria-hidden="true" />
      <div className="customstrip__in">
        <p className="eyebrow" style={{ color: 'var(--sand)' }}>The custom studio</p>
        <h2 id="h-custom">Made for the story only you have</h2>
        <p>
          An initial, a word you live by, a family's birthstones. Tell Vidhi the meaning — she'll design the piece
          around it. Custom pieces start at $125.
        </p>
        <Button to="/pages/custom" variant="cream">Start a custom piece</Button>
      </div>
    </section>
  );
}

/* home-reviews — Judge.me in production; empty-state slot until real reviews exist */
export function Testimonials() {
  return (
    <section className="sec" data-ss-section="home-reviews" aria-labelledby="h-kind">
      <div className="wrap">
        <div className="sec-head"><p className="eyebrow">In their words</p><h2 id="h-kind">Kind words</h2></div>
        <div className="kw">
          {testimonials.map((t) => (
            <figure className="kw-card" key={t.who}>
              <div className="kw-card__stars" aria-hidden="true">★★★★★</div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className="kw-card__who">— {t.who}</figcaption>
            </figure>
          ))}
          <div className="kw-card kw-card--empty">
            <p>Your words, soon.<br />Every order invites a review —<br />this is where they'll live.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* collection-trust / generic trust strip */
export function TrustStrip() {
  return (
    <div className="trust-strip" data-ss-section="collection-trust">
      <ul className="wrap trust-items trust-strip__in" role="list">
        {trustPoints.map((t) => (
          <li className="t-item" key={t}><span className="dot" aria-hidden="true" />{t}</li>
        ))}
      </ul>
    </div>
  );
}

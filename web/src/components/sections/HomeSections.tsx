import { Link } from 'react-router-dom';
import { featuredReview, pledges, trustPoints } from '@/data/site';
import { stoneByHandle } from '@/data/stones';
import { allProducts, getFeaturedProducts } from '@/data/catalog';
import { stacks, stackProducts } from '@/data/stacks';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { primaryImage } from '@/utils/imageUtils';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SmartImage } from '@/components/ui/SmartImage';
import { photo } from '@/data/photos';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Motion';
import './sections.css';

/** Default size for one-click adds (Quick add, Add stack): Small, the most common fit. */
export const QUICK_ADD_INDEX = 1;

/* home-pledge (Homepage V2 #6 + #7) — four promises, then the disclosure line */
export function Pledge() {
  return (
    <section className="pledge" data-ss-section="home-pledge" aria-labelledby="h-pledge">
      <div className="wrap pledge__wrap">
        <h2 id="h-pledge" className="pledge__h">Our promise on every piece</h2>
        <Stagger as="ul" className="pledge__grid" role="list">
          {pledges.map((p) => (
            <StaggerItem className="pledge__item" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="pledge__note">
          Other shops hide treatments in the fine print. <b>We put them up front.</b>{' '}
          <Link to="/pages/disclosure">See our Disclosure Standard →</Link>
        </p>
      </div>
    </section>
  );
}

/* home-featured (Homepage V2 #8 — richer cards live in ProductCard) */
export function FeaturedProducts() {
  return (
    <section className="sec sec--tight" data-ss-section="home-featured" aria-labelledby="h-featured">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">New &amp; loved</p>
          <h2 id="h-featured">Founder favorites</h2>
        </Reveal>
        <ProductGrid products={getFeaturedProducts(6)} />
        <div className="center" style={{ marginTop: 48 }}>
          <Button to="/collections/all" variant="ghost">View all bracelets</Button>
        </div>
      </div>
    </section>
  );
}

/* home-stack (Homepage V2 #9) — styled pairs, one click to add both */
export function BuildYourStack() {
  const { addItem } = useCart();
  return (
    <section id="stack" className="sec sec--tight stack-sec" data-ss-section="home-stack" aria-labelledby="h-stack">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Worn together</p>
          <h2 id="h-stack">Build your stack</h2>
          <p>Two pieces, styled by Vidhi. Every stack ships free.</p>
        </Reveal>
        <Stagger as="ul" className="stacks" role="list">
          {stacks.map((s) => {
            const items = stackProducts(s);
            if (items.length < 2) return null;
            const total = items.reduce((t, p) => t + p.price, 0);
            const names = items.map((p) => p.title).join(' + ');
            return (
              <StaggerItem key={s.id} className="stack">
                <div className="stack__pair">
                  {items.map((p) => (
                    <Link key={p.id} to={`/products/${p.handle}`} className="stack__img" aria-label={p.title}>
                      <SmartImage image={primaryImage(p)} showCaption={false} />
                      <span className="stack__img-name" aria-hidden="true">{p.title}</span>
                    </Link>
                  ))}
                </div>
                <p className="stack__mood">{s.mood}</p>
                <h3 className="stack__title">{s.title}</h3>
                <p className="stack__names">{names}</p>
                <div className="stack__foot">
                  <p className="stack__price">
                    {formatCurrency(total)} <span>· Free shipping</span>
                  </p>
                  <Button
                    variant="ink"
                    onClick={() => items.forEach((p) => addItem(p.variants[QUICK_ADD_INDEX]?.id ?? p.variants[0].id, 1))}
                    aria-label={`Add the ${s.title} stack: ${names}, size Small, ${formatCurrency(total)}`}
                  >
                    Add stack
                  </Button>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* home-founder (Homepage V2 #10) — process proof instead of an empty reviews slot */
export function MeetVidhi() {
  return (
    <section id="vidhi" className="sec sec--tight" data-ss-section="home-founder" aria-labelledby="h-vidhi">
      <div className="wrap vidhi2">
        {/* Studio bench photo for now; V2 calls for a 15-second muted video loop of Vidhi stringing a bracelet. */}
        <SmartImage
          className="vidhi2__media"
          image={{
            src: photo('editorial/bench-tools-beads'),
            tone: 'dusk',
            alt: 'The studio bench: a wooden bead tray with strands of sodalite, agate, hematite and rose quartz beads, a spool of thread, pliers and scissors on a white fleece',
            caption: 'Video loop · Vidhi at the bench (15 sec)',
          }}
        />
        <Reveal className="vidhi2__copy">
          <p className="eyebrow">The studio</p>
          <h2 id="h-vidhi">Meet Vidhi</h2>
          <p className="vidhi2__lede">
            Trained as a gemologist under [mentor name] at [studio / institute], with thirty-five years at the bench between
            them. Vidhi started Stone &amp; Strings with one bracelet made for someone she loved. She still strings every
            order herself.
          </p>
          <ul className="proof" role="list">
            <li className="proof__card">
              <SmartImage className="proof__img" image={{ tone: 'sand', alt: 'The disclosure card included in every box', caption: 'Photo · disclosure card in the box' }} />
              <p>The card in every box: each stone, natural or treated.</p>
            </li>
            <li className="proof__card">
              <SmartImage className="proof__img" image={{ tone: 'warm', alt: 'A bead being checked under a jeweler’s loupe', caption: 'Photo · loupe check' }} />
              <p>Each bead checked under a loupe before stringing.</p>
            </li>
          </ul>
          <figure className="vidhi2__review">
            <blockquote>“{featuredReview.quote}”</blockquote>
            <figcaption>{featuredReview.who}</figcaption>
          </figure>
          <div><Button to="/pages/about" variant="ghost">Read Vidhi's story</Button></div>
        </Reveal>
      </div>
    </section>
  );
}

/* home-stones-teaser (Homepage V2 #11) — only stones we stock, each with treatment + design count */
const TEASER_STONES = ['labradorite', 'amethyst', 'sunstone', 'apatite', 'pink-opal', 'black-onyx'];

export function StonesTeaser() {
  const rows = TEASER_STONES.map((handle) => {
    const stone = stoneByHandle.get(handle)!;
    const pieces = allProducts.filter((p) => p.stones.includes(handle) && !p.pricePending);
    const dyed = pieces.some((p) => p.treatment === 'dyed' && p.stones[0] === handle);
    const n = pieces.length;
    return { stone, label: `${dyed ? 'Dyed' : 'Natural'} · ${n} ${n === 1 ? 'design' : 'designs'}` };
  });
  return (
    <section id="stones" className="sec sec--tight sec--white" data-ss-section="home-stones-teaser" aria-labelledby="h-stones">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Know before you wear</p>
          <h2 id="h-stones">Explore the stones</h2>
          <p>Where each stone comes from, what it has meant across cultures, and how we use it. No health claims, just the honest story.</p>
        </Reveal>
        <Stagger as="ul" className="stones6" role="list" gap={0.06}>
          {rows.map(({ stone, label }) => (
            <StaggerItem key={stone.handle}>
              <Link className="stone6" to={`/collections/${stone.handle}`}>
                <span className="stone6__dot" style={{ background: stone.gradient }} aria-hidden="true" />
                <h3>{stone.name}</h3>
                <span className="stone6__meta">{label}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="center" style={{ marginTop: 40 }}>
          <Button to="/pages/our-stones" variant="ghost">Explore every stone</Button>
        </div>
      </div>
    </section>
  );
}

/* home-studio-band — full-bleed studio photo; the cream on its right carries one line of copy */
export function StudioBand() {
  return (
    <section className="band" data-ss-section="home-studio-band" aria-label="In the studio">
      <img
        className="band__img"
        src={photo('editorial/banner-studio-wide')}
        alt="Handmade bracelets in pearl, turquoise, amethyst and apatite styled on white plinths in the Stone & Strings studio"
        width={2560}
        height={1080}
        loading="lazy"
        decoding="async"
      />
      <Reveal className="band__copy">
        <p className="eyebrow">Georgia, USA</p>
        <h2>Strung one at a time.</h2>
        <Button to="/collections/all" variant="ghost">Shop all bracelets</Button>
      </Reveal>
    </section>
  );
}

/* home-custom — the strategic front door. Split layout after 21st.dev "Split Content Section" (content-06):
   serif headline + copy + CTA in one column, framed photo in the other. */
export function PromotionalBanner() {
  return (
    <section id="custom" className="custom" data-ss-section="home-custom" aria-labelledby="h-custom">
      <div className="wrap">
        <div className="custom__card">
          <Reveal className="custom__copy">
            <p className="eyebrow">The Custom Studio</p>
            <h2 id="h-custom">Made for the story only you have</h2>
            <p className="custom__body">
              An initial, a word you live by, a family's birthstones. Tell Vidhi the meaning and she'll design the piece around
              it. Custom pieces start at $125.
            </p>
            <div><Button to="/pages/custom" variant="cream">Start a custom piece</Button></div>
          </Reveal>
          <div className="custom__media">
            <img
              src={photo('editorial/banner-hanging-wide')}
              alt="Pearl, tiger's-eye and aventurine bracelets hanging from a chrome rod in the studio"
              width={2560}
              height={1197}
              loading="lazy"
              decoding="async"
            />
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

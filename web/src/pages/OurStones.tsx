import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { stones } from '@/data/stones';
import { allProducts } from '@/data/catalog';
import { stoneCollections } from '@/data/collections';
import { Breadcrumbs, breadcrumbJsonLd } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Primitives';
import './pages.css';

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Our Stones', to: '/pages/our-stones' }];

export default function OurStones() {
  useSeo({
    title: 'Our Stones — Meaning, Origin & Honest Treatment | Stone & Strings',
    description:
      'Every gemstone we use, with its cultural story and whether it is natural or dyed — disclosed in plain words. Explore labradorite, amethyst, sunstone, pearl and more.',
    canonicalPath: '/pages/our-stones',
    jsonLd: [breadcrumbJsonLd(crumbs)],
  });

  return (
    <>
      <Breadcrumbs items={[crumbs[0], { label: 'Our Stones' }]} />
      <div className="wrap page-head page-head--wide">
        <p className="eyebrow">Know before you wear</p>
        <h1>Our stones</h1>
        <p className="page-head__lede">
          Where each stone comes from, what it has meant across cultures, and how we use it — no health claims, just the
          honest story. When a stone is dyed, plated or coated, we say so on the product page, every time.
        </p>
        <div className="disclose-key">
          <span><Badge tone="natural" floating={false}>Natural</Badge> Untreated, or only cut and polished</span>
          <span><Badge tone="disclosed" floating={false}>Dyed · disclosed</Badge> Colour enhanced — always labelled</span>
        </div>
      </div>

      <div className="wrap stones-hub">
        {stones.map((s) => {
          const pieces = allProducts.filter((p) => p.stones.includes(s.handle) && !p.pricePending);
          const col = stoneCollections.find((c) => c.stone === s.handle);
          return (
            <article className="stone-entry" id={s.handle} key={s.handle} aria-labelledby={`h-${s.handle}`}>
              <span className="stone-entry__dot" style={{ background: s.gradient }} aria-hidden="true" />
              <div className="stone-entry__body">
                <p className="eyebrow">{s.tagline}</p>
                <h2 id={`h-${s.handle}`}>{s.name}</h2>
                <p>{s.story}</p>
                {s.care && <p className="stone-entry__care"><b>Care:</b> {s.care}</p>}
                <div className="stone-entry__links">
                  {pieces.map((p) => <Link key={p.id} to={`/products/${p.handle}`} className="chip">{p.title}</Link>)}
                  {col && <Link to={`/collections/${col.handle}`} className="textlink">Shop {s.name}</Link>}
                  {!pieces.length && !col && <span className="muted stone-entry__none">Available through the <Link className="inline-link" to="/pages/custom">Custom Studio</Link></span>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

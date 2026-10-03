import { useSeo } from '@/hooks/useSeo';
import { getFeaturedProducts } from '@/data/catalog';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/brand/Logo';
import { ProductGrid } from '@/components/product/ProductGrid';
import './pages.css';

const COPY = {
  page: { eyebrow: '404', title: 'This thread came loose', body: "The page you're looking for isn't here — it may have moved, or the link may be mistyped." },
  product: { eyebrow: 'Piece not found', title: "We couldn't find that piece", body: "It may have been renamed or retired from the studio. Here are a few pieces that are available now." },
  collection: { eyebrow: 'Collection not found', title: "That collection doesn't exist", body: 'Every bracelet lives in one of five intentions — start there, or browse everything.' },
};

export default function NotFound({ kind = 'page' }: { kind?: keyof typeof COPY }) {
  const c = COPY[kind];
  useSeo({ title: `${c.title} | Stone & Strings`, description: c.body, noindex: true });
  return (
    <>
      <section className="wrap notfound" aria-labelledby="h-404">
        <Logo variant="mark" className="notfound__mark" title="" />
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 id="h-404">{c.title}</h1>
        <p className="notfound__body">{c.body}</p>
        <div className="notfound__cta">
          <Button to="/collections/all">Shop all bracelets</Button>
          <Button to="/" variant="ghost">Back to home</Button>
        </div>
      </section>
      <section className="wrap notfound__recs" aria-labelledby="h-404-recs">
        <div className="sec-head sec-head--sm"><p className="eyebrow">While you're here</p><h2 id="h-404-recs">Founder favourites</h2></div>
        <ProductGrid products={getFeaturedProducts(3)} />
      </section>
    </>
  );
}

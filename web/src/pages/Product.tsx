import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, getRelatedProducts } from '@/data/catalog';
import { intentionTitle } from '@/data/intentions';
import { stoneByHandle } from '@/data/stones';
import { site } from '@/data/site';
import { useSeo } from '@/hooks/useSeo';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Product as ProductT } from '@/types/product';
import { Breadcrumbs, breadcrumbJsonLd, type Crumb } from '@/components/layout/Breadcrumbs';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductCard } from '@/components/product/ProductCard';
import { Accordion, AccordionItem } from '@/components/ui/Primitives';
import '@/components/product/ProductPage.css';
import '@/components/product/ProductCard.css';
import NotFound from './NotFound';

export default function Product() {
  const { handle } = useParams();
  const product = getProduct(handle);
  if (!product) return <NotFound kind="product" />;
  return <ProductView key={product.handle} product={product} />;
}

function productJsonLd(p: ProductT) {
  const url = `${site.url}/products/${p.handle}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.fullTitle,
    description: p.description,
    sku: p.variants[0]?.sku?.replace(/-[A-Z]+$/, ''),
    brand: { '@type': 'Brand', name: site.name },
    material: p.stones.map((s) => stoneByHandle.get(s)?.name ?? s),
    ...(p.images.some((i) => i.src) ? { image: p.images.filter((i) => i.src).map((i) => i.src) } : {}),
    // No aggregateRating: zero real reviews exist yet (honesty principle).
    ...(p.pricePending
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            url,
            priceCurrency: p.currency,
            price: p.price.toFixed(2),
            availability: p.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
        }),
  };
}

function ProductView({ product }: { product: ProductT }) {
  const related = getRelatedProducts(product, 2);
  const leadStone = stoneByHandle.get(product.stones[0]);
  const crumbs: Crumb[] = [
    { label: 'Home', to: '/' },
    { label: intentionTitle(product.intention), to: `/collections/${product.intention}` },
    { label: product.title, to: `/products/${product.handle}` },
  ];

  useSeo({
    title: `${product.fullTitle} | ${site.name}`,
    description: product.seoDescription ?? product.description,
    canonicalPath: `/products/${product.handle}`,
    type: 'product',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      productJsonLd(product),
      ...(product.faqs?.length
        ? [{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: product.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
          }]
        : []),
    ],
  });

  // Mobile sticky bar appears once the main buy box scrolls out of view.
  const buyRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const el = buyRef.current?.querySelector('.info__cta');
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Breadcrumbs items={crumbs.map((c, i) => (i === crumbs.length - 1 ? { label: c.label } : c))} />

      <div className="wrap pdp" data-ss-section="pdp-main">
        <div className="pdp__media"><ProductGallery product={product} /></div>
        <div ref={buyRef}><ProductInfo product={product} /></div>
      </div>

      <div className="wrap pdp-story" data-ss-section="pdp-story">
        {product.stoneStory && (
          <section className="pdp-story__block" aria-labelledby="h-stone">
            <p className="eyebrow">About the stone</p>
            <h2 id="h-stone">{product.stoneStory.heading}</h2>
            <p>{product.stoneStory.body}</p>
          </section>
        )}
        <section className="pdp-story__block" aria-labelledby="h-care">
          <p className="eyebrow">Care</p>
          <h2 id="h-care">Keeping it for the long haul</h2>
          <p>
            Keep it dry and store it in a soft pouch when you're not wearing it. Avoid long sun exposure and harsh cleansers —
            a gentle wipe with a dry cloth keeps the surface bright. Take it off before swimming, workouts, or heavy work to
            protect the cord and the finish. Full care notes for every stone we carry live on the{' '}
            <Link className="inline-link" to="/pages/care">Care guide</Link>.
          </p>
        </section>
        <section className="pdp-story__block" id="sizing" aria-labelledby="h-size">
          <p className="eyebrow">Sizing</p>
          <h2 id="h-size">Finding your fit</h2>
          <p>
            Wrap a flexible tape (or a strip of paper) around your wrist bone, then add 0.25"–0.5" for a snug fit, or up to
            0.75" for a bracelet with more movement. This piece is strung to the size you choose at checkout — if you're
            between sizes, we recommend sizing up.
          </p>
        </section>
        {product.faqs && product.faqs.length > 0 && (
          <section className="pdp-story__block" aria-labelledby="h-faq">
            <p className="eyebrow">Questions</p>
            <h2 id="h-faq">Good to know</h2>
            <Accordion>
              {product.faqs.map((f, i) => (
                <AccordionItem key={f.question} title={f.question} defaultOpen={i === 0}>
                  <p>{f.answer}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </div>

      <ProductReviews productTitle={product.title} />

      <section className="sec sec--tight" style={{ paddingTop: 0 }} data-ss-section="pdp-related" aria-labelledby="h-related">
        <div className="wrap">
          <div className="sec-head sec-head--sm"><p className="eyebrow">Stay with the feeling</p><h2 id="h-related">You may also like</h2></div>
          <ul className="pgrid" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {related.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
            {leadStone && (
              <li>
                <Link className="related-stone" to={`/pages/our-stones#${leadStone.handle}`}>
                  <span className="related-stone__dot" style={{ background: leadStone.gradient }} aria-hidden="true" />
                  <h3>Explore {leadStone.name}</h3>
                  <p>{leadStone.tagline} — every piece we make with it</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>

      <div className={`sticky-atc${showSticky ? ' is-visible' : ''}`} aria-hidden={!showSticky} inert={!showSticky}>
        <div className="sticky-atc__meta">
          <span className="sticky-atc__title">{product.title}</span>
          <span className="sticky-atc__price">{product.pricePending ? 'Price coming soon' : formatCurrency(product.price)}</span>
        </div>
        <button
          type="button"
          className="btn btn--solid"
          onClick={() => buyRef.current?.querySelector<HTMLElement>('.info__field select, .info__cta button')?.focus({ preventScroll: false })}
        >
          {product.available ? 'Choose size' : 'View details'}
        </button>
      </div>
    </>
  );
}

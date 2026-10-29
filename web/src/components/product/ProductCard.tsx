import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { stoneName } from '@/data/stones';
import { intentionTitle } from '@/data/intentions';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { primaryImage } from '@/utils/imageUtils';
import { SmartImage } from '@/components/ui/SmartImage';
import { Badge } from '@/components/ui/Primitives';
import { ProductBadge, ProductPrice } from './ProductBits';
import './ProductCard.css';

/** One-click adds use Small, the most common fit; the size shows in the cart. */
const QUICK_ADD_INDEX = 1;

interface ProductCardProps {
  product: Product;
  headingLevel?: 'h2' | 'h3';
  eager?: boolean;
}

/** Homepage V2 #8 card spec line. Only confirmed values; otherwise say they're being confirmed. */
function specLine(p: Product): string {
  const parts = [p.beadSize, p.closure, p.metal].filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Bead size, clasp & metal confirming';
}

/**
 * One card everywhere: home, collections, search, related (Homepage V2 #8): on-wrist photo on hover,
 * spec line, and Quick add. The title link stretches over the whole card; Quick add sits above it,
 * so there's never a button nested inside a link.
 */
export const ProductCard = memo(function ProductCard({ product, headingLevel: H = 'h3', eager }: ProductCardProps) {
  const { addItem } = useCart();
  const img = primaryImage(product);
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const alt = product.images[1];
  const quickVariant = product.variants[QUICK_ADD_INDEX] ?? product.variants[0];
  const canQuickAdd = product.available && !product.pricePending && !!quickVariant?.available;
  const spec = specLine(product);

  return (
    <article className={`card${product.available ? '' : ' is-unavailable'}`}>
      <div className="card__thumb">
        <SmartImage image={img} className="card__img" eager={eager} sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw" />
        {alt && <SmartImage image={alt} className="card__img card__img--alt" />}
        <ProductBadge product={product} />
        {onSale && <span className="card__sale"><Badge tone="sale" floating={false}>Sale</Badge></span>}
        {canQuickAdd && (
          <button
            type="button"
            className="card__quick"
            onClick={() => addItem(quickVariant.id, 1)}
            aria-label={`Quick add ${product.title}, size Small, ${formatCurrency(quickVariant.price)}`}
          >
            Quick add · {formatCurrency(quickVariant.price)}
          </button>
        )}
      </div>
      <p className="card__chip">{intentionTitle(product.intention)}</p>
      <div className="card__row">
        <H className="card__title">
          <Link to={`/products/${product.handle}`} className="card__link">{product.title}</Link>
        </H>
        <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} pending={product.pricePending} className="card__price" />
      </div>
      <p className="card__stones">{product.stones.map(stoneName).join(' · ')}</p>
      <p className={`card__spec${product.beadSize ? '' : ' is-pending'}`}>{spec}</p>
    </article>
  );
});

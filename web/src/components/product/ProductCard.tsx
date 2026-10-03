import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { stoneName } from '@/data/stones';
import { intentionTitle } from '@/data/intentions';
import { primaryImage } from '@/utils/imageUtils';
import { SmartImage } from '@/components/ui/SmartImage';
import { Badge } from '@/components/ui/Primitives';
import { ProductBadge, ProductPrice } from './ProductBits';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  headingLevel?: 'h2' | 'h3';
  eager?: boolean;
}

/** One card everywhere: home, collections, search, related. Markup mirrors the prototype `.card`. */
export const ProductCard = memo(function ProductCard({ product, headingLevel: H = 'h3', eager }: ProductCardProps) {
  const img = primaryImage(product);
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const second = product.images[1];
  return (
    <Link className={`card${product.available ? '' : ' is-unavailable'}`} to={`/products/${product.handle}`}>
      <div className="card__thumb">
        <SmartImage image={img} className="card__img" eager={eager} sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw">
          <ProductBadge product={product} />
          {onSale && <span className="card__sale"><Badge tone="sale" floating={false}>Sale</Badge></span>}
        </SmartImage>
        {second && <SmartImage image={second} className="card__img card__img--alt" showCaption={false} />}
      </div>
      <H className="card__title">{product.title}</H>
      <div className="card__stones">{product.stones.map(stoneName).join(' · ')}</div>
      <div className="card__row">
        <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} pending={product.pricePending} className="card__price" />
        <span className="card__intent">{intentionTitle(product.intention)}</span>
      </div>
    </Link>
  );
});

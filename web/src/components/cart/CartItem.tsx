import { Link } from 'react-router-dom';
import type { ResolvedCartLine } from '@/types/cart';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { primaryImage } from '@/utils/imageUtils';
import { SmartImage } from '@/components/ui/SmartImage';
import { QuantitySelector } from '@/components/ui/Primitives';
import { treatmentLabel } from '@/components/product/ProductBits';

interface CartItemProps {
  line: ResolvedCartLine;
  onNavigate?: () => void;
  size?: 'sm' | 'md';
}

export function CartItem({ line, onNavigate, size = 'sm' }: CartItemProps) {
  const { setQuantity, removeItem, maxQty } = useCart();
  const { product, variant } = line;
  const href = `/products/${product.handle}`;
  return (
    <li className={`citem citem--${size}`}>
      <Link to={href} onClick={onNavigate} className="citem__thumb" tabIndex={-1} aria-hidden="true">
        <SmartImage image={primaryImage(product)} showCaption={false} />
      </Link>
      <div className="citem__body">
        <div className="citem__top">
          <div>
            <Link to={href} onClick={onNavigate} className="citem__title">{product.title}</Link>
            <p className="citem__meta">{variant.title}</p>
            <p className="citem__meta citem__meta--t">{treatmentLabel(product.treatment)} · {formatCurrency(variant.price)} each</p>
          </div>
          <span className="citem__total">{formatCurrency(line.lineTotal)}</span>
        </div>
        <div className="citem__actions">
          <QuantitySelector
            size="sm"
            value={line.quantity}
            min={1}
            max={maxQty}
            label={`Quantity for ${product.title}`}
            onChange={(n) => setQuantity(line.variantId, n)}
          />
          <button type="button" className="citem__remove" onClick={() => removeItem(line.variantId)}>
            Remove<span className="sr-only"> {product.title}, {variant.title}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

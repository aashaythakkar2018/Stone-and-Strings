import type { Product, TreatmentStatus } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { Badge } from '@/components/ui/Primitives';

const TREATMENT_LABEL: Record<TreatmentStatus, string> = {
  natural: 'Natural',
  dyed: 'Dyed · disclosed',
  plated: 'Plated · disclosed',
  coated: 'Coated · disclosed',
};

export function treatmentLabel(t: TreatmentStatus) {
  return TREATMENT_LABEL[t];
}

/** Green for natural, amber for any disclosed treatment — the brand's trust mechanic. */
export function ProductBadge({ product, floating = true }: { product: Product; floating?: boolean }) {
  if (!product.available && product.pricePending) return <Badge tone="neutral" floating={floating}>Coming soon</Badge>;
  return (
    <Badge tone={product.treatment === 'natural' ? 'natural' : 'disclosed'} floating={floating}>
      {treatmentLabel(product.treatment)}
    </Badge>
  );
}

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  pending?: boolean;
  className?: string;
}

export function ProductPrice({ price, compareAtPrice, pending, className = 'price' }: PriceProps) {
  if (pending) return <span className={`${className} price--pending`}>Price coming soon</span>;
  const onSale = compareAtPrice != null && compareAtPrice > price;
  return (
    <span className={className}>
      {onSale && <span className="sr-only">Sale price </span>}
      {formatCurrency(price)}
      {onSale && (
        <>
          {' '}
          <s className="price__compare"><span className="sr-only">Regular price </span>{formatCurrency(compareAtPrice)}</s>
        </>
      )}
    </span>
  );
}

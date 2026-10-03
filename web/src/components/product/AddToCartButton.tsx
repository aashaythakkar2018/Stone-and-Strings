import { useEffect, useState } from 'react';
import type { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { IconCheck } from '@/components/ui/Icons';

interface Props {
  product: Product;
  variant: ProductVariant | undefined;
  quantity: number;
}

/** Primary CTA with inline "Added" feedback; opens the cart drawer. */
export function AddToCartButton({ product, variant, quantity }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  if (product.pricePending || !product.available) {
    return <button type="button" className="btn btn--solid btn--full" disabled>Coming soon</button>;
  }
  if (!variant || !variant.available) {
    return <button type="button" className="btn btn--solid btn--full" disabled>Unavailable in this size</button>;
  }

  return (
    <button
      type="button"
      className={`btn btn--solid btn--full atc${added ? ' is-added' : ''}`}
      onClick={() => {
        addItem(variant.id, quantity);
        setAdded(true);
      }}
    >
      {added ? (
        <><IconCheck /> Added to cart</>
      ) : (
        <>Add to cart — {formatCurrency(variant.price * quantity)}</>
      )}
    </button>
  );
}

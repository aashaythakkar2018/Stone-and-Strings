import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { intentionTitle } from '@/data/intentions';
import { Select } from '@/components/ui/Field';
import { QuantitySelector } from '@/components/ui/Primitives';
import { Button } from '@/components/ui/Button';
import { AddToCartButton } from './AddToCartButton';
import { ProductPrice } from './ProductBits';
import { MaterialsBlock } from './MaterialsBlock';

/** Buy box + founder's note, affirmation and the Materials & Craft block (PDP module order is locked). */
export function ProductInfo({ product }: { product: Product }) {
  // Default to "Small", matching the prototype's preselected size.
  const defaultIdx = product.variants.length > 1 ? 1 : 0;
  const [selected, setSelected] = useState<Record<string, string>>(() => ({ ...product.variants[defaultIdx]?.options }));
  const [qty, setQty] = useState(1);

  const variant = useMemo(
    () => product.variants.find((v) => Object.entries(selected).every(([k, val]) => v.options[k] === val)),
    [product.variants, selected],
  );
  const purchasable = product.available && !product.pricePending;

  return (
    <div className="info">
      <p className="eyebrow">
        <Link to={`/collections/${product.intention}`}>{intentionTitle(product.intention)}</Link> · Handmade to order
      </p>
      <h1>{product.fullTitle}</h1>
      <p className="info__stones">{product.materialsLine}</p>

      <div className="info__price-row">
        <ProductPrice price={variant?.price ?? product.price} compareAtPrice={variant?.compareAtPrice ?? product.compareAtPrice} pending={product.pricePending} className="info__price" />
        {product.tierLabel && <span className="info__tier">{product.tierLabel}</span>}
      </div>
      <p className="info__ship">Shipping calculated at checkout.</p>

      {product.options.map((opt) => (
        <Select
          key={opt.name}
          className="info__field"
          label={opt.name}
          value={selected[opt.name] ?? ''}
          onChange={(e) => setSelected((s) => ({ ...s, [opt.name]: e.target.value }))}
          options={opt.values.map((v) => ({ value: v, label: v }))}
          hint={opt.name === 'Wrist size' ? <a href="#sizing" className="inline-link">How to measure</a> : undefined}
          disabled={!purchasable}
        />
      ))}

      {purchasable && (
        <div className="info__field">
          <span className="field__label" id="qty-label">Quantity</span>
          <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
        </div>
      )}

      <div className="info__cta">
        <AddToCartButton product={product} variant={variant} quantity={qty} />
        <Button to="/pages/custom" variant="ghost" full>Prefer this made your way? Start a custom piece</Button>
      </div>

      <ul className="trust-items info__trust" role="list">
        <li className="t-item"><span className="dot" aria-hidden="true" />Free 30-day repair</li>
        <li className="t-item"><span className="dot" aria-hidden="true" />Handmade in Georgia, USA</li>
        <li className="t-item"><span className="dot" aria-hidden="true" />{product.treatment === 'natural' ? 'Natural stones' : 'Treatment'}, disclosed below</li>
      </ul>

      {product.founderNote && (
        <figure className="vnote">
          <blockquote>“{product.founderNote}”</blockquote>
          <figcaption>— Vidhi, founder</figcaption>
        </figure>
      )}

      {product.affirmation && (
        <p className="afform"><span className="script">“{product.affirmation}”</span></p>
      )}

      <MaterialsBlock product={product} />
    </div>
  );
}

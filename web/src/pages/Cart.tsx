import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useSeo } from '@/hooks/useSeo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartEmpty } from '@/components/cart/CartEmpty';
import { TrustStrip } from '@/components/sections/HomeSections';
import '@/components/cart/Cart.css';
import './pages.css';

export default function Cart() {
  const { lines, totals, clear } = useCart();
  const [confirming, setConfirming] = useState(false);
  useEffect(() => {
    if (!confirming) return;
    const t = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(t);
  }, [confirming]);
  useSeo({ title: 'Your cart | Stone & Strings', canonicalPath: '/cart', noindex: true });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <div className="wrap page-head">
        <p className="eyebrow">Strung to order</p>
        <h1>Your cart{totals.itemCount ? ` (${totals.itemCount})` : ''}</h1>
      </div>
      <div className="wrap cartpage">
        {lines.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="cartpage__grid">
            <div>
              <div className="cartpage__headrow">
                <span>Piece</span>
                <button
                  type="button"
                  className={`cartpage__clear${confirming ? ' is-confirming' : ''}`}
                  onClick={() => (confirming ? clear() : setConfirming(true))}
                  aria-live="polite"
                >
                  {confirming ? 'Click again to clear everything' : 'Clear cart'}
                </button>
              </div>
              <ul className="clist">
                {lines.map((l) => <CartItem key={l.variantId} line={l} size="md" />)}
              </ul>
            </div>
            <aside className="cartpage__summary" aria-label="Order summary">
              <h2>Order summary</h2>
              <CartSummary showDiscount />
            </aside>
          </div>
        )}
      </div>
      <TrustStrip />
    </>
  );
}

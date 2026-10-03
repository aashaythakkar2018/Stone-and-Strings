import { useState, type FormEvent } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/Button';

/**
 * Totals block shared by the drawer and the cart page. Discount, shipping and tax are
 * placeholders — they are calculated by the commerce backend at checkout (not in this phase).
 */
export function CartSummary({ showDiscount = false, compact = false }: { showDiscount?: boolean; compact?: boolean }) {
  const { totals } = useCart();
  const [code, setCode] = useState('');
  const [note, setNote] = useState<string | null>(null);
  const [checkoutNote, setCheckoutNote] = useState(false);

  const applyCode = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setNote('Discount codes are applied at checkout.');
  };

  return (
    <div className={`csum${compact ? ' csum--compact' : ''}`}>
      {showDiscount && (
        <form className="csum__discount" onSubmit={applyCode}>
          <label htmlFor="discount" className="sr-only">Discount code</label>
          <input id="discount" className="field__control" placeholder="Discount code" value={code} onChange={(e) => { setCode(e.target.value); setNote(null); }} />
          <button type="submit" className="btn btn--ghost">Apply</button>
          {note && <p className="csum__note" role="status">{note}</p>}
        </form>
      )}
      <dl className="csum__rows">
        <div><dt>Subtotal</dt><dd>{formatCurrency(totals.subtotal)}</dd></div>
        {!compact && (
          <>
            <div><dt>Discount</dt><dd className="muted">—</dd></div>
            <div><dt>Shipping</dt><dd className="muted">Calculated at checkout</dd></div>
            <div><dt>Tax</dt><dd className="muted">Calculated at checkout</dd></div>
          </>
        )}
        <div className="csum__total"><dt>{compact ? 'Subtotal' : 'Estimated total'}</dt><dd>{formatCurrency(totals.subtotal)}</dd></div>
      </dl>
      {compact && <p className="csum__fine">Shipping &amp; taxes calculated at checkout.</p>}
      <Button full onClick={() => setCheckoutNote(true)} aria-describedby="checkout-note">
        Checkout — {formatCurrency(totals.subtotal)}
      </Button>
      <p id="checkout-note" className="csum__fine" role="status">
        {checkoutNote
          ? 'Checkout opens when the store launches — your cart is saved on this device until then.'
          : 'Every piece is strung to order and covered by a free 30-day repair.'}
      </p>
    </div>
  );
}

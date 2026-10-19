import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { CartEmpty } from './CartEmpty';
import { ShippingProgress } from './ShippingProgress';
import { site } from '@/data/site';
import './Cart.css';

export function CartDrawer() {
  const { isOpen, closeCart, lines, totals } = useCart();
  const title = totals.itemCount ? `Your cart (${totals.itemCount})` : 'Your cart';
  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title={title}
      className="cdrawer"
      footer={
        lines.length > 0 ? (
          <>
            <CartSummary compact />
            <p className="cdrawer__note">Strung to order · ships in {site.shipsIn} · free 30-day repair</p>
            <Link to="/cart" className="textlink cdrawer__view" onClick={closeCart}>View full cart</Link>
          </>
        ) : undefined
      }
    >
      <ShippingProgress subtotal={totals.subtotal} />
      {lines.length === 0 ? (
        <>
          <p className="cdrawer__stack">
            Your cart is empty. Try a <Link to="/#stack" className="inline-link" onClick={closeCart}>stack</Link>, every one ships free.
          </p>
          <CartEmpty onNavigate={closeCart} compact />
        </>
      ) : (
        <ul className="clist" aria-label="Items in your cart">
          {lines.map((l) => (
            <CartItem key={l.variantId} line={l} onNavigate={closeCart} />
          ))}
        </ul>
      )}
      {lines.length > 0 && (
        <div className="cdrawer__custom">
          <p>Want it made your way?</p>
          <Button variant="ghost" to="/pages/custom" onClick={closeCart}>Start a custom piece</Button>
        </div>
      )}
    </Drawer>
  );
}

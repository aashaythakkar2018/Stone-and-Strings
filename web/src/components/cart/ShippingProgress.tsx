import { site } from '@/data/site';
import { formatCurrency } from '@/utils/formatCurrency';

/** Homepage V2 #9 — progress toward free US shipping; every stack clears it. */
export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const threshold = site.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  const msg =
    subtotal === 0
      ? `Spend ${formatCurrency(threshold)} for free US shipping`
      : remaining > 0
        ? `You're ${formatCurrency(remaining)} away from free US shipping`
        : "You've unlocked free US shipping";
  return (
    <div className="shipbar">
      <p className="shipbar__msg" aria-live="polite">{msg}</p>
      <div className="shipbar__track" role="progressbar" aria-label="Progress to free US shipping" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <span className="shipbar__fill" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}

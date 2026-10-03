const cache = new Map<string, Intl.NumberFormat>();

/** "$118" for whole amounts (matches the prototypes), "$62.50" otherwise. */
export function formatCurrency(amount: number, currency = 'USD'): string {
  const whole = Number.isInteger(amount);
  const key = `${currency}-${whole}`;
  let fmt = cache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: 2,
    });
    cache.set(key, fmt);
  }
  return fmt.format(amount);
}

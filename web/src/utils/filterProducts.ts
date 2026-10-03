import type { Product, TreatmentStatus } from '@/types/product';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'title';

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'newest', label: 'Newest' },
  { value: 'title', label: 'Alphabetical' },
];

export interface ProductFilters {
  stones: string[];
  intentions: string[];
  treatments: TreatmentStatus[];
  inStockOnly: boolean;
  priceMin?: number;
  priceMax?: number;
}

export const emptyFilters: ProductFilters = { stones: [], intentions: [], treatments: [], inStockOnly: false };

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  return list.filter((p) => {
    if (f.stones.length && !p.stones.some((s) => f.stones.includes(s))) return false;
    if (f.intentions.length && !f.intentions.includes(p.intention)) return false;
    if (f.treatments.length && !f.treatments.includes(p.treatment)) return false;
    if (f.inStockOnly && !p.available) return false;
    if (f.priceMin != null && (p.pricePending || p.price < f.priceMin)) return false;
    if (f.priceMax != null && (p.pricePending || p.price > f.priceMax)) return false;
    return true;
  });
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const out = [...list];
  // Pending-price pieces always sink to the end of price sorts.
  const price = (p: Product, fallback: number) => (p.pricePending ? fallback : p.price);
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => price(a, Infinity) - price(b, Infinity));
    case 'price-desc':
      return out.sort((a, b) => price(b, -Infinity) - price(a, -Infinity));
    case 'newest':
      return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case 'title':
      return out.sort((a, b) => a.title.localeCompare(b.title));
    default:
      // featured: catalog order, unavailable last
      return out.sort((a, b) => Number(b.available) - Number(a.available));
  }
}

export function activeFilterCount(f: ProductFilters): number {
  return (
    f.stones.length + f.intentions.length + f.treatments.length + (f.inStockOnly ? 1 : 0) +
    (f.priceMin != null ? 1 : 0) + (f.priceMax != null ? 1 : 0)
  );
}

/* ── URL <-> filter state (shareable, back-button friendly) ── */
const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);
const num = (v: string | null) => (v != null && v !== '' && !Number.isNaN(Number(v)) ? Number(v) : undefined);

export function filtersFromParams(sp: URLSearchParams): ProductFilters {
  return {
    stones: list(sp.get('stone')),
    intentions: list(sp.get('intention')),
    treatments: list(sp.get('treatment')) as TreatmentStatus[],
    inStockOnly: sp.get('available') === '1',
    priceMin: num(sp.get('min')),
    priceMax: num(sp.get('max')),
  };
}

export function sortFromParams(sp: URLSearchParams): SortKey {
  const s = sp.get('sort') as SortKey | null;
  return s && SORT_OPTIONS.some((o) => o.value === s) ? s : 'featured';
}

export function paramsFrom(f: ProductFilters, sort: SortKey): URLSearchParams {
  const sp = new URLSearchParams();
  if (f.stones.length) sp.set('stone', f.stones.join(','));
  if (f.intentions.length) sp.set('intention', f.intentions.join(','));
  if (f.treatments.length) sp.set('treatment', f.treatments.join(','));
  if (f.inStockOnly) sp.set('available', '1');
  if (f.priceMin != null) sp.set('min', String(f.priceMin));
  if (f.priceMax != null) sp.set('max', String(f.priceMax));
  if (sort !== 'featured') sp.set('sort', sort);
  return sp;
}

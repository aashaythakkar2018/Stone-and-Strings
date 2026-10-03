import { Skeleton } from './Primitives';
import { ProductGridSkeleton } from '@/components/product/ProductGrid';

/** Route-level fallback while a lazily-loaded page chunk arrives. */
export function PageSkeleton() {
  return (
    <div className="wrap" style={{ padding: '56px var(--gutter) 96px' }} aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <Skeleton style={{ width: 120, height: 12 }} />
      <Skeleton style={{ width: 'min(520px, 80%)', height: 48, marginTop: 16 }} />
      <Skeleton style={{ width: 'min(640px, 90%)', height: 14, marginTop: 24 }} />
      <Skeleton style={{ width: 'min(560px, 70%)', height: 14, marginTop: 10, marginBottom: 56 }} />
      <ProductGridSkeleton count={3} />
    </div>
  );
}

import type { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/Primitives';
import { ProductCard } from './ProductCard';
import './ProductCard.css';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  /** Number of cards eagerly loaded (above the fold). */
  eagerCount?: number;
  headingLevel?: 'h2' | 'h3';
}

export function ProductGrid({ products, columns = 3, eagerCount = 0, headingLevel }: ProductGridProps) {
  return (
    <ul className={`pgrid${columns === 4 ? ' pgrid--4' : ''}`} role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} eager={i < eagerCount} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 6, columns = 3 }: { count?: number; columns?: 3 | 4 }) {
  return (
    <div className={`pgrid${columns === 4 ? ' pgrid--4' : ''}`} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <div className="card-skel" key={i}>
          <Skeleton />
          <Skeleton style={{ width: '60%' }} />
          <Skeleton style={{ width: '40%' }} />
        </div>
      ))}
    </div>
  );
}

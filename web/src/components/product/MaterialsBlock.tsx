import type { Product } from '@/types/product';
import { stoneName } from '@/data/stones';
import { ProductBadge } from './ProductBits';

/** ★ Materials & Craft — the brand's differentiator; the most prominent honest real estate on the PDP. */
export function MaterialsBlock({ product }: { product: Product }) {
  const rows = product.materials?.length
    ? product.materials
    : [{ label: 'Stones', value: product.stones.map(stoneName).join(' & ') }];
  return (
    <section className="materials" data-ss-section="pdp-materials" aria-labelledby="h-materials">
      <div className="materials__head">
        <h2 id="h-materials">Materials &amp; craft</h2>
        <ProductBadge product={product} floating={false} />
      </div>
      <table>
        <caption className="sr-only">Materials and construction details</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!product.materialsComplete && (
        <p className="materials__pending">
          Origin, bead size and hardware for this piece are being confirmed and will be listed here in full before it ships.
        </p>
      )}
    </section>
  );
}

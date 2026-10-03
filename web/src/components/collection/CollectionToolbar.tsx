import { stoneName } from '@/data/stones';
import { intentionTitle } from '@/data/intentions';
import type { IntentionHandle } from '@/types/product';
import { activeFilterCount, SORT_OPTIONS, type ProductFilters, type SortKey } from '@/utils/filterProducts';
import { formatCurrency } from '@/utils/formatCurrency';
import { Chip } from '@/components/ui/Primitives';
import { Select } from '@/components/ui/Field';
import { IconClose, IconFilter } from '@/components/ui/Icons';
import { treatmentLabel } from '@/components/product/ProductBits';

interface Props {
  stoneOptions: string[];
  filters: ProductFilters;
  sort: SortKey;
  shown: number;
  total: number;
  onToggleStone: (s: string | null) => void;
  onSort: (s: SortKey) => void;
  onOpenFilters: () => void;
  onChange: (f: ProductFilters) => void;
}

/** collection-filters — quick stone chips (prototype pattern) + full filter drawer + sort. */
export function CollectionToolbar({ stoneOptions, filters, sort, shown, total, onToggleStone, onSort, onOpenFilters, onChange }: Props) {
  const nActive = activeFilterCount(filters);
  const pills: { label: string; clear: () => void }[] = [
    ...filters.stones.map((s) => ({ label: stoneName(s), clear: () => onChange({ ...filters, stones: filters.stones.filter((x) => x !== s) }) })),
    ...filters.intentions.map((i) => ({ label: intentionTitle(i as IntentionHandle), clear: () => onChange({ ...filters, intentions: filters.intentions.filter((x) => x !== i) }) })),
    ...filters.treatments.map((t) => ({ label: treatmentLabel(t), clear: () => onChange({ ...filters, treatments: filters.treatments.filter((x) => x !== t) }) })),
    ...(filters.inStockOnly ? [{ label: 'Available now', clear: () => onChange({ ...filters, inStockOnly: false }) }] : []),
    ...(filters.priceMin != null ? [{ label: `From ${formatCurrency(filters.priceMin)}`, clear: () => onChange({ ...filters, priceMin: undefined }) }] : []),
    ...(filters.priceMax != null ? [{ label: `Up to ${formatCurrency(filters.priceMax)}`, clear: () => onChange({ ...filters, priceMax: undefined }) }] : []),
  ];

  return (
    <div className="wrap" data-ss-section="collection-filters">
      <div className="filterbar">
        {stoneOptions.length > 1 && (
          <div className="filterbar__chips" role="group" aria-label="Filter by stone">
            <Chip active={filters.stones.length === 0} onClick={() => onToggleStone(null)}>All stones</Chip>
            {stoneOptions.map((s) => (
              <Chip key={s} active={filters.stones.includes(s)} onClick={() => onToggleStone(s)}>{stoneName(s)}</Chip>
            ))}
          </div>
        )}
        <div className="filterbar__right">
          <button type="button" className="filterbar__btn" onClick={onOpenFilters} aria-haspopup="dialog">
            <IconFilter /> Filter{nActive ? ` (${nActive})` : ''}
          </button>
          <span className="filterbar__count" aria-live="polite">
            {shown === total ? `${total} ${total === 1 ? 'piece' : 'pieces'}` : `${shown} of ${total} pieces`}
          </span>
          <Select
            compact
            className="filterbar__sort"
            label="Sort"
            hideLabel
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            options={SORT_OPTIONS.map((o) => ({ value: o.value, label: `Sort: ${o.label}` }))}
          />
        </div>
      </div>
      {pills.length > 0 && (
        <ul className="pills" aria-label="Active filters">
          {pills.map((p) => (
            <li key={p.label}>
              <button type="button" className="pill" onClick={p.clear}>
                {p.label} <IconClose aria-hidden="true" /><span className="sr-only">Remove filter</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="pill pill--clear" onClick={() => onChange({ stones: [], intentions: [], treatments: [], inStockOnly: false })}>Clear all</button>
          </li>
        </ul>
      )}
    </div>
  );
}

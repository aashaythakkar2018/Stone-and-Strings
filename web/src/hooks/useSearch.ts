import { useDeferredValue, useMemo } from 'react';
import { searchProducts } from '@/data/catalog';
import { stones } from '@/data/stones';
import { intentions } from '@/data/intentions';

export interface SearchSuggestion {
  label: string;
  to: string;
  kind: 'Stone' | 'Intention';
}

const suggestionPool: SearchSuggestion[] = [
  ...intentions.map((i) => ({ label: i.title, to: `/collections/${i.handle}`, kind: 'Intention' as const })),
  ...stones.map((s) => ({
    label: s.name,
    to: s.hasCollection ? `/collections/${s.handle === 'freshwater-pearl' ? 'pearl' : s.handle}` : `/pages/our-stones#${s.handle}`,
    kind: 'Stone' as const,
  })),
];

export const popularSearches = ['Labradorite', 'Pearl', 'Amethyst', 'Natural', 'Calm'];

export function useSearch(query: string) {
  const deferred = useDeferredValue(query.trim());
  const results = useMemo(() => searchProducts(deferred), [deferred]);
  const suggestions = useMemo(() => {
    const q = deferred.toLowerCase();
    if (!q) return [];
    return suggestionPool.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 5);
  }, [deferred]);
  return { query: deferred, results, suggestions, isStale: deferred !== query.trim() };
}

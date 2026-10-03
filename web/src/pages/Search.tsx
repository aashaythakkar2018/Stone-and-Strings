import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { popularSearches, useSearch } from '@/hooks/useSearch';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { IconSearch } from '@/components/ui/Icons';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import '@/components/layout/SearchOverlay.css';
import './pages.css';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const urlQ = params.get('q') ?? '';
  const [q, setQ] = useState(urlQ);
  const written = useRef(urlQ);
  // Only adopt the URL when it changed externally (header search, back button) — not from our own sync.
  useEffect(() => {
    if (urlQ !== written.current) {
      written.current = urlQ;
      setQ(urlQ);
    }
  }, [urlQ]);
  const { results, suggestions, query } = useSearch(q);

  useSeo({
    title: urlQ ? `Search: “${urlQ}” | Stone & Strings` : 'Search | Stone & Strings',
    description: 'Search handmade gemstone bracelets by stone, intention or name.',
    canonicalPath: '/search',
    noindex: true,
  });

  // Keep the URL in sync (debounced by useDeferredValue in useSearch).
  useEffect(() => {
    if (query === written.current) return;
    written.current = query;
    setParams(query ? { q: query } : {}, { replace: true });
  }, [query, setParams]);

  const submit = (e: FormEvent) => e.preventDefault();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <div className="wrap page-head">
        <p className="eyebrow">Search</p>
        <h1>{query ? <>Results for “{query}”</> : 'Search the studio'}</h1>
        <form className="search-page__form sov__form" role="search" onSubmit={submit}>
          <IconSearch className="sov__icon" />
          <label htmlFor="search-page-input" className="sr-only">Search bracelets</label>
          <input id="search-page-input" className="sov__input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Stone, intention or piece…" autoComplete="off" />
        </form>
        {suggestions.length > 0 && (
          <ul className="search-page__sugg" aria-label="Matching collections and stones">
            {suggestions.map((s) => <li key={s.to}><Link className="chip" to={s.to}>{s.kind}: {s.label}</Link></li>)}
          </ul>
        )}
      </div>

      <div className="wrap gridwrap">
        {!query ? (
          <div className="search-page__idle">
            <p className="eyebrow">Popular searches</p>
            <div className="sov__chips">
              {popularSearches.map((p) => <button key={p} type="button" className="chip" onClick={() => setQ(p)}>{p}</button>)}
            </div>
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title={`Nothing matches “${query}”`}
            actions={<><Button to="/collections/all">Shop all bracelets</Button><Button to="/pages/our-stones" variant="ghost">Explore the stones</Button></>}
          >
            Try a stone (labradorite, pearl, amethyst), an intention (calm, clarity), or a treatment like “natural”.
          </EmptyState>
        ) : (
          <>
            <p className="search-page__count" aria-live="polite">{results.length} {results.length === 1 ? 'piece' : 'pieces'}</p>
            <ProductGrid products={results} headingLevel="h2" eagerCount={3} />
          </>
        )}
      </div>
    </>
  );
}

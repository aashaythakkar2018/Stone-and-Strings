import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { IconArrow, IconSearch } from '@/components/ui/Icons';
import { popularSearches, useSearch } from '@/hooks/useSearch';
import { stoneName } from '@/data/stones';
import { primaryImage } from '@/utils/imageUtils';
import { SmartImage } from '@/components/ui/SmartImage';
import { ProductPrice } from '@/components/product/ProductBits';
import './SearchOverlay.css';

/** Predictive search sheet opened from the header. Full results live at /search. */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const { results, suggestions, query } = useSearch(q);
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Search the studio" hideTitle placement="top">
      <div className="sov">
        <form className="sov__form" role="search" onSubmit={submit}>
          <IconSearch className="sov__icon" />
          <label htmlFor="sov-input" className="sr-only">Search</label>
          <input
            id="sov-input"
            data-autofocus
            type="search"
            className="sov__input"
            placeholder="Search bracelets, stones, intentions…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
            enterKeyHint="search"
          />
        </form>

        {!query && (
          <div className="sov__popular">
            <p className="eyebrow">Popular</p>
            <div className="sov__chips">
              {popularSearches.map((p) => (
                <button key={p} type="button" className="chip" onClick={() => setQ(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div className="sov__results" aria-live="polite">
            {suggestions.length > 0 && (
              <div className="sov__sugg">
                <p className="eyebrow">Collections & stones</p>
                <ul>
                  {suggestions.map((s) => (
                    <li key={s.to}>
                      <Link to={s.to} onClick={onClose}>{s.label} <small>{s.kind}</small></Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="sov__prods">
              <p className="eyebrow">{results.length ? `Pieces (${results.length})` : 'Pieces'}</p>
              {results.length === 0 ? (
                <p className="sov__empty">No pieces match “{query}”. Try a stone like <button type="button" className="inline-link" onClick={() => setQ('pearl')}>pearl</button> or an intention like <button type="button" className="inline-link" onClick={() => setQ('calm')}>calm</button>.</p>
              ) : (
                <ul>
                  {results.slice(0, 4).map((p) => (
                    <li key={p.id}>
                      <Link to={`/products/${p.handle}`} onClick={onClose} className="sov__item">
                        <SmartImage image={primaryImage(p)} className="sov__thumb" showCaption={false} />
                        <span className="sov__meta">
                          <span className="sov__title">{p.title}</span>
                          <span className="sov__stones">{p.stones.map(stoneName).join(' · ')}</span>
                        </span>
                        <ProductPrice price={p.price} pending={p.pricePending} className="sov__price" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {results.length > 0 && (
                <Link className="textlink sov__all" to={`/search?q=${encodeURIComponent(query)}`} onClick={onClose}>
                  View all results <IconArrow style={{ width: 14, height: 14, verticalAlign: '-2px' }} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

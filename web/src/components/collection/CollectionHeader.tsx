import type { Collection } from '@/types/collection';
import { stoneName } from '@/data/stones';
import './Collection.css';

/** collection-hero — the only H1 on the page. Meaning-driven intro. */
export function CollectionHeader({ collection, stoneTags }: { collection: Collection; stoneTags: string[] }) {
  return (
    <header className="wrap col-hero" data-ss-section="collection-hero">
      <div className="col-hero__in">
        <p className="eyebrow">{collection.eyebrow}</p>
        <h1>{collection.title}</h1>
        <p className="col-hero__lede">{collection.description}</p>
        {stoneTags.length > 0 && collection.kind !== 'all' && collection.kind !== 'new' && (
          <ul className="col-hero__tags" aria-label="Stones in this collection">
            {stoneTags.map((s) => <li className="stone-tag" key={s}>{stoneName(s)}</li>)}
          </ul>
        )}
      </div>
    </header>
  );
}

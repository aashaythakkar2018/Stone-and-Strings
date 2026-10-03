import { Link } from 'react-router-dom';
import { intentions } from '@/data/intentions';
import { countCollectionProducts } from '@/data/catalog';
import type { IntentionHandle } from '@/types/product';
import './sections.css';

interface CategoryGridProps {
  /** Hide one intention (used for "the other four" cross-links on a collection page). */
  exclude?: IntentionHandle;
  /** 'count' shows live piece counts; 'cta' shows "Shop the line". */
  meta?: 'count' | 'cta';
  headingLevel?: 'h2' | 'h3';
}

/** Shop-by-intention tiles (home-intentions / collection-cross-links). */
export function CategoryGrid({ exclude, meta = 'count', headingLevel: H = 'h3' }: CategoryGridProps) {
  const list = intentions.filter((i) => i.handle !== exclude);
  return (
    <ul className={`intents intents--${list.length}`} role="list">
      {list.map((i) => {
        const n = countCollectionProducts(i.handle);
        return (
          <li key={i.handle}>
            <Link className="intent" to={`/collections/${i.handle}`} style={{ background: i.gradient }}>
              <span className="intent__in">
                <H className="intent__title">{i.title}</H>
                <span className="intent__meta">
                  {meta === 'count' ? `${n} ${n === 1 ? 'piece' : 'pieces'}` : 'Shop the line'}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

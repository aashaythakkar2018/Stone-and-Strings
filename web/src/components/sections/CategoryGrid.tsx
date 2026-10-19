import { Link } from 'react-router-dom';
import { intentions } from '@/data/intentions';
import { countCollectionProducts } from '@/data/catalog';
import type { IntentionHandle } from '@/types/product';
import { Stagger, StaggerItem } from '@/components/ui/Motion';
import './sections.css';

interface CategoryGridProps {
  /** Hide one intention (used for "the other four" cross-links on a collection page). */
  exclude?: IntentionHandle;
  /** 'count' shows live piece counts; 'cta' shows "Shop the line". */
  meta?: 'count' | 'cta';
  headingLevel?: 'h2' | 'h3';
}

/** Photo direction for each intention card (Homepage V2 #5). */
const INTENTION_PHOTO: Record<string, string> = {
  calm: 'amethyst', strength: 'black onyx', confidence: 'sunstone', love: 'pink opal', clarity: 'labradorite',
};

/**
 * home-intentions (Homepage V2 #5) — five plain cards, no piece counts (counts advertised a thin
 * catalog; vertical text was slow to scan and broke on mobile).
 */
export function IntentionCards() {
  return (
    <Stagger as="ul" className="icards" role="list" gap={0.07}>
      {intentions.map((i) => (
        <StaggerItem key={i.handle}>
          <Link className="icard" to={`/collections/${i.handle}`}>
            <span className="icard__photo" style={{ background: i.gradient }} aria-hidden="true">
              <span className="icard__note">Photo · {INTENTION_PHOTO[i.handle]}</span>
            </span>
            <h3 className="icard__title">{i.title}</h3>
            <span className="icard__line">{i.short}</span>
            <span className="icard__cta">Shop the line <span aria-hidden="true">→</span></span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Shop-by-intention tiles (collection-cross-links). */
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

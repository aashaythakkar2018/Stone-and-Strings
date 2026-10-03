import { Link } from 'react-router-dom';
import type { MegaColumn } from '@/data/navigation';
import { intentions } from '@/data/intentions';

interface MegaMenuProps {
  id: string;
  columns: MegaColumn[];
  open: boolean;
  onNavigate: () => void;
}

/** Desktop Shop dropdown: intentions, stones, browse links, and a feature tile. */
export function MegaMenu({ id, columns, open, onNavigate }: MegaMenuProps) {
  const feature = intentions[1]; // Strength & Steadiness — the flagship collection (handoff §4)
  return (
    <div id={id} className={`mega${open ? ' is-open' : ''}`} inert={!open}>
      <div className="mega__in">
        {columns.map((col) => (
          <div className="mega__col" key={col.heading}>
            <p className="mega__heading">{col.heading}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} onClick={onNavigate}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link to={`/collections/${feature.handle}`} className="mega__feature" style={{ background: feature.gradient }} onClick={onNavigate}>
          <span className="mega__feature-eyebrow">The steadiness line</span>
          <span className="mega__feature-title">{feature.title}</span>
          <span className="mega__feature-cta">Shop the line →</span>
        </Link>
      </div>
    </div>
  );
}

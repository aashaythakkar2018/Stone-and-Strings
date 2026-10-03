import { Link, NavLink } from 'react-router-dom';
import { primaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { Drawer } from '@/components/ui/Drawer';
import { AccordionItem } from '@/components/ui/Primitives';
import { Logo } from '@/components/brand/Logo';
import { IconSearch } from '@/components/ui/Icons';
import './MobileMenu.css';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}

/** Mobile navigation — a designed panel, not a squeezed desktop nav. */
export function MobileMenu({ open, onClose, onSearch }: MobileMenuProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="left"
      className="mmenu"
      title={<Logo className="mmenu__logo" title="Stone & Strings menu" />}
      footer={
        <div className="mmenu__foot">
          <Link to="/account" onClick={onClose}>Account</Link>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      }
    >
      <button type="button" className="mmenu__search" onClick={onSearch}>
        <IconSearch /> Search bracelets, stones, intentions
      </button>
      <nav aria-label="Mobile">
        {primaryNav.map((item) =>
          item.mega ? (
            <div className="mmenu__group" key={item.label}>
              {item.mega.map((col, i) => (
                <AccordionItem key={col.heading} title={col.heading === 'Browse' ? 'Browse all' : `Shop ${col.heading.toLowerCase()}`} defaultOpen={i === 0}>
                  <ul className="mmenu__sub">
                    {col.links.map((l) => (
                      <li key={l.to}><Link to={l.to} onClick={onClose}>{l.label}</Link></li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          ) : (
            <NavLink key={item.label} to={item.to} className="mmenu__link" onClick={onClose}>
              {item.label}
            </NavLink>
          ),
        )}
        <NavLink to="/pages/faq" className="mmenu__link" onClick={onClose}>FAQ</NavLink>
        <NavLink to="/pages/contact" className="mmenu__link" onClick={onClose}>Contact</NavLink>
      </nav>
      <p className="mmenu__tag script">{site.tagline}</p>
    </Drawer>
  );
}

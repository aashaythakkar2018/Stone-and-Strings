import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { primaryNav } from '@/data/navigation';
import { useCart } from '@/hooks/useCart';
import { Logo } from '@/components/brand/Logo';
import { IconBag, IconMenu, IconSearch } from '@/components/ui/Icons';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import './Header.css';

export function Header() {
  const { totals, openCart } = useCart();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(totals.itemCount);
  const megaWrap = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Cart count bump feedback.
  useEffect(() => {
    if (totals.itemCount > prevCount.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 500);
      prevCount.current = totals.itemCount;
      return () => window.clearTimeout(t);
    }
    prevCount.current = totals.itemCount;
  }, [totals.itemCount]);

  // Mega menu: outside click / Escape.
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!megaWrap.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        megaWrap.current?.querySelector<HTMLButtonElement>('.nav__trigger')?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [megaOpen]);

  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const count = totals.itemCount;
  const cartLabel = `Cart, ${count} ${count === 1 ? 'item' : 'items'}`;

  return (
    <>
      <header className={`hdr${scrolled ? ' is-scrolled' : ''}${megaOpen ? ' has-mega' : ''}`}>
        <div className="hdr__in">
          <button type="button" className="hdr__burger icon-btn" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <IconMenu />
          </button>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {primaryNav.map((item) =>
                item.mega ? (
                  <li key={item.label} ref={megaWrap} className="nav__item nav__item--mega" onPointerEnter={(e) => e.pointerType === 'mouse' && hoverOpen()} onPointerLeave={(e) => e.pointerType === 'mouse' && hoverClose()}>
                    <button
                      type="button"
                      className={`nav__link nav__trigger${pathname.startsWith('/collections') ? ' is-current' : ''}`}
                      aria-expanded={megaOpen}
                      aria-controls="mega-shop"
                      onClick={() => setMegaOpen((o) => !o)}
                    >
                      {item.label}
                    </button>
                    <MegaMenu id="mega-shop" columns={item.mega} open={megaOpen} onNavigate={() => setMegaOpen(false)} />
                  </li>
                ) : (
                  <li key={item.label} className="nav__item">
                    <NavLink to={item.to} className={({ isActive }) => `nav__link${isActive ? ' is-current' : ''}`}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <Link className="brand" to="/" aria-label="Stone & Strings — home">
            <Logo className="brand__logo" title="" />
          </Link>

          <div className="util">
            <button type="button" className="util__link util__text" onClick={() => setSearchOpen(true)}>Search</button>
            <Link className="util__link util__text" to="/account">Account</Link>
            <button type="button" className="util__link util__text" onClick={openCart} aria-label={cartLabel}>
              Cart<span className={`cart-dot${bump ? ' is-bump' : ''}`} aria-hidden="true">{count}</span>
            </button>
            <button type="button" className="icon-btn util__icon" onClick={() => setSearchOpen(true)} aria-label="Search">
              <IconSearch />
            </button>
            <button type="button" className="icon-btn util__icon util__bag" onClick={openCart} aria-label={cartLabel}>
              <IconBag />
              {count > 0 && <span className={`cart-dot cart-dot--float${bump ? ' is-bump' : ''}`} aria-hidden="true">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => { setMenuOpen(false); setSearchOpen(true); }} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

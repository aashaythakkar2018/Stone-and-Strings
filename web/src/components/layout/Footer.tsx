import { Link } from 'react-router-dom';
import { footerNav } from '@/data/navigation';
import { site } from '@/data/site';
import { Logo } from '@/components/brand/Logo';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap foot__wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <Link to="/" aria-label="Stone & Strings — home" className="foot__logo-link">
              <Logo className="foot__logo" title="" />
            </Link>
            <div className="beads" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <p className="foot__blurb">
              Handmade gemstone bracelets, strung to order in Georgia. Meaning, made modern — and every material told honestly.
            </p>
          </div>
          {footerNav.map((col) => (
            <nav className="foot__col" aria-label={col.heading} key={col.heading}>
              <h2 className="foot__heading">{col.heading}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.to} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    ) : (
                      <Link to={l.to}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="foot__bot">
          <span>© {year} {site.name} · Made in {site.location}</span>
          <span className="foot__legal">
            <Link to="/policies/shipping-policy">Shipping &amp; returns</Link>
            <Link to="/policies/privacy-policy">Privacy</Link>
            <Link to="/policies/terms-of-service">Terms</Link>
          </span>
          <span className="script foot__tag">{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

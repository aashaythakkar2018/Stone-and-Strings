import { Button } from '@/components/ui/Button';
import { IconCheck } from '@/components/ui/Icons';
import { useSizeGuide } from '@/components/product/SizeGuide';
import { heroTrust } from '@/data/site';
import windowShadow from '@/assets/images/window-shadow.webp';
import './sections.css';

/**
 * home-hero (Homepage V2 #3) — the only H1 on the homepage. Leads with the disclosure promise
 * (the moat: honest labeling + a trained gemologist) instead of "meaning", which moves to the body.
 * The photo panel keeps the brand-kit window-light treatment until the real shoot lands.
 */
export function Hero() {
  const { openSizeGuide } = useSizeGuide();
  return (
    <section id="top" className="hero" data-ss-section="home-hero" aria-label="Introduction">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow hero__item" style={{ '--i': 0 } as React.CSSProperties}>
            Handmade by a trained gemologist · Georgia, USA
          </p>
          <h1 className="hero__item" style={{ '--i': 1 } as React.CSSProperties}>
            Every stone,<br /><em>honestly labeled.</em>
          </h1>
          <p className="hero__lede hero__item" style={{ '--i': 2 } as React.CSSProperties}>
            Gemstone bracelets strung one at a time, chosen for the moment you're in. We tell you what's natural, what's
            dyed and what's plated, in plain words, before you buy.
          </p>
          <div className="hero__cta hero__item" style={{ '--i': 3 } as React.CSSProperties}>
            <Button to="/#shop" variant="ink">Shop by intention</Button>
            <Button variant="ghost" onClick={openSizeGuide} aria-haspopup="dialog">Find your size</Button>
          </div>
          <ul className="hero__trust hero__item" style={{ '--i': 4 } as React.CSSProperties} role="list">
            {heroTrust.map((t) => (
              <li key={t}><IconCheck aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>

        {/* PRODUCTION IMG: Vidhi's hands stringing a bracelet, natural light (4:5) */}
        <div className="hero__photo" role="img" aria-label="Vidhi's hands stringing a gemstone bracelet in natural light">
          <div className="hero__shadow" style={{ backgroundImage: `url(${windowShadow})` }} aria-hidden="true" />
          <span className="hero__photo-note" aria-hidden="true">Photo · Vidhi's hands stringing a bracelet, natural light</span>
        </div>
      </div>
    </section>
  );
}

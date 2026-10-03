import { Button } from '@/components/ui/Button';
import './sections.css';

/**
 * home-hero — the only H1 on the homepage. The visual reproduces the brand-kit cover:
 * rust field with the window-light shadow overlay (extracted from the kit).
 */
export function Hero() {
  return (
    <section className="hero" data-ss-section="home-hero" aria-label="Introduction">
      <div className="hero__copy">
        <p className="eyebrow">Handmade · small-batch · strung to order</p>
        <h1>Handmade gemstone bracelets, <em>worn for meaning</em></h1>
        <p className="hero__lede">
          Strung one at a time in a small Georgia studio — chosen for the moment you're in, and labelled with the
          honest truth of every material inside. This is jewellery you understand before you wear it.
        </p>
        <div className="hero__cta">
          <Button to="/collections/all">Shop by intention</Button>
          <Button to="/pages/custom" variant="ghost">Design a custom piece</Button>
        </div>
      </div>
      <div className="hero__visual" role="img" aria-label="Warm window light falling across a rust-toned surface — Stone & Strings">
        <div className="hero__shadow" aria-hidden="true" />
        <div className="hero__script" aria-hidden="true">
          <span className="script">made for the way<br />you move through the day</span>
        </div>
        <span className="hero__tag">Vidhi's hands · natural light</span>
      </div>
    </section>
  );
}

import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { IconGlobe, IconInstagram, IconPin } from './Icons';
import './HeroSection.css';

/**
 * Split hero (port of the "hero-section-2" component to this codebase's CSS system).
 * Layout: content column (logo row → headline → rule → lede → CTA → info row) beside an image
 * panel revealed with a diagonal clip-path. Motion is CSS: a staggered fade-up for the content
 * and a clip-path wipe for the panel; prefers-reduced-motion shows the final state immediately.
 */

type InfoType = 'website' | 'instagram' | 'location';

export interface HeroInfoItem {
  type: InfoType;
  label: string;
  href?: string;
}

export interface HeroSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  brand?: { text: string };
  slogan?: string;
  title: ReactNode;
  subtitle: string;
  callToAction: { text: string; to: string };
  secondaryAction?: { text: string; to: string };
  /** Texture blended over the panel's rust ground (multiply). */
  backgroundImage?: string;
  /** Accessible description of the panel visual. */
  imageAlt: string;
  /** Overlay content for the panel (script caption, tag). */
  panel?: ReactNode;
  info: HeroInfoItem[];
}

const INFO_ICON: Record<InfoType, typeof IconGlobe> = {
  website: IconGlobe,
  instagram: IconInstagram,
  location: IconPin,
};

/** `--i` sets each element's place in the entrance stagger. */
const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { className = '', brand, slogan, title, subtitle, callToAction, secondaryAction, backgroundImage, imageAlt, panel, info, ...props },
  ref,
) {
  return (
    <section ref={ref} className={`hero2 ${className}`.trim()} {...props}>
      <div className="hero2__content">
        <div>
          {brand && (
            <header className="hero2__brand hero2__item" style={stagger(0)}>
              <Logo variant="mark" className="hero2__mark" title="" />
              <div>
                <p className="hero2__brand-text">{brand.text}</p>
                {slogan && <p className="hero2__slogan">{slogan}</p>}
              </div>
            </header>
          )}

          <div className="hero2__main">
            <h1 className="hero2__title hero2__item" style={stagger(1)}>{title}</h1>
            <div className="hero2__rule hero2__item" style={stagger(2)} aria-hidden="true" />
            <p className="hero2__subtitle hero2__item" style={stagger(3)}>{subtitle}</p>
            <div className="hero2__actions hero2__item" style={stagger(4)}>
              <Link to={callToAction.to} className="hero2__cta">{callToAction.text} <span aria-hidden="true">→</span></Link>
              {secondaryAction && <Link to={secondaryAction.to} className="hero2__cta hero2__cta--secondary">{secondaryAction.text}</Link>}
            </div>
          </div>
        </div>

        <footer className="hero2__info hero2__item" style={stagger(5)}>
          <ul role="list">
            {info.map((item) => {
              const Icon = INFO_ICON[item.type];
              return (
                <li key={item.type}>
                  <Icon className="hero2__info-icon" />
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </footer>
      </div>

      <div className="hero2__panel" role="img" aria-label={imageAlt}>
        {backgroundImage && <div className="hero2__texture" style={{ backgroundImage: `url(${backgroundImage})` }} aria-hidden="true" />}
        {panel}
      </div>
    </section>
  );
});

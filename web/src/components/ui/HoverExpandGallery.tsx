import { useRef, useState, type CSSProperties, type PointerEvent, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './HoverExpandGallery.css';

/**
 * Hover-expand gallery (port of 21st.dev "hover-expand-gallery" to this codebase's CSS system).
 * Desktop (≥1024px): a row of rail-width panels with rotated labels; the hovered / focused panel's
 * flex-basis grows to reveal its art and copy. Below 1024px it becomes a vertical accordion.
 * Each panel is a link: mouse hover opens it and a click navigates; on touch the first tap opens a
 * closed panel and the second follows the link. prefers-reduced-motion drops the transitions.
 */

export interface HoverExpandItem {
  title: string;
  /** Short line shown on the open panel. */
  description?: string;
  /** Small caps label at the top of the rail (open panel only) — e.g. a piece count. */
  meta?: string;
  /** Any CSS background; drawn behind `src`, or alone when there is no image. */
  accent?: string;
  src?: string;
  alt?: string;
  to: string;
  /** Text of the in-panel call to action. */
  cta?: string;
}

export interface HoverExpandGalleryProps {
  items: HoverExpandItem[];
  /** Desktop row height (definite length). */
  height?: string;
  /** Closed-panel / label-rail width on desktop, px. */
  railWidth?: number;
  /** Cap on the open panel's width on desktop, px. */
  maxOpenWidth?: number;
  /** Open panel's art height below 1024px, px. */
  mobileImageHeight?: number;
  defaultIndex?: number;
  /** Open/close duration, ms. */
  duration?: number;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function HoverExpandGallery({
  items,
  height = '540px',
  railWidth = 76,
  maxOpenWidth = 820,
  mobileImageHeight = 300,
  defaultIndex = 0,
  duration = 620,
  headingLevel: H = 'h3',
  className = '',
}: HoverExpandGalleryProps) {
  const [active, setActive] = useState(defaultIndex);
  const pointer = useRef<string>('mouse');

  const rootVars = {
    '--hx-h': height,
    '--hx-rail': `${railWidth}px`,
    '--hx-max': `${maxOpenWidth}px`,
    '--hx-t': `${duration}ms`,
    '--hx-img': `${mobileImageHeight}px`,
  } as CSSProperties;

  return (
    <ul className={`hx ${className}`.trim()} style={rootVars} role="list">
      {items.map((item, index) => {
        const isOpen = index === active;
        const onPointerDown = (e: PointerEvent) => { pointer.current = e.pointerType; };
        const onClick = (e: MouseEvent) => {
          // Touch / pen: first tap opens, second navigates.
          if (!isOpen && pointer.current !== 'mouse') {
            e.preventDefault();
            setActive(index);
          }
          pointer.current = 'mouse';
        };
        return (
          <li key={item.to} className={`hx__item${isOpen ? ' is-open' : ''}`}>
            <Link
              to={item.to}
              className="hx__panel"
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(index); }}
              onPointerDown={onPointerDown}
              onFocus={() => setActive(index)}
              onClick={onClick}
            >
              <span className="hx__reveal">
                <span className="hx__reveal-in">
                  <span className="hx__art" style={{ background: item.accent }} aria-hidden="true">
                    {item.src && <img src={item.src} alt="" draggable={false} />}
                  </span>
                </span>
              </span>

              <span className="hx__rail" aria-hidden="true">
                <span className="hx__rail-title">{item.title}</span>
                <span className="hx__rail-num">{String(index + 1).padStart(2, '0')}</span>
              </span>

              <span className="hx__copy">
                {item.meta && <span className="hx__meta">{item.meta}</span>}
                <H className="hx__title">{item.title}</H>
                {item.description && <span className="hx__desc">{item.description}</span>}
                {item.cta && <span className="hx__cta">{item.cta} <span aria-hidden="true">→</span></span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

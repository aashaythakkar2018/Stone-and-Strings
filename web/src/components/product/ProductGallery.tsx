import { useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import type { Product } from '@/types/product';
import { SmartImage } from '@/components/ui/SmartImage';
import { ProductBadge } from './ProductBits';
import './ProductPage.css';

/** Thumbnails + main image. Arrow keys move between thumbs; swipe on touch. */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images.length ? product.images : [{ tone: 'sand' as const, alt: product.fullTitle }];
  const [active, setActive] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const go = (i: number, focus = false) => {
    const n = (i + images.length) % images.length;
    setActive(n);
    if (focus) thumbs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); go(active + 1, true); }
    if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); go(active - 1, true); }
  };

  const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <div className={`gallery${images.length < 2 ? ' gallery--single' : ''}`} aria-roledescription="carousel" aria-label="Product images">
      {images.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Choose image" aria-orientation="vertical" onKeyDown={onKey}>
          {images.map((img, i) => (
            <button
              key={i}
              ref={(el) => { thumbs.current[i] = el; }}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="gallery-main"
              tabIndex={i === active ? 0 : -1}
              className={`gallery__thumb${i === active ? ' is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Image ${i + 1} of ${images.length}: ${img.alt}`}
            >
              <SmartImage image={img} showCaption={false} />
            </button>
          ))}
        </div>
      )}
      <div id="gallery-main" className="gallery__main" role="tabpanel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {images.map((img, i) => (
          <div key={i} className={`gallery__slide${i === active ? ' is-active' : ''}`} aria-hidden={i !== active}>
            <SmartImage image={img} eager={i === 0} sizes="(max-width: 1080px) 100vw, 55vw">
              {i === 0 && <ProductBadge product={product} />}
            </SmartImage>
          </div>
        ))}
        {images.length > 1 && (
          <div className="gallery__dots" aria-hidden="true">
            {images.map((_, i) => <span key={i} className={i === active ? 'is-active' : ''} />)}
          </div>
        )}
      </div>
    </div>
  );
}

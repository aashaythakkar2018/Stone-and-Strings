import { useState, type ReactNode } from 'react';
import type { ProductImage } from '@/types/product';
import { placeholderClass } from '@/utils/imageUtils';

interface SmartImageProps {
  image: ProductImage;
  className?: string;
  sizes?: string;
  eager?: boolean;
  showCaption?: boolean;
  /** Overlays such as badges. */
  children?: ReactNode;
}

/**
 * Renders a real photo when `src` exists (lazy, fades in on load) and falls back to the
 * brand-toned placeholder when it is missing or fails to load — never a broken image.
 */
export function SmartImage({ image, className = '', sizes, eager, showCaption = true, children }: SmartImageProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>(image.src ? 'loading' : 'error');
  const usePlaceholder = !image.src || state === 'error';

  return (
    <div
      className={`smart-img ${placeholderClass(image.tone)} ${className}`}
      role={usePlaceholder ? 'img' : undefined}
      aria-label={usePlaceholder ? image.alt : undefined}
    >
      {!usePlaceholder && (
        <img
          src={image.src}
          alt={image.alt}
          sizes={sizes}
          width={image.width}
          height={image.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`smart-img__img${state === 'loaded' ? ' is-loaded' : ''}`}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
      {usePlaceholder && showCaption && image.caption && <span className="ph__cap" aria-hidden="true">{image.caption}</span>}
      {children}
    </div>
  );
}

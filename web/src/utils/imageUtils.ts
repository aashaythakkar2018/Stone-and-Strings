import type { PlaceholderTone, Product, ProductImage } from '@/types/product';

const DARK_TONES: PlaceholderTone[] = ['rust', 'olive', 'indigo', 'dusk', 'violet', 'sky'];

export function placeholderClass(tone: PlaceholderTone): string {
  return `ph ph--${tone} ph--grain`;
}

export function isDarkTone(tone: PlaceholderTone): boolean {
  return DARK_TONES.includes(tone);
}

/** Always returns a usable image record, even for products with no images yet. */
export function primaryImage(product: Product): ProductImage {
  return product.images[0] ?? { tone: 'sand', alt: product.fullTitle };
}

/** Absolute URL for OG tags / JSON-LD. */
export function absoluteUrl(path: string, origin: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${origin.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
}

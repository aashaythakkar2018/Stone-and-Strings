/**
 * Photo lookup for the product shoot. Files live in src/assets/{products,editorial} and are
 * bundled by Vite, so URLs get hashed filenames and honor the deploy base path automatically.
 * (src/assets/shoot holds the other photographed designs plus two spare editorial shots, ready
 * to use; it is not bundled until something imports it. See src/assets/README.md.)
 */
const urls = import.meta.glob('/src/assets/{products,editorial}/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** `photo('products/held-ground/01')` → bundled URL, or undefined (a brand-toned placeholder renders instead). */
export function photo(key: string): string | undefined {
  const url = urls[`/src/assets/${key}.webp`];
  if (!url && import.meta.env.DEV) console.warn(`[photos] missing photo: ${key}`);
  return url;
}

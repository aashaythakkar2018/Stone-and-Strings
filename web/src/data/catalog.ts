/**
 * Catalog access layer. Every page reads products/collections through these functions,
 * never from the raw arrays — so swapping in a real backend later only touches this file.
 */
import type { Collection } from '@/types/collection';
import type { Product } from '@/types/product';
import { collectionByHandle } from './collections';
import { intentionByHandle } from './intentions';
import { productByHandle, products } from './products';
import { stoneByHandle } from './stones';

export function getProduct(handle: string | undefined): Product | undefined {
  return handle ? productByHandle.get(handle) : undefined;
}

export function getCollection(handle: string | undefined): Collection | undefined {
  return handle ? collectionByHandle.get(handle) : undefined;
}

export function getCollectionProducts(collection: Collection): Product[] {
  const list = products.filter((p) => p.collectionHandles.includes(collection.handle));
  if (collection.kind === 'new') return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return list;
}

export function countCollectionProducts(handle: string): number {
  const c = collectionByHandle.get(handle);
  return c ? getCollectionProducts(c).length : 0;
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

/** Related = same intention first, then shared stones. Never "by price" (PDP prototype note). */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const score = (p: Product) =>
    (p.intention === product.intention ? 2 : 0) + p.stones.filter((s) => product.stones.includes(s)).length;
  return products
    .filter((p) => p.handle !== product.handle)
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s || Number(b.p.available) - Number(a.p.available))
    .slice(0, limit)
    .map(({ p }) => p);
}

function normalise(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, ' ');
}

function searchableText(p: Product): string {
  return normalise(
    [
      p.title,
      p.fullTitle,
      p.description,
      p.category,
      p.materialsLine,
      intentionByHandle.get(p.intention)?.title ?? '',
      ...p.stones.map((s) => stoneByHandle.get(s)?.name ?? s),
      ...p.tags,
    ].join(' '),
  );
}

const index = products.map((p) => ({ p, text: searchableText(p), title: normalise(p.fullTitle) }));

/** Case-insensitive search across title, description, category, stones, intention and tags. All terms must match. */
export function searchProducts(query: string): Product[] {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return index
    .filter(({ text }) => terms.every((t) => text.includes(t)))
    .sort((a, b) => {
      const at = terms.filter((t) => a.title.includes(t)).length;
      const bt = terms.filter((t) => b.title.includes(t)).length;
      return bt - at || Number(b.p.available) - Number(a.p.available);
    })
    .map(({ p }) => p);
}

export { products as allProducts };

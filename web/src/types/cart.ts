import type { Product, ProductVariant } from './product';

/** What is persisted: references only, so prices always come from the catalog. */
export interface CartLine {
  variantId: string;
  productHandle: string;
  quantity: number;
}

/** A cart line joined with live catalog data for rendering. */
export interface ResolvedCartLine extends CartLine {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
}

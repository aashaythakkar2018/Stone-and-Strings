/** The five locked intentions (handoff §3 `custom.intention`). */
export type IntentionHandle = 'calm' | 'strength' | 'confidence' | 'love' | 'clarity';

/** Drives the treatment badge colour — `custom.treatment_status` in the metafield spec. */
export type TreatmentStatus = 'natural' | 'dyed' | 'plated' | 'coated';

/** Brand-toned gradient used whenever a real photograph is missing or fails to load. */
export type PlaceholderTone =
  | 'rust' | 'warm' | 'olive' | 'sand' | 'indigo' | 'dusk' | 'violet' | 'rose' | 'sky';

export interface ProductImage {
  /** Real photo URL. Omit until photography exists — a placeholder renders instead. */
  src?: string;
  alt: string;
  tone: PlaceholderTone;
  /** Short caption shown on the placeholder (art direction note). */
  caption?: string;
  width?: number;
  height?: number;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  options: Record<string, string>;
  price: number;
  compareAtPrice?: number;
  available: boolean;
}

export interface MaterialRow {
  label: string;
  value: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  handle: string;
  /** Short display name, e.g. "Stone of Insight". */
  title: string;
  /** Full product name used for the H1 and SEO, e.g. "Stone of Insight — Labradorite × Clear Quartz Bracelet". */
  fullTitle: string;
  description: string;
  seoDescription?: string;
  /** Lowest variant price. */
  price: number;
  compareAtPrice?: number;
  currency: 'USD';
  /** True when the founder hasn't confirmed a price yet — never shown as purchasable. */
  pricePending?: boolean;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  available: boolean;
  tags: string[];
  category: string;
  collectionHandles: string[];
  intention: IntentionHandle;
  /** Stone handles (see data/stones.ts). */
  stones: string[];
  treatment: TreatmentStatus;
  /** One-line materials summary under the title. */
  materialsLine: string;
  /** Short label pill next to the price (tier). */
  tierLabel?: string;
  materials?: MaterialRow[];
  /** False when origin / hardware / bead size still need confirming from the founder. */
  materialsComplete: boolean;
  founderNote?: string;
  affirmation?: string;
  stoneStory?: { heading: string; body: string };
  faqs?: FaqEntry[];
  featured?: boolean;
  /** ISO date — drives "Newest" sort. */
  createdAt: string;
}

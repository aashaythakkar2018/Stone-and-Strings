import type { IntentionHandle, PlaceholderTone } from './product';

export type CollectionKind = 'all' | 'intention' | 'stone' | 'new';

export interface Collection {
  handle: string;
  kind: CollectionKind;
  title: string;
  eyebrow: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  tone: PlaceholderTone;
  /** For intention collections. */
  intention?: IntentionHandle;
  /** For stone collections — the stone handle. */
  stone?: string;
}

export interface Intention {
  handle: IntentionHandle;
  title: string;
  short: string;
  /** CSS gradient used on the intention tile. */
  gradient: string;
}

export interface Stone {
  handle: string;
  name: string;
  tagline: string;
  /** CSS gradient used for the stone "dot". */
  gradient: string;
  /** Cultural / historical context only — never health claims. */
  story: string;
  care?: string;
  /** Has its own shop-by-stone collection page. */
  hasCollection?: boolean;
}

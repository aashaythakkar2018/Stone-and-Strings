import { productByHandle } from './products';
import type { Product } from '@/types/product';

/**
 * Homepage V2 #9 — "Build your stack": pairs styled by Vidhi. Every pair clears the
 * $125 free-shipping threshold, which is the nudge toward the second piece.
 */
export interface Stack {
  id: string;
  title: string;
  mood: string;
  handles: [string, string];
}

export const stacks: Stack[] = [
  { id: 'quiet-hour', title: 'The Quiet Hour', mood: 'Calm + Clarity', handles: ['still-waters-amethyst-pearl-bracelet', 'clear-path-apatite-pearl-bracelet'] },
  { id: 'warm-tender', title: 'Warm & Tender', mood: 'Courage + Love', handles: ['lit-from-within-sunstone-freshwater-pearl-bracelet', 'tender-contrast-pink-opal-black-spinel-bracelet'] },
  { id: 'steady-mind', title: 'Steady Mind', mood: 'Focus + Strength', handles: ['stone-of-insight-labradorite-clear-quartz-bracelet', 'held-ground-black-onyx-clear-quartz-bracelet'] },
];

export function stackProducts(stack: Stack): Product[] {
  return stack.handles.map((h) => productByHandle.get(h)).filter((p): p is Product => !!p && p.available && !p.pricePending);
}

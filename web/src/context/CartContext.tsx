import { createContext, useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { variantById } from '@/data/products';
import type { CartLine, CartTotals, ResolvedCartLine } from '@/types/cart';

const STORAGE_KEY = 'ss-cart-v1';
const MAX_QTY = 10;

type Action =
  | { type: 'add'; variantId: string; productHandle: string; quantity: number }
  | { type: 'setQty'; variantId: string; quantity: number }
  | { type: 'remove'; variantId: string }
  | { type: 'clear' }
  | { type: 'replace'; lines: CartLine[] };

function clampQty(n: number) {
  return Math.max(0, Math.min(MAX_QTY, Math.floor(n)));
}

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((l) => l.variantId === action.variantId);
      if (existing) {
        return state.map((l) =>
          l.variantId === action.variantId ? { ...l, quantity: clampQty(l.quantity + action.quantity) } : l,
        );
      }
      return [...state, { variantId: action.variantId, productHandle: action.productHandle, quantity: clampQty(action.quantity) }];
    }
    case 'setQty': {
      const q = clampQty(action.quantity);
      return q === 0
        ? state.filter((l) => l.variantId !== action.variantId)
        : state.map((l) => (l.variantId === action.variantId ? { ...l, quantity: q } : l));
    }
    case 'remove':
      return state.filter((l) => l.variantId !== action.variantId);
    case 'clear':
      return [];
    case 'replace':
      return action.lines;
  }
}

/** Reads persisted lines, dropping anything that no longer exists or can't be bought. */
function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l): l is CartLine => {
      if (!l || typeof l !== 'object') return false;
      const line = l as CartLine;
      const hit = variantById.get(line.variantId);
      return !!hit && hit.variant.available && typeof line.quantity === 'number' && line.quantity > 0;
    }).map((l) => ({ ...l, quantity: clampQty(l.quantity) }));
  } catch {
    return [];
  }
}

export interface CartContextValue {
  lines: ResolvedCartLine[];
  totals: CartTotals;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, opts?: { open?: boolean }) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  maxQty: number;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, dispatch] = useReducer(reducer, undefined, loadLines);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* storage unavailable (private mode) — cart still works for the session */
    }
  }, [raw]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      dispatch({ type: 'replace', lines: loadLines() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const lines = useMemo<ResolvedCartLine[]>(
    () =>
      raw.flatMap((l) => {
        const hit = variantById.get(l.variantId);
        if (!hit) return [];
        return [{ ...l, product: hit.product, variant: hit.variant, lineTotal: hit.variant.price * l.quantity }];
      }),
    [raw],
  );

  const totals = useMemo<CartTotals>(
    () => ({
      itemCount: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    }),
    [lines],
  );

  const addItem = useCallback((variantId: string, quantity = 1, opts?: { open?: boolean }) => {
    const hit = variantById.get(variantId);
    if (!hit || !hit.variant.available) return;
    dispatch({ type: 'add', variantId, productHandle: hit.product.handle, quantity });
    if (opts?.open !== false) setOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addItem,
      setQuantity: (variantId, quantity) => dispatch({ type: 'setQty', variantId, quantity }),
      removeItem: (variantId) => dispatch({ type: 'remove', variantId }),
      clear: () => dispatch({ type: 'clear' }),
      maxQty: MAX_QTY,
    }),
    [lines, totals, isOpen, addItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

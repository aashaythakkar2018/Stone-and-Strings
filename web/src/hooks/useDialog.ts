import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lockCount = 0;

/**
 * Shared behaviour for modal surfaces (drawers, search, menus):
 * scroll lock, Escape to close, focus trap, initial focus, focus return.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = ref.current;

    lockCount += 1;
    document.body.classList.add('is-locked');

    const focusFirst = () => {
      if (!node) return;
      const preferred = node.querySelector<HTMLElement>('[data-autofocus]');
      (preferred ?? node.querySelector<HTMLElement>(FOCUSABLE) ?? node).focus();
    };
    focusFirst();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      lockCount -= 1;
      if (lockCount <= 0) {
        lockCount = 0;
        document.body.classList.remove('is-locked');
      }
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return ref;
}

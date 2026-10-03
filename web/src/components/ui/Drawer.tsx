import { useEffect, useId, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDialog } from '@/hooks/useDialog';
import { IconClose } from './Icons';
import './Drawer.css';

const EXIT_MS = 320;

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  side?: 'left' | 'right';
  children: ReactNode;
  footer?: ReactNode;
  /** Optional class for sizing variants. */
  className?: string;
}

/** Slide-in panel used by the cart, mobile menu and collection filters. */
export function Drawer({ open, onClose, title, side = 'right', children, footer, className = '' }: DrawerProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose);
  const titleId = useId();
  // Keep mounted through the exit animation.
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    // Unmount after the exit animation (timer rather than animationend, which can be skipped).
    const t = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  // Render immediately when opening (so the dialog hook can focus into it), stay mounted while closing.
  if (!open && !mounted) return null;

  return createPortal(
    <div className={`drawer drawer--${side} ${open ? 'is-open' : 'is-closing'} ${className}`} aria-hidden={!open || undefined}>
      <div className="drawer__scrim" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="drawer__head">
          <h2 id={titleId} className="drawer__title">{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="drawer__body">{children}</div>
        {footer && <div className="drawer__foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

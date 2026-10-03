import { useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDialog } from '@/hooks/useDialog';
import { IconClose } from './Icons';
import './Modal.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Visible title; use `labelledBy`-less sr-only title via `hideTitle`. */
  title: string;
  hideTitle?: boolean;
  children: ReactNode;
  /** 'top' sheets slide down from the header (search); 'center' is a classic dialog. */
  placement?: 'top' | 'center';
}

export function Modal({ open, onClose, title, hideTitle, children, placement = 'center' }: ModalProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose);
  const titleId = useId();
  if (!open) return null;
  return createPortal(
    <div className={`modal modal--${placement}`}>
      <div className="modal__scrim" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className="modal__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="modal__head">
          <h2 id={titleId} className={hideTitle ? 'sr-only' : 'modal__title'}>{title}</h2>
          <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

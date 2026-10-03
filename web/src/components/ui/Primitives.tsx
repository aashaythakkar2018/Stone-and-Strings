import { useId, useState, type ReactNode } from 'react';
import { IconChevron, IconMinus, IconPlus } from './Icons';
import './Primitives.css';

/* ── Badge ─────────────────────────────────────────────── */
type BadgeTone = 'natural' | 'disclosed' | 'lead' | 'neutral' | 'sale';

export function Badge({ tone = 'neutral', children, floating = true }: { tone?: BadgeTone; children: ReactNode; floating?: boolean }) {
  return <span className={`badge badge--${tone}${floating ? ' badge--float' : ''}`}>{children}</span>;
}

/* ── QuantitySelector ──────────────────────────────────── */
interface QtyProps {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md';
}

export function QuantitySelector({ value, onChange, min = 1, max = 10, label = 'Quantity', size = 'md' }: QtyProps) {
  return (
    <div className={`qty qty--${size}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
        <IconMinus />
      </button>
      <output aria-live="polite" aria-label={`${label}: ${value}`}>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
        <IconPlus />
      </button>
    </div>
  );
}

/* ── Accordion ─────────────────────────────────────────── */
interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

export function AccordionItem({ title, children, defaultOpen = false, headingLevel: H = 'h3' }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`acc${open ? ' is-open' : ''}`}>
      <H className="acc__h">
        <button type="button" className="acc__btn" aria-expanded={open} aria-controls={`${id}-panel`} id={`${id}-btn`} onClick={() => setOpen((o) => !o)}>
          <span>{title}</span>
          <IconChevron className="acc__icon" />
        </button>
      </H>
      <div className="acc__panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} inert={!open}>
        <div className="acc__inner">
          <div className="acc__content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="accordion">{children}</div>;
}

/* ── Skeleton ──────────────────────────────────────────── */
export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

/* ── Chip (toggle) ─────────────────────────────────────── */
export function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`chip${active ? ' is-active' : ''}`} aria-pressed={!!active} onClick={onClick}>
      {children}
    </button>
  );
}

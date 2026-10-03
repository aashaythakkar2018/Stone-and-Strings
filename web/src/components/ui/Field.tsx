import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { IconChevron } from './Icons';
import './Field.css';

interface FieldShell {
  label: string;
  hint?: ReactNode;
  error?: string;
  hideLabel?: boolean;
  className?: string;
}

function Shell({ id, label, hint, error, hideLabel, className = '', children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'field__label'}>{label}</label>
      {children}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return error ? `${id}-err` : hint ? `${id}-hint` : undefined;
}

export function Input({ label, hint, error, hideLabel, className, id: idProp, ...rest }: FieldShell & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <Shell id={id} label={label} hint={hint} error={error} hideLabel={hideLabel} className={className}>
      <input id={id} className="field__control" aria-invalid={!!error || undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
    </Shell>
  );
}

export function Textarea({ label, hint, error, hideLabel, className, id: idProp, ...rest }: FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <Shell id={id} label={label} hint={hint} error={error} hideLabel={hideLabel} className={className}>
      <textarea id={id} className="field__control field__control--area" aria-invalid={!!error || undefined} aria-describedby={describedBy(id, hint, error)} {...rest} />
    </Shell>
  );
}

interface SelectProps extends FieldShell, SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  compact?: boolean;
}

export function Select({ label, hint, error, hideLabel, className, options, compact, id: idProp, ...rest }: SelectProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <Shell id={id} label={label} hint={hint} error={error} hideLabel={hideLabel} className={`${compact ? 'field--compact' : ''} ${className ?? ''}`}>
      <div className="field__select">
        <select id={id} className="field__control" aria-describedby={describedBy(id, hint, error)} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <IconChevron className="field__chev" />
      </div>
    </Shell>
  );
}

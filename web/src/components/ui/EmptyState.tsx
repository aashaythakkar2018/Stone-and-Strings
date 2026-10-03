import type { ReactNode } from 'react';
import { Logo } from '@/components/brand/Logo';
import '@/components/collection/Collection.css';

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 'h1' | 'h2';
}

/** Shared polished empty state (empty collection, no search results, missing product…). */
export function EmptyState({ title, children, actions, headingLevel: H = 'h2' }: EmptyStateProps) {
  return (
    <div className="empty" role="status">
      <Logo variant="mark" className="empty__mark" title="" />
      <H>{title}</H>
      {children && <p>{children}</p>}
      {actions && <div className="empty__actions">{actions}</div>}
    </div>
  );
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'solid' | 'ghost' | 'cream' | 'ghost-light';

interface Common {
  variant?: Variant;
  full?: boolean;
  children: ReactNode;
  className?: string;
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsLink = Common & { to: string; href?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
type AsAnchor = Common & { href: string; to?: undefined } & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = AsButton | AsLink | AsAnchor;

/** The prototype `.btn` — renders a <Link>, <a> or <button> depending on props. */
export function Button(props: ButtonProps) {
  const { variant = 'solid', full, className = '', children, ...rest } = props;
  const cls = `btn btn--${variant}${full ? ' btn--full' : ''} ${className}`.trim();

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...a } = rest as AsLink;
    return <Link to={to} className={cls} {...a}>{children}</Link>;
  }
  if ('href' in rest && rest.href !== undefined) {
    return <a className={cls} {...(rest as AsAnchor)}>{children}</a>;
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={b.type ?? 'button'} className={cls} {...b}>{children}</button>;
}

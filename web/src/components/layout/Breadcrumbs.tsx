import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { site } from '@/data/site';

export interface Crumb {
  label: string;
  to?: string;
}

/** Visible breadcrumb trail. Pair with `breadcrumbJsonLd` for structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="wrap crumb" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => (
          <Fragment key={`${c.label}-${i}`}>
            <li>
              {c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
            {i < items.length - 1 && <li aria-hidden="true" className="crumb__sep">/</li>}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${site.url}${c.to}` } : {}),
    })),
  };
}

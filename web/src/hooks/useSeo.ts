import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '@/data/site';
import { absoluteUrl } from '@/utils/imageUtils';

export interface SeoOptions {
  title?: string;
  description?: string;
  /** Path for the canonical URL; defaults to the current pathname (no query string). */
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  noindex?: boolean;
  /** JSON-LD objects rendered as <script type="application/ld+json">. */
  jsonLd?: object[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Lightweight head manager (no extra dependency). Canonicals point at the production domain
 * so they are correct the moment the site goes live.
 */
export function useSeo(opts: SeoOptions) {
  const { pathname } = useLocation();
  const title = opts.title ?? site.defaultTitle;
  const description = opts.description ?? site.defaultDescription;
  const canonical = absoluteUrl(opts.canonicalPath ?? pathname, site.url);
  const image = absoluteUrl(opts.image ?? site.ogImage, site.url);
  const ld = JSON.stringify(opts.jsonLd ?? []);

  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', opts.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:site_name', site.name);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', opts.type ?? 'website');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setLink('canonical', canonical);

    const scripts = (JSON.parse(ld) as object[]).map((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = 'page';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, [title, description, canonical, image, ld, opts.type, opts.noindex]);
}

import { intentionCollections, stoneCollections } from './collections';

export interface NavLink {
  label: string;
  to: string;
  external?: boolean;
  /** Rendered as a button that opens the size guide instead of navigating. */
  action?: 'size-guide';
  accent?: boolean;
}

export interface MegaColumn {
  heading: string;
  links: NavLink[];
}

export interface PrimaryNavItem extends NavLink {
  mega?: MegaColumn[];
}

export const primaryNav: PrimaryNavItem[] = [
  {
    label: 'Shop',
    to: '/collections/all',
    mega: [
      {
        heading: 'By intention',
        links: intentionCollections.map((c) => ({ label: c.title, to: `/collections/${c.handle}` })),
      },
      {
        heading: 'By stone',
        links: stoneCollections.map((c) => ({ label: c.title, to: `/collections/${c.handle}` })),
      },
      {
        heading: 'Browse',
        links: [
          { label: 'All bracelets', to: '/collections/all' },
          { label: 'New arrivals', to: '/collections/new' },
          { label: 'Explore every stone', to: '/pages/our-stones' },
        ],
      },
    ],
  },
  // Homepage V2 #2 — gifting gets a path: Gifts goes to the "Build your stack" pairs.
  { label: 'Gifts', to: '/#stack', accent: true },
  { label: 'Custom', to: '/pages/custom' },
  { label: 'Our Stones', to: '/pages/our-stones' },
  { label: 'Meet Vidhi', to: '/pages/about' },
];

/** Homepage V2 #12 — "By intention" goes to the overview, Size guide + Disclosure Standard added, no duplicates. */
export const footerNav: MegaColumn[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'All bracelets', to: '/collections/all' },
      { label: 'By intention', to: '/#shop' },
      { label: 'By stone', to: '/pages/our-stones' },
      { label: 'Gifts & stacks', to: '/#stack' },
    ],
  },
  {
    heading: 'The studio',
    links: [
      { label: 'Meet Vidhi', to: '/pages/about' },
      { label: 'Custom studio', to: '/pages/custom' },
      { label: 'Disclosure Standard', to: '/pages/disclosure' },
      { label: 'Instagram ↗', to: 'https://instagram.com/stoneandstringsofficial', external: true },
    ],
  },
  {
    heading: 'Help & care',
    links: [
      { label: 'Size guide', to: '#', action: 'size-guide' },
      { label: 'Care & repairs', to: '/pages/repairs' },
      { label: 'Shipping & returns', to: '/policies/shipping-policy' },
      { label: 'FAQ · Contact', to: '/pages/faq' },
    ],
  },
];

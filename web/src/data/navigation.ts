import { intentionCollections, stoneCollections } from './collections';

export interface NavLink {
  label: string;
  to: string;
  external?: boolean;
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
  { label: 'Custom', to: '/pages/custom' },
  { label: 'Our Stones', to: '/pages/our-stones' },
  { label: 'Meet Vidhi', to: '/pages/about' },
];

export const footerNav: MegaColumn[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'All bracelets', to: '/collections/all' },
      { label: 'By intention', to: '/collections/calm' },
      { label: 'By stone', to: '/pages/our-stones' },
      { label: 'New arrivals', to: '/collections/new' },
    ],
  },
  {
    heading: 'The studio',
    links: [
      { label: 'Meet Vidhi', to: '/pages/about' },
      { label: 'Custom studio', to: '/pages/custom' },
      { label: 'Our stones', to: '/pages/our-stones' },
      { label: 'Contact', to: '/pages/contact' },
    ],
  },
  {
    heading: 'Help & care',
    links: [
      { label: 'Care guide', to: '/pages/care' },
      { label: 'Repairs & guarantee', to: '/pages/repairs' },
      { label: 'FAQ', to: '/pages/faq' },
      { label: 'Shipping & returns', to: '/policies/shipping-policy' },
      { label: 'Instagram ↗', to: 'https://instagram.com/stoneandstringsofficial', external: true },
    ],
  },
];

/* Minimal line icons (1.5px stroke) drawn to sit with the thin wordmark strokes. */
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export const IconClose = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconMenu = (p: P) => (<svg {...base} {...p}><path d="M3 7h18M3 12h18M3 17h18" /></svg>);
export const IconSearch = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>);
export const IconBag = (p: P) => (<svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>);
export const IconUser = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>);
export const IconPlus = (p: P) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconMinus = (p: P) => (<svg {...base} {...p}><path d="M5 12h14" /></svg>);
export const IconChevron = (p: P) => (<svg {...base} {...p}><path d="M6 9l6 6 6-6" /></svg>);
export const IconArrow = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconFilter = (p: P) => (<svg {...base} {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>);
export const IconCheck = (p: P) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);

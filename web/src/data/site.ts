/** Site-wide brand facts. Copy is taken from the brand kit and approved prototypes. */
export const site = {
  name: 'Stone & Strings',
  tagline: 'Meaning, made modern',
  url: 'https://stoneandstrings.com',
  instagram: 'https://instagram.com/stoneandstringsofficial',
  instagramHandle: '@stoneandstringsofficial',
  founder: 'Vidhi',
  location: 'Georgia, USA',
  defaultTitle: 'Stone & Strings — Handmade Gemstone Bracelets, Made With Meaning',
  defaultDescription:
    'Handmade gemstone bracelets strung to order in a Georgia studio. Honest materials, fully disclosed. Shop by intention — labradorite, jade, amethyst and more.',
  ogImage: '/images/og-default.jpg',
  currency: 'USD',
  repairWindowDays: 30,
  shippingNote: 'Shipping calculated at checkout',
  /** Homepage V2 (#1, #9): free US shipping threshold — drives the cart progress bar. */
  freeShippingThreshold: 125,
  /** Homepage V2 make time. Bracketed = still to confirm with the studio; shown as-is until confirmed. */
  shipsIn: '[3–5] days',
} as const;

/** Homepage V2 #1 — the bar answers shipping cost and arrival date up front. */
export const announcement: { text: string; strong?: boolean; suffix?: string }[] = [
  { text: 'Free US shipping over $125' },
  { text: 'Strung to order, ships in [3–5] days', strong: true },
  { text: 'Every stone honestly labeled' },
];

/** Brand kit p.2 — Founder's brand statement (verbatim, punctuation tidied). */
export const founderStatement =
  'I started my journey with the belief that jewelry is more than an accessory — it’s a story, a memory and a reflection of who you are. From learning under experts to handpicking each gemstone, my goal is to bring authenticity, affordability and meaning into every piece I create. Every bracelet, necklace or ring is not just jewelry, it’s a symbol of individuality, love and timeless beauty.';

/** Brand kit p.3 */
export const mission =
  'To create meaningful, handcrafted jewelry from natural gemstones that not only enhances personal style but also carries stories, emotions, and timeless value — making real, affordable and fashionable jewelry accessible to everyone.';
export const vision =
  'To become a trusted global jewelry brand that redefines handmade gemstone jewelry by blending authenticity, craftsmanship and storytelling — empowering individuals to wear pieces that reflect their journey, memories and uniqueness.';

/** Homepage V2 #6 — four promises: the two practical answers (fit, delivery) join the trust block. */
export const pledges = [
  { title: 'Handmade by Vidhi', body: 'Every piece strung by one pair of gemologist-trained hands. Small batch, never mass-produced.' },
  { title: 'Honest materials', body: 'Natural, treated, dyed or plated: stated on every product page, in plain words.' },
  { title: 'Sized to your wrist', body: 'Pick your size at checkout. Strung to order, ships in [3–5] days.' },
  { title: 'Repaired free', body: 'If a strand breaks in the first 30 days, we restring it at no cost.' },
];

/** Homepage V2 #10 — the one real review, shown with the process proof (no empty "your words, soon" slot). */
export const featuredReview = {
  quote: 'She told me the jade was dyed before I even asked. I’ve never had a jewelry brand be that honest. Bought two more.',
  who: 'Priya · verified buyer',
};

/** Homepage V2 #3 — trust row under the hero CTAs. */
export const heroTrust = ['Natural or dyed, always disclosed', 'Sized to your wrist', 'Free 30-day repair'];

export const trustPoints = [
  'Free 30-day repair on every piece',
  'Handmade to order in Georgia, USA',
  'Natural and dyed stones, always disclosed',
];

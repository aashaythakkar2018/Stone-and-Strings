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
  /** Free-shipping threshold is NOT confirmed (handoff §5: no shipping policy exists yet). */
  shippingNote: 'Shipping calculated at checkout',
} as const;

export const announcement = [
  { text: 'Handmade to order in Georgia, USA' },
  { text: 'Free 30-day repair', strong: true, suffix: ' on every piece' },
  { text: 'Each stone, honestly labelled' },
];

/** Brand kit p.2 — Founder's brand statement (verbatim, punctuation tidied). */
export const founderStatement =
  'I started my journey with the belief that jewelry is more than an accessory — it’s a story, a memory and a reflection of who you are. From learning under experts to handpicking each gemstone, my goal is to bring authenticity, affordability and meaning into every piece I create. Every bracelet, necklace or ring is not just jewelry, it’s a symbol of individuality, love and timeless beauty.';

/** Brand kit p.3 */
export const mission =
  'To create meaningful, handcrafted jewelry from natural gemstones that not only enhances personal style but also carries stories, emotions, and timeless value — making real, affordable and fashionable jewelry accessible to everyone.';
export const vision =
  'To become a trusted global jewelry brand that redefines handmade gemstone jewelry by blending authenticity, craftsmanship and storytelling — empowering individuals to wear pieces that reflect their journey, memories and uniqueness.';

export const pledges = [
  { title: 'Handmade by Vidhi', body: 'Every piece strung by one pair of hands — gemologist-trained, small-batch, never mass-produced.' },
  { title: 'Honest materials', body: "We tell you what's natural and what's dyed or plated. On every product page, in plain words." },
  { title: 'Made in Georgia', body: 'Strung to order in a home studio in the U.S. — and repaired free for the first 30 days.' },
];

/** Homepage prototype "Kind words". */
export const testimonials = [
  { quote: 'She told me the jade was dyed before I even asked. I’ve never had a jewellery brand be that honest — bought two more.', who: 'Priya, first order' },
  { quote: 'The labradorite catches light exactly like she said it would. It feels made for me, because it was.', who: 'A custom piece' },
];

export const trustPoints = [
  'Free 30-day repair on every piece',
  'Handmade to order in Georgia, USA',
  'Natural and dyed stones, always disclosed',
];

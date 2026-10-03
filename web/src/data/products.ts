import type { FaqEntry, Product, ProductVariant } from '@/types/product';

/**
 * CATALOG — local mock data, shaped to map onto Shopify products + metafields later.
 *
 * Only pieces whose name, stones and price appear in the approved prototypes are listed
 * (handoff §5: "do not fabricate products"). Where the founder hasn't yet confirmed origin,
 * hardware or bead size, `materialsComplete` is false and the PDP says so plainly instead of
 * inventing specifics. Images are omitted until real photography exists; each entry carries
 * the art-directed alt text and a brand-toned placeholder.
 */

export const WRIST_SIZES = [
  'Extra Small — up to 5.5"',
  'Small — 5.5"–6.25"',
  'Medium — 6.25"–7"',
  'Large — 7"–7.75"',
] as const;

const SIZE_CODES = ['XS', 'S', 'M', 'L'];

function sizeVariants(handle: string, skuBase: string, price: number, available = true): ProductVariant[] {
  return WRIST_SIZES.map((size, i) => ({
    id: `${handle}--${SIZE_CODES[i].toLowerCase()}`,
    title: size,
    sku: `${skuBase}-${SIZE_CODES[i]}`,
    options: { 'Wrist size': size },
    price,
    available,
  }));
}

const sizeOption = { name: 'Wrist size', values: [...WRIST_SIZES] };

const REPAIR_FAQ: FaqEntry = {
  question: 'What happens if it breaks?',
  answer:
    'Every piece includes a free 30-day repair — Vidhi covers the labour, you cover any replacement materials. After 30 days, repairs are still available for a small materials-and-shipping fee.',
};

export const products: Product[] = [
  {
    id: 'ss-labqz-01',
    handle: 'stone-of-insight-labradorite-clear-quartz-bracelet',
    title: 'Stone of Insight',
    fullTitle: 'Stone of Insight — Labradorite × Clear Quartz Bracelet',
    description:
      'Hand-strung labradorite and clear quartz bracelet with 925 sterling silver beads and clasp. Both stones natural; labradorite cut and polished to reveal its flash, clear quartz left untreated.',
    seoDescription:
      'Handmade labradorite and clear quartz bracelet, 925 sterling silver, hand-strung to order in Georgia. Natural stones — origin, treatment and bead size disclosed in full.',
    price: 118,
    currency: 'USD',
    images: [
      { tone: 'rust', alt: 'Stone of Insight bracelet — labradorite and clear quartz beads with 925 sterling silver clasp, resting on an open hand', caption: 'Labradorite · blue flash' },
      { tone: 'indigo', alt: 'Close-up of labradorite bead showing natural blue flash', caption: 'Labradorite · close-up' },
      { tone: 'sand', alt: 'Bracelet worn on wrist in natural daylight', caption: 'On-wrist · daylight' },
    ],
    options: [sizeOption],
    variants: sizeVariants('stone-of-insight-labradorite-clear-quartz-bracelet', 'SS-LABQZ-01', 118),
    available: true,
    tags: ['labradorite', 'clear quartz', 'sterling silver', 'natural', 'clarity', 'focus', 'insight'],
    category: 'Bracelets',
    collectionHandles: ['all', 'new', 'clarity', 'labradorite'],
    intention: 'clarity',
    stones: ['labradorite', 'clear-quartz'],
    treatment: 'natural',
    materialsLine: 'AAA labradorite · AAA clear quartz · 925 sterling silver',
    tierLabel: 'Sterling silver · natural stone',
    materialsComplete: true,
    materials: [
      { label: 'Stones', value: 'AAA labradorite & AAA clear quartz, 6mm round beads (both)' },
      { label: 'Origin', value: 'Labradorite: Canada, Madagascar, or Finland. Clear quartz: Brazil, Madagascar, or the United States. Origin varies with natural gemstone supply.' },
      { label: 'Treatment', value: 'Natural, essentially untreated. Labradorite is cut and polished to reveal its signature flash; clear quartz is left untreated to preserve its natural clarity.' },
      { label: 'Metal & hardware', value: '925 sterling silver beads and 925 sterling silver lobster clasp' },
      { label: 'Construction', value: 'Hand-strung on durable beading thread, finished with clamshell bead tips, secured with a lobster clasp closure' },
      { label: 'Made by', value: 'Vidhi, strung to order in her Georgia studio' },
    ],
    founderNote:
      'A harmonious blend of labradorite and clear quartz, symbolizing clarity, intuition, and transformation — designed to bring an elegant balance of natural beauty and meaningful intention to your everyday style.',
    affirmation: "I trust my own clarity, and move toward what's next with open eyes.",
    stoneStory: {
      heading: 'Labradorite & clear quartz',
      body:
        "Labradorite is admired in many cultures for its captivating play of colour, and has long been associated with mystery, intuition, and transformation. Clear quartz has been valued throughout history as a symbol of clarity and harmony, used across traditions for its beauty and significance. Paired together, they've become a combination people choose to wear as a personal reminder of clarity, trust in their own judgment, and steady personal growth. These meanings come from cultural and historical tradition, not scientific claims — we tell the story because it's part of why the stone was chosen, not as a promise of what it will do.",
    },
    faqs: [
      { question: 'Is this labradorite natural or treated?', answer: 'Both stones are natural. The labradorite is cut and polished to reveal its signature flash; the clear quartz is left untreated to keep its natural clarity.' },
      { question: 'Why might my labradorite look slightly different from the photos?', answer: "Because it's a natural gemstone, no two labradorite beads show exactly the same flash, tone, or pattern — that variation is part of the stone, not a flaw." },
      REPAIR_FAQ,
    ],
    featured: true,
    createdAt: '2026-09-20',
  },
  {
    id: 'ss-onyqz-01',
    handle: 'held-ground-black-onyx-clear-quartz-bracelet',
    title: 'Held Ground',
    fullTitle: 'Held Ground — Black Onyx & Clear Quartz Bracelet',
    description:
      "The base of our steadiness line: black onyx paired with clear quartz, built to be worn daily, not just on hard days. The onyx is dyed to reach its deep, even black — and we say so plainly.",
    price: 98,
    currency: 'USD',
    images: [
      { tone: 'dusk', alt: 'Held Ground bracelet — black onyx and clear quartz beads held in an open hand', caption: 'Black onyx · in-hand' },
      { tone: 'olive', alt: 'Black onyx and clear quartz beads, close-up', caption: 'Onyx · close-up' },
    ],
    options: [sizeOption],
    variants: sizeVariants('held-ground-black-onyx-clear-quartz-bracelet', 'SS-ONYQZ-01', 98),
    available: true,
    tags: ['black onyx', 'clear quartz', 'dyed', 'strength', 'steadiness', 'grounding'],
    category: 'Bracelets',
    collectionHandles: ['all', 'new', 'strength'],
    intention: 'strength',
    stones: ['black-onyx', 'clear-quartz'],
    treatment: 'dyed',
    materialsLine: 'Black onyx (dyed) · clear quartz',
    materialsComplete: false,
    materials: [
      { label: 'Stones', value: 'Black onyx & clear quartz' },
      { label: 'Treatment', value: 'Black onyx: dyed to an even, deep black — disclosed. Clear quartz: untreated.' },
      { label: 'Made by', value: 'Vidhi, strung to order in her Georgia studio' },
    ],
    stoneStory: {
      heading: 'Black onyx & clear quartz',
      body:
        'Black onyx has long been worn as a grounding stone — a piece people reach for on the days they need to hold steady. Clear quartz has been valued across traditions as a symbol of clarity. These meanings come from cultural tradition, not scientific claims.',
    },
    faqs: [
      { question: 'Why is the onyx dyed?', answer: 'Most black onyx on the market is dyed to reach a consistent deep black. Ours is too — we disclose it rather than leave you to guess.' },
      REPAIR_FAQ,
    ],
    featured: true,
    createdAt: '2026-09-12',
  },
  {
    id: 'ss-sunpl-01',
    handle: 'lit-from-within-sunstone-freshwater-pearl-bracelet',
    title: 'Lit From Within',
    fullTitle: 'Lit From Within — Sunstone & Freshwater Pearl Bracelet',
    description:
      'Warm, glittering sunstone strung with freshwater pearl — a bright, easy piece for the days you want to step forward. Both stones natural.',
    price: 66,
    currency: 'USD',
    images: [
      { tone: 'warm', alt: 'Lit From Within bracelet — sunstone and freshwater pearl beads in warm light', caption: 'Sunstone · warm light' },
      { tone: 'sand', alt: 'Sunstone bead shimmer, close-up', caption: 'Sunstone · shimmer' },
    ],
    options: [sizeOption],
    variants: sizeVariants('lit-from-within-sunstone-freshwater-pearl-bracelet', 'SS-SUNPL-01', 66),
    available: true,
    tags: ['sunstone', 'freshwater pearl', 'pearl', 'natural', 'confidence', 'courage', 'warm'],
    category: 'Bracelets',
    collectionHandles: ['all', 'new', 'confidence', 'sunstone', 'pearl'],
    intention: 'confidence',
    stones: ['sunstone', 'freshwater-pearl'],
    treatment: 'natural',
    materialsLine: 'Sunstone · freshwater pearl',
    materialsComplete: false,
    materials: [
      { label: 'Stones', value: 'Sunstone & freshwater pearl' },
      { label: 'Treatment', value: 'Natural' },
      { label: 'Made by', value: 'Vidhi, strung to order in her Georgia studio' },
    ],
    faqs: [REPAIR_FAQ],
    featured: true,
    createdAt: '2026-09-05',
  },
  {
    id: 'ss-amepl-01',
    handle: 'still-waters-amethyst-pearl-bracelet',
    title: 'Still Waters',
    fullTitle: 'Still Waters — Amethyst & Freshwater Pearl Bracelet',
    description:
      'Soft violet amethyst between freshwater pearls — a quiet, everyday piece for slowing down. Both stones natural.',
    price: 62,
    currency: 'USD',
    images: [
      { tone: 'sand', alt: 'Still Waters bracelet — amethyst and freshwater pearl beads in soft focus', caption: 'Amethyst · soft focus' },
      { tone: 'violet', alt: 'Amethyst beads between freshwater pearls, close-up', caption: 'Amethyst · close-up' },
    ],
    options: [sizeOption],
    variants: sizeVariants('still-waters-amethyst-pearl-bracelet', 'SS-AMEPL-01', 62),
    available: true,
    tags: ['amethyst', 'freshwater pearl', 'pearl', 'natural', 'calm', 'stillness'],
    category: 'Bracelets',
    collectionHandles: ['all', 'new', 'calm', 'amethyst', 'pearl'],
    intention: 'calm',
    stones: ['amethyst', 'freshwater-pearl'],
    treatment: 'natural',
    materialsLine: 'Amethyst · freshwater pearl',
    materialsComplete: false,
    materials: [
      { label: 'Stones', value: 'Amethyst & freshwater pearl' },
      { label: 'Treatment', value: 'Natural' },
      { label: 'Made by', value: 'Vidhi, strung to order in her Georgia studio' },
    ],
    faqs: [REPAIR_FAQ],
    featured: true,
    createdAt: '2026-08-28',
  },
  {
    id: 'ss-popsp-01',
    handle: 'tender-contrast-pink-opal-black-spinel-bracelet',
    title: 'Tender Contrast',
    fullTitle: 'Tender Contrast — Pink Opal & Black Spinel Bracelet',
    description:
      'Milky pink opal set against crisp black spinel — softness and definition in one piece. Both stones natural.',
    price: 108,
    currency: 'USD',
    images: [
      { tone: 'warm', alt: 'Tender Contrast bracelet — pink opal and black spinel beads worn on the wrist', caption: 'Pink opal · on-wrist' },
      { tone: 'rose', alt: 'Pink opal and black spinel beads, close-up', caption: 'Pink opal · close-up' },
    ],
    options: [sizeOption],
    variants: sizeVariants('tender-contrast-pink-opal-black-spinel-bracelet', 'SS-POPSP-01', 108),
    available: true,
    tags: ['pink opal', 'black spinel', 'opal', 'natural', 'love', 'self-worth', 'self love'],
    category: 'Bracelets',
    collectionHandles: ['all', 'new', 'love'],
    intention: 'love',
    stones: ['pink-opal', 'black-spinel'],
    treatment: 'natural',
    materialsLine: 'Pink opal · black spinel',
    materialsComplete: false,
    materials: [
      { label: 'Stones', value: 'Pink opal & black spinel' },
      { label: 'Treatment', value: 'Natural' },
      { label: 'Made by', value: 'Vidhi, strung to order in her Georgia studio' },
    ],
    faqs: [REPAIR_FAQ],
    featured: true,
    createdAt: '2026-08-20',
  },
  {
    id: 'ss-apapl-01',
    handle: 'clear-path-apatite-pearl-bracelet',
    title: 'Clear Path',
    fullTitle: 'Clear Path — Apatite & Freshwater Pearl Bracelet',
    description:
      'Clean blue apatite strung with freshwater pearl — a light, bright piece for clear thinking. Both stones natural.',
    price: 68,
    currency: 'USD',
    images: [
      { tone: 'sand', alt: 'Clear Path bracelet — apatite and freshwater pearl beads', caption: 'Apatite · clean blue' },
      { tone: 'sky', alt: 'Apatite beads, close-up', caption: 'Apatite · close-up' },
    ],
    options: [sizeOption],
    variants: sizeVariants('clear-path-apatite-pearl-bracelet', 'SS-APAPL-01', 68),
    available: true,
    tags: ['apatite', 'freshwater pearl', 'pearl', 'natural', 'clarity', 'focus', 'blue'],
    category: 'Bracelets',
    collectionHandles: ['all', 'new', 'clarity', 'pearl'],
    intention: 'clarity',
    stones: ['apatite', 'freshwater-pearl'],
    treatment: 'natural',
    materialsLine: 'Apatite · freshwater pearl',
    materialsComplete: false,
    materials: [
      { label: 'Stones', value: 'Apatite & freshwater pearl' },
      { label: 'Treatment', value: 'Natural' },
      { label: 'Made by', value: 'Vidhi, strung to order in her Georgia studio' },
    ],
    faqs: [REPAIR_FAQ],
    featured: true,
    createdAt: '2026-08-14',
  },
  {
    // Listed in the PDP prototype's related grid with price "TBD" — shown as coming soon, not purchasable.
    id: 'ss-pruqz-01',
    handle: 'peruvian-opal-clear-quartz-bracelet',
    title: 'Peruvian Opal × Clear Quartz',
    fullTitle: 'Peruvian Opal × Clear Quartz Bracelet',
    description:
      'Sea-glass Peruvian opal paired with clear quartz. Final details and pricing are being confirmed — this piece arrives soon.',
    price: 0,
    pricePending: true,
    currency: 'USD',
    images: [{ tone: 'warm', alt: 'Peruvian opal and clear quartz bracelet', caption: 'Peruvian opal · coming soon' }],
    options: [sizeOption],
    variants: sizeVariants('peruvian-opal-clear-quartz-bracelet', 'SS-PRUQZ-01', 0, false),
    available: false,
    tags: ['peruvian opal', 'opal', 'clear quartz', 'natural', 'clarity', 'focus', 'coming soon'],
    category: 'Bracelets',
    collectionHandles: ['all', 'clarity'],
    intention: 'clarity',
    stones: ['peruvian-opal', 'clear-quartz'],
    treatment: 'natural',
    materialsLine: 'Peruvian opal · clear quartz',
    materialsComplete: false,
    createdAt: '2026-09-28',
  },
];

export const productByHandle = new Map(products.map((p) => [p.handle, p]));
export const variantById = new Map(products.flatMap((p) => p.variants.map((v) => [v.id, { product: p, variant: v }] as const)));

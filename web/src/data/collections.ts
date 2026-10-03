import type { Collection } from '@/types/collection';

/**
 * One collection template serves all intention and stone collections (handoff §2) —
 * only the hero copy, stone chips and product list change. Membership lives on each
 * product's `collectionHandles` (Shopify: tags → automated collections).
 */
export const collections: Collection[] = [
  {
    handle: 'all',
    kind: 'all',
    title: 'All bracelets',
    eyebrow: 'Shop',
    description:
      'Every piece in the studio, each hand-strung to order in Georgia and labelled with the honest truth of what it is made from. Filter by stone, intention or treatment — natural and dyed stones are always disclosed.',
    seoTitle: 'All Handmade Gemstone Bracelets | Stone & Strings',
    seoDescription:
      'Shop every handmade gemstone bracelet from Stone & Strings — labradorite, amethyst, sunstone, pearl and more, strung to order in Georgia with every material disclosed.',
    tone: 'rust',
  },
  {
    handle: 'new',
    kind: 'new',
    title: 'New arrivals',
    eyebrow: 'Shop',
    description: 'The newest pieces off Vidhi’s bench, most recent first.',
    seoTitle: 'New Arrivals — Handmade Gemstone Bracelets | Stone & Strings',
    seoDescription:
      'See the newest handmade gemstone bracelets from Stone & Strings, strung to order in Georgia. Every stone, honestly labelled — shop new arrivals now.',
    tone: 'warm',
  },
  {
    handle: 'calm',
    kind: 'intention',
    intention: 'calm',
    title: 'Calm & Stillness',
    eyebrow: 'By Intention',
    description:
      'Soft violets and luminous pearl, for slowing down. Amethyst has been linked with calm since antiquity; here it sits between freshwater pearls in pieces meant for an ordinary Tuesday as much as a hard week. Every stone in this line is natural, and labelled as such.',
    seoTitle: 'Calm & Stillness Bracelets — Amethyst & Pearl | Stone & Strings',
    seoDescription:
      'Calming gemstone bracelets in amethyst and freshwater pearl, hand-strung to order in Georgia. Natural stones, honestly disclosed — find your quiet piece.',
    tone: 'violet',
  },
  {
    handle: 'strength',
    kind: 'intention',
    intention: 'strength',
    title: 'Strength & Steadiness',
    eyebrow: 'By Intention',
    description:
      "Black onyx has long been worn as a grounding stone — a piece people reach for on the days they need to hold steady. Paired here with clear quartz, it's the base of our steadiness line: a strength bracelet built to be worn daily, not just on hard days. The onyx in this collection is dyed to reach its deep, even black — and we say so plainly, the same as everywhere else on this site.",
    seoTitle: 'Strength & Steadiness Bracelets — Black Onyx & Grounding Stones | Stone & Strings',
    seoDescription:
      'Strength bracelets built on black onyx and clear quartz, hand-strung to order in Georgia. Natural and dyed stones both disclosed honestly — no exceptions.',
    tone: 'dusk',
  },
  {
    handle: 'confidence',
    kind: 'intention',
    intention: 'confidence',
    title: 'Confidence & Courage',
    eyebrow: 'By Intention',
    description:
      'Warm stones for stepping forward. Sunstone’s glittering shimmer has long been associated with light and open-heartedness; strung with freshwater pearl, it makes a bright piece for the days you want to be seen.',
    seoTitle: 'Confidence & Courage Bracelets — Sunstone | Stone & Strings',
    seoDescription:
      'Confidence bracelets in warm sunstone and freshwater pearl, hand-strung to order in Georgia. Every stone honestly labelled — shop the courage line.',
    tone: 'warm',
  },
  {
    handle: 'love',
    kind: 'intention',
    intention: 'love',
    title: 'Love & Self-Worth',
    eyebrow: 'By Intention',
    description:
      'Tender pieces — for someone you love, or a reminder to treat yourself the same way. Soft pink opal and crisp black spinel, each one natural and disclosed in full.',
    seoTitle: 'Love & Self-Worth Bracelets — Self Love Gemstone Pieces | Stone & Strings',
    seoDescription:
      'Self love bracelets in pink opal and black spinel, hand-strung to order in Georgia. Natural stones, disclosed in full — choose a tender piece today.',
    tone: 'rose',
  },
  {
    handle: 'clarity',
    kind: 'intention',
    intention: 'clarity',
    title: 'Clarity & Focus',
    eyebrow: 'By Intention',
    description:
      'Clear stones for clear thinking: labradorite’s flash, apatite’s clean blue, and untreated clear quartz. Pieces people choose as a reminder to trust their own judgment.',
    seoTitle: 'Clarity & Focus Bracelets — Labradorite & Apatite | Stone & Strings',
    seoDescription:
      'Clarity bracelets in labradorite, apatite and clear quartz, hand-strung to order in Georgia. Natural stones with origin disclosed — shop the focus line.',
    tone: 'indigo',
  },
  {
    handle: 'labradorite',
    kind: 'stone',
    stone: 'labradorite',
    title: 'Labradorite',
    eyebrow: 'By Stone',
    description:
      'The stone of insight. Admired for its blue-green flash and long associated with intuition and transformation. Our labradorite is natural — cut and polished to reveal its colour, nothing more.',
    seoTitle: 'Labradorite Bracelets — Natural, Handmade | Stone & Strings',
    seoDescription:
      'Handmade labradorite bracelets with natural AAA stones and sterling silver, strung to order in Georgia. Origin and treatment disclosed — shop labradorite.',
    tone: 'indigo',
  },
  {
    handle: 'pink-jade',
    kind: 'stone',
    stone: 'pink-jade',
    title: 'Pink Jade',
    eyebrow: 'By Stone',
    description:
      'Tenderness, softly worn. Pink jade reaches its colour through dyeing — every pink jade piece we make is labelled “Dyed · disclosed”.',
    seoTitle: 'Pink Jade Bracelets — Dyed & Disclosed | Stone & Strings',
    seoDescription:
      'Handmade pink jade bracelets from Stone & Strings, strung to order in Georgia. We always disclose when jade is dyed — see the pink jade pieces.',
    tone: 'rose',
  },
  {
    handle: 'amethyst',
    kind: 'stone',
    stone: 'amethyst',
    title: 'Amethyst',
    eyebrow: 'By Stone',
    description: 'The quiet hour. A violet quartz worn since antiquity, natural in every piece we make.',
    seoTitle: 'Amethyst Bracelets — Natural, Handmade | Stone & Strings',
    seoDescription:
      'Handmade amethyst bracelets with natural stones and freshwater pearl, strung to order in Georgia. Every material disclosed — shop amethyst pieces.',
    tone: 'violet',
  },
  {
    handle: 'sunstone',
    kind: 'stone',
    stone: 'sunstone',
    title: 'Sunstone',
    eyebrow: 'By Stone',
    description: 'Warmth, chosen. Natural sunstone with its signature glittering shimmer.',
    seoTitle: 'Sunstone Bracelets — Natural, Handmade | Stone & Strings',
    seoDescription:
      'Handmade sunstone bracelets with natural stones, strung to order in Georgia. Honest materials, fully disclosed — explore warm sunstone pieces.',
    tone: 'warm',
  },
  {
    handle: 'pearl',
    kind: 'stone',
    stone: 'freshwater-pearl',
    title: 'Freshwater Pearl',
    eyebrow: 'By Stone',
    description: 'Our signature thread. Freshwater pearl runs through the line as a quiet, luminous base for brighter stones.',
    seoTitle: 'Freshwater Pearl Bracelets — Handmade | Stone & Strings',
    seoDescription:
      'Handmade freshwater pearl bracelets paired with amethyst, sunstone and apatite, strung to order in Georgia. Shop our signature pearl pieces.',
    tone: 'sand',
  },
];

export const collectionByHandle = new Map(collections.map((c) => [c.handle, c]));
export const intentionCollections = collections.filter((c) => c.kind === 'intention');
export const stoneCollections = collections.filter((c) => c.kind === 'stone');

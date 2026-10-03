import type { Stone } from '@/types/collection';

/**
 * Stone reference data. Stories describe cultural and historical meaning only —
 * the brand makes no health or metaphysical claims (homepage "Explore the stones" copy).
 */
export const stones: Stone[] = [
  {
    handle: 'labradorite',
    name: 'Labradorite',
    tagline: 'The stone of insight',
    gradient: 'radial-gradient(circle at 35% 30%, #8aa0c4, #41597c)',
    story:
      'Admired in many cultures for its captivating play of colour — the blue-green flash called labradorescence — and long associated with mystery, intuition and transformation.',
    care: 'Avoid harsh cleansers; wipe with a soft dry cloth to keep the flash bright.',
    hasCollection: true,
  },
  {
    handle: 'pink-jade',
    name: 'Pink Jade',
    tagline: 'Tenderness, softly worn',
    gradient: 'radial-gradient(circle at 35% 30%, #d98aa0, #a85a72)',
    story:
      'Jade has been treasured for thousands of years as a stone of grace and good fortune. Pink jade reaches its soft colour through dyeing — and when it is dyed, we say so.',
    care: 'Dyed stones can fade with long sun exposure — store away from direct light.',
    hasCollection: true,
  },
  {
    handle: 'amethyst',
    name: 'Amethyst',
    tagline: 'The quiet hour',
    gradient: 'radial-gradient(circle at 35% 30%, #c9a0d6, #7d5a94)',
    story:
      'Worn since antiquity and long linked with calm and sobriety — its name comes from the Greek amethystos. A violet quartz that has stayed a favourite for centuries.',
    care: 'Natural amethyst can pale in strong sun over time; store it in its pouch.',
    hasCollection: true,
  },
  {
    handle: 'sunstone',
    name: 'Sunstone',
    tagline: 'Warmth, chosen',
    gradient: 'radial-gradient(circle at 35% 30%, #e6b98f, #c07a3f)',
    story:
      'Named for its warm, glittering shimmer, sunstone has long been associated with light, warmth and open-heartedness across northern and Indigenous traditions.',
    hasCollection: true,
  },
  {
    handle: 'freshwater-pearl',
    name: 'Freshwater Pearl',
    tagline: 'Our signature thread',
    gradient: 'radial-gradient(circle at 35% 30%, #e9dcc8, #c9b79b)',
    story:
      'Grown in freshwater mussels and prized for their soft lustre, pearls have symbolised purity and wisdom across cultures. They appear throughout our line as a quiet, luminous base.',
    care: 'Put pearls on last — perfume, lotion and hairspray dull their lustre.',
    hasCollection: true,
  },
  {
    handle: 'clear-quartz',
    name: 'Clear Quartz',
    tagline: 'Clarity, untreated',
    gradient: 'radial-gradient(circle at 35% 30%, #f4f1ec, #c9c2b8)',
    story:
      'Valued throughout history as a symbol of clarity and harmony, clear quartz is one of the most widely used stones across traditions. Ours is left untreated.',
  },
  {
    handle: 'black-onyx',
    name: 'Black Onyx',
    tagline: 'Held ground',
    gradient: 'radial-gradient(circle at 35% 30%, #5a5450, #1f1b19)',
    story:
      'Long worn as a grounding stone — something people reach for on the days they need to hold steady. Most black onyx reaches its deep, even black through dyeing, including ours.',
  },
  {
    handle: 'pink-opal',
    name: 'Pink Opal',
    tagline: 'Soft and steady',
    gradient: 'radial-gradient(circle at 35% 30%, #f1c3c9, #c98b96)',
    story:
      'A gentle, milky opal from the Andes, pink opal has come to be associated with tenderness and self-kindness.',
  },
  {
    handle: 'black-spinel',
    name: 'Black Spinel',
    tagline: 'Quiet contrast',
    gradient: 'radial-gradient(circle at 35% 30%, #4a4652, #141218)',
    story:
      'A hard, brilliant stone historically mistaken for other gems, black spinel brings a crisp, reflective dark note to softer pairings.',
  },
  {
    handle: 'apatite',
    name: 'Apatite',
    tagline: 'A clean blue',
    gradient: 'radial-gradient(circle at 35% 30%, #8fd0d6, #3f8a9a)',
    story:
      'Named from the Greek for "deceit" because it was so often confused with other minerals, apatite is loved for its clear, bright blue.',
  },
  {
    handle: 'peruvian-opal',
    name: 'Peruvian Opal',
    tagline: 'Sea-glass calm',
    gradient: 'radial-gradient(circle at 35% 30%, #b9e0d6, #6fa89a)',
    story: 'A soft, opaque blue-green opal found in the Andes of Peru, known for its sea-glass tone.',
  },
];

export const stoneByHandle = new Map(stones.map((s) => [s.handle, s]));

export function stoneName(handle: string): string {
  return stoneByHandle.get(handle)?.name ?? handle;
}

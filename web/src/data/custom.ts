import type { FaqEntry, PlaceholderTone } from '@/types/product';

/**
 * Custom Studio content (prototype + Vidhi's own docx copy). Line order is a deliberate,
 * data-driven decision: Birthstone & Family → Initial → Inspired Word (handoff §4). Do not reorder.
 * No fixed price or turnaround anywhere on this page — both are open questions (handoff §5).
 */
export interface CustomLine {
  id: string;
  tag: string;
  title: string;
  sub: string;
  options: { title: string; body: string }[];
  choices: string[];
  cta: { label: string; topic: string };
  image: { tone: PlaceholderTone; alt: string; caption: string };
  lead?: boolean;
}

export const processSteps = [
  { num: '01', title: 'Tell Vidhi the story', body: "Who it's for, the occasion, or the feeling you want it to hold. A birthstone for your mother, an initial for yourself, a word you keep coming back to." },
  { num: '02', title: 'Choose the details together', body: 'Vidhi proposes stones, bead size, and gold or silver hardware, and sends a quote and estimated timeline before anything is made.' },
  { num: '03', title: "It's hand-strung for you", body: 'Once you approve the design, your piece is strung to order in Georgia — the same care and materials disclosure as every Stone & Strings piece.' },
];

export const customLines: CustomLine[] = [
  {
    id: 'birthstone',
    lead: true,
    tag: 'Line 01 · Most requested',
    title: 'Birthstone & Family — a Birthstone Bracelet for Mom, and the Family Piece That Holds Everyone',
    sub: "Built on a freshwater pearl base, this line carries one birthstone or an entire family's — the piece people choose most often as a birthstone bracelet for mom, and the one most requested as a gift that holds more than one person's story.",
    options: [
      { title: 'Her birthstone, framed in pearl', body: "Freshwater pearls surround a single birthstone chosen for the wearer — set the way it's shown in Vidhi's original design, with the birthstone changed to match whoever it's for." },
      { title: 'Birthstone at the center', body: 'The same freshwater pearl base, with the chosen birthstone set as the visible centerpiece rather than framed within the pearls — a slightly bolder read on the same idea.' },
      { title: 'The family piece', body: 'Freshwater pearls with a small dangling birthstone charm for each person in the family, each one set to their birth month — one bracelet that represents everyone, not just one.' },
    ],
    choices: ['Which birthstone(s), and how many — one wearer or a full family', 'Gold or silver hardware', 'Wrist size, fitted the same way as our ready-made pieces'],
    cta: { label: 'Start a birthstone or family piece →', topic: 'custom-birthstone' },
    image: { tone: 'warm', alt: 'Freshwater pearl bracelet with birthstone dangle charms for each family member', caption: 'Pearl · family birthstones' },
  },
  {
    id: 'initial',
    tag: 'Line 02',
    title: 'Initial — a Letter, a Number, a Story Only You Know',
    sub: 'A gemstone bracelet built around a single initial at the center — chosen for what it means to you, not just what it spells.',
    options: [
      { title: 'Your gemstone, your intention', body: 'Any of our gemstones set around the initial, chosen to match the intention you’re wearing it for — the same five-intention logic as the rest of the collection.' },
      { title: 'Your letter, or your number', body: 'The center can be an initial, or swapped for a number that means something to you — a lucky number, a birth year, a date worth carrying.' },
    ],
    choices: ['Gemstone and intention', 'Initial or number at the center', 'Gold or silver hardware'],
    cta: { label: 'Start an initial piece →', topic: 'custom-initial' },
    image: { tone: 'indigo', alt: 'Gemstone bracelet with a single gold initial charm at the center', caption: 'Initial charm · gold' },
  },
  {
    id: 'inspired',
    tag: 'Line 03',
    title: 'Inspired Word — Your Word, Set in Stone',
    sub: 'For the word you keep coming back to — set at the center of a gemstone combination chosen to match what it means to you.',
    options: [
      { title: 'Your word', body: 'One word of your choosing, set at the center — instructed directly by you, not picked from a list.' },
      { title: 'Your gemstone pairing and bead size', body: "Vidhi will propose a gemstone combination to match the word's meaning — for example, clear quartz and spinel for a piece built around emotional stability and steadiness — in your choice of 3mm, 4mm, or 5mm beads." },
    ],
    choices: ['Your word', 'Gemstone pairing and bead size (3mm / 4mm / 5mm)', 'Gold or silver hardware'],
    cta: { label: 'Start an inspired-word piece →', topic: 'custom-inspired' },
    image: { tone: 'olive', alt: "Gemstone bracelet with a single word charm reading a customer's chosen word", caption: 'Word charm · your choice' },
  },
];

export const customFaqs: FaqEntry[] = [
  { question: 'How is a custom bracelet priced?', answer: 'Pricing depends on the stones, metal, and details you choose. Vidhi sends a personalized quote before anything goes into production, so you know the price before you commit.' },
  { question: 'How long does a custom piece take to make?', answer: 'Timelines vary by design and current order volume. Vidhi confirms an estimated timeline with you when your design is finalized, before your order is placed.' },
  { question: 'Can I choose gold or silver for any custom design?', answer: 'Yes. Every custom line — birthstone, family, initial, and inspired-word — can be made in either gold or silver hardware.' },
  { question: "What if I'm not sure which line is right for what I want?", answer: "That's what the first conversation is for. Tell Vidhi the idea or the person it's for, and she'll recommend which line, stones, and format fit best." },
];

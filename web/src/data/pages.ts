import type { FaqEntry } from '@/types/product';

/**
 * Site FAQ and simple information pages. Only facts stated in the approved prototypes are
 * asserted. Where the business hasn't decided yet (shipping policy, returns window, review app)
 * the copy says so instead of inventing terms — flagged in handoff §5.
 */
export const siteFaqs: { group: string; items: FaqEntry[] }[] = [
  {
    group: 'Stones & materials',
    items: [
      { question: 'How do I know if a stone is natural or treated?', answer: 'Every product page has a Materials & Craft block that names each stone, its treatment and (where confirmed) its origin. Natural stones carry a green “Natural” label; dyed, plated or coated materials carry an amber “disclosed” label.' },
      { question: 'Why do you sell dyed stones at all?', answer: 'Some stones — black onyx and pink jade, for example — are almost always dyed to reach an even colour. We use them when they suit a design, and we always tell you.' },
      { question: 'Will my piece look exactly like the photos?', answer: 'Close, but not identical. Natural gemstones vary in tone, pattern and flash from bead to bead — that variation is part of the stone, not a flaw.' },
      { question: 'Do the stones have healing properties?', answer: 'We share the cultural and historical meaning of each stone because it’s part of why it was chosen — but we make no health or scientific claims.' },
    ],
  },
  {
    group: 'Sizing & care',
    items: [
      { question: 'How do I find my size?', answer: 'Wrap a flexible tape or strip of paper around your wrist bone, then add 0.25"–0.5" for a snug fit or up to 0.75" for more movement. Pieces are strung to the size you choose; between sizes, size up.' },
      { question: 'How should I care for my bracelet?', answer: 'Keep it dry, store it in a soft pouch, avoid long sun exposure and harsh cleansers, and take it off before swimming or workouts. See the Care guide for stone-by-stone notes.' },
    ],
  },
  {
    group: 'Orders, repairs & custom',
    items: [
      { question: 'What if my bracelet breaks?', answer: 'Every piece includes a free 30-day repair — Vidhi covers the labour, you cover any replacement materials. After 30 days, repairs are still available for a small materials-and-shipping fee.' },
      { question: 'How are custom pieces priced, and how long do they take?', answer: 'It depends on the stones, metal and details. Vidhi sends a personal quote and an estimated timeline before anything is made, so you know both before you commit.' },
      { question: 'Where do you ship, and what does it cost?', answer: 'Shipping is calculated at checkout. Our full shipping and returns policy is being finalised and will be published before the store opens.' },
    ],
  },
];

export interface InfoPageContent {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  sections: { heading: string; body: string[] }[];
  pending?: string;
  noindex?: boolean;
}

export const infoPages: Record<string, InfoPageContent> = {
  care: {
    slug: 'care',
    eyebrow: 'Help & care',
    title: 'Care guide',
    seoTitle: 'Gemstone Bracelet Care Guide | Stone & Strings',
    description: 'How to care for handmade gemstone and pearl bracelets so they last: storage, cleaning, sun and water — plus stone-specific notes. Read the care guide.',
    sections: [
      { heading: 'Everyday care', body: ['Keep your bracelet dry and store it in a soft pouch when you’re not wearing it. A gentle wipe with a dry cloth keeps the surface bright.', 'Take it off before swimming, showering, workouts or heavy work — water and strain are hardest on the cord and finish.'] },
      { heading: 'Sun and chemicals', body: ['Avoid long sun exposure: some natural stones (like amethyst) and all dyed stones can fade over time.', 'Put jewellery on last — perfume, lotion and hairspray dull pearls and polished stones.'] },
      { heading: 'Stone-by-stone notes', body: ['Each stone’s specific care note lives on the Our Stones page and on every product page.'] },
    ],
  },
  repairs: {
    slug: 'repairs',
    eyebrow: 'Help & care',
    title: 'Repairs & guarantee',
    seoTitle: 'Free 30-Day Repair Guarantee | Stone & Strings',
    description: 'Every Stone & Strings bracelet includes a free 30-day repair. Learn what is covered, what happens after 30 days, and how to request a repair from the studio.',
    sections: [
      { heading: 'Free for the first 30 days', body: ['Every piece includes a free 30-day repair — Vidhi covers the labour, you cover any replacement materials.'] },
      { heading: 'After 30 days', body: ['Repairs are still available for a small materials-and-shipping fee. Pieces are restrung by the same hands that made them.'] },
      { heading: 'Requesting a repair', body: ['Write to the studio through the contact page and choose “A repair”. Include your order details and a photo if you can.'] },
    ],
  },
  'shipping-policy': {
    slug: 'shipping-policy',
    eyebrow: 'Policies',
    title: 'Shipping & returns',
    seoTitle: 'Shipping & Returns | Stone & Strings',
    description: 'Shipping and returns information for Stone & Strings handmade gemstone bracelets, strung to order in Georgia, USA.',
    pending: 'Our full shipping and returns policy is being finalised and will be published here before the store opens.',
    sections: [
      { heading: 'Made to order', body: ['Every piece is strung to order in Georgia, USA, so it’s made after you order it.', 'Shipping costs are calculated at checkout.'] },
    ],
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    eyebrow: 'Policies',
    title: 'Privacy policy',
    seoTitle: 'Privacy Policy | Stone & Strings',
    description: 'How Stone & Strings handles your personal information.',
    pending: 'The full privacy policy will be published here before the store opens.',
    sections: [
      { heading: 'In this preview', body: ['This preview site doesn’t send your information anywhere. Your cart is stored only in your own browser.'] },
    ],
    noindex: true,
  },
  'terms-of-service': {
    slug: 'terms-of-service',
    eyebrow: 'Policies',
    title: 'Terms of service',
    seoTitle: 'Terms of Service | Stone & Strings',
    description: 'Terms of service for Stone & Strings.',
    pending: 'The terms of service will be published here before the store opens.',
    sections: [],
    noindex: true,
  },
  account: {
    slug: 'account',
    eyebrow: 'Account',
    title: 'Your account',
    seoTitle: 'Account | Stone & Strings',
    description: 'Sign in to your Stone & Strings account.',
    pending: 'Customer accounts open with the store launch. Until then, your cart is saved on this device.',
    sections: [],
    noindex: true,
  },
};

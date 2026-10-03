import type { Intention } from '@/types/collection';
import type { IntentionHandle } from '@/types/product';

/** The five locked intentions, in homepage order. Tile gradients are from the homepage prototype. */
export const intentions: Intention[] = [
  {
    handle: 'calm',
    title: 'Calm & Stillness',
    short: 'For the quiet hour, and the moments you want to slow down.',
    gradient: 'radial-gradient(120% 120% at 30% 20%, #8a97b6, #5a6685)',
  },
  {
    handle: 'strength',
    title: 'Strength & Steadiness',
    short: 'For the days you need to hold steady.',
    gradient: 'radial-gradient(120% 120% at 30% 20%, #5c4433, #3a2b20)',
  },
  {
    handle: 'confidence',
    title: 'Confidence & Courage',
    short: 'Warm stones for stepping forward.',
    gradient: 'radial-gradient(120% 120% at 30% 20%, #e0a05c, #b9682f)',
  },
  {
    handle: 'love',
    title: 'Love & Self-Worth',
    short: 'Tender pieces, for others and for yourself.',
    gradient: 'radial-gradient(120% 120% at 30% 20%, #d98aa0, #a85a72)',
  },
  {
    handle: 'clarity',
    title: 'Clarity & Focus',
    short: 'Clear stones for clear thinking.',
    gradient: 'radial-gradient(120% 120% at 30% 20%, #6f8fa8, #3f5f79)',
  },
];

export const intentionByHandle = new Map<IntentionHandle, Intention>(intentions.map((i) => [i.handle, i]));

export function intentionTitle(handle: IntentionHandle): string {
  return intentionByHandle.get(handle)?.title ?? handle;
}

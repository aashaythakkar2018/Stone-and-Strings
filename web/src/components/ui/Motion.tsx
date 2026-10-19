import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from 'motion/react';

/**
 * Motion (Framer Motion) setup + scroll-reveal primitives.
 * LazyMotion loads only the DOM animation features (`m` instead of `motion`) to keep the bundle small;
 * MotionConfig honours the OS "reduce motion" setting — transforms are skipped, opacity still fades.
 * CSS keeps owning the hero entrance, page fade and drawers; these cover reveal-on-scroll below the fold.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const; // matches --ease

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

const VIEWPORT = { once: true, amount: 0.2 } as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0 },
};

type Tag = 'div' | 'ul' | 'section' | 'figure' | 'p';

interface RevealProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
}

/** Fades + lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, as = 'div', className, delay = 0 }: RevealProps) {
  const M = m[as];
  return (
    <M className={className} variants={rise} initial="hidden" whileInView="shown" viewport={VIEWPORT} transition={{ delay }}>
      {children}
    </M>
  );
}

interface StaggerProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  role?: string;
  style?: React.CSSProperties;
  /** Seconds between children. */
  gap?: number;
}

/** Container that reveals its <StaggerItem> children one after another when it scrolls into view. */
export function Stagger({ children, as = 'div', gap = 0.09, ...rest }: StaggerProps) {
  const M = m[as];
  return (
    <M
      {...rest}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, as = 'li', className }: { children: ReactNode; as?: 'li' | 'div' | 'figure'; className?: string }) {
  const M = m[as];
  return <M className={className} variants={rise}>{children}</M>;
}

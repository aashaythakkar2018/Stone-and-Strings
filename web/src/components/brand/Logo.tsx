import { LOGO_PATHS, LOGO_VIEWBOX, MARK_PATHS, MARK_VIEWBOX } from './logoPaths';

interface LogoProps {
  className?: string;
  /** Accessible name. Pass "" when a surrounding link already provides one. */
  title?: string;
  variant?: 'wordmark' | 'mark';
}

/**
 * Official Stone & Strings wordmark, vector-extracted from the brand kit.
 * Colour comes from `currentColor`, so it follows the brand colour rules via CSS
 * (rust on light, cream on rust/olive). Never stretch, tilt or add effects (brand kit p.7).
 */
export function Logo({ className, title = 'Stone & Strings', variant = 'wordmark' }: LogoProps) {
  const paths = variant === 'mark' ? MARK_PATHS : LOGO_PATHS;
  const viewBox = variant === 'mark' ? MARK_VIEWBOX : LOGO_VIEWBOX;
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.evenOdd ? 'evenodd' : undefined} />
      ))}
    </svg>
  );
}

# Stone & Strings — Brand assets

Production-ready assets extracted from `SS_Brandkit_16092025_RD_v01.pdf` and the approved prototypes.

## logo/
| File | Use |
|---|---|
| `ss-logo-rust.svg` / `.png` | Primary wordmark on light (paper / white) backgrounds |
| `ss-logo-cream.svg` | Wordmark for rust or olive backgrounds (transparent) |
| `ss-logo-ink.svg` | One-colour dark version (print, stamps) |
| `ss-logo-cream-on-rust.svg` / `.png` | Lockup with background and 2× clear space (brand kit p.6) |
| `ss-logo-cream-on-olive.svg` | Lockup on olive, 2× clear space |
| `ss-logo-rust-on-paper.svg` | Lockup on paper, 2× clear space |
| `ss-mark-rust.svg` / `.png` | Bead-necklace monogram (the "O" + "&") — social avatar, favicon, stamps |
| `ss-mark-cream-on-rust.svg` / `.png` | Monogram tile |
| `favicon.svg`, `apple-touch-icon.png` | Browser / home-screen icons |

The SVGs are the **original vector paths** from the brand kit (page 5), not traces of the JPEGs.
Per brand kit p.7: never stretch, tilt, add effects, or place the logo on colours outside the palette.

## imagery/
- `window-shadow.jpg` — the window-light shadow texture from the brand-kit cover. Blend with *multiply* over rust (as on the kit cover and the website hero).
- `packaging-box.jpg`, `packaging-bag.jpg` — packaging renders from brand kit p.18.

The mood-board photos (p.16) are third-party reference images and were deliberately **not** extracted for use.

## tokens/
- `ss-tokens.css` — CSS custom properties (the website's `variables.css`). In Shopify this becomes `assets/ss-tokens.css`.
- `ss-tokens.json` — the same values for Figma / other tools, including HEX/RGB/CMYK and the three brand gradients.

## Typography
- **Hollen** — brand display face (kit p.9). It's a licensed font and isn't included as a web font. The site uses **Cormorant Garamond** (as in the approved prototypes) and lists Hollen first in `--font-display`, so it switches over automatically once a webfont licence is added.
- **Helvetica / Helvetica Neue** — secondary (subheads Medium, body Light).
- **Pinyon Script** — affirmations and signatures only.

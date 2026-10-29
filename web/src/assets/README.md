# Photos

All photos here are web-ready WebP files made from the originals in `Product shoot /`
(which stays on your machine and out of git). Originals are never modified.

| Folder | What's in it | Used on the site? |
|---|---|---|
| `products/<product>/NN.webp` | Photos named after a catalog product (4:5). `01` is the card/primary image, the rest are gallery + hover images. | Yes, via `src/data/products.ts` |
| `editorial/` | `hero-display` (homepage hero), `bench-tools-beads` (Meet Vidhi) | Yes |
| `shoot/` | Every other photographed design, cropped and refined, named by stones. Ready for new products. | Not yet |
| `shoot/editorial/` | `collection-banner` (3:2, all bracelets hanging), `couple-wearing-bracelets` | Not yet |

**Use a photo:** `photo('products/held-ground/01')` from `src/data/photos.ts` (only `products/` and `editorial/` are bundled).
To use a library photo, move it into `products/<product>/` or `editorial/`.

**How they were refined:** rotation tags honored; cropped tight around the bracelet (no empty bands, dark strips
from the original frames removed); uneven lighting and vignette flattened; white backdrop set to a clean warm white;
dust specks removed; light contrast and sharpening. Stone colors are left as shot.

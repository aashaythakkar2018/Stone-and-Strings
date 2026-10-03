# Stone & Strings — Storefront (frontend)

React 19 + TypeScript + Vite + React Router 7. A standalone storefront that runs on local mock data only.
There's **no backend, no Shopify integration, and no secrets**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve the production build
```

> SPA hosting: configure the host to rewrite unknown paths to `/index.html` (for example Netlify `_redirects`: `/* /index.html 200`).

## Structure
```
src/
  data/          ← ALL catalog & content lives here (products, collections, stones, intentions,
                   navigation, site copy, custom studio, FAQ/info pages) + catalog.ts access layer
  types/         product.ts · collection.ts · cart.ts
  context/       CartContext.tsx (reducer + localStorage, cross-tab sync)
  hooks/         useCart · useSearch · useSeo (head/OG/canonical/JSON-LD) · useDialog (focus trap)
  utils/         formatCurrency · filterProducts (filter/sort/URL params) · imageUtils
  components/
    brand/       Logo (vector wordmark + monogram, currentColor)
    layout/      Layout, AnnouncementBar, Header, MegaMenu, MobileMenu, SearchOverlay, Footer, Breadcrumbs
    ui/          Button, Field (Input/Select/Textarea), Drawer, Modal, Primitives (Badge, QuantitySelector,
                 Accordion, Skeleton, Chip), SmartImage, EmptyState, PageSkeleton, Icons
    product/     ProductCard, ProductGrid(+Skeleton), ProductGallery, ProductInfo, MaterialsBlock,
                 AddToCartButton, ProductBits (badge/price), ProductReviews
    cart/        CartDrawer, CartItem, CartSummary, CartEmpty
    collection/  CollectionHeader, CollectionToolbar, CollectionFilters
    sections/    Hero, CategoryGrid, HomeSections (Pledge, FeaturedProducts, BrandStory, StonesTeaser,
                 PromotionalBanner, Testimonials, TrustStrip), Newsletter
  pages/         Home, Collection, Product, Search, Cart, About, Custom, OurStones, Contact, FAQ,
                 InfoPage (care/repairs/policies/account), NotFound
  styles/        variables.css (design tokens) · globals.css
```

`data-ss-section="…"` attributes from the prototypes are preserved; they map each block to its future Liquid section.

## Routes
`/` · `/collections/:handle` (all, new, calm, strength, confidence, love, clarity, labradorite, pink-jade, amethyst, sunstone, pearl)
· `/products/:handle` · `/search?q=` · `/cart` · `/account` · `/pages/{about,custom,our-stones,contact,faq,care,repairs}`
· `/policies/{shipping-policy,privacy-policy,terms-of-service}` · aliases `/about /contact /faq /custom` · `*` → 404.
Paths mirror Shopify's URL scheme so links survive the migration.

## Connecting a backend later
Pages read data only through `src/data/catalog.ts`. Swap those functions for API calls (and make them async with
the existing skeleton components as fallbacks). `Product` fields map to the handoff metafield spec:
`materials` → `custom.materials_breakdown`, `treatment` → `custom.treatment_status`, `intention` → `custom.intention`,
`affirmation`, `founderNote`, `stoneStory` → `custom.stone_meaning`, `faqs`, and so on. Cart lines store only `variantId` + quantity,
so they translate directly to cart-line inputs.

## Content rules this build keeps (from the dev handoff)
- No invented products, prices, review ratings, custom-order prices or turnaround times.
- Natural = green badge, dyed/plated/coated = amber "· disclosed" badge, everywhere.
- No `aggregateRating` JSON-LD until real reviews exist.
- One `<h1>` per page.

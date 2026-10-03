# Stone & Strings

Handmade gemstone bracelets, worn for meaning. Storefront, brand assets and design prototypes.

**▶ Live preview: [Stone & Strings Storefront](https://claude.ai/artifact/B5XCoeA7iFPsN37UaUEAhw)**

The preview is a private link; the owner shares it from the page's Share menu.

## What's here

| Path | Contents |
|---|---|
| [`web/`](web/) | React 19 + TypeScript + Vite storefront (mock data, no backend). See [`web/README.md`](web/README.md). |
| [`brand-assets/`](brand-assets/) | Logos, imagery and design tokens from the brand kit. |
| `*-prototype*.html` | Approved page prototypes (homepage, PDP, custom studio, collection). |
| [`dev-handoff-notes.md`](dev-handoff-notes.md) | Developer handoff: tokens, page structure, Shopify metafield spec. |

## Run locally

```bash
cd web
npm install
npm run dev
```

## Update the live preview

```bash
cd web
npm run build:preview   # → dist-preview/preview-page.html + assets/
```

Then republish `dist-preview/` to the preview link above.

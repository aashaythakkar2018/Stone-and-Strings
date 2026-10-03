# Stone & Strings

Handmade gemstone bracelets, worn for meaning. Storefront, brand assets and design prototypes.

**▶ Live site: https://aashaythakkar2018.github.io/Stone-and-Strings/**

Deployed automatically to GitHub Pages on every push to `main` ([workflow](.github/workflows/pages.yml)).

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

## Update the live site

Push to `main`. The GitHub Actions workflow builds `web/` and redeploys the site.

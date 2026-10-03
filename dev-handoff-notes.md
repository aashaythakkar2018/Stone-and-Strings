# Stone & Strings — Developer Handoff Notes
**Prepared for: Sahil (dev), Aashay (design), Vedika (growth ops) · Owner: Maharshi · Status: 4 of ~10 templates prototyped**

This is the working handoff for everything built so far: Homepage, Product (PDP), Custom Studio, and Collection. Each was built the same way — real competitor research + live Ahrefs data first, then the page — so the copy, structure, and keyword targeting in these files are not placeholders to be rewritten; they're the approved reference. Treat every prototype file as the spec, not a mockup to reinterpret.

---

## 1. How these files are built

All four HTML files share one design-token system, defined once at the top of each file's `<style>` block under `:root`. **In Shopify, move these tokens into `assets/ss-tokens.css` and load it once in `theme.liquid` — do not redefine them per template.** Every class name (`.btn`, `.card`, `.pgrid`, `.pledge`, etc.) is intended to become a reusable Liquid snippet/section, not page-specific CSS.

| Token | Value | Use |
|---|---|---|
| `--rust` / `--rust-deep` | `#a3412c` / `#7d2f1f` | Primary brand color, CTAs, price |
| `--olive` | `#40462c` | Dark sections (announcement bar, pledge, footer accents) |
| `--sand` / `--cream` / `--peach` | `#ffd5b0` / `#dec4ad` / `#be6754` | Warm accent range |
| `--paper` / `--paper-2` | `#f6efe6` / `#efe5d7` | Backgrounds |
| `--ink` / `--ink-soft` | `#2b2622` / `#5c534a` | Text |
| `--ok` (green) / `--disc` (amber) | `#5f7138` / `#9a6a2f` | "Natural" badge / "Dyed, disclosed" badge — **this color pairing is a trust mechanic, keep it consistent everywhere a treatment badge appears** |
| Fonts | Cormorant Garamond (headings), Helvetica Neue (body), Pinyon Script (affirmations/signatures only) | Loaded via Google Fonts `<link>` in each file's `<head>` |

Every `<section data-ss-section="...">` attribute names the Liquid section/snippet it should become — this is intentional annotation, not decorative markup. Leave it in place through development as a map between prototype and theme files.

## 2. What's built, file by file

### Homepage — `stone-and-strings-homepage-FINAL.html`
Static reference build. The featured-product grid (`#home-grid`) is static HTML here; in Shopify it's `{% for product in collections.frontpage.products %}` — the card markup in the file is exactly what that loop should emit per product. Organization + WebSite JSON-LD (site-wide, belongs in `theme.liquid`, not repeated per page). 1 H1 confirmed.
**Persisted artifact:** `stone-and-strings-homepage` (Cowork).

### Product page (PDP) — `stone-of-insight-pdp-prototype.html`
Reference build for "Stone of Insight" (Labradorite × Clear Quartz, $118, Clarity & Focus). Module order is locked: gallery → title/add-to-cart → Vidhi's note → affirmation → ★ Materials & Craft block → about the stone → care → sizing → FAQ → reviews (empty state) → related. Product + Offer + FAQPage + BreadcrumbList JSON-LD. **No `aggregateRating`** — zero real reviews exist; add only once Judge.me (or chosen review app) has live data.
**Persisted artifact:** `stone-and-strings-pdp-stone-of-insight` (Cowork).

### Custom Studio — `stone-and-strings-custom-studio-prototype.html`
Reordered from the original brief's Initial → Inspired-Word → Birthstone sequence to **Birthstone & Family → Initial → Inspired-Word**, based on live Ahrefs data (see §4). Copy for all three lines is pulled directly from Vidhi's own docx draft, not invented. Service + FAQPage + BreadcrumbList JSON-LD. **No fixed custom-order price or turnaround time anywhere on the page** — both are open questions (§5).
**Persisted artifact:** Cowork artifact (published this session).
**Full research:** `claude/custom-studio-research-and-decision.md` (project doc).

### Collection template — `stone-and-strings-collection-strength-prototype.html`
One template, reused for all 5 intention collections + 5 stone collections — only the hero copy, stone-filter chips, and product loop change per collection. Flagship/reference build is **Strength & Steadiness**, not Love & Self-Worth — see §4 for why. Structure: hero/intro (meaning-driven, Satya Jewelry pattern) → stone filter + sort bar (Moon Magic pattern) → product grid → trust strip → cross-links to sibling intentions. Deliberately **no on-page FAQ** — neither competitor researched stacks FAQ on collection pages; that content lives on PDP/site FAQ instead. CollectionPage + ItemList + BreadcrumbList JSON-LD.
**Persisted artifact:** Cowork artifact (published this session).
**Full research:** `claude/collection-template-research-and-decision.md` (project doc).

## 3. Shopify metafield spec (build once, applies to every PDP)

Full table lives in `claude/ia-mega-menu-v2-and-metafield-spec.md`. Summary for quick reference — Sahil creates these via Shopify Admin or `metafieldDefinitionCreate` GraphQL mutations once the real store exists:

`custom.materials_breakdown` (rich text) · `custom.treatment_status` (validated list: Natural / Dyed, disclosed / Plated / Coated — drives the badge color) · `custom.stone_meaning` (rich text) · `custom.stone_origin` (multi-line) · `custom.hardware` (single line) · `custom.bead_size` (single line) · `custom.care_summary` (multi-line) · `custom.intention` (validated single-select, one of the 5 locked intentions) · `custom.affirmation` (single line) · `custom.faq_treatment` / `custom.faq_shade_variation` (multi-line, optional) · `custom.daily_use` (multi-select).

**Taxonomy note:** Intention, Stone, Tier, and Style are driven by **product tags**, not metafields — that's what powers Shopify's native collection filtering on the Collection template (§2). Metafields are for rich content only (Materials & Craft block, stone meaning, etc.). Don't conflate the two when setting up the real catalog — tagging strategy has to be decided before the first product is entered, not retrofitted.

## 4. Why the pages are structured the way they are (so no one "fixes" this later)

- **Custom Studio line order:** "birthstone bracelet for mom" is 2,500 US searches/mo at KD 1 — an order of magnitude bigger than every other Custom Studio term tested, and nearly uncontested. "custom initial bracelet" has real demand (2,200/mo traffic potential) but the SERP is held by BaubleBar (DR69), Catbird NYC (DR70), Maya Brenner (DR44) — funded brands. Inspired-Word has ~20/mo, no dedicated SEO value. Full data in the project doc.
- **Collection flagship = Strength & Steadiness, not Love & Self-Worth:** "love bracelet" looks like the obvious pick at 7,600/mo, but the SERP is 100% Cartier/Zales/Kay/Bloomingdale's — a term collision with a different product category, not real demand for this brand. "strength bracelet" (900/mo, KD 0) SERP-checked clean: small mantra/affirmation brands only, no major retailer. Full data in the project doc.
- **Both findings matter beyond their own pages** — they're evidence that "difficulty: 0" or "big volume" in Ahrefs is not sufficient on its own; every number in this project has been through a live SERP check before being trusted. Apply the same discipline to the remaining pages (Our Stones hub, Trust Hub, Repairs).

## 5. Open data gaps — block real copy, not the templates

These don't block development (the templates are structurally complete) but do block the *final* copy from being fully accurate. Flag to Vidhi:

| Gap | Blocks | Current treatment |
|---|---|---|
| Custom-order pricing structure | Final Custom Studio FAQ copy | Honest non-committal copy ("Vidhi sends a personalized quote") |
| Custom-order turnaround time | Same | Same — non-committal, no invented number |
| Strength & Steadiness: 2 more products (name/stones/price) | Collection template's product grid | 2 clearly-marked "catalog data pending" placeholder cards — **not fabricated products** |
| Full 30-SKU catalog with intention/stone/tier tags | Every collection page's real product count | Homepage's "10/3/8/6/3 pieces" counts are illustrative from the earliest draft, not confirmed — **do not treat as real inventory data** |
| Shipping policy (zero content exists anywhere) | Checkout, footer policy page | Flagged in the Vidhi intake workbook (`Stone_and_Strings_Vidhi_Intake_Questions.xlsx`) |
| Review platform choice (Judge.me assumed, not confirmed) | `aggregateRating` schema, reviews sections | Empty-state everywhere; add schema only once real reviews exist |

## 6. Priority tickets (P0 blocks launch / P1 quality / P2 polish)

| # | Priority | Page | Ticket | Owner |
|---|---|---|---|---|
| 1 | P0 | All 4 built | Move `:root` tokens into `assets/ss-tokens.css`, load once in `theme.liquid` — do not copy per template | Sahil |
| 2 | P0 | All 4 built | Purge all theme demo content when a base theme is selected — treat leftover placeholder copy as a launch-blocking defect | Aashay |
| 3 | P0 | PDP, Collection, Custom Studio | Implement the 12-field metafield spec (§3) before any real product is entered | Sahil |
| 4 | P0 | Collection | Confirm Strength & Steadiness's 2 missing products with Vidhi before the collection goes live with only 1 real SKU | Maharshi → Vidhi |
| 5 | P1 | All 4 built | Wire JSON-LD blocks to pull from metafields/product data dynamically instead of hardcoded prototype values | Sahil |
| 6 | P1 | Collection | Build the tag-driven filter bar (native Shopify filtering or Search & Discovery app) — prototype uses static chips | Sahil |
| 7 | P1 | Custom Studio | Decide the real intake flow (contact form vs. Shopify custom-product app vs. manual quote) — prototype uses a placeholder `?topic=` link pattern | Maharshi + Sahil |
| 8 | P2 | Homepage, PDP | Source real photography to replace all `.ph` gradient placeholders (alt text already written in HTML comments at each placeholder) | Aashay / Ravijeet |
| 9 | P2 | All | Confirm review app choice, install, wire `aggregateRating` schema once live reviews exist | Vedika |

## 7. Launch checklist (per template, before go-live)

- [ ] View Source shows exactly **one `<h1>`** per template (verified on all 4 built pages already — recheck after Liquid conversion)
- [ ] All JSON-LD blocks validate (verified on all 4 built pages already — recheck after dynamic data binding)
- [ ] Meta title ≤60 chars, meta description 130–155 chars with a CTA verb, pasted per page (already written for all 4 built pages)
- [ ] Zero demo-theme strings on any live URL
- [ ] GSC property verified + sitemap submitted
- [ ] Analytics events firing (add-to-cart, custom-inquiry submit, newsletter signup)
- [ ] Mobile + checkout QA pass
- [ ] Canonical tags correct on every template (already set on all 4 built pages)

## 8. What's next

Remaining templates per the original roadmap, same discipline (research → decision → build) each time: Our Stones education hub, Trust Hub / Meet Vidhi, Repairs & Guarantee page, Care page, site-wide FAQ. Collection template (§2) is portable to all 4 remaining intention collections and all 5 stone collections once real product data exists — no new template design work needed there, just content population per §5.

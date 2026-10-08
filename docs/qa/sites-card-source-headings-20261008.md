# Merchant-editable source product-card headings

The Sites card presentation uses short catalogue names and homepage scent summaries. Native product titles are longer and local fixture suffixes made their extra wrapping particularly visible; the prior committed homepage also omitted the source summaries. The fix restores source presentation without changing any Shopify product record or copying price/availability truth into section JSON.

`bpm-sites-card` accepts an optional `display_title`, falling back to `product.title`. The card image's accessible identity remains the native product title; URLs, price/price-from, availability and merchant-image precedence remain native. Overrides are escaped. Product-track, collection, featured-collection and search mapping blocks expose an optional **Display title override** with explicit fallback/help text. Catalogue wrappers pass only the matching native product's presentation fields; an unmapped future product retains its native heading.

Existing mapped sections receive the exact names from recovered `reference-site/public/catalogue.json`. Homepage summaries are `Bergamot & Lime.` and `Unscented.`, matching the live source. No shipping/discount claim or operational promise was copied. Merchant can edit or clear each presentation heading without changing product data or regenerating the site.

## Rendered source comparison

Live Sites and the regenerated committed-resource homepage were compared in the same tab with explicit verified viewport widths. Both cards match title, summary, heading box, image-panel box and total card box at all three sizes:

| Width | Card dimensions, both source/candidate | Heading height | Image-panel dimensions |
|---|---|---|---|
| 375 | 327×455 | 29px | 327×284 |
| 820 | 359×493 | 30px | 359×294 |
| 1440 | 642×725 | 30px | 642×526 |

Raw evidence is `sites-card-headings-fidelity-20261008.json`; the mobile screenshot is `sites-card-source-headings-375.png`. The screenshot was saved after the card region was visible and network idle. Temporary viewport override was reset. This is scoped card presentation evidence with mocked native resources/prices, not real-price, product binding, whole-homepage or physical-device proof.

## Validation and remaining gates

Five added rendering checks cover escaped override/native identity/price, blank fallback, matching catalogue mapping, unmapped future-product fallback and track-section forwarding. `npm run check:theme` passes 324 rendering checks plus product/motion/gift-card lifecycle and 96 resource/9 app configuration checks. Native editor persistence, translations, real resource resolution and commerce remain unverified. Current snapshot must be refreshed before any upload of these latest bytes; no upload, product edit, GitHub push or publication occurred. The ownership-link native binding/claim gate remains separate.

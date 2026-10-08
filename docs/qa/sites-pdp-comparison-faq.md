# Sites PDP comparison and FAQ — 7 October 2026

Source: recovered `reference-site/public/product-media/preview.html` and `preview.css`. Figma remains superseded. This is a local implementation checkpoint, not completion of Phase 0–5.

## Implementation

Comparison keeps the source three-card layout and responsive treatments. Each merchant block selects a native Shopify product and optional original framed image, background, approved summary, pack/fragrance description and link label. Title, presentment price/range, availability and URL come from the selected product. The current product receives the source stronger border. Unselected blocks and empty comparison sections are omitted. Shipping links to the current native policy rather than copying prototype fixed rates.

The PDP FAQ keeps source heading, full-width native details disclosures and editable question/answer blocks. Three recovered product/application questions are configured. The source 304-application estimate and ingredient claims remain subject to acceptance and correct product applicability. Shipping destinations/rates use the native policy link when available; no prototype rate promises are included. Incomplete question/answer pairs are omitted. No FAQ structured-data assertion has been added.

## Evidence

- `npm run check:theme`: 85 passing LiquidJS render checks; five new cases cover unbound products, native price/availability/URL/current state, image override and absent claims, FAQ markup, escaping and policy routing.
- Installed Shopify CLI Theme Check: zero errors, one existing Adobe RemoteAsset warning. Bundled plugin validation was attempted and failed on the known missing `@shopify/theme-check-common` dependency. Managed plugin files and checks were preserved.
- Local browser fixture at 1440×1000, 820×1000 and 375×900. Content/scroll width matched at 1425, 805 and 360px. Comparison grid on desktop/tablet, stacked cards on mobile; first FAQ expanded through Enter and displayed the answer. Viewport override reset.
- `sites-pdp-comparison-desktop-local.png` and `sites-pdp-faq-mobile-local.png` record local rendered layout. Product/pack/fragrance selections are fabricated local bindings; prices in the fixture are recovered historical values, not current store-price verification. Original carton pixels are used in fixture SVG framing; the mixed pair is a local composed fixture.

## Remaining

Shared product template comparison blocks are empty pending actual merchant product/artwork bindings. Source fidelity, actual editor persistence, native app/checkout journeys and all release gates remain unverified. Continue truths strip, value, lifestyle/music, genuine review/creator integration, jump links and closing; then remaining source pages and Phase 4/5 checks. Correct product-specific scent/INCI and approved claims remain required.

No push, merge, authenticated development-theme upload or production publication occurred. This checkpoint does not establish an upload-ready or publish-ready theme.

# Sites PDP editorial checkpoint — 7 October 2026

Authority: recovered `reference-site/public/product-media/preview.html`, its styles/scripts and original product-media assets. Figma is superseded. This checkpoint implements part of Phase 2/3, not full Phase 0–5 completion.

## Implemented

- Editable three-card benefits section with source texture, formula still life and metal-tube imagery; merchant image overrides and blank-card omission.
- Editable application steps, original controlled application video and visual-description VTT; optional Shopify video override or video omission. No autoplay; preload is none.
- Product-specific scent story section with selected image, copy and scent-note blocks. It remains blank in the shared template until correct product bindings are supplied.
- Four editable ingredient roles and optional product-specific rich INCI disclosure. No global INCI or fragrance assumption.
- Native product description moved to final notes after editorial/review slots, without duplication.

All source statements are implementation inputs, not proof that claims are approved. Correct product mappings and claim acceptance remain required before release.

## Verification

`npm run check:theme`: 80 passing LiquidJS render checks, including 10 new checks covering source assets/steps, media omission, scent omission, supplied INCI, escaping and description placement. This is fabricated local data, not Shopify backend execution.

Installed Shopify CLI Theme Check: zero errors, one existing RemoteAsset warning for the Adobe font kit. The plugin helper remains unavailable because its bundled `@shopify/theme-check-common` dependency is missing; no managed plugin files were changed or checks disabled.

Local browser fixture `http://127.0.0.1:8892/sites-product.html` inspected at 1440×1000, 820×1000 and 375×900. Actual content/scroll widths matched at 1425, 805 and 360px respectively. Desktop/tablet benefit cards are a grid; mobile cards stack and application uses a vertical flex layout. Formula roles use two columns on tablet/mobile. Original texture, formula, metal tube and open-pack images loaded. Screenshots show a fabricated scent binding only; shared template bindings remain empty. Temporary viewport override reset after QA.

Evidence: `sites-pdp-editorial-desktop-local.png` and `sites-pdp-editorial-mobile-local.png`. These show local layout, not exact source fidelity acceptance or native editor persistence.

Original application-video HEAD returned HTTP 200, video/mp4, content-length 13051393 and byte-range support. Playback attempt did not establish duration or advancing frames; native playback remains unverified. No real cart, subscription, checkout, app or merchant-data submissions were performed.

## Original asset provenance

Copied without alteration from recovered product media:

- `formula-still-life-v1.jpg` → `theme/assets/bpm-sites-formula.jpg`, 1448×1086; SHA-256 `a9a287288cac4d921c3be05a4f3d965b3448d68ed050a11b316b3e0304e3cc60`.
- Original application description VTT → `theme/assets/bpm-application-description.vtt`; SHA-256 `b3c7e6462d05c02a51e3351df76ae04ece4f97c99d66a71054b326672f82f0cb`.

Source files and recovery provenance remain unchanged. Tube, poster, video and scent fixture use original owner CDN resources; delivery/framing/performance require final review.

## Remaining / next action

Continue the source PDP truths strip, value, lifestyle/music, comparison, genuine review/creator integration, FAQ, jump links and closing. Bind scent/INCI to correct products and verify template/editor persistence in an unpublished development theme after exact-command confirmation. Complete remaining custom pages/templates, native critical purchase journeys and app integration, source-fidelity QA, SEO/accessibility/performance/analytics, claims acceptance and controlled release/rollback evidence.

This branch is local only. No push, merge, authenticated theme upload or production publication occurred in this checkpoint. The candidate is not complete or ready to publish.

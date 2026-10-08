# Sites PDP essentials, value, soundtrack and closing — 7 October 2026

Authoritative source: recovered `reference-site/public/product-media/preview.html`, `preview.css`, `preview.js` and `src/media-manifest.json`. This extends Phase 2/3 implementation; it does not complete the wider goal or establish source acceptance.

## Implemented

- Editable essentials strip with the three original statements, decorative separators and omission of empty statements/strip. Mobile treatment follows the source shortened strip.
- Editable PDP value module with current-product pack and estimated application bindings. Shared template has zero applications and no pack, so it stays hidden until those product-specific facts are supplied. Calculation uses the selected variant one-time presentment price, explicitly labelled as one-time cost; subscription discounts are not implied. No division at zero. CAD/USD use tenths of a cent; other currencies use native formatting.
- Editable pink soundtrack/story section with the original turntable-tube photo, photo override, source story/signature and selected native About-page link. The unbound page link stays omitted.
- Source closing presentation and current-product purchase anchor. The native purchase region is focusable for hash navigation.

Product/story statements remain source content awaiting claims and client acceptance; implementation does not grant that acceptance. Product-specific pack/application count, scent, INCI and comparison mappings remain open. Photo/background/font fidelity still needs comparison against the authoritative source under actual Shopify rendering.

## Asset provenance

Recovered local source omitted the downloaded turntable file. It was retrieved from the exact owner CDN URL recorded in the source manifest:

`https://cdn.shopify.com/s/files/1/0960/5778/6740/files/PXL_20260312_224936992.jpg?v=1776721242&width=1600`

Saved as `theme/assets/bpm-sites-turntable.jpg`, 1600×2844, 452986 bytes. SHA-256 `ef743872e2bee879aa30ec378e4fe9d158b8bff1098254d409a7cc2b990f2c75` matches recovered manifest exactly. Source/recovery files were preserved unchanged.

## Verification

- `npm run check:theme`: 93 passing local render checks. Eight new cases cover source essentials, escaping/blank omission, original/override photos and unbound/bound page link, unconfigured value, selected-variant calculation, zero applications and closing target.
- Installed Shopify CLI Theme Check: zero errors, one existing Adobe font RemoteAsset warning. A paragraph schema error was corrected and the full check rerun. The bundled plugin validator was attempted; its known missing `@shopify/theme-check-common` dependency remains unavailable. No managed plugin files or checks changed.
- Fabricated local product fixture checked at 1440×1000, 820×1000 and 375×900. Content width equals scroll width at 1425, 805 and 360px. Soundtrack uses grid on desktop/tablet and flex stack on mobile; mobile value rows stack. Original turntable photo loaded.
- Closing link changes hash to `#ProductPurchase-100`, target exists, and active element becomes that purchase region. No cart/checkout/backend submission.
- Evidence: `sites-pdp-brand-desktop-local.png`, `sites-pdp-value-mobile-local.png`. Value fixture uses 76 g/304 and recovered historical price, not current merchant-binding validation. About-page fixture destination is a local placeholder. Temporary viewport override reset.

## Next work / limits

Continue genuine review/creator integration and source navigation/quick facts, then actual product bindings and custom About/Indigenous/Contact/policy/account pages. Native editor persistence, app integration, purchase journeys, source-fidelity comparisons, SEO/accessibility/performance/analytics, approved claims and release/rollback evidence remain required. Development-theme upload still requires a concrete candidate and exact-command confirmation.

This checkpoint is local only. No push/merge, Shopify upload, merchant-data mutation or production publication occurred. The full Phase 0–5 goal stays active.

# Original Sites carton composition checkpoint

The native-thumbnail fidelity gap recorded in sites-resource-bindings.md is repaired for homepage tracks/bundles and all nine mapped collection products. Two theme SVG assets wrap the original PNG bytes in the recovered crop viewports: Bergamot 197,1,193,430 and Unscented 187,1,213,430. Original pixels are unchanged; no generated imagery or raster resampling was used. See source-carton-art-provenance.json. The two assets are approximately 142 KB each and shared by all compositions.

## Merchant controls and behavior

Each product-presentation block exposes an explicit original-carton composition selector, defaulting to native media for new/unmapped blocks. Existing resource mappings select the correct one-, two- or four-carton mix, including 3-4 Time’s three citrus/one unscented composition. A supplied primary or secondary card image takes precedence; any supplied bundle component image supersedes the source composition. Source singles retain recovered scent-disc/ring, tilt and shadow styling. Native price, range price, availability and product destinations are unchanged. Composition images are decorative within named product links or titled bundle cards; dimensions reserve space. Unknown mix values emit no source artwork and card rendering falls back to native media.

## Verification

158 local LiquidJS checks pass, including all nine exact citrus/unscented counts, unsupported mix, native pricing and merchant override precedence. Resource checks validate 33 mapped references, all nine pack counts and selected compositions. Provenance checks validate each SVG viewBox against crop-settings.json and embedded PNG SHA against media-manifest.json, rejecting external image requests/scripts. Existing gift-card enhancement checks still pass.

Installed Shopify CLI Theme Check: zero errors, one existing main-layout Adobe RemoteAsset warning. Bundled helper validator attempted on changed Liquid source but remains unavailable due to missing @shopify/theme-check-common. No check/cache was modified.

Browser: bound homepage source packs inspected on mobile; both singles, mixed duo and mixed four render the original cartons. Bound collection inspected at 1440×1000, 820×1000 and 375×1000: nine cards, pack counts 1/1/2/2/2/4/4/4/4, all source images loaded, no internal pack overflow, document client/scroll widths equal at 1425/805/360px. Screenshots sites-source-packs-mobile-local.png and sites-source-single-mobile-local.png show restored compositions with historical product/price fixtures. Viewport reset. This verifies these local compositions, not full-page pixel fidelity, native editor rendering, Shopify CDN delivery or purchase backend.

A transient local ENOSPC interrupted one preview/write attempt. Available space subsequently recovered and the same bounded operation completed; existing files, source pixels and recovery provenance remained intact. No unrelated files were removed.

## Remaining work

Complete remaining assigned campaign/wholesale template coverage, About native-body/assignment handling, product-specific PDP source modules and all resource/app/account/policy paths. Full source comparisons, accepted claims, Phase 4 checks and native Phase 5 critical journeys remain required. No push, merge, Shopify upload, store mutation, publication, purchase or external message occurred. The complete Phase 0–5 goal remains active.

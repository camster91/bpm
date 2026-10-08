# Product purchase source alignment

Authoritative source: https://bpm-product-design-review.cameron91.chatgpt.site/product-media/preview.html, each of nine catalogue product keys. Recovered preview.js and site.css provide matching source copy and tablet rules. Figma is not used.

The theme now offers display_title on the purchase section and product_pack blocks. Precedence is section override, matching product-ID block, native product title. Purchase introduction follows section override, matching block, native scent_tagline metafield. Source titles and introductions are populated for both assigned singles and seven ID-mapped generic products. Product records, native metadata/schema identity, native form/variant/quantity/selling-plan inputs and gallery alt identity are preserved. Mobile purchase bar uses the same short display title. Claims/content acceptance remains required.

The source site.css tablet rule was missing from the purchase component: 681–900px has one column, a 560px maximum gallery, 36px gap, 40px heading and 20px introduction. The theme now reproduces that rule and begins its phone purchase styling at 680px, consistent with the source.

## Evidence

purchase-heading-after-20261008.json contains 54 current observations forming 27 pairs: nine products at 375, 820 and 1440px. Both sides were measured sequentially in the same browser tab, after a named product heading, load state and document.fonts readiness. Every row records actual viewport. All 27 pairs match heading/lead text, heading width/height, lead height, gallery width and purchase columns within 0.01px; none has document overflow. Initial separate-tab observations were rejected because the viewport override affected only one tab. Intermediate tablet lead mismatch was fixed before replacing the final tablet rows. Do not use the historical before matrix as validated viewport geometry.

349 local rendering checks pass, including matched/unmatched product identity, escaping, section override precedence and native fallback. Installed Shopify Theme Check reports zero errors and one retained RemoteAsset warning for Adobe font delivery. The managed Liquid helper was invoked but cannot load @shopify/theme-check-common; managed validation did not pass. Screenshot purchase-source-tablet-20261008.png shows the locally stacked tablet gallery with fabricated native controls/data.

## Limits and next action

This scopes the purchase heading/intro/gallery-column measurements only. It does not establish full-page pixel fidelity, gallery count/media equality, source breadcrumb/rotation/quick-fact/jump-link equality, backend purchase behavior, native editor persistence or claims approval. The dev theme still contains the previously uploaded a17ef61 candidate; these follow-up changes are local and require a newly frozen candidate and exact-command approval for another upload. No publication, shared product data write, cart/checkout or provider submission occurred.

Next independent action: repair native long-menu-label wrapping using the observed BPM menu structure, then audit and correct rendered product-content heading hierarchy without rewriting shared store data. The full Phase 0–5 goal remains active.

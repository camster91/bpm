# Current access update

Approved source export now confirms field consumption and palette classes 1–4/default in `theme-export-audit.md`. PDP tab bodies use `metafield_tag`; the outer tab guard omits explanatory-only content, a candidate fallback case. Existing types/values remain unchanged. Final editor architecture, validation and client expectations are still open.

Browser verification succeeded on 7 October 2026 UTC. See [authenticated inventory and content definitions](authenticated-audit.md). The earlier access-blocker statements below are historical; file export and complete configuration/compatibility checks remain pending.

# Content ownership and editor strategy — #14

Provisional mapping based on recovered reference and public storefront evidence. Final model depends on #13 authenticated audit and #6 section architecture. No fields or definitions were created.

| Content | Proposed authoritative location | Editor/fallback requirement |
|---|---|---|
| Product titles, descriptions, media, prices, variants, availability | Native products/variants | Shopify Admin; theme reads current data and handles unavailable variants |
| Bundle composition and stock | Shopify Bundles; seven component mappings inspected in `app-audit.md` | App-owned mapping; do not duplicate into section text. Authenticated quantities do not establish stock-on-hand |
| Subscription cadence, price and cancellation | Shopify Subscriptions; one displayed plan, two assigned products | Current app/Admin; use actual selling-plan data. Owner decision needed for Monthly title versus five-month delivery mismatch |
| Collections and product recommendations | Native collections/product references | Merchant selects resources; avoid fixed handles in Liquid |
| Headings, CTA labels/links, editorial image/layout | Reusable section settings | Clear local/shared scope, safe defaults, hide absent optional blocks |
| Ingredients, use instructions, scent details, claims | Existing fields include rich-text Ingredients (`custom.ingredients`), How to Use, Shipping, scent_tagline and paired titles | Reuse verified existing definitions and preserve product-specific source. Source bindings, complete constraints and claims acceptance remain to verify |
| Repeated/shared FAQs and story modules | Inspect existing reusable structures first | Avoid duplicate copies; hide missing optional content, explain editing scope |
| Menus and internal links | Native navigation | Use menu resources and supported page/product links |
| About, ownership, articles, policies | Native pages/blog/policies | Preserve URLs and owner wording; distinguish proposed headlines from approved copy |
| Reviews and ratings | Judge.me | Preserve real product assignments, no invented aggregate ratings |
| Creator videos | Approved media/source references | Hide empty slots; require attribution, rights and captions |
| Forms and email offer | Existing verified provider | No demo coupons/success messages used as operational truth |

## Existing editorial field contract

These are existing definitions inspected in authenticated Admin, not proposed new fields. All ten are used on nine products in the definition list and have Storefront API access checked. Proposed rendering below is pending verification against current theme source and actual product values.

| Namespace/key | Verified type | Candidate rendering/editor rule |
|---|---|---|
| custom.whats_inside_title | Single line text | Product editor; escape text and hide absent optional heading |
| custom.whats_inside_description | Rich text | Product editor; supported rich-text rendering, preserve structure |
| custom.ingredients | Rich text | Product editor; preserve product-specific approved source |
| custom.scent_tagline | Single line text | Product editor; escape text; no invented scent fallback |
| custom.card_color | Single line text | Existing public-product values are palette tokens `1`/`2`; inspect source mapping, use explicit supported-token mapping and safe default. Do not insert raw values as CSS colours |
| custom.shipping | Multi-line text | Product editor; preserve line breaks; retain policy link and current terms |
| custom.shipping_title | Single line text | Escape text; show only with supported content |
| custom.ingredients_title | Single line text | Escape text; show only with supported content |
| custom.how_to_use_title | Single line text | Escape text; show only with supported content |
| custom.how_to_use | Multi-line text | Preserve line breaks and source safety directions |

Nine category-assigned Metaobject fields account for the remaining product definitions; eleven Google-labelled variant fields are existing feed data. See `authenticated-audit.md`. Preserve category/feed ownership and avoid converting those fields into theme-specific editorial content. Metaobject values and semantics still need review, particularly certifications/skin/ingredient claims under #29.

Current default-product Product Tabs block explicitly documents those four paired content sources: how_to_use, whats_inside_description, ingredients and shipping. It has Open first tab by default enabled. Its help text incorrectly calls Ingredients Multi-line text, whereas authenticated definition inspection confirms Rich text. Update candidate merchant help to match the actual type; do not convert the live definition to fit old help. This is evidence of intended binding from merchant-facing help, not verified Liquid implementation. Custom Purchase Options includes a placeholder-discount setting; candidate copy and pricing must instead follow actual eligible selling plans as required above.

## Product value coverage — 7 October 2026 UTC

All nine public product records were opened in authenticated Admin read-only. The ten editorial fields above are populated on every one; no field dialog was changed and Save remained disabled. This verifies values exist and differ by product, not rich-text serialization or theme consumption. Preserve native structures in the export/API rather than rebuilding rich text from the flattened Admin summaries.

| Product | Record ID | card_color token | Ingredients/use-content distinction |
|---|---|---|---|
| Bergamot & Lime single | 14880059228532 | 1 | Essential oils and naturally occurring limonene/linalool/citral note; fingertip directions |
| Unscented single | 14925587775860 | 2 | Unscented ingredient list; fingertip or small-spoon directions |
| Citrus duo | 15141668815220 | 1 | Scented ingredients and fingertip directions |
| Silent duo | 15141686444404 | 2 | Unscented ingredients and small-spoon directions |
| Side A / Side B duo | 15141732581748 | 1 | Separately labelled scented and unscented lists; fingertip directions |
| Four on the Floor | 15222327476596 | 1 | Both labelled ingredient lists; wide-area directions |
| Citrus Family | 15222328361332 | 1 | Labelled scented list; wide-area directions |
| Silent Family | 15222329180532 | 2 | Labelled unscented list; wide-area directions |
| 3/4 Time | 15222739599732 | 1 | Both labelled ingredient lists; wide-area directions |

Each scent tagline is product-specific, including bundle ratios. Do not replace seven bundle records with a shared single-product copy block. Shipping fields on the two singles state Canada/US, CAD prices and processing/shipping terms; this is merchant copy, not verification of shipping zones/rates or Markets. Validate against operational settings before changing or presenting it as checkout truth.

The Bergamot category summaries contain Material Metal/Paper, four active ingredients, Tube, Cream/Lotion/Paste, Bergamot + Lime, multiple skin/gender choices and broad certifications/standards labels. Those labels are configured data, not independently verified certification or permission to promote claims. Some labels are truncated in Admin; do not reconstruct them. Unscented category summaries currently show no values for the inspected fields except Target gender. Preserve missing values rather than copying Bergamot claims or scents into Unscented. Reference records/ownership and approved claim substantiation remain part of #14/#29.

Admin's product list contains eleven Active records: these nine public products plus two retailer testers, product type `retailer tester`, each showing zero channels. The testers were not opened, changed or published. Nine public products and field-definition usage counts must not be represented as the entire Admin catalogue. Preserve their existing publication boundary in migration.

Suggested editor demonstration: change text/image/link, add/reorder a section and app block, edit product content and reload; verify every affected shared-template surface. New custom layouts may need development. Verify source consumption, product-specific values, constraints and optional-content handling before finalizing this contract. This document does not satisfy those remaining #14 requirements.

# Current access update

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
| Ingredients, use instructions, scent details, claims | Existing fields include rich-text Ingredients (`custom.ingredients`), How to Use, Shipping, scent_tagline and paired titles | Reuse verified existing definitions and preserve approved product-specific source. Remaining namespace/validation/source bindings need inspection |
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
| custom.card_color | Single line text | Validate supported colour syntax before styling; safe theme colour fallback |
| custom.shipping | Multi-line text | Product editor; preserve line breaks; retain policy link and current terms |
| custom.shipping_title | Single line text | Escape text; show only with supported content |
| custom.ingredients_title | Single line text | Escape text; show only with supported content |
| custom.how_to_use_title | Single line text | Escape text; show only with supported content |
| custom.how_to_use | Multi-line text | Preserve line breaks and source safety directions |

Nine category-assigned Metaobject fields account for the remaining product definitions; eleven Google-labelled variant fields are existing feed data. See `authenticated-audit.md`. Preserve category/feed ownership and avoid converting those fields into theme-specific editorial content. Metaobject values and semantics still need review, particularly certifications/skin/ingredient claims under #29.

Current default-product Product Tabs block explicitly documents those four paired content sources: how_to_use, whats_inside_description, ingredients and shipping. It has Open first tab by default enabled. Its help text incorrectly calls Ingredients Multi-line text, whereas authenticated definition inspection confirms Rich text. Update candidate merchant help to match the actual type; do not convert the live definition to fit old help. This is evidence of intended binding from merchant-facing help, not verified Liquid implementation. Custom Purchase Options includes a placeholder-discount setting; candidate copy and pricing must instead follow actual eligible selling plans as required above.

Suggested editor demonstration: change text/image/link, add/reorder a section and app block, edit product content and reload; verify every affected shared-template surface. New custom layouts may need development. Verify source consumption, product-specific values, constraints and optional-content handling before finalizing this contract. This document does not satisfy those remaining #14 requirements.

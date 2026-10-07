# Current access update

Browser verification succeeded on 7 October 2026 UTC. See [authenticated inventory and content definitions](authenticated-audit.md). The earlier access-blocker statements below are historical; file export and complete configuration/compatibility checks remain pending.

# Content ownership and editor strategy — #14

Provisional mapping based on recovered reference and public storefront evidence. Final model depends on #13 authenticated audit and #6 section architecture. No fields or definitions were created.

| Content | Proposed authoritative location | Editor/fallback requirement |
|---|---|---|
| Product titles, descriptions, media, prices, variants, availability | Native products/variants | Shopify Admin; theme reads current data and handles unavailable variants |
| Bundle composition and stock | Current verified bundle integration | App-owned mapping; do not duplicate into section text |
| Subscription cadence, price and cancellation | Verified selling-plan/provider data | Current app/Admin; no invented options when unavailable |
| Collections and product recommendations | Native collections/product references | Merchant selects resources; avoid fixed handles in Liquid |
| Headings, CTA labels/links, editorial image/layout | Reusable section settings | Clear local/shared scope, safe defaults, hide absent optional blocks |
| Ingredients, use instructions, scent details, claims | Inspect existing product fields and description first | Preserve approved product-specific source. Decide whether structured fields are necessary after inspecting existing definitions |
| Repeated/shared FAQs and story modules | Inspect existing reusable structures first | Avoid duplicate copies; hide missing optional content, explain editing scope |
| Menus and internal links | Native navigation | Use menu resources and supported page/product links |
| About, ownership, articles, policies | Native pages/blog/policies | Preserve URLs and owner wording; distinguish proposed headlines from approved copy |
| Reviews and ratings | Judge.me | Preserve real product assignments, no invented aggregate ratings |
| Creator videos | Approved media/source references | Hide empty slots; require attribution, rights and captions |
| Forms and email offer | Existing verified provider | No demo coupons/success messages used as operational truth |

Suggested editor demonstration: change text/image/link, add/reorder a section and app block, edit product content and reload; verify every affected shared-template surface. New custom layouts may need development. Names/types/validation for any required metafields/metaobjects must be defined only after existing structures and app ownership are verified. This document does not satisfy those remaining #14 requirements.

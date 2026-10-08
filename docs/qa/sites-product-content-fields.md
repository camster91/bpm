# Sites PDP product content bindings

The Sites review and recovered reference-site remain authoritative. This checkpoint extends the custom PDP with existing merchant-owned product fields verified in docs/content-ownership.md. No definitions, app, product values, or store settings were created or changed.

## Implemented contract

- Purchase introduction uses the explicit section setting first, then custom.scent_tagline.value. This does not infer a complete scent story.
- Ingredient disclosure uses the explicit rich-text section override first, then current product custom.ingredients via native metafield_tag, with custom.ingredients_title when available. No ingredient or allergen list is shared across products by fallback.
- Application retains editable source steps and additionally renders current product custom.how_to_use/title; text is escaped and line breaks preserved, including safety copy.
- Full notes preserve native product.description independently, render custom.whats_inside_description via metafield_tag/title even if description is empty, and render custom.shipping/title with escaped line breaks plus the current native shipping-policy link when available. Shipping notes are merchant content, not verification of operational rates.
- Blank fields produce no empty product notes or ingredient disclosure. Existing card_color is not injected as arbitrary CSS; catalogue art continues to use the separate allowlisted mapping.

## Verification

129 local LiquidJS render checks pass, including separate bundle ingredient lists, allergen text, explicit override precedence, escaped directions/scent, retained safety line breaks, inside-only products, current policy URLs and blank fields. Rich-text serialization in these checks is an explicit mock; actual Shopify metafield_tag output still requires runtime QA.

Installed Shopify CLI Theme Check: zero errors, one pre-existing Adobe font RemoteAsset warning. The bundled skill validator was attempted with changed Liquid source and remains unavailable because @shopify/theme-check-common is missing; no managed cache or checks were changed.

Local browser fixture inspected at 375×812, 820×1000 and 1440×1000. Document widths/scroll widths agree at 360, 805 and 1425px. Directions, rich product notes and the expanded ingredient disclosure show no internal horizontal overflow after correcting the rotated disclosure icon spacing. Native disclosure opens via the browser control. Screenshot sites-product-fields-mobile-local.png shows fabricated product directions with their separate safety line. Viewport reset.

## Remaining work and boundaries

Actual Shopify Liquid serialization, product/editor rendering, account model, app integrations, resource bindings, claims acceptance, source fidelity, performance/analytics/accessibility and native critical journeys remain unverified or incomplete. The last connector inspection pointed to a different store; it must not be used to change BPM. Store-specific work requires a verified BPM destination.

Continue with remaining native storefront templates and real resource mapping before preparing the exact authenticated unpublished development-theme upload command for approval. No push, merge, upload, production publication, purchase, client message or Shopify data mutation occurred. Full Phase 0–5 goal remains active.

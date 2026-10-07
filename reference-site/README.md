# BPM product design review

Public full-site review, including all nine products. This is a design preview, not a Shopify storefront. No purchase or subscription is submitted. Shopify and Figma remain unchanged.

Build: `node build.mjs`. Tests: `node --test tests/*.test.mjs`.
The standalone Worker is `dist/server/index.js`; Sites binds D1 as `DB`. Static UI, logo and display font are embedded. Brand-owned photography/video use the source URLs in `src/media-manifest.json`; crop responses preserve source pixels with bounds in `src/crop-settings.json`. Roc Grotesk uses the owner's existing Adobe kit, with an Arial fallback.

## Shared review controls

Click Review & comment, or Comment on this section. Select the section, enter a name and feedback, then save. Shared comments support product/all-product filters, section links, addressed/reopen status, refresh and JSON download. The latest 500 comments appear; older records remain stored. Draft text remains in the open form on save failure. Closing/reloading a page discards an unsaved draft. Site access controls determine who can see and contribute; this interface stores display names, not login emails. Names are reviewer-supplied, not verified identities.

The API requires Sites-authenticated identity and same-origin JSON writes, validates context and lengths, binds SQL values, renders feedback as text, and reports failures without claiming a save. No public anonymous comment endpoint is intended.

## Review evidence, 30 September 2026

The original product-only review was ready with conditions; the complete site review supersedes that scope. Browser-checked all product-page sections, desktop at 1280 and mobile at 390, correct products/prices/ingredients, framed gallery assets, comparison containment, no horizontal overflow, actual display/body font families, playable 15.04-second video, shared comment saving/status/reload/cross-product display. Three API tests passed using isolated SQLite data, including authentication/origin validation and invalid inputs. Fixed closing/button contrast, footer logo filter and gallery labels during review.

The original video has audio; the VTT describes visuals and is not a verified full audio transcript. Full accessibility compliance, additional browsers/devices, production checkout and client acceptance are outside the tested scope. Motion and content sliders remain planned treatments; the current preview includes gallery selection and native video playback. Anyone with the link can view; comments require authenticated sign-in.

## Texture photo update

The cream texture card and gallery use an AI-assisted retouch derived from the original owner photo. It preserves the crescent, warm colour and spread texture while cleaning distracting pits/background dust. Original source remains in the media manifest.

## Complete site review

The root now opens the homepage. `/review.html` lists all review routes. See `full-site-review.md` for scope, sources and Shopify approval gates. Twenty-five HTML page routes cover all eight articles and seven policies; the enriched product template supports all nine catalogue options. Thirty-two page/product combinations passed desktop and mobile text/overflow checks (with the mobile hero wrapping repaired and rechecked). The shared bag, mobile navigation, pack/search filters and local page-comment persistence were exercised. Four comments API tests and the 25-route/41-internal-target check pass. Shopify, live checkout and client acceptance are separate.

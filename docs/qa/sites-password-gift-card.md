# Password and gift-card native template checkpoint

Added password.json with an editable access section and gift_card.liquid with native issued-card data, using a shared bpm-utility layout. These native pages are absent from the Sites preview: source logo, display font, palette and spacing inform the extension without claiming a separate source-page match.

## Behavior

- Password page renders the current shop.password_message, optional merchant heading/introduction, and native storefront_password form. Required password input has current-password autocomplete and associated native error region. No password is prefilled or echoed and no newsletter/provider signup is introduced.
- Gift card displays native balance/initial value, grouped code, expiry and distinct disabled/expired/fully redeemed states. Native Wallet pass and QR redemption controls are offered only for enabled, unexpired cards with balance. Native Shopify vendor QR library is used; no third-party QR service receives the identifier.
- Clipboard/print enhancements are progressive: without JavaScript the code remains selectable; clipboard denial produces an accessible manual-copy message; missing/failed QR generation retains visible code. Copy normalizes display whitespace. Print styles hide action controls and retain card content.
- Utility logo has an optional global image override and original Sites mark fallback. Layout keeps content_for_header and content_for_layout, hides ordinary commerce navigation, uses noindex/nofollow and no-referrer, and loads local theme styles/scripts. It does not add remote Adobe font or theme analytics code; Shopify’s platform/app content_for_header remains native and needs runtime inspection.

## Verification

141 local LiquidJS rendering checks pass, including password field/error associations, gift-card values and state branches, missing expiry/Wallet and utility layout isolation. Gift-card JavaScript mock checks pass for successful/denied/unavailable clipboard, print handler, and successful/failed QR construction. No real code or credential fixtures are used. Native Liquid forms/serialization/backend behavior are not emulated.

Shopify CLI Theme Check: zero errors, one existing Adobe font RemoteAsset warning on the main storefront layout. Bundled validator attempted with new Liquid sources but unavailable due to missing @shopify/theme-check-common. No check was disabled or managed plugin cache changed.

Local browser password fixture inspected at 1440×1000, 820×1000 and 375×812 with document scroll/client widths equal at 1440, 820 and 375px and no panel overflow. Gift fixture inspected at 1440×1000, 820×1000 and 375×1000 with widths equal at 1425, 820 and 360px, no panel/code overflow. Browser Copy code action returns Code copied for TESTONLY00000000. Native vendor QR is deliberately omitted from the local fixture; Wallet, printing/PDF, code redemption and authenticated password submission are unverified. Viewport reset. Screenshots sites-password-mobile-local.png and sites-gift-card-mobile-local.png show fabricated data.

## Next work

Verify actual BPM account model and preserve supported customer journeys, map native resources/apps into the source modules, complete claims/source-fidelity and Phase 4 review, then native critical journeys and controlled release evidence. The full Phase 0–5 goal is active. No push, merge, Shopify upload, password-setting change, issued-card change, production publication, purchase or client communication occurred.

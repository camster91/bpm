# Sites policy index, recovery and native markets — 7 October 2026

Source policy-index presentation: recovered `reference-site/public/policies.html`. 404 and native market controls extend the same theme system to required storefront states absent from the prototype. Phase 3 remains incomplete.

## Implementation

- `page.policies.json`: original opening, native `shop.policies` list with current title/URL, omission of absent/empty policy records and editable additional-policy menu for verified subscription/legal/contact-information pages not exposed by the native list. No legal body is copied, rewritten or invented. The seven source destinations require reconciliation against current native records and supplementary pages before acceptance.
- Native Shopify policy-container typography/spacing/links/table overflow styled through theme CSS. Policy records and native URLs remain authoritative; no separate native policy template is assumed.
- `404.json`: localized clear heading, native shop route and labelled required GET search query. Genuine Shopify 404 HTTP status and search-result navigation require runtime QA.
- Footer option and native localization snippet show configured available country/currency and language choices, preserve current selections and submit through Shopify localization. Standard selects and explicit Apply work without JavaScript. One-country/one-language choices stay omitted. Current footer market display remains native. Market routing, translated merchant content, price/tax/currency and cart continuity remain unverified.

## Validation

`npm run check:theme`: 121 passing local render checks; eight new cases cover actual/nonempty policy links, extra-policy menu, empty state, native available/selected markets/languages, omission, 404 native routes and footer-to-snippet context binding. A fixture-only context isolation issue was found and resolved by explicitly passing the native localization object into the snippet. Local form cleaning now keeps the contact/localization classes and isolated mock actions.

Installed Shopify CLI Theme Check: zero errors, one existing Adobe RemoteAsset warning after correcting a missing translation key. Bundled helper validation attempted; known missing `@shopify/theme-check-common` remains. No managed plugin cache changes or disabled checks.

Browser fixtures: policy index and 404/market at 1440×1000, 820×1000 and 375×1000; content/scroll widths 1425, 805 and 360px. Native policy-body wrapper fixture inspected at desktop/mobile with one H1 and no overflow. Fake country US/language fr selection succeeds locally; Apply and search submits remain disabled. No actual market change, search request or policy mutation. An invisible Apply label on the dark footer was fixed; final mobile button has dark `rgb(35,31,32)` text on cream `rgb(255,253,233)`. Viewport reset after QA.

Evidence: `sites-markets-desktop-local.png`, `sites-markets-mobile-local.png`, `sites-policies-mobile-local.png`. Policy records, destinations and market lists are explicitly fabricated fixtures; these do not prove current store configuration, localization POST behavior, policy delivery or runtime 404 status.

## Next work

Verify the actual account model and enabled account journeys; bind all real products/pages/apps/policies and language resources; complete source-fidelity comparisons, SEO/accessibility/performance/analytics, approved claims and native critical journeys. Prepare complete unpublished development candidate and exact upload-command confirmation, then controlled release/rollback evidence.

No push, merge, authenticated dev-theme upload, publication, store market change, legal-record edit or external message occurred. The full Phase 0–5 goal remains active.

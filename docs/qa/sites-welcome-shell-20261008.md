# Source welcome launcher shell — 2026-10-08

New footer-group section `bpm-sites-welcome` supplies the Sites launcher, pink offer art, cream dialog, editable heading/copy/terms and provider app-block slot. Both enabled and provider-verified settings default false; the committed footer instance remains disabled. No output is emitted unless both gates and an actual app block are present. Known signed-in marketing subscribers are suppressed; provider behavior for anonymous existing subscribers remains unverified.

The shell does not create a form, subscriber, discount, coupon or email. It does not copy the source demo success/code or store email addresses. Actual provider markup is rendered through the existing native app-block snippet. Providers may require a different integration or be incompatible with dialog placement; native app rendering, consent, error/success, duplicate/double-opt-in and discount delivery must be verified before enabling. A checkbox declaration is not evidence that this verification occurred.

The launcher is progressively shown only with supported native dialog functionality. Enter opens a labelled modal; Close and Escape dismiss and restore launcher focus. There is no timed popup. Section-load binding is idempotent, and unloading closes its open dialog. Native dialog provides modal focus containment; actual provider iframe/focus behavior remains an integration gate.

Browser fixture at 375/820/1440px opened as `:modal`, focused Close, fit inside the viewport, closed with Escape and restored focus. Close-button Enter was also checked. The fixture contains a provider placeholder note and no form, labelled throughout as local-only. Raw data and mobile screenshot: `sites-welcome-shell-20261008.json/.png`. Source styling is preserved with a 44px close target; full source/device parity and short-landscape/provider content remain to be checked.

Five gate/render checks bring the suite to 337 cases. Existing product/motion/gift-card/resource/app checks pass. Shopify Theme Check has zero errors and the existing Adobe Typekit warning. The skill search helper found official app-block guidance; its validation helper remains unavailable due to missing `@shopify/theme-check-common`. Installed CLI validation and local/browser evidence do not replace native runtime validation.

No store settings/provider/offer activation, upload, external message or GitHub mutation. Existing frozen candidate does not include this feature; refresh it after current work is reviewed. Operational welcome-offer delivery remains unfinished, while presentation implementation has advanced.

Follow-up lifecycle verification: `scripts/test-theme-welcome.mjs` exercises editor rebinding without duplicate listeners, repeated-open guard, interior/provider/backdrop clicks, close focus return, section-unload closure, detached-launcher focus avoidance and unsupported-dialog hiding. This host test does not replace actual editor/provider execution.

Additional browser viewports 320×568, 812×375 and 430×932 retained dialog bounds inside the screen and a visible 44×44 Close target. The first two used internal scrolling for overflow. Escape worked after each opening. `sites-welcome-short-viewports-20261008.json` records geometry. Physical mobile keyboards, provider content/iframes and device behavior remain unverified.

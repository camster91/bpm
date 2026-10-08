# Local source and native-template coverage audit

The fresh recovered-source suite passes: 60 protected source-file hashes, 10 parsed scripts, build, five isolated review API tests and 25 routes/40 internal targets with zero broken targets. It does not authenticate to Shopify or verify storefront functionality.

`template-coverage-20261008.json` classifies every recovered public HTML page (excluding the shared header/footer fragments), inventories the actual template files, and resolves every ordered JSON section to a local Liquid file. `npm run check:coverage` repeats the classification and file checks. CI now runs it as a nondeploying check; missing mappings or section files fail. The summary deliberately reports unresolved account coverage and does not claim release readiness.

The inventory contains **22 templates, 109 ordered sections and nine catalogue products**. It is template presence evidence, not rendered fidelity, native resource assignment or merchant editor persistence. All eight article pages have a prepared source-content entry; native IDs and application remain unverified. Seven policy detail pages (plus the policy index) have a prepared source-content package. They require verified current policy/page destinations, approved bodies, and actual native policy layout comparison. See `source-policy-content-20261008.md`. `review.html` is an intentional internal review-tool exclusion, consistent with the plan.

## Account boundary discovered

The actual custom theme has none of the seven legacy customer templates: login, register, account, order, addresses, activation and password reset. The protected historical Dawn export contains those seven files. Any assertion that these templates exist in the custom theme is incorrect. The header currently uses a conditional native `routes.account_url` link; that does not prove account mode, sign-in, order/profile/address journeys, existing account customization or app compatibility.

Current [Shopify template documentation](https://shopify.dev/docs/storefronts/themes/architecture/templates#legacy-customer-account-templates), consulted 8 October 2026, describes legacy templates as deprecated and says **publishing a theme without them automatically upgrades merchants to the latest customer-account experience**. Modern account pages operate independently of the theme. The historical export does not establish the store's current mode. Do not add deprecated templates solely to satisfy a file count or change the store account mode without resolving the real integration boundary.

Before publication, Cameron/implementation QA must verify the current account mode, required sign-in behavior and account customizations/apps; identify whether publication would upgrade accounts; record explicit migration acceptance if applicable; then test the actual account journeys. An unresolved account migration or major account regression blocks release under #20/#26/#27. Development upload approval does not approve publication or an account-mode change. The modern account component and native sign-in integration should be assessed against the current verified mode and source header behavior.

## Candidate identity and next action

No theme files changed in this audit. The preserved c1655f6 candidate still matches theme tree `b1b46a6553c276c090544966da5c85ed7e934095`, with 163 files, 45,082,931 bytes and explicit development noindex; its hash verifier passed again. No custom push, merge, upload or publication occurred.

The pending next native action remains approval of the exact development upload command in `../dev-upload-readiness.md`, followed by current resource/editor/app/account-mode inspection. Full device, commerce, claims, analytics, accessibility, performance, acceptance and release/rollback gates remain open. This audit changes the account-release assessment and does not close the full goal.

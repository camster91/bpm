# BPM work pickup — 8 October 2026

## Scope and authority

Complete the existing Phase 0–5 plan in shopify-redesign-plan.md. Sites/recovered reference-site is the visual and interaction authority; do not use Figma. The current client homepage extends homepage content authority, as recorded in custom-theme-design-source.md. Keep native products, prices, availability, selling plans and apps as data sources. Production publication requires separate explicit approval.

## Saved execution state

Branch: work/custom-figma-theme (historical name, Sites implementation). Repository: https://github.com/camster91/bpm. Master tracker: https://github.com/camster91/bpm/issues/11. Recovery PR #12 is separate from this custom implementation. Local working folder: /Users/Cameron/Documents/Codex/2026-10-06-let-s-work-on-this/bpm. Chat ID: 01a1117e-2193-7d63-8795-02b3b9c76f08.

Approved and uploaded theme source commit: 3d296aaf5f4e0819a5bbb78299f3e98cbe6f161c. Theme tree: b0fe9ad70354ee931e2624e0f2e74104ff3de522. Development theme 194480669044 on qef4ye-yg.myshopify.com, context bpm-sites-custom-qa-20261008-5daa4af. The stored receipt and native QA, rather than this note, are authoritative evidence of that upload. Re-verify current identity before later mutation. No production publication, custom branch merge, checkout or newsletter submission occurred.

Preview: https://qef4ye-yg.myshopify.com?preview_theme_id=194480669044
Editor: https://qef4ye-yg.myshopify.com/admin/themes/194480669044/editor

Latest implementation integrates client homepage wording into 17 active editable sections, native collections, pricing cards, image pickers and genuine Judge.me medals/snippets. Purchase copy/tablet rules follow Sites. Ingredient headings are corrected in theme output without shared product-data edits.

## Verification and limits

Full local check:theme passes, including 355 chrome cases; 111 resource references resolve against recorded audit data. Frozen candidate Theme Check has zero errors and one existing Adobe RemoteAsset warning. Managed Liquid helper is unavailable because its bundled dependency is missing. Coverage reports 25 source pages, 22 templates and 115 ordered sections; it does not prove release readiness.

Native homepage at 375/820/1440px: 17 sections, one H1, no duplicate IDs or document/pricing overflow. Nine-entry menu and five FAQs work by keyboard. Certification/pricing images and both Judge.me regions load. Native Bergamot product has one H1, 15 lowered ingredient headings, one-time/subscription options and native cart form. No commerce/provider submissions were made. See qa/dev-upload-result-20261008-3d296aa.json, qa/client-content-native-responsive-20261008.json and the native desktop screenshot.

Historical purchase-heading-before-20261008.json is diagnostic only. Separate-tab viewport observations were unreliable; use purchase-heading-after-20261008.json and purchase-source-alignment-20261008.md for the corrected paired evidence. Do not treat the before matrix as acceptance proof.

## Resume in order

1. Inspect checkout/status, this branch's GitHub PR and CI, current dev identity and acceptance-gates-20261008.md. Preserve unrelated work; do not silently change the approved uploaded bytes.
2. Verify theme-editor add/reorder/edit/save/reload/restoration in the development theme, complete native binding checks and compare all source pages/states against native renderings. Current save/reload, account mode and full visual/device acceptance remain unproven.
3. Establish an explicitly bounded isolated commerce/provider test workflow before native cart/checkout/newsletter/review submissions. Verify one-time, subscription, bundles, variant/stock/error and checkout journeys, plus delivery/consent/deduplication.
4. Resolve client claims/certification/pricing estimates and all policy/article/application approvals. The website pricing lines total $24.00 while the client label is $23.99; retain this discrepancy for client decision. Seven legacy account templates are absent; account/publication migration remains a release gate.
5. Complete SEO, accessibility, performance, analytics, CI/review, representative physical-device QA and current backup/rollback rehearsal. Preserve the full plan; green local checks are not client acceptance or release completion.
6. Prepare a concrete release packet only after the required gates pass. Do not publish until explicitly approved. Any revised authenticated CLI command/upload must be shown and separately confirmed according to the Shopify CLI skill.

Owner: Cameron/implementation work for access and bounded test decisions; Corey/client for acceptance and claims evidence. No external client communication is authorized by this handoff.

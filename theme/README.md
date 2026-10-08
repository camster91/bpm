# BPM custom theme — unpublished development candidate

The authoritative design is the [Sites review](https://bpm-product-design-review.cameron91.chatgpt.site/index.html) and recovered `reference-site/` code. Figma is superseded. Historical foundation documentation is preserved in `docs/plan-history/2026-10-07-before-custom-dev-candidate/theme-README.md`.

The theme implements all thirteen homepage modules; shared navigation/footer; product, collection, search, cart, blog/article, general/story/contact/policy, campaign/wholesale, customer and utility templates. Nine source product compositions retain original artwork and crop provenance with merchant image overrides. Native resource pickers, products/variants/selling plans, reusable section schemas and captured Judge.me blocks replace prototype commerce. Metadata/schema use native resources; development noindex remains enabled. Source motion supports visitor pause, reduced motion and merchant controls.

Run `npm run check:theme` and installed `shopify theme check --path theme --output json`. Latest verification: 319 local rendering checks, lifecycle/gift-card checks, 96 resource-picker bindings and 9 app bindings pass; Theme Check has 0 errors and 1 existing Adobe RemoteAsset warning. These do not establish current Shopify resource resolution, real app behavior, editor persistence, complete source fidelity or checkout correctness.

Prepare a committed local snapshot with `node scripts/prepare-dev-theme.mjs /absolute/new/snapshot-directory`. It contains only Shopify theme directories, a SHA-256 file manifest and source commit identity; no upload occurs. Review `docs/dev-upload-readiness.md` before authenticated upload. The old repaired-Dawn upload command is superseded for this candidate.

Native development QA, full device/state comparisons, approved claims/policies/offers, provider and subscription decisions, analytics/consent, measured performance and controlled release/rollback evidence remain open. This is a candidate for isolated integration testing, not a verified release candidate. Live publication requires separate explicit approval.

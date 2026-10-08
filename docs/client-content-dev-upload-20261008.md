# Client-content dev upload review

Candidate 3d296aaf5f4e0819a5bbb78299f3e98cbe6f161c, theme tree b0fe9ad70354ee931e2624e0f2e74104ff3de522. Immutable path /tmp/bpm-sites-dev-candidate-20261008-3d296aa/theme. 168 files, 45,111,958 bytes. Hashes/file set verified; matches current theme tree; noindex explicitly true. Theme Check: zero errors, one Adobe RemoteAsset warning. No upload executed for this candidate.

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme push --store qef4ye-yg.myshopify.com --path /tmp/bpm-sites-dev-candidate-20261008-3d296aa/theme --development --development-context bpm-sites-custom-qa-20261008-5daa4af --strict --json
```

Target: BPM store qef4ye-yg.myshopify.com, existing development context bpm-sites-custom-qa-20261008-5daa4af mapping to theme 194480669044. Replaces that dev context's theme files/settings with the frozen candidate. Transmits the 168 Liquid/JSON/CSS/JS/font/image assets and settings including client content, native newsletter form mode, resource/image handles and homepage Judge.me configuration. Excludes repository docs, captured reviews/inventory, audits, manifests, reference-site and Git history. May request authentication. If the CLI context mapping has expired it can recreate the development context; inspect returned ID/role before further writes. No --live, --publish or --allow-live flags.

Dev storefront shares native products, articles, apps and provider/customer backends. Native newsletter UI retains the existing live customer-form route and newsletter tag; signup can create marketing customers and trigger existing automations if a person submits it. No provider settings, sends or submissions are requested. Verify native rendering, resource resolution and editor persistence after upload; keep cart/checkout/provider submissions separately bounded. No production publication is authorized.

Shopify CLI skill requires the exact command, target, transmitted data and effects to be shown and then explicit human confirmation in a separate turn. This packet makes the new candidate reviewable; previous approvals for a17ef61 do not approve these new bytes. See client-home-content-migration-20261008.md, its scope/evidence and the two desktop review screenshots. Full release/claims/account/commerce/analytics/rollback gates remain open.

## Consolidation

This replaces the earlier 415e242 upload review with one frozen candidate including the current client homepage, purchase-source alignment, long-menu layout and product ingredient heading repair. The earlier review is preserved in plan-history/client-content-dev-upload-415e242-20261008.md. 355 chrome rendering checks and the complete npm run check:theme suite pass. Theme Check ran on this snapshot with zero errors and the existing Adobe RemoteAsset warning. README.md is excluded as documentation; the 168 deployed theme files match committed source hashes. No upload has run. Human confirmation of this exact revised command is required; automatic goal continuation is not confirmation.

## Approved client-content upload completed

Human explicitly approved 3d296aa. The exact reviewed command completed with exit 0, no upload errors, zero Theme Check errors and one RemoteAsset warning. Returned identity is development theme 194480669044, unchanged name/context. The browser preview bar shows Draft. See qa/dev-upload-result-20261008-3d296aa.json. No publication command ran.

Native read-only homepage QA now covers 375/820/1440px: 17 active sections, one main H1, no duplicate IDs or document/cost-card overflow, two genuine Judge.me regions, five FAQ controls and compact navigation. The nine-entry menu opens by keyboard and Escape closes it; all five FAQs open by keyboard with the sensitive-area qualifier retained. The certification badge and original pricing image load after scrolling/disclosure; initial lazy-load observations were not image failures. The newsletter has a native customer-form action, required consent and privacy link; it was not submitted and provider automation remains unverified. Bergamot & Lime renders one main H1, 15 lowered ingredient headings, $23.99 CAD one-time / $21.59 CAD five-month subscription and native /cart/add action. No purchase/provider submission occurred. Evidence: qa/client-content-native-responsive-20261008.json and client-content-native-desktop-20261008.png.

Editor save/reload/restoration, other product states, account mode, isolated commerce/provider tests, full source/device QA, claims, analytics/performance and release/rollback remain open. This is development verification, not client acceptance or release completion. The previous pending-approval statements above are historical and superseded by this result.

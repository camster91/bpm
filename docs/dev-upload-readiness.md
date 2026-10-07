# Development-theme upload review — 7 October 2026

Cameron requested code review and authorised a development theme as the intended upload environment. The candidate is the existing Dawn 15.4.1 theme with thirteen local baseline repairs, not the recovered full-site HTML redesign converted to Shopify sections. The full protected candidate remains outside Git.

## Verified in this review

- Original export: all 404 manifest hashes still match; no files added/removed in the candidate, thirteen source files changed, settings_data unchanged.
- Fresh installed Theme Check: 0 errors, 3 documented warnings (Adobe RemoteAsset, unused Dawn snippet, `offset: continue`). Report remains protected outside Git.
- Fifteen Liquid rendering fixtures pass. Recovery source/build/API/route checks also pass, but those validate the separate HTML reference.
- Limited Shopify-token/private-key pattern scan found no matches; this is not a comprehensive merchant-data review. Upload sends the existing theme/configuration back to the same BPM store. No customer/order records are included in the theme export.

## Verdict

Ready for an isolated development upload to investigate rendering and commerce; incomplete as a redesign or release candidate. Outstanding source risks include stale subscription state after variant changes, incomplete quantity rules, sold-out label restoration, editor reinitialisation, placeholder review output and contact success detection. Native custom product form is not wrapped by Dawn's AJAX component. Tests do not prove actual cart transport, checkout, app compatibility, keyboard/touch behaviour or complete responsive output. Subscription title versus five-month cadence remains an owner decision; store-wide billing/settings must not change during theme QA.

## Prepared command

Installed CLI help confirms `--development-context` creates or reuses a development theme for that context and `--strict` rejects Theme Check errors. The following command is prepared, not executed:

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme push --store qef4ye-yg.myshopify.com --path /Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-local-fixes --development --development-context bpm-baseline-qa-20261007 --strict --json
```

Target: BPM store `qef4ye-yg.myshopify.com`, a separate development context. Transmits the store identifier, authenticated theme requests and all candidate theme files including copied theme settings/app-block references. Creates a development theme if that context is absent, or updates that context's development theme if present. No live target or publish flag is specified. Capture returned ID/role/editor/preview URLs and verify role is development and ID differs from production `190930944372` before further interaction. Unexpected authentication/scopes or a live target require stopping.

The Shopify CLI skill requires exact-command confirmation in a separate user turn before this authenticated upload. General development-upload authorization has been received; this confirmation is the remaining tool-specific requirement. No new design acceptance is inferred. No purchase, outbound contact form, review request, email automation or subscription setting mutation is included.

After upload: inspect representative homepage/PDP/collection/legal pages, typography, app output and mobile controls; verify controlled native cart transport with bounded isolated data. Forms/purchases that trigger live store-wide effects need their own authorised test boundaries. Development themes still share products/apps/store-wide settings with the store. Keep production theme and protected backup intact. Publication and store-wide changes remain separate decisions.

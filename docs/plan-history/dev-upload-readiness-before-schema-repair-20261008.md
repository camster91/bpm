# Custom Sites theme — development upload review

The frozen 5daa4af candidate includes the latest responsive PDP module corrections and matches the current theme, including the corrected mobile native price filter and per-line cart message/quantity association. See `qa/cart-line-error-association-20261008.md` for the scoped browser and quantity-validity evidence. See `qa/mobile-price-filter-20261008.md` for local UI evidence. See `qa/sites-all-pdp-modules-20261008.md` for measured comparisons and pending content differences. Earlier snapshots remain preserved. No upload command has been executed.

## Current frozen candidate

Prepared locally from commit `5daa4af35ac9b7006904c944260cb224c2538e05`; theme tree `a3cf19ec77c74c72217a9b89a492d185cc4b14d5`. Snapshot: `/tmp/bpm-sites-dev-candidate-20261008-5daa4af/theme`. It contains 163 files and 45,083,408 bytes. The verifier confirms the exact file set, every hash and byte against the source commit, current theme-tree identity, and explicit development noindex. The frozen-path installed CLI Theme Check reports zero errors and one existing Adobe Typekit RemoteAsset warning. This is prepared upload evidence, not native validation or client acceptance.

Manifest: `qa/dev-candidate-manifest-20261008-5daa4af.json`. Verification: `qa/dev-candidate-verification-20261008-5daa4af.json`. Earlier snapshots and reviews remain preserved; the preceding review is in `plan-history/dev-upload-readiness-before-5daa4af-20261008.md`. None of the custom-theme upload commands has been executed.

This snapshot includes the disabled welcome/provider shell, native bundle components and line errors, source price/FAQ/CTA corrections, article list/image alignment, merchant-editable related articles, the native-form mobile purchase bar, responsive scent/brand modules, and the generic About resource selection. All 81 compared product-module heading texts and heights match at 375/820/1440px; the two accurate four-pack introductions and explicit one-time/currency cost label still require client acceptance. Local checks include 345 rendering cases, lifecycle checks, 102 historical resource references, nine app bindings, and eight prepared article bodies. Native commerce/apps/editor behavior is unverified. The local inventory has 22 templates and no legacy customer-account templates; verify the current account mode and obtain an accepted migration decision before publication if applicable. Shopify now documents legacy templates as deprecated and publication without them as automatically upgrading accounts; no account migration is approved by a development upload. See `qa/template-coverage-20261008.md`. Prepared source article and policy bodies are repository documents excluded from theme upload; native article and policy data remain unchanged. Seven policy detail pages are now packaged with source hashes and text/link integrity checks; current policy destinations and operational/legal acceptance remain unverified. See `qa/source-policy-content-20261008.md`.

## Exact command awaiting separate confirmation

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme push --store qef4ye-yg.myshopify.com --path /tmp/bpm-sites-dev-candidate-20261008-5daa4af/theme --development --development-context bpm-sites-custom-qa-20261008-5daa4af --strict --json
```

Target: BPM store `qef4ye-yg.myshopify.com`, development context `bpm-sites-custom-qa-20261008-5daa4af`. This creates a development theme if the context is absent, or replaces files in that context's existing development theme. It sends the 163 frozen theme files: Liquid/JSON/CSS/JS/fonts/images, merchant settings, resource handles and app references. It excludes repository docs, article content package, reference-site, tests, protected audits, manifests and Git history. No environment `SHOPIFY_FLAG_*` overrides were present during preparation; recheck before execution. Do not substitute a mutable checkout or earlier snapshot.

The command may start Shopify authentication. It does not publish or target the live theme. The dev storefront shares the store's products, articles, apps, customer data and service backends: preview interactions can have real effects. Newsletter/welcome activation, content edits, review/form submission, real purchases and store-wide settings remain separately gated. No provider, discount or subscriber flow is activated by this candidate.

Approval requirement: Shopify CLI skill states, “Before executing a Shopify CLI command that authenticates, requests access scopes, transmits queries, variables, files, configuration, or identifiers, installs or upgrades software, deploys, deletes resources, or runs a mutation, show the exact command, target, transmitted data, and side effects, then obtain the user's explicit confirmation in a separate turn.” Automatic goal continuations do not satisfy this confirmation. Source: `/Users/Cameron/.codex/plugins/cache/openai-curated-remote/shopify/4.1.1/skills/shopify-use-shopify-cli/SKILL.md`.

## After approved upload

1. Record the returned theme ID, role, context, editor and preview URL. Verify it is the intended development target; stop before further writes on conflicting state. Retain partial-upload evidence if the command fails.
2. Inspect actual native resource/template assignments, images and app blocks. Capture representative phone/tablet/desktop source comparisons. Fixture mappings are historical leads, not authenticated resolution.
3. Verify heading/image/button edits, section add/reorder/remove, app block configuration and save/reload persistence in the dev theme. Undo bounded theme-only test edits and retain candidate identity. Shared product/article fields require their separate approved test boundary.
4. Verify Judge.me attribution/listing, combined structured data, subscription cadence/price/availability, bundle components/stock, account model and markets. Do not change store-wide settings to fit fixtures.
5. Establish an isolated, approved commerce test boundary before cart/checkout or provider submissions. Verify native one-time/subscription/bundle/error journeys and checkout handoff within that boundary.
6. Complete source/state/device QA, accessibility, performance, analytics/consent, claims/provider decisions, client acceptance and release/rollback evidence against the full Phase 0–5 plan and `acceptance-gates-20261008.md`.

## Release and rollback boundary

A failed development upload does not authorise production replacement. Restore/re-upload/delete commands require their exact bounded approval. Before production release, resolve current account mode and the documented automatic account-upgrade side effect of publishing without legacy templates, confirm current live theme identity, preserve a fresh named backup, validate the approved candidate and exact publication/rollback commands, record approvals, and rehearse recovery. The historical October export is not a current release backup. No publication or completed rollback rehearsal is claimed.

# Local theme baseline fixes

Cameron authorized fixes after reviewing the baseline findings. Work is in `/Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-local-fixes`, a separate copy of the approved export. All 404 original file hashes still match the backup manifest. Nothing uploaded, published, pushed or merged; no subscription plan or store configuration changed.

Portable source patch: `patches/theme-baseline-fixes.patch`, thirteen files. The full theme/configuration stays protected outside Git. `git apply --check` succeeds against the original exported source.

## Changes

- Removed two incomplete/unavailable demo-font faces and their three missing asset references. Retained the existing Adobe stylesheet, existing family choices, present font files and fallbacks. No replacement font or font licence was acquired. Rendered typography still requires candidate preview review.
- Added intrinsic preview-image dimensions to the three carousel/gallery images.
- Replaced obsolete section-schema `templates` with `enabled_on.templates`, preserving product-only availability. See [Shopify section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema).
- Reused existing translated pairing label/help keys in featured-product instead of creating untranslated keys across every locale.
- Initialized scheme_classes in both layouts, removed unused assignments/capture, and changed two variable names to snake_case. Product structured-data output remains in place.
- Removed the no-plan discounted subscription fallback. Subscription rows now iterate the selected variant's eligible allocations and use actual allocation prices/plan IDs. Savings badges use allocation compare-at data and are omitted without positive savings; no divide-by-zero. This also avoids interpreting every adjustment type as a percentage. See [Shopify selling-plan allocations](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation).
- Allowed explanatory-only product content to render its tab; preserved rich-text rendering and missing-content behaviour.
- Restricted palette tokens to 1–4, defaulting blank/unknown tokens.
- Corrected Ingredients merchant help to Rich text. Labelled the retained legacy placeholder setting unused and removed the new-block default benefits string that invented a monthly discount/free-shipping promise. Existing merchant settings were preserved.

## Verification

Final installed CLI Theme Check exits 0: **zero errors, three warnings**, down from nine errors and eleven warnings. No checks disabled and no auto-correction used. Protected report: `/Users/Cameron/Documents/Codex/bpm-private-audit/theme-local-fixes-check.json`.

The three retained warnings are explicit review items:

| Warning | Why retained |
|---|---|
| RemoteAsset, layout/theme.liquid | Existing Adobe font-kit stylesheet is externally served; moving it into Shopify assets requires verified font rights/delivery decisions |
| OrphanedSnippet, quick-order-product-row.liquid | Preserved unused Dawn source; no runtime defect established and removal isn't needed for the fixes |
| UndefinedObject, main-product.liquid `offset: continue` | Existing Liquid loop continuation pattern retained; candidate recommendation pagination needs rendered verification |

Fifteen fabricated-data rendering checks pass using LiquidJS 10.30.0: no plan, current allocation price/ID, fixed-price allocation, selected-variant ineligibility, zero-price allocation, bundle exclusion, explanatory-only tab, no content, four valid palette tokens and three blank/invalid tokens. The test renders the actual changed Liquid branches; money/metafield filters are fixture adapters. This is not Shopify runtime, browser, variant-transition, cart transport or checkout verification.

```sh
node scripts/test-theme-baseline-fixes.mjs /Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-local-fixes /Users/Cameron/Documents/Codex/bpm-private-audit/theme-fix-validation/node_modules/liquidjs/dist/liquid.node.mjs
```

The Shopify Liquid skill's validation helper was attempted but cannot load its bundled theme-check dependency. Installed Shopify CLI Theme Check performed the actual full-theme validation successfully; managed plugin files were not modified.

## Remaining decisions and checks

The live subscription title/cadence mismatch remains an owner decision: changing a five-month plan to monthly could alter customer billing/delivery; changing its title requires the intended cadence to be confirmed. It was not changed as part of local code repairs. Existing merchant benefits/claims still need #29 review.

Rendered preview, keyboard/touch behaviour, selecting another variant, add-to-cart selling-plan transport, bundle/review integration, typography and layout QA remain prerequisites before applying this to any remote theme. Creating/uploading an isolated preview needs explicit authorization; live publication remains separate. #3/#4/#13/#14/#15 and #28 are not complete solely because static checks pass.

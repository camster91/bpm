# Protected production-theme export

Cameron approved the previously shown read-only export in a separate turn. The exact command in `theme-workflow.md` succeeded for store `qef4ye-yg.myshopify.com`, main theme `190930944372`. No remote theme was changed, duplicated or published.

Retrieval completed 7 October 2026, 02:50:41 UTC. Source schema confirms Shopify Dawn **15.4.1**. CLI still returns a truncated display name, so a full Admin display name is not claimed.

## Backup evidence

Protected directory: `/Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-20261007`.

- 404 files, 5,601,560 bytes: 198 assets, 7 blocks, 2 config, 2 layout, 51 locales, 79 sections, 38 snippets, 27 templates.
- Manifest: sibling `theme-190930944372-20261007-manifest.json`, per-file SHA-256, relative paths, sizes and retrieval metadata.
- Archive: sibling `theme-190930944372-20261007-backup.tar.gz`, 1,165,041 bytes.
- Archive SHA-256: `af6b8cb37ba33864e8b0fdf5b252b13445be8f2cf98ee7da4deb0ad93ff33e6d`.
- Every archived file was read back and matched to the manifest. Source hashes were rechecked after inspection/Theme Check and remain unchanged.
- Directories owner-only, files/archive/manifest owner-read/write. No theme/configuration files committed. Limited token/private-key pattern scan found no matches; that is not a comprehensive secret or merchant-data review.

This is a recoverable local theme-file backup, not a backup of store-wide products/apps/orders/settings, an off-device archive or proof of tested publication rollback. Development theme/preview and rollback verification remain open under #3.

## Source inventory and dependencies

27 templates cover index, collection, list-collections, search, three products, default page plus five named pages, blog, article, cart, 404, password, gift card, robots and seven legacy customer templates. Existing owner mapping in `storefront-audit.md` applies; presence of legacy customer templates does not imply current hosted accounts use them.

`templates/page.json` disables `main-page` and composes image-banner, rich-text, clean-living-banner, founder-story and bpm-values; this traces About Us despite its empty native body. Four native pages share this template, including privacy/terms/privacy-choices records: inspect each rendered page before assuming its native content is displayed. Do not copy this shared layout across legal content blindly.

Judge.me source blocks: preview_badge and review_widget in all three product templates; enabled medals/cards_carousel in collection (reviews_grid_widget disabled); enabled medals/review_snippet_widget in index (preview_badge/cards_carousel disabled). Core and cart-drawer embeds appear enabled in settings data. These establish insertion points, not integration journey success.

Native Liquid forms include contact in contact-section/contact-form; customer newsletter capture in the hero/newsletter/email-signup/footer sections; new_comment in main-article; product forms in custom-product-block/buy-buttons/main-product/featured-product/card-product; localisation and legacy account handlers. Candidate must preserve actual handlers, result/validation states and privacy behaviour. No form was submitted.

`custom.card_color` maps to colour classes 1–4 in main-collection-product-grid, with section colour settings and a default class for blank values. Existing nonblank values are appended into the class without an allowlist; candidate should explicitly accept supported tokens and default unknown values. `custom.scent_tagline` appears in that grid and product-showcase.

The four paired PDP tab fields are actually rendered with `metafield_tag` in custom-product-block. Titles have defaults and absent bodies are skipped. The outer `has_tabs` guard tests how_to_use/ingredients/shipping but omits whats_inside_description: a future product with only explanatory content would lose its tab. Current public products have all fields populated, so this is an optional-data risk, not a proven current failure. Preserve rich-text types and correct merchant help; do not change live definitions.

## Actual baseline Theme Check — #15

Ran installed CLI locally, without auto-correct, against the protected export:

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme check --path /Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-20261007 --output json
```

Exit 1: **9 errors and 11 warnings across 11 files**. Full JSON/stderr kept in protected sibling files. Source was not changed. These are existing baseline findings, not regressions introduced by the recovery.

| Error | Source location |
|---|---|
| Three images missing width/height | blocks/ai_gen_block_9978168.liquid:357, 373, 395 |
| Three missing demo-font asset references | layout/theme.liquid:65, 125, 126 |
| Invalid `templates` property in schema | sections/custom-related-products.liquid:1020 |
| Two missing schema translation entries | sections/featured-product.liquid:743, 744 |

Warnings: OrphanedSnippet 1, RemoteAsset 1, UndefinedObject 3, VariableName 2, UnusedAssign 4. Candidate remediation must use a separate working copy; preserve the baseline. Do not suppress checks to declare success or assume rights to source missing demo fonts. GitHub Theme Check CI and passing candidate checks remain unverified.

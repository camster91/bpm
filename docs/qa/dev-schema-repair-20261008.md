# Development upload and schema repair

Human-approved frozen candidate 5daa4af was uploaded to BPM on October 8. Shopify created development theme 194480669044, but rejected bpm-sites-product and three dependent product templates. The CLI returned exit 0 despite errors in its JSON receipt; this is a partial upload, not success.

Root cause: the product section supported app blocks alongside two section-level link_list settings. Shopify rejected this combination. The related rotation menu remains a menu picker. Product section links are now editable, reorderable jump_link blocks with label and URL settings, escaped output, and editor attributes. Blank/incomplete links and empty navigation are omitted. No templates contained the removed jump_menu setting, so no merchant values were migrated or discarded. Apps and ID-matched product content blocks remain supported.

The local schema regression scans app-enabled sections for duplicate menu pickers. Tests also verify rotation navigation and jump links coexist, editor attributes, safe escaping, and incomplete-link omission. Installed CLI Theme Check reports zero errors and one retained Adobe font RemoteAsset warning. The managed Liquid validator remains unavailable because @shopify/theme-check-common is missing; its invocation failed before validation. Do not treat that as passing managed validation.

Native homepage preview verified the new draft name, noindex,follow, one main region and no document overflow at 1280px. Screenshot: dev-upload-partial-home-20261008.png. Existing long native menu labels wrap badly at this width; this is a newly observed native header QA issue, not covered by local short-label fixtures. The Shopify cookie banner remained visible after a decline attempt; consent behavior needs native follow-up. No product form/cart/checkout/provider submissions or live publication occurred. Purchase heading/lead/tablet source differences recorded separately remain open.

A corrected immutable snapshot must be separately shown and approved before the next CLI upload. Preserve the partial theme and approved 5daa4af snapshot; do not overwrite the original archive or claim Phase 0–5 completion.

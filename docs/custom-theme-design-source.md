# Custom theme design source — Sites correction, 7 October 2026

Cameron explicitly selected https://bpm-product-design-review.cameron91.chatgpt.site/index.html and its existing code, and instructed “dont use figma”. The authoritative implementation source is now `reference-site/public/` (HTML, CSS, JS and local assets), `reference-site/src/` (content/media/crop mappings) and the recovered build/runtime. Provenance is recorded in `reference-site/source-provenance.json`.

The prior Figma-source document is preserved in `plan-history/2026-10-07-before-sites-correction/`. Figma contexts/assets and commits remain historical evidence; they are not the design target. Existing Sites asset paths containing “figma” are original source dependencies, not permission to resume Figma design work.

Follow [the revised implementation plan](shopify-redesign-plan.md). Preserve the Sites design while using verified native Shopify commerce and merchant-editable sections. Prototype product snapshots, claims, local bag, demo offer and form states are not operational Shopify features. Internal review/comment tools stay outside the customer theme.

The existing `theme/` is incomplete and visually superseded. Reuse only reviewed platform plumbing; rebuild its presentation against Sites. This source correction does not establish client approval, current Shopify runtime QA, upload or publication.

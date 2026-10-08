# BPM

BPM Shopify redesign and recovery repository. GitHub issue #11 is the implementation tracker; #28 governs design acceptance.

## Recovered reference

The original local design-preview source has been recovered in `reference-site/`, with file hashes and source commit provenance. The earlier partial reconstruction remains preserved in `recovery-site/`.

```sh
npm run check
BPM_REVIEW_PORT=8878 npm run dev
```

Open http://127.0.0.1:8878/index.html after building. Node 22.13+ required. Comments use isolated in-memory local data. This reference is not an installed Shopify theme; media still depends on owner-controlled CDN sources.

- [Recovery evidence and remaining work](docs/original-source-recovery.md)
- [Shopify implementation plan](docs/shopify-redesign-plan.md)
- [QA matrix](docs/qa-matrix.md)
- Published reference: https://bpm-product-design-review.cameron91.chatgpt.site/index.html
- Live commerce reference: https://bpmdeodorant.com/
- Authoritative design/code source: the published Sites review and recovered `reference-site/` (selected by Cameron on 7 October 2026). Figma is no longer the implementation target.

Current Shopify data/configuration and approved client decisions govern implementation. Historical preview copy is not production truth. Preserve the published review, verify app/commerce behaviour, and use merchant-editable Shopify sections. Store writes and production publication are separate stages.

Campaign suffixes and editable native discovery/media modules are implemented locally. [Campaign QA checkpoint](docs/qa/sites-campaign-pages.md) records 171 passing rendering checks and responsive fixture evidence; Shopify runtime, media, claims, apps and purchase journeys remain open.

The existing default About-page assignment now renders scoped, editable Sites sections locally while other native page content is preserved. [Assignment QA](docs/qa/sites-about-default-assignment.md) records 189 passing rendering checks and the remaining native Shopify verification.

Existing single-product suffixes now have product-specific editable source scent/value sections and native comparisons. [Single-product QA](docs/qa/sites-assigned-single-product-templates.md) records 196 checks and remaining native/runtime requirements.

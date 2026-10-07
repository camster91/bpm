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
- Figma source: BPM - Updates (`REGkhZvykpOP4XmN7EKSnh`)

Current Shopify data/configuration and approved client decisions govern implementation. Historical preview copy is not production truth. Preserve the published review, verify app/commerce behaviour, and use merchant-editable Shopify sections. Store writes and production publication are separate stages.

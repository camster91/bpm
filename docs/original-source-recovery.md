# Original source recovered — issues #1 and #2

## What changed

The original local Sites source checkout was found in Cameron's workspace. Imported 60 files into `reference-site/`, with SHA-256 provenance in `reference-site/source-provenance.json`. This replaces the need to approximate the design, while the earlier PR #12 reconstruction remains preserved in `recovery-site/`. Earlier planning documents are backed up in `archive/planning-before-original-source/`.

Source commit: `2f95c94` (full hash in the provenance manifest). The recovered files include 25 HTML routes, CSS/JavaScript, brand assets, original media/crop mappings, historical content snapshots, the Worker and its comments API/tests. Deployment configuration, Git metadata, old evidence and generated build output are excluded. The old source checkout and public site were not changed.

The imported historical README/transfer plan describe September 30 evidence; they do not establish current store state or fresh approval. Product data, copy and policies remain design-reference snapshots until verified under #13/#29.

## Reproducible local workflow

Use Node 22.13+ with `node:sqlite` (verified here with Node 26.5.0).

```sh
npm run check
BPM_REVIEW_PORT=8878 npm run dev
```

Open `http://127.0.0.1:8878/index.html`. Build first. The server binds only to loopback, uses a fabricated reviewer identity and an in-memory comments database. Restarting loses local comments. It is a development adapter, not production authentication or persistent hosted feedback. Hosted authentication still depends on the trusted Sites gateway; do not expose this adapter publicly. Build output is ignored.

No deployment or Shopify credentials are required. Media crop responses still fetch owner-controlled Shopify CDN assets; fonts also depend on the existing Adobe kit. This is independently runnable outside Sites, but not an offline media archive. Original imagery/Figma provenance remains part of issue #2.

## Verification performed

- Build completed.
- Five API tests passed: persistence/status changes, identity/origin checks, invalid contexts/oversized inputs, page contexts, and pinned comments.
- Twenty-five HTML routes and 40 internal targets resolved, with no broken targets in the route verifier's scope. Cropped media requests are excluded by the original verifier.
- Eight representative live HTML/CSS/JS responses compared. Five CSS/JS files match byte-for-byte. The three HTML files differ only by an inserted Cloudflare script when inspected; they are not claimed byte-identical responses. See `reference-live-comparison.json`.
- Local homepage inspected at 1280 desktop and 390 mobile. Mobile navigation opens and displays its links. At 390, document width equals viewport width and no completed image has zero natural width.

- Tablet catalogue inspected at 768px: no horizontal overflow or completed broken images. The Two track filter reduced the catalogue from nine to three products. Product navigation opened Side A / Side B. Quantity increased to two; adding to the local preview bag showed the correct product and quantity. The bag page retained two items with a $79.98 CAD preview total. No Shopify order or checkout action occurred.

These are recovery checks, not Shopify commerce, SEO, full accessibility, client acceptance or complete cross-device QA. Issue #1 remains open until representative comparisons and interaction checks are complete.

## Review findings and next work

- #11 provides the phased project tracker; #28 governs design acceptance. Corey's positive feedback is not full production approval.
- #3/#4/#13 need authenticated current-theme, backup, app and storefront evidence. No Shopify theme source exists in this checkout yet.
- #14 and #6 define editor/data ownership. #15 can gain reference checks now, but Shopify Theme Check needs actual Liquid theme source.
- Existing #27 dependency labels are inconsistent: it describes #23 as analytics and #24 as cross-device QA, while those issues are accessibility/performance. Correct dependencies are #25 analytics and #26 cross-device QA. This is a review finding; no GitHub issue was edited.

Next: finish reference interaction/comparison QA, then inspect/export the existing Shopify theme read-only and record app dependencies before selecting a theme implementation base. Prepare local changes first; pushing this branch, merging PR #12 and Shopify publication remain separate authorized actions.

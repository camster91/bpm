# Rendered recovery comparisons — #1

7 October 2026 UTC, Chrome. Compared the published reference at `https://bpm-product-design-review.cameron91.chatgpt.site/` with the recovered reference served at `http://127.0.0.1:8878/`. No published content or live Shopify state was changed. Browser emulation was reset and temporary comparison tabs closed after the pass.

| Route | Verified viewport | Main sections | Result |
|---|---|---|---|
| index.html | 1280 × 900 | 13 | Matching visible hero/header composition, typography and media crop; every main section has identical rendered text and rounded x/y/width/height |
| about.html | 768 × 1024 | 6 | Matching stacked hero/header/media rendering; identical main-section text and rounded geometry |
| product-media/preview.html?product=bergamot | 390 × 844 | 14 | Matching gallery/header/mobile composition; identical main-section text and rounded geometry |

Each pair's actual `window.innerWidth`/`innerHeight` was checked. Unequal-size attempts were discarded before recording results. Document scroll width equals viewport width in all accepted pairs. No completed image had zero natural width at observation time; this does not assert every lazy image had loaded. Screenshots of the top viewports were visually inspected in this session; no automated pixel-diff score or full-page visual equivalence is claimed. Geometry comparison covers whole-page section boxes, not every descendant, paint detail, animation frame or below-fold image crop.

## Local mobile interaction evidence

At 390 × 844, Bergamot's Metal tube detail button changed the gallery image and selected state to image 2/7. Selecting Subscribe & save 10% changed the displayed preview price from $23.99 to $21.60 CAD and showed the explicit subscription-design-preview/terms disclaimer. Increasing quantity changed the status to 2 and enabled decrease. These results were verified in the rendered DOM and purchase-control screenshot. No Add to bag, checkout, feedback write or form submission was triggered in this pass.

## Limits and next coverage

This advances representative recovery comparison evidence. It does not close #1: major below-fold visual sections, the other reference page families and remaining gallery/video/accordion/keyboard/feedback interactions still need appropriate coverage. Existing local tablet catalogue/bag evidence remains in `original-source-recovery.md`; don't treat prototype purchase values as current Shopify configuration or production claims. Original asset preservation (#2), client design acceptance (#28), Shopify source backup (#3) and candidate commerce QA are separate requirements.

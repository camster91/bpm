# Homepage FAQ source fidelity — 2026-10-08

The live Sites source gives FAQ summaries 22px vertical padding, bold text, vertically centered content and a 24px plus sign through its shared preview stylesheet. Those rules were absent from the custom theme, compressing the closed question column by approximately 193px. The custom theme now restores these rules, scoped to `.questions` so native navigation/filter disclosures remain unaffected.

Same-tab browser comparison, with each viewport explicitly applied after navigation, measured matching closed layouts:

| Viewport | Source / candidate question column | Source / candidate section |
| --- | --- | --- |
| 375px | 327 × 480.1875px | 758.5546875px high |
| 820px | 746.203125 × 480.1875px | 819.2578125px high |
| 1440px | 620 × 480.1875px | 656.1875px high |

All four disclosures were closed in each measurement. Candidate keyboard Enter opened the first answer, a second Enter closed it, and focus remained on SUMMARY. Native `<details>` and merchant rich-text answers are preserved. Screenshot `sites-faq-desktop-20261008.png` illustrates the closed desktop layout. Raw geometry is in `sites-faq-fidelity-20261008.json`.

The earlier whole-homepage module inventory (`sites-home-module-comparison-20261008.json`) is diagnostic, not acceptance proof: its tablet source ownership image had not loaded (0px height). Scrolling that source heading loaded the 864px-wide artwork and restored its intended size; no ownership sizing edit was justified. Measurements of animated elements must also allow for transforms. That inventory predates this FAQ correction.

Local checks: 324 Liquid rendering checks, product/motion/gift-card lifecycle checks, 96 resource bindings and nine app configuration bindings passed. Shopify Theme Check has zero errors and the existing Adobe Typekit RemoteAsset warning. These checks do not verify native app behavior, current Shopify resources, full source fidelity, consent, purchase journeys or client acceptance.

This remains a local fabricated-resource preview. No Shopify upload, GitHub push/merge or publication occurred. Next presentation work: restore source-style price narration using current native product prices; approval-dependent ownership links, shipping claims and newsletter remain separate gates.

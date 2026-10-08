# Value-section source fidelity — 2026-10-08

The homepage now presents the source pricing sentence in one paragraph, with its amount supplied by the selected Shopify product. The optional merchant `price_intro` setting supplies words before the price; the existing body follows it. Blank introduction preserves native product-title output and separate copy. Missing product preserves copy without inventing a price. Native range pricing and per-application suppression remain intact.

Source shared CSS also applies 20px lead text through 1000px and 21px through 680px. The theme had retained 23px everywhere. Those source rules are now scoped to `.section .lead`; product-summary typography is unchanged.

Same-tab live-source/local-preview comparison, with explicit viewport sizes after navigation, measured matching paragraph widths/heights and section heights:

| Width | Paragraph | Section height |
| --- | --- | --- |
| 375px | 327 × 113.375px | 722.5234375px |
| 820px | 640 × 54px | 733.15625px |
| 1440px | 620 × 93.140625px | 520.4140625px |

One lead paragraph at every size, with no horizontal document overflow. `sites-value-fidelity-20261008.json` records before/after data; the desktop screenshot illustrates the rendered candidate. Local price $23.99 CAD is fabricated from historical data, not confirmation of the current store price. The estimate retains a currency label, an intentional clarity difference from source presentation. Claims and quantity/application estimates still need owner acceptance.

Five new Liquid checks cover combined narration, current price changes, price ranges, missing products and escaped merchant text. 329 rendering checks plus existing lifecycle/resource/app checks passed. Theme Check: zero errors, one existing Adobe Typekit RemoteAsset warning.

No Shopify upload, production mutation, GitHub push or merge. Broader section typography, native editor persistence, resource resolution and critical purchase journeys remain dev QA requirements. The frozen development snapshot predates this change and must be refreshed before requesting the exact upload command approval.

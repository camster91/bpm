# P2 — mobile source purchase bar missing

Read-only browser inspection of the hosted Bergamot PDP confirms a `.mobile-buy` fixed bar containing product name and an Add to bag button at widths 375 and 680. At viewport height 812, the bar is 71.296875px high and its button is 50.296875px high. At widths 681 and 820 it is hidden. The recovered source `product-media/preview.html` and `preview.css` contain this structure and breakpoint.

The current local assigned-product fixture has the native `.bpm-product-form` and primary submit, but no fixed mobile purchase bar at any of those widths. Fixture submissions remain disabled; no source demo cart or Shopify purchase was exercised. Evidence: `sites-mobile-purchase-bar-gap-20261008.json`.

The frozen e3ddf6f theme is an initial native-QA candidate and remains byte-identical. This gap is not fixed or waived. It does not establish a broken primary purchase form, but it prevents full source interaction acceptance.

Required implementation: expose an editable mobile-bar preference; reuse the same native form rather than add a separate cart implementation; preserve selected variant, quantity and selling plan; respect unavailable/required-plan states; use translated controls and visible keyboard focus; match source breakpoint/framing with safe-area and long-title behavior. Verify its interactions with the welcome launcher and dialog, page-bottom/focus clearance, template/editor lifecycle, and native storefront commerce. Source demo success/cart storage must not be copied.

Owner: implementation agent; native commerce proof requires the approved dev upload and isolated test boundary. Restore the local bar and refresh the candidate before presenting it as the updated full-fidelity upload. No theme edit, upload, native-content write, push, merge or publication occurred in this diagnostic pass.

# Article fidelity: list spacing

The initial all-eight-article matrix compared recovered article fixtures with the hosted Sites source at widths 375, 820, and 1440. All 24 normalized body-text and main-heading geometry comparisons matched; four article bodies had height differences. This is local fixture evidence, not native Shopify content acceptance.

The global theme list reset removed browser-default vertical margins from article lists. A scoped `.article-body ul` rule restores `1em` block margins without changing navigation or other page lists. The transition article (index 5) and baking-soda article (index 7) now match source body heights exactly at all three widths. Their normalized text matches, and neither has horizontal document overflow. See `sites-article-list-spacing-20261008.json` for the twelve observations. Candidate pages were reloaded to ensure the updated stylesheet was loaded.

Two remaining differences require separate content-formatting reconciliation: index 4 retains a captured inline `font-size: 1rem` span that the hosted source strips; index 2 retains captured image styling and an H6 attribution, while the hosted source renders cleaned markup. Preserve native merchant content and investigate source normalization before changing either. The accessible table wrapper also intentionally differs from source DOM structure.

No Shopify upload, native article edit, GitHub push, merge, or publication occurred. Actual article bindings, editor behavior, claims approval, native schema, and device/journey acceptance remain open.

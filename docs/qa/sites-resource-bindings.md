# Sites native resource bindings checkpoint

The local theme now stores native resource-picker handles in JSON templates rather than leaving discovery empty. Source Liquid does not hard-code product lookups. Native resource availability, pricing and destinations remain Shopify-owned; resolved picker objects supply their current values at runtime.

## Bound candidate defaults

Homepage: two single products, the mixed duo and mixed four-pack, duo/four-pack collection destinations, texture/formula/current-price value product, About page and first three source articles with native news blog. Collection/default rotation: all nine public product resources, verified pack sizes and scent palettes. See theme-resource-bindings.json for ID/handle mapping and unresolved resources. Product/article handles come from recovered Sites snapshots; duo collection the-two-track-collection, four collection the-four-count and page about-us are additionally confirmed in the protected native theme export. No image file or absent page handle was guessed.

Header now shows the native account route by default when Shopify enables accounts, retaining the merchant override. This follows the audited Show sign-in links setting and account.bpmdeodorant.com entry; it does not prove the account model, login, subscription/tax app access or transactions. The homepage formula link now uses #ProductFormula-<native product ID>, matching the PDP section’s stable product anchor.

## Verification

143 local LiquidJS render checks pass plus gift-card mock enhancement checks. New anchor checks verify both link and target. Resource verifier checks 33 picker references against mapped source records, all nine catalogue pack sizes and header account preservation. The verifier checks snapshot consistency, not current authenticated existence/availability.

A public products.json refresh received HTTP 429. No repeated requests or bypass were attempted. Candidate defaults therefore use preserved recovery/audit evidence; real resource resolution remains a development-theme gate.

Installed Shopify CLI Theme Check: zero errors, one existing Adobe font RemoteAsset warning. Bundled validator attempted on changed Liquid but unavailable because @shopify/theme-check-common is missing. No checks/cache were modified.

New local preview sites-home-bindings.html emulates committed picker defaults from source snapshots; prices, media and resource objects are historical fixtures, not Shopify API responses. Browser inspection at 1440×1000, 820×1000 and 375×1000 shows document scroll/client widths agree at 1425, 805 and 360px. Two track cards, two bundles and three article cards render; no card overflow or broken loaded images. Final screenshot sites-home-bindings-mobile-local.png reveals the current native thumbnails do not reproduce the source framed-carton composition. This is an explicit source-fidelity gap, not accepted finished imagery. Viewport reset.

## Next work

Preserve exact source framing through the original recovered artwork and merchant-overridable media; finish product-specific module/resource configuration, unknown native page/policy destinations, assigned campaign/wholesale page coverage and account/app journeys. Native store mutations are separate from preparing template defaults. No push, merge, upload, record assignment, publication, purchase or communication occurred. Full Phase 0–5 goal remains active.

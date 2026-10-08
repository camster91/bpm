# Narrow authenticated source inspection

## Export-based product form trace — 7 October 2026

The protected export resolves the earlier incomplete custom-form/component investigation. These findings also apply to the local repair candidate: its patch changes Liquid allocation rendering, not the custom section's variant/quantity/event handlers.

| Dependency | Verified source path | Consequence and required verification |
|---|---|---|
| Custom PDP form | `snippets/custom-product-block.liquid:204–229` in the original export | Native `{% form 'product' %}` contains hidden `id`, `quantity` and `selling_plan`, and a submit button. It is not wrapped in `<product-form>`. No custom submit listener was found for this form in the exported assets/sections/snippets/layout. Verify the native submit response and cart/checkout handoff; do not claim AJAX cart-drawer integration. |
| Imported Dawn handler | `sections/custom-product-section.liquid:740`; `assets/product-form.js:1–44` | The file registers a custom element and attaches its submit listener inside that element's constructor. Its FormData/fetch/cart-render path therefore does not establish handling for the unwrapped custom form. Other normal Dawn forms may use it correctly. |
| Quantity state | `sections/custom-product-section.liquid:931–951`; `snippets/custom-product-block.liquid:190–207` | Separate visible quantity input updates the form's hidden quantity on change/buttons. JS clamps to 1 and the initially captured max (or 99). It does not implement variant quantity-rule minimum/increment or refresh max on variant changes. Verify rules with isolated fixtures and actual native cart validation. |
| Variant transition | `sections/custom-product-section.liquid:956–1027` | Matching option values updates hidden variant ID, one displayed price, button availability and featured thumbnail. It does not regenerate subscription rows/prices/eligibility or reset the selected plan. Local allocation fixes only cover initial server rendering. A future variant can retain a stale plan or displayed subscription price until a full reload. |
| Unavailable-to-available transition | `sections/custom-product-section.liquid:1009–1016` | The handler assigns the sold-out label when unavailable, but reuses the current button text when available. A sold-out-to-available transition can retain that label. Verify and fix in the eventual PDP implementation with a multi-variant test; existing single-variant catalogue does not prove the transition. |
| Section lifecycle | `sections/custom-product-section.liquid:823–1080` | Initialisation is registered on DOMContentLoaded. The alternative ready-state/init path is commented out, and the custom section does not subscribe to `shopify:section:load`. Verify editor reload/add-section interaction; loading the section after DOMContentLoaded may leave controls uninitialised. |

Source inspection establishes those implementation boundaries, not executed storefront symptoms, failed orders or a required change to live configuration. The original export remains untouched. Current public singles have one inspected 76g variant; test future-product/multi-variant cases explicitly rather than extrapolating from them. Candidate work must choose and verify one supported submission path, preserve native fields, handle server errors, and demonstrate editor reinitialisation without duplicate listeners before #4/#7/#14/#20/#21 sign-off.

Additional source findings: the custom snippet's rating branch contains a fixed `4.5 (105)` label, separate from Judge.me. Inspect active block assignments/output before classifying customer-visible impact; final review UI must use real assigned reviews or omit an empty state. `sections/contact-section.liquid:1356–1397` intercepts its native contact form and treats `response.ok || response.redirected` as success, then clears fields. It does not inspect returned validation/challenge content. A successful HTTP/challenge redirect alone is insufficient evidence that a message was accepted. Verify invalid input, challenge, provider rejection and success in an approved isolated test; no form was submitted during this audit. These findings are source evidence for #4/#13/#29, not app-state changes or client approval.

Subsequent approved export now verifies actual files and a checksum-backed baseline. `theme-export-audit.md` resolves palette classes, tab rendering/optional-data guard, template and native form inventory. The browser observations below remain valid narrow evidence; their export prerequisite has since been satisfied.

Read-only browser inspection of live theme `190930944372`, 7 October 2026 UTC. Searches and visible editor context are evidence of current source; they are not an exported/checksummed backup, complete code review, or a purchase test. No source was edited, replaced or saved. Files are not copied into the repository here.

## Product subscriptions — #4/#7/#21

`snippets/custom-product-block.liquid`, visible lines 96–176:

- Purchase-options branch is excluded when product tags contain `bundle`.
- `has_selling_plans` derives from `product.selling_plan_groups.size > 0`.
- One-time purchase starts selected and uses the selected/first available variant price.
- Real subscription rows iterate the product's groups/plans and use actual plan IDs.
- Display price/discount is calculated from `plan.price_adjustments[0].value` as a percentage. This matches the currently inspected 10% plan's type, but does not prove correct handling of fixed/amount adjustments, multiple adjustments or variant-specific allocations. Candidate pricing should use actual eligible variant allocations and support configured adjustment semantics.
- The no-plan else branch explicitly generates a subscription row with an empty plan ID, using `placeholder_discount` (default 20) for its displayed price and savings. This confirms fallback behaviour in source, not a currently failed transaction: current two non-bundle singles both have assigned plans. It is a future-product risk under #14; candidate must hide unavailable subscription options and never advertise unbacked discounts.

`sections/custom-product-section.liquid`, visible lines 1028–1044: JavaScript finds `.custom-product__form-selling-plan`, initializes from the selected row, and copies the clicked row's `dataset.sellingPlan` or empty string into the field. The snippet search also shows a hidden `name="selling_plan"` input. This demonstrates DOM state wiring, not that a server cart line receives the intended plan. Variant transitions, keyboard operation, form association and native checkout handoff still need rendered/transport verification in the approved test environment.

Source search `cart_add_url` locates the endpoint mapping in `layout/theme.liquid` and the fetch in `assets/product-form.js`. Search `new FormData` finds product-form.js. The complete custom form-to-component relationship and request/error handling remain to inspect; don't infer correct submission solely from these matches.

`selling_plan` search also finds plan-allocation/name rendering in sections/cart-notification-product.liquid, sections/main-cart-items.liquid, sections/main-order.liquid and snippets/cart-drawer.liquid. Preserve subscription line context in all these surfaces, but test actual cart/output behaviour rather than treating search matches as compatibility proof.

`placeholder_discount` appears in the section schema and all three product templates: product.json, product.bergamot-lime.json and product.unscented.json, each set to 20. Confirmed names resolve the earlier source-filename uncertainty for those three templates. Full source/configuration still requires the protected export.

# Narrow authenticated source inspection

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

# Cart line message and quantity context

The native cart uses Shopify's documented form action, updates[] quantities, checkout button, line-specific url_to_remove and line_item.error_message. This pass retains those native contracts. References: https://shopify.dev/docs/storefronts/themes/architecture/templates/cart and https://shopify.dev/docs/api/liquid/objects/line_item, consulted 8 October 2026.

Each supplied line message now has a section/index-specific ID. Only that line's quantity field receives aria-describedby pointing to it. The alert text remains escaped. A line without a message gets no description reference. The message is documented as informational; the theme does not arbitrarily mark a quantity invalid for every possible line status. The new two-line render check verifies matching IDs, escaped content and omission on the unaffected line.

`cart-line-error-association-20261008.json` records a 375px isolated browser inspection. The first bundle-fixture quantity points to its visible alert; the second subscription-fixture quantity has no error description. Update and checkout remain disabled, and removal links have no destination. The browser validity flags mark the second field's 0 as below its minimum of 1, 6 above its maximum of 5, and 2.5 as inconsistent with its integer step; 4 is valid. Nothing was submitted. These are browser HTML-constraint checks, not server stock/quantity-rule validation.

`cart-line-error-mobile-20261008.png` shows the focused bundle-fixture quantity and its visible message. It is fabricated local data, not an actual Shopify bundle, price, subscription or availability error. No horizontal overflow was observed at this 375px viewport; the previous four-width cart geometry evidence remains separately scoped in `native-commerce-layout-20261008.json`. This change affects only ARIA references and the message ID, not layout.

All 345 rendering checks and lifecycle/resource/app checks pass. Installed CLI Theme Check reports zero errors and one existing Adobe Typekit RemoteAsset warning. The managed Liquid validator still lacks @shopify/theme-check-common; the plugin cache was preserved. No installed check was disabled.

Actual screen-reader announcement/description, native stock or validation-function errors, update/removal, changed line ordering, subscription/bundle app behavior and checkout handoff remain required in the authorized native test environment. A local role=alert and aria-describedby relationship do not prove those journeys complete.

No cart request, provider submission, Shopify write, custom push/merge or publication occurred. This code correction exceeds the preserved f750619 snapshot. Refresh the upload candidate and obtain confirmation for its exact command before authenticated upload. Full Phase 0–5 acceptance and release gates remain open.

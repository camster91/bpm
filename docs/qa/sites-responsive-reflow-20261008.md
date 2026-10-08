# Responsive reflow and header targets — 8 October 2026

Browser QA became available through the Codex in-app browser; the previously lost Chrome extension was not recovered or bypassed. Local previews were regenerated from the current theme. This evidence supplements the earlier 320px screenshot and resolves the narrow-header wider-reflow observation gap, not the full device/source-fidelity gate.

## Header correction

At 375px before the correction, Account measured about 24.65px high and Bag 28px high. The existing ≤360px rule provided 44px targets only on narrow phones. Native account/bag links now use inline-flex center alignment with a minimum 44×44px target at all widths. Their native URLs/visibility rules, source artwork, labels and narrow-phone nowrap behavior remain unchanged.

After the correction, Account and Bag each measure 44px high at 320, 375, 430, 768, 1024, 1440 and 1600px; their widths exceed 44px. All seven homepage checks have document scroll width equal to viewport width. At 375px, Enter opens the mobile menu with all five fixture links, and Escape closes it with focus on Menu. The final screenshot pauses source motion through the existing visitor control to avoid capturing an entry-animation frame. Temporary viewport overrides were reset successfully.

## Bounded layout matrix

Nine fixture templates were measured at 320, 430, 768, 1024, 1440 and 1600px: Bergamot/Lime PDP, committed-resource collection, search, populated cart, empty cart, About, Contact, first article and policy index. All **54 combinations** have matching document/viewport width and all visible input/select/textarea bounding boxes stay within the viewport. Raw measurements, page headings, field bounds and header dimensions are in `sites-responsive-reflow-20261008.json`.

These measurements do not prove all content is visually correct, source framing/type/layout fidelity, image completion, full keyboard/touch usability, every product/variant/template/state, physical-device rendering, native contact/newsletter submission or cart/checkout transport. Forms contain isolated fabricated data and backend actions were not submitted. Full plan QA and native dev integration remain open. The earlier browser-unavailability record remains historical, not the current browser state.

The reviewed frozen snapshot still excludes this subsequent header-target correction. Preserve that snapshot; a fresh current-theme snapshot and updated reviewed exact command are required before uploading these latest bytes. No Shopify upload, source-reference edit, production mutation or publication occurred.

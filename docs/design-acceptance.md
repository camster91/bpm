# Corey feedback and design acceptance — #28

## Evidence and decision state

Source: WhatsApp screenshot supplied by Cameron on 6 October 2026, CHFA 2026 Planning – BPM. Corey likes the softness, movement and brand representation, then asks about maintenance and Shopify compatibility. He explicitly expects to offer more feedback after receiving answers.

This supports a positive design direction, not final page/copy approval, an agreed editor specification, or launch permission. No new visual change was requested in this message. The requirements below are proposed implementation acceptance criteria for Cameron/Corey to review; they are not represented as client agreement.

Design reference: [full-site review](https://bpm-product-design-review.cameron91.chatgpt.site/index.html), locally recovered in `reference-site/`. Source provenance and recovery checks: [recovery evidence](original-source-recovery.md). Figma and the partial reconstruction remain preserved; neither independently establishes client approval.

## Concern-to-test mapping

| Corey concern | Owning issues | Concrete acceptance test |
|---|---|---|
| Shopify operation | #3, #7, #20, #21 | Existing store remains the commerce source. Candidate theme uses actual variant/cart/selling-plan data. One-time, subscription and bundle journeys reach the correct Shopify checkout handoff in an approved test environment. |
| Custom vs standard blocks | #5, #6, #14 | List custom sections and supported existing/app sections. Add each supported reusable section through the theme editor, without editing Liquid. |
| Tweaking wording | #6, #14 | Change a heading, paragraph, button label/link, product description and article in their documented editor location; save/reload and verify output. |
| SEO | #13, #22 | Preserve important URLs or document redirects. Verify metadata, canonical links, headings, crawlable content and valid non-conflicting schema on representative templates. No ranking promise. |
| Modify/customize blocks | #5, #6, #14 | Swap an image, adjust a supported layout, add/reorder/remove a section and verify at mobile/tablet/desktop. Labels explain site-wide versus template/page scope. |
| Avoid whole-site AI regeneration | #6, #14 | Perform those routine edits through Shopify Admin/editor. Verify persisted output and affected shared templates without regenerating the site. New structural functionality may require development. |
| Bundles, Agentic, Google, Judge.me and other apps | #4, #7, #20, #21, #25 | Record exact installed app identity/version/config and theme dependencies. Test each actual integration. Blocks/embeds support alone does not prove compatibility. |
| Additions remain consistent | #5, #6 | Add a supported standard section and app block alongside BPM custom sections; inspect shared typography, colours, spacing, responsive layout and focus states. Document unsupported patterns. |

## Approval boundaries

| Surface | Current evidence | Required before production sign-off |
|---|---|---|
| Softness, movement, general brand feel | Positive client feedback | Confirm remaining consolidated feedback and selected page references |
| Individual pages, layouts and refined headlines | Preview proposals | Explicit accepted version/copy or documented amendments |
| Product claims, ownership, ingredients, estimates | Historical/source-derived preview copy | Current approved source under #29 |
| Prices, stock, subscriptions, bundles, shipping | Public snapshot and prototype data | Shopify/app-driven data and verified configuration under #4/#13/#21 |
| Customer reviews/creator media | Existing source quotes and preview spaces | Actual review assignments and approved media attribution/permissions |
| Newsletter offer/contact behaviour | Preview-only demonstrations | Existing provider, consent, offer terms and isolated test boundaries |
| Merchant editing | Proposed tests above | Demonstration in candidate Shopify theme and agreed limits |

## Done audit

- Concern-to-issue/test mapping: prepared.
- Review reference: linked; final approved reference/version remains missing.
- New visual/content requests in this screenshot: none. Further feedback remains expected.
- Unapproved concept material: classified above.
- Merchant expectations agreed: not yet evidenced.

Next: Cameron reviews this mapping with Corey and records the accepted reference, outstanding changes and editor expectations. No client communication was sent. Read-only Phase 1 research may continue, but production design sign-off remains open.

# Client homepage content integration — 8 October 2026

Cameron requested preserving the client's current sections, content, ideas and goals from https://bpmdeodorant.com/ while matching the new Sites design. The live Dawn homepage was inspected independently of the development preview; live section IDs begin template--28360681881972. Captured inventory: client-home-content-inventory-20261008.json. This is a homepage migration, not a claim that every page or native app journey has been re-audited.

## Content and presentation mapping

| Client content | Custom theme integration |
| --- | --- |
| Hero, performance, ingredients, metal tube, Indigenous ownership, Canadian production | Sites hero retains its design; client positioning added to copy |
| Five marquee messages | Editable rhythm blocks, including Sensitive Skin Friendly |
| Choose your BPM and both product summaries | Existing two native product cards, source artwork, client summaries |
| Two-Track collection, three duos, complete introduction | Editable featured collection with native collection membership, all three ID-mapped pack presentations |
| Four Count collection, four bundles, complete introduction | Native four-pack collection with four mapped presentations; responsive four/two/one-column cards |
| Made for Real Life / Why BPM Exists | Reusable editable statement cards in butter and pink, preserving the original copy |
| Built to Perform / Clean by Design | Existing Sites texture and ingredient sections, client paragraphs preserved |
| Formulated Without | Six editable entries in a semantic list on an ink/cream band |
| Transparent Pricing and explanation | Dedicated editable pricing section, readable website/Amazon cost cards, original client graphic accessible in optional disclosure |
| Client CCIB/CIB image | Existing original ownership story plus native image-picker badge |
| BPM Feedback | Native Judge.me medals and review snippet blocks; protected-export configuration retained; no copied customer quotes/sample reviews in theme settings |
| Five FAQs | Native details/summary questions, complete client answers and usage qualification retained |
| Newsletter request | Existing native Shopify customer form and newsletter tag; current live endpoint/type/tag verified from public markup; added explicit marketing consent and privacy link when native policy exists |
| Founder, ownership story, journal and closing | Existing Sites content retained |

The earlier bundle overview and per-application pricing configuration are preserved, disabled in the homepage template to avoid competing repeated sections. Named backup: plan-history/index-before-client-content-20261008.json. The reconstructed chart keeps client-provided estimates exactly; website cost lines total $24.00 while the client's labelled total is $23.99. No amounts were silently adjusted. Confirm that one-cent rounding difference and the underlying estimates before release. The donation, certification, formula, sensitive-skin and application claims retain the existing acceptance requirements.

## Architecture and verification

Four reusable sections: bpm-sites-beliefs, bpm-sites-without, bpm-sites-pricing-breakdown and bpm-sites-home-feedback. Merchant controls cover headings, body paragraphs, entries, costs in cents, source image, resource pickers and app blocks. Collection introductions extend the existing featured-collection component. Native products, prices, availability, collections and Judge.me remain the data sources. Source pack art and short card headings retain the new design character. The expanded native menu gains a compact presentation below 1551px, preserving its hierarchy and destinations.

All 26 captured non-review homepage paragraphs are present in the rendered local version; reviews are supplied by the installed app rather than migrated as static text. Semantic list entries and 13 pricing lines are retained. Copy audit handles visual line breaks correctly. Six widths tested: 320, 375, 820, 1280, 1440 and 1600px. All have one main H1, no duplicate IDs, no document or pricing-row overflow, three duo cards, four four-pack cards, six exclusions and five FAQs. Long-menu keyboard Enter opens all nine top-level entries; Escape closes and restores focus. All five FAQs open by keyboard and retain the external-use qualification. Isolated local newsletter validation uses fabricated qa@example.test; submit controls are disabled. No signup, review, cart, checkout or provider submission occurred.

354 rendering checks and JS lifecycle/resource tests pass. 111 resource references resolve against recorded mappings; these do not prove current native membership. Installed Shopify Theme Check has zero errors and one retained Adobe RemoteAsset warning. The managed Liquid helper remains unavailable because @shopify/theme-check-common is missing; its invocation failed before validation. Local images and review placeholders do not prove native editor or app persistence.

Evidence: qa/client-content-copy-audit-20261008.json, qa/client-content-responsive-20261008.json, qa/client-content-keyboard-20261008.json, and desktop statement/pricing screenshots. The earlier uploaded dev candidate is a17ef61; these changes require a new frozen development upload. The previous purchase-copy/tablet corrections are included in the next snapshot. No production publication, GitHub push/merge, shared product/article/policy write, provider setting change or sent communication occurred.

## Native dev verification after upload

Verify returned development identity 194480669044 and draft role; inspect all 17 active homepage modules at representative widths, both collection memberships/order, image-picker assets, genuine Judge.me medals/snippets, FAQ behavior and marketing consent/privacy. Inspect the native newsletter form and existing provider automation path without submitting. Confirm editable section add/reorder, individual body/cost changes, save/reload and restoration. Retain current release/account/claims/commerce/analytics/rollback gates. Never publish this candidate without explicit production approval.

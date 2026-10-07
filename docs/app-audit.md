# Current access update

Browser verification succeeded on 7 October 2026 UTC. See [authenticated inventory and content definitions](authenticated-audit.md). The earlier access-blocker statements below are historical; file export and complete configuration/compatibility checks remain pending.

# App and integration audit — #4

Authenticated installed-app and channel identities are recorded in [the Admin audit](authenticated-audit.md). Browser verification is cleared; connector reconnection is separate. The table below preserves the initial public leads; its unknown-provider statements are historical and superseded by the verified register here.

## Verified integration register

| Integration | Verified identity/configuration | Remaining evidence | Required candidate checks |
|---|---|---|---|
| Subscriptions | Shopify Subscriptions (`subscriptions-remix`), provider Shopify; one displayed plan `80571859316`, 10% off every five months, two products | Theme widget placement, selling-plan identifiers/allocations, account-management flow, settings, cancellation terms | One-time vs subscription forms, cart selling-plan retention, cadence/price labels, account-management links; isolated checkout handoff |
| Bundles | Shopify Bundles (`shopify-bundles`), provider Shopify; all seven displayed bundles' component quantities inspected below | Availability calculation, actual variant IDs and cart/checkout representation | All configured bundles, component quantities/options, unavailable component behaviour, correct native checkout data |
| Agentic | Native Admin Agentic surface, nine products synced, five displayed channel groups Active | Channel purchase behaviour, catalog mapping and consistency | Preserve product data and online-store checkout path for ChatGPT/Other channels; verify each required channel |
| Judge.me | `judgeme`, installed; Admin shipping-compatibility warning | Current blocks/embeds, product mappings/settings and actual effect of warning | Real badges/reviews, anchors, responsive behaviour, no conflicting rating schema; shipping and checkout regressions |
| Google | Google & YouTube by Google LLC; Merchant Center Active, 18 submitted/approved entries; Google Analytics Active; Google Ads Inactive | Feed entry/product mapping, pixels/consent/event duplication; Local inventory error below | Feed/product consistency and correctly consented once-only analytics |
| Other installed apps | IndianStatusCheckout, Flow, Knowledge Base, Smart Pricing, Shopify Claude Connector App, Chit Chats, Klaviyo, Messaging | Configuration and actual theme/checkout/content dependencies | Bounded checks after dependency mapping; preserve automations, fulfilment, consent and existing installations |

## Subscription finding requiring owner decision

The plan's customer-facing title is `Subscribe and Save Monthly`, but both the configured option and summary say delivery every **5 months**, with **10% off**. It applies to Bergamot & Lime — Natural Deodorant and Unscented — Natural Deodorant. No values were edited. Treat as a potential P1 customer purchase-description mismatch under the plan's severity definitions, pending confirmation of rendered labels and intended cadence. Cameron/Corey must decide whether title or frequency is intended; do not change billing/delivery behaviour from a copy assumption. Record the selected cadence consistently in the candidate and test it against actual selling-plan data.

The setup guide displays 3/7 completed and suggests a `subscriptions_app_embed_block` insertion for its product-template step. This is app guidance, not proof of current source placement or a mandate to insert it. The app dashboard's summary shows four active subscriptions; no contract/customer records were opened. Keep existing contracts outside theme edits.

## Verified bundle component matrix

Authenticated Bundles list and each of its seven detail pages were inspected read-only. B = Bergamot & Lime — Natural Deodorant; U = Unscented — Natural Deodorant. Every selected component option is 76g. Each detail page shows 0/3 options and 1/2048 variants. Displayed list prices are snapshots; candidate UI must use current Shopify pricing.

| Bundle product ID | Name | Components | Displayed price |
|---|---|---|---|
| 15141668815220 | Citrus on Repeat duo | 2 B | $39.99 |
| 15141686444404 | Silent on Repeat duo | 2 U | $39.99 |
| 15141732581748 | Side A / Side B duo | 1 B + 1 U | $39.99 |
| 15222327476596 | Four on the Floor | 2 B + 2 U | $74.98 |
| 15222328361332 | Citrus on Repeat: Family Pack | 4 B | $74.98 |
| 15222329180532 | Silent on Repeat: Family Pack | 4 U | $74.98 |
| 15222739599732 | 3/4 Time | 3 B + 1 U | $74.98 |

No component selections, quantities, prices or product records were changed; Save and continue was not used. These mappings verify configuration, not stock-on-hand, native cart grouping, checkout or order fulfilment. Keep bundle composition app-owned and test all seven mappings under #21 rather than implementing pseudo-bundles from section text.

## Historical public leads

Google & YouTube overview inspection: Merchant Center shows Total 18 and Approved 18, with Limited, Not Approved and Under Review all 0. The UI defines its count as including variants; do not equate it to eighteen unique Shopify products. Google Analytics tab shows Active, which verifies connection status only, not event accuracy. Local inventory shows Error: trouble automatically connecting to Google Business Profile, with an instruction to link manually. No Manage/Get started controls were used, account linkage changed, ads started or review collection enabled. This is an existing operational finding for owner review, not a theme-caused defect; #4/#25 still require feed mapping, consent and event verification.

| Integration | Evidence | Unknown / required verification | Theme/QA implications |
|---|---|---|---|
| Judge.me | Current PDP review count/button; Judge.me HTML markers | Installed version/settings, product assignments, app blocks/embeds, moderation/request settings | Preserve real history and IDs; verify badge/list, anchors, rendering and approved test submissions |
| Subscription provider | Current PDP one-time and subscribe UI | Exact provider, selling plans/cadences, eligibility, discount and cancellation logic | Preserve required product form fields and selected selling plan; test cart lines |
| Bundles | Nine products include duos/four-packs; client names Bundles | Exact installed app, component inventory mapping, functions/metadata, purchase handling | Component count/price and cart/checkout rules need direct tests |
| Agentic | Client names it; current agentic discovery sitemap lists `/agents.md`, which describes Shopify commerce/UCP endpoints | Exact app/provider and purpose | Avoid interpreting its name as an integration specification |
| Google | Client names it; generic Google HTML markers | Sales channel/feed vs GA4/pixels; account ownership and consent | Validate actual integrations and once-only events; string matches are insufficient |
| Other apps | Unknown | Full installed list, embeds/blocks/scripts, checkout extensions and ownership | Map each dependency to owner issue and regression test |

Record app version/configuration and source insertion points after a protected theme export. Store-wide feed, pixel, discount and email settings are not isolated by an unpublished theme. Do not trigger outbound campaigns, real review requests or live purchases during audit.

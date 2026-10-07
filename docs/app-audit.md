# App and integration audit — #4

Installed-app inventory is blocked on authenticated Shopify access. Browser passkey verification and connector reauthentication are unresolved. This register records public leads only.

| Integration | Evidence | Unknown / required verification | Theme/QA implications |
|---|---|---|---|
| Judge.me | Current PDP review count/button; Judge.me HTML markers | Installed version/settings, product assignments, app blocks/embeds, moderation/request settings | Preserve real history and IDs; verify badge/list, anchors, rendering and approved test submissions |
| Subscription provider | Current PDP one-time and subscribe UI | Exact provider, selling plans/cadences, eligibility, discount and cancellation logic | Preserve required product form fields and selected selling plan; test cart lines |
| Bundles | Nine products include duos/four-packs; client names Bundles | Exact installed app, component inventory mapping, functions/metadata, purchase handling | Component count/price and cart/checkout rules need direct tests |
| Agentic | Client names it; no identifying evidence in sampled HTML | Exact app/provider and purpose | Avoid interpreting its name as an integration specification |
| Google | Client names it; generic Google HTML markers | Sales channel/feed vs GA4/pixels; account ownership and consent | Validate actual integrations and once-only events; string matches are insufficient |
| Other apps | Unknown | Full installed list, embeds/blocks/scripts, checkout extensions and ownership | Map each dependency to owner issue and regression test |

Record app version/configuration and source insertion points after a protected theme export. Store-wide feed, pixel, discount and email settings are not isolated by an unpublished theme. Do not trigger outbound campaigns, real review requests or live purchases during audit.

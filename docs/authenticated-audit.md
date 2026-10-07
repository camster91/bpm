# Authenticated Shopify audit — 7 October 2026 UTC

Browser verification succeeded using the user-authorized authenticator flow. No authentication code is retained in this record. Admin identifies BPM Natural Deodorant at `bpmdeodorant.com`, admin handle `bpm-natural-deodorant`, with theme URLs under `qef4ye-yg`. All actions after verification were read-only navigation.

## Themes (#3/#13)

The Online Store panel identifies current theme `190930944372`, matching the public theme metadata. Displayed name remains truncated: `Final 2026 Site - description-above-buybox (202...`; last saved Sep 29 at 4:12 pm, as displayed without a timezone. Dawn 15.4.1 remains public schema evidence, not yet verified against exported files.

Four displayed draft themes:

| ID | Name |
|---|---|
| 190859772276 | Final 2026 Site - layout-fix (2026-07-07) |
| 190822973812 | Final 2026 Site - qty +/- fix (2026-07-06) |
| 190833328500 | Copy of Final 2026 Site - qty +/- fix (2026-07-06) |
| 186963460468 | 12-3-2026-Final 2026 Site |

The panel has Show all, so this is not a complete theme-library inventory. Existing drafts are historical themes, not verified backups of the current production theme. No theme export, duplicate, edit, upload or publication occurred.

The same panel's 30-day performance cards display LCP P75 1310 ms, INP P75 72 ms and CLS 0. These are existing-store baseline cards, not measurements of the recovered preview or future candidate theme; report details/device coverage were not inspected.

## Installed apps (#4)

The Installed apps settings list displays eleven entries:

| Name | Admin installation handle | Dependency to investigate |
|---|---|---|
| IndianStatusCheckout | indianstatuscheckout | Checkout/tax eligibility and existing journey; do not alter rules |
| Flow | flow | Store automations; identify workflows affected by products/orders |
| Knowledge Base | shopify-knowledge-base | Agent-facing content and Q&A ownership |
| Smart Pricing | shopify-smart-pricing | Price dependencies and operational scope |
| Shopify Claude Connector App | shopify-claude-mcp-app | Connector access; preserve existing installation |
| Bundles | shopify-bundles | Component inventory and bundle purchase/cart representation |
| Chit Chats | chit-chats | Fulfilment/shipping dependencies |
| Klaviyo: Email Marketing & SMS | klaviyo-email-marketing | Forms, consent, tracking and welcome-email ownership |
| Subscriptions | subscriptions-remix | Selling plans and purchase-option widget |
| Judge.me Reviews | judgeme | Ratings, reviews, blocks/embeds and customer requests |
| Messaging | shopify-messaging | Email/SMS flows; avoid duplicate sends alongside Klaviyo |

App identity is now authenticated inventory evidence. Versions, configured features, extension placements and purchase compatibility remain unverified. Do not infer that all installed apps affect the theme or that visible controls prove successful backend journeys.

## Sales channels and Agentic

Settings displays Online Store, Facebook & Instagram, Google & YouTube, Faire: Sell Wholesale, Shop and Point of Sale. Agentic also exists as a top-level Admin navigation entry at `/apps/agentic`.

The authenticated Agentic panel displays nine products synced, policy status completed, and "Allow Shopify to manage for me" checked. ChatGPT, Meta AI and Muse, Microsoft Copilot, Shop and Other channels each show Active. ChatGPT and Other channels say customers check out on the online store; Meta AI and Muse, Microsoft Copilot and Shop say customers can check out directly on their surfaces. Knowledge Base is installed and Shopify Catalog shows nine products. These are displayed configuration/status signals, not verified purchase outcomes or independent policy/claims approval. No settings were changed, search submitted or terms accepted. Preserve the online-store checkout journey and catalog/product data when designing the candidate theme; test channel-specific compatibility before release.

## Source access and export preparation

The current theme's Edit code link opens the source editor at `/store/qef4ye-yg/themes/190930944372`. Its Explorer displays assets, blocks, config, layout, locales, sections, snippets and templates; no source file was edited or saved. Folder expansion could not be reliably inspected through the browser controls, so filenames and source contents are not claimed verified.

The Admin Download theme file dialog explicitly says files will be emailed to the account email. It was cancelled without sending. A direct CLI pull is prepared instead, subject to the CLI skill's separate-turn confirmation requirement. Local destination `/Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-20261007` exists outside this repository with owner-only directory permissions. It is empty, not yet a backup.

Installed CLI reports 4.5.1. The version check unexpectedly attempted an automatic Homebrew upgrade; it failed on permissions and an untrusted-tap check. No permissions or tap trust were changed. Use `CI=1` and `SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0` for the proposed pull to suppress automatic upgrade, as confirmed in the installed CLI source. Do not treat browser authentication as proof that CLI authentication is ready.

## Judge.me warning

Apps and Sales channels settings both show: “Judge.me Reviews is not compatible with market-driven shipping.” The explanation says shipping options are now managed in Markets and the app has not been updated to support that setup. This is a platform warning, not proof that reviews or checkout have failed. Carry into #4 compatibility investigation and release QA. Do not resolve it by changing shipping or disabling the app without authorization.

## Existing content definitions (#13/#14)

Custom data overview displays 22 product and 11 variant metafield definitions, plus 0 collection and 0 page/blog/article definitions. Product Assigned to all products list shows these reusable content fields, each used on nine products:

| Label | Displayed type |
|---|---|
| whats inside title | Single line text |
| whats inside description | Rich text |
| Ingredients | Rich text |
| scent_tagline | Single line text |
| card_color | Single line text |
| Shipping | Multi-line text |
| Shipping Title | Single line text |
| Ingredients Title | Single line text |
| How to Use Title | Single line text |
| How to Use | Multi-line text |

The same list shows Product rating (Rating, three products), Product rating count (Integer, three products), and Google: Custom Product (True or false, zero products).

The Assigned to categories tab contains nine Metaobject fields: Usage type (three products); Material, Target gender, Product certifications & standards, Product form and Dispenser type (nine each); Suitable for skin type, Active ingredient and Scent (eight each). Together these nine and the thirteen all-product definitions reconcile the overview count of 22. Category-field namespaces, referenced entries and claim approval remain unverified.

The Variant metafield definitions list contains eleven Single line text fields, all labelled Google: Age Group, Condition, Gender, MPN, Custom Label 0–4, Size System and Size Type. Usage displays a dash, not a verified zero. Preserve these existing feed-related fields; they are not candidate editorial settings.

Ingredients definition inspected directly: `custom.ingredients`, one Rich text value, pinned, Storefront API access checked. Its value/source consumption in theme files still needs verification. No settings were changed. Prefer reusing verified existing definitions over creating duplicate ingredient/use/shipping fields.

Nine additional editorial definition detail pages were inspected directly. Their namespaces and types are in `content-ownership.md`; each has Storefront API access checked. Displayed character-limit minimum/maximum fields were blank on the text definitions; unique-only was unchecked where shown. This does not establish all API validation constraints. Subsequent native product inspection verifies all ten editorial fields populated on nine public records. `custom.card_color` is Single line text with observed palette tokens `1`/`2`, not a typed colour field; source mapping and safe fallback remain to verify. See the product coverage table in `content-ownership.md`. The complete Admin list additionally contains two Active retailer testers with zero listed channels; no tester publication or changes were performed.

## Subscription and bundle configuration

Shopify is the provider shown for both Subscriptions and Bundles. Subscription plan `80571859316` has customer title Subscribe and Save Monthly, internal description 10% off, delivery every five months and 10% discount, assigned to Bergamot & Lime and Unscented. The title/frequency mismatch requires owner review; nothing was edited. The app's setup guide is 3/7 completed and its dashboard shows four active subscriptions; individual contracts and customers were not opened.

The Bundles app displays seven configured products. Every detail page was inspected for quantities and selected 76g components; the full matrix is in `app-audit.md`. Cart/checkout, component availability, actual variant IDs and fulfilment remain unverified. No Save and continue controls were used.

Metaobject overview shows Knowledge Base Facts (54), Question and Answer Pairs (7), Product form (3), Material (2), Product certifications & standards (22), Suitable for skin type (14), Target gender (4), Dispenser type (1), Usage type (1), Active ingredient (4), and Fragrance (2). These are displayed definition/entry counts; fields, values, permissions and app ownership were not audited. Knowledge Base resources must not be repurposed for theme FAQs without verifying semantics and ownership.

## Next work

Inspect/export current theme read-only into protected local storage, verify backup checksum and exact theme name, then map templates/settings/app placements to existing definitions. Subscription/bundle configuration, Google overview and category/variant inventories are now inspected; remaining app settings, extension placements, resource values and source bindings still need verification before finalizing #4/#14. #28 still needs client decisions; #15 needs actual Liquid source and Theme Check. No issue is closed by this preliminary authenticated pass.

## Google overview verification

Google & YouTube installation identifies Google LLC. Overview shows Merchant Center Active, 18 submitted/approved entries and zero Limited/Not Approved/Under Review; counts include variants and do not prove 18 unique Shopify products. Google Analytics tab shows Active, Google Ads shows Inactive. Local inventory has an automatic Google Business Profile connection error. See `app-audit.md` for limitations and owner follow-up. No connection, pixel, advertising, review or account settings were changed.

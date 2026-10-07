# Phase 0/1 handoff

Branch: `work/recover-original-source`. Recovery commit: `d1161aa`. The subsequent local commit contains acceptance/audit/CI preparation; neither has been pushed. Draft PR #12 remains open at `04f4455a259369baf94a2f39e6fcf81a539e9f71` and therefore does not include this work.

## Prepared and verified

- #28 concern mapping and approval boundaries: `design-acceptance.md`.
- #13 public catalogue/rendered purchase evidence: `storefront-audit.md`, `public-catalogue-snapshot.json`.
- #4 preliminary integration register: `app-audit.md`.
- #3 workflow and rollback evidence requirements: `theme-workflow.md`.
- #14 provisional data ownership: `content-ownership.md`.
- #15 credential-free reference workflow: `static-checks.md` and `.github/workflows/reference-checks.yml`.
- Local checks pass on Node 26.5.0 and 22.13.1: source hashes, syntax, build, five API tests, 25 pages/40 targets. GitHub CI has not run this workflow.

## Required next evidence

Cameron: complete Shopify passkey verification or reconnect the Shopify connector to BPM. Browser profile ashbi.ca has the pending BPM Admin verification tab. Then inspect the live theme and installed apps read-only, obtain a protected export, and finish #3/#4/#13/#14. Exact Agentic identity is unknown. Creation/upload of a development theme remains separately authorized.

Cameron/Corey: agree #28 design reference/version, outstanding copy/design feedback and editor expectations. Positive feedback has not been treated as final acceptance. No message sent.

No Phase 0/1 issue is represented as completed solely by these documents. No GitHub issues or canonical Notion status were edited. Notion access discovery remains unavailable in the exposed connector tools; locate the existing canonical BPM record when available. Push/PR changes, merging and production publication remain separate actions. Next internal work while access is pending: extend public URL/content coverage and record source conflicts; avoid turning incomplete public evidence into installed-app or backend claims.

## Expanded audit continuation

Public URL audit now covers 45 responding routes, including nine articles and nine collections. The ninth article is not in the frozen preview. Agentic discovery exists publicly but does not identify the installed app. See `public-audit-findings.md`. Connector reauthentication and browser passkey verification were rechecked and remain blocked. No authenticated audit completion is claimed.

## Authenticated access restored

7 October 2026 UTC: user completed the authenticator flow. The BPM Admin browser is authenticated. See `authenticated-audit.md` for live theme confirmation, installed apps/channels, existing product fields and Judge.me market-driven-shipping warning. The prior passkey blocker is cleared for this browser session; connector reconnection is separate. Next: protected read-only theme export and full integration/content-definition audit. No store configuration changed.

## Export preparation and Agentic verification

Authenticated Agentic configuration shows nine synced products and active channels; see `authenticated-audit.md`. Theme source editor access was observed but no source files were modified. Admin export uses email and was cancelled without sending. Protected local destination is prepared; the exact read-only CLI pull is in `theme-workflow.md` and awaits the CLI skill-required separate-turn confirmation. CLI 4.5.1 auto-upgrade was attempted unexpectedly by the version check and failed; no trust/permission changes were made. The proposed pull disables automatic upgrade. Browser access is available; CLI authentication and the export remain unverified. No theme implementation, issue closure, push, publication or client acceptance is claimed.

## Commerce and field dependency pass

Shopify Subscriptions and Shopify Bundles providers confirmed. The single displayed subscription plan applies to two products with 10% off every five months, but its customer title says Monthly; owner clarification is required before any change. All seven bundle component ratios and selected 76g options are recorded in `app-audit.md`. Ten editorial field namespaces are verified in `content-ownership.md`; product count reconciles as thirteen general plus nine category definitions, with eleven Google-labelled variant definitions. Google Merchant Center/Analytics are Active; Local inventory shows an existing Google Business Profile link error. These are configuration findings, not purchase-journey tests. Next source-dependent action remains the protected theme pull awaiting confirmation; safe read-only remaining work is app settings/extension placement and product/metaobject-value audit. No remote writes or client acceptance occurred.

## Current theme editor dependency pass

Live theme app-embed states and default-product app blocks are now inspected read-only: Judge.me and cart-drawer reviews enabled; subscription/Klaviyo/Google-widget/tax-banner embeds disabled. Custom Purchase Options exists and has a 20% placeholder-discount setting; source eligibility/submission must be verified before conclusions or changes. Product Tabs help refers to existing fields but labels Ingredients with the wrong type. Product selector shows Default product assigned to seven, bergamot-lime one, unscented one; full source/assignment audit remains pending. Subscription retry settings were read, not changed. See `app-audit.md`, `content-ownership.md`, `storefront-audit.md`. GitHub #4/#13/#14 remain OPEN and their complete criteria are not met. Prior turn was concrete audit progress; export confirmation and #28 client decisions remain pending, not received by automatic goal continuation.

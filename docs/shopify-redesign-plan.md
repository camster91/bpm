# BPM custom Shopify theme — Sites-source plan

Revised 7 October 2026 following Cameron's explicit correction: “dont use figma”; use the Sites link and existing code. This plan supersedes the previous Figma-based design hierarchy. Previous documents are preserved in `plan-history/2026-10-07-before-sites-correction/`.

## Goal and authority

Complete the custom Shopify Online Store 2.0 theme using https://bpm-product-design-review.cameron91.chatgpt.site/index.html and the recovered `reference-site/` code as the visual and interaction target. Preserve its softness, typography, colours, imagery, layout, motion and responsive treatments. Do not consult Figma for new design decisions or mix the previous Figma theme into this target. Assets already present in Sites code remain valid source assets regardless of their directory names.

Shopify and verified installed apps govern products, variants, prices, stock, bundles, selling plans, reviews, cart and checkout. Preview content is a migration source; historical claims, policies, estimates and proposed copy still require current verification and client acceptance. Cameron's design-source selection authorizes development, not final client acceptance or live publication.

Existing tracker #11 and design acceptance #28 retain their roles. Issue mappings below preserve the existing backlog; this local revision does not claim GitHub issue descriptions have been updated or issues closed.

## Current state and immediate action

- Sites recovery provenance remains in `reference-site/source-provenance.json`; source commit `2f95c940c42b1bc4152790a83f0f455f66ceaaa4`. Recovery PR #12 is separate from custom-theme readiness.
- `theme/` now implements the Sites presentation: all thirteen homepage modules, shared chrome, collection/search/cart, nine source product compositions with native purchase forms, About/Indigenous-owned/Contact/policies, blog/articles, utility templates and conditional native account entry, and assigned campaign/wholesale suffixes. Customer-account mode and journeys remain unverified; legacy account templates are absent. The historical branch name does not change the Sites design authority.
- Merchant controls, resource-picker mappings, captured Judge.me configuration, source crops, responsive image requests, source motion with pause/reduced-motion controls, native metadata/schema and development noindex are implemented. Tests verify local code and snapshot mappings; actual editor persistence, current resources and app runtime still need native QA.
- Current local validation: 344 Liquid rendering checks, welcome/product/motion/gift-card checks, 102 resource bindings, 9 Judge.me configuration bindings, and eight prepared source article bodies pass. Installed Theme Check reports 0 errors and 1 Adobe RemoteAsset warning. Earlier QA documents retain narrower historical counts.
- Protected live-theme export and repaired-Dawn candidate remain separate audit/rollback evidence. They are not the custom candidate. No custom upload, custom branch push/merge or production publication is evidenced here.
- Next native action: candidate c1655f6 is frozen and byte-verified; obtain exact-command confirmation and upload only into the separate development context. It includes the disabled welcome shell and related-article sections; provider integration and operational offer/consent/duplicate/delivery verification remain unfinished. Native QA must verify rendering, resource/Files resolution, app attribution, editor edits, account/market behavior and commerce. A fresh local inventory finds 22 templates and no legacy customer-account templates; verify the current account mode and publication side effects before release. Shopify now documents legacy templates as deprecated and publication without them as an automatic account upgrade, so account migration requires a separate accepted decision and journey/app QA. Native hosted customer accounts require their own journey verification. See `qa/template-coverage-20261008.md`. See `dev-upload-readiness.md` for the concrete boundary and remaining gates.
- Mobile source correction is implemented and locally verified: the fixed purchase bar reuses the native form through 680px, respects unavailable states, and has isolated keyboard/quantity/plan and welcome/footer-clearance evidence. See `qa/sites-mobile-purchase-bar-20261008.md`. Actual native cart/app/editor behavior remains required. The refreshed frozen candidate includes this correction and is not a completed release candidate.
- Source fidelity across the entire required device/page/state matrix, approved content/legal/offer decisions, actual analytics/consent, measurable performance, and critical purchase journeys remain incomplete. These gates retain the complete Phase 0–5 scope below.

## Source verification at plan reset

The published homepage was retrieved successfully on 7 October 2026 with title “Home — BPM”. Its response differs byte-for-byte from the tracked source; visual/runtime equivalence remains to be checked, rather than assuming deployment wrappers or source drift explain the difference. Local `npm run check` passed: 60 source files verified, 10 scripts parsed, build completed, 5 isolated comments tests passed, and 25 routes/40 internal targets had zero broken targets. This verifies recovered source integrity and local routing, not Shopify functionality or current hosted design acceptance.

## Published-source reconciliation — 8 October 2026

Fresh public GET comparison now verifies all 25 page HTML files, shared header/footer fragments, stylesheet, runtime and catalogue against recovery: 30 matches, no unexplained differences and no retrieval failures. Deployment-injected Cloudflare footer scripts are identified separately; removal for comparison yields exact recovered bytes. Full raw/normalized hashes and limits are in `qa/hosted-source-byte-audit-20261008.json` and `qa/hosted-source-reconciliation.md`. This resolves the reset-time homepage byte discrepancy; current hosted visual/runtime behavior, external media and client acceptance remain unverified.

Fresh recovered-source checks also pass: 60 source hashes, 10 scripts, build, 5 API tests and 25 routes/40 targets. The source authority is preserved, not regenerated. These checks do not prove native Shopify behavior or complete theme fidelity.

## Delivery sequence and dependencies

| Phase | Work and outputs | Dependency / exit gate | Existing issues |
|---|---|---|---|
| 0 — Source recovery and acceptance | Freeze Sites source/version, verify code/routes/assets against hosted review, classify demo controls and pending copy/media decisions, consolidate client feedback | Traceable source and differences register; final client acceptance recorded separately | #1, #2, #28, #29 |
| 1 — Shopify audit and safe workflow | Reconcile existing audit/export with current apps and commerce; define content/editor model, native data, static CI, backup and rollback | Every commerce/app dependency has an owner; no production configuration in Git; missing decisions block only affected features | #3, #4, #13, #14, #15 |
| 2 — Foundations and reusable sections | Port Sites CSS tokens, fonts, original media/crops, header/mobile menu/footer, motion/reduced motion and common cards; create editable sections | Sites visual comparison at representative widths; add/reorder/remove/edit sections without whole-site regeneration | #5, #6 |
| 3 — Complete pages and commerce | Home, shop/collection, PDP for all nine products, About, Indigenous ownership, Contact, blog/articles, policies, search, cart, accounts/localisation; actual bundles/subscriptions/reviews; newsletter and creator slots | Native data/actions, persisted editor controls, success/error/empty states and real app compatibility verified in isolated dev theme | #7, #16–#21 |
| 4 — Hardening | URLs/redirects, metadata/schema, accessibility, image/video delivery, performance, analytics/consent, approved claims/policies | No unresolved P0/P1; evidence covers actual rendered theme and event/data paths | #9, #22–#25, #29 |
| 5 — Cross-device QA and controlled release | Full page/state regression, purchase journeys, candidate commit/theme freeze, approval packet, backup/rollback rehearsal; approved launch and post-launch smoke | Dev QA → client acceptance → explicit publication approval → verified launch; stages recorded separately | #10, #26, #27 |

Phases 0/1 feed foundations; foundations and content model feed templates; templates and actual app behaviour feed hardening/QA; all launch gates feed release. Independent local implementation may proceed while business decisions remain pending, using hidden/unconfigured optional slots.

## Sites-to-Shopify coverage

| Source surface | Implementation and merchant control |
|---|---|
| Shared header/footer, mobile navigation | Section groups, menus, logo/image controls, native account/cart and market links; shared Sites styling |
| Home | Editable hero, benefits, singles/duos/four-packs, texture/image-text, ingredients, founder/music/ownership, value chart, blog, FAQ, newsletter and CTA |
| Shop and nine product views | Collection/search/filter/cards plus product template using actual variant media, prices, availability and native cart forms |
| PDP detail | Reusable gallery, video/application, scent/formula, INCI/allergens, directions/cautions/storage, estimates/comparisons, FAQ and real Judge.me blocks |
| About / Indigenous ownership | Native page templates and reusable story/pillar/media sections; preserve attribution |
| Breakdown and eight articles | Native blog/article templates; approved content migration and URL mapping |
| Contact / policies | Native supported contact form with error/success states; existing native policy content and URLs |
| Bag | Native Shopify cart add/update/remove, quantity validation, discounts and checkout handoff; replace browser-local preview state |
| Welcome offer / subscriptions | Verified existing provider and selling-plan integrations; owner-approved discount eligibility and consent; no demo coupon in operational UI |
| Reviews / creator videos | Preserve actual Judge.me data; editable approved creator sources, permissions, attribution/captions and consent loading; empty slots hidden |
| Review/comments tools | Internal design-feedback tooling stays in the reference; do not migrate it into the customer storefront |

`reference-site/shopify-transfer-plan.md` supplies detailed review/creator/welcome requirements. Preserve source imagery and framing. Do not assume static product snapshots or local preview interactions establish production readiness. Scope includes Shopify states absent from the preview, styled consistently with its code.

## PR and verification requirements

Each implementation PR links its issues, describes the user-visible change, includes Sites/source comparison and mobile/tablet/desktop evidence where visual, affected checks and integration dependencies, and revert/rollback notes. Preserve unrelated work. Passing compilation or LiquidJS fixtures alone does not prove Shopify editor persistence, apps or checkout.

Run affected source/runtime tests and installed Shopify Theme Check; keep CI checks enabled. Render major templates at 320–375, 390–430, 768, 1024, 1280–1440 and 1600+ widths, plus meaningful layout transitions. Check images/crops, typography, wrapping, spacing, motion/reduced motion, keyboard/focus and overflow. Record justified native-platform differences against Sites.

Critical journeys: home → PDP → one-time cart → checkout handoff; subscription eligibility/selling-plan cart state; bundle representation; cart update/remove/error; collection filters/sort/search; search/no results; mobile navigation; contact validation/success/error; real review listing/write flow; consent/newsletter duplicate/error/offer handling; account/market flows where enabled. Use isolated test data and avoid real purchases, outbound campaigns or review requests.

Severity: P0 purchase/checkout/data-loss/security failure; P1 major navigation/app/accessibility failure or incorrect price/product/claim; P2 significant visual/usability/SEO/performance defect with workaround; P3 minor polish. P0/P1 block release; P2 requires resolution or explicit acceptance; P3 may remain documented.

## Completion and approval gates

A development-review candidate requires all planned templates/sections implemented, source comparisons recorded, meaningful checks passing, migration/setup instructions and a verified archive/rollback path. Authenticated development-theme upload requires a prepared exact command and its confirmation under the CLI workflow.

A release candidate additionally requires actual Shopify/app/editor/purchase QA, approved content and legal/offer decisions, no unresolved P0/P1, documented accepted P2/P3, representative device evidence, and a frozen commit/theme ID. Final client acceptance and explicit live publication approval are separate. Project completion requires approved publication and post-launch verification, or a verified rollback if launch fails. Until then report the exact implementation, local QA, dev-theme, acceptance and release states rather than “100% ready”.

No push, merge, upload, email activation, customer communication or production publication is implied by this plan revision.

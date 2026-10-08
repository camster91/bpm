## Objective
Recover the published BPM design direction, translate it into a maintainable Shopify theme, preserve current commerce/app behaviour, and make routine editing possible through Shopify rather than AI regeneration.

## Phase 0 — evidence and acceptance
- [ ] #1 Recover and validate published design-review baseline
- [ ] #2 Inventory/preserve original Figma assets
- [ ] #28 Reconcile Corey feedback and define design acceptance baseline

**Gate:** Do not treat exploratory prototype copy or layouts as production-approved until #28 is satisfied.

## Phase 1 — understand and protect the current store
- [ ] #3 Shopify development/rollback workflow
- [ ] #4 Shopify app/theme integration audit
- [ ] #13 Current template/content/storefront behaviour audit
- [ ] #14 Content model, metafields and merchant editing strategy
- [ ] #15 Theme Check/lint/PR CI

**Gate:** No live-theme editing. Development must have a preview path and rollback plan.

## Phase 2 — theme foundations
- [ ] #5 BPM theme tokens and global chrome
- [ ] #6 Reusable merchant-editable BPM sections

**Gate:** Shared design patterns should exist before page-specific duplication begins.

## Phase 3 — commerce and templates
- [ ] #7 Product-detail template
- [ ] #8 Storefront templates epic
  - [ ] #16 Homepage
  - [ ] #17 Collection/search/product cards
  - [ ] #18 About/Indigenous-owned/Contact/content pages
  - [ ] #19 Blog/article
  - [ ] #20 Cart/search/account/localisation UI
  - [ ] #21 Bundle/subscription/offer presentation

## Phase 4 — hardening
- [ ] #9 Quality hardening epic
  - [ ] #22 SEO/structured data
  - [ ] #23 Accessibility
  - [ ] #24 Performance/Core Web Vitals
  - [ ] #25 Analytics/pixels/events
  - [ ] #29 Product copy/claims/shipping/policy verification

## Phase 5 — QA and release
- [ ] #10 QA/release epic
  - [ ] #26 Cross-device visual/interaction QA
  - [ ] #27 Production release/rollback/post-launch verification

## Non-negotiables
- The existing ChatGPT Site remains unchanged as recovery/reference evidence.
- No production-theme change without explicit approval for that exact action.
- Shopify product/price/availability/selling-plan data must not be hard-coded when Shopify/app data can supply it.
- Corey must be able to edit routine content through Shopify Admin/theme editor.
- App blocks/embeds must remain compatible, including Bundles, Agentic, Google and Judge.me where currently used.
- Mobile, tablet and desktop QA are required.
- Accessibility, SEO, performance, analytics and rollback are part of launch scope, not optional polish.
- Do not invent product, shipping, pricing, ingredient, ownership or performance claims.

## Definition of project done
- [ ] Approved visual direction is represented in Shopify.
- [ ] Current commerce/app functionality has no known blocking regression.
- [ ] Merchant editing is documented and usable without code for routine changes.
- [ ] Required automated/static checks pass.
- [ ] QA evidence exists for representative devices and critical flows.
- [ ] Claims/content are approved/current.
- [ ] Release and rollback have been verified.
- [ ] Production launch has separate explicit approval.

## Canonical planning docs
- [Implementation plan](../blob/recovery/chatgpt-site-baseline/docs/shopify-redesign-plan.md)
- [QA matrix](../blob/recovery/chatgpt-site-baseline/docs/qa-matrix.md)

These documents are currently on the recovery/planning branch and should be reviewed with PR #12 before merge.

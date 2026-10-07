# BPM Shopify redesign implementation plan

## Objective

Rebuild BPM's storefront around the approved product-design direction while preserving current Shopify commerce behaviour, installed app integrations, SEO foundations, analytics, accessibility, performance and merchant editability.

The published ChatGPT Site is a **design/recovery reference**, not a production data source. Shopify remains the source of truth for live products, pricing, availability, selling plans, cart/checkout behaviour and store configuration.

## Source hierarchy

Use sources in this order when they conflict:

1. **Current Shopify data/configuration** — products, prices, selling plans, inventory, shipping/markets, policies and live commerce behaviour.
2. **Client-approved decisions/feedback** — especially issue #28.
3. **Original BPM Figma file** — visual design and owned design assets.
4. **Published ChatGPT Site recovery** — design/content direction and comparison evidence.
5. **Current public storefront** — behavioural/reference evidence pending authenticated audit.

Do not silently resolve conflicts by guessing. Record the conflict and block the affected implementation decision.

## Non-negotiables

- No production-theme change without explicit approval for that exact action.
- Never develop directly against the live Shopify theme.
- Preserve a rollback path before production release.
- Routine copy/image/link edits must be possible in Shopify Admin/theme editor.
- Product, price, availability, selling-plan and bundle truth must remain Shopify/app-driven.
- Do not hard-code shipping thresholds/rates when they can vary by market/configuration.
- Preserve app-block/app-embed support.
- Do not replace available original BPM assets with generated or stock substitutes.
- Accessibility, SEO, performance, analytics and mobile QA are launch scope.
- Prototype/research copy is not automatically approved production copy.

## Target architecture

### Theme foundations
Centralise:
- colour
- typography
- spacing
- container widths
- buttons/links
- borders/radii
- cards
- focus states
- motion/reduced motion

Prefer theme settings/tokens and reusable CSS over page-specific overrides.

### Sections and blocks
Design sections should:
- be reusable across templates;
- expose only useful merchant controls;
- have safe defaults;
- support app blocks where integration is expected;
- use semantic HTML;
- avoid hard-coded product handles, prices or shipping promises;
- degrade cleanly when optional content is missing.

### Content ownership
Use the simplest correct Shopify source:

- Native product/collection fields for native product truth.
- Metafields for structured product/collection attributes.
- Metaobjects for repeatable/shared structured content.
- Menus for navigation.
- Pages/blog for editorial content that benefits from native publishing.
- Theme settings for presentation/content that genuinely belongs to one section/template.
- App blocks/embeds for app-owned UI/data.

Issue #14 owns the final content-model decisions.

## Delivery phases

### Phase 0 — Evidence and approval
Issues: #1, #2, #28

Outcome:
- recovery baseline documented;
- original assets inventoried;
- approved design direction distinguished from exploratory prototype content.

Gate:
Do not call the design production-approved until #28 is complete.

### Phase 1 — Store audit and safe development
Issues: #3, #4, #13, #14, #15

Outcome:
- safe development theme/workflow;
- current behaviour/content/app inventory;
- merchant editing/data model;
- static CI.

Gate:
No page implementation should knowingly remove or bypass a current commerce/app requirement.

### Phase 2 — Foundations
Issues: #5, #6

Outcome:
- reusable BPM design system;
- reusable Shopify section/block library.

Gate:
Avoid duplicating a design pattern inside a page template if it belongs in the shared system.

### Phase 3 — Templates and commerce
Issues: #7, #8, #16, #17, #18, #19, #20, #21

Outcome:
- PDP;
- homepage;
- collections/search/product cards;
- content pages;
- blog/article;
- cart/search/account/localisation;
- bundles/subscriptions/offers.

Gate:
Every template must pass its functional acceptance criteria before being considered visually complete.

### Phase 4 — Hardening
Issues: #9, #22, #23, #24, #25, #29

Outcome:
- SEO/schema;
- accessibility;
- performance;
- analytics;
- claims/content validation.

Gate:
No known P0/P1 issue in these areas may remain undocumented at release-candidate stage.

### Phase 5 — QA and release
Issues: #10, #26, #27

Outcome:
- cross-device regression evidence;
- approved release candidate;
- reversible production launch;
- post-launch smoke verification.

Gate:
Publishing/switching the production theme requires separate explicit approval.

## Issue dependency map

| Issue | Work | Blocks / feeds |
| --- | --- | --- |
| #1 | Recovery baseline | #28, visual comparison |
| #2 | Figma asset preservation | #5, #6, page templates |
| #28 | Client/design acceptance | all production design decisions |
| #3 | Dev + rollback workflow | implementation work |
| #4 | App audit | #7, #20, #21, #25, QA |
| #13 | Current storefront audit | #14, templates, SEO |
| #14 | Content model | #6, #7, #16–#21 |
| #15 | CI/static checks | all implementation PRs |
| #5 | Design foundations | #6, #7, #16–#20 |
| #6 | Reusable sections | #7, #16, #18, #19 |
| #7 | PDP | #21, commerce QA |
| #16 | Homepage | #26 |
| #17 | Collection/search/cards | #26 |
| #18 | Content pages/forms | #26 |
| #19 | Blog/article | #22, #26 |
| #20 | Cart/search/account/localisation | #26 |
| #21 | Bundle/subscription offers | commerce QA |
| #22 | SEO/schema | #27 |
| #23 | Accessibility | #26, #27 |
| #24 | Performance | #27 |
| #25 | Analytics/events | #27 |
| #29 | Claims/policies | #27 |
| #26 | Cross-device QA | #27 |
| #27 | Release/rollback | project completion |

## Pull-request rules

Every implementation PR should include:
- linked issue(s);
- summary of requested vs optional changes;
- screenshots or preview evidence where visual;
- mobile/tablet/desktop impact;
- accessibility considerations;
- analytics/SEO impact where relevant;
- test/Theme Check results;
- Shopify/app dependencies touched;
- rollback/revert notes if the change has migration risk.

Do not merge simply because visual screenshots look correct if the commerce/data path has not been tested.

## QA breakpoint classes

Representative classes, not device-specific pixel perfection:

- **Mobile narrow:** ~320–375 px
- **Mobile large:** ~390–430 px
- **Tablet portrait:** ~768 px
- **Tablet landscape/small laptop:** ~1024 px
- **Desktop:** ~1280–1440 px
- **Wide desktop:** ~1600 px+

Test at least one representative viewport in each required class for major templates. Use additional widths where a layout visibly changes.

## Critical user journeys

1. Land on homepage → browse product → PDP → one-time add to cart → cart → checkout handoff.
2. PDP → subscription option → add to cart → confirm selling plan representation.
3. Bundle/offer → add bundle → cart representation → checkout handoff.
4. Collection → filter/sort/search as applicable → PDP.
5. Search → result → PDP.
6. Read About/Indigenous-owned/contact content → contact form submission state.
7. Mobile navigation → product → cart.
8. Currency/market/account entry points where enabled.
9. Review/Judge.me interaction where enabled.

## Severity model

- **P0:** Purchase/checkout/data-loss/security failure; launch blocker.
- **P1:** Major broken navigation, app integration, accessibility blocker, incorrect price/product/claim; launch blocker.
- **P2:** Significant visual/usability/SEO/performance issue with workaround; resolve before launch where practical or explicitly accept.
- **P3:** Minor polish or follow-up improvement; may ship if documented.

## Release candidate definition

A commit/theme can be called a release candidate only when:
- required PR checks pass;
- blocking template issues are complete;
- #22–#25 and #29 have no undocumented launch blockers;
- #26 has recorded cross-device evidence;
- production backup/rollback is ready;
- the candidate theme/commit is frozen for final approval.

## Project done

The project is complete only when:
- the approved BPM direction is implemented;
- merchant editing works for routine updates;
- current commerce/app behaviour has no known blocking regression;
- mobile/tablet/desktop QA evidence exists;
- SEO/accessibility/performance/analytics have been verified;
- claims/content are approved/current;
- production was launched with explicit approval;
- post-launch verification passed or a rollback was executed.

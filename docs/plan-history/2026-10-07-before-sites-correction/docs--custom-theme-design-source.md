# Custom theme design source — 7 October 2026

New objective: implement the entire custom Shopify theme, with Figma fidelity and practical merchant control. The previous repaired Dawn candidate is a baseline for diagnostics, not the finished custom implementation. Work is isolated on `work/custom-figma-theme`; no upload/publication follows merely from this objective.

## Current authoritative reads

Read Figma file `REGkhZvykpOP4XmN7EKSnh` with design context and screenshots for all five previously recorded page frames. Saved reference code/context in `docs/figma-context/` is inspection evidence, not runtime React/Tailwind. Temporary asset URLs are omitted from saved context; local downloads have a separate manifest. Shopify implementation must use Liquid, native CSS/JS and reusable sections, not whole-frame screenshot assets.

| Page | Frame | Desktop reference dimensions |
|---|---|---|
| Home | 42:985 | 1440 × 7166 |
| About Us | 42:1214 | 1440 × 6039 |
| Shop | 42:1366 | 1440 × 3958 |
| Contact Us | 42:1518 | 1440 × 3124 |
| Product Detail | 42:1635 | 1440 × 3885 |

The current file has one page and no on-canvas COMPONENT/COMPONENT_SET nodes. No named mobile/tablet frames or cart/search/blog/article templates appeared in the page-wide frame inventory. This proves the inspected file's coverage, not that every responsive or commerce state has an approved design elsewhere. Remaining templates and responsive states need explicit interpretation/acceptance using the same design system; they cannot be called exact matches to absent Figma frames.

## Reference differences and operational content

The Figma Home is an orange photographic hero with “Elevated Protection for Every Day”, lime/teal product panels, a pink “Made for Every Body” area and a dark CTA/footer. It visibly differs from the recovered softer full-site HTML review. Cameron was asked to select the exact target. The latest explicit request says Figma; do not silently combine both design systems or claim Corey accepted this current file.

Figma contains `$0.00` prices, a `$50.00` PDP example, generic testimonials and review counts, fictional partner logos, placeholder team identities, Lorem ipsum headings and sample claims. These describe visual slots, not product/app truth or permission to publish those claims. Keep them classified in #28/#29. Native Shopify prices, variants, stock, real reviews and eligible selling plans must replace transactional placeholders while preserving visual structure. Existing ingredients/safety language remain product-specific.

Typography spans Helvetica Neue Extended variants, Roc Grotesk (including a demo-labelled family), Public Sans and Source Sans 3. Preserve family/weight/size/spacing evidence in `design-values.json`; reconcile exact usable web-font files/kit with existing source before declaring font fidelity or publication readiness. Do not silently replace typography with a generic substitute.

## Build sequence against existing tracker

1. Finish frame/asset/source comparison and content classification (#1/#2/#28/#29), record responsive and missing-template decisions.
2. Establish a repository-owned custom-theme path, safe configuration strategy, non-deploying static CI and private development-theme workflow (#3/#13/#14/#15). Keep production merchant settings outside Git.
3. Implement shared tokens, announcement/header/menu/account/cart chrome, product cards and CTA/footer (#5). Every visible static asset needs an exact local source and verified crop/geometry.
4. Implement reusable hero, product collection, benefit, story, FAQ, attributed review and creator modules with merchant settings/resources (#6), then build all templates under #7/#16–#21.
5. Complete native commerce and installed-app integration tests; SEO/accessibility/performance/analytics/claims work (#22–#25/#29); rendered mobile/tablet/desktop and critical journeys (#26).
6. Prepare tested release/rollback and client review evidence (#27). Exact dev upload and final live publication remain separately confirmed actions.

This sequence preserves all phases of #11. Downloaded assets, recorded frames or passing static checks alone do not complete the theme or establish design acceptance.

# Homepage foundation checkpoint — 2026-10-07

Source: current Figma Home `42:985`, hero `42:1184` (1440×897); preserved full context in `docs/figma-context/home-42-985.txt`. The GitHub master tracker #11 and foundation issue #5 were read again during this pass. Both remain open; this checkpoint does not satisfy full homepage, acceptance or release criteria.

Implemented in `theme/`: photo hero, reusable native product card and merchant-managed product lineup; partial `templates/index.json` composition. Settings control headings/body/action, collection or alternate link, photo override/description, hero height/colors, product resources, display-name/photo overrides, card colors and Figma crop versus full-photo treatment. No product is preselected and no dummy price/review is shipped. Hero body is blank by default. Local fixtures carry the Figma copy and fabricated product records for comparison only; they do not change Shopify data.

The original source photo, white polygon highlight and dark hero arrow were copied byte-for-byte from the downloaded asset manifest. Desktop hero: 1440px document content width, 897px height, photograph position/size follows source percentages; heading x64/y225 relative to hero, highlight x56/y320 and 543×79px natural dimensions; button x64/y619 and 56px height. The browser viewport was 1455px to allow its 15px scrollbar while keeping the Figma content width at 1440px. Body text/font metrics and header centre are still subject to full visual acceptance. Screenshot colour rendering differs visibly from the downloaded Figma screenshot despite computed CSS colours matching source values; colour fidelity needs further verification, not compensating CSS guesses.

At 768px and 390px viewports there was no horizontal document overflow. The 390px document content width was 375px after its scrollbar. All images loaded after scrolling the lazy footer logo into view. Mobile adaptation uses dark navigation text for legibility and reorganises the photograph below the copy; Figma has no mobile/tablet frame, so this adaptation needs acceptance. A product resource image is dynamic; its fixture image is not proof that the live store has the intended Figma photo assigned.

Evidence:
- `home-hero-desktop-local.png`: final hero viewport with announcement/header, local draft copy.
- `home-mobile-local.png`: partial homepage plus footer with fabricated product titles/prices/availability.
- 13 actual LiquidJS render checks: existing chrome, hero source/override and above/below-fold handling, missing-product omission, native fixed/range price, sold-out/available state, links and escaping.
- Installed Shopify CLI Theme Check: zero errors, one RemoteAsset warning for the existing Adobe font kit. The plugin validation helper remains unavailable because `@shopify/theme-check-common` is missing; no managed plugin files were changed.

Not yet verified: Shopify runtime/theme editor, exact font weights/licensing, live product imagery, cart/checkout/app journeys, original color/contrast fidelity, image delivery optimisation, remaining homepage sections, all other storefront templates, SEO/accessibility/performance/analytics/release gates. White card text on the lime Figma panel needs contrast review before release. Native product buttons go to the product page to handle variants/bundles/plans there; they do not pretend to add a product to cart.

Next implementation: reusable benefit panel, review app region, scent selector, story, logo strip and FAQ, with source-preserving assets and merchant controls. Fictional partners and sample testimonials remain out of production defaults. No upload, push, merge or production publication happened in this checkpoint.

# BPM storefront QA matrix

Use this matrix as the shared minimum for issue #26 and the release gate in #27.

## Page/template coverage

| Area | Mobile | Tablet | Desktop | Functional | Accessibility | SEO/data | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Product detail | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Collection | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Search/results | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| About | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Indigenous-owned | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Contact | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Blog index | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Article | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Cart/cart drawer | ☐ | ☐ | ☐ | ☐ | n/a | ☐ | |
| Account entry | ☐ | ☐ | ☐ | ☐ | ☐ | n/a | |
| Localisation controls | ☐ | ☐ | ☐ | ☐ | ☐ | n/a | |

## Commerce flows

- [ ] One-time product purchase selection
- [ ] Subscription/selling-plan selection
- [ ] Quantity update
- [ ] Variant/option selection if applicable
- [ ] Add to cart
- [ ] Cart quantity update/removal
- [ ] Bundle add-to-cart
- [ ] Bundle representation in cart
- [ ] Checkout handoff
- [ ] Out-of-stock/unavailable handling
- [ ] Price/savings display reflects live data
- [ ] Currency/market behaviour where enabled

## App/integration flows

Verify based on #4 inventory:

- [ ] Shopify Bundles
- [ ] Agentic
- [ ] Google
- [ ] Judge.me
- [ ] Subscription app/functionality
- [ ] Other app blocks
- [ ] Other app embeds
- [ ] Consent/privacy integration if present

## Navigation and content

- [ ] Header navigation
- [ ] Mobile navigation
- [ ] Footer navigation
- [ ] Breadcrumbs where used
- [ ] Product-card links
- [ ] Internal CTA links
- [ ] Policy links
- [ ] Contact links
- [ ] External/social links
- [ ] 404/not-found experience
- [ ] No broken image/video assets

## Forms

- [ ] Contact form valid submission path
- [ ] Required-field validation
- [ ] Error state
- [ ] Success state
- [ ] Keyboard use
- [ ] Labels/instructions
- [ ] Spam/bot protection behaviour if present

## Accessibility minimum

- [ ] Skip link works
- [ ] Logical heading structure
- [ ] Landmark structure
- [ ] Keyboard navigation
- [ ] Visible focus
- [ ] No keyboard traps
- [ ] Drawer/dialog focus management
- [ ] Accordions expose state
- [ ] Product gallery controls named
- [ ] Forms labelled
- [ ] Error messages associated with fields
- [ ] Text zoom/reflow
- [ ] Touch target sizing
- [ ] Contrast
- [ ] Reduced motion
- [ ] Meaningful images have alt text; decorative images do not create noise

## SEO/data minimum

- [ ] Unique/intended title and description
- [ ] Canonical
- [ ] Indexability/noindex correct
- [ ] Product structured data
- [ ] Breadcrumb structured data where used
- [ ] Organization data not duplicated/conflicted
- [ ] Review schema only when valid
- [ ] Internal links crawlable
- [ ] Redirects tested where URLs changed
- [ ] No staging/preview URL in canonical/meta data

## Analytics minimum

Verify only integrations that actually exist:

- [ ] view_item_list
- [ ] select_item
- [ ] view_item
- [ ] add_to_cart
- [ ] view_cart
- [ ] begin_checkout
- [ ] search
- [ ] purchase verification method documented
- [ ] Currency/value/product IDs correct
- [ ] Events are not duplicated
- [ ] Consent behaviour preserved

## Performance minimum

- [ ] LCP media appropriately prioritised
- [ ] Responsive image sources/sizes
- [ ] Below-fold images lazy loaded
- [ ] Video loading is controlled
- [ ] Image dimensions/aspect ratios prevent avoidable CLS
- [ ] Font loading reviewed
- [ ] Theme JavaScript is scoped/deferred where practical
- [ ] App/third-party cost recorded
- [ ] Representative mobile Lighthouse/CWV result recorded
- [ ] Representative desktop result recorded

## Release smoke test

After explicit launch approval and production publish:

- [ ] Homepage loads
- [ ] PDP loads
- [ ] Collection/search loads
- [ ] Add to cart works
- [ ] Cart works
- [ ] Checkout handoff works
- [ ] Subscription/bundle path works
- [ ] Reviews/app blocks load
- [ ] Contact form loads
- [ ] Analytics smoke check
- [ ] Canonical/meta smoke check
- [ ] Mobile smoke check
- [ ] No obvious 404/broken assets

If any P0/P1 fails, roll back or stop the launch.

## Local fixture evidence — 8 October 2026

The complete generated-fixture sweep covers 48 pages at 320/430/768/1024/1600px (240 unique observations): no horizontal overflow, exactly one main H1, no duplicate IDs and no completed image-load failure. See `qa/all-local-fixtures-responsive-20261008.md` for the exact scope and exclusions. The 430px mobile-menu keyboard open/Escape/focus-return check also passes locally. These results are preparatory geometry/structure evidence; the native/store/device acceptance checkboxes above remain open.

# BPM responsive review — 30 September 2026

Gate: public design approval before Shopify transfer. Verdict: Ready with conditions for design review. This is not Shopify launch verification.

## Corrections

- A shared 1440px outer frame / 1312px maximum content area now aligns the header, hero, page sections and footer on wide monitors. Full-width background bands retain the brand rhythm.
- Fluid gutters, bounded hero photography and heading sizes prevent the hero from spreading across an ultrawide screen.
- Tablet navigation uses the menu through 1100px. Catalogue and editorial cards use two columns at intermediate widths.
- Hero/editorial split layouts stack through 900px; product purchase content stacks through 900px with a bounded gallery. Tablet benefit cards pair imagery and copy in readable rows.
- Product jump links wrap, grid children can shrink, narrow-screen headings fit, and form fields stay inside their columns.
- Populated bag controls wrap on small phones; Remove stays visible.
- Individual product rotation remains; two- and four-pack groups remain still. Warm cream hero panel and single rounded photo corner retained.

## Evidence

Rendered Chromium/IAB checks: all 25 HTML pages, with all nine product variants (33 distinct review URLs), at widths 320, 600, 768, 900, 1024, 1366, 1920 and 2560px. 264 DOM layout checks: zero page horizontal overflow, heading content overflow or completed broken-image failures. Detailed results: evidence/responsive-v18.json. Supplemental eight-template checks included 390px. Browser emulation does not establish physical-device or Safari compatibility.

Visual inspection: wide homepage, laptop product cards, tablet product gallery and contact form, smallest-phone hero and offer panel, and populated bag. Tablet menu opened/closed; four-count filter returned four tracks; unscented search returned six matching tracks. Small-phone offer panel fits; fabricated local duo bag had zero overflow after correction.

Build and all-page/internal-target verification pass: 25 pages, 42 internal targets, zero broken targets. Preview forms and bag remain demonstration flows.

## Conditions and next action

Client design approval is still required. Shopify transfer must preserve these shared frame/breakpoint rules and be checked in the actual theme with real app blocks, reviews, subscriptions, shipping/tax, discounts and checkout. Safari and physical-device QA remain part of that implementation gate. Hosted authenticated comment saving has not been established by this responsive pass.

Next: approve the public site design and transfer approved templates into an unpublished Shopify theme, then validate actual store integrations before launch.

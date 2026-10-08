# Sites About, Indigenous-owned and Contact pages — 7 October 2026

Authority: recovered `reference-site/public/about.html`, `indigenous-owned.html`, `contact.html` and shared Sites styles. These new alternate native page templates extend Phase 3; no Shopify page assignments or merchant content changes occurred.

## Implemented

- `page.about.json`: source opening/hand-held photo, complete attributed founder narrative, four editable pillars, six editable values, native collection closing. Historical website/Amazon operations cost comparison is preserved as an editable disabled section with dated CAD estimates; its original cost chart must be bound and benchmark verified before enabling.
- `page.indigenous-owned.json`: source opening/original owl mark, ownership/identity story, separate editable attributed quotation, heritage/mark explanation and scope statement, giving/community narrative and native closing. The About page link remains unbound until actual merchant page selection. Certification, identity and charitable statements are preserved source copy awaiting acceptance; they were not independently reverified here.
- `page.contact.json`: source opening, verified-at-source contact destination and editable response expectation/instructions, Shopify native contact form, four topics, six editable source FAQs and native closing. Fields have labels, autocomplete, native names, required email/name/message, email error association and success/error states. Notification routing, CAPTCHA, delivery and posted-value persistence still need native runtime QA; no contact message was sent.
- Reusable page-opening, rich-story/quote, principles/list, cost-comparison and contact-form sections. Ordinary page and editorial resource pickers preserve native destinations. All headings/content remain merchant editable; no full-site regeneration is needed for wording changes.

## Provenance

The hand-held original was absent from recovered local media, so the exact source-manifest owner CDN URL was retrieved:
`https://cdn.shopify.com/s/files/1/0960/5778/6740/files/Hand_Photos_beige.png?v=1776721242&width=1600`

`theme/assets/bpm-sites-hand.png`: 1024×1024, 1107902 bytes; SHA-256 `bdb8375e7b60cf8fefdefbcad506772c684b53530aade5804a50aaba9e354e11`, matching recovered manifest. Source/recovery files remained unchanged.

## Verification

`npm run check:theme`: 113 passing LiquidJS checks, including 12 new cases covering original/override openings, single H1, complete founder attribution, ownership quote/mark meaning, four/six source rows, disabled dated cost chart, contact fields/topics, escaping, email error and success. Local mocked forms do not execute Shopify submissions.

Installed Shopify CLI Theme Check: zero errors, one existing Adobe RemoteAsset warning. Bundled helper validation attempted; known missing `@shopify/theme-check-common` still prevents it. Managed plugin files and checks unchanged.

All three local fixtures were inspected at desktop 1440×1000, tablet 820×1000 and mobile 375×1000. Content/scroll widths match at 1425, 805 and 360px; each page has one H1 and original opening images loaded. Contact fields accepted fabricated `fixture@example.test` data and Feedback selection; submit remained disabled. No native backend, CAPTCHA, notification or delivery proof. Temporary viewport reset.

Evidence: `sites-about-desktop-local.png`, `sites-indigenous-mobile-local.png`, `sites-contact-desktop-local.png`, `sites-contact-mobile-local.png`. Layout only; source-fidelity approval, editor persistence and native resource assignments remain open.

## Next action / limits

Continue policy index/native policy routes, accounts/localisation and remaining storefront recovery states; bind real merchant resources and actual product/app content in the candidate. Finish source-fidelity/claims acceptance, SEO/accessibility/performance/analytics, native critical journeys and release/rollback evidence. Alternate templates must be assigned to the correct existing Shopify pages after review; they are not installed merely by existing in Git.

No push, merge, authenticated theme upload, production publication, merchant-data mutation or external message occurred. Full Phase 0–5 remains active; this checkpoint is not upload-ready or publish-ready completion.

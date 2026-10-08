# Homepage editorial-card source comparison — 8 October 2026

The candidate already configures the three original editorial treatments: cream texture, ownership mark and turntable packaging photograph. This pass found no missing editorial imagery in the committed homepage; the earlier accessibility snapshot omitted decorative images with empty alt text, which was not evidence of missing pixels.

The local resource fixture previously appended `— fixture` to article titles and the blog label. Those diagnostic strings distorted wrapping and height. The preview now uses the actual recovered article titles and source blog label, retaining the prominent fabricated-data warning outside the storefront content and fixture page titles/URLs. This is a preview correction; Shopify theme markup, native product/article records and source recovery remain unchanged.

## Same-viewport measured comparison

Live source and local candidate were visited in the same tab with verified 375, 820 and 1440px widths. All nine inspected editorial cards match article title, heading dimensions, image-panel dimensions/object-fit and total card dimensions. Raw measurements and differing source/fixture URLs are retained in `sites-journal-fidelity-20261008.json`.

| Width | Image panel, all three | Heading heights, articles 1/2/3 | Total card heights, articles 1/2/3 |
|---|---|---|---|
| 375 | 327×240 | 90 / 90 / 90 | 458 / 458 / 458 |
| 820 | 359×240 | 50 / 76 / 50 | 444 / 444 / 419 |
| 1440 | 419×240 | 58 / 86 / 58 | 455 / 455 / 455 |

Cream and turntable images use `cover`; the ownership mark uses `contain`, matching source. Candidate images were also observed loaded at natural sizes 1254×1254, 864×847 and 1600×2844 after the region entered view and network idle. The stable screenshot uses the existing visitor motion-pause control to avoid entry-animation frames. Temporary viewport overrides were reset.

Source metadata is uppercase in its HTML; candidate uses title case in data and CSS `text-transform: uppercase`, giving the same visible date/blog line. Fixture article links remain fabricated local destinations. Real native article resources, dates/blog labels, editor overrides and persisted image choices still require Shopify dev verification. This is not whole-homepage/source-motion, all-eight-article, physical-device, SEO or client content acceptance evidence.

The protected/native ownership-page read still awaits account verification. Authenticated dev upload still requires exact-command confirmation. No native page/article edit, source file change, Shopify upload, GitHub push or production publication occurred.

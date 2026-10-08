# Authoritative article formatting and prepared content package

`reference-site/src/content/articles.json` preserves an earlier native content capture. The recovered `reference-site/public/articles/*.html` pages are the authoritative Sites presentation and remove captured presentational spans, an H6 attribution wrapper, and inline image typography. No wording change was required.

`scripts/source-article-content.mjs` extracts exactly one known article-body section per source page. It checks normalized words, all link destinations, and image URLs against the original capture. `docs/source-article-content-candidate.json` stores eight prepared bodies with original-content, cleaned-content, and source-page SHA-256 hashes. `npm run check:article-content` verifies package freshness and content integrity. The original recovery files remain unchanged.

The local preview now renders these prepared bodies through the existing native `article.content` template. The theme restores source image baseline alignment within article bodies. It does not strip merchant HTML or replace native article content with hardcoded copy.

The two previously differing bodies (fair-pricing index 2 and metal-packaging index 4) now match hosted source body height and normalized text exactly at widths 375, 820, and 1440, with no document overflow. The pricing image was loaded at its natural width of 1672 in all observations. Raw twelve-observation evidence is in `sites-cleaned-article-fidelity-20261008.json`. Together with the previous matrix and list correction, all eight article bodies have source layout evidence at these three widths. This does not prove full article-page fidelity: related-article modules, native bindings, navigation, schema, editor behavior, claims, and physical-device checks still require verification.

## Native application boundary

The package is prepared locally and has not been applied to Shopify. A development theme uses the store's shared article data; uploading a theme does not install these bodies or isolate content changes from the live store. Before native application, verify each actual blog/article ID, current body and URL; retain named original-body backups; obtain content/claims acceptance and explicit approval for the shared-data write or use separately authorised unpublished test articles. Do not infer a native blog path from the captured URLs. Confirm rich-editor save/reload preserves the cleaned formatting and that affected live surfaces remain acceptable. Read back and record native body hashes after any authorised application, with restore instructions per article.

No Shopify mutation, GitHub push/merge, or publication occurred.

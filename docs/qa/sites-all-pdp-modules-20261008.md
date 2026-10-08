# Nine-product scent, value and brand module comparison

This pass covers the nine source catalogue products at 375, 820 and 1440px: 54 source/candidate observations and 81 module pairs. It compares scent-story, value, and lifestyle headings, text and element heights. Purchase forms, gallery pixels, app behavior and native resource resolution are outside this comparison.

## Changes and verified result

The theme now includes the source tablet scent/brand gaps and photo heights, 20px lead text through 1000px, 21px lead text on phones through 680px, and source phone CTA typography. The generic bundle template now selects the captured About page for Meet BPM, consistent with both singles. Side A / Side B restores the source's complete scent-story introduction. A named pre-change product-template copy is retained in `docs/plan-history/product-template-before-module-alignment-20261008.json`.

The final matrix (`sites-all-pdp-modules-after-20261008.json`) waits for the source product heading and loaded fonts. All 81 heading texts and heading heights match; there is no horizontal overflow in the 27 candidate observations. All 27 lifestyle module heights match. Scent-story module heights match in 25 of 27 pairs; the two phone exceptions reflect the four-pack content differences below. Value heights match in 18 of 27 pairs; the nine tablet exceptions reflect the explanatory cost label below. These remaining differences are not waived or accepted by this pass.

The preview previously versioned only six named CSS/JS assets. Cached PDP styles concealed the first correction during rechecking. It now hashes every local theme CSS/JS asset for fixture URLs; the final evidence records the PDP stylesheet version. Shopify's native asset_url output is unchanged. The initial diagnostic matrix includes two source observations taken before CSS loaded and uses textContent, which loses BR separation; those are not acceptance evidence. The recheck and final matrix supersede them.

## Content differences requiring acceptance

The hosted four-pack scent stories repeat the duo sentence “One Bergamot & Lime. One Unscented.” The theme retains the captured actual 3+1 and 2+2 four-pack counts. Their introductory copy remains different at every size, and the phone scent section is 57px shorter. Cameron/Corey must accept a source-copy correction or another accurate presentation against the current native contents before fidelity/content acceptance. Do not replace four-pack counts with the inaccurate duo sentence solely to match a screenshot.

The cost label explicitly states one-time cost per application and includes the native cart currency. The source says per application. This adds 29px to the tablet value section and preserves the meaning of the dynamic one-time variant estimate. Current native prices/currencies and application claims remain unverified; client acceptance of this wording/layout difference is pending.

## Validation and boundaries

All 344 Liquid rendering checks, lifecycle checks, 102 historical resource references, nine app configuration bindings and eight prepared article-content checks pass. Installed Shopify CLI Theme Check reports zero errors and one existing Adobe Typekit warning. The managed Liquid helper still lacks `@shopify/theme-check-common`; its cache was preserved.

No upload, remote theme/content/cart mutation, push, merge, or publication occurred. The f716879 frozen snapshot remains preserved but no longer matches the local theme after these corrections. It must be refreshed before proposing the updated source-fidelity upload. The optional post-comparison screenshot could not be captured when the browser session's tabs became unavailable. A final inventory returned no tabs, including the prior authentication handoff; native authentication/current-store verification must be established anew after exact-command approval. The temporary viewport override was reset. DOM geometry is not a substitute for remaining visual/physical-device and native editor/app/commerce QA.

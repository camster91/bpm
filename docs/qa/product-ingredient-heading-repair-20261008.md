# Product ingredient heading repair — local only

Current public Bergamot & Lime product HTML was read on 2026-10-08. Shopify rich-text output for the ingredient explanations contains plain `<h1>Ingredients</h1>` and repeated plain H1 ingredient names. This agrees with the earlier native development observation of 16 main H1s. Shopify metafield-tag documentation: https://shopify.dev/docs/api/liquid/filters/metafield_tag.

The Full product notes section has an H2 and a What's inside H3. Its metafield output now converts only exact plain H1 opening/closing tags to H4. This is restricted to that native ingredient-rich-text output. Encoded literal text, paragraphs, strong text, lists, links and existing deeper headings remain intact. Shared Shopify metafields, product titles, schema and native purchase data are untouched. This is not a general HTML sanitizer or a normalization of arbitrary product-description HTML or heading tags carrying attributes.

Validation: 355 chrome rendering checks pass, including a regression covering repeated headings, strong text, lists, links, escaped literal tags and unchanged deeper headings. Shopify CLI Theme Check completed with zero errors and one existing Adobe RemoteAsset warning. The managed Shopify Liquid helper was invoked but could not start because its bundled @shopify/theme-check-common dependency is missing; no managed-validator pass is claimed.

No upload or native post-change verification performed. The immutable client-content candidate 415e242 remains unchanged and does not include this repair. A later upload including this repair needs a newly frozen candidate and its exact command reviewed before execution. The already presented 415e242 command still refers to its original immutable files.
